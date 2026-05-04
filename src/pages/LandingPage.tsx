import { motion, useScroll } from 'framer-motion'
import { Link } from 'react-router-dom'
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
  LayoutGrid
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'

const Logo = () => (
  <div className="flex items-center gap-2 group">
    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-[10px] flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-lg shadow-blue-500/20">
      <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-[4px] -rotate-45"></div>
    </div>
    <span className="text-base md:text-lg font-black tracking-tight uppercase text-black">ARM Freelance</span>
  </div>
)

const BackgroundAnimation = () => (
  <div className="bg-mesh">
    {[...Array(10)].map((_, i) => (
      <div 
        key={i}
        className="floating-circle"
        style={{
          width: Math.random() * 300 + 100 + 'px',
          height: Math.random() * 300 + 100 + 'px',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 10 + 's',
          animationDuration: Math.random() * 15 + 15 + 's',
          opacity: 0.03
        }}
      />
    ))}
  </div>
)

export const LandingPage = () => {
  const { lang, setLang, t } = useLanguage();
  const { user, specialists, users } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  const featuredFreelancers = [
    ...specialists,
    ...users.filter(u => u.role === 'freelancer' && !specialists.find(s => s.id === u.id))
  ].slice(0, 3);

  return (
    <div className="min-h-screen text-black bg-[#fcfcfc] selection:bg-black/5 font-sans relative">
      <BackgroundAnimation />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-6">
        <div className="nav-pill max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
          <div className="flex-shrink-0">
            <Link to="/"><Logo /></Link>
          </div>
          
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
            <Search className="absolute left-4 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Поиск талантов..."
              className="w-full bg-gray-50 border border-black/5 rounded-full py-2.5 pl-11 pr-4 text-sm outline-none focus:bg-white focus:border-black/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <LanguageSwitcher lang={lang} setLang={setLang} />
            <div className="hidden lg:flex items-center gap-2">
               {user ? (
                 <Link to="/dashboard" className="px-5 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-all">
                   {t('personal_account')}
                 </Link>
               ) : (
                 <>
                   <Link to="/auth" className="px-6 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-all">
                     {t('login')}
                   </Link>
                   <Link to="/auth" className="px-6 py-2.5 border border-black/10 text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-black/5 transition-all">
                     {t('signup')}
                   </Link>
                 </>
               )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 md:pt-64 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-4">
            <p className="subheading-premium">{t('hero_subtitle')}</p>
            <h1 className="heading-hero">{t('hero_title')}</h1>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth" className="btn-black">
              {t('become_performer')} <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/auth" className="btn-white">
              {t('become_client_btn')}
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase">{t('categories_title')}</h2>
            <p className="subheading-premium">{t('categories_subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <CategoryCard icon={Code} title={t('cat_web')} sub="REACT, VUE, ANGULAR, NEXT.JS" />
            <CategoryCard icon={Smartphone} title={t('cat_mobile')} sub="IOS, ANDROID, FLUTTER, REACT NATIVE" />
            <CategoryCard icon={Server} title={t('cat_backend')} sub="PYTHON, NODE.JS, GO, JAVA" />
            <CategoryCard icon={Cloud} title={t('cat_devops')} sub="DOCKER, K8S, AWS, CI/CD" />
            <CategoryCard icon={Database} title={t('cat_db')} sub="POSTGRESQL, EL, BIG DATA" />
            <CategoryCard icon={ShieldCheck} title={t('cat_testing')} sub="AUTO-TESTS, MANUAL QA" />
            <CategoryCard icon={Layers} title={t('cat_outsourcing')} sub="IT-СТРАТЕГИИ / КОНСАЛТИНГ" />
            <CategoryCard icon={Zap} title={t('cat_automation')} sub="CHATBOTS, AI INTEGRATIONS" />
          </div>
        </div>
      </section>

      {/* Verified Specialists */}
      <section className="py-24 px-6 bg-white/40">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase">{t('specialists_title')}</h2>
              <p className="subheading-premium">{t('specialists_subtitle')}</p>
            </div>
            <Link to="/auth" className="text-xs font-black uppercase tracking-widest text-black flex items-center gap-2 group">
              {t('view_marketplace')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFreelancers.map((spec) => (
              <SpecialistCard key={spec.id} spec={spec} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Post Project Form */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto glass-panel p-8 md:p-16 space-y-12 shadow-2xl bg-white/90">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">{t('post_project_form_title')}</h2>
            <p className="subheading-premium">{t('get_started')}</p>
          </div>
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">{t('project_name')}</label>
                <input type="text" placeholder="e.g. CRM for Logistics" className="input-premium w-full" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">{t('project_category')}</label>
                <select className="input-premium w-full appearance-none bg-no-repeat bg-[right_1.5rem_center]">
                  <option>{t('cat_web')}</option>
                  <option>{t('cat_mobile')}</option>
                  <option>{t('cat_backend')}</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">{t('project_budget')}</label>
                <input type="text" placeholder="e.g. $2000 or $40/hr" className="input-premium w-full" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">{t('project_desc')}</label>
                <textarea rows={4} placeholder="Stack, requirements, deadlines..." className="input-premium w-full resize-none"></textarea>
              </div>
            </div>
            <button type="button" className="w-full btn-black flex items-center justify-center gap-3">
              <Send className="w-5 h-5" />
              {t('submit_project')}
            </button>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-black text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto space-y-20 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">{t('testimonials_title')}</h2>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">{t('testimonials_subtitle')}</p>
            </div>
            <div className="px-6 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase flex items-center gap-2">
               <Star className="w-4 h-4 text-yellow-500 fill-current" />
               <span>{t('average_rating')}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard name="ДАВИД ОВАННИСЯН" role="CEO, TECHBOX" text="AF помог нам найти Senior React — качество выше ожиданий." />
            <TestimonialCard name="ЕЛЕНА МАРТИРОС" role="PRODUCT MANAGER" text="Коммуникация на высоте; выпустили приложение вдвое быстрее." />
            <TestimonialCard name="МАРК МИЛЛЕР" role="CTO, GLOBALINK" text="Сильный DevOps — инфраструктура стала примерно на 40% эффективнее." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 md:px-12 border-t border-black/5 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 pb-20">
            <div className="col-span-1 md:col-span-1 space-y-6">
              <Logo />
              <div className="flex flex-col gap-2">
                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Сделано компанией Agile Business</p>
                 <a href="https://agile-business-pro.com/#services" target="_blank" rel="noreferrer" className="w-fit px-5 py-2 bg-gray-50 border border-black/5 rounded-full text-[9px] font-black uppercase hover:bg-black hover:text-white transition-all shadow-sm">
                   Agile Business
                 </a>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest">{t('platform')}</h4>
              <div className="flex flex-col gap-4 text-xs font-bold uppercase text-gray-400">
                <a href="#" className="hover:text-black transition-colors">Поиск проектов и услуг</a>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest">{t('support')}</h4>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase text-gray-300">EMAIL</span>
                  <a href="mailto:support@armfreelance.com" className="text-xs font-bold hover:text-blue-600 transition-colors">support@armfreelance.com</a>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest">{t('feedback')}</h4>
              <div className="flex gap-4">
                 <SocialPill icon={LayoutGrid} />
                 <SocialPill icon={Send} />
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">© 2026 ARM Freelance. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Сделано компанией Agile Business</span>
              <a href="https://agile-business-pro.com/#services" target="_blank" rel="noreferrer" className="px-5 py-2 bg-gray-50 border border-black/5 rounded-full text-[9px] font-black uppercase hover:bg-black hover:text-white transition-all shadow-sm">
                Agile Business
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const CategoryCard = ({ icon: Icon, title, sub }: any) => (
  <div className="glass-panel p-8 md:p-10 text-center space-y-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 cursor-pointer group">
    <div className="w-16 h-16 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500">
      <Icon className="w-6 h-6" />
    </div>
    <div className="space-y-2">
      <h3 className="text-sm font-black italic uppercase tracking-tight">{title}</h3>
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-tight">{sub}</p>
    </div>
  </div>
)

const SpecialistCard = ({ spec, t }: any) => (
  <div className="glass-panel p-8 space-y-8 hover:shadow-2xl transition-all border border-black/5 group">
    <div className="flex justify-between items-start">
      <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-lg">
        {spec.fullName[0]}
      </div>
      <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
        <Star className="w-3 h-3 text-orange-400 fill-current" />
        <span className="text-[10px] font-black">{spec.rating || '5.0'}</span>
      </div>
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-black italic uppercase text-black group-hover:text-blue-600 transition-colors">{spec.fullName}</h3>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{spec.title || spec.category || 'FREELANCE PROFESSIONAL'}</p>
    </div>
    <div className="flex flex-wrap gap-2">
      {(spec.skills || ['React', 'TypeScript', 'Tailwind']).slice(0, 3).map((tag: string) => (
        <span key={tag} className="px-3 py-1 bg-gray-50 rounded-full text-[9px] font-bold uppercase text-gray-400 border border-black/5">{tag}</span>
      ))}
    </div>
    <div className="pt-6 border-t border-black/5 flex items-center justify-between">
      <div>
        <span className="text-[9px] font-black uppercase text-gray-400">{t('price_from')}</span>
        <div className="text-xl font-black italic">${spec.price || '30'}<span className="text-[10px] font-medium not-italic text-gray-400">{t('per_hour')}</span></div>
      </div>
      <Link to="/auth" className="px-6 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-blue-600 transition-all">
        {t('contact_specialist')}
      </Link>
    </div>
  </div>
)

const TestimonialCard = ({ name, role, text }: any) => (
  <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6 hover:bg-white/10 transition-all">
    <div className="flex gap-1 text-orange-400">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
    </div>
    <p className="text-sm font-medium italic text-gray-300 leading-relaxed">"{text}"</p>
    <div className="pt-6 border-t border-white/5">
      <h4 className="font-black italic text-xs uppercase">{name}</h4>
      <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{role}</p>
    </div>
  </div>
)

const SocialPill = ({ icon: Icon }: any) => (
  <button className="w-10 h-10 rounded-full bg-gray-50 border border-black/5 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all">
    <Icon className="w-4 h-4" />
  </button>
)

const languages = [{ id: 'en', label: 'EN' }, { id: 'ru', label: 'RU' }, { id: 'hy', label: 'HY' }];

const LanguageSwitcher = ({ lang, setLang }: any) => (
  <div className="flex items-center gap-1 bg-black/5 p-1 rounded-full border border-black/5">
    {languages.map((l) => (
      <button 
        key={l.id}
        onClick={() => setLang(l.id as any)}
        className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase transition-all ${lang === l.id ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
      >
        {l.label}
      </button>
    ))}
  </div>
)

