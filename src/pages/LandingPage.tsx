import { motion, useScroll } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Code,
  Smartphone,
  Server,
  Database,
  Cloud,
  Layers,
  MessageSquare,
  Star,
  Search,
  CheckCircle2,
  Send,
  HelpCircle,
  Briefcase,
  Users
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'

export const LandingPage = () => {
  const { lang, setLang, t } = useLanguage();
  const { user } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen text-black selection:bg-black/10 font-sans overflow-x-hidden relative">
      <div className="bg-mesh"></div>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-black z-[100] origin-left"
        style={{ scaleX: useScroll().scrollXProgress }}
      />
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] bg-indigo-200/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], x: [0, -40, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -left-[10%] w-[40vw] h-[40vw] bg-pink-100/30 rounded-full blur-[100px]"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-6">
        <div className="glass-panel max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4 rounded-full border border-white/40 shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-xl flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white rounded-sm rotate-45"></div>
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tight uppercase italic hidden sm:block text-black">Armenia Freelance</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-8">
            <div className="hidden lg:flex items-center space-x-12">
              <a href="#specialists" className="text-sm md:text-base font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">{t('find_talent')}</a>
              <a href="#post-project" className="text-sm md:text-base font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">{t('find_work')}</a>
              <a href="#how-it-works" className="text-sm md:text-base font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">{t('how_it_works_title')}</a>
            </div>
            <LanguageSwitcher lang={lang} setLang={setLang} />
            <div className="flex items-center gap-2">
              {user ? (
                <Link to="/dashboard" className="btn-capsule px-4 md:px-6 py-2 text-[9px] md:text-[10px] uppercase tracking-widest bg-black text-white hover:bg-indigo-600 transition-all flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center font-bold">{user.fullName[0]}</div>
                  {t('personal_account')}
                </Link>
              ) : (
                <>
                  <Link to="/auth" className="btn-capsule px-4 md:px-6 py-2 text-[9px] md:text-[10px] uppercase tracking-widest bg-black text-white hover:bg-indigo-600 transition-all">
                    {t('signup')}
                  </Link>
                  <Link to="/auth" className="btn-ghost px-4 md:px-6 py-2 text-[9px] md:text-[10px] uppercase tracking-widest border border-black/10 hover:bg-black/5 transition-all">
                    {t('login')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-64 pb-20 px-6">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[120px] -z-10 opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-pink-200/20 rounded-full blur-[120px] -z-10 opacity-50"></div>
        
        <div className="max-w-6xl mx-auto text-center space-y-8 md:space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center space-x-3 px-8 py-3 bg-white/40 border border-white/50 backdrop-blur-md rounded-full text-xs font-black tracking-[0.3em] text-indigo-600 uppercase shadow-sm">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span>{t('premium_ecosystem')}</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-black leading-[0.85] tracking-tighter text-black">
              {t('hero_title').split(' ').slice(0, -1).join(' ')} <br />
              <span className="text-gray-400">{t('hero_title').split(' ').slice(-1)}</span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-500 font-medium leading-relaxed px-4 opacity-80">
              {t('hero_subtitle')}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 pt-4 md:pt-8 px-4">
            <Link to="/auth" className="btn-capsule px-8 md:px-12 py-5 md:py-6 text-xs md:text-sm uppercase tracking-widest shadow-2xl shadow-black/20 w-full sm:w-auto flex items-center justify-center bg-black text-white hover:bg-indigo-600 group transition-all">
              <Users className="w-5 h-5 mr-3" />
              {t('find_specialist_btn')} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/auth" className="btn-ghost px-8 md:px-12 py-5 md:py-6 text-xs md:text-sm uppercase tracking-widest bg-white border border-black/10 w-full sm:w-auto flex items-center justify-center hover:bg-black/5 transition-all">
              <Briefcase className="w-5 h-5 mr-3" />
              {t('become_client_btn')}
            </Link>
          </motion.div>

          {/* Quick Search */}
          <div className="max-w-2xl mx-auto pt-10 md:pt-16 px-4">
            <div className="relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-white transition-colors" />
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder={t('search_placeholder')} 
                 className="w-full bg-white/5 border border-white/10 rounded-full px-16 py-5 md:py-6 shadow-2xl backdrop-blur-xl outline-none focus:border-indigo-500/50 transition-all text-sm font-medium text-white"
               />
            </div>
          </div>
        </div>
      </section>

      {/* IT Categories */}
      <section className="py-20 md:py-32 px-6 bg-white/30">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white">{t('categories_title')}</h2>
            <p className="text-indigo-400/60 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">{t('categories_subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <CategoryItem icon={Code} title={t('cat_web')} desc="React, Vue, Angular, Next.js" />
            <CategoryItem icon={Smartphone} title={t('cat_mobile')} desc="iOS, Android, Flutter, React Native" />
            <CategoryItem icon={Server} title={t('cat_backend')} desc="Python, Node.js, Go, Java" />
            <CategoryItem icon={Cloud} title={t('cat_devops')} desc="Docker, K8s, AWS, CI/CD" />
            <CategoryItem icon={Database} title={t('cat_db')} desc="PostgreSQL, ML, Big Data" />
            <CategoryItem icon={ShieldCheck} title={t('cat_testing')} desc="Auto-tests, Manual QA" />
            <CategoryItem icon={Layers} title={t('cat_outsourcing')} desc={t('cat_outsourcing')} />
            <CategoryItem icon={Zap} title={t('cat_automation')} desc="Chatbots, AI Integrations" />
          </div>
        </div>
      </section>

      {/* Verified Specialists Preview */}
      <section id="specialists" className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white">{t('specialists_title')}</h2>
              <p className="text-indigo-400/60 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">{t('specialists_subtitle')}</p>
            </div>
            <Link to="/auth" className="text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-black transition-colors flex items-center gap-2">
              {t('view_marketplace')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SpecialistCard 
              name="Armen Vardanyan" 
              role="Senior Python / DevOps" 
              rating="5.0" 
              price="45" 
              tags={['Python', 'Kubernetes', 'AWS']} 
              t={t}
            />
            <SpecialistCard 
              name="Ani Sargsyan" 
              role="Middle React Developer" 
              rating="4.9" 
              price="30" 
              tags={['React', 'TypeScript', 'Tailwind']} 
              t={t}
            />
            <SpecialistCard 
              name="Karen Mkrtchyan" 
              role="Fullstack Node.js / Vue" 
              rating="4.8" 
              price="35" 
              tags={['Node.js', 'Vue.js', 'PostgreSQL']} 
              t={t}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-40 px-6 bg-black/5">
        <div className="max-w-5xl mx-auto space-y-16 md:space-y-24">
           <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">{t('how_it_works_title')}</h2>
              <p className="text-gray-400 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">{t('how_it_works_subtitle')}</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
             <div className="absolute top-12 left-0 right-0 h-px bg-black/5 hidden md:block" />
             <StepItem num="01" title={t('step_1_title')} desc={t('step_1_desc')} />
             <StepItem num="02" title={t('step_2_title')} desc={t('step_2_desc')} numColor="bg-indigo-500" />
             <StepItem num="03" title={t('step_3_title')} desc={t('step_3_desc')} />
             <StepItem num="04" title={t('step_4_title')} desc={t('step_4_desc')} numColor="bg-emerald-500" />
           </div>
        </div>
      </section>

      {/* Post Project Form */}
      <section id="post-project" className="py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto glass-panel p-8 md:p-16 rounded-[3rem] space-y-12 shadow-2xl bg-white/80 border border-white">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">{t('post_project_form_title')}</h2>
            <p className="text-gray-400 text-xs font-black uppercase">{t('get_started')}</p>
          </div>
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">{t('project_name')}</label>
                <input type="text" placeholder="e.g. CRM for Logistics" className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 outline-none focus:ring-4 ring-indigo-500/10 transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">{t('project_category')}</label>
                <select className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 outline-none focus:ring-4 ring-indigo-500/10 transition-all font-medium appearance-none">
                  <option>{t('cat_web')}</option>
                  <option>{t('cat_mobile')}</option>
                  <option>{t('cat_backend')}</option>
                  <option>{t('cat_devops')}</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">{t('project_budget')}</label>
                <input type="text" placeholder="e.g. $2000 or $40/hr" className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 outline-none focus:ring-4 ring-indigo-500/10 transition-all font-medium" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">{t('project_desc')}</label>
                <textarea rows={4} placeholder="Stack, requirements, deadlines..." className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 outline-none focus:ring-4 ring-indigo-500/10 transition-all font-medium resize-none"></textarea>
              </div>
            </div>
            <button type="button" className="w-full btn-capsule py-5 md:py-6 text-sm uppercase tracking-widest bg-black text-white hover:bg-indigo-600 transition-all flex items-center justify-center gap-3">
              <Send className="w-5 h-5" />
              {t('submit_project')}
            </button>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-40 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">{t('testimonials_title').split(' ')[0]} <br /> {t('testimonials_title').split(' ').slice(1).join(' ')}</h2>
              <p className="text-gray-400 text-xs font-black uppercase tracking-[0.3em]">{t('testimonials_subtitle')}</p>
            </div>
            <div className="flex items-center gap-2 px-6 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase">
               <Star className="w-3.5 h-3.5 text-orange-400 fill-current" />
               <span>{t('average_rating')}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="David Hovhannisyan" 
              role="CEO, TechBox" 
              project="CRM Development"
              text="AF helped us find a Senior React dev in 48 hours. The quality of delivery exceeded our expectations." 
            />
            <TestimonialCard 
              name="Elena Martiros" 
              role="Product Manager" 
              project="Flutter Mobile App"
              text="The communication is seamless. We've scaled our mobile app twice as fast with Armenian talent." 
            />
            <TestimonialCard 
              name="Mark Miller" 
              role="CTO, GlobaLink" 
              project="Infrastructure Audit"
              text="Highly professional DevOps specialist. Our infrastructure is now 40% more efficient." 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 md:px-12 border-t border-black/5 bg-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8 col-span-1 md:col-span-2">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
                </div>
               <span className="text-xl font-bold uppercase italic tracking-tighter">Armenia Freelance</span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">{t('footer_desc')}</p>
            <div className="flex gap-4">
               <SocialIcon icon={MessageSquare} />
               <SocialIcon icon={Globe} />
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-black uppercase italic tracking-tighter mb-6">{t('platform')}</h4>
            <div className="flex flex-col gap-4 text-sm font-bold uppercase text-gray-500">
              <a href="#specialists" className="hover:text-black transition-colors">{t('find_talent')}</a>
              <a href="#post-project" className="hover:text-black transition-colors">{t('find_work')}</a>
              <a href="#how-it-works" className="hover:text-black transition-colors">{t('how_it_works_title')}</a>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-black uppercase italic tracking-tighter mb-6">{t('support')}</h4>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase text-gray-400">{t('email')}</span>
                <a href="mailto:support@armfreelance.com" className="text-sm font-bold hover:text-indigo-600 transition-colors">support@armfreelance.com</a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase text-gray-400">{t('telegram')}</span>
                <a href="https://t.me/armfreelance" className="text-sm font-bold hover:text-indigo-600 transition-colors">@armfreelance_support</a>
              </div>
              <button className="btn-capsule py-4 text-[10px] uppercase tracking-[0.2em] w-full mt-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2">
                <HelpCircle className="w-4 h-4" />
                {t('help_choose_btn')}
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2026 AF Ecosystem. {t('all_rights')}.</p>
          <a href="https://agile-business-pro.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group transition-all">
            <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-indigo-500">{t('made_by')}</span>
            <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">Agile Business</span>
          </a>
        </div>
      </footer>
    </div>
  )
}

const CategoryItem = ({ icon: Icon, title, desc }: any) => (
  <div className="glass-panel p-8 md:p-10 rounded-[3rem] space-y-6 hover:bg-black hover:text-white transition-all group cursor-pointer border border-black/5 shadow-sm hover:shadow-2xl hover:-translate-y-2">
    <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-white/10 group-hover:text-white transition-all shadow-inner">
      <Icon className="w-6 md:w-8 h-6 md:h-8" />
    </div>
    <div className="space-y-2">
      <h3 className="font-black uppercase italic text-sm md:text-base tracking-tight">{title}</h3>
      <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] leading-relaxed group-hover:text-gray-300">{desc}</p>
    </div>
  </div>
)

const StepItem = ({ num, title, desc, numColor }: any) => (
  <div className="relative space-y-6 md:space-y-8 z-10 text-center md:text-left">
    <div className={`mx-auto md:mx-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl ${numColor || 'bg-black'} flex items-center justify-center text-white text-lg font-black shadow-xl shadow-black/10`}>
      {num}
    </div>
    <div className="space-y-2">
      <h3 className="text-lg md:text-xl font-black uppercase italic text-black">{title}</h3>
      <p className="text-gray-500 text-[10px] md:text-xs font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
)

const SpecialistCard = ({ name, role, rating, price, tags, t }: any) => (
  <div className="glass-panel p-8 md:p-10 rounded-[3.5rem] space-y-8 hover:shadow-2xl transition-all border border-black/5 group">
    <div className="flex justify-between items-start">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-black border-4 border-white flex items-center justify-center text-white text-3xl font-black shadow-xl group-hover:scale-105 transition-transform">
        {name[0]}
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-full text-orange-500">
        <Star className="w-3.5 h-3.5 fill-current" />
        <span className="text-xs font-black">{rating.toFixed(1)}</span>
      </div>
    </div>
    <div className="space-y-3">
      <h3 className="text-2xl font-black uppercase italic text-black group-hover:text-indigo-600 transition-colors">{name}</h3>
      <p className="text-xs font-black uppercase tracking-widest text-indigo-500">{role}</p>
    </div>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: string) => (
        <span key={tag} className="px-4 py-1.5 bg-black/5 rounded-full text-[10px] font-black uppercase text-gray-500 hover:bg-black hover:text-white transition-colors cursor-default">{tag}</span>
      ))}
    </div>
    <div className="pt-8 border-t border-black/5 flex items-center justify-between">
      <div>
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t('price_from')}</span>
        <div className="text-3xl font-black italic text-black">${price}<span className="text-sm font-medium not-italic text-gray-400">{t('per_hour')}</span></div>
      </div>
      <Link to="/auth" className="btn-capsule">
        {t('contact_specialist')}
      </Link>
    </div>
  </div>
)

