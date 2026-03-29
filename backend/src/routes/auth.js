const express = require('express');
const crypto = require('crypto');
const { createSupabaseClient } = require('../supabase');
const config = require('../config');
const { getBearerToken, requireAccessToken } = require('../middleware/auth');
const { sendSupabaseError } = require('../lib/response');
const { isSmtpConfigured, sendEmailChangeVerificationEmail, sendWelcomeTestEmail } = require('../lib/mailer');

const router = express.Router();
const emailChangeVerificationStore = new Map();
const staffOnboardingVerificationStore = new Map();
const EMAIL_CHANGE_CODE_EXPIRY_MS = 10 * 60 * 1000;
const EMAIL_CHANGE_MAX_ATTEMPTS = 5;

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function isPlaceholderStaffEmail(email) {
  const normalized = normalizeString(email).toLowerCase();
  return normalized.endsWith('@smilesdentalhub.local') || normalized.endsWith('@dent22.local');
}

function createSixDigitCode() {
  return crypto.randomInt(100000, 1000000).toString();
}

async function updateEmailForUser({ userId, email }) {
  if (!config.supabaseServiceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for email updates.');
  }

  const serviceClient = createSupabaseClient({ useServiceRole: true });

  const { error: authUpdateError } = await serviceClient.auth.admin.updateUserById(userId, {
    email,
    email_confirm: true,
  });
  if (authUpdateError) throw authUpdateError;

  const { error: profileUpdateError } = await serviceClient
    .from('staff_profiles')
    .update({ email })
    .eq('user_id', userId);
  if (profileUpdateError) throw profileUpdateError;
}

async function requireAdminRequester(accessToken) {
  const requesterClient = createSupabaseClient({ accessToken });
  const { data: requesterUserData, error: requesterUserError } = await requesterClient.auth.getUser();
  if (requesterUserError || !requesterUserData?.user?.id) {
    return {
      errorResponse: {
        status: 401,
        payload: requesterUserError || { message: 'Unable to resolve authenticated user.' },
      },
    };
  }

  const serviceClient = createSupabaseClient({ useServiceRole: true });
  const { data: requesterProfile, error: requesterProfileError } = await serviceClient
    .from('staff_profiles')
    .select('user_id, full_name, role, is_active')
    .eq('user_id', requesterUserData.user.id)
    .maybeSingle();

  if (requesterProfileError) {
    return {
      errorResponse: {
        status: 403,
        payload: requesterProfileError,
      },
    };
  }

  if (!requesterProfile || !requesterProfile.is_active || requesterProfile.role !== 'admin') {
    return {
      errorResponse: {
        status: 403,
        payload: { error: 'Forbidden: admin role required.' },
      },
    };
  }

  return {
    requesterUserData,
    requesterProfile,
    serviceClient,
  };
}

async function requireAuthenticatedRequester(accessToken) {
  const requesterClient = createSupabaseClient({ accessToken });
  const { data: requesterUserData, error: requesterUserError } = await requesterClient.auth.getUser();
  if (requesterUserError || !requesterUserData?.user?.id) {
    return {
      errorResponse: {
        status: 401,
        payload: requesterUserError || { message: 'Unable to resolve authenticated user.' },
      },
    };
  }

  const serviceClient = createSupabaseClient({ useServiceRole: true });
  const { data: requesterProfile, error: requesterProfileError } = await serviceClient
    .from('staff_profiles')
    .select('user_id, full_name, email, username, role, is_active, first_name, middle_name, last_name, suffix, birth_date, mobile_number, address')
    .eq('user_id', requesterUserData.user.id)
    .maybeSingle();

  if (requesterProfileError) {
    return {
      errorResponse: {
        status: 403,
        payload: requesterProfileError,
      },
    };
  }

  if (!requesterProfile || !requesterProfile.is_active) {
    return {
      errorResponse: {
        status: 403,
        payload: { error: 'Account is not provisioned for system access.' },
      },
    };
  }

  return {
    requesterUserData,
    requesterProfile,
    serviceClient,
  };
}

async function resolveLoginEmail(login) {
  const client = createSupabaseClient();
  const { data, error } = await client.rpc('resolve_login_email', { p_username: login });
  if (error) throw error;
  return normalizeString(data);
}

