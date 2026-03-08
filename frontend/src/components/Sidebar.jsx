import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'
import navbarLogo from '../assets/navbar_logo.png'
import homeIcon from '../assets/icon/Home.png'
import patientRecordsIcon from '../assets/icon/Patient Records.png'
import addPatientIcon from '../assets/icon/Add patient.png'
import procedureIcon from '../assets/icon/Procedure.png'
import patientLogsIcon from '../assets/icon/Patient logs.png'
import adminIcon from '../assets/icon/Admin.png'
import logoutIcon from '../assets/icon/Logout.png'

const NAV_ICONS = {
  home: homeIcon,
  records: patientRecordsIcon,
  'add-patient': addPatientIcon,
  procedure: procedureIcon,
  logs: patientLogsIcon,
  admin: adminIcon,
}

function Sidebar({ onLogout, navItems }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [guardState, setGuardState] = useState({
    isOpen: false,
    nextPath: '',
    password: '',
    error: '',
    isChecking: false,
  })

  useEffect(() => {
    if (!guardState.isOpen) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setGuardState({
          isOpen: false,
          nextPath: '',
          password: '',
          error: '',
          isChecking: false,
        })
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [guardState.isOpen])

  const handleNavClick = (event, destinationPath) => {
    const isOnAddPatientPage = location.pathname === '/add-patient'
    const isLeavingAddPatient = isOnAddPatientPage && destinationPath !== '/add-patient'
    if (!isLeavingAddPatient) return

    event.preventDefault()
    setGuardState({
      isOpen: true,
      nextPath: destinationPath,
      password: '',
      error: '',
      isChecking: false,
    })
  }

  const closeGuardModal = () => {
    setGuardState({
      isOpen: false,
      nextPath: '',
      password: '',
      error: '',
      isChecking: false,
    })
  }

  const continueNavigation = async () => {
    if (!guardState.password.trim()) {
      setGuardState((previous) => ({ ...previous, error: 'Password is required.' }))
      return
    }

    setGuardState((previous) => ({ ...previous, isChecking: true, error: '' }))

    const { data: authData, error: authError } = await supabase.auth.getUser()
    const email = authData?.user?.email

    if (authError || !email) {
      setGuardState((previous) => ({
        ...previous,
        isChecking: false,
        error: 'Unable to verify current user. Please log in again.',
      }))
      return
    }

    const verifyClient = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      },
    )

    const { error: signInError } = await verifyClient.auth.signInWithPassword({
      email,
      password: guardState.password,
    })

    if (signInError) {
      setGuardState((previous) => ({
        ...previous,
        isChecking: false,
        error: 'Incorrect password. Access denied.',
      }))
      return
    }

    const destination = guardState.nextPath
    closeGuardModal()
    navigate(destination)
  }

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <img className="sidebar-logo" src={navbarLogo} alt="Smiles Dental Hub logo" />
        </div>
        <nav className="sidebar-nav">
          {(navItems ?? []).map((item) => (
            <NavLink key={item.id} to={item.path} className="nav-item" onClick={(event) => handleNavClick(event, item.path)}>
              <img className="nav-icon image" src={NAV_ICONS[item.id] ?? homeIcon} alt="" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="logout" onClick={onLogout}>
          <img className="nav-icon image" src={logoutIcon} alt="" aria-hidden="true" />
          Logout
        </button>
      </aside>

      {guardState.isOpen ? (
        <>
          <div className="modal-backdrop" onClick={closeGuardModal} />
          <section className="nav-password-modal" role="dialog" aria-modal="true" aria-labelledby="nav-password-title">
            <div className="nav-password-modal-head" />
            <div className="nav-password-modal-body">
              <h3 id="nav-password-title">Restricted Navigation</h3>
              <p>
                Add Patient is open for customer input only. Enter your password to switch tabs.
              </p>
              <label htmlFor="nav-password-input">Password</label>
              <input
                id="nav-password-input"
                type="password"
                value={guardState.password}
                onChange={(event) => setGuardState((previous) => ({ ...previous, password: event.target.value, error: '' }))}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') void continueNavigation()
                }}
                disabled={guardState.isChecking}
                autoFocus
              />
              {guardState.error ? <p className="nav-password-error">{guardState.error}</p> : null}
              <div className="nav-password-actions">
                <button type="button" className="danger-btn" onClick={closeGuardModal} disabled={guardState.isChecking}>Cancel</button>
                <button type="button" className="success-btn" onClick={() => { void continueNavigation() }} disabled={guardState.isChecking}>
                  {guardState.isChecking ? 'Verifying...' : 'Continue'}
                </button>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </>
  )
}

export default Sidebar
