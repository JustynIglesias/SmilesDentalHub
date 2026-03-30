import { useCallback, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Home from './pages/Home'
import PatientRecords from './pages/PatientRecords'
import PatientRecordDetails from './pages/PatientRecordDetails'
import AddPatient from './pages/AddPatient'
import Procedures from './pages/Procedures'
import PatientLogs from './pages/PatientLogs'
import Admin from './pages/Admin'
import ResetPassword from './pages/ResetPassword'
import Settings from './pages/Settings'
import { isAccessTokenExpired, missingSupabaseEnv, supabase } from './lib/supabaseClient'

const ADD_PATIENT_DRAFT_KEY = 'dent22.addPatientDraft.v1'
const LAST_PROTECTED_ROUTE_KEY = 'dent22.lastProtectedRoute'
const PLACEHOLDER_EMAIL_DOMAINS = ['@smilesdentalhub.local', '@dent22.local']

const isPlaceholderStaffEmail = (email = '') => {
  const normalized = `${email || ''}`.trim().toLowerCase()
  return PLACEHOLDER_EMAIL_DOMAINS.some((domain) => normalized.endsWith(domain))
}

const requiresStaffOnboarding = (profile) => {
  if (!profile?.is_active) return false
  return (
    isPlaceholderStaffEmail(profile?.email) ||
    !`${profile?.birth_date || ''}`.trim() ||
    !`${profile?.mobile_number || ''}`.trim() ||
    !`${profile?.address || ''}`.trim()
  )
}

const calculateAgeFromDate = (birthDate) => {
  if (!birthDate) return -1
  const dob = new Date(birthDate)
  if (Number.isNaN(dob.getTime())) return -1
  const now = new Date()
  let age = now.getFullYear() - dob.getFullYear()
  const monthDelta = now.getMonth() - dob.getMonth()
  if (monthDelta < 0 || (monthDelta === 0 && now.getDate() < dob.getDate())) age -= 1
  return age
}

const normalizePhilippineMobile = (value = '') => `${value}`.replace(/\D/g, '').slice(0, 10)

const toPhilippineLocalMobileInput = (value = '') => {
  const digits = `${value || ''}`.replace(/\D/g, '')
  if (digits.startsWith('63') && digits.length >= 12) return digits.slice(2, 12)
  if (digits.startsWith('0') && digits.length >= 11) return digits.slice(1, 11)
  return digits.slice(0, 10)
}

const getAdultBirthDateMax = () => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 18)
  return date.toISOString().split('T')[0]
}

function LoginRoute({
  onLogin,
  form,
  error,
  showPassword,
  onChange,
  onTogglePassword,
  forgotUsername,
  forgotCode,
  forgotNewPassword,
  forgotConfirmPassword,
  forgotStep,
  forgotError,
  forgotSuccess,
  isVerifyingCode,
  isSendingReset,
  isResettingPassword,
  onForgotUsernameChange,
  onForgotCodeChange,
  onForgotNewPasswordChange,
  onForgotConfirmPasswordChange,
  onForgotSubmit,
  onForgotVerifyCode,
  onForgotResetPassword,
  onForgotClose,
}) {
  return (
    <Login
      form={form}
      error={error}
      showPassword={showPassword}
      onChange={onChange}
      onSubmit={onLogin}
      onTogglePassword={onTogglePassword}
      forgotUsername={forgotUsername}
      forgotCode={forgotCode}
      forgotNewPassword={forgotNewPassword}
      forgotConfirmPassword={forgotConfirmPassword}
      forgotStep={forgotStep}
      forgotError={forgotError}
      forgotSuccess={forgotSuccess}
      isVerifyingCode={isVerifyingCode}
      isSendingReset={isSendingReset}
      isResettingPassword={isResettingPassword}
      onForgotUsernameChange={onForgotUsernameChange}
      onForgotCodeChange={onForgotCodeChange}
      onForgotNewPasswordChange={onForgotNewPasswordChange}
      onForgotConfirmPasswordChange={onForgotConfirmPasswordChange}
      onForgotSubmit={onForgotSubmit}
      onForgotVerifyCode={onForgotVerifyCode}
      onForgotResetPassword={onForgotResetPassword}
      onForgotClose={onForgotClose}
    />
  )
}

