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
  Globe
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
    <div className="min-h-screen bg-[#f3f4f6] flex p-5 gap-6 font-sans text-black overflow-hidden h-screen selection:bg-black selection:text-white">
      
      {/* Sidebar */}
      <aside className="w-24 bg-white rounded-[3rem] border-[1.5px] border-black flex flex-col items-center py-10 shadow-[8px_8px_0_0_rgba(0,0,0,1)] shrink-0 z-20">
        <Link to="/" className="mb-16">
          <div className="w-11 h-11 bg-black rounded-xl flex items-center justify-center shadow-lg">
            <div className="w-4.5 h-4.5 border-2 border-white rounded-sm rotate-45"></div>
          </div>
        </Link>

        <nav className="flex-1 space-y-10">
          <SidebarIcon active={activeTab === 'browse'} icon={LayoutGrid} onClick={() => setActiveTab('browse')} />
          <SidebarIcon active={activeTab === 'my-work'} icon={Briefcase} onClick={() => setActiveTab('my-work')} />
          <SidebarIcon active={activeTab === 'settings'} icon={Settings} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="mt-auto flex flex-col items-center gap-10">
          <div className="w-13 h-13 bg-black rounded-full flex items-center justify-center text-white font-black text-xl shadow-xl ring-4 ring-white">
            {user.fullName[0]}
          </div>
          <button onClick={logout} className="p-2 text-black/20 hover:text-black transition-all hover:scale-125">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-8 overflow-hidden pt-1">
        
        {/* Header */}
        <header className="flex items-center justify-between px-2">
          <div className="space-y-1">
            <h1 className="text-5xl font-black italic uppercase tracking-[-0.05em] leading-none">БИРЖА IT-ПРОЕКТОВ</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40">
              ПАНЕЛЬ ФРИЛАНСЕРА • 03.05.2026
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-black/5 p-1 rounded-full border border-black/5 flex gap-1">
               {['en', 'ru', 'hy'].map(l => (
                 <button 
                  key={l}
                  onClick={() => setLang(l as any)}
                  className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase transition-all ${lang === l ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
                 >
                   {l.toUpperCase()}
                 </button>
               ))}
            </div>
            <Link to="/" className="px-7 py-3 bg-white border-[1.5px] border-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
               ГЛАВНАЯ
            </Link>
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
              <input 
                type="text" 
                placeholder="Поиск IT-проектов..." 
                className="bg-white border-[1.5px] border-black rounded-full pl-13 pr-8 py-3.5 text-[11px] font-bold outline-none w-[280px] shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Two Columns: Content and Stats */}
        <div className="flex-1 flex gap-8 overflow-hidden px-1">
          
          {/* Main Feed */}
          <main className="flex-1 overflow-y-auto pr-4 space-y-10 scrollbar-hide pb-20">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobCard key={job.id} job={job} user={user} applyToJob={applyToJob} />
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-black/20 gap-6">
                <Briefcase className="w-20 h-20" />
                <p className="text-[11px] font-black uppercase tracking-[0.25em]">Проектов не найдено</p>
              </div>
            )}
          </main>

          {/* Right Column */}
          <aside className="w-80 space-y-8 shrink-0 flex flex-col pb-20">
            {/* Profile Card */}
            <div className="bg-white rounded-[3rem] border-[1.5px] border-black p-10 space-y-12 shadow-[10px_10px_0_0_rgba(0,0,0,1)] relative overflow-hidden shrink-0">
               <div className="flex items-center gap-5 relative z-10">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-xl">
                     {user.fullName[0]}
                  </div>
                  <div>
                     <h3 className="font-black uppercase italic text-[15px] leading-none tracking-tight">{user.fullName}</h3>
                     <div className="flex items-center gap-2 mt-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-black/40">ПОДТВЕРЖДЕННЫЙ FREELANCER</span>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-10 relative z-10">
                  <div>
                     <p className="text-4xl font-black italic tracking-tighter leading-none">$12.4k</p>
                     <p className="text-[9px] font-black uppercase text-black/40 tracking-widest mt-2.5">ЗАРАБОТАНО</p>
                  </div>
                  <div>
                     <p className="text-4xl font-black italic tracking-tighter leading-none">100%</p>
                     <p className="text-[9px] font-black uppercase text-black/40 tracking-widest mt-2.5">УСПЕХ</p>
                  </div>
               </div>

               <div className="space-y-5 relative z-10">
                  <p className="text-[9px] font-black uppercase text-black/40 tracking-[0.25em]">АКТИВНОСТЬ</p>
                  <div className="space-y-3">
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

            {/* Help Card */}
            <div className="bg-[#5c56ff] rounded-[3rem] border-[1.5px] border-black p-10 text-white space-y-10 shadow-[10px_10px_0_0_rgba(0,0,0,1)] relative overflow-hidden group flex-1 flex flex-col">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 group-hover:scale-125 transition-transform duration-1000"></div>
               <div className="w-13 h-13 bg-black/20 rounded-2xl flex items-center justify-center relative z-10 border border-white/10">
                  <Star className="w-7 h-7 fill-current text-white" />
               </div>
               <div className="space-y-4 relative z-10">
                  <h3 className="font-black uppercase italic text-2xl leading-tight tracking-tight">ПОМОЧЬ С ВЫБОРОМ</h3>
                  <p className="text-[11px] font-medium text-white/80 leading-relaxed">
                     Не уверены, какой специалист нужен? Получите бесплатную 15-минутную консультацию с нашим тех. менеджером.
                  </p>
               </div>
               <div className="mt-auto relative z-10 pt-6">
                 <button className="w-full py-5 bg-white text-[#5c56ff] rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl active:scale-95">
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

