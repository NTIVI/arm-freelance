import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Command
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export const LandingPage = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#111827] selection:bg-black/10 font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 px-12 py-8">
        <div className="glass-panel max-w-7xl mx-auto flex items-center justify-between px-10 py-5 rounded-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45"></div>
            </div>
            <span className="text-xl font-bold tracking-tight uppercase italic">Armenia Freelance</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            <LanguageSwitcher lang={lang} setLang={setLang} />
            <a href="#" className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Talent</a>
            <a href="#" className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Projects</a>
            <div className="flex items-center gap-2">
              <Link to="/auth" className="btn-capsule">Sign In</Link>
              <Link to="/auth" className="btn-ghost">Register</Link>
            </div>
          </div>
        </div>
      </nav>
      
      <section className="relative pt-64 pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-white rounded-full blur-[120px] -z-10 opacity-50"></div>
        
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-6 py-2 bg-white/40 border border-white/60 rounded-full text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Future of Armenian Work</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black leading-[0.95] tracking-tighter text-black">
              Evolve with <br />
              <span className="text-gray-300">elite talent.</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-gray-500 font-medium leading-relaxed">
              The premium glassmorphic ecosystem for Armenian professionals. Connect, build, and scale with the finest specialists.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link to="/auth" className="btn-capsule px-12 py-5 text-sm uppercase tracking-widest shadow-2xl shadow-black/20">
              Launch Platform <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/auth" className="btn-ghost px-12 py-5 text-sm uppercase tracking-widest">
              Browse Feed
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-32 max-w-4xl mx-auto">
            <StatItem label="Talent" value="12k+" />
            <StatItem label="Projects" value="45k+" />
            <StatItem label="Payouts" value="$15M+" />
            <StatItem label="Rating" value="4.9/5" />
          </div>
        </div>
      </section>

      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard icon={Zap} title="Instant Connect" desc="Proprietary matching algorithms for rapid team assembly." />
            <FeatureCard icon={ShieldCheck} title="Escrow Security" desc="High-tier financial protection for every milestone." />
            <FeatureCard icon={Globe} title="Armenian DNA" desc="Built by the community, for the community." />
          </div>
        </div>
      </section>

      <footer className="py-20 px-12 border-t border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <Command className="w-5 h-5" />
             <span className="text-sm font-bold uppercase italic tracking-tighter">Armenia Freelance</span>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2026 AF Ecosystem. Minimalist Core.</p>
        </div>
      </footer>
    </div>
  )
}

const StatItem = ({ label, value }: any) => (
  <div className="space-y-1">
    <p className="text-4xl font-black tracking-tighter">{value}</p>
    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{label}</p>
  </div>
)

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
  <div className="glass-panel p-12 rounded-[3rem] space-y-8 hover:scale-[1.02] transition-all cursor-default">
    <div className="w-16 h-16 rounded-3xl bg-black flex items-center justify-center text-white">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-2xl font-black uppercase italic">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed font-medium">{desc}</p>
  </div>
)

const languages = [
  { id: 'en', label: 'EN' },
  { id: 'ru', label: 'RU' },
  { id: 'hy', label: 'HY' },
];

const LanguageSwitcher = ({ lang, setLang }: any) => {
  return (
    <div className="flex items-center gap-2 bg-white/40 border border-white/60 p-1.5 rounded-full shadow-sm">
      {languages.map((l) => (
        <button 
          key={l.id}
          onClick={() => setLang(l.id as any)}
          className={`relative px-6 py-2 rounded-full text-xs font-black uppercase transition-all z-10 ${lang === l.id ? 'text-white' : 'text-gray-500 hover:text-black'}`}
        >
          {lang === l.id && (
            <motion.div
              layoutId="activeLang"
              className="absolute inset-0 bg-black rounded-full -z-10 shadow-lg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {l.label}
        </button>
      ))}
    </div>
  );
};
