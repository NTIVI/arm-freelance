import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { PostJob } from './pages/PostJob';
import { Admin } from './pages/Admin';
import { JobDetails } from './pages/JobDetails';
import { Profile } from './pages/Profile';
import { Messages } from './pages/Messages';
import { SpecialistCatalog } from './pages/SpecialistCatalog';
import { ProjectCatalog } from './pages/ProjectCatalog';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/job/:id" element={<JobDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/specialists" element={<SpecialistCatalog />} />
              <Route path="/catalog" element={<ProjectCatalog />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
