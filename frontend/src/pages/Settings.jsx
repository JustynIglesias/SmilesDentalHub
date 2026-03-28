import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import clinicLogo from '../assets/DENTAL LOGO.png'

const ROLE_LABELS = {
  admin: 'Admin',
  associate_dentist: 'Associate Dentist',
  receptionist: 'Receptionist',
}

const formatStaffCode = (userId) => {
  const raw = `${userId || ''}`.trim()
  if (/^ST-\d{6}$/i.test(raw)) return raw.toUpperCase()

  const digits = raw.replace(/\D/g, '')
  if (digits) return `ST-${digits.slice(-6).padStart(6, '0')}`

  const alphanumerics = raw.replace(/[^a-zA-Z0-9]/g, '')
  const tail = alphanumerics.slice(-6).toUpperCase()
  return `ST-${tail.padStart(6, '0')}`
}

const formatDateTime = (value) => {
  if (!value) return 'Not available'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Not available'
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function Settings({ currentProfile, currentSessionUser }) {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [lastPasswordUpdatedAt, setLastPasswordUpdatedAt] = useState(currentSessionUser?.updated_at || '')

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const trimmedNewPassword = newPassword.trim()
    const trimmedConfirmPassword = confirmPassword.trim()

    if (!trimmedNewPassword || !trimmedConfirmPassword) {
      setError('Please enter and confirm your new password.')
      return
    }

    if (trimmedNewPassword.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (trimmedNewPassword !== trimmedConfirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const { data, error: sessionError } = await supabase.auth.getSession()
      const accessToken = data?.session?.access_token

      if (sessionError || !accessToken) {
        setError('Your session expired. Please log in again.')
        setIsSubmitting(false)
        return
      }

      const response = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          newPassword: trimmedNewPassword,
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(payload?.error || 'Unable to update password.')
        setIsSubmitting(false)
        return
      }

      setNewPassword('')
      setConfirmPassword('')
      setLastPasswordUpdatedAt(new Date().toISOString())
      setIsSuccessModalOpen(true)
      setIsSubmitting(false)
    } catch {
      setError('Unable to update password.')
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <header className="page-header">
        <h1>Settings</h1>
      </header>

      <section className="panel settings-page">
        <div className="panel-card settings-card">
          <div className="settings-shell">
            <div className="settings-hero-card">
              <div className="settings-hero-copy">
                <p className="settings-eyebrow">Account Center</p>
                <h2>{currentProfile?.full_name || 'Staff User'}</h2>
                <p className="settings-hero-role">{ROLE_LABELS[currentProfile?.role] || currentProfile?.role || '-'}</p>
                <div className="settings-hero-meta">
                  <div className="settings-hero-chip">
                    <span>Staff ID</span>
                    <strong>{formatStaffCode(currentProfile?.user_id)}</strong>
                  </div>
                  <div className="settings-hero-chip">
                    <span>Username</span>
                    <strong>{currentProfile?.username || '-'}</strong>
                  </div>
                  <div className="settings-hero-chip settings-hero-chip-wide">
                    <span>Password Last Updated</span>
                    <strong>{formatDateTime(lastPasswordUpdatedAt)}</strong>
                  </div>
                </div>
              </div>

              <div className="settings-hero-brand">
                <img src={clinicLogo} alt="Smiles Dental Hub logo" className="settings-hero-logo" />
              </div>
            </div>

            <div className="settings-column">
              <div className="settings-section settings-section-card">
                <h2 className="panel-title">Profile Information</h2>
                <div className="history-top-grid settings-grid settings-profile-grid">
                  <label>
                    Staff ID
                    <input type="text" value={formatStaffCode(currentProfile?.user_id)} readOnly />
                  </label>

                  <label>
                    Full Name
                    <input type="text" value={currentProfile?.full_name || '-'} readOnly />
                  </label>

                  <label>
                    Username
                    <input type="text" value={currentProfile?.username || '-'} readOnly />
                  </label>

                  <label>
                    Email
                    <input type="text" value={currentProfile?.email || '-'} readOnly />
                  </label>

                  <label className="span-2">
                    Role
                    <input type="text" value={ROLE_LABELS[currentProfile?.role] || currentProfile?.role || '-'} readOnly />
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-column">
              <form className="settings-form settings-section settings-section-card" onSubmit={(event) => { void handleSubmit(event) }}>
                <h2 className="panel-title">Security</h2>
                <div className="history-top-grid settings-grid settings-security-grid">
                  <label>
                    New Password
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(event) => {
                        setNewPassword(event.target.value)
                        setError('')
                      }}
                      autoComplete="new-password"
                      disabled={isSubmitting}
                    />
                  </label>

                  <label>
                    Confirm Password
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value)
                        setError('')
                      }}
                      autoComplete="new-password"
                      disabled={isSubmitting}
                    />
                  </label>
                </div>

                <div className="settings-help-card">
                  <h3>Password Tips</h3>
                  <ul className="settings-tip-list">
                    <li>Use at least 8 characters.</li>
                    <li>Mix uppercase, lowercase, numbers, or symbols.</li>
                    <li>Avoid using your username or email in the password.</li>
                  </ul>
                </div>

                {error ? <p className="nav-password-error settings-error">{error}</p> : null}

                <div className="settings-actions">
                  <button type="submit" className="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {isSuccessModalOpen ? (
        <>
          <div className="modal-backdrop" onClick={closeSuccessModal} />
          <div className="pr-modal procedures-modal success-modal settings-success-modal" role="dialog" aria-modal="true" aria-labelledby="settings-success-title">
            <div className="pr-modal-head"><h2 id="settings-success-title">&nbsp;</h2></div>
            <div className="pr-modal-body">
              <p>Password updated successfully.</p>
              <div className="modal-actions center">
                <button type="button" className="success-btn" onClick={closeSuccessModal}>Done</button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default Settings
