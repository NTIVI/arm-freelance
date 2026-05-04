import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ArrowRight, 
  Sparkles, 
  Code,
  Smartphone,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  Layers,
  Zap,
  Search,
  Star,
  Send,
  HelpCircle,
  LayoutGrid,
  ChevronRight,
  ArrowUpRight,
  Shield,
  Clock,
  Briefcase
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'

const Logo = () => (
  <div className="flex items-center gap-3 md:gap-4 group">
    <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-all duration-700 shadow-2xl">
      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white rounded rotate-45 flex items-center justify-center">
         <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
      </div>
    </div>
    <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-gradient">AF MARKET</span>
  </div>
)

const BackgroundAnimation = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 bg-[#fcfcfc] overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <motion.div 
        key={i}
        className="absolute rounded-full blur-[100px]"
        initial={{ 
          x: Math.random() * 100 + 'vw', 
          y: Math.random() * 100 + 'vh', 
          scale: Math.random() * 2 + 1,
          opacity: Math.random() * 0.03 + 0.01 
        }}
        animate={{ 
          x: [Math.random() * 100 + 'vw', Math.random() * 100 + 'vw', Math.random() * 100 + 'vw'], 
          y: [Math.random() * 100 + 'vh', Math.random() * 100 + 'vh', Math.random() * 100 + 'vh'],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: Math.random() * 60 + 40, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{
          width: '500px',
          height: '500px',
          background: i % 2 === 0 ? 'black' : '#5c56ff'
        }}
      />
    ))}
  </div>
)