const TestimonialCard = ({ name, role, project, text }: any) => (
  <div className="p-8 md:p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-6 hover:bg-white/10 transition-all flex flex-col justify-between">
    <div className="space-y-6">
      <div className="flex gap-1 text-orange-400">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
      </div>
      <p className="text-base md:text-lg font-medium leading-relaxed italic text-gray-200">"{text}"</p>
    </div>
    <div className="pt-6 border-t border-white/10">
      <h4 className="font-black uppercase italic text-sm">{name}</h4>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{role} • {project}</p>
    </div>
  </div>
)

const SocialIcon = ({ icon: Icon }: any) => (
  <button className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all">
    <Icon className="w-4 h-4" />
  </button>
)

const languages = [{ id: 'en', label: 'EN' }, { id: 'ru', label: 'RU' }, { id: 'hy', label: 'HY' }];

const LanguageSwitcher = ({ lang, setLang }: any) => {
  return (
    <div className="flex items-center gap-1 bg-black/5 p-1 rounded-full border border-black/5">
      {languages.map((l) => (
        <button 
          key={l.id}
          onClick={() => setLang(l.id as any)}
          className={`relative px-3 md:px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase transition-all z-10 ${lang === l.id ? 'text-white' : 'text-gray-400 hover:text-black'}`}
        >
          {lang === l.id && (
            <motion.div
              layoutId="activeLang"
              className="absolute inset-0 bg-black rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {l.label}
        </button>
      ))}
    </div>
  );
};

