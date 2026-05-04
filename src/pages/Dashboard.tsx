import { useState, useEffect } from 'react'
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
  CircleCheck,
  PlusCircle,
  MessageSquare,
  User,
  Shield,
  Trash2,
  Ban,
  Check,
  ArrowUpRight,
  Globe,
  Bell,
  Zap,
  Layers,
  Sparkles,
  Command
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

export const Dashboard = () => {
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();
  const { user, logout, jobs, proposals, applyToJob, hireSpecialist, completeJob, addJob } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<'browse' | 'my-work' | 'chats' | 'settings'>('browse');
  const [search, setSearch] = useState('');
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [isRating, setIsRating] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5);
  const [expandedProposals, setExpandedProposals] = useState<Record<string, boolean>>({});
  const [showApplyModal, setShowApplyModal] = useState<any>(null);
  const [proposalData, setProposalData] = useState({ bid: '', coverLetter: '' });
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  useEffect(() => {
    if (!user) navigate('/auth');
  }, [user, navigate]);

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
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-violet-500 selection:text-white overflow-hidden flex">
      <BackgroundMesh />
      <div className="bg-overlay"></div>
      
      {/* Sidebar Navigation */}
      <aside className="w-80 h-screen border-r border-white/5 flex flex-col p-10 bg-black/40 backdrop-blur-3xl sticky top-0 shrink-0">
        <div className="mb-20">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[1.5rem] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-all duration-700 shadow-2xl shadow-violet-500/20">
              <div className="w-5 h-5 border-2 border-white rounded rotate-45 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <span className="text-display text-2xl text-white">AF MARKET</span>
              <p className="text-label text-[8px] mt-1 tracking-[0.4em] text-white/40">IT ELITE ECOSYSTEM</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-3">
          <SidebarLink active={activeTab === 'browse'} icon={LayoutGrid} onClick={() => setActiveTab('browse')} label="Marketplace" />
          <SidebarLink 
            active={activeTab === 'my-work'} 
            icon={Briefcase} 
            onClick={() => setActiveTab('my-work')} 
            label={user.role === 'client' ? "Projects" : "Proposals"} 
          />
          <SidebarLink active={activeTab === 'chats'} icon={MessageSquare} onClick={() => setActiveTab('chats')} label="Messages" badge={activeChats.length} />
          <SidebarLink active={activeTab === 'settings'} icon={Settings} onClick={() => setActiveTab('settings')} label="Settings" />
        </nav>

        <div className="space-y-6">
          <div className="premium-card p-6 border-none bg-white/5 flex items-center gap-4">
             <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white font-black text-xl rotate-3">
               {user.fullName[0]}
             </div>
             <div className="overflow-hidden">
                <p className="text-display text-sm truncate text-white">{user.fullName}</p>
                <p className="text-label text-[7px] mt-0.5 text-white/30">{user.role}</p>
             </div>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-4 px-8 py-5 text-gray-500 hover:text-white hover:bg-white/5 rounded-3xl transition-all duration-500">
            <LogOut className="w-5 h-5" />
            <span className="text-label text-white/40">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Modern Header */}
        <header className="h-32 border-b border-white/5 flex items-center justify-between px-16 bg-black/20 backdrop-blur-md sticky top-0 z-50">
          <div className="flex flex-col">
             <h1 className="text-display text-5xl text-white">
               {activeTab === 'browse' ? "Discovery" : 
                activeTab === 'my-work' ? (user.role === 'client' ? "Inventory" : "Outbound") :
                activeTab === 'chats' ? "Dialogue" : "Profiling"}
             </h1>
             <div className="flex items-center gap-4 mt-1">
                <span className="text-label text-violet-400">{user.role === 'client' ? 'Client Authority' : 'Specialist Access'}</span>
                <span className="w-1.5 h-1.5 bg-white/10 rounded-full"></span>
                <span className="text-label text-white/20">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
             </div>
          </div>

          <div className="flex items-center gap-8">
            {activeTab === 'browse' && (
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-violet-400 transition-colors" />
                <input 
                   type="text" 
                   placeholder="Search architecture, stacks, goals..." 
                   className="w-96 bg-white/5 border border-white/5 rounded-[1.5rem] pl-16 pr-8 py-4 text-xs font-bold outline-none focus:bg-white/[0.08] focus:border-white/20 transition-all text-white shadow-inner"
                   value={search}
                   onChange={e => setSearch(e.target.value)}
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-1 items-center opacity-30 group-focus-within:opacity-0 transition-opacity">
                   <Command className="w-3 h-3 text-white" />
                   <span className="text-[10px] font-black uppercase text-white">K</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
               <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all duration-500 text-white/40"><Bell className="w-4 h-4" /></button>
               <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all duration-500 text-white/40"><Globe className="w-4 h-4" /></button>
            </div>

            <Link to="/" className="btn-lux px-8 py-4 text-[10px] shadow-sm bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black transition-all duration-700">
               Terminal <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Dynamic Content Scrollbox */}
        <div className="flex-1 overflow-y-auto px-16 py-12 custom-scrollbar">
           <AnimatePresence mode="wait">
             {activeTab === 'browse' && (
               <motion.div 
                key="browse" 
                initial={{ opacity: 0, scale: 0.98, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.98, y: -20 }} 
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 gap-10"
               >
                 <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-4">
                       <FilterPill label="All Stacks" active />
                       <FilterPill label="React / Next.js" />
                       <FilterPill label="AI / Python" />
                       <FilterPill label="Design Systems" />
                    </div>
                     <div className="text-label flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div> {filteredJobs.length} Live Opportunities
                     </div>
                 </div>

                 {filteredJobs.length === 0 ? (
                   <div className="py-40 flex flex-col items-center justify-center premium-card border-dashed">
                     <Layers className="w-20 h-20 text-white/10 mb-6" />
                     <p className="text-label">Registry empty for current parameters</p>
                   </div>
                 ) : (
                   filteredJobs.map(job => (
                     <ModernJobCard 
                       key={job.id} 
                       job={job} 
                       user={user} 
                       onApply={() => setShowApplyModal(job)}
                       hasApplied={proposals.some(p => p.jobId === job.id && p.freelancerId === user.id) || appliedJobs.includes(job.id)}
                     />
                   ))
                 )}
               </motion.div>
             )}

             {activeTab === 'my-work' && (
               <motion.div 
                key="my-work" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-12"
               >
                 {user.role === 'client' && (
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-2 premium-card p-12 bg-white/[0.03] text-white relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 group-hover:scale-110 transition-transform duration-[20s]"></div>
                        <div className="relative z-10 flex flex-col justify-between h-full space-y-10">
                           <div className="space-y-4">
                               <h2 className="text-display text-7xl leading-none bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">Scale Your Vision</h2>
                               <p className="text-white/40 text-sm max-w-md font-medium italic">Broadcast your requirements to the elite specialist network and begin procurement in minutes.</p>
                           </div>
                           <button 
                             onClick={() => setIsCreatingJob(true)}
                             className="w-fit flex items-center gap-6 px-10 py-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all duration-700 shadow-2xl shadow-violet-500/30 border border-white/10"
                           >
                             Initiate New Request <PlusCircle className="w-6 h-6" />
                           </button>
                        </div>
                        <div className="absolute top-10 right-10 opacity-[0.03] text-violet-500"><Zap className="w-64 h-64" /></div>
                     </div>
                     <div className="premium-card p-12 border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center"><Sparkles className="w-10 h-10 text-white/10" /></div>
                        <p className="text-label text-white/40">Project Intelligence</p>
                        <p className="text-xs text-white/20 italic">Advanced analytics for your active requests will appear here as you gather data.</p>
                     </div>
                   </div>
                 )}
                 
                 <div className="grid grid-cols-1 gap-8">
                   {(user.role === 'client' ? myJobs : myBids).length === 0 ? (
                      <div className="py-40 flex flex-col items-center justify-center premium-card border-dashed">
                        <Briefcase className="w-20 h-20 text-black/10 mb-6" />
                        <p className="text-label">Active inventory is currently null</p>
                      </div>
                   ) : (
                     (user.role === 'client' ? myJobs : myBids).map((item: any) => (
                       <div key={item.id} className="premium-card p-12 hover:border-black/20 transition-all duration-700">
                          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
                             <div className="space-y-6 flex-1">
                               <div className="flex items-center gap-4">
                                 <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl shadow-black/5 ${item.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-black text-white'}`}>
                                   {user.role === 'client' ? (item.status === 'completed' ? 'Delivered' : item.category) : 'Outbound Transmission'}
                                 </span>
                                 {item.status === 'in-progress' && <span className="px-5 py-2 bg-indigo-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 animate-pulse">Processing</span>}
                               </div>
                               <h3 className="text-display text-5xl italic tracking-tighter">
                                 {user.role === 'client' ? item.title : jobs.find(j => j.id === item.jobId)?.title}
                               </h3>
                               <div className="flex items-center gap-6">
                                  <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 bg-zinc-100 rounded-xl flex items-center justify-center text-[10px] font-black">ID</div>
                                     <p className="text-label text-[8px]">{item.id.toUpperCase().substr(0, 8)}</p>
                                  </div>
                                  <div className="w-1.5 h-1.5 bg-black/10 rounded-full"></div>
                                  <p className="text-label text-black/20">{new Date(item.createdAt).toLocaleDateString()}</p>
                               </div>
                             </div>
                             <div className="text-left lg:text-right flex flex-col items-start lg:items-end gap-6 min-w-[200px]">
                                <div className="space-y-1">
                                   <p className="text-display text-6xl italic">${user.role === 'client' ? item.budget : item.bid}</p>
                                   <p className="text-label text-black/30">Valuation Agreement</p>
                                </div>
                                {user.role === 'client' && item.status === 'open' && proposals.filter(p => p.jobId === item.id).length > 0 && (
                                   <button 
                                     onClick={() => setExpandedProposals(prev => ({...prev, [item.id]: !prev[item.id]}))}
                                     className="flex items-center gap-3 px-8 py-4 bg-zinc-50 hover:bg-black hover:text-white rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 border border-black/5"
                                   >
                                     {expandedProposals[item.id] ? 'Hide Proposals' : `Inspect Bids (${proposals.filter(p => p.jobId === item.id).length})`}
                                   </button>
                                )}
                             </div>
                          </div>

                          {expandedProposals[item.id] && (
                             <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="pt-12 border-t border-black/5 mt-12 grid grid-cols-1 gap-6">
                               {proposals.filter(p => p.jobId === item.id).map(p => (
                                 <div key={p.id} className="flex items-center justify-between p-10 bg-zinc-50/50 hover:bg-zinc-50 rounded-[3rem] transition-all duration-700 border border-transparent hover:border-black/5 group">
                                    <div className="flex items-center gap-8">
                                       <div className="w-16 h-16 bg-white shadow-2xl rounded-3xl flex items-center justify-center font-black text-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                                          {p.freelancerName[0]}
                                       </div>
                                       <div>
                                          <p className="text-display text-xl">{p.freelancerName}</p>
                                          <p className="text-xs text-white/40 font-medium italic mt-1 max-w-xl">"{p.coverLetter}"</p>
                                       </div>
                                    </div>
                                    <button 
                                       onClick={() => {
                                         hireSpecialist(item.id, p.freelancerId);
                                         setActiveTab('chats');
                                       }}
                                       className="flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-violet-500 hover:text-white transition-all duration-700 shadow-2xl shadow-white/10"
                                     >
                                       Authorize & Initiate <MessageSquare className="w-5 h-5" />
                                     </button>
                                 </div>
                               ))}
                             </motion.div>
                          )}
                       </div>
                     ))
                   )}
                 </div>
               </motion.div>
             )}

             {activeTab === 'chats' && (
               <motion.div key="chats" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-[calc(100vh-16rem)] flex gap-10 overflow-hidden">
                  <div className="w-96 flex flex-col gap-6 overflow-y-auto pr-4 hide-scrollbar">
                     {activeChats.length === 0 ? (
                       <div className="p-20 text-center premium-card border-dashed opacity-40">
                          <MessageSquare className="w-16 h-16 mx-auto mb-8 text-white/10" />
                          <p className="text-label">Communications Null</p>
                       </div>
                     ) : (
                       activeChats.map(chat => (
                         <button 
                           key={chat.id}
                           onClick={() => setActiveChat(chat)}
                           className={`p-10 premium-card text-left relative overflow-hidden group transition-all duration-700 bg-black/40 ${activeChat?.id === chat.id ? 'border-violet-500 ring-4 ring-violet-500/10 shadow-2xl scale-[1.02]' : 'hover:border-white/20'}`}
                         >
                            <div className="flex justify-between items-start mb-4">
                               <span className="text-[9px] font-black uppercase tracking-widest px-4 py-1.5 bg-violet-600 text-white rounded-full shadow-lg shadow-violet-500/20">Live Contract</span>
                               <span className="text-display text-2xl italic tracking-tighter">${chat.budget}</span>
                            </div>
                            <h4 className="text-display text-lg italic leading-tight line-clamp-2">{chat.title}</h4>
                            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                               <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center font-black text-xs text-white">{user.role === 'client' ? 'F' : 'C'}</div>
                               <p className="text-label text-[8px] truncate">
                                 {user.role === 'client' ? `${proposals.find(p => p.jobId === chat.id && p.freelancerId === chat.selectedFreelancerId)?.freelancerName}` : chat.clientName}
                               </p>
                            </div>
                         </button>
                       ))
                     )}
                  </div>

                  <div className="flex-1 premium-card border-white/10 flex flex-col overflow-hidden bg-black/40 backdrop-blur-3xl">
                     {activeChat ? (
                       <>
                         <div className="px-12 py-10 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <div className="flex items-center gap-6">
                               <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[1.25rem] flex items-center justify-center text-white font-black text-2xl rotate-3">
                                  {user.role === 'client' ? 'S' : 'C'}
                               </div>
                               <div>
                                  <h3 className="text-display text-2xl italic text-white">{activeChat.title}</h3>
                                  <div className="flex items-center gap-3 mt-1">
                                     <div className="w-2 h-2 bg-violet-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,1)]"></div>
                                     <p className="text-label text-[8px] text-white/30">Encrypted Secure Tunnel Established</p>
                                  </div>
                               </div>
                            </div>
                            <div className="flex gap-4">
                               {user.role === 'client' && (
                                  <button 
                                    onClick={() => setIsRating(true)}
                                    className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full hover:scale-105 transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-violet-500/20 border border-white/10"
                                  >
                                    <CircleCheck className="w-4 h-4" /> Finalize Delivery
                                  </button>
                               )}
                               <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all duration-500 text-white/40"><Ban className="w-4 h-4" /></button>
                               <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-500 text-red-500"><Trash2 className="w-4 h-4" /></button>
                            </div>
                         </div>

                         <div className="flex-1 p-16 overflow-y-auto flex flex-col gap-10">
                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-8 opacity-20 group">
                               <p className="text-label max-w-sm">Secure Communication Protocol Active. All interactions are protected under platform arbitration agreements.</p>
                            </div>
                            
                            {/* Sample Message Bubbles */}
                            <div className="flex justify-start">
                               <div className="bg-white p-10 rounded-[2.5rem] rounded-tl-none shadow-2xl border border-black/5 max-w-xl space-y-4">
                                  <p className="text-sm font-medium leading-relaxed italic">"Architecture audit complete. Proceeding with the primary API integration. Expecting the initial staging environment to be live in 6 hours."</p>
                                  <p className="text-label text-[8px] text-black/10">14:22 GMT</p>
                               </div>
                            </div>
                            
                            <div className="flex justify-end">
                               <div className="bg-black text-white p-10 rounded-[2.5rem] rounded-tr-none shadow-2xl max-w-xl space-y-4">
                                  <p className="text-sm font-medium leading-relaxed italic">"Acknowledged. Ensure the CI/CD pipeline is isolated for testing. We require full audit logs for the deployment."</p>
                                  <p className="text-label text-[8px] text-white/20">14:31 GMT</p>
                               </div>
                            </div>
                         </div>

                         <div className="p-12 bg-white/50">
                            <div className="relative group">
                               <input 
                                 className="w-full py-8 pl-12 pr-32 bg-white border-2 border-black/5 rounded-[2.5rem] outline-none text-sm font-bold focus:border-black transition-all shadow-sm" 
                                 placeholder="Transmit message to partner..." 
                               />
                               <button className="absolute right-4 top-1/2 -translate-y-1/2 p-6 bg-black text-white rounded-full hover:bg-emerald-500 hover:scale-105 transition-all duration-500 shadow-xl">
                                 <Send className="w-5 h-5" />
                               </button>
                            </div>
                         </div>
                       </>
                     ) : (
                       <div className="flex-1 flex flex-col items-center justify-center text-center p-32 space-y-12">
                          <div className="relative">
                             <div className="absolute inset-0 bg-black blur-3xl opacity-5 rounded-full scale-150"></div>
                             <MessageSquare className="w-48 h-48 text-black/5 relative z-10" />
                          </div>
                          <div className="space-y-4">
                             <h3 className="text-display text-4xl italic">Neural Network Ready</h3>
                             <p className="text-label max-w-md mx-auto leading-relaxed">Select an active transmission protocol from the terminal on the left to begin secure communications.</p>
                          </div>
                       </div>
                     )}
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Global Floating Action Container */}
        <SupportWidget />
      </main>

      {/* Aesthetic Profile Sidebar (Right) */}
      <aside className="w-96 border-l border-white/5 h-screen overflow-y-auto p-12 space-y-10 bg-black/20 backdrop-blur-xl relative z-10 sticky top-0 shrink-0">
         <div className="premium-card p-12 flex flex-col items-center text-center space-y-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 group-hover:scale-125 transition-transform duration-[5s]"></div>
            
            <div className="w-32 h-32 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[3rem] flex items-center justify-center text-white text-5xl font-black italic rotate-6 shadow-2xl relative z-10 group-hover:rotate-0 transition-transform duration-700 shadow-violet-500/20">
               {user.fullName[0]}
            </div>

            <div className="space-y-4 relative z-10">
               <h3 className="text-display text-3xl leading-none text-white">{user.fullName}</h3>
               <div className="flex items-center justify-center gap-3">
                  <div className="px-5 py-1.5 bg-violet-500 text-white rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl shadow-violet-500/20">Verified Identity</div>
               </div>
            </div>

            <div className="grid grid-cols-2 w-full gap-8 border-t border-white/5 pt-10 relative z-10">
               <div className="text-center space-y-2">
                  <p className="text-display text-4xl text-white">{user.role === 'freelancer' ? `${(user.rating || 5.0).toFixed(1)}` : (user.postedJobsCount || 0)}</p>
                  <p className="text-label text-[8px] text-white/30 leading-none">{user.role === 'freelancer' ? 'Rating Index' : 'Outbound'}</p>
               </div>
               <div className="text-center space-y-2 border-l border-white/5">
                  <p className="text-display text-4xl text-white">{user.completedJobsCount || 0}</p>
                  <p className="text-label text-[8px] text-white/30 leading-none">Milestones</p>
               </div>
            </div>

            <div className="w-full space-y-4 pt-4 relative z-10">
               <div className="flex justify-between items-end">
                 <span className="text-label text-[7px] text-white/20">Authority Level</span>
                 <span className="text-label text-white/60">98%</span>
               </div>
               <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div initial={{ width: 0 }} animate={{ width: '98%' }} transition={{ duration: 2 }} className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]"></motion.div>
               </div>
            </div>
         </div>

         <div className="premium-card p-10 space-y-8 bg-zinc-50 border-none">
            <h4 className="text-display text-xl leading-none italic">Platform Insight</h4>
            <div className="space-y-6">
               <StatRow label="Active Projects" value={jobs.length} />
               <StatRow label="Market Cap" value={`$${jobs.reduce((a, b) => a + parseInt(b.budget || '0'), 0).toLocaleString()}`} />
               <StatRow label="Processing" value="Secure" color="text-emerald-500" />
            </div>
            <button className="w-full py-5 border border-black/5 rounded-[1.5rem] text-label text-[8px] hover:bg-black hover:text-white transition-all duration-700">Audit Protocol Details</button>
         </div>

         <div className="p-10 premium-card border-none bg-[linear-gradient(135deg,rgba(0,0,0,1)_0%,rgba(60,60,60,1)_100%)] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="relative z-10 space-y-6">
               <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Star className="w-5 h-5 text-emerald-400 fill-current" /></div>
               <h4 className="text-display text-xl leading-none italic">Concierge Access</h4>
               <p className="text-[10px] text-zinc-400 font-medium italic leading-relaxed">Direct priority support for account management and architectural guidance.</p>
               <a href="https://t.me/Markosya_77" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full py-5 bg-white text-black rounded-full text-label hover:bg-emerald-500 hover:text-white transition-all duration-700">
                  Contact Delegate <ArrowUpRight className="w-4 h-4" />
               </a>
            </div>
         </div>
      </aside>

      {/* Create Job Overlay */}
      <AnimatePresence>
        {isCreatingJob && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setIsCreatingJob(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-[5rem] p-24 w-full max-w-5xl relative z-10 flex flex-col md:flex-row gap-20 overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,1)]"
            >
               <div className="flex-1 space-y-12">
                  <div className="space-y-6">
                    <h3 className="text-display text-8xl leading-[0.8]">INITIATE REQUEST</h3>
                    <p className="text-label text-black/30">Define the architectural scope and milestones.</p>
                  </div>
                  
                  <form id="jobForm" onSubmit={(e: any) => {
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
                  }} className="space-y-10">
                     <div className="grid grid-cols-1 gap-10">
                        <InputGroup label="Project Designation" name="title" placeholder="e.g. Neural Link Interface Revamp" required />
                        <div className="grid grid-cols-2 gap-10">
                           <div className="space-y-4">
                             <label className="text-label">Classification</label>
                             <select name="category" className="w-full bg-zinc-50 border-2 border-transparent rounded-[2rem] px-8 py-6 text-sm font-black uppercase outline-none focus:bg-white focus:border-black transition-all appearance-none">
                                <option>Web Development</option>
                                <option>AI Engineering</option>
                                <option>UI/UX Architecture</option>
                                <option>Mobile Systems</option>
                             </select>
                           </div>
                           <InputGroup label="Estimated Timeline" name="deadline" placeholder="e.g. 30 Production Cycles" required />
                        </div>
                        <InputGroup label="Budget Allocation ($)" name="budget" placeholder="0.00" type="number" required />
                        <div className="space-y-4">
                           <label className="text-label">Requirement Brief</label>
                           <textarea name="desc" required rows={4} className="w-full bg-zinc-50 border-2 border-transparent rounded-[3rem] p-10 outline-none focus:bg-white focus:border-black transition-all text-sm font-medium italic resize-none" placeholder="Elaborate on the technical complexity and outcome expectations..."></textarea>
                        </div>
                     </div>
                  </form>
               </div>

               <div className="w-80 space-y-12 shrink-0">
                   <div className="premium-card p-12 bg-white/[0.03] text-white space-y-8 h-fit">
                     <Command className="w-12 h-12 text-violet-400" />
                     <h4 className="text-display text-3xl italic">Audit Protocol</h4>
                     <p className="text-[10px] text-white/30 leading-relaxed font-medium">All projects are manually audited for compliance. Ensure your brief is explicit and clear.</p>
                     <ul className="space-y-4 pt-6 border-t border-white/10">
                        <li className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-violet-400"><CircleCheck className="w-4 h-4" /> Secure Escrow</li>
                        <li className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-violet-400"><CircleCheck className="w-4 h-4" /> Priority Discovery</li>
                        <li className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-violet-400"><CircleCheck className="w-4 h-4" /> Expert Matching</li>
                     </ul>
                  </div>

                  <div className="space-y-6">
                     <button form="jobForm" type="submit" className="btn-lux w-full py-10 text-lg">Deploy Request <ArrowUpRight className="w-8 h-8" /></button>
                     <button onClick={() => setIsCreatingJob(false)} className="w-full text-label text-white/20 hover:text-white transition-colors">Abort Procedure</button>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rating / Completion Modal */}
      <AnimatePresence>
        {isRating && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white rounded-[5rem] p-24 w-full max-w-2xl relative z-10 text-center space-y-16"
            >
               <div className="w-32 h-32 bg-black text-white rounded-[3.5rem] flex items-center justify-center mx-auto rotate-12 shadow-2xl">
                  <Star className="w-16 h-16 fill-current text-emerald-400" />
               </div>
               <div className="space-y-4">
                  <h3 className="text-display text-6xl leading-none italic">Quality Audit</h3>
                  <p className="text-label text-black/30">Evaluate the performance and reliability index.</p>
               </div>
               
               <div className="flex justify-center gap-6">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button 
                      key={num}
                      onClick={() => setSelectedRating(num)}
                      className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-3xl font-black italic transition-all duration-700 ${selectedRating >= num ? 'bg-black text-white shadow-2xl scale-110' : 'bg-zinc-50 text-black/10 hover:bg-zinc-100 hover:text-black/30'}`}
                    >
                      {num}
                    </button>
                  ))}
               </div>

               <div className="space-y-6 pt-10">
                  <button 
                    onClick={() => {
                      completeJob(activeChat.id, activeChat.selectedFreelancerId!, selectedRating);
                      setIsRating(false);
                      setActiveChat(null);
                    }}
                    className="btn-lux w-full py-8 text-xl"
                  >
                    Authorize Payment & Close <Check className="w-8 h-8" />
                  </button>
                  <button onClick={() => setIsRating(false)} className="text-label hover:text-black transition-colors">Return to Transmission</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Apply Modal */}
      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setShowApplyModal(null)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 50 }} 
              className="relative w-full max-w-4xl bg-white p-24 rounded-[5rem] shadow-2xl flex flex-col md:flex-row gap-20 overflow-hidden"
            >
              <div className="flex-1 space-y-12">
                <div className="space-y-6">
                  <h3 className="text-display text-8xl leading-[0.8] italic">BIDDING TERMINAL</h3>
                  <p className="text-label text-black/30">Project: {showApplyModal.title.toUpperCase()}</p>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  applyToJob({
                    jobId: showApplyModal.id,
                    freelancerId: user.id,
                    freelancerName: user.fullName,
                    bid: proposalData.bid,
                    coverLetter: proposalData.coverLetter
                  });
                  setAppliedJobs([...appliedJobs, showApplyModal.id]);
                  setShowApplyModal(null);
                  setProposalData({ bid: '', coverLetter: '' });
                }} className="space-y-12">
                  <div className="space-y-4">
                    <label className="text-label text-[9px] ml-10">Valuation Proposal ($)</label>
                    <input 
                      required 
                      type="number" 
                      className="w-full bg-zinc-50 border-2 border-transparent rounded-[3rem] px-12 py-10 text-8xl font-black italic outline-none focus:bg-white focus:border-black transition-all shadow-inner" 
                      placeholder="0000" 
                      value={proposalData.bid} 
                      onChange={e => setProposalData({...proposalData, bid: e.target.value})} 
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-label text-[9px] ml-10">Architectural Narrative</label>
                    <textarea 
                      required 
                      rows={6} 
                      className="w-full bg-zinc-50 border-2 border-transparent rounded-[3rem] p-12 outline-none focus:bg-white focus:border-black transition-all text-sm font-medium italic resize-none shadow-inner leading-relaxed" 
                      placeholder="Define your strategic approach and specialized experience..." 
                      value={proposalData.coverLetter} 
                      onChange={e => setProposalData({...proposalData, coverLetter: e.target.value})} 
                    />
                  </div>

                  <button type="submit" className="btn-lux w-full py-10 text-xl group shadow-emerald-500/20">
                    Deploy Proposal <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform" />
                  </button>
                </form>
              </div>
              
              <div className="w-80 space-y-12 shrink-0">
                 <div className="premium-card p-12 bg-black text-white space-y-8 h-fit">
                    <Zap className="w-12 h-12 text-emerald-400" />
                    <h4 className="text-display text-3xl italic">Engagement Standards</h4>
                    <p className="text-[10px] text-zinc-400 leading-relaxed font-medium italic">All bids are subject to platform governance. Ensure your valuation is precise.</p>
                 </div>
                 <button onClick={() => setShowApplyModal(null)} className="w-full text-label text-black/30 hover:text-black transition-colors">Abort Procedure</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BackgroundMesh() {
  return (
    <div className="bg-mesh-container">
      <div className="mesh-blob bg-blue-400 w-[1000px] h-[1000px] top-[-500px] left-[-200px]"></div>
      <div className="mesh-blob bg-emerald-300 w-[800px] h-[800px] bottom-[-400px] right-[-200px]" style={{ animationDelay: '-5s' }}></div>
      <div className="mesh-blob bg-purple-300 w-[600px] h-[600px] top-[200px] right-[100px]" style={{ animationDelay: '-10s' }}></div>
    </div>
  )
}

function SidebarLink({ active, icon: Icon, onClick, label, badge = 0 }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-8 py-5 rounded-[1.5rem] transition-all duration-500 group ${active ? 'bg-black text-white shadow-2xl scale-[1.03]' : 'text-gray-400 hover:text-black hover:bg-black/5'}`}>
      <div className="flex items-center gap-5">
        <Icon className={`w-5 h-5 transition-transform duration-500 ${active ? '' : 'group-hover:scale-110'}`} />
        <span className="text-label text-[9px]">{label}</span>
      </div>
      {badge > 0 && !active && (
        <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[8px] font-black shadow-lg">{badge}</span>
      )}
    </button>
  )
}