router.post('/login', async (req, res) => {
  try {
    const login = normalizeString(req.body?.login);
    const password = normalizeString(req.body?.password);

    if (!login || !password) {
      return res.status(400).json({ error: 'login and password are required.' });
    }

    const resolvedEmail = await resolveLoginEmail(login);
    if (!resolvedEmail) {
      return res.status(401).json({ error: 'Invalid username/email or password.' });
    }

    const client = createSupabaseClient();
    const { data, error } = await client.auth.signInWithPassword({
      email: resolvedEmail,
      password,
    });

    if (error) return sendSupabaseError(res, error, 401);

    return res.json({
      message: 'Login successful.',
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    return sendSupabaseError(res, error);
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const login = normalizeString(req.body?.login);
    const redirectTo = normalizeString(req.body?.redirectTo) || 'http://localhost:5173/reset-password';

    if (!login) {
      return res.status(400).json({ error: 'login is required.' });
    }

    const resolvedEmail = login.includes('@') ? login.toLowerCase() : await resolveLoginEmail(login);
    if (!resolvedEmail) {
      return res.status(404).json({ error: 'No active staff account found for that login.' });
    }

    const client = createSupabaseClient();
    const { error } = await client.auth.resetPasswordForEmail(resolvedEmail, { redirectTo });

    if (error) return sendSupabaseError(res, error);

    return res.json({
      message: 'Verification code sent to email.',
      email: resolvedEmail,
      redirectTo,
    });
  } catch (error) {
    return sendSupabaseError(res, error);
  }
});

router.post('/verify-reset-code', async (req, res) => {
  try {
    const login = normalizeString(req.body?.login);
    const code = normalizeString(req.body?.code);

    if (!login || !code) {
      return res.status(400).json({ error: 'login and code are required.' });
    }

    const resolvedEmail = login.includes('@') ? login.toLowerCase() : await resolveLoginEmail(login);
    if (!resolvedEmail) {
      return res.status(404).json({ error: 'No active staff account found for that login.' });
    }

    const client = createSupabaseClient();
    const { data, error } = await client.auth.verifyOtp({
      email: resolvedEmail,
      token: code,
      type: 'recovery',
    });

    if (error || !data?.session?.access_token) return sendSupabaseError(res, error || { message: 'Invalid code.' }, 401);

    return res.json({
      message: 'Code verified.',
      session: data.session,
      user: data.user,
    });
  } catch (error) {
    return sendSupabaseError(res, error);
  }
});

router.post('/refresh-session', async (req, res) => {
  try {
    const refreshToken = normalizeString(req.body?.refreshToken);
    if (!refreshToken) {
      return res.status(400).json({ error: 'refreshToken is required.' });
    }

    const client = createSupabaseClient();
    const { data, error } = await client.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) return sendSupabaseError(res, error, 401);

    return res.json({
      message: 'Session refreshed.',
      session: data.session,
      user: data.user,
    });
  } catch (error) {
    return sendSupabaseError(res, error, 500);
  }
});

router.get('/me', requireAccessToken, async (req, res) => {
  try {
    const client = createSupabaseClient({ accessToken: req.accessToken });
    const { data, error } = await client.auth.getUser();

    if (error) return sendSupabaseError(res, error, 401);

    return res.json({ user: data.user });
  } catch (error) {
    return sendSupabaseError(res, error, 500);
  }
});

router.post('/update-password', requireAccessToken, async (req, res) => {
  try {
    const newPassword = normalizeString(req.body?.newPassword);
    if (!newPassword) {
      return res.status(400).json({ error: 'newPassword is required.' });
    }

    const response = await fetch(`${config.supabaseUrl}/auth/v1/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: config.supabaseAnonKey,
        Authorization: `Bearer ${req.accessToken}`,
      },
      body: JSON.stringify({ password: newPassword }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(response.status).json({
        error: payload?.msg || payload?.message || 'Unable to update password.',
        code: payload?.error_code || null,
        details: payload?.error_description || null,
        hint: null,
      });
    }

    return res.json({
      message: 'Password updated successfully.',
      user: payload?.user || null,
    });
  } catch (error) {
    return sendSupabaseError(res, error, 500);
  }
});

router.post('/update-email', requireAccessToken, async (req, res) => {
  try {
    if (!config.supabaseServiceRoleKey) {
      return res.status(500).json({ error: 'SUPABASE_SERVICE_ROLE_KEY is required for email updates.' });
    }

    const nextEmail = normalizeString(req.body?.email).toLowerCase();
    if (!nextEmail) {
      return res.status(400).json({ error: 'email is required.' });
    }
    if (!EMAIL_PATTERN.test(nextEmail)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    const requesterClient = createSupabaseClient({ accessToken: req.accessToken });
    const { data: requesterUserData, error: requesterUserError } = await requesterClient.auth.getUser();
    if (requesterUserError || !requesterUserData?.user?.id) {
      return sendSupabaseError(res, requesterUserError || { message: 'Unable to resolve authenticated user.' }, 401);
    }

    const currentEmail = normalizeString(requesterUserData.user.email).toLowerCase();
    if (currentEmail === nextEmail) {
      return res.json({ message: 'Email unchanged.', email: nextEmail });
    }

    await updateEmailForUser({
      userId: requesterUserData.user.id,
      email: nextEmail,
    });

    return res.json({
      message: 'Email updated successfully.',
      email: nextEmail,
    });
  } catch (error) {
    return sendSupabaseError(res, error, 500);
  }
});

router.post('/request-email-change-code', requireAccessToken, async (req, res) => {
  try {
    const nextEmail = normalizeString(req.body?.email).toLowerCase();
    if (!nextEmail) {
      return res.status(400).json({ error: 'email is required.' });
    }
    if (!EMAIL_PATTERN.test(nextEmail)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }
    if (!isSmtpConfigured()) {
      return res.status(500).json({ error: 'SMTP is not configured for verification emails.' });
    }

    const requesterClient = createSupabaseClient({ accessToken: req.accessToken });
    const { data: requesterUserData, error: requesterUserError } = await requesterClient.auth.getUser();
    if (requesterUserError || !requesterUserData?.user?.id) {
      return sendSupabaseError(res, requesterUserError || { message: 'Unable to resolve authenticated user.' }, 401);
    }

    const currentEmail = normalizeString(requesterUserData.user.email).toLowerCase();
    if (currentEmail === nextEmail) {
      return res.status(400).json({ error: 'Please enter a different email address.' });
    }

    const code = createSixDigitCode();
    const expiresAt = Date.now() + EMAIL_CHANGE_CODE_EXPIRY_MS;

    emailChangeVerificationStore.set(requesterUserData.user.id, {
      code,
      email: nextEmail,
      expiresAt,
      attempts: 0,
    });

    await sendEmailChangeVerificationEmail({
      toEmail: nextEmail,
      code,
      requestedBy: requesterUserData.user.email || 'Smiles Dental Hub',
      expiresInMinutes: Math.round(EMAIL_CHANGE_CODE_EXPIRY_MS / 60000),
    });

    return res.json({
      message: 'Verification code sent to email.',
      email: nextEmail,
      expiresInMinutes: Math.round(EMAIL_CHANGE_CODE_EXPIRY_MS / 60000),
    });
  } catch (error) {
    return sendSupabaseError(res, error, 500);
  }
});

router.post('/verify-email-change-code', requireAccessToken, async (req, res) => {
  try {
    if (!config.supabaseServiceRoleKey) {
      return res.status(500).json({ error: 'SUPABASE_SERVICE_ROLE_KEY is required for email updates.' });
    }

    const nextEmail = normalizeString(req.body?.email).toLowerCase();
    const code = normalizeString(req.body?.code);

    if (!nextEmail || !code) {
      return res.status(400).json({ error: 'email and code are required.' });
    }

    const requesterClient = createSupabaseClient({ accessToken: req.accessToken });
    const { data: requesterUserData, error: requesterUserError } = await requesterClient.auth.getUser();
    if (requesterUserError || !requesterUserData?.user?.id) {
      return sendSupabaseError(res, requesterUserError || { message: 'Unable to resolve authenticated user.' }, 401);
    }

    const storedVerification = emailChangeVerificationStore.get(requesterUserData.user.id);
    if (!storedVerification) {
      return res.status(400).json({ error: 'No active email verification request found.' });
    }

    if (storedVerification.expiresAt < Date.now()) {
      emailChangeVerificationStore.delete(requesterUserData.user.id);
      return res.status(400).json({ error: 'Verification code expired. Please request a new one.' });
    }

    if (storedVerification.email !== nextEmail) {
      return res.status(400).json({ error: 'The email does not match the pending verification request.' });
    }

    if (storedVerification.attempts >= EMAIL_CHANGE_MAX_ATTEMPTS) {
      emailChangeVerificationStore.delete(requesterUserData.user.id);
      return res.status(400).json({ error: 'Too many invalid attempts. Please request a new code.' });
    }

    if (storedVerification.code !== code) {
      storedVerification.attempts += 1;
      emailChangeVerificationStore.set(requesterUserData.user.id, storedVerification);
      return res.status(400).json({ error: 'Invalid verification code.' });
    }

    await updateEmailForUser({
      userId: requesterUserData.user.id,
      email: nextEmail,
    });

    emailChangeVerificationStore.delete(requesterUserData.user.id);

    return res.json({
      message: 'Email updated successfully.',
      email: nextEmail,
    });
  } catch (error) {
    return sendSupabaseError(res, error, 500);
  }
});

router.post('/start-staff-onboarding', requireAccessToken, async (req, res) => {
  try {
    const nextEmail = normalizeString(req.body?.email).toLowerCase();
    const birthDate = normalizeString(req.body?.birthDate) || null;
    const mobileNumber = normalizeString(req.body?.mobileNumber);
    const address = normalizeString(req.body?.address);
    const birthDateValue = birthDate ? new Date(`${birthDate}T00:00:00`) : null;
    const today = new Date();
    const minimumAdultDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    if (!nextEmail || !birthDate || !mobileNumber || !address) {
      return res.status(400).json({ error: 'email, birthDate, mobileNumber, and address are required.' });
    }
    if (!EMAIL_PATTERN.test(nextEmail)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }
    if (!(birthDateValue instanceof Date) || Number.isNaN(birthDateValue.getTime())) {
      return res.status(400).json({ error: 'Invalid birth date.' });
    }
    if (birthDateValue > minimumAdultDate) {
      return res.status(400).json({ error: 'You must be at least 18 years old.' });
    }
    if (!/^\+639\d{9}$/.test(mobileNumber)) {
      return res.status(400).json({ error: 'Enter a valid Philippine mobile number.' });
    }
    if (isPlaceholderStaffEmail(nextEmail)) {
      return res.status(400).json({ error: 'Please enter your real email address.' });
    }
    if (!isSmtpConfigured()) {
      return res.status(500).json({ error: 'SMTP is not configured for verification emails.' });
    }

    const requesterContext = await requireAuthenticatedRequester(req.accessToken);
    if (requesterContext.errorResponse) {
      const { status, payload } = requesterContext.errorResponse;
      return payload?.error ? res.status(status).json(payload) : sendSupabaseError(res, payload, status);
    }

    const { requesterUserData, requesterProfile } = requesterContext;

    const code = createSixDigitCode();
    const expiresAt = Date.now() + EMAIL_CHANGE_CODE_EXPIRY_MS;

    staffOnboardingVerificationStore.set(requesterUserData.user.id, {
      code,
      email: nextEmail,
      birthDate,
      mobileNumber,
      address,
      expiresAt,
      attempts: 0,
    });

    await sendEmailChangeVerificationEmail({
      toEmail: nextEmail,
      code,
      requestedBy: requesterProfile.full_name || requesterUserData.user.email || 'Smiles Dental Hub',
      expiresInMinutes: Math.round(EMAIL_CHANGE_CODE_EXPIRY_MS / 60000),
    });

    return res.json({
      message: 'Verification code sent to email.',
      email: nextEmail,
      expiresInMinutes: Math.round(EMAIL_CHANGE_CODE_EXPIRY_MS / 60000),
    });
  } catch (error) {
    return sendSupabaseError(res, error, 500);
  }
});

router.post('/verify-staff-onboarding', requireAccessToken, async (req, res) => {
  try {
    if (!config.supabaseServiceRoleKey) {
      return res.status(500).json({ error: 'SUPABASE_SERVICE_ROLE_KEY is required for onboarding verification.' });
    }

    const nextEmail = normalizeString(req.body?.email).toLowerCase();
    const code = normalizeString(req.body?.code);

    if (!nextEmail || !code) {
      return res.status(400).json({ error: 'email and code are required.' });
    }

    const requesterContext = await requireAuthenticatedRequester(req.accessToken);
    if (requesterContext.errorResponse) {
      const { status, payload } = requesterContext.errorResponse;
      return payload?.error ? res.status(status).json(payload) : sendSupabaseError(res, payload, status);
    }

    const { requesterUserData, serviceClient } = requesterContext;
    const storedVerification = staffOnboardingVerificationStore.get(requesterUserData.user.id);

    if (!storedVerification) {
      return res.status(400).json({ error: 'No pending onboarding verification found.' });
    }
    if (storedVerification.expiresAt < Date.now()) {
      staffOnboardingVerificationStore.delete(requesterUserData.user.id);
      return res.status(400).json({ error: 'Verification code expired. Please request a new one.' });
    }
    if (storedVerification.email !== nextEmail) {
      return res.status(400).json({ error: 'The email does not match the pending verification request.' });
    }
    if (storedVerification.attempts >= EMAIL_CHANGE_MAX_ATTEMPTS) {
      staffOnboardingVerificationStore.delete(requesterUserData.user.id);
      return res.status(400).json({ error: 'Too many invalid attempts. Please request a new code.' });
    }
    if (storedVerification.code !== code) {
      storedVerification.attempts += 1;
      staffOnboardingVerificationStore.set(requesterUserData.user.id, storedVerification);
      return res.status(400).json({ error: 'Invalid verification code.' });
    }

    await updateEmailForUser({
      userId: requesterUserData.user.id,
      email: nextEmail,
    });

    const { error: profileUpdateError } = await serviceClient
      .from('staff_profiles')
      .update({
        birth_date: storedVerification.birthDate,
        mobile_number: storedVerification.mobileNumber,
        address: storedVerification.address,
      })
      .eq('user_id', requesterUserData.user.id);
    if (profileUpdateError) return sendSupabaseError(res, profileUpdateError);

    staffOnboardingVerificationStore.delete(requesterUserData.user.id);

    return res.json({
      message: 'Staff onboarding completed successfully.',
      email: nextEmail,
    });
  } catch (error) {
    return sendSupabaseError(res, error, 500);
  }
});

router.post('/admin-update-user-email', requireAccessToken, async (req, res) => {
  try {
    if (!config.supabaseServiceRoleKey) {
      return res.status(500).json({ error: 'SUPABASE_SERVICE_ROLE_KEY is required for admin email updates.' });
    }

    const userId = normalizeString(req.body?.userId);
    const nextEmail = normalizeString(req.body?.email).toLowerCase();

    if (!userId || !nextEmail) {
      return res.status(400).json({ error: 'userId and email are required.' });
    }

    const adminContext = await requireAdminRequester(req.accessToken);
    if (adminContext.errorResponse) {
      const { status, payload } = adminContext.errorResponse;
      return payload?.error ? res.status(status).json(payload) : sendSupabaseError(res, payload, status);
    }

    const { serviceClient } = adminContext;

    const { data: targetProfile, error: targetProfileError } = await serviceClient
      .from('staff_profiles')
      .select('user_id, email')
      .eq('user_id', userId)
      .maybeSingle();

    if (targetProfileError) return sendSupabaseError(res, targetProfileError);
    if (!targetProfile) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    if (String(targetProfile.email || '').toLowerCase() === nextEmail) {
      return res.json({ message: 'Email unchanged.' });
    }

    const { error: authUpdateError } = await serviceClient.auth.admin.updateUserById(userId, {
      email: nextEmail,
      email_confirm: true,
    });
    if (authUpdateError) return sendSupabaseError(res, authUpdateError);

    const { error: profileUpdateError } = await serviceClient
      .from('staff_profiles')
      .update({ email: nextEmail })
      .eq('user_id', userId);
    if (profileUpdateError) return sendSupabaseError(res, profileUpdateError);

    return res.json({ message: 'User email updated successfully.' });
  } catch (error) {
    return sendSupabaseError(res, error, 500);
  }
});

router.post('/admin-create-user', requireAccessToken, async (req, res) => {
  try {
    if (!config.supabaseServiceRoleKey) {
      return res.status(500).json({ error: 'SUPABASE_SERVICE_ROLE_KEY is required for admin user creation.' });
    }

    const email = normalizeString(req.body?.email).toLowerCase();
    const password = normalizeString(req.body?.password);
    const fullName = normalizeString(req.body?.fullName);
    const username = normalizeString(req.body?.username).toLowerCase();
    const role = normalizeString(req.body?.role);
    const firstName = normalizeString(req.body?.firstName);
    const middleName = normalizeString(req.body?.middleName);
    const lastName = normalizeString(req.body?.lastName);
    const suffix = normalizeString(req.body?.suffix);
    const birthDate = normalizeString(req.body?.birthDate) || null;
    const mobileNumber = normalizeString(req.body?.mobileNumber) || null;
    const address = normalizeString(req.body?.address) || null;

    if (!email || !password || !fullName || !username || !role) {
      return res.status(400).json({ error: 'email, password, fullName, username, and role are required.' });
    }
    if (!EMAIL_PATTERN.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }
    if (!['admin', 'receptionist', 'associate_dentist'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role.' });
    }

    const adminContext = await requireAdminRequester(req.accessToken);
    if (adminContext.errorResponse) {
      const { status, payload } = adminContext.errorResponse;
      return payload?.error ? res.status(status).json(payload) : sendSupabaseError(res, payload, status);
    }

    const { serviceClient } = adminContext;

    const { data: existingUsername, error: existingUsernameError } = await serviceClient
      .from('staff_profiles')
      .select('user_id')
      .eq('username', username)
      .maybeSingle();
    if (existingUsernameError) return sendSupabaseError(res, existingUsernameError);
    if (existingUsername) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    const { data: createdUserData, error: createUserError } = await serviceClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role,
        full_name: fullName,
        username,
      },
      app_metadata: {
        provider: 'email',
        providers: ['email'],
      },
    });
    if (createUserError || !createdUserData?.user?.id) {
      return sendSupabaseError(res, createUserError || { message: 'Unable to create user.' });
    }

    const { error: profileUpdateError } = await serviceClient
      .from('staff_profiles')
      .update({
        full_name: fullName,
        first_name: firstName || null,
        middle_name: middleName || null,
        last_name: lastName || null,
        suffix: suffix || null,
        birth_date: birthDate,
        mobile_number: mobileNumber,
        address,
        username,
        email,
        role,
        is_active: true,
      })
      .eq('user_id', createdUserData.user.id);

    if (profileUpdateError) {
      return sendSupabaseError(res, profileUpdateError);
    }

    return res.status(201).json({
      message: 'User created successfully.',
      userId: createdUserData.user.id,
    });
  } catch (error) {
    return sendSupabaseError(res, error, 500);
  }
});

router.post('/admin-send-user-welcome-email', requireAccessToken, async (req, res) => {
  try {
    const email = normalizeString(req.body?.email).toLowerCase();

    if (!email) {
      return res.status(400).json({ error: 'email is required.' });
    }
    if (!EMAIL_PATTERN.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    const adminContext = await requireAdminRequester(req.accessToken);
    if (adminContext.errorResponse) {
      const { status, payload } = adminContext.errorResponse;
      return payload?.error ? res.status(status).json(payload) : sendSupabaseError(res, payload, status);
    }

    const { requesterUserData, requesterProfile } = adminContext;

    if (!isSmtpConfigured()) {
      return res.status(500).json({
        error: 'SMTP is not configured on backend. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM_EMAIL in backend/.env.',
      });
    }

    await sendWelcomeTestEmail({
      toEmail: email,
      requestedBy: requesterProfile.full_name || requesterUserData.user.email || 'Admin',
    });

    return res.json({
      message: 'Test email sent.',
      email,
    });
  } catch (error) {
    return sendSupabaseError(res, error, 500);
  }
});

router.post('/logout', async (req, res) => {
  try {
    const accessToken = getBearerToken(req);
    if (!accessToken) {
      return res.status(400).json({
        error: 'Missing bearer token. Add Authorization: Bearer <access_token>.',
      });
    }

    const client = createSupabaseClient({ accessToken });
    const { error } = await client.auth.signOut();
    if (error) return sendSupabaseError(res, error);

    return res.json({ message: 'Logged out.' });
  } catch (error) {
    return sendSupabaseError(res, error, 500);
  }
});

module.exports = router;
