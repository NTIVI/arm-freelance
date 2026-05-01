import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Menu, X } from 'lucide-react'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { Hero } from './pages/LandingPage'
import { RegistrationForm } from './pages/Registration'
import { Dashboard } from './pages/Dashboard'

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-2 py-1">
      {(['hy', 'ru', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 rounded-full text-xs font-black transition-all ${lang === l ? 'bg-primary text-white' : 'text-white/40 hover:text-white'}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

const Navbar = ({ onAuth }: { onAuth: () => void }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-[2rem]">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter hidden sm:inline-block">ARMENIA FREELANCE</span>
          <span className="text-xl font-black tracking-tighter sm:hidden">AF</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">{t('find_talent')}</a>
          <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">{t('find_work')}</a>
          <LanguageSwitcher />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button onClick={onAuth} className="text-sm font-bold text-white/70 hover:text-white transition-colors">{t('login')}</button>
          <button onClick={onAuth} className="btn-primary">{t('signup')}</button>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  )
}

function MainApp() {
  const [view, setView] = useState<'home' | 'register' | 'dashboard'>('home')
  const [user, setUser] = useState<any>(null)

  // Auto-login simulation if user data exists
  useEffect(() => {
    const savedUser = localStorage.getItem('af_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setView('dashboard');
    }
  }, []);

  const handleRegistrationComplete = (data: any) => {
    setUser(data);
    localStorage.setItem('af_user', JSON.stringify(data));
    setView('dashboard');
  }

  const handleLogout = () => {
    localStorage.removeItem('af_user');
    setUser(null);
    setView('home');
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      {view !== 'dashboard' && <Navbar onAuth={() => setView('register')} />}
      
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero onStart={() => setView('register')} />
          </motion.div>
        )}

        {view === 'register' && (
          <motion.div key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <RegistrationForm onBack={() => setView('home')} onComplete={handleRegistrationComplete} />
          </motion.div>
        )}

        {view === 'dashboard' && user && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dashboard user={user} onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>

      {view !== 'dashboard' && (
        <footer className="py-20 px-6 border-t border-white/5 bg-black/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-white/30 text-sm">
            <div className="space-y-4">
                <TrendingUp className="w-8 h-8 text-primary" />
                <p>The first premier marketplace dedicated to high-tier Armenian talent. Connect, collaborate, and succeed globally.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Explore</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-primary">Find Work</a></li>
                <li><a href="#" className="hover:text-primary">Find Talent</a></li>
                <li><a href="#" className="hover:text-primary">Agencies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Security</a></li>
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 text-center text-white/20 text-xs font-bold uppercase tracking-[0.2em]">
            &copy; 2026 Armenia Freelance Marketplace. All Rights Reserved.
          </div>
        </footer>
      )}
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  )
}