function FilterPill({ label, active }: any) {
  return (
    <button className={`px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${active ? 'bg-black text-white shadow-xl' : 'bg-white border border-black/5 text-gray-400 hover:border-black/20 hover:text-black'}`}>
      {label}
    </button>
  )
}

function ModernJobCard({ job, user, onApply, hasApplied }: any) {
  return (
    <div className="premium-card p-12 group hover:border-black/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000">
         <Sparkles className="w-48 h-48 text-black" />
      </div>
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 relative z-10">
        <div className="space-y-8 flex-1">
          <div className="flex items-center gap-4">
            <span className="px-5 py-2 bg-zinc-50 border border-black/5 rounded-full text-[9px] font-black uppercase tracking-widest text-black/40 group-hover:bg-black group-hover:text-white transition-all duration-700">{job.category}</span>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-label text-[8px] text-emerald-600">Active Pipeline</span>
            </div>
          </div>
          
          <h3 className="text-display text-6xl leading-[0.9] italic tracking-tighter group-hover:translate-x-2 transition-transform duration-700">{job.title}</h3>
          
          <p className="text-gray-400 text-sm font-medium italic leading-relaxed max-w-2xl line-clamp-2">"{job.description}"</p>
          
          <div className="flex items-center gap-10 pt-4 border-t border-black/5">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-[10px] font-black shadow-inner">ID</div>
               <span className="text-label text-[8px]">{job.clientName?.toUpperCase().substr(0, 8) || 'ENTITY-01'}</span>
            </div>
            <div className="flex items-center gap-8 text-label text-[8px] text-black/20">
               <span className="flex items-center gap-2 italic"><Clock className="w-4 h-4" /> Cycle Start: Today</span>
               <span className="flex items-center gap-2 italic"><Send className="w-4 h-4" /> Outbound Bids: {job.proposalsCount}</span>
            </div>
          </div>
        </div>

        <div className="text-left lg:text-right flex flex-col items-start lg:items-end gap-8 min-w-[250px]">
           <div className="space-y-1">
              <p className="text-display text-7xl italic leading-none">${job.budget}</p>
              <p className="text-label text-black/30 tracking-[0.5em]">{job.type === 'fixed' ? 'FIXED CAPITAL' : 'STREAM VALUATION'}</p>
           </div>
           {user.role === 'freelancer' && (
             <button 
               onClick={onApply}
               disabled={hasApplied}
               className={`px-12 py-6 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-700 shadow-2xl flex items-center gap-4 ${hasApplied ? 'bg-zinc-100 text-black/20 cursor-not-allowed border border-black/5 shadow-none' : 'bg-black text-white hover:bg-emerald-500 hover:scale-[1.05] shadow-black/20 active:scale-95'}`}
             >
               {hasApplied ? 'Outbound Sent' : 'Initiate Outbound'} <ArrowUpRight className="w-6 h-6" />
             </button>
           )}
        </div>
      </div>
    </div>
  )
}

