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
  ChevronRight
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
    <div className="min-h-screen bg-[#f3f4f6] flex p-4 gap-4 font-sans text-black">
      <BackgroundAnimation />
      
      {/* Sidebar */}
      <aside className="w-64 bg-white rounded-[3.5rem] border-2 border-black flex flex-col p-6 py-10 shadow-sm shrink-0 h-fit sticky top-4">
        <div className="mb-16">
          <Link to="/" className="px-4 flex items-center gap-3 group">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-all">
              <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
            </div>
            <span className="font-black text-xl tracking-tighter uppercase italic">ARM Freelance</span>
          </Link>
        </div>

        <nav className="space-y-3 mb-20">
          <SidebarItem active={activeTab === 'browse'} icon={LayoutGrid} onClick={() => setActiveTab('browse')} label="БИРЖА" />
          <SidebarItem 
            active={activeTab === 'my-work'} 
            icon={Briefcase} 
            onClick={() => setActiveTab('my-work')} 
            label={user.role === 'client' ? "МОИ ЗАКАЗЫ" : "МОИ ОТКЛИКИ"} 
          />
          <SidebarItem active={activeTab === 'chats'} icon={MessageSquare} onClick={() => setActiveTab('chats')} label="ЧАТЫ" />
          <SidebarItem active={activeTab === 'settings'} icon={Settings} onClick={() => setActiveTab('settings')} label="НАСТРОЙКИ" />
        </nav>

        <div className="flex flex-col gap-4">
          <div className="p-4 bg-black/5 rounded-[2rem] flex items-center gap-4">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-black text-sm">
              {user.fullName[0]}
            </div>
            <div className="overflow-hidden">
               <p className="text-[10px] font-black uppercase italic truncate">{user.fullName}</p>
               <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{user.role}</p>
            </div>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-4 px-6 py-4 text-gray-400 hover:text-black transition-colors rounded-2xl hover:bg-black/5">
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">ВЫХОД</span>
          </button>
        </div>
      </aside>

      <SupportWidget />

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
              {activeTab === 'browse' ? "БИРЖА IT-ПРОЕКТОВ" : 
               activeTab === 'my-work' ? (user.role === 'client' ? "УПРАВЛЕНИЕ ЗАКАЗАМИ" : "ВАШИ ОТКЛИКИ") :
               activeTab === 'chats' ? "ВАШИ ДИАЛОГИ" : "НАСТРОЙКИ"}
            </h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              {user.role === 'client' ? 'ПАНЕЛЬ ЗАКАЗЧИКА' : 'ПАНЕЛЬ ФРИЛАНСЕРА'} • {new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/50 p-1 rounded-full border-2 border-black flex gap-1">
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
            <Link to="/" className="px-6 py-2 bg-white rounded-full border-2 border-black text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm">
               ГЛАВНАЯ
            </Link>
            {activeTab === 'browse' && (
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Поиск IT-проектов..." 
                  className="bg-white border-2 border-black rounded-full pl-12 pr-6 py-2.5 text-sm outline-none w-64 shadow-sm focus:bg-gray-50 transition-all"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            )}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'browse' && (
            <motion.div key="browse" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex-1 overflow-y-auto pr-2 space-y-6">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-20 bg-white border-2 border-black rounded-[3rem] opacity-50">
                  <p className="text-xs font-black uppercase tracking-widest">ПРОЕКТЫ НЕ НАЙДЕНЫ</p>
                </div>
              ) : (
                filteredJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    t={t} 
                    user={user} 
                    applyToJob={applyToJob} 
                    hasApplied={proposals.some(p => p.jobId === job.id && p.freelancerId === user.id)}
                  />
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'my-work' && (
            <motion.div key="my-work" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex-1 overflow-y-auto pr-2 space-y-6">
              {user.role === 'client' && (
                <button 
                  onClick={() => setIsCreatingJob(true)}
                  className="w-full py-10 bg-white border-2 border-black border-dashed rounded-[3rem] flex flex-col items-center justify-center gap-4 hover:bg-black/5 transition-all group"
                >
                  <PlusCircle className="w-12 h-12 text-gray-300 group-hover:text-black transition-colors" />
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-black">ОПУБЛИКОВАТЬ НОВЫЙ ПРОЕКТ</span>
                </button>
              )}
              
              {(user.role === 'client' ? myJobs : myBids).length === 0 && (
                 <div className="text-center py-20 bg-white border-2 border-black rounded-[3rem] opacity-50">
                   <p className="text-xs font-black uppercase tracking-widest">ЗДЕСЬ ПОКА ПУСТО</p>
                 </div>
              )}

              {(user.role === 'client' ? myJobs : myBids).map((item: any) => (
                <div key={item.id} className="bg-white border-2 border-black rounded-[3rem] p-10 space-y-8">
                   <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${item.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-black text-white'}`}>
                            {user.role === 'client' ? (item.status === 'completed' ? 'ЗАВЕРШЕНО' : item.category) : 'ОТКЛИК ОТПРАВЛЕН'}
                          </span>
                          {item.status === 'in-progress' && <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-[8px] font-black uppercase tracking-widest">В РАБОТЕ</span>}
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-tight">
                          {user.role === 'client' ? item.title : jobs.find(j => j.id === item.jobId)?.title}
                        </h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          {user.role === 'client' ? `ID: ${item.id.toUpperCase()}` : `ВАША СТАВКА: $${item.bid}`}
                        </p>
                      </div>
                      <div className="text-right">
                         <p className="text-3xl font-black italic tracking-tighter">${user.role === 'client' ? item.budget : item.bid}</p>
                         <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
                           {new Date(item.createdAt).toLocaleDateString()}
                         </p>
                      </div>
                   </div>

                   {user.role === 'client' && item.status === 'open' && proposals.filter(p => p.jobId === item.id).length > 0 && (
                     <div className="pt-6 border-t border-black/5">
                        <button 
                          onClick={() => setExpandedProposals(prev => ({...prev, [item.id]: !prev[item.id]}))}
                          className="px-6 py-2 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg"
                        >
                          {expandedProposals[item.id] ? 'СКРЫТЬ ОТКЛИКИ' : 'ОТКЛИКИ'}
                        </button>
                        
                        {expandedProposals[item.id] && (
                           <div className="grid grid-cols-1 gap-4 mt-6">
                             {proposals.filter(p => p.jobId === item.id).map(p => (
                               <div key={p.id} className="flex items-center justify-between p-6 bg-black/5 rounded-[2rem] hover:bg-black/10 transition-all">
                                  <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-black text-sm">{p.freelancerName[0]}</div>
                                     <div>
                                        <p className="text-xs font-black uppercase italic">{p.freelancerName}</p>
                                        <p className="text-[10px] text-gray-400 font-medium line-clamp-1">{p.coverLetter}</p>
                                     </div>
                                  </div>
                                  <button 
                                    onClick={() => {
                                      hireSpecialist(item.id, p.freelancerId);
                                      setActiveTab('chats');
                                    }}
                                    className="px-6 py-2 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg"
                                  >
                                    ВЫБРАТЬ И ОТКРЫТЬ ЧАТ
                                  </button>
                               </div>
                             ))}
                           </div>
                        )}
                     </div>
                   )}
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'chats' && (
            <motion.div key="chats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex-1 flex gap-6 overflow-hidden">
               <div className="w-80 flex flex-col gap-4 overflow-y-auto pr-2 shrink-0">
                  {activeChats.length === 0 ? (
                    <div className="p-10 text-center bg-white border-2 border-black rounded-[3rem] opacity-50">
                       <MessageSquare className="w-12 h-12 mx-auto mb-4" />
                       <p className="text-[10px] font-black uppercase tracking-widest">АКТИВНЫХ ЧАТОВ НЕТ</p>
                    </div>
                  ) : (
                    activeChats.map(chat => (
                      <button 
                        key={chat.id}
                        onClick={() => setActiveChat(chat)}
                        className={`p-6 bg-white border-2 rounded-[2.5rem] transition-all flex flex-col gap-3 text-left ${activeChat?.id === chat.id ? 'border-black shadow-xl scale-[1.02]' : 'border-black/5 hover:border-black'}`}
                      >
                         <div className="flex justify-between items-start">
                            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-emerald-500 text-white rounded-full">IN PROGRESS</span>
                            <span className="text-[9px] font-black italic">${chat.budget}</span>
                         </div>
                         <h4 className="text-xs font-black uppercase italic leading-tight line-clamp-2">{chat.title}</h4>
                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                           {user.role === 'client' ? `ИСПОЛНИТЕЛЬ: ${proposals.find(p => p.jobId === chat.id && p.freelancerId === chat.selectedFreelancerId)?.freelancerName}` : `ЗАКАЗЧИК: ${chat.clientName}`}
                         </p>
                      </button>
                    ))
                  )}
               </div>

               <div className="flex-1 bg-white border-2 border-black rounded-[3.5rem] flex flex-col overflow-hidden shadow-sm">
                  {activeChat ? (
                    <>
                      <div className="p-8 border-b border-black/5 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-black text-sm">
                               {user.role === 'client' ? 'F' : 'C'}
                            </div>
                            <div className="overflow-hidden max-w-md">
                               <h3 className="text-sm font-black uppercase italic leading-none truncate">{activeChat.title}</h3>
                               <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">БЕЗОПАСНАЯ СДЕЛКА • ОТКРЫТО</p>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            {user.role === 'client' && (
                               <button 
                                 onClick={() => setIsRating(true)}
                                 className="px-3 py-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all text-[9px] font-black uppercase flex items-center gap-1"
                               >
                                 <Check className="w-3 h-3" /> ПОДТВЕРДИТЬ
                               </button>
                            )}
                            <button className="px-3 py-2 bg-black/5 rounded-xl hover:bg-black hover:text-white transition-all text-[9px] font-black uppercase flex items-center gap-1">
                               <Ban className="w-3 h-3" /> ЗАБЛОКИРОВАТЬ
                            </button>
                            <button className="px-3 py-2 bg-black/5 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all text-[9px] font-black uppercase flex items-center gap-1">
                               <Trash2 className="w-3 h-3" /> УДАЛИТЬ ЧАТ
                            </button>
                         </div>
                      </div>

                      <div className="flex-1 p-8 overflow-y-auto bg-gray-50/50 flex flex-col gap-6">
                         <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-30">
                            <Shield className="w-16 h-16" />
                            <p className="text-[10px] font-black uppercase tracking-widest max-w-xs">ОБЩАЙТЕСЬ ВНУТРИ ПЛАТФОРМЫ ДЛЯ ГАРАНТИИ БЕЗОПАСНОСТИ.</p>
                         </div>
                         <div className="flex justify-start">
                            <div className="bg-white border border-black/5 p-4 rounded-[1.5rem] max-w-sm">
                               <p className="text-xs font-medium">Здравствуйте! Я готов приступить к работе. Когда сможем обсудить детали?</p>
                               <p className="text-[8px] font-black uppercase text-gray-300 mt-2">10:45 AM</p>
                            </div>
                         </div>
                      </div>

                      <div className="p-8 border-t border-black/5 bg-white">
                         <div className="relative">
                            <input 
                              className="w-full py-4 pl-6 pr-20 bg-gray-50 border-2 border-black/5 rounded-2xl outline-none text-sm focus:border-black transition-all" 
                              placeholder="Напишите сообщение..." 
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-xl hover:bg-blue-600 transition-colors">
                              <Send className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-20 opacity-20">
                       <MessageSquare className="w-32 h-32 mb-8" />
                       <h3 className="text-xl font-black uppercase italic">ВЫБЕРИТЕ ЧАТ ДЛЯ ОБЩЕНИЯ</h3>
                       <p className="text-[10px] font-black uppercase tracking-widest mt-2">ЗДЕСЬ БУДЕТ ВАША ПЕРЕПИСКА</p>
                    </div>
                  )}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Right Column */}
      <aside className="w-80 space-y-6 shrink-0">
        <div className="bg-white rounded-[3rem] border-2 border-black p-8 space-y-10 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-16 -mt-16"></div>
           <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white font-black text-2xl">
                 {user.fullName[0]}
              </div>
              <div>
                 <h3 className="font-black uppercase italic text-sm truncate max-w-[150px]">{user.fullName}</h3>
                 <div className="flex items-center gap-1 text-emerald-500">
                    <CheckCircle2 className="w-3 h-3" />
                    <span className="text-[8px] font-black uppercase tracking-widest">ПОДТВЕРЖДЕННЫЙ {user.role.toUpperCase()}</span>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-8 relative z-10">
              <div>
                 <p className="text-2xl font-black italic tracking-tighter">
                   {user.role === 'freelancer' ? `$${(user.rating || 5.0).toFixed(1)}` : (user.postedJobsCount || 0)}
                 </p>
                 <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-none mt-1">
                   {user.role === 'freelancer' ? 'РЕЙТИНГ' : 'ЗАКАЗОВ'}
                 </p>
              </div>
              <div>
                 <p className="text-2xl font-black italic tracking-tighter">{user.completedJobsCount || 0}</p>
                 <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-none mt-1">ЗАВЕРШЕНО</p>
              </div>
           </div>

           <div className="space-y-2 relative z-10">
              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                 <span className="text-gray-400">РЕЙТИНГ ПЛАТФОРМЫ</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[9px] font-black uppercase">УРОВЕНЬ ДОВЕРИЯ</span>
                <span className="text-[9px] font-black uppercase italic">98%</span>
              </div>
              <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                 <div className="h-full bg-black w-[98%]"></div>
              </div>
           </div>
        </div>

        <SupportWidget />
      </aside>

      {/* Create Job Modal */}
      {isCreatingJob && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCreatingJob(false)} />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white border-2 border-black rounded-[3.5rem] p-10 w-full max-w-xl relative z-10 space-y-8"
          >
             <div className="flex justify-between items-center">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">НОВЫЙ ЗАКАЗ</h3>
                <button onClick={() => setIsCreatingJob(false)} className="p-3 bg-black/5 rounded-2xl hover:bg-black hover:text-white transition-all"><X className="w-5 h-5" /></button>
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
             }} className="space-y-6">
                <div className="space-y-1">
                   <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-4">НАЗВАНИЕ ПРОЕКТА</label>
                   <input name="title" required className="input-capsule w-full bg-gray-50 border-black/5 focus:border-black" placeholder="Напр: Разработка лендинга на React" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-4">КАТЕГОРИЯ</label>
                    <select name="category" className="input-capsule w-full bg-gray-50 border-black/5 focus:border-black appearance-none">
                       <option>Web Development</option>
                       <option>Design</option>
                       <option>Mobile Apps</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-4">СРОКИ (НАПР: 2 НЕДЕЛИ)</label>
                    <input name="deadline" required className="input-capsule w-full bg-gray-50 border-black/5 focus:border-black" placeholder="Напр: 14 дней" />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-4">БЮДЖЕТ ($)</label>
                    <input name="budget" required type="number" className="input-capsule w-full bg-gray-50 border-black/5 focus:border-black" placeholder="500" />
                  </div>
                </div>
                <div className="space-y-1">
                   <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-4">ОПИСАНИЕ ЗАДАЧИ</label>
                   <textarea name="desc" required rows={4} className="input-capsule w-full bg-gray-50 border-black/5 focus:border-black rounded-3xl p-6 resize-none" placeholder="Подробно опишите требования..."></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-black text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl flex items-center justify-center gap-3">
                   ОПУБЛИКОВАТЬ ЗАКАЗ <ChevronRight className="w-5 h-5" />
                </button>
             </form>
          </motion.div>
        </div>
      )}

      {/* Rating Modal */}
      {isRating && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border-2 border-black rounded-[3.5rem] p-12 w-full max-w-md relative z-10 text-center space-y-8"
          >
             <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-10 h-10 fill-current" />
             </div>
             <div className="space-y-2">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">ОЦЕНИТЕ РАБОТУ</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ВАША ОЦЕНКА ОЧЕНЬ ВАЖНА ДЛЯ ФРИЛАНСЕРА</p>
             </div>
             
             <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button 
                    key={num}
                    onClick={() => setSelectedRating(num)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black transition-all ${selectedRating >= num ? 'bg-black text-white shadow-lg scale-110' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                  >
                    {num}
                  </button>
                ))}
             </div>

             <div className="pt-4 flex flex-col gap-3">
                <button 
                  onClick={() => {
                    completeJob(activeChat.id, activeChat.selectedFreelancerId!, selectedRating);
                    setIsRating(false);
                    setActiveChat(null);
                  }}
                  className="w-full py-5 bg-black text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl"
                >
                  ЗАВЕРШИТЬ И ПОСТАВИТЬ {selectedRating}
                </button>
                <button onClick={() => setIsRating(false)} className="text-[10px] font-black uppercase text-gray-400 hover:text-black transition-colors">ОТМЕНА</button>
             </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-[#5c56ff] rounded-[2.5rem] p-8 text-white w-80 shadow-2xl relative overflow-hidden group mb-4 border-2 border-black"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full z-20"><X className="w-4 h-4" /></button>
            <div className="w-10 h-10 bg-black/20 rounded-xl flex items-center justify-center relative z-10 mb-6"><Star className="w-5 h-5 fill-current" /></div>
            <div className="space-y-4 relative z-10">
              <h3 className="font-black uppercase italic text-xl leading-tight">ПОМОЧЬ С ВЫБОРОМ</h3>
              <p className="text-[11px] font-medium text-white leading-relaxed">Не уверены, какой специалист нужен? Получите бесплатную консультацию.</p>
              <button className="w-full py-4 bg-white text-[#5c56ff] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">ЗАПРОСИТЬ</button>
              <div className="pt-6 border-t border-white/10 space-y-3 text-[9px] text-white/50">
                 <p className="font-black uppercase tracking-widest">Связаться напрямую:</p>
                 <div className="flex flex-col gap-2">
                    <a href="https://t.me/Markosya_77" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10">
                       <div className="w-8 h-8 bg-[#229ED9] rounded-lg flex items-center justify-center"><Send className="w-4 h-4 fill-current" /></div>
                       <div><p className="font-black uppercase italic text-white">Telegram</p><p>@Markosya_77</p></div>
                    </a>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all border-2 border-black ${isOpen ? 'bg-white text-[#5c56ff] rotate-90' : 'bg-[#5c56ff] text-white'}`}><MessageSquare className="w-7 h-7" /></button>
    </div>
  )
}

const SidebarItem = ({ active, icon: Icon, onClick, label }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${active ? 'bg-black text-white shadow-xl scale-[1.02]' : 'text-gray-400 hover:text-black hover:bg-black/5'}`}>
    <Icon className="w-5 h-5" />
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
)

const JobCard = ({ job, t, user, applyToJob, hasApplied }: any) => (
  <div className="bg-white rounded-[3rem] border-2 border-black p-10 flex justify-between items-start hover:shadow-xl transition-all group">
    <div className="space-y-4 flex-1">
      <div className="flex items-center gap-3"><span className="px-3 py-1 bg-black/5 rounded-full text-[8px] font-black uppercase tracking-widest text-blue-600">{job.category}</span></div>
      <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none group-hover:text-blue-600 transition-colors">{job.title}</h3>
      <p className="text-gray-400 text-xs font-medium max-w-2xl line-clamp-2">{job.description}</p>
      <div className="pt-4 flex items-center gap-8">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] font-black">A</div>
           <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{job.clientName?.toUpperCase() || 'CLIENT'}</span>
        </div>
        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
           <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> New</span>
           <span className="flex items-center gap-1.5"><Send className="w-3.5 h-3.5" /> {job.proposalsCount} bids</span>
        </div>
      </div>
    </div>
    <div className="text-right space-y-1">
       <p className="text-4xl font-black italic tracking-tighter">${job.budget}</p>
       <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest">{job.type === 'fixed' ? 'FIXED' : 'HOURLY'}</p>
       {user.role === 'freelancer' && (
         <button 
           onClick={() => !hasApplied && applyToJob({ jobId: job.id, freelancerId: user.id, freelancerName: user.fullName, bid: job.budget, coverLetter: "Готов приступить к работе!" })}
           disabled={hasApplied}
           className={`mt-6 px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all shadow-lg ${hasApplied ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-blue-600'}`}
         >
           {hasApplied ? 'ОТКЛИК ОТПРАВЛЕН' : 'ОТКЛИКНУТЬСЯ'}
         </button>
       )}
    </div>
  </div>
)

const BackgroundAnimation = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 bg-[#f3f4f6] overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ x: Math.random() * 100 + 'vw', y: Math.random() * 100 + 'vh', scale: Math.random() * 0.5 + 0.5, opacity: Math.random() * 0.05 + 0.02 }}
        animate={{ x: [Math.random() * 100 + 'vw', Math.random() * 100 + 'vw', Math.random() * 100 + 'vw'], y: [Math.random() * 100 + 'vh', Math.random() * 100 + 'vh', Math.random() * 100 + 'vh'] }}
        transition={{ duration: Math.random() * 40 + 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-64 h-64 bg-black rounded-full blur-3xl"
      />
    ))}
  </div>
)