const SidebarIcon = ({ active, icon: Icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 relative border-[1.5px] ${active ? 'bg-black text-white border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] scale-110' : 'text-black/20 border-transparent hover:text-black hover:bg-black/5'}`}
  >
    <Icon className="w-7 h-7" />
    {active && <div className="absolute -right-3 w-1.5 h-1.5 bg-black rounded-full shadow-lg"></div>}
  </button>
)

const JobCard = ({ job, user, applyToJob }: any) => (
  <div className="bg-white rounded-[3rem] border-[1.5px] border-black p-12 flex justify-between items-start hover:shadow-[14px_14px_0_0_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all group relative overflow-hidden">
    <div className="absolute top-0 left-0 w-2.5 h-full bg-transparent group-hover:bg-blue-600 transition-all"></div>
    <div className="space-y-8 flex-1">
      <div className="flex items-center gap-4">
         <span className="px-5 py-2 bg-black/5 rounded-full text-[9px] font-black uppercase tracking-widest text-blue-600">{job.category}</span>
      </div>
      <div className="space-y-5">
        <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none group-hover:text-blue-600 transition-colors">
          {job.title}
        </h3>
        <p className="text-black/40 text-[13px] font-medium max-w-2xl leading-relaxed">
          {job.description}
        </p>
      </div>
      
      <div className="pt-8 flex items-center gap-12">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center text-xs font-black text-black/20 group-hover:text-black group-hover:bg-black/10 transition-all">A</div>
           <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40 group-hover:text-black transition-all">ARMEN TECH</span>
        </div>
        <div className="flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.25em] text-black/40">
           <span className="flex items-center gap-2.5"><Clock className="w-5 h-5" /> NEW</span>
           <span className="flex items-center gap-2.5"><Send className="w-5 h-5" /> 12 BIDS</span>
        </div>
      </div>
    </div>
    
    <div className="text-right flex flex-col h-full justify-between items-end min-h-[220px]">
       <div className="space-y-2">
          <p className="text-5xl font-black italic tracking-tighter leading-none">${job.budget}</p>
          <p className="text-[10px] font-black uppercase text-black/20 tracking-[0.3em]">{job.type === 'fixed' ? 'FIXED' : 'HOURLY'}</p>
       </div>
       {user.role === 'freelancer' && (
         <button 
           onClick={() => applyToJob({ jobId: job.id, freelancerId: user.id, freelancerName: user.fullName, bid: job.budget, coverLetter: "I'm interested!" })}
           className="px-12 py-5 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] active:scale-95"
         >
           ОТКЛИКНУТЬСЯ
         </button>
       )}
    </div>
  </div>
)
