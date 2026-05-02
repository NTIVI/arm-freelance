import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useAppContext } from './context/AppContext'
import { LandingPage } from './pages/LandingPage'
import { Auth } from './pages/Auth'
import { Dashboard } from './pages/Dashboard'
import { PostJob } from './pages/PostJob'
import { JobDetails } from './pages/JobDetails'
import { Profile } from './pages/Profile'
import { Admin } from './pages/Admin'
import { LanguageProvider } from './context/LanguageContext'

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: 'client' | 'freelancer' }) => {
  const { user } = useAppContext();
  if (!user) return <Navigate to="/auth" />;
  if (role && user.role !== role) return <Navigate to="/dashboard" />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/post-job" element={
        <ProtectedRoute role="client">
          <PostJob />
        </ProtectedRoute>
      } />

      <Route path="/jobs/:id" element={
        <ProtectedRoute>
          <JobDetails />
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      <Route path="/admin" element={<Admin />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AppProvider>
    </LanguageProvider>
  )
}
