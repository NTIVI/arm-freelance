import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Search, 
  LayoutGrid, 
  Briefcase, 
  Settings, 
  LogOut,
  Clock,
  Send,
  Star,
  CheckCircle2,
  X,
  PlusCircle,
  HelpCircle,
  Layout,
  Globe,
  Diamond
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

export const Dashboard = () => {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  const { user, logout, jobs, applyToJob } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<'browse' | 'my-work' | 'settings'>('browse');
  const [search, setSearch] = useState('');

  if (!user) return null;

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex p-6 gap-8 font-sans text-black overflow-hidden h-screen selection:bg-black selection:text-white relative">
      
      {/* Floating Circles Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-black/5 animate-float"
            style={{
              width: Math.random() * 300 + 100 + 'px',
              height: Math.random() * 300 + 100 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 10 + 's',
              animationDuration: Math.random() * 20 + 10 + 's',
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <aside className="w-[120px] bg-white rounded-[2.5rem] border-[1.5px] border-black flex flex-col items-center py-10 shadow-[10px_10px_0_0_rgba(0,0,0,1)] shrink-0 z-20">
        <Link to="/" className="mb-14 flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
            <div className="w-3.5 h-3.5 border-2 border-white rotate-45"></div>
          </div>
          <span className="font-black text-sm tracking-tighter">AF</span>
        </Link>

        <nav className="flex-1 space-y-10 w-full px-3">
          <SidebarButton 
            active={activeTab === 'browse'} 
            icon={LayoutGrid} 
            label="" 
            onClick={() => setActiveTab('browse')} 
          />
          <SidebarButton 
            active={activeTab === 'my-work'} 
            icon={Briefcase} 
            label="WORK" 
            onClick={() => setActiveTab('my-work')} 
          />
          <SidebarButton 
            active={activeTab === 'settings'} 
            icon={Settings} 
            label="SETTINGS" 
            onClick={() => setActiveTab('settings')} 
          />
        </nav>

        <div className="mt-auto flex flex-col items-center gap-8">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-black text-lg border-[1.5px] border-black">
            {user.fullName[0]}
          </div>
          <button onClick={logout} className="p-2 text-black/20 hover:text-black transition-all">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col gap-10 overflow-hidden pt-2">
        
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-black italic uppercase tracking-[-0.05em] leading-none">БИРЖА IT-ПРОЕКТОВ</h1>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40">
              ПАНЕЛЬ ФРИЛАНСЕРА • 03.05.2026
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-black/5 p-1 rounded-full flex gap-1">
               {['en', 'ru', 'hy'].map(l => (
                 <button 
                  key={l}
                  onClick={() => setLang(l as any)}
                  className={`px-3.5 py-1.5 rounded-full text-[9px] font-black uppercase transition-all ${lang === l ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
                 >
                   {l.toUpperCase()}
                 </button>
               ))}
            </div>
            <Link to="/" className="px-6 py-2.5 bg-white border border-black/10 rounded-full text-[9px] font-black uppercase tracking-widest hover:border-black transition-all">
               ГЛАВНАЯ
            </Link>
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
              <input 
                type="text" 
                placeholder="Поиск IT-проектов..." 
                className="bg-white border-[1.5px] border-black rounded-full pl-13 pr-8 py-3 text-[11px] font-bold outline-none w-[280px] shadow-[6px_6px_0_0_rgba(0,0,0,1)] focus:border-black transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Content Feed & Stats */}
        <div className="flex-1 flex gap-10 overflow-hidden">
          
          <main className="flex-1 overflow-y-auto pr-4 space-y-8 scrollbar-hide pb-20">
             {filteredJobs.map(job => (
               <JobCard key={job.id} job={job} user={user} applyToJob={applyToJob} />
             ))}
          </main>

          <aside className="w-[320px] space-y-8 shrink-0 flex flex-col pb-20">
            {/* Profile */}
            <div className="bg-white rounded-[2.5rem] border-[1.5px] border-black p-10 space-y-10 shadow-[10px_10px_0_0_rgba(0,0,0,1)] relative overflow-hidden">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
                     {user.fullName[0]}
                  </div>
                  <div>
                     <h3 className="font-black uppercase italic text-sm tracking-tight">{user.fullName}</h3>
                     <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[8px] font-black uppercase tracking-widest text-black/40">ПОДТВЕРЖДЕННЫЙ FREELANCER</span>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  <div>
                     <p className="text-3xl font-black italic tracking-tighter leading-none">$12.4k</p>
                     <p className="text-[8px] font-black uppercase text-black/40 tracking-widest mt-2">ЗАРАБОТАНО</p>
                  </div>
                  <div>
                     <p className="text-3xl font-black italic tracking-tighter leading-none">100%</p>
                     <p className="text-[8px] font-black uppercase text-black/40 tracking-widest mt-2">УСПЕХ</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <p className="text-[8px] font-black uppercase text-black/40 tracking-[0.2em]">АКТИВНОСТЬ</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase">СКОРОСТЬ ОТВЕТА</span>
                      <span className="text-[10px] font-black italic">98%</span>
                    </div>
                    <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                       <div className="h-full bg-black rounded-full"></div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Help */}
            <div className="bg-[#5c56ff] rounded-[2.5rem] border-[1.5px] border-black p-10 text-white space-y-10 shadow-[10px_10px_0_0_rgba(0,0,0,1)] relative overflow-hidden flex flex-col flex-1">
               <div className="w-10 h-10 bg-black/20 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 fill-current" />
               </div>
               <div className="space-y-3">
                  <h3 className="font-black uppercase italic text-lg leading-tight tracking-tight">ПОМОЧЬ С ВЫБОРОМ</h3>
                  <p className="text-[10px] font-medium text-white/80 leading-relaxed">
                     Не уверены, какой специалист нужен? Получите бесплатную 15-минутную консультацию с нашим тех. менеджером.
                  </p>
               </div>
               <div className="mt-auto">
                 <button className="w-full py-4 bg-white text-black rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl">
                    ЗАПРОСИТЬ КОНСУЛЬТАЦИЮ
                 </button>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