function ProtectedLayout({ onLogout, navItems, role, profile, sessionUser, onProfileChange, isLogoutModalOpen }) {
  const location = useLocation()
  const isPatientRecordsRoute = location.pathname === '/records'

  return (
    <div className="dashboard">
      <Sidebar onLogout={onLogout} navItems={navItems} isLogoutModalOpen={isLogoutModalOpen} />
      <main className={`dashboard-main ${isPatientRecordsRoute ? 'dashboard-main-no-scroll' : ''}`}>
        <Routes>
          <Route path="/home" element={<Home currentProfile={profile} />} />
          <Route path="/records" element={<PatientRecords />} />
          <Route path="/records/:id" element={<PatientRecordDetails currentRole={role} currentProfile={profile} />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/procedure" element={<Procedures currentProfile={profile} />} />
          <Route path="/logs" element={<PatientLogs />} />
          <Route path="/settings" element={<Settings currentProfile={profile} currentSessionUser={sessionUser} onProfileChange={onProfileChange} />} />
          {role === 'admin' ? <Route path="/admin" element={<Admin currentProfile={profile} />} /> : <Route path="/admin" element={<Navigate to="/home" replace />} />}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function AppRoutes() {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [navItems, setNavItems] = useState([])
  const [isBootstrapping, setIsBootstrapping] = useState(() => Boolean(supabase))
  const [isLoginTransitioning, setIsLoginTransitioning] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ username: '', password: '' })
  const [forgotUsername, setForgotUsername] = useState('')
  const [forgotCode, setForgotCode] = useState('')
  const [forgotNewPassword, setForgotNewPassword] = useState('')
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('')
  const [forgotStep, setForgotStep] = useState('request')
  const [forgotError, setForgotError] = useState('')
  const [forgotSuccess, setForgotSuccess] = useState('')
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)
  const [isSendingReset, setIsSendingReset] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [forgotAccessToken, setForgotAccessToken] = useState('')
  const [forgotRefreshToken, setForgotRefreshToken] = useState('')
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [staffOnboardingStep, setStaffOnboardingStep] = useState('details')
  const [staffOnboardingForm, setStaffOnboardingForm] = useState({
    email: '',
    birthDate: '',
    mobileNumber: '',
    address: '',
  })
  const [staffOnboardingCode, setStaffOnboardingCode] = useState('')
  const [staffOnboardingError, setStaffOnboardingError] = useState('')
  const [staffOnboardingInfo, setStaffOnboardingInfo] = useState('')
  const [staffOnboardingFieldErrors, setStaffOnboardingFieldErrors] = useState({})
  const [isStaffOnboardingSubmitting, setIsStaffOnboardingSubmitting] = useState(false)
  const [isStaffOnboardingVerifying, setIsStaffOnboardingVerifying] = useState(false)
  const profileUserIdRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const path = `${location.pathname || ''}${location.search || ''}${location.hash || ''}`
    if (!path || path === '/login' || path === '/reset-password') return
    sessionStorage.setItem(LAST_PROTECTED_ROUTE_KEY, path)
  }, [location.hash, location.pathname, location.search])

  const loadAccessContext = useCallback(async (userId) => {
    if (!supabase) return false

    const { data: profileData, error: profileError } = await supabase
      .from('staff_profiles')
      .select('user_id, full_name, first_name, middle_name, last_name, suffix, birth_date, mobile_number, address, username, email, role, is_active')
      .eq('user_id', userId)
      .maybeSingle()

    if (profileError || !profileData || !profileData.is_active) {
      profileUserIdRef.current = null
      setProfile(null)
      setNavItems([])
      setError('Account is not provisioned for system access.')
      return false
    }

    const { data: navigationData, error: navigationError } = await supabase.rpc('allowed_navigation')
    if (navigationError) {
      profileUserIdRef.current = null
      setProfile(null)
      setNavItems([])
      setError('Unable to load role navigation.')
      return false
    }

    profileUserIdRef.current = profileData.user_id
    setProfile(profileData)
    setNavItems((navigationData ?? []).map((row) => ({
      id: row.item_key,
      label: row.item_key === 'settings' ? 'Profile' : row.label,
      path: row.path,
    })))
    setError('')
    return true
  }, [])

  useEffect(() => {
    if (!supabase) return undefined

    let isMounted = true

    const clearAuthState = () => {
      profileUserIdRef.current = null
      setSession(null)
      setProfile(null)
      setNavItems([])
      setForm({ username: '', password: '' })
      setShowPassword(false)
      setForgotUsername('')
      setForgotCode('')
      setForgotNewPassword('')
      setForgotConfirmPassword('')
      setForgotStep('request')
      setForgotError('')
      setForgotSuccess('')
      setIsVerifyingCode(false)
      setIsSendingReset(false)
      setIsResettingPassword(false)
      setForgotAccessToken('')
      setForgotRefreshToken('')
      setIsLogoutModalOpen(false)
      sessionStorage.removeItem(ADD_PATIENT_DRAFT_KEY)
    }

    const syncSession = async (
      nextSession,
      options = { showLoading: false, forceContextRefresh: false },
    ) => {
      if (!isMounted) return
      const { showLoading, forceContextRefresh } = options

      if (showLoading) setIsBootstrapping(true)

      if (!nextSession) {
        clearAuthState()
        if (isMounted) setIsBootstrapping(false)
        return
      }

      setSession(nextSession)

      const userId = nextSession.user.id
      const shouldRefreshAccessContext = forceContextRefresh || profileUserIdRef.current !== userId

      if (shouldRefreshAccessContext) {
        const hasAccess = await loadAccessContext(userId)
        if (!hasAccess) {
          if (showLoading && isMounted) setIsBootstrapping(false)
          clearAuthState()
          setError('Account is not provisioned for system access.')
          await supabase.auth.signOut()
          return
        }
      }

      if (isMounted && showLoading) {
        setIsBootstrapping(false)
      }
    }

    const initializeSession = async () => {
      const { data, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) {
        setError('Unable to initialize session.')
        setIsBootstrapping(false)
        return
      }
      await syncSession(data.session, { showLoading: true, forceContextRefresh: true })
    }

    void initializeSession()

    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (!isMounted) return

      if (event === 'INITIAL_SESSION') return

      if (event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        setSession(nextSession)
        return
      }

      void syncSession(nextSession, {
        showLoading: false,
        forceContextRefresh: event === 'SIGNED_IN',
      })
    })

    return () => {
      isMounted = false
      listener.subscription.unsubscribe()
    }
  }, [loadAccessContext])

  useEffect(() => {
    if (!supabase || !session) return undefined

    let isMounted = true

    const validateSessionToken = async () => {
      if (document.visibilityState !== 'visible') return

      const { data, error: sessionError } = await supabase.auth.getSession()

      if (!isMounted) return

      if (sessionError) {
        setError('Session validation failed. Please login again.')
        await supabase.auth.signOut()
        return
      }

      const accessToken = data.session?.access_token
      if (!data.session || !accessToken || isAccessTokenExpired(accessToken)) {
        setError('Session token expired. Please login again.')
        await supabase.auth.signOut()
      }
    }

    const handleVisibilityChange = () => {
      void validateSessionToken()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    const tokenCheckTimer = window.setInterval(() => {
      void validateSessionToken()
    }, 60000)

    return () => {
      isMounted = false
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.clearInterval(tokenCheckTimer)
    }
  }, [session])

  useEffect(() => {
    if (!profile) return

    setStaffOnboardingForm({
      email: isPlaceholderStaffEmail(profile?.email) ? '' : `${profile?.email || ''}`.trim(),
      birthDate: profile?.birth_date || '',
      mobileNumber: toPhilippineLocalMobileInput(profile?.mobile_number || ''),
      address: profile?.address || '',
    })
    setStaffOnboardingStep('details')
    setStaffOnboardingCode('')
    setStaffOnboardingError('')
    setStaffOnboardingInfo('')
    setStaffOnboardingFieldErrors({})
  }, [profile?.user_id, profile?.email, profile?.birth_date, profile?.mobile_number, profile?.address])

  const handleStaffOnboardingFieldChange = (event) => {
    const { name, value } = event.target
    setStaffOnboardingForm((previous) => ({
      ...previous,
      [name]: name === 'mobileNumber' ? normalizePhilippineMobile(value) : value,
    }))
    setStaffOnboardingFieldErrors((previous) => {
      if (!previous[name]) return previous
      const next = { ...previous }
      delete next[name]
      return next
    })
    setStaffOnboardingError('')
    setStaffOnboardingInfo('')
  }

  const handleStaffOnboardingCodeChange = (event) => {
    setStaffOnboardingCode(event.target.value)
    setStaffOnboardingError('')
    setStaffOnboardingInfo('')
  }

  const handleStaffOnboardingSubmit = async (event) => {
    event.preventDefault()
    if (!supabase || !session?.user?.id) return

    const email = staffOnboardingForm.email.trim().toLowerCase()
    const birthDate = staffOnboardingForm.birthDate
    const mobileNumber = normalizePhilippineMobile(staffOnboardingForm.mobileNumber)
    const address = staffOnboardingForm.address.trim()
    const nextFieldErrors = {
      email: !email,
      birthDate: !birthDate,
      mobileNumber: !mobileNumber,
      address: !address,
    }

    if (!email || !birthDate || !mobileNumber || !address) {
      setStaffOnboardingFieldErrors(nextFieldErrors)
      setStaffOnboardingError('Please complete all required details.')
      return
    }

    setStaffOnboardingFieldErrors({})

    if (calculateAgeFromDate(birthDate) < 18) {
      setStaffOnboardingError('You must be at least 18 years old.')
      return
    }
    if (!/^9\d{9}$/.test(mobileNumber)) {
      setStaffOnboardingError('Enter a valid Philippine mobile number after +63, like 9762911478.')
      return
    }

    setIsStaffOnboardingSubmitting(true)
    setStaffOnboardingError('')
    setStaffOnboardingInfo('')

    try {
      const { data, error: sessionError } = await supabase.auth.getSession()
      const accessToken = data?.session?.access_token || ''
      if (sessionError || !accessToken) {
        setStaffOnboardingError('Your session expired. Please log in again.')
        setIsStaffOnboardingSubmitting(false)
        return
      }

      const response = await fetch('/api/auth/start-staff-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email,
          birthDate,
          mobileNumber: `+63${mobileNumber}`,
          address,
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setStaffOnboardingError(payload?.error || 'Unable to start profile verification.')
        setIsStaffOnboardingSubmitting(false)
        return
      }

      setStaffOnboardingStep('verify')
      setStaffOnboardingCode('')
      setStaffOnboardingInfo(`Verification code sent to ${payload?.email || email}.`)
      setIsStaffOnboardingSubmitting(false)
    } catch {
      setStaffOnboardingError('Unable to start profile verification.')
      setIsStaffOnboardingSubmitting(false)
    }
  }

  const handleStaffOnboardingVerify = async (event) => {
    event.preventDefault()
    if (!supabase || !session?.user?.id) return

    const code = staffOnboardingCode.trim()
    const email = staffOnboardingForm.email.trim().toLowerCase()

    if (!code) {
      setStaffOnboardingError('Please enter the verification code sent to your email.')
      return
    }

    setIsStaffOnboardingVerifying(true)
    setStaffOnboardingError('')
    setStaffOnboardingInfo('')

    try {
      const { data, error: sessionError } = await supabase.auth.getSession()
      const accessToken = data?.session?.access_token || ''
      if (sessionError || !accessToken) {
        setStaffOnboardingError('Your session expired. Please log in again.')
        setIsStaffOnboardingVerifying(false)
        return
      }

      const response = await fetch('/api/auth/verify-staff-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email,
          code,
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setStaffOnboardingError(payload?.error || 'Unable to verify onboarding code.')
        setIsStaffOnboardingVerifying(false)
        return
      }

      await loadAccessContext(session.user.id)
      setStaffOnboardingStep('details')
      setStaffOnboardingCode('')
      setStaffOnboardingInfo('')
      setIsStaffOnboardingVerifying(false)
    } catch {
      setStaffOnboardingError('Unable to verify onboarding code.')
      setIsStaffOnboardingVerifying(false)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleForgotUsernameChange = (event) => {
    setForgotUsername(event.target.value)
    setForgotError('')
    setForgotSuccess('')
  }

  const handleForgotCodeChange = (event) => {
    setForgotCode(event.target.value)
    setForgotError('')
    setForgotSuccess('')
  }

  const handleForgotNewPasswordChange = (event) => {
    setForgotNewPassword(event.target.value)
    setForgotError('')
    setForgotSuccess('')
  }

  const handleForgotConfirmPasswordChange = (event) => {
    setForgotConfirmPassword(event.target.value)
    setForgotError('')
    setForgotSuccess('')
  }

  const handleForgotClose = () => {
    setForgotUsername('')
    setForgotCode('')
    setForgotNewPassword('')
    setForgotConfirmPassword('')
    setForgotStep('request')
    setForgotError('')
    setForgotSuccess('')
    setIsVerifyingCode(false)
    setIsSendingReset(false)
    setIsResettingPassword(false)
    setForgotAccessToken('')
    setForgotRefreshToken('')
  }

  const handleForgotSubmit = async (event) => {
    event.preventDefault()

    const username = forgotUsername.trim()
    if (!username) {
      setForgotError('Please enter your username.')
      setForgotSuccess('')
      return
    }

    setIsSendingReset(true)
    setForgotError('')
    setForgotSuccess('')

    try {
      const redirectTo = `${window.location.origin}/reset-password`
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: username,
          redirectTo,
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setForgotError(payload?.error || 'Unable to send reset email. Please try again.')
        setIsSendingReset(false)
        return
      }

      setForgotUsername(payload?.email || username)
      setForgotCode('')
      setForgotStep('verify')
      setForgotSuccess(`Verification code sent to ${payload?.email || username}. Check your email inbox for the latest code.`)
      setIsSendingReset(false)
    } catch {
      setForgotError('Unable to send verification code. Please try again.')
      setIsSendingReset(false)
    }
  }

  const handleForgotVerifyCode = async (event) => {
    event.preventDefault()

    const username = forgotUsername.trim()
    const code = forgotCode.trim()

    if (!username || !code) {
      setForgotError('Enter your username/email and verification code.')
      return
    }

    setIsVerifyingCode(true)
    setForgotError('')
    setForgotSuccess('')

    try {
      const response = await fetch('/api/auth/verify-reset-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: username,
          code,
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        const rawError = String(payload?.error || '').toLowerCase()
        const nextError = rawError.includes('expired') || rawError.includes('invalid')
          ? 'That verification code is invalid or expired. Please use the latest code sent to your email, or request a new one.'
          : (payload?.error || 'Invalid or expired verification code.')
        setForgotError(nextError)
        setIsVerifyingCode(false)
        return
      }

      const accessToken = payload?.session?.access_token || ''
      const refreshToken = payload?.session?.refresh_token || ''
      if (!accessToken || !refreshToken) {
        setForgotError('Verification succeeded, but no active session was returned. Please request a new code.')
        setIsVerifyingCode(false)
        return
      }

      setForgotAccessToken(accessToken)
      setForgotRefreshToken(refreshToken)
      setForgotStep('reset')
      setForgotSuccess('Code verified. You can now set a new password.')
      setIsVerifyingCode(false)
    } catch {
      setForgotError('Unable to verify code. Please try again.')
      setIsVerifyingCode(false)
    }
  }

  const handleForgotResetPassword = async (event) => {
    event.preventDefault()

    const newPassword = forgotNewPassword.trim()
    const confirmPassword = forgotConfirmPassword.trim()

    if (!forgotAccessToken || !forgotRefreshToken) {
      setForgotError('Verification session expired. Please request a new code.')
      setForgotStep('request')
      return
    }

    if (!newPassword || !confirmPassword) {
      setForgotError('Please enter and confirm your new password.')
      return
    }

    if (newPassword.length < 8) {
      setForgotError('Password must be at least 8 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setForgotError('Passwords do not match.')
      return
    }

    setIsResettingPassword(true)
    setForgotError('')
    setForgotSuccess('')

    try {
      const updatePasswordWithToken = async (accessToken) => {
        const response = await fetch('/api/auth/update-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            newPassword,
          }),
        })
        const payload = await response.json().catch(() => ({}))
        return { response, payload }
      }

      let activeAccessToken = forgotAccessToken
      let { response, payload } = await updatePasswordWithToken(activeAccessToken)

      if (!response.ok && String(payload?.error || '').toLowerCase().includes('auth session missing')) {
        const refreshResponse = await fetch('/api/auth/refresh-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: forgotRefreshToken,
          }),
        })
        const refreshPayload = await refreshResponse.json().catch(() => ({}))
        if (refreshResponse.ok && refreshPayload?.session?.access_token && refreshPayload?.session?.refresh_token) {
          activeAccessToken = refreshPayload.session.access_token
          setForgotAccessToken(refreshPayload.session.access_token)
          setForgotRefreshToken(refreshPayload.session.refresh_token)
          ;({ response, payload } = await updatePasswordWithToken(activeAccessToken))
        }
      }

      if (!response.ok) {
        setForgotError(payload?.error || 'Unable to update password.')
        setIsResettingPassword(false)
        return
      }

      setForgotStep('done')
      setForgotCode('')
      setForgotNewPassword('')
      setForgotConfirmPassword('')
      setForgotAccessToken('')
      setForgotRefreshToken('')
      setForgotSuccess('Password updated successfully. You can now log in.')
      setIsResettingPassword(false)
    } catch {
      setForgotError('Unable to update password.')
      setIsResettingPassword(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!supabase) return

    const submittedForm = new FormData(event.currentTarget)
    const liveUsername = `${submittedForm.get('username') ?? ''}`
    const livePassword = `${submittedForm.get('password') ?? ''}`
    const loginInput = liveUsername.trim()

    setForm({
      username: liveUsername,
      password: livePassword,
    })

    if (!loginInput || !livePassword) {
      setError('Please enter username/email and password.')
      return
    }

    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: loginInput,
          password: livePassword,
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(payload?.error || 'Incorrect username or password.')
        return
      }

      const accessToken = payload?.session?.access_token || ''
      const refreshToken = payload?.session?.refresh_token || ''
      if (!accessToken || !refreshToken) {
        setError('Login succeeded, but no session was returned.')
        return
      }

      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })

      if (sessionError) {
        setError(sessionError.message || 'Unable to finish login.')
        return
      }
    } catch {
      setError('Unable to log in right now.')
      return
    }

    setError('')
    setIsLoginTransitioning(true)
    const restorePath = sessionStorage.getItem(LAST_PROTECTED_ROUTE_KEY)
    const nextPath = restorePath && restorePath !== '/login' ? restorePath : '/home'
    await new Promise((resolve) => {
      window.setTimeout(resolve, 650)
    })
    setIsLoginTransitioning(false)
    navigate(nextPath, { replace: true })
  }

  const handleLogoutRequest = () => {
    setIsLogoutModalOpen(true)
  }

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false)
  }

  const handleLogoutConfirm = async () => {
    if (!supabase) return

    setIsLogoutModalOpen(false)

    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) {
      setError(signOutError.message)
      return
    }

    setProfile(null)
    setNavItems([])
    setForm({ username: '', password: '' })
    setShowPassword(false)
    sessionStorage.removeItem(ADD_PATIENT_DRAFT_KEY)
    navigate('/login', { replace: true })
  }

  const handleBackToLogin = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setStaffOnboardingStep('details')
    setStaffOnboardingCode('')
    setStaffOnboardingError('')
    setStaffOnboardingInfo('')
    navigate('/login', { replace: true })
  }

  const handleStaffOnboardingBackToDetails = (event) => {
    event?.preventDefault?.()
    event?.stopPropagation?.()
    setStaffOnboardingStep('details')
    setStaffOnboardingCode('')
    setStaffOnboardingError('')
    setStaffOnboardingInfo('')
  }

  if (isBootstrapping || isLoginTransitioning) {
    return <div className="app-loading">{isLoginTransitioning ? 'Signing in...' : 'Loading...'}</div>
  }

  if (!supabase) {
    return (
      <div className="app-loading">
        Missing frontend env vars: {missingSupabaseEnv.join(', ')}. Create `frontend/.env`.
      </div>
    )
  }

  const isAuthed = Boolean(session && profile?.is_active)
  const isResetPasswordRoute = location.pathname === '/reset-password'
  const isStaffOnboardingOpen = isAuthed && requiresStaffOnboarding(profile)

  if (!isAuthed && location.pathname !== '/login' && !isResetPasswordRoute) {
    return <Navigate to="/login" replace />
  }

  if (isAuthed && location.pathname === '/login') {
    return <Navigate to="/home" replace />
  }

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginRoute
              onLogin={handleSubmit}
              form={form}
              error={error}
              showPassword={showPassword}
              onChange={handleChange}
              onTogglePassword={() => setShowPassword((prev) => !prev)}
              forgotUsername={forgotUsername}
              forgotCode={forgotCode}
              forgotNewPassword={forgotNewPassword}
              forgotConfirmPassword={forgotConfirmPassword}
              forgotStep={forgotStep}
              forgotError={forgotError}
              forgotSuccess={forgotSuccess}
              isVerifyingCode={isVerifyingCode}
              isSendingReset={isSendingReset}
              isResettingPassword={isResettingPassword}
              onForgotUsernameChange={handleForgotUsernameChange}
              onForgotCodeChange={handleForgotCodeChange}
              onForgotNewPasswordChange={handleForgotNewPasswordChange}
              onForgotConfirmPasswordChange={handleForgotConfirmPasswordChange}
              onForgotSubmit={handleForgotSubmit}
              onForgotVerifyCode={handleForgotVerifyCode}
              onForgotResetPassword={handleForgotResetPassword}
              onForgotClose={handleForgotClose}
            />
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/*" element={<ProtectedLayout onLogout={handleLogoutRequest} navItems={navItems} role={profile?.role} profile={profile} sessionUser={session?.user} onProfileChange={setProfile} isLogoutModalOpen={isLogoutModalOpen} />} />
      </Routes>

      {isLogoutModalOpen ? (
        <>
          <div className="modal-backdrop" onClick={closeLogoutModal} />
          <section className="logout-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="logout-confirm-title">
            <div className="pr-modal-head"><h2 id="logout-confirm-title">Logout</h2></div>
            <div className="pr-modal-body">
              <p>Are you sure you want to logout?</p>
              <div className="modal-actions">
                <button type="button" className="danger-btn" onClick={closeLogoutModal}>Cancel</button>
                <button type="button" className="success-btn" onClick={() => { void handleLogoutConfirm() }}>Logout</button>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {isStaffOnboardingOpen ? (
        <>
          <div className="modal-backdrop" />
          <section className="pr-modal onboarding-modal" role="dialog" aria-modal="true" aria-labelledby="staff-onboarding-title">
            <div className="pr-modal-head">
              <h2 id="staff-onboarding-title">
                {staffOnboardingStep === 'details' ? 'Complete Your Profile' : 'Verify Your Email'}
              </h2>
            </div>
            <div className="pr-modal-body">
              {staffOnboardingStep === 'details' ? (
                <form className="onboarding-form" onSubmit={(event) => { void handleStaffOnboardingSubmit(event) }}>
                  <p>Please complete your details first before accessing the system.</p>
                  <div className="onboarding-grid">
                    <label className={staffOnboardingFieldErrors.email ? 'field-required has-error' : 'field-required'}>
                      <span className="field-label-copy">Email</span>
                      <input type="email" name="email" value={staffOnboardingForm.email} onChange={handleStaffOnboardingFieldChange} placeholder="Enter your real email" />
                    </label>
                    <label className={staffOnboardingFieldErrors.birthDate ? 'field-required has-error' : 'field-required'}>
                      <span className="field-label-copy">Birthday</span>
                      <input type="date" name="birthDate" value={staffOnboardingForm.birthDate} onChange={handleStaffOnboardingFieldChange} max={getAdultBirthDateMax()} />
                    </label>
                    <label className={staffOnboardingFieldErrors.mobileNumber ? 'field-required has-error' : 'field-required'}>
                      <span className="field-label-copy">Mobile Number</span>
                      <div className="onboarding-phone-field">
                        <span className="onboarding-phone-prefix">+63</span>
                        <input type="text" inputMode="numeric" name="mobileNumber" value={staffOnboardingForm.mobileNumber} onChange={handleStaffOnboardingFieldChange} placeholder="9762911478" />
                      </div>
                    </label>
                    <label className={`span-2 field-required${staffOnboardingFieldErrors.address ? ' has-error' : ''}`}>
                      <span className="field-label-copy">Address</span>
                      <input type="text" name="address" value={staffOnboardingForm.address} onChange={handleStaffOnboardingFieldChange} placeholder="Enter your address" />
                    </label>
                  </div>
                  {staffOnboardingError ? <p className="error">{staffOnboardingError}</p> : null}
                  {staffOnboardingInfo ? <p className="onboarding-success">{staffOnboardingInfo}</p> : null}
                  <div className="modal-actions">
                    <button type="button" className="ghost" onClick={() => { void handleBackToLogin() }} disabled={isStaffOnboardingSubmitting}>
                      Back to Login
                    </button>
                    <button type="submit" className="success-btn" disabled={isStaffOnboardingSubmitting}>
                      {isStaffOnboardingSubmitting ? 'Sending...' : 'Submit Details'}
                    </button>
                  </div>
                </form>
              ) : (
                <form className="onboarding-form onboarding-verify-form" onSubmit={(event) => { void handleStaffOnboardingVerify(event) }}>
                  <p>Enter the verification code that was sent to your email.</p>
                  <div className="onboarding-grid single">
                    <label>
                      Verification Code
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        value={staffOnboardingCode}
                        onChange={handleStaffOnboardingCodeChange}
                        placeholder="Enter 6-digit code"
                      />
                    </label>
                  </div>
                  {staffOnboardingError ? <p className="error">{staffOnboardingError}</p> : null}
                  {staffOnboardingInfo ? <p className="onboarding-success">{staffOnboardingInfo}</p> : null}
                  <div className="modal-actions">
                    <button type="button" className="ghost onboarding-secondary-btn" onClick={() => { void handleBackToLogin() }} disabled={isStaffOnboardingVerifying}>
                      Back to Login
                    </button>
                    <button type="button" className="ghost onboarding-secondary-btn" onClick={handleStaffOnboardingBackToDetails} disabled={isStaffOnboardingVerifying}>
                      Back to Details
                    </button>
                    <button type="submit" className="success-btn" disabled={isStaffOnboardingVerifying}>
                      {isStaffOnboardingVerifying ? 'Verifying...' : 'Verify Code'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        </>
      ) : null}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
