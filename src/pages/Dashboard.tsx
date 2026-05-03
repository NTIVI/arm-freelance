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
    <div className="min-h-screen bg-[#f3f4f6] flex p-4 gap-6 font-sans text-black overflow-hidden h-screen">
      
      {/* Sidebar */}
      <aside className="w-24 bg-white rounded-[3.5rem] border border-black/5 flex flex-col items-center py-10 shadow-sm shrink-0">
        <Link to="/" className="mb-16">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
          </div>
        </Link>

        <nav className="flex-1 space-y-10">
          <SidebarIcon active={activeTab === 'browse'} icon={LayoutGrid} onClick={() => setActiveTab('browse')} />
          <SidebarIcon active={activeTab === 'my-work'} icon={Briefcase} onClick={() => setActiveTab('my-work')} />
          <SidebarIcon active={activeTab === 'settings'} icon={Settings} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="mt-auto flex flex-col items-center gap-8">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl ring-4 ring-white">
            {user.fullName[0]}
          </div>
          <button onClick={logout} className="p-2 text-gray-400 hover:text-black transition-all hover:scale-110">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        
        {/* Header */}
        <header className="flex items-center justify-between px-2 py-2">
          <div className="space-y-1">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">БИРЖА IT-ПРОЕКТОВ</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              ПАНЕЛЬ ФРИЛАНСЕРА • 03.05.2026
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-black/5 p-1 rounded-full border border-black/5 flex gap-1">
               {['en', 'ru', 'hy'].map(l => (
                 <button 
                  key={l}
                  onClick={() => setLang(l as any)}
                  className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase transition-all ${lang === l ? 'bg-black text-white shadow-md' : 'text-gray-400 hover:text-black'}`}
                 >
                   {l.toUpperCase()}
                 </button>
               ))}
            </div>
            <Link to="/" className="px-6 py-2.5 bg-black/5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
               ГЛАВНАЯ
            </Link>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Поиск IT-проектов..." 
                className="bg-white border border-black/5 rounded-full pl-12 pr-6 py-2.5 text-xs font-bold outline-none w-64 shadow-sm focus:border-black/20 transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Two Columns: Content and Stats */}
        <div className="flex-1 flex gap-6 overflow-hidden">
          
          {/* Main Feed */}
          <main className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-hide">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobCard key={job.id} job={job} user={user} applyToJob={applyToJob} />
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4 opacity-50">
                <Briefcase className="w-16 h-16" />
                <p className="text-xs font-black uppercase tracking-widest">Проектов не найдено</p>
              </div>
            )}
          </main>

          {/* Right Column */}
          <aside className="w-80 space-y-6 shrink-0 flex flex-col">
            {/* Profile Card */}
            <div className="bg-white rounded-[3.5rem] border border-black/10 p-10 space-y-12 shadow-sm relative overflow-hidden shrink-0">
               <div className="flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 bg-black rounded-[1.5rem] flex items-center justify-center text-white font-black text-3xl shadow-xl">
                     {user.fullName[0]}
                  </div>
                  <div>
                     <h3 className="font-black uppercase italic text-sm leading-none">{user.fullName}</h3>
                     <div className="flex items-center gap-1.5 text-black mt-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">ПОДТВЕРЖДЕННЫЙ FREELANCER</span>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8 relative z-10">
                  <div>
                     <p className="text-3xl font-black italic tracking-tighter leading-none">$12.4k</p>
                     <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mt-2">ЗАРАБОТАНО</p>
                  </div>
                  <div>
                     <p className="text-3xl font-black italic tracking-tighter leading-none">100%</p>
                     <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mt-2">УСПЕХ</p>
                  </div>
               </div>

               <div className="space-y-4 relative z-10">
                  <p className="text-[9px] font-black uppercase text-gray-400 tracking-[0.2em]">АКТИВНОСТЬ</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase">СКОРОСТЬ ОТВЕТА</span>
                      <span className="text-[10px] font-black italic">98%</span>
                    </div>
                    <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                       <div className="h-full bg-black w-[98%] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]"></div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Help Card */}
            <div className="bg-[#5c56ff] rounded-[3.5rem] p-10 text-white space-y-8 shadow-xl relative overflow-hidden group flex-1 flex flex-col">
               <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-700"></div>
               <div className="w-12 h-12 bg-black/20 rounded-2xl flex items-center justify-center relative z-10">
                  <Star className="w-6 h-6 fill-current" />
               </div>
               <div className="space-y-3 relative z-10">
                  <h3 className="font-black uppercase italic text-xl leading-tight">ПОМОЧЬ С ВЫБОРОМ</h3>
                  <p className="text-[11px] font-medium text-white/80 leading-relaxed">
                     Не уверены, какой специалист нужен? Получите бесплатную 15-минутную консультацию с нашим тех. менеджером.
                  </p>
               </div>
               <div className="mt-auto relative z-10 pt-4">
                 <button className="w-full py-5 bg-white text-[#5c56ff] rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg active:scale-95">
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
    className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-300 relative ${active ? 'bg-black text-white shadow-[0_15px_30px_rgba(0,0,0,0.2)] scale-110' : 'text-gray-300 hover:text-black hover:bg-black/5'}`}
  >
    <Icon className="w-7 h-7" />
    {active && <div className="absolute -right-2 w-1.5 h-1.5 bg-black rounded-full"></div>}
  </button>
)

const JobCard = ({ job, user, applyToJob }: any) => (
  <div className="bg-white rounded-[3.5rem] border border-black/10 p-10 flex justify-between items-start hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-2 h-full bg-transparent group-hover:bg-blue-600 transition-all"></div>
    <div className="space-y-6 flex-1">
      <div className="flex items-center gap-3">
         <span className="px-4 py-1.5 bg-black/5 rounded-full text-[9px] font-black uppercase tracking-widest text-blue-600">{job.category}</span>
      </div>
      <div className="space-y-4">
        <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none group-hover:text-blue-600 transition-colors">
          {job.title}
        </h3>
        <p className="text-gray-400 text-xs font-medium max-w-2xl leading-relaxed">
          {job.description}
        </p>
      </div>
      
      <div className="pt-6 flex items-center gap-10">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-xs font-black">A</div>
           <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">ARMEN TECH</span>
        </div>
        <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
           <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> NEW</span>
           <span className="flex items-center gap-2"><Send className="w-4 h-4" /> 12 BIDS</span>
        </div>
      </div>
    </div>
    
    <div className="text-right flex flex-col h-full justify-between items-end min-h-[160px]">
       <div className="space-y-1">
          <p className="text-4xl font-black italic tracking-tighter leading-none">${job.budget}</p>
          <p className="text-[10px] font-black uppercase text-gray-300 tracking-[0.2em]">{job.type === 'fixed' ? 'FIXED' : 'HOURLY'}</p>
       </div>
       {user.role === 'freelancer' && (
         <button 
           onClick={() => applyToJob({ jobId: job.id, freelancerId: user.id, freelancerName: user.fullName, bid: job.budget, coverLetter: "I'm interested!" })}
           className="px-10 py-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 shadow-xl active:scale-95"
         >
           ОТКЛИКНУТЬСЯ
         </button>
       )}
    </div>
  </div>
)