export const LandingPage = () => {
  const { lang, setLang, t } = useLanguage();
  const { user, specialists, users } = useAppContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const featuredFreelancers = [
    ...specialists,
    ...users.filter(u => u.role === 'freelancer' && !specialists.find(s => s.id === u.id))
  ].slice(0, 3);

  return (
    <div className="min-h-screen text-black bg-white selection:bg-black selection:text-white font-sans relative overflow-x-hidden">
      <BackgroundAnimation />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 pt-8">
        <div className="max-w-[1400px] mx-auto bg-white/70 backdrop-blur-3xl rounded-[3rem] border border-black/5 flex items-center justify-between px-8 py-4 shadow-[0_32px_64px_rgba(0,0,0,0.03)]">
          <div className="flex-shrink-0">
            <Link to="/"><Logo /></Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-12">
            <NavLink to="/auth" label="Projects" />
            <NavLink to="/auth" label="Talents" />
            <NavLink to="/auth" label="About" />
            <NavLink to="/auth" label="Enterprise" />
          </div>

          <div className="flex items-center gap-8">
            <LanguageSwitcher lang={lang} setLang={setLang} />
            <div className="flex items-center gap-4">
               {user ? (
                 <Link to="/dashboard" className="px-10 py-4 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-2xl active:scale-95">
                    DASHBOARD
                 </Link>
               ) : (
                 <>
                   <Link to="/auth" className="text-[11px] font-black uppercase tracking-[0.2em] hover:text-blue-600 transition-colors hidden sm:block">
                     {t('login')}
                   </Link>
                   <Link to="/auth" className="px-10 py-4 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-2xl active:scale-95">
                     {t('signup')}
                   </Link>
                 </>
               )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-64 pb-48 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-black/5 rounded-full"
              >
                <Zap className="w-4 h-4 text-emerald-500 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">{t('hero_subtitle')}</span>
              </motion.div>
              <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.85] text-gradient-bold">
                HIRE ELITE<br/>TALENT IN<br/>ARMENIA
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-xl italic leading-relaxed">
                Connect with the top 1% of developers, designers, and IT specialists from Armenia's thriving tech ecosystem.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/auth" className="px-12 py-7 bg-black text-white rounded-[2.5rem] text-sm font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_32px_64px_rgba(0,0,0,0.15)] flex items-center justify-center gap-4 group active:scale-95">
                {t('become_performer')} <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <Link to="/auth" className="px-12 py-7 bg-white border border-black/10 text-black rounded-[2.5rem] text-sm font-black uppercase tracking-[0.2em] hover:bg-black/5 transition-all flex items-center justify-center active:scale-95 shadow-sm">
                {t('become_client_btn')}
              </Link>
            </div>

            <div className="flex items-center gap-12 pt-8">
               <div className="space-y-1">
                  <p className="text-4xl font-black italic">5K+</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">EXPERTS</p>
               </div>
               <div className="w-px h-12 bg-black/5"></div>
               <div className="space-y-1">
                  <p className="text-4xl font-black italic">12K+</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">PROJECTS</p>
               </div>
               <div className="w-px h-12 bg-black/5"></div>
               <div className="space-y-1">
                  <p className="text-4xl font-black italic">99.8%</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">SUCCESS</p>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-white p-10 rounded-[5rem] shadow-[0_64px_128px_rgba(0,0,0,0.08)] border border-black/5">
               <div className="space-y-10">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-xl">H</div>
                        <div>
                           <p className="text-sm font-black uppercase italic">Mobile App Design</p>
                           <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">POSTED BY GOOGLE</p>
                        </div>
                     </div>
                     <p className="text-3xl font-black italic">$4,500</p>
                  </div>
                  <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                     <div className="h-full bg-black w-2/3"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="bg-zinc-50 p-6 rounded-[2.5rem] border border-black/5">
                        <Clock className="w-6 h-6 mb-3 text-blue-600" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">DEADLINE</p>
                        <p className="text-lg font-black uppercase italic">14 DAYS</p>
                     </div>
                     <div className="bg-black text-white p-6 rounded-[2.5rem] shadow-2xl">
                        <Briefcase className="w-6 h-6 mb-3 text-emerald-400" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/50">APPLICANTS</p>
                        <p className="text-lg font-black uppercase italic">12 BIDS</p>
                     </div>
                  </div>
                  <button className="w-full py-6 bg-zinc-50 hover:bg-black hover:text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all">
                     VIEW PROJECT DETAILS
                  </button>
               </div>
            </div>
            <div className="absolute -top-12 -right-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-12 -left-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-48 px-6 bg-zinc-50/50">
        <div className="max-w-[1400px] mx-auto space-y-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-6">
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] text-gradient">{t('categories_title')}</h2>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 max-w-lg">{t('categories_subtitle')}</p>
            </div>
            <div className="bg-white p-2 rounded-full border border-black/5 shadow-xl flex items-center gap-4 pr-8 group cursor-pointer hover:bg-black transition-all duration-500">
               <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all"><ArrowRight className="w-6 h-6" /></div>
               <span className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">ALL CATEGORIES</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <CategoryCard icon={Code} title={t('cat_web')} sub="REACT, NEXT.JS, WEB3" delay={0.1} />
            <CategoryCard icon={Smartphone} title={t('cat_mobile')} sub="FLUTTER, IOS, ANDROID" delay={0.2} />
            <CategoryCard icon={Server} title={t('cat_backend')} sub="PYTHON, GO, RUST" delay={0.3} />
            <CategoryCard icon={Cloud} title={t('cat_devops')} sub="K8S, AWS, TERRAFORM" delay={0.4} />
            <CategoryCard icon={Database} title={t('cat_db')} sub="POSTGRES, AI, ML" delay={0.5} />
            <CategoryCard icon={ShieldCheck} title={t('cat_testing')} sub="QA AUTO, CYPRESS" delay={0.6} />
            <CategoryCard icon={Layers} title={t('cat_outsourcing')} sub="CONSULTING, ARCHITECTURE" delay={0.7} />
            <CategoryCard icon={Zap} title={t('cat_automation')} sub="GPT, LLM, AUTOMATION" delay={0.8} />
          </div>
        </div>
      </section>

      {/* Verified Specialists */}
      <section className="py-48 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto space-y-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-6">
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] text-gradient">{t('specialists_title')}</h2>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400">{t('specialists_subtitle')}</p>
            </div>
            <Link to="/auth" className="px-10 py-5 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl flex items-center gap-3 active:scale-95">
              {t('view_marketplace')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12">
            {featuredFreelancers.map((spec, i) => (
              <SpecialistCard key={spec.id} spec={spec} t={t} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Post Project Form */}
      <section className="py-48 px-6 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-emerald-600/20 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-white rounded-[5rem] p-16 md:p-24 space-y-20 shadow-2xl border border-black/5">
            <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none text-gradient-bold">{t('post_project_form_title')}</h2>
              <p className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400">{t('get_started')}</p>
            </div>
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 ml-8">{t('project_name')}</label>
                  <input type="text" placeholder="CRM System for Fintech" className="w-full bg-zinc-50 border border-black/5 rounded-[2.5rem] px-10 py-7 text-lg font-medium outline-none focus:bg-white focus:ring-8 focus:ring-black/5 transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 ml-8">{t('project_category')}</label>
                  <div className="relative">
                    <select className="w-full bg-zinc-50 border border-black/5 rounded-[2.5rem] px-10 py-7 text-lg font-medium outline-none focus:bg-white focus:ring-8 focus:ring-black/5 transition-all appearance-none cursor-pointer">
                      <option>{t('cat_web')}</option>
                      <option>{t('cat_mobile')}</option>
                      <option>{t('cat_backend')}</option>
                    </select>
                    <ChevronRight className="absolute right-10 top-1/2 -translate-y-1/2 w-6 h-6 rotate-90 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 ml-8">{t('project_budget')}</label>
                  <input type="text" placeholder="Fixed $5,000 or $50/hr" className="w-full bg-zinc-50 border border-black/5 rounded-[2.5rem] px-10 py-7 text-lg font-black italic outline-none focus:bg-white focus:ring-8 focus:ring-black/5 transition-all" />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 ml-8">{t('project_desc')}</label>
                  <textarea rows={5} placeholder="Describe the stack, requirements, and desired outcomes..." className="w-full bg-zinc-50 border border-black/5 rounded-[3rem] px-10 py-8 text-lg font-medium outline-none focus:bg-white focus:ring-8 focus:ring-black/5 transition-all resize-none shadow-inner"></textarea>
                </div>
              </div>
              <button type="button" className="w-full py-8 bg-black text-white rounded-[3rem] text-xl font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_32px_64px_rgba(0,0,0,0.2)] flex items-center justify-center gap-6 group">
                <Send className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                {t('submit_project')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-48 px-6 md:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto space-y-32">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-24">
            <div className="col-span-1 lg:col-span-1 space-y-12">
              <Logo />
              <div className="p-10 bg-zinc-50 rounded-[4rem] border border-black/5 space-y-8 shadow-sm hover:shadow-2xl transition-all group/agile">
                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">ENGINEERED BY</p>
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl p-2 border border-black/5">
                          <img src="/agile-logo.png" alt="Logo" className="w-full h-full object-contain" />
                       </div>
                       <p className="text-xl font-black uppercase italic tracking-tighter leading-none">Agile<br/>Business</p>
                    </div>
                 </div>
                 <a 
                   href="https://agile-business-pro.com/#services" 
                   target="_blank" 
                   rel="noreferrer" 
                   className="w-full py-5 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 transition-all shadow-xl flex items-center justify-center gap-3"
                 >
                   VISIT STUDIO <ArrowUpRight className="w-4 h-4" />
                 </a>
              </div>
            </div>
            <div className="space-y-8 pt-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-black/20">{t('platform')}</h4>
              <div className="flex flex-col gap-6 text-sm font-black uppercase italic tracking-tight">
                <FooterLink label="Marketplace" />
                <FooterLink label="Project Feed" />
                <FooterLink label="Success Stories" />
                <FooterLink label="Developer Portal" />
              </div>
            </div>
            <div className="space-y-8 pt-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-black/20">{t('support')}</h4>
              <div className="flex flex-col gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">PARTNERSHIPS</span>
                  <a href="mailto:partners@afmarket.com" className="block text-base font-black italic hover:text-blue-600 transition-colors underline-offset-8 hover:underline">partners@afmarket.com</a>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">GENERAL INQUIRY</span>
                  <a href="mailto:hello@afmarket.com" className="block text-base font-black italic hover:text-blue-600 transition-colors underline-offset-8 hover:underline">hello@afmarket.com</a>
                </div>
              </div>
            </div>
            <div className="space-y-8 pt-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-black/20">RESOURCES</h4>
              <div className="flex flex-wrap gap-4">
                 <SocialPill icon={LayoutGrid} />
                 <SocialPill icon={Send} />
                 <SocialPill icon={Smartphone} />
                 <SocialPill icon={Briefcase} />
              </div>
            </div>
          </div>
          
          <div className="pt-20 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">© 2026 AF MARKET. ELITE TECH ECOSYSTEM.</p>
              <div className="hidden md:block w-px h-6 bg-black/5"></div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-black transition-colors">Privacy</a>
                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-black transition-colors">Terms</a>
              </div>
            </div>
            <div className="flex items-center gap-6 p-1.5 bg-zinc-50 rounded-full border border-black/5 shadow-inner">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">OPERATED BY AGILE BUSINESS PRO</span>
              <a href="https://agile-business-pro.com/#services" target="_blank" rel="noreferrer" className="px-8 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95">
                VISIT SITE
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const NavLink = ({ to, label }: any) => (
  <Link to={to} className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-black transition-all relative group">
    {label}
    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full"></span>
  </Link>
)

const FooterLink = ({ label }: any) => (
  <a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2 group">
    {label} <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
  </a>
)

const CategoryCard = ({ icon: Icon, title, sub, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="bg-white p-12 text-center space-y-8 hover:-translate-y-4 hover:shadow-[0_64px_128px_rgba(0,0,0,0.12)] transition-all duration-700 cursor-pointer group rounded-[4.5rem] border border-black/5"
  >
    <div className="w-24 h-24 mx-auto bg-zinc-50 rounded-[2.5rem] flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-700 shadow-sm group-hover:rotate-12">
      <Icon className="w-10 h-10" />
    </div>
    <div className="space-y-4">
      <h3 className="text-xl font-black italic uppercase tracking-tighter leading-none group-hover:text-gradient transition-all">{title}</h3>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] leading-tight opacity-50">{sub}</p>
    </div>
  </motion.div>
)

const SpecialistCard = ({ spec, t, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    className="bg-white p-12 space-y-12 hover:shadow-[0_64px_128px_rgba(0,0,0,0.12)] transition-all duration-1000 border border-black/5 group rounded-[5rem] relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-48 h-48 bg-black/5 rounded-full -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-1000"></div>
    
    <div className="flex justify-between items-start relative z-10">
      <div className="relative">
        <div className="w-24 h-24 rounded-3xl bg-black flex items-center justify-center text-white text-4xl font-black shadow-2xl rotate-6 group-hover:rotate-0 transition-all duration-700">
          {spec.fullName[0]}
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-xl border-4 border-white">
           <Shield className="w-4 h-4 fill-current" />
        </div>
      </div>
      <div className="flex items-center gap-2 bg-zinc-50 px-5 py-2 rounded-full border border-black/5 shadow-sm">
        <Star className="w-4 h-4 text-orange-400 fill-current" />
        <span className="text-xs font-black italic">{spec.rating || '5.0'}</span>
      </div>
    </div>

    <div className="space-y-4 relative z-10">
      <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none text-black group-hover:text-gradient transition-all">{spec.fullName}</h3>
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
         <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
         {spec.title || spec.category || 'TOP SPECIALIST'}
      </div>
    </div>

    <div className="flex flex-wrap gap-3 relative z-10">
      {(spec.skills || ['React', 'TypeScript', 'Node.js']).slice(0, 3).map((tag: string) => (
        <span key={tag} className="px-5 py-2 bg-zinc-50 rounded-full text-[10px] font-black uppercase text-gray-400 border border-black/5 group-hover:bg-black group-hover:text-white transition-all shadow-sm">{tag}</span>
      ))}
    </div>

    <div className="pt-10 border-t border-black/5 flex items-center justify-between relative z-10">
      <div>
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{t('price_from')}</span>
        <div className="text-3xl font-black italic tracking-tighter mt-1">${spec.price || '30'}<span className="text-[11px] font-medium not-italic text-gray-400 ml-1">/HR</span></div>
      </div>
      <Link to="/auth" className="px-10 py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-110 hover:bg-blue-600 transition-all shadow-2xl active:scale-95">
        HIRE NOW
      </Link>
    </div>
  </motion.div>
)

const SocialPill = ({ icon: Icon }: any) => (
  <button className="w-16 h-16 rounded-[2rem] bg-zinc-50 border border-black/5 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl hover:rotate-12 active:scale-90">
    <Icon className="w-6 h-6" />
  </button>
)

const languages = [{ id: 'en', label: 'EN' }, { id: 'ru', label: 'RU' }, { id: 'hy', label: 'HY' }];

const LanguageSwitcher = ({ lang, setLang }: any) => (
  <div className="flex items-center gap-2 bg-black/5 p-2 rounded-full border border-black/5">
    {languages.map((l) => (
      <button 
        key={l.id}
        onClick={() => setLang(l.id as any)}
        className={`px-5 py-3 rounded-full text-[11px] font-black uppercase transition-all ${lang === l.id ? 'bg-black text-white shadow-xl scale-110' : 'text-gray-400 hover:text-black'}`}
      >
        {l.label}
      </button>
    ))}
  </div>
)