const SidebarButton = ({ active, icon: Icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex flex-col items-center gap-2 group transition-all`}
  >
    <div className={`w-full h-14 rounded-2xl flex items-center justify-center border-[1.5px] transition-all ${active ? 'bg-black text-white border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]' : 'bg-transparent border-transparent text-black/20 group-hover:text-black'}`}>
      <Icon className="w-6 h-6" />
    </div>
    {label && <span className={`text-[8px] font-black uppercase tracking-widest ${active ? 'text-black' : 'text-black/20 group-hover:text-black'}`}>{label}</span>}
  </button>
)

const JobCard = ({ job, user, applyToJob }: any) => (
  <div className="bg-white rounded-[2.5rem] border-[1.5px] border-black p-10 flex justify-between items-start hover:shadow-[10px_10px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all group">
    <div className="space-y-6 flex-1">
      <div>
         <span className="px-4 py-1.5 bg-black/5 rounded-full text-[8px] font-black uppercase tracking-widest text-indigo-600">{job.category}</span>
      </div>
      <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none">
        {job.title}
      </h3>
      <p className="text-black/40 text-[12px] font-medium max-w-2xl leading-relaxed">
        {job.description}
      </p>
      
      <div className="pt-6 flex items-center gap-10">
        <div className="flex items-center gap-3">
           <div className="w-9 h-9 bg-black/5 rounded-xl flex items-center justify-center text-[11px] font-black text-black/20">A</div>
           <span className="text-[9px] font-black uppercase tracking-widest text-black/40">ARMEN TECH</span>
        </div>
        <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-widest text-black/40">
           <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> New</span>
           <span className="flex items-center gap-2"><Send className="w-4 h-4" /> 12 bids</span>
        </div>
      </div>
    </div>
    
    <div className="text-right flex flex-col h-full justify-between items-end min-h-[160px]">
       <div className="space-y-1">
          <p className="text-4xl font-black italic tracking-tighter leading-none">${job.budget}</p>
          <p className="text-[9px] font-black uppercase text-black/20 tracking-widest">{job.type === 'fixed' ? 'FIXED' : 'HOURLY'}</p>
       </div>
       {user.role === 'freelancer' && (
         <button 
           onClick={() => applyToJob({ jobId: job.id, freelancerId: user.id, freelancerName: user.fullName, bid: job.budget, coverLetter: "I'm interested!" })}
           className="px-10 py-3.5 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 shadow-lg"
         >
           ОТКЛИКНУТЬСЯ
         </button>
       )}
    </div>
  </div>
)
