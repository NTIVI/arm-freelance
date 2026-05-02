import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Command } from 'lucide-react'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { Hero } from './pages/LandingPage'
import { RegistrationForm } from './pages/Registration'
import { Dashboard } from './pages/Dashboard'

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center space-x-1 bg-[#121212] border border-white/5 rounded-lg p-1">
      {(['hy', 'ru', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${lang === l ? 'bg-[#1e1e1e] text-white shadow-sm' : 'text-white/40 hover:text-white'}`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

const Navbar = ({ onAuth, onLogoClick }: { onAuth: () => void, onLogoClick: () => void }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={onLogoClick}>
          <div className="w-10 h-10 rounded-2xl border border-primary/20 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-all shadow-[0_0_15px_rgba(79,70,229,0.15)] group-hover:shadow-[0_0_20px_rgba(79,70,229,0.25)]">
            <Command className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-black tracking-tight hidden sm:inline-block text-white group-hover:text-primary transition-colors">Armenia Freelance</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-semibold text-white/60 hover:text-white transition-colors">{t('find_talent')}</a>
          <a href="#" className="text-sm font-semibold text-white/60 hover:text-white transition-colors">{t('find_work')}</a>
          <a href="#" className="text-sm font-semibold text-white/60 hover:text-white transition-colors">Agencies</a>
          <LanguageSwitcher />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button onClick={onAuth} className="text-sm font-semibold text-white/60 hover:text-white transition-colors px-4 py-2">{t('login')}</button>
          <button onClick={onAuth} className="px-5 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all text-sm tracking-tight shadow-lg shadow-white/5">
            {t('signup')}
          </button>
        </div>

        <button className="md:hidden p-2 text-white/70" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  )
}

function MainApp() {
  const [view, setView] = useState<'home' | 'register' | 'dashboard'>('home')
  const [user, setUser] = useState<any>(null)

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

  const goHome = () => {
    if (view !== 'dashboard') {
      setView('home');
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] selection:bg-primary/30 text-white font-sans">
      {view !== 'dashboard' && (
        <Navbar 
          onAuth={() => setView('register')} 
          onLogoClick={goHome}
        />
      )}
      
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div 
            key="home" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero onStart={() => setView('register')} />
          </motion.div>
        )}

        {view === 'register' && (
          <motion.div 
            key="register" 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }} 
            className="pt-24"
          >
            <RegistrationForm onBack={() => setView('home')} onComplete={handleRegistrationComplete} />
          </motion.div>
        )}

        {view === 'dashboard' && user && (
          <motion.div 
            key="dashboard" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <Dashboard user={user} onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>

      {view !== 'dashboard' && (
        <footer className="py-20 px-6 border-t border-white/5 bg-[#0A0A0B]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-white/40 text-sm">
            <div className="space-y-6">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={goHome}>
                  <Command className="w-6 h-6 text-primary" />
                  <span className="text-white font-bold tracking-tight">Armenia Freelance</span>
                </div>
                <p className="leading-relaxed">The professional marketplace for top-tier Armenian talent. Connect, collaborate, and scale globally.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Explore</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Find Work</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Find Talent</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Agencies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/30 text-xs">
            <p>&copy; 2026 Armenia Freelance. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
               <a href="#" className="hover:text-white transition-colors">Twitter</a>
               <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
               <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
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
