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
  MessageSquare,
  Instagram,
  User,
  Shield,
  Trash2,
  Ban,
  Check,
  ChevronRight,
  ArrowUpRight,
  Zap
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

export const Dashboard = () => {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  const { user, logout, jobs, proposals, applyToJob, hireSpecialist, completeJob, addJob } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<'browse' | 'my-work' | 'chats' | 'settings'>('browse');
  const [search, setSearch] = useState('');
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [isRating, setIsRating] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5);
  const [expandedProposals, setExpandedProposals] = useState<Record<string, boolean>>({});

  if (!user) return null;

  const filteredJobs = jobs.filter(j => 
    (j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.category.toLowerCase().includes(search.toLowerCase())) &&
    j.status === 'open'
  );

  const myJobs = jobs.filter(j => j.clientId === user.id);
  const myBids = proposals.filter(p => p.freelancerId === user.id);
  const activeChats = jobs.filter(j => (j.clientId === user.id || j.selectedFreelancerId === user.id) && j.status === 'in-progress');

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex p-6 gap-6 font-sans text-black relative">
      <BackgroundAnimation />
      
      {/* Sidebar */}
      <aside className="w-72 bg-white/70 backdrop-blur-3xl rounded-[3rem] border border-black/5 flex flex-col p-8 py-12 shadow-[0_32px_64px_rgba(0,0,0,0.02)] shrink-0 h-[calc(100vh-3rem)] sticky top-6">
        <div className="mb-16 px-4">
          <Link to="/" className="flex items-center gap-4 px-2 group cursor-pointer">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-all duration-500 shadow-2xl">
              <div className="w-5 h-5 border-2 border-white rounded rotate-45 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic text-gradient">AF MARKET</span>
          </Link>
        </div>

        <nav className="space-y-4 mb-auto">
          <SidebarItem active={activeTab === 'browse'} icon={LayoutGrid} onClick={() => setActiveTab('browse')} label="БИРЖА" />
          <SidebarItem 
            active={activeTab === 'my-work'} 
            icon={Briefcase} 
            onClick={() => setActiveTab('my-work')} 
            label={user.role === 'client' ? "МОИ ЗАКАЗЫ" : "МОИ ОТКЛИКИ"} 
          />
          <SidebarItem active={activeTab === 'chats'} icon={MessageSquare} onClick={() => setActiveTab('chats')} label="ЧАТЫ" />
          <SidebarItem active={activeTab === 'settings'} icon={Settings} onClick={() => setActiveTab('settings')} label="ПРОФИЛЬ" />
        </nav>

        <div className="flex flex-col gap-6 pt-10 border-t border-black/5">
          <div className="p-5 bg-black text-white rounded-[2.5rem] flex items-center gap-4 shadow-2xl">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-black text-lg">
              {user.fullName[0]}
            </div>
            <div className="overflow-hidden">
               <p className="text-[11px] font-black uppercase italic truncate">{user.fullName}</p>
               <div className="flex items-center gap-1 opacity-50">
                  <Zap className="w-3 h-3 text-emerald-400 fill-current" />
                  <p className="text-[9px] font-bold uppercase tracking-widest">{user.role}</p>
               </div>
            </div>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-4 px-8 py-5 text-gray-400 hover:text-black transition-all rounded-3xl hover:bg-black/5 font-black text-[10px] uppercase tracking-widest">
            <LogOut className="w-5 h-5" />
            <span>ВЫХОД</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-8 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 pt-4">
          <div className="space-y-2">
            <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">
              {activeTab === 'browse' ? "ИТ-БИРЖА" : 
               activeTab === 'my-work' ? (user.role === 'client' ? "ЗАКАЗЫ" : "ОТКЛИКИ") :
               activeTab === 'chats' ? "ДИАЛОГИ" : "ПРОФИЛЬ"}
            </h1>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                {user.role === 'client' ? 'CLIENT DASHBOARD' : 'TALENT HUB'} • {new Date().toLocaleDateString('ru-RU')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-white/70 backdrop-blur-md p-1.5 rounded-full border border-black/5 flex gap-1 shadow-sm">
               {['en', 'ru', 'hy'].map(l => (
                 <button 
                  key={l}
                  onClick={() => setLang(l as any)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${lang === l ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}
                 >
                   {l.toUpperCase()}
                 </button>
               ))}
            </div>
            
            {activeTab === 'browse' && (
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                <input 
                  type="text" 
                  placeholder="Найти проект..." 
                  className="bg-white/70 backdrop-blur-md border border-black/5 rounded-full pl-14 pr-8 py-4 text-sm outline-none w-80 shadow-sm focus:w-96 focus:bg-white focus:ring-8 focus:ring-black/5 transition-all font-medium"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            )}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'browse' && (
            <motion.div key="browse" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="flex-1 overflow-y-auto pr-4 space-y-8 custom-scrollbar">
              {filteredJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 bg-white/50 border border-black/5 rounded-[4rem] border-dashed">
                  <div className="w-20 h-20 bg-black/5 rounded-3xl flex items-center justify-center mb-6 opacity-20"><Search className="w-10 h-10" /></div>
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-gray-300">ПРОЕКТЫ НЕ НАЙДЕНЫ</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8 pb-10">
                  {filteredJobs.map(job => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      t={t} 
                      user={user} 
                      navigate={navigate}
                      hasApplied={proposals.some(p => p.jobId === job.id && p.freelancerId === user.id)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'my-work' && (
            <motion.div key="my-work" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 overflow-y-auto pr-4 space-y-8 custom-scrollbar pb-10">
              {user.role === 'client' && (
                <button 
                  onClick={() => setIsCreatingJob(true)}
                  className="w-full py-16 bg-white border border-black/5 border-dashed rounded-[4rem] flex flex-col items-center justify-center gap-6 hover:bg-black/5 transition-all group shadow-sm hover:shadow-xl duration-500"
                >
                  <div className="w-20 h-20 bg-black rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-all duration-500">
                    <PlusCircle className="w-10 h-10" />
                  </div>
                  <div className="text-center space-y-2">
                    <span className="text-sm font-black uppercase italic tracking-tighter">ОПУБЛИКОВАТЬ НОВЫЙ ПРОЕКТ</span>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Найдите лучших специалистов за считанные минуты</p>
                  </div>
                </button>
              )}
              
              {(user.role === 'client' ? myJobs : myBids).length === 0 && (
                 <div className="flex flex-col items-center justify-center py-32 bg-white/50 border border-black/5 rounded-[4rem] border-dashed opacity-50">
                    <Briefcase className="w-16 h-16 mb-6 text-gray-200" />
                    <p className="text-xs font-black uppercase tracking-[0.4em]">ЗДЕСЬ ПОКА ПУСТО</p>
                 </div>
              )}

              <div className="space-y-8">
                {(user.role === 'client' ? myJobs : myBids).map((item: any) => {
                  const targetJob = user.role === 'client' ? item : jobs.find(j => j.id === item.jobId);
                  return (
                    <div key={item.id} className="bg-white/80 backdrop-blur-md border border-black/5 rounded-[4rem] p-12 space-y-10 shadow-sm hover:shadow-2xl transition-all duration-700">
                       <div className="flex justify-between items-start">
                          <div className="space-y-6">
                            <div className="flex items-center gap-4">
                              <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${item.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-black text-white'}`}>
                                {user.role === 'client' ? (item.status === 'completed' ? 'ЗАВЕРШЕНО' : item.category) : 'ОТКЛИК ОТПРАВЛЕН'}
                              </span>
                              {item.status === 'in-progress' && <span className="px-5 py-2 bg-blue-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">В РАБОТЕ</span>}
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none group-hover:text-gradient transition-all cursor-pointer" onClick={() => navigate(`/job/${targetJob?.id}`)}>
                                {user.role === 'client' ? item.title : targetJob?.title}
                              </h3>
                              <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Zap className="w-3.5 h-3.5 text-blue-500" />
                                {user.role === 'client' ? `PROJECT ID: ${item.id.toUpperCase()}` : `ВАША СТАВКА: $${item.bid}`}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                             <p className="text-5xl font-black italic uppercase tracking-tighter leading-none">${user.role === 'client' ? item.budget : item.bid}</p>
                             <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mt-3">
                               {new Date(item.createdAt).toLocaleDateString()}
                             </p>
                          </div>
                       </div>

                       {user.role === 'client' && item.status === 'open' && (
                         <div className="pt-10 border-t border-black/5 flex flex-col gap-8">
                            <div className="flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center font-black text-[10px]">{proposals.filter(p => p.jobId === item.id).length}</div>
                                  <span className="text-[11px] font-black uppercase tracking-widest">ПОСТУПИВШИЕ ПРЕДЛОЖЕНИЯ</span>
                               </div>
                               <button 
                                 onClick={() => navigate(`/job/${item.id}`)}
                                 className="px-8 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                               >
                                 ОТКРЫТЬ УПРАВЛЕНИЕ
                               </button>
                            </div>
                         </div>
                       )}
                       
                       {item.status === 'in-progress' && (
                          <div className="pt-8 border-t border-black/5">
                             <button 
                               onClick={() => {
                                 setActiveChat(targetJob);
                                 setActiveTab('chats');
                               }}
                               className="w-full py-5 bg-zinc-50 hover:bg-black hover:text-white rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                             >
                                ПЕРЕЙТИ В РАБОЧИЙ ЧАТ <MessageSquare className="w-4 h-4" />
                             </button>
                          </div>
                       )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'chats' && (
            <motion.div key="chats" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="flex-1 flex gap-8 overflow-hidden">
               <div className="w-96 flex flex-col gap-6 overflow-y-auto pr-2 shrink-0 custom-scrollbar">
                  {activeChats.length === 0 ? (
                    <div className="p-16 text-center bg-white border border-black/5 rounded-[4rem] opacity-40 border-dashed">
                       <MessageSquare className="w-20 h-20 mx-auto mb-6 text-gray-200" />
                       <p className="text-[11px] font-black uppercase tracking-[0.3em]">АКТИВНЫХ ДИАЛОГОВ НЕТ</p>
                    </div>
                  ) : (
                    activeChats.map(chat => (
                      <button 
                        key={chat.id}
                        onClick={() => setActiveChat(chat)}
                        className={`p-10 bg-white border rounded-[3.5rem] transition-all flex flex-col gap-6 text-left group ${activeChat?.id === chat.id ? 'border-black shadow-2xl scale-[1.02]' : 'border-black/5 hover:border-black/20 hover:shadow-xl'}`}
                      >
                         <div className="flex justify-between items-start">
                            <span className="text-[9px] font-black uppercase tracking-widest px-4 py-1.5 bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/20">CHAT ACTIVE</span>
                            <span className="text-xl font-black italic uppercase tracking-tighter">${chat.budget}</span>
                         </div>
                         <h4 className="text-sm font-black uppercase italic leading-tight line-clamp-2">{chat.title}</h4>
                         <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-black text-[10px]">
                               {user.role === 'client' ? 'F' : 'C'}
                            </div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                              {user.role === 'client' ? `ИСПОЛНИТЕЛЬ В СЕТИ` : `ЗАКАЗЧИК ОЖИДАЕТ`}
                            </p>
                         </div>
                      </button>
                    ))
                  )}
               </div>

               <div className="flex-1 bg-white border border-black/5 rounded-[4.5rem] flex flex-col overflow-hidden shadow-2xl relative">
                  {activeChat ? (
                    <>
                      <div className="p-10 border-b border-black/5 flex items-center justify-between bg-zinc-50/50 backdrop-blur-md">
                         <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl rotate-3">
                               {user.role === 'client' ? 'F' : 'C'}
                            </div>
                            <div className="overflow-hidden">
                               <h3 className="text-lg font-black uppercase italic leading-none truncate max-w-sm">{activeChat.title}</h3>
                               <div className="flex items-center gap-2 mt-2">
                                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">ЗАЩИЩЕННЫЙ КАНАЛ СВЯЗИ</p>
                               </div>
                            </div>
                         </div>
                         <div className="flex gap-3">
                            {user.role === 'client' && (
                               <button 
                                 onClick={() => setIsRating(true)}
                                 className="px-6 py-3 bg-black text-white rounded-full hover:scale-105 transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl"
                               >
                                 <CheckCircle2 className="w-4 h-4 text-emerald-400" /> ПОДТВЕРДИТЬ ИТОГ
                               </button>
                            )}
                            <button className="p-3 bg-black/5 rounded-full hover:bg-black hover:text-white transition-all text-gray-400">
                               <Trash2 className="w-5 h-5" />
                            </button>
                         </div>
                      </div>

                      <div className="flex-1 p-12 overflow-y-auto bg-gray-50/30 flex flex-col gap-8 custom-scrollbar">
                         <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 opacity-20">
                            <Shield className="w-24 h-24 text-black" />
                            <div className="space-y-2">
                              <p className="text-[11px] font-black uppercase tracking-[0.4em] max-w-sm mx-auto">SAFE TRANSACTION ENABLED</p>
                              <p className="text-[9px] font-bold text-gray-400">Все платежи заблокированы до вашего подтверждения</p>
                            </div>
                         </div>
                         
                         {/* Mock Message */}
                         <div className="flex justify-start">
                            <div className="bg-white p-8 rounded-[2.5rem] rounded-tl-none max-w-lg shadow-sm border border-black/5 relative">
                               <p className="text-base font-medium text-gray-700 leading-relaxed">Здравствуйте! Проект изучен, готов предоставить первые наработки к завтрашнему утру.</p>
                               <p className="text-[9px] font-black uppercase text-gray-300 mt-4 tracking-widest">RECEIVED • 10:45 AM</p>
                            </div>
                         </div>
                      </div>

                      <div className="p-10 border-t border-black/5 bg-white">
                         <div className="relative group">
                            <input 
                              className="w-full py-6 pl-10 pr-32 bg-zinc-50 border border-black/5 rounded-[2.5rem] outline-none text-base focus:bg-white focus:ring-8 focus:ring-black/5 transition-all font-medium" 
                              placeholder="Напишите сообщение специалисту..." 
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-5 bg-black text-white rounded-[2rem] hover:scale-105 transition-all shadow-xl">
                              <Send className="w-6 h-6" />
                            </button>
                         </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-20">
                       <div className="w-32 h-32 bg-black/5 rounded-[3rem] flex items-center justify-center mb-10 rotate-12 opacity-20">
                          <MessageSquare className="w-16 h-16" />
                       </div>
                       <h3 className="text-3xl font-black uppercase italic tracking-tighter opacity-10">ВЫБЕРИТЕ ДИАЛОГ</h3>
                       <p className="text-[11px] font-black uppercase tracking-[0.5em] mt-4 opacity-10">ARM FREELANCE MESSENGER</p>
                    </div>
                  )}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Right Column (Mobile-style Profile Peek) */}
      {activeTab === 'browse' && (
        <aside className="w-96 space-y-8 shrink-0">
          <div className="bg-white rounded-[4rem] border border-black/5 p-12 space-y-12 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-48 h-48 bg-black/5 rounded-full -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-1000"></div>
             
             <div className="flex flex-col items-center text-center gap-6 relative z-10">
                <div className="relative">
                  <div className="w-32 h-32 bg-black rounded-[3rem] flex items-center justify-center text-white font-black text-5xl shadow-2xl rotate-6 group-hover:rotate-0 transition-all duration-700">
                    {user.fullName[0]}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl border-4 border-white">
                    <Check className="w-5 h-5" />
                  </div>
                </div>
                <div>
                   <h3 className="text-3xl font-black uppercase italic tracking-tighter text-gradient leading-none">{user.fullName}</h3>
                   <div className="flex items-center justify-center gap-2 mt-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-orange-400 fill-current" />)}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-30">{user.role.toUpperCase()} VERIFIED</span>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-8 pt-10 border-t border-black/5 relative z-10">
                <div className="space-y-1">
                   <p className="text-4xl font-black italic tracking-tighter leading-none">
                     {user.role === 'freelancer' ? `$${(user.rating || 5.0).toFixed(1)}` : (user.postedJobsCount || 0)}
                   </p>
                   <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] leading-none mt-2">
                     {user.role === 'freelancer' ? 'RATING' : 'POSTS'}
                   </p>
                </div>
                <div className="space-y-1">
                   <p className="text-4xl font-black italic tracking-tighter leading-none">{user.completedJobsCount || 0}</p>
                   <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] leading-none mt-2">PROJECTS</p>
                </div>
             </div>

             <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-end">
                  <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">TRUST LEVEL</span>
                  <span className="text-[11px] font-black uppercase italic">98%</span>
                </div>
                <div className="h-2.5 bg-black/5 rounded-full overflow-hidden">
                   <motion.div initial={{ width: 0 }} animate={{ width: '98%' }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-black"></motion.div>
                </div>
             </div>
             
             <button onClick={() => setActiveTab('settings')} className="w-full py-5 bg-zinc-50 hover:bg-black hover:text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all shadow-sm">
                MANAGE ACCOUNT
             </button>
          </div>

          <SupportWidget />
        </aside>
      )}

      {/* Create Job Modal */}
      <AnimatePresence>
        {isCreatingJob && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={() => setIsCreatingJob(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="bg-white rounded-[4.5rem] p-16 w-full max-w-3xl relative z-10 space-y-12 shadow-2xl overflow-hidden"
            >
               <div className="absolute top-8 right-8">
                  <button onClick={() => setIsCreatingJob(false)} className="p-5 bg-black/5 rounded-full hover:bg-black hover:text-white transition-all"><X className="w-6 h-6" /></button>
               </div>

               <div className="space-y-4">
                  <h3 className="text-6xl font-black uppercase italic tracking-tighter leading-none">НОВЫЙ ПРОЕКТ</h3>
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400">ЗАПОЛНИТЕ ДАННЫЕ ДЛЯ ПОИСКА ИСПОЛНИТЕЛЯ</p>
               </div>
               
               <form onSubmit={(e: any) => {
                 e.preventDefault();
                 addJob({
                   title: e.target.title.value,
                   description: e.target.desc.value,
                   budget: e.target.budget.value,
                   deadline: e.target.deadline.value,
                   type: 'fixed',
                   category: e.target.category.value,
                   clientId: user.id,
                   clientName: user.fullName
                 });
                 setIsCreatingJob(false);
               }} className="space-y-8">
                  <div className="space-y-3">
                     <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-6">НАЗВАНИЕ</label>
                     <input name="title" required className="input-capsule w-full py-6 text-lg" placeholder="Напр: Разработка Mobile App на React Native" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-6">КАТЕГОРИЯ</label>
                      <select name="category" className="input-capsule w-full py-6 appearance-none cursor-pointer">
                         <option>Web Development</option>
                         <option>Design</option>
                         <option>Mobile Apps</option>
                         <option>DevOps</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-6">СРОКИ</label>
                      <input name="deadline" required className="input-capsule w-full py-6" placeholder="Напр: 30 дней" />
                    </div>
                    <div className="space-y-3 col-span-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-6">БЮДЖЕТ ($)</label>
                      <input name="budget" required type="number" className="input-capsule w-full py-6 text-3xl font-black italic" placeholder="1000" />
                    </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-6">ТЗ И ПОДРОБНОСТИ</label>
                     <textarea name="desc" required rows={5} className="w-full bg-zinc-50 border border-black/5 rounded-[3rem] p-10 outline-none focus:bg-white focus:ring-8 focus:ring-black/5 transition-all text-base font-medium resize-none shadow-inner" placeholder="Опишите стек, требования и желаемый результат..."></textarea>
                  </div>
                  <button type="submit" className="w-full py-8 bg-black text-white rounded-[3rem] text-lg font-black uppercase tracking-widest hover:bg-emerald-500 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4">
                     ЗАПУСТИТЬ ПОИСК <ChevronRight className="w-8 h-8" />
                  </button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rating Modal */}
      <AnimatePresence>
        {isRating && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-3xl" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="bg-white rounded-[4rem] p-16 w-full max-w-xl relative z-10 text-center space-y-12 shadow-2xl overflow-hidden"
            >
               <div className="w-24 h-24 bg-black rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl rotate-6">
                  <Star className="w-12 h-12 text-orange-400 fill-current" />
               </div>
               <div className="space-y-4">
                  <h3 className="text-5xl font-black uppercase italic tracking-tighter leading-none">ОЦЕНИТЕ РАБОТУ</h3>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">ВАША ОЦЕНКА ВЛИЯЕТ НА РЕЙТИНГ СПЕЦИАЛИСТА</p>
               </div>
               
               <div className="flex justify-center gap-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button 
                      key={num}
                      onClick={() => setSelectedRating(num)}
                      className={`w-16 h-16 rounded-3xl flex items-center justify-center text-2xl font-black transition-all ${selectedRating >= num ? 'bg-black text-white shadow-2xl scale-110 rotate-3' : 'bg-zinc-100 text-gray-300 hover:bg-gray-200'}`}
                    >
                      {num}
                    </button>
                  ))}
               </div>

               <div className="pt-6 flex flex-col gap-6">
                  <button 
                    onClick={() => {
                      completeJob(activeChat.id, activeChat.selectedFreelancerId!, selectedRating);
                      setIsRating(false);
                      setActiveChat(null);
                    }}
                    className="w-full py-8 bg-black text-white rounded-[2.5rem] text-lg font-black uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-2xl"
                  >
                    ЗАВЕРШИТЬ СДЕЛКУ
                  </button>
                  <button onClick={() => setIsRating(false)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all">ВЕРНУТЬСЯ В ЧАТ</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const SidebarItem = ({ active, icon: Icon, onClick, label }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-6 px-8 py-5 rounded-[2rem] transition-all group ${active ? 'bg-black text-white shadow-2xl scale-[1.05] rotate-1' : 'text-gray-400 hover:text-black hover:bg-black/5'}`}>
    <Icon className={`w-6 h-6 ${active ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{label}</span>
  </button>
)

const JobCard = ({ job, t, user, hasApplied, navigate }: any) => (
  <div className="bg-white/70 backdrop-blur-md rounded-[4rem] border border-black/5 p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 hover:shadow-2xl hover:scale-[1.01] transition-all duration-700 group cursor-pointer" onClick={() => navigate(`/job/${job.id}`)}>
    <div className="space-y-8 flex-1">
      <div className="flex items-center gap-4">
        <span className="px-5 py-2 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-black/10">{job.category}</span>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">
           <Zap className="w-3 h-3 fill-current" /> FAST RESPONSE
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-5xl font-black uppercase italic tracking-tighter leading-none group-hover:text-gradient transition-all">{job.title}</h3>
        <p className="text-gray-500 text-base font-medium max-w-3xl line-clamp-2 leading-relaxed italic">"{job.description}"</p>
      </div>
      <div className="pt-6 flex items-center gap-10 border-t border-black/5">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-black/5 rounded-2xl flex items-center justify-center font-black text-xs shadow-inner">
             {job.clientName?.[0] || 'C'}
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{job.clientName || 'ELITE CLIENT'}</span>
        </div>
        <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
           <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> JUST NOW</span>
           <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> {job.proposalsCount} BIDS</span>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-end gap-6 shrink-0">
       <div className="text-right">
          <p className="text-6xl font-black italic tracking-tighter leading-none">${job.budget}</p>
          <p className="text-[11px] font-black uppercase text-gray-300 tracking-[0.3em] mt-3">{job.type === 'fixed' ? 'ESTIMATED BUDGET' : 'HOURLY RATE'}</p>
       </div>
       {user.role === 'freelancer' && (
         <button 
           className={`px-10 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all shadow-2xl flex items-center gap-3 ${hasApplied ? 'bg-zinc-100 text-gray-400 cursor-not-allowed shadow-none' : 'bg-black text-white hover:scale-105 hover:bg-emerald-500'}`}
         >
           {hasApplied ? 'APPLIED' : 'ОТКЛИКНУТЬСЯ'} <ArrowUpRight className="w-5 h-5" />
         </button>
       )}
    </div>
  </div>
)

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-24 right-0 bg-black rounded-[3.5rem] p-10 text-white w-96 shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full z-20 transition-all"><X className="w-5 h-5" /></button>
            
            <div className="space-y-8 relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md"><Zap className="w-8 h-8 text-orange-400 fill-current" /></div>
              <div className="space-y-3">
                <h3 className="font-black uppercase italic text-3xl tracking-tighter leading-none">HELP CENTER</h3>
                <p className="text-xs font-medium text-white/50 leading-relaxed uppercase tracking-widest">Premium support for elite Armenian developers.</p>
              </div>
              <div className="pt-8 border-t border-white/10 space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 text-center">DIRECT ACCESS</p>
                 <a href="https://t.me/Markosya_77" target="_blank" rel="noreferrer" className="flex items-center justify-between p-6 bg-white/5 rounded-[2rem] hover:bg-white/10 transition-all group">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-[#229ED9] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all"><Send className="w-6 h-6 fill-current text-white" /></div>
                       <div><p className="font-black uppercase italic text-white text-lg leading-none">Telegram</p><p className="text-[10px] text-white/40 mt-2">@Markosya_77</p></div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-white/20 group-hover:text-white transition-all" />
                 </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 border border-black/5 hover:scale-110 active:scale-95 ${isOpen ? 'bg-white text-black rotate-90' : 'bg-black text-white'}`}>
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
      </button>
    </div>
  )
}

const BackgroundAnimation = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 bg-[#fcfcfc] overflow-hidden">
    {[...Array(25)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ x: Math.random() * 100 + 'vw', y: Math.random() * 100 + 'vh', scale: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.04 + 0.01 }}
        animate={{ 
          x: [Math.random() * 100 + 'vw', Math.random() * 100 + 'vw', Math.random() * 100 + 'vw'], 
          y: [Math.random() * 100 + 'vh', Math.random() * 100 + 'vh', Math.random() * 100 + 'vh'],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: Math.random() * 60 + 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-96 h-96 bg-black rounded-[5rem] blur-[120px]"
      />
    ))}
  </div>
)

