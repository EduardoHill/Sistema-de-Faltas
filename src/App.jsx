import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { useState, useCallback } from 'react'
import './App.css'

// Constants
import { USER_ROLES, ROUTES, DEFAULT_USERS } from './constants'

// Import all screen components
import LoginScreen from './components/screens/LoginScreen'
import DepartmentManagement from './components/screens/DepartmentManagement'
import CourseManagement from './components/screens/CourseManagement'
import ProfessorDashboard from './components/screens/ProfessorDashboard'
import AttendanceEntry from './components/screens/AttendanceEntry'
import JustificationReview from './components/screens/JustificationReview'
import StudentDashboard from './components/screens/StudentDashboard'
import BatchUpload from './components/screens/BatchUpload'
import GradeClosure from './components/screens/GradeClosure'
import Notifications from './components/screens/Notifications'
import Settings from './components/screens/Settings'

// Layout components
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(USER_ROLES.ADMIN)
  const [currentUser, setCurrentUser] = useState({
    name: 'João Silva',
    email: 'joao.silva@universidade.edu.br',
    role: USER_ROLES.ADMIN,
  })

  // Mock login function - optimized with useCallback
  const handleLogin = useCallback(
    (email, password, role = USER_ROLES.ADMIN) => {
      setIsAuthenticated(true)
      setUserRole(role)

      const userData = DEFAULT_USERS[role] || DEFAULT_USERS[USER_ROLES.ADMIN]
      setCurrentUser({
        ...userData,
        email: email,
        role: role,
      })
    },
    []
  )

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false)
    setUserRole('')
    setCurrentUser(null)
  }, [])

  // If not authenticated, show only login screen
  if (!isAuthenticated) {
    return (
      <Router>
        <div className='min-h-screen bg-background'>
          <Routes>
            <Route
              path={ROUTES.LOGIN}
              element={<LoginScreen onLogin={handleLogin} />}
            />
            <Route path='*' element={<Navigate to={ROUTES.LOGIN} replace />} />
          </Routes>
        </div>
      </Router>
    )
  }

  // Main app layout with sidebar and header
  return (
    <Router>
      <div className='min-h-screen bg-background flex'>
        <Sidebar userRole={userRole} onLogout={handleLogout} />
        <div className='flex-1 flex flex-col'>
          <Header currentUser={currentUser} />
          <main className='flex-1 p-6 overflow-auto'>
            <Routes>
              {/* Admin Routes */}
              {userRole === USER_ROLES.ADMIN && (
                <>
                  <Route
                    path={ROUTES.ADMIN.DEPARTMENTS}
                    element={<DepartmentManagement />}
                  />
                  <Route
                    path={ROUTES.ADMIN.BATCH_UPLOAD}
                    element={<BatchUpload />}
                  />
                </>
              )}

              {/* Department Head Routes */}
              {(userRole === USER_ROLES.DEPARTMENT_HEAD ||
                userRole === USER_ROLES.ADMIN) && (
                <>
                  <Route
                    path={ROUTES.DEPARTMENT.COURSES}
                    element={<CourseManagement />}
                  />
                  <Route
                    path={ROUTES.DEPARTMENT.GRADE_CLOSURE}
                    element={<GradeClosure />}
                  />
                </>
              )}

              {/* Professor Routes */}
              {(userRole === USER_ROLES.PROFESSOR ||
                userRole === USER_ROLES.ADMIN) && (
                <>
                  <Route
                    path={ROUTES.PROFESSOR.DASHBOARD}
                    element={<ProfessorDashboard />}
                  />
                  <Route
                    path={ROUTES.PROFESSOR.ATTENDANCE}
                    element={<AttendanceEntry />}
                  />
                  <Route
                    path={ROUTES.PROFESSOR.JUSTIFICATIONS}
                    element={<JustificationReview />}
                  />
                </>
              )}

              {/* Student Routes */}
              {(userRole === USER_ROLES.STUDENT ||
                userRole === USER_ROLES.ADMIN) && (
                <Route
                  path={ROUTES.STUDENT.DASHBOARD}
                  element={<StudentDashboard />}
                />
              )}

              {/* Common Routes */}
              <Route
                path={ROUTES.COMMON.NOTIFICATIONS}
                element={<Notifications />}
              />
              <Route
                path={ROUTES.COMMON.SETTINGS}
                element={<Settings currentUser={currentUser} />}
              />

              {/* Default redirect based on role */}
              <Route
                path='/'
                element={
                  <Navigate
                    to={
                      userRole === USER_ROLES.ADMIN
                        ? ROUTES.ADMIN.DEPARTMENTS
                        : userRole === USER_ROLES.DEPARTMENT_HEAD
                        ? ROUTES.DEPARTMENT.COURSES
                        : userRole === USER_ROLES.PROFESSOR
                        ? ROUTES.PROFESSOR.DASHBOARD
                        : userRole === USER_ROLES.STUDENT
                        ? ROUTES.STUDENT.DASHBOARD
                        : ROUTES.LOGIN
                    }
                    replace
                  />
                }
              />

              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
