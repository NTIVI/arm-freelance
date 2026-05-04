import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Code,
  Smartphone,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  Layers,
  Zap,
  Star,
  Send,
  Command,
  ArrowUpRight,
  Shield,
  Globe
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'



export const LandingPage = () => {
  const { lang, setLang, t } = useLanguage();
  const { user, specialists, users } = useAppContext();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  const featuredFreelancers = [
    ...specialists,
    ...users.filter(u => u.role === 'freelancer' && !specialists.find(s => s.id === u.id))
  ].slice(0, 3);

  return (
    <div className="min-h-screen text-white bg-[#050505] selection:bg-violet-500 selection:text-white font-sans overflow-x-hidden">
      <BackgroundAnimation />
      <div className="bg-overlay"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-10 flex justify-center">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-panel w-full max-w-7xl px-10 py-6 flex items-center justify-between shadow-[0_32px_64px_rgba(0,0,0,0.4)] border-white/5"
        >
          <Link to="/"><Logo /></Link>
          
          <div className="hidden lg:flex items-center gap-12">
            <NavLink label="Ecosystem" />
            <NavLink label="Infrastructure" />
            <NavLink label="Intelligence" />
          </div>

          <div className="flex items-center gap-6">
            <LanguageSwitcher lang={lang} setLang={setLang} />
            <div className="h-8 w-[1px] bg-white/10 mx-2" />
            {user ? (
              <Link to="/dashboard" className="btn-lux px-8 py-4 text-[10px]">
                Terminal <ArrowUpRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/auth" className="text-label text-white/30 hover:text-white transition-colors uppercase tracking-widest text-[9px]">{t('login')}</Link>
                <Link to="/auth" className="btn-lux px-8 py-4 text-[10px]">{t('signup')}</Link>
              </div>
            )}
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-80 pb-40 px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-center gap-4">
               <span className="w-12 h-[1px] bg-white/10"></span>
               <p className="text-label tracking-[0.6em] text-white/30">{t('hero_subtitle')}</p>
               <span className="w-12 h-[1px] bg-white/10"></span>
            </div>
            <h1 className="text-display text-[10rem] md:text-[14rem] lg:text-[18rem] leading-[0.8] mix-blend-screen bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent">
              {t('hero_title').split(' ')[0]} <br />
              <span className="text-white outline-text">{t('hero_title').split(' ').slice(1).join(' ')}</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-2xl text-xl text-white/40 font-medium italic leading-relaxed"
          >
            The world's most elite network for specialist infrastructure, neural engineering, and architectural design. Synchronize your vision with verified mastery.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 pt-10"
          >
            <Link to="/auth" className="btn-lux px-12 py-7 text-sm shadow-violet-500/30">
              {t('become_performer')} <ArrowUpRight className="w-6 h-6" />
            </Link>
            <Link to="/auth" className="px-12 py-7 rounded-full bg-white/5 border border-white/10 text-label text-white/40 hover:bg-white hover:text-black transition-all duration-700">
              {t('become_client_btn')}
            </Link>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute top-1/4 right-0 w-96 h-96 border border-white/5 rounded-full translate-x-1/2 animate-bounce transition-all duration-[10s]" />
      </section>

      {/* Categories / Capabilities */}
      <section className="py-60 px-10 relative">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-6">
              <p className="text-label tracking-[0.5em] text-violet-400">{t('categories_subtitle')}</p>
              <h2 className="text-display text-8xl italic leading-none">{t('categories_title')}</h2>
            </div>
            <div className="max-w-md text-right">
               <p className="text-white/30 font-medium italic text-lg">We support a spectrum of technical complexity, from baseline deployments to massive scale-out architectures.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <CapabilityCard icon={Code} title={t('cat_web')} sub="NEURAL INTERFACES" color="text-violet-400" />
            <CapabilityCard icon={Smartphone} title={t('cat_mobile')} sub="NATIVE ECOSYSTEMS" color="text-fuchsia-400" />
            <CapabilityCard icon={Server} title={t('cat_backend')} sub="CORE INFRASTRUCTURE" color="text-indigo-400" />
            <CapabilityCard icon={Zap} title={t('cat_automation')} sub="NEURAL AUTOMATION" color="text-pink-400" />
            <CapabilityCard icon={Database} title={t('cat_db')} sub="DATA QUANTIZATION" color="text-cyan-400" />
            <CapabilityCard icon={ShieldCheck} title={t('cat_testing')} sub="AUDIT & COMPLIANCE" color="text-emerald-400" />
            <CapabilityCard icon={Layers} title={t('cat_outsourcing')} sub="STRATEGIC DEPLOYMENT" color="text-amber-400" />
            <CapabilityCard icon={Cloud} title={t('cat_devops')} sub="SCALEOUT SYSTEMS" color="text-rose-400" />
          </div>
        </div>
      </section>

      {/* Specialist Network */}
      <section className="py-60 px-10 bg-black/40 backdrop-blur-3xl text-white relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto space-y-32 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-12">
            <div className="space-y-6">
              <h2 className="text-display text-8xl italic text-white leading-none bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">{t('specialists_title')}</h2>
              <p className="text-label tracking-[0.4em] text-violet-400">{t('specialists_subtitle')}</p>
            </div>
            <Link to="/auth" className="btn-lux shadow-violet-500/20">
               Market Terminal <Command className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {featuredFreelancers.map((spec) => (
              <ModernSpecialistCard key={spec.id} spec={spec} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Testimonials */}
      <section className="py-60 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <div className="space-y-16">
              <div className="space-y-6">
                 <h2 className="text-display text-8xl italic leading-none">{t('testimonials_title')}</h2>
                 <p className="text-label text-white/20 tracking-[0.3em]">{t('testimonials_subtitle')}</p>
              </div>
              
              <div className="space-y-10">
                 <Testimony name="DAVID OVAN" role="TECHBOX CEO" text="AF Market provides architectural precision at a speed we didn't think was possible in this region." />
                 <Testimony name="ELENA MARTS" role="CTO, VENTURE" text="The verification process is unmatched. Every specialist we've engaged with has been of elite caliber." />
              </div>
           </div>

           <div className="premium-card p-20 bg-white/[0.02] border-white/10 space-y-12 shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[2rem] flex items-center justify-center text-white rotate-6 shadow-xl shadow-violet-500/20"><Shield className="w-10 h-10" /></div>
              <div className="space-y-4">
                 <h3 className="text-display text-4xl italic leading-none text-white">Security Standards</h3>
                 <p className="text-white/30 font-medium italic text-lg leading-relaxed">Our platform utilizes secure escrow protocols and manual verification audits to ensure every transaction and interaction meets global IT enterprise standards.</p>
              </div>
              <div className="flex gap-4">
                 <div className="p-8 bg-white/5 rounded-[2rem] shadow-sm border border-white/5 flex-1 group hover:bg-violet-500/10 transition-colors duration-700">
                    <p className="text-display text-3xl text-violet-400 group-hover:scale-110 transition-transform origin-left">99.9%</p>
                    <p className="text-label text-[8px] mt-2 text-white/20 tracking-widest">Uptime Reliability</p>
                 </div>
                 <div className="p-8 bg-white/5 rounded-[2rem] shadow-sm border border-white/5 flex-1 group hover:bg-fuchsia-500/10 transition-colors duration-700">
                    <p className="text-display text-3xl text-fuchsia-400 group-hover:scale-110 transition-transform origin-left">24/7</p>
                    <p className="text-label text-[8px] mt-2 text-white/20 tracking-widest">Delegate Support</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Pre-footer Call to Action */}
      <section className="py-60 px-10 flex justify-center">
         <div className="max-w-5xl w-full premium-card p-24 bg-[#0a0a0a] text-white text-center space-y-16 relative overflow-hidden group shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] border-white/5">
            <div className="absolute inset-0 bg-mesh-container opacity-10"></div>
            <div className="relative z-10 space-y-8">
               <div className="flex justify-center gap-3">
                  <Star className="w-8 h-8 text-violet-500 fill-current shadow-[0_0_20px_rgba(139,92,246,0.5)]" />
                  <Star className="w-8 h-8 text-fuchsia-500 fill-current shadow-[0_0_20px_rgba(236,72,153,0.5)]" />
                  <Star className="w-8 h-8 text-violet-500 fill-current shadow-[0_0_20px_rgba(139,92,246,0.5)]" />
               </div>
               <h2 className="text-display text-9xl italic leading-none bg-gradient-to-r from-white via-white to-white/20 bg-clip-text text-transparent">{t('get_started')}</h2>
               <p className="max-w-xl mx-auto text-white/30 italic font-medium text-lg leading-relaxed">Ready to deploy your next high-complexity architecture? The network is standing by.</p>
            </div>
            <div className="relative z-10 flex justify-center gap-8">
               <Link to="/auth" className="btn-lux px-20 py-8 text-xl shadow-violet-500/40">{t('signup')} <ArrowUpRight className="w-8 h-8" /></Link>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-40 px-20 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-32 pb-40">
            <div className="col-span-1 md:col-span-1 space-y-12">
              <Logo />
              <div className="p-10 premium-card bg-white/[0.02] border-dashed border-white/10 space-y-6">
                 <p className="text-label text-[8px] text-white/20">Architectural Governance by:</p>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden"><Sparkles className="w-6 h-6 text-white/20" /></div>
                    <p className="text-display text-xl italic text-white">Agile Business</p>
                 </div>
                 <a href="https://agile-business-pro.com" target="_blank" rel="noreferrer" className="w-full btn-lux px-6 py-4 text-[9px] bg-white/5 text-white border border-white/10 shadow-none hover:bg-white hover:text-black transition-all duration-700">Audit Partner <ArrowUpRight className="w-4 h-4" /></a>
              </div>
            </div>
            
            <FooterColumn title="Protocol" links={['Marketplace', 'Discovery', 'Verification', 'Arbitration']} />
            <FooterColumn title="Access" links={['Freelancer Portal', 'Client Dashboard', 'Support Tunnel', 'Compliance']} />
            
            <div className="space-y-8">
              <h4 className="text-label">Encrypted Comms</h4>
              <div className="space-y-4">
                 <p className="text-xs font-bold text-white/40">support@afmarket.io</p>
                 <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all text-white/40"><Globe className="w-4 h-4" /></div>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all text-white/40"><Send className="w-4 h-4" /></div>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-label text-[8px] text-white/20">
            <p>© 2026 AF MARKET INFRASTRUCTURE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-10">
               <a href="#" className="hover:text-white transition-colors">Privacy Protocol</a>
               <a href="#" className="hover:text-white transition-colors">Term of Intelligence</a>
               <a href="#" className="hover:text-white transition-colors">Security Layer</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .outline-text {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4);
          color: transparent;
        }
      `}</style>
    </div>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-all duration-700 shadow-2xl shadow-violet-500/20">
        <div className="w-5 h-5 border-2 border-white rounded rotate-45 flex items-center justify-center">
           <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      </div>
      <span className="text-display text-2xl text-white">AF MARKET</span>
    </div>
  )
}

function BackgroundAnimation() {
  return (
    <div className="bg-mesh-container">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -100, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="mesh-blob bg-violet-600/40 w-[1200px] h-[1200px] -top-[400px] -left-[200px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, -100, 0],
          y: [0, 100, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="mesh-blob bg-fuchsia-600/30 w-[1000px] h-[1000px] -bottom-[400px] -right-[200px]" 
      />
    </div>
  )
}

function NavLink({ label }: any) {
  return (
    <a href="#" className="text-label text-white/30 hover:text-white transition-all hover:-translate-y-1 inline-block uppercase tracking-widest text-[9px]">{label}</a>
  )
}

function CapabilityCard({ icon: Icon, title, sub, color }: any) {
  return (
    <div className="premium-card p-12 space-y-12 hover:-translate-y-4 transition-all duration-700 group cursor-pointer border-white/5 bg-white/[0.02]">
      <div className="w-20 h-20 bg-white/5 rounded-[2.5rem] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700 group-hover:rotate-12">
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      <div className="space-y-4">
        <h3 className="text-display text-2xl italic leading-none text-white">{title}</h3>
        <p className="text-label text-[8px] text-white/20 group-hover:text-white transition-colors uppercase tracking-[0.2em]">{sub}</p>
      </div>
    </div>
  )
}

function ModernSpecialistCard({ spec, t }: any) {
  return (
    <div className="premium-card p-12 bg-white/[0.03] border-white/10 hover:border-violet-500/50 transition-all duration-700 group relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 p-10 opacity-[0.05] group-hover:opacity-100 group-hover:scale-125 transition-all duration-1000">
         <Sparkles className="w-20 h-20 text-violet-500" />
      </div>
      <div className="flex justify-between items-start mb-12 relative z-10">
        <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-3xl font-black italic rotate-6 group-hover:rotate-0 transition-all duration-700 shadow-2xl shadow-violet-500/20">
          {spec.fullName[0]}
        </div>
        <div className="px-5 py-2 bg-white/10 rounded-full border border-white/10 flex items-center gap-3">
          <Star className="w-4 h-4 text-violet-400 fill-current shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
          <span className="text-display text-xl leading-none italic text-white">{spec.rating || '5.0'}</span>
        </div>
      </div>
      <div className="space-y-4 relative z-10">
        <h3 className="text-display text-4xl italic text-white group-hover:text-violet-400 transition-colors">{spec.fullName}</h3>
        <p className="text-label text-[9px] text-white/20 tracking-[0.4em] uppercase">{spec.title || 'SYSTEMS ARCHITECT'}</p>
      </div>
      <div className="pt-12 mt-12 border-t border-white/5 flex items-center justify-between relative z-10">
        <div>
          <p className="text-label text-[7px] text-white/20 uppercase tracking-widest">Base Cycle Valuation</p>
          <p className="text-display text-3xl italic text-white">${spec.price || '80'}<span className="text-label text-[8px] ml-2 text-white/10">/cycle</span></p>
        </div>
        <Link to="/auth" className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:bg-violet-500 hover:text-white transition-all duration-700 shadow-lg"><ArrowUpRight className="w-6 h-6" /></Link>
      </div>
    </div>
  )
}

function Testimony({ name, role, text }: any) {
  return (
    <div className="space-y-8 group cursor-default p-8 rounded-[3rem] hover:bg-white/[0.02] transition-colors duration-700 border border-transparent hover:border-white/5">
       <div className="flex gap-2">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-violet-500 fill-current opacity-20 group-hover:opacity-100 transition-all duration-500 shadow-violet-500/50" style={{ transitionDelay: i * 100 + 'ms' }} />)}
       </div>
       <p className="text-3xl font-medium italic leading-relaxed text-white/80">"{text}"</p>
       <div className="flex items-center gap-6 pt-4">
          <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black italic text-white/20 group-hover:text-white/60 transition-colors">{name[0]}</div>
          <div>
             <h4 className="text-label text-white tracking-widest">{name}</h4>
             <p className="text-label text-[8px] text-white/20 mt-1 uppercase tracking-[0.3em]">{role}</p>
          </div>
       </div>
    </div>
  )
}

function FooterColumn({ title, links }: any) {
  return (
    <div className="space-y-8">
      <h4 className="text-label text-white/60 tracking-[0.4em]">{title}</h4>
      <div className="flex flex-col gap-5">
        {links.map(l => <a key={l} href="#" className="text-xs font-bold text-white/30 hover:text-white transition-all hover:translate-x-2">{l}</a>)}
      </div>
    </div>
  )
}

function LanguageSwitcher({ lang, setLang }: any) {
  return (
    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-xl">
      {['en', 'ru', 'hy'].map((l) => (
        <button 
          key={l}
          onClick={() => setLang(l as any)}
          className={`px-4 py-2 rounded-full text-[9px] font-black uppercase transition-all duration-500 ${lang === l ? 'bg-white text-black shadow-xl' : 'text-white/20 hover:text-white'}`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
