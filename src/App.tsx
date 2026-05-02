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
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-8 py-3.5 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-black tracking-tight font-display hidden sm:inline-block uppercase">Armenia Freelance</span>
          <span className="text-lg font-black tracking-tighter sm:hidden">AF</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-xs font-bold text-white/50 hover:text-white transition-colors uppercase tracking-widest">{t('find_talent')}</a>
          <a href="#" className="text-xs font-bold text-white/50 hover:text-white transition-colors uppercase tracking-widest">{t('find_work')}</a>
          <LanguageSwitcher />
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button onClick={onAuth} className="text-xs font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest">{t('login')}</button>
          <button onClick={onAuth} className="btn-primary text-xs py-2.5 px-6 rounded-lg uppercase tracking-widest">{t('signup')}</button>
        </div>

        <button className="md:hidden p-2 text-white/50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
    <div className="min-h-screen bg-[#0B0B0F] selection:bg-primary/30 relative mesh-gradient">
      {/* Dynamic Background Noise/Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

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
        <footer className="py-24 px-10 border-t border-white/[0.03] bg-[#0E0E12]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 text-white/30 text-sm">
            <div className="space-y-6">
                <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                   </div>
                   <span className="text-white font-black tracking-tight font-display">ARMENIA FREELANCE</span>
                </div>
                <p className="leading-relaxed">The premier marketplace for high-tier Armenian talent. We bridge the gap between Yerevan and the global tech economy.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase text-[10px] tracking-widest">Marketplace</h4>
              <ul className="space-y-5">
                <li><a href="#" className="hover:text-primary transition-colors">Find Work</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Find Talent</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Project Catalog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase text-[10px] tracking-widest">Platform</h4>
              <ul className="space-y-5">
                <li><a href="#" className="hover:text-primary transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Identity Verification</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Help & Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase text-[10px] tracking-widest">Legal</h4>
              <ul className="space-y-5">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Payments & Escrow</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-6 text-white/10 text-[10px] font-black uppercase tracking-[0.2em]">
            <span>&copy; 2026 ARMENIA FREELANCE PLATFORM.</span>
            <span>SECURE ESCROW PAYMENTS PROTECTED.</span>
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
