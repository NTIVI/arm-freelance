import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Bell, 
  User, 
  Wallet, 
  MessageSquare, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';

export const Header = () => {
  const { lang, setLang, t, formatPrice } = useLanguage();
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const isFreelancer = user?.role === 'freelancer';

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-7xl mx-auto glass-panel px-8 py-4 flex items-center justify-between border-white/5 shadow-2xl backdrop-blur-2xl bg-black/20"
      >
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
              <span className="text-white font-black text-xl italic">A</span>
            </div>
            <span className="text-display text-xl text-white tracking-tighter">ARM FREELANCE</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link to="/catalog" className="text-label text-white/40 hover:text-white transition-colors">{t('find_work')}</Link>
            <Link to="/specialists" className="text-label text-white/40 hover:text-white transition-colors">{t('become_client_btn')}</Link>
            {!isFreelancer && (
              <Link to="/post-job" className="btn-lux px-6 py-2.5 text-[9px] shadow-none">
                {t('post_job')}
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-label text-white/60 hover:text-white transition-all"
            >
              <Globe className="w-4 h-4 text-violet-400" />
              <span className="uppercase font-black">{lang === 'hy' ? 'ՀԱՅ' : lang.toUpperCase()}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-3 w-44 glass-panel p-2 border-white/10 bg-[#0a0a0a]/90 backdrop-blur-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2">
                <LangBtn active={lang === 'hy'} onClick={() => { setLang('hy'); setIsLangOpen(false); }} label="Հայերեն" />
                <LangBtn active={lang === 'ru'} onClick={() => { setLang('ru'); setIsLangOpen(false); }} label="Русский" />
                <LangBtn active={lang === 'en'} onClick={() => { setLang('en'); setIsLangOpen(false); }} label="English" />
              </div>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-6">
              <button className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
              </button>
              
              <Link to="/messages" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <MessageSquare className="w-5 h-5" />
              </Link>

              <div className="h-8 w-[1px] bg-white/5" />

              <div className="flex items-center gap-5 group relative">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">{user.fullName}</p>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <Wallet className="w-3 h-3 text-violet-400" />
                    <p className="text-[10px] font-black text-violet-400">{formatPrice(user.balance)}</p>
                  </div>
                </div>
                <div 
                  onClick={() => navigate('/dashboard')}
                  className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-black italic shadow-xl shadow-violet-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all cursor-pointer"
                >
                  {user.fullName[0]}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/auth" className="text-label text-white/30 hover:text-white transition-colors px-4">{t('login')}</Link>
              <Link to="/auth" className="btn-lux px-10 py-3.5 text-[10px]">{t('signup')}</Link>
            </div>
          )}

          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.div>
    </nav>
  );
};

const LangBtn = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full px-4 py-3 rounded-xl text-label text-[10px] text-left hover:bg-white/5 transition-all flex items-center justify-between ${active ? 'text-violet-400 bg-white/5' : 'text-white/40'}`}
  >
    {label}
    {active && <div className="w-1 h-1 bg-violet-400 rounded-full shadow-[0_0_8px_rgba(139,92,246,1)]"></div>}
  </button>
);
