import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Search, 
  LayoutGrid, 
  Briefcase, 
  Settings, 
  LogOut,
  Plus,
  Star,
  CheckCircle2,
  Clock,
  Send,
  Github,
  MoreVertical,
  PlusCircle,
  X,
  ArrowRight,
  Layers,
  MessageSquare,
  ShieldCheck,
  Check,
  Trash2,
  Slash
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

export const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout, jobs, proposals, specialists, applyToJob, hireSpecialist, completeJob, addJob } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<'browse' | 'my-work' | 'chats' | 'settings'>('browse');
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null); // For viewing responses
  const [activeChat, setActiveChat] = useState<any>(null);
  
  const [newJob, setNewJob] = useState({ title: '', description: '', budget: '', category: 'Web Development', type: 'fixed' as const });
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'jobs' | 'specialists'>(user?.role === 'client' ? 'specialists' : 'jobs');

  if (!user) return null;

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSpecialists = specialists.filter(s => 
    s.fullName.toLowerCase().includes(search.toLowerCase()) || 
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const myProposals = proposals.filter(p => p.freelancerId === user?.id);
  const myJobs = jobs.filter(j => j.clientId === user?.id);
  const myChats = proposals.filter(p => p.status === 'accepted' && (p.freelancerId === user.id || jobs.find(j => j.id === p.jobId)?.clientId === user.id));

  return (
    <div className="app-container text-black bg-white">
      <BackgroundAnimation />
      
      {/* Sidebar */}
      <aside className="glass-panel rounded-[2.5rem] p-8 flex flex-col items-center bg-white shadow-xl">
        <Link to="/" className="flex items-center gap-3 mb-16 self-start px-2 group">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:scale-110 transition-all">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
          </div>
          <span className="font-bold text-lg tracking-tight">AF</span>
        </Link>

        <nav className="flex-1 w-full space-y-4">
          <SidebarItem active={activeTab === 'browse'} icon={LayoutGrid} onClick={() => setActiveTab('browse')} label={user.role === 'client' ? t('find_talent') : t('browse_projects')} />
          <SidebarItem active={activeTab === 'my-work'} icon={Briefcase} onClick={() => setActiveTab('my-work')} label={user.role === 'client' ? t('my_projects') : "My Bids"} />
          <SidebarItem active={activeTab === 'chats'} icon={MessageSquare} onClick={() => setActiveTab('chats')} label={t('chats')} count={myChats.length} />
          
          {user?.role === 'client' && (
            <button 
              onClick={() => setShowPostModal(true)}
              className="w-full flex flex-col items-center gap-1 p-4 rounded-3xl transition-all text-black hover:bg-black hover:text-white mt-4 border-2 border-dashed border-black/10"
            >
              <PlusCircle className="w-7 h-7" />
              <span className="text-[10px] font-black uppercase tracking-widest">{t('create_ad')}</span>
            </button>
          )}

          <SidebarItem active={activeTab === 'settings'} icon={Settings} onClick={() => setActiveTab('settings')} label="Settings" />
        </nav>

        <div className="mt-auto pt-8 border-t border-black/5 w-full flex flex-col items-center gap-6">
          <Link to="/profile" className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-white font-black text-xl shadow-xl">
            {user?.fullName?.[0]}
          </Link>
          <button onClick={logout} className="p-3 text-gray-400 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-black">
              {activeTab === 'browse' ? (user?.role === 'client' ? t('find_talent') : t('browse_projects')) : activeTab === 'my-work' ? t('my_projects') : activeTab === 'chats' ? t('chats') : t('settings')}
            </h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {user?.role === 'client' ? t('client') : t('freelancer')} • {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="input-capsule pl-14 w-80 shadow-sm bg-white"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="dashboard-grid">
          <div className="space-y-8">
            {activeTab === 'browse' && (
              <div className="grid grid-cols-1 gap-6">
                {filterType === 'jobs' ? (
                  filteredJobs.map(job => <JobCard key={job.id} job={job} onApply={(p: any) => applyToJob(p)} user={user} />)
                ) : (
                  filteredSpecialists.map(spec => <SpecialistCard key={spec.id} spec={spec} />)
                )}
              </div>
            )}

            {activeTab === 'my-work' && (
              <div className="space-y-12">
                <div className="space-y-6">
                   <h2 className="text-2xl font-black uppercase italic tracking-tighter">{user.role === 'client' ? t('my_projects') : "My Applications"}</h2>
                   <div className="grid grid-cols-1 gap-6">
                     {user.role === 'client' ? (
                       myJobs.map(job => <MyJobCard key={job.id} job={job} onViewResponses={() => setSelectedJob(job)} />)
                     ) : (
                       myProposals.map(prop => <ProposalCard key={prop.id} proposal={prop} job={jobs.find(j => j.id === prop.jobId)} />)
                     )}
                   </div>
                </div>

                {selectedJob && (
                  <div className="space-y-6 pt-12 border-t border-black/5">
                     <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter">{t('responses')} for: {selectedJob.title}</h2>
                        <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-black/5 rounded-full"><X className="w-5 h-5" /></button>
                     </div>
                     <div className="grid grid-cols-1 gap-6">
                        {proposals.filter(p => p.jobId === selectedJob.id).map(p => (
                          <ResponseCard key={p.id} proposal={p} onHire={() => {
                            hireSpecialist(selectedJob.id, p.freelancerId);
                            setActiveTab('chats');
                            setSelectedJob(null);
                          }} />
                        ))}
                     </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'chats' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full min-h-[600px]">
                <div className="md:col-span-1 glass-panel rounded-[2.5rem] p-6 bg-white space-y-4">
                   <h3 className="text-xl font-black uppercase italic">{t('chats')}</h3>
                   <div className="space-y-2">
                      {myChats.map(chat => (
                        <button key={chat.id} onClick={() => setActiveChat(chat)} className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${activeChat?.id === chat.id ? 'bg-black text-white shadow-xl' : 'hover:bg-black/5'}`}>
                           <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center font-bold">
                              {chat.freelancerName[0]}
                           </div>
                           <div className="text-left">
                              <p className="text-xs font-black uppercase italic">{chat.freelancerName}</p>
                              <p className="text-[9px] opacity-60 uppercase font-bold">{jobs.find(j => j.id === chat.jobId)?.title}</p>
                           </div>
                        </button>
                      ))}
                   </div>
                </div>
                <div className="md:col-span-2 glass-panel rounded-[2.5rem] p-8 bg-white flex flex-col">
                   {activeChat ? (
                     <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between pb-6 border-b border-black/5">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white font-black text-xl">
                                 {activeChat.freelancerName[0]}
                              </div>
                              <div>
                                 <h3 className="font-black uppercase italic">{activeChat.freelancerName}</h3>
                                 <p className="text-[10px] font-black uppercase text-gray-400">Project: {jobs.find(j => j.id === activeChat.jobId)?.title}</p>
                              </div>
                           </div>
                           {user.role === 'client' && (
                             <button 
                               onClick={() => {
                                 completeJob(activeChat.jobId, activeChat.freelancerId, 5);
                                 setActiveChat(null);
                               }}
                               className="px-6 py-2 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase hover:bg-emerald-600 transition-all flex items-center gap-2"
                             >
                               <Check className="w-4 h-4" /> Confirm Order
                             </button>
                           )}
                        </div>
                        <div className="flex-1 p-8 flex flex-col justify-center items-center text-gray-300 space-y-4">
                           <MessageSquare className="w-12 h-12 opacity-20" />
                           <p className="text-xs font-bold uppercase tracking-[0.2em]">Secure Chat Session Active</p>
                        </div>
                        <div className="pt-6 border-t border-black/5 flex gap-2">
                           <button className="p-4 hover:bg-black/5 rounded-2xl transition-all text-gray-400"><Slash className="w-5 h-5" /></button>
                           <button className="p-4 hover:bg-black/5 rounded-2xl transition-all text-gray-400"><Trash2 className="w-5 h-5" /></button>
                           <input type="text" placeholder="Type a message..." className="flex-1 bg-black/5 rounded-2xl px-6 outline-none font-medium" />
                           <button className="p-4 bg-black text-white rounded-2xl hover:scale-105 transition-all"><Send className="w-5 h-5" /></button>
                        </div>
                     </div>
                   ) : (
                     <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-4">
                        <MessageSquare className="w-16 h-16 opacity-10" />
                        <p className="text-xs font-black uppercase tracking-widest">Select a chat to begin</p>
                     </div>
                   )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Stats */}
          <div className="space-y-6">
            <div className="glass-panel rounded-[2.5rem] p-8 space-y-8 bg-white shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-3xl bg-black flex items-center justify-center text-white font-black text-2xl shadow-lg">
                  {user?.fullName?.[0]}
                </div>
                <div>
                  <h3 className="font-black uppercase italic">{user?.fullName}</h3>
                  <div className="flex items-center gap-1 text-emerald-500">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-xs font-black uppercase tracking-widest">{t('verified_user')}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatBox label={user?.role === 'client' ? t('total_users') : "Rating"} value={user?.role === 'client' ? "452" : (user.rating || 5.0).toFixed(1)} />
                <StatBox label="Success" value="100%" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Post Modal */}
      <AnimatePresence>
        {showPostModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPostModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-xl bg-white rounded-[3rem] p-10 shadow-2xl space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter">{t('create_ad')}</h2>
                <button onClick={() => setShowPostModal(false)} className="p-2 hover:bg-black/5 rounded-full"><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-6">
                 <input className="input-capsule w-full" placeholder="Project Title" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
                 <textarea rows={4} className="input-capsule w-full rounded-3xl py-4 resize-none" placeholder="Description, Stack, Deadlines..." value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})}></textarea>
                 <div className="grid grid-cols-2 gap-4">
                    <input className="input-capsule w-full" placeholder="Budget ($)" value={newJob.budget} onChange={e => setNewJob({...newJob, budget: e.target.value})} />
                    <select className="input-capsule w-full appearance-none" value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value as any})}>
                       <option value="fixed">Fixed Price</option>
                       <option value="hourly">Hourly Rate</option>
                    </select>
                 </div>
              </div>
              <button onClick={() => {
                if (newJob.title && newJob.budget) {
                  addJob({ ...newJob, clientId: user.id, clientName: user.fullName });
                  setShowPostModal(false);
                }
              }} className="btn-capsule w-full py-5 justify-center">Launch Project <Check className="w-5 h-5 ml-2" /></button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const SidebarItem = ({ active, icon: Icon, onClick, label, count }: any) => (
  <button onClick={onClick} className={`w-full flex flex-col items-center gap-1 p-4 rounded-3xl transition-all relative ${active ? 'bg-black text-white shadow-xl scale-105' : 'text-gray-400 hover:text-black hover:bg-black/5'}`}>
    <Icon className="w-7 h-7" />
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    {count > 0 && <span className="absolute top-2 right-4 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] font-black">{count}</span>}
  </button>
);

const JobCard = ({ job, onApply, user }: any) => (
  <div className="glass-panel p-8 rounded-[3rem] bg-white border border-black/5 hover:border-black/20 transition-all shadow-sm flex justify-between items-center group">
    <div className="space-y-4 flex-1">
      <div className="flex items-center gap-3">
         <span className="px-4 py-1 bg-black/5 rounded-full text-[10px] font-black uppercase tracking-widest">{job.category}</span>
         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1"><Clock className="w-3 h-3" /> 2h ago</span>
      </div>
      <h3 className="text-3xl font-black uppercase italic tracking-tighter group-hover:text-indigo-600 transition-colors">{job.title}</h3>
      <p className="text-gray-500 text-sm line-clamp-2 max-w-2xl">{job.description}</p>
    </div>
    <div className="text-right space-y-6">
       <div>
          <p className="text-3xl font-black italic tracking-tighter">${job.budget}</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase">{job.type}</p>
       </div>
       {user.role === 'freelancer' && (
         <button onClick={() => onApply({ jobId: job.id, freelancerId: user.id, freelancerName: user.fullName, bid: job.budget, coverLetter: "I'm interested!" })} className="btn-capsule py-3 px-6 text-[10px]">Send Proposal</button>
       )}
    </div>
  </div>
);

const SpecialistCard = ({ spec }: any) => (
  <div className="glass-panel p-8 rounded-[3rem] bg-white border border-black/5 shadow-sm flex items-center gap-8">
     <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-white font-black text-3xl shadow-xl">{spec.avatar}</div>
     <div className="flex-1">
        <h3 className="text-2xl font-black uppercase italic">{spec.fullName}</h3>
        <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest">{spec.title}</p>
        <div className="flex gap-1 mt-2">
           {spec.skills.slice(0, 3).map((s: any) => <span key={s} className="px-3 py-1 bg-black/5 rounded-full text-[9px] font-bold uppercase">{s}</span>)}
        </div>
     </div>
     <div className="text-right">
        <p className="text-2xl font-black italic tracking-tighter">${spec.price}</p>
        <div className="flex items-center justify-end gap-1 text-orange-400">
           <Star className="w-4 h-4 fill-current" />
           <span className="text-xs font-black text-black">{spec.rating}</span>
        </div>
     </div>
  </div>
);

const MyJobCard = ({ job, onViewResponses }: any) => (
  <div className="glass-panel p-8 rounded-[3rem] bg-white border border-black/5 flex justify-between items-center shadow-sm">
     <div>
        <h3 className="text-xl font-black uppercase italic">{job.title}</h3>
        <div className="flex items-center gap-4 mt-2">
           <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase ${job.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>{job.status}</span>
           <span className="text-[10px] font-bold text-gray-400 uppercase">{job.proposalsCount} Proposals</span>
        </div>
     </div>
     <button onClick={onViewResponses} className="btn-capsule py-3 px-8 text-[10px]">View Responses</button>
  </div>
);

const ResponseCard = ({ proposal, onHire }: any) => (
  <div className="glass-panel p-8 rounded-[3rem] bg-white border border-black/5 flex justify-between items-center shadow-sm hover:border-black transition-all">
     <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white font-black text-xl">{proposal.freelancerName[0]}</div>
        <div>
           <h4 className="font-black uppercase italic">{proposal.freelancerName}</h4>
           <p className="text-xs text-gray-500 italic">"{proposal.coverLetter}"</p>
        </div>
     </div>
     <div className="text-right flex items-center gap-6">
        <p className="text-2xl font-black italic tracking-tighter">${proposal.bid}</p>
        <button onClick={onHire} className="btn-capsule py-3 px-8 text-[10px]">Hire Professional</button>
     </div>
  </div>
);

const ProposalCard = ({ proposal, job }: any) => (
  <div className="glass-panel p-8 rounded-[3rem] bg-white border border-black/5 flex justify-between items-center shadow-sm">
     <div>
        <p className="text-[9px] font-black uppercase text-gray-400">Application for</p>
        <h3 className="text-xl font-black uppercase italic">{job?.title}</h3>
     </div>
     <div className="text-right">
        <p className="text-xl font-black italic">${proposal.bid}</p>
        <span className="px-4 py-1 bg-black/5 rounded-full text-[9px] font-black uppercase">{proposal.status}</span>
     </div>
  </div>
);

const StatBox = ({ label, value }: any) => (
  <div>
    <p className="text-3xl font-black tracking-tighter italic">{value}</p>
    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{label}</p>
  </div>
);

const BackgroundAnimation = () => (
  <div className="bg-mesh">
    {[...Array(15)].map((_, i) => (
      <div 
        key={i}
        className="floating-circle"
        style={{
          width: Math.random() * 200 + 50 + 'px',
          height: Math.random() * 200 + 50 + 'px',
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 20 + 's',
          animationDuration: Math.random() * 20 + 10 + 's',
          opacity: Math.random() * 0.05
        }}
      />
    ))}
  </div>
);
