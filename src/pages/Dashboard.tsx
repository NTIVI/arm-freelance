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
  Layout
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

export const Dashboard = () => {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  const { user, logout, jobs, proposals, specialists, applyToJob, hireSpecialist, completeJob, addJob } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<'browse' | 'my-work' | 'chats' | 'settings'>('browse');
  const [search, setSearch] = useState('');

  if (!user) return null;

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex p-4 gap-4 font-sans text-black">
      
      {/* Sidebar */}
      <aside className="w-24 bg-white rounded-[3.5rem] border border-black/5 flex flex-col items-center py-10 shadow-sm shrink-0">
        <Link to="/" className="mb-16">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
          </div>
        </Link>

        <nav className="flex-1 space-y-8">
          <SidebarIcon active={activeTab === 'browse'} icon={LayoutGrid} onClick={() => setActiveTab('browse')} />
          <SidebarIcon active={activeTab === 'my-work'} icon={Briefcase} onClick={() => setActiveTab('my-work')} />
          <SidebarIcon active={activeTab === 'settings'} icon={Settings} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="mt-auto flex flex-col items-center gap-6">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-black text-lg">
            {user.fullName[0]}
          </div>
          <button onClick={logout} className="p-2 text-gray-400 hover:text-black transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">БИРЖА IT-ПРОЕКТОВ</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              ПАНЕЛЬ ФРИЛАНСЕРА • {new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/50 p-1 rounded-full border border-black/5 flex gap-1">
               {['en', 'ru', 'hy'].map(l => (
                 <button 
                  key={l}
                  onClick={() => setLang(l as any)}
                  className={`px-3 py-1 rounded-full text-[9px] font-black uppercase transition-all ${lang === l ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
                 >
                   {l.toUpperCase()}
                 </button>
               ))}
            </div>
            <Link to="/" className="px-6 py-2 bg-white rounded-full border border-black/5 text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm">
               ГЛАВНАЯ
            </Link>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Поиск IT-проектов..." 
                className="bg-white border border-black/5 rounded-full pl-12 pr-6 py-2.5 text-sm outline-none w-64 shadow-sm focus:border-black/20 transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Job Feed */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} t={t} user={user} applyToJob={applyToJob} />
          ))}
        </div>
      </main>

      {/* Right Column */}
      <aside className="w-80 space-y-6 shrink-0">
        {/* Profile Stats */}
        <div className="bg-white rounded-[3rem] border border-black/10 p-8 space-y-10 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-16 -mt-16"></div>
           <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white font-black text-2xl">
                 {user.fullName[0]}
              </div>
              <div>
                 <h3 className="font-black uppercase italic text-sm">{user.fullName}</h3>
                 <div className="flex items-center gap-1 text-emerald-500">
                    <CheckCircle2 className="w-3 h-3" />
                    <span className="text-[8px] font-black uppercase tracking-widest">ПОДТВЕРЖДЕННЫЙ FREELANCER</span>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-8 relative z-10">
              <div>
                 <p className="text-2xl font-black italic tracking-tighter">$12.4k</p>
                 <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-none mt-1">ЗАРАБОТАНО</p>
              </div>
              <div>
                 <p className="text-2xl font-black italic tracking-tighter">100%</p>
                 <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-none mt-1">УСПЕХ</p>
              </div>
           </div>

           <div className="space-y-2 relative z-10">
              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                 <span className="text-gray-400">АКТИВНОСТЬ</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[9px] font-black uppercase">СКОРОСТЬ ОТВЕТА</span>
                <span className="text-[9px] font-black uppercase italic">98%</span>
              </div>
              <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                 <div className="h-full bg-black w-[98%]"></div>
              </div>
           </div>
        </div>

        {/* Help Card */}
        <div className="bg-[#5c56ff] rounded-[3rem] p-8 text-white space-y-6 shadow-xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
           <div className="w-10 h-10 bg-black/20 rounded-xl flex items-center justify-center relative z-10">
              <Star className="w-5 h-5 fill-current" />
           </div>
           <div className="space-y-2 relative z-10">
              <h3 className="font-black uppercase italic text-lg leading-tight">ПОМОЧЬ С ВЫБОРОМ</h3>
              <p className="text-[10px] font-medium text-white/70 leading-relaxed">
                 Не уверены, какой специалист нужен? Получите бесплатную 15-минутную консультацию с нашим тех. менеджером.
              </p>
           </div>
           <button className="w-full py-4 bg-white text-[#5c56ff] rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all relative z-10 shadow-lg">
              ЗАПРОСИТЬ КОНСУЛЬТАЦИЮ
           </button>
        </div>
      </aside>
    </div>
  );
}

const SidebarIcon = ({ active, icon: Icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${active ? 'bg-black text-white shadow-xl scale-110' : 'text-gray-400 hover:text-black hover:bg-black/5'}`}
  >
    <Icon className="w-6 h-6" />
  </button>
)

const JobCard = ({ job, t, user, applyToJob }: any) => (
  <div className="bg-white rounded-[3rem] border border-black/10 p-10 flex justify-between items-start hover:shadow-xl transition-all group">
    <div className="space-y-4 flex-1">
      <div className="flex items-center gap-3">
         <span className="px-3 py-1 bg-black/5 rounded-full text-[8px] font-black uppercase tracking-widest text-blue-600">{job.category}</span>
      </div>
      <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none group-hover:text-blue-600 transition-colors">
        {job.title}
      </h3>
      <p className="text-gray-400 text-xs font-medium max-w-2xl line-clamp-2">
        {job.description}
      </p>
      
      <div className="pt-4 flex items-center gap-8">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] font-black">A</div>
           <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">ARMEN TECH</span>
        </div>
        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
           <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> New</span>
           <span className="flex items-center gap-1.5"><Send className="w-3.5 h-3.5" /> 12 bids</span>
        </div>
      </div>
    </div>
    
    <div className="text-right space-y-1">
       <p className="text-4xl font-black italic tracking-tighter">${job.budget}</p>
       <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest">{job.type === 'fixed' ? 'FIXED' : 'HOURLY'}</p>
       {user.role === 'freelancer' && (
         <button 
           onClick={() => applyToJob({ jobId: job.id, freelancerId: user.id, freelancerName: user.fullName, bid: job.budget, coverLetter: "I'm interested!" })}
           className="mt-6 px-8 py-3 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 shadow-lg"
         >
           ОТКЛИКНУТЬСЯ
         </button>
       )}
    </div>
  </div>
)


