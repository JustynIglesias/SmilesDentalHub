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
import { isAccessTokenExpired, missingSupabaseEnv, supabase } from './lib/supabaseClient'

const ADD_PATIENT_DRAFT_KEY = 'dent22.addPatientDraft.v1'

function LoginRoute({ onLogin, form, error, showPassword, onChange, onTogglePassword }) {
  return (
    <Login
      form={form}
      error={error}
      showPassword={showPassword}
      onChange={onChange}
      onSubmit={onLogin}
      onTogglePassword={onTogglePassword}
    />
  )
}

function ProtectedLayout({ onLogout, navItems, role, profile }) {
  return (
    <div className="dashboard">
      <Sidebar onLogout={onLogout} navItems={navItems} />
      <main className="dashboard-main">
        <Routes>
          <Route path="/home" element={<Home currentProfile={profile} />} />
          <Route path="/records" element={<PatientRecords />} />
          <Route path="/records/:id" element={<PatientRecordDetails currentRole={role} currentProfile={profile} />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/procedure" element={<Procedures />} />
          <Route path="/logs" element={<PatientLogs />} />
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
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ username: '', password: '' })
  const profileUserIdRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const loadAccessContext = useCallback(async (userId) => {
    if (!supabase) return false

    const { data: profileData, error: profileError } = await supabase
      .from('staff_profiles')
      .select('user_id, full_name, role, is_active')
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
      label: row.label,
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

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!supabase) return

    const username = form.username.trim()
    if (!username || !form.password) {
      setError('Please enter username and password.')
      return
    }

    const { data: emailForLogin, error: resolveError } = await supabase.rpc('resolve_login_email', {
      p_username: username,
    })

    if (resolveError || !emailForLogin) {
      setError('Incorrect username or password.')
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: emailForLogin,
      password: form.password,
    })

    if (signInError) {
      setError('Incorrect username or password.')
      return
    }

    setError('')
    navigate('/home', { replace: true })
  }

  const handleLogout = async () => {
    if (!supabase) return

    const confirmed = window.confirm('Are you sure you want to logout?')
    if (!confirmed) return

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

  if (isBootstrapping) {
    return <div className="app-loading">Loading...</div>
  }

  if (!supabase) {
    return (
      <div className="app-loading">
        Missing frontend env vars: {missingSupabaseEnv.join(', ')}. Create `frontend/.env`.
      </div>
    )
  }

  const isAuthed = Boolean(session && profile?.is_active)

  if (!isAuthed && location.pathname !== '/login') {
    return <Navigate to="/login" replace />
  }

  if (isAuthed && location.pathname === '/login') {
    return <Navigate to="/home" replace />
  }

  return (
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
          />
        }
      />
      <Route path="/*" element={<ProtectedLayout onLogout={handleLogout} navItems={navItems} role={profile?.role} profile={profile} />} />
    </Routes>
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
