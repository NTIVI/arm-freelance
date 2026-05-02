import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Sparkles, 
  LayoutDashboard,
  ShieldCheck, 
  Globe, 
  Command
} from 'lucide-react'

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-indigo-500/30">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 border-b border-white/5 bg-background/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all">
              <Command className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">Armenia Freelance</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/auth" className="px-6 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all">Login</Link>
          </div>
        </div>
      </nav>
      
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] font-black tracking-[0.2em] text-indigo-400 uppercase shadow-xl">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Armenia Freelance Platform v2.0</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tight text-white italic">
              Empower your <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">vision with talent.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed font-medium">
              The premium marketplace for top-tier Armenian professionals. Build your team, scale your business, and master the future of work.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link to="/auth" className="px-10 py-5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-2xl transition-all active:scale-[0.98] shadow-2xl shadow-indigo-500/40 uppercase tracking-widest flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#050811]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon={LayoutDashboard} title="Smart Dashboard" desc="Real-time tracking of projects, earnings, and applications." />
            <FeatureCard icon={ShieldCheck} title="Secure Payments" desc="Milestone-based payment system ensures safety." />
            <FeatureCard icon={Globe} title="Global Network" desc="Connect with companies worldwide while staying rooted in Armenia." />
          </div>
        </div>
      </section>
    </div>
  )
}

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
  <div className="bg-[#0f172a]/50 backdrop-blur-xl border border-white/5 shadow-2xl p-10 rounded-[2.5rem] hover:border-indigo-500/30 transition-all group">
    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 group-hover:bg-indigo-500 group-hover:text-white transition-all">
      <Icon className="w-7 h-7 text-indigo-400 group-hover:text-white" />
    </div>
    <h3 className="text-xl font-black uppercase italic mb-4">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed font-medium">{desc}</p>
  </div>
)