function InputGroup({ label, ...props }: any) {
  return (
    <div className="space-y-4">
       <label className="text-label">{label}</label>
       <input className="w-full bg-zinc-50 border-2 border-transparent rounded-[2rem] px-8 py-6 text-sm font-bold outline-none focus:bg-white focus:border-black transition-all shadow-inner" {...props} />
    </div>
  )
}

function StatRow({ label, value, color = 'text-black' }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-label text-[7px] text-black/30">{label}</span>
      <span className={`text-display text-xl italic ${color}`}>{value}</span>
    </div>
  )
}

function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-12 right-12 z-[1000] flex flex-col items-end gap-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, y: 50, filter: 'blur(20px)' }}
            transition={{ type: 'spring', damping: 20 }}
            className="premium-card p-12 bg-black text-white w-[400px] relative overflow-hidden group mb-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-[5s]"></div>
            <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 p-4 hover:bg-white/10 rounded-full z-20 transition-all"><X className="w-6 h-6" /></button>
            
            <div className="relative z-10 space-y-10">
               <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center rotate-6 group-hover:rotate-0 transition-transform duration-700">
                  <Sparkles className="w-8 h-8 text-emerald-400" />
               </div>
               
               <div className="space-y-4">
                  <h3 className="text-display text-4xl italic leading-none">Elite Assistance</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium italic">Our neural network and human delegates are ready to assist with project architectural alignment or specialist procurement.</p>
               </div>

               <div className="grid grid-cols-1 gap-4">
                  <a href="https://t.me/Markosya_77" target="_blank" rel="noreferrer" className="flex items-center justify-between p-8 bg-white/5 rounded-[2rem] hover:bg-emerald-500 transition-all duration-700 group/link">
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-[#229ED9] rounded-2xl flex items-center justify-center shadow-2xl group-hover/link:bg-white group-hover/link:text-[#229ED9] transition-all"><Send className="w-6 h-6 fill-current" /></div>
                        <div>
                           <p className="text-display text-lg">Telegram Tunnel</p>
                           <p className="text-[9px] font-black uppercase text-white/30 group-hover/link:text-white/60">@Markosya_77</p>
                        </div>
                     </div>
                     <ArrowUpRight className="w-6 h-6 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>
               </div>
               
               <button className="w-full py-6 border border-white/10 rounded-full text-label text-[8px] hover:bg-white hover:text-black transition-all duration-700">Audit Global Security Standards</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-700 border-2 ${isOpen ? 'bg-white text-black border-black rotate-90 scale-90' : 'bg-black text-white border-transparent hover:scale-110 hover:shadow-black/40 rotate-12 hover:rotate-0'}`}
      >
        {isOpen ? <X className="w-10 h-10" /> : <MessageSquare className="w-10 h-10" />}
      </button>
    </div>
  )
}
