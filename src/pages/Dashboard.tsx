import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { 
  Search, 
  Briefcase, 
  MessageSquare, 
  LayoutGrid, 
  MapPin, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Settings, 
  TrendingUp,
  FileText,
  CreditCard,
  ChevronRight,
  Plus,
  Building2,
  List,
  Send
} from 'lucide-react'

// --- Types ---
interface Job {
  id: string;
  title: string;
  desc: string;
  budget: string;
  type: 'hourly' | 'fixed';
  category: string;
  postedBy: string;
  postedAt: string;
  location: string;
  proposals: number;
}

const MOCK_JOBS: Job[] = [
  { id: '1', title: 'UI/UX Designer for Fintech App', desc: 'We are looking for a talented UI/UX designer to create a modern fintech application for the local market.', budget: '2000', type: 'fixed', category: 'Web Development', postedBy: 'FinBank AM', postedAt: 'Just now', location: 'Yerevan, AM', proposals: 0 },
  { id: '2', title: 'Senior React Native Developer', desc: 'Need an experienced engineer to optimize our existing delivery app and build new features.', budget: '45/hr', type: 'hourly', category: 'Mobile Apps', postedBy: 'FastDelivery', postedAt: '2h ago', location: 'Remote', proposals: 12 },
  { id: '3', title: 'Brand Identity & Logo Design', desc: 'Starting a new cafe in Dilijan and need a complete branding package including logo, menus, and signage.', budget: '800', type: 'fixed', category: 'Design', postedBy: 'Cafe Arev', postedAt: '5h ago', location: 'Dilijan, AM', proposals: 8 },
  { id: '4', title: 'Full Stack Developer (Next.js/Node)', desc: 'Building an e-commerce platform for Armenian artisans. Long term collaboration expected.', budget: '3000', type: 'fixed', category: 'Web Development', postedBy: 'Artisan Hub', postedAt: '1d ago', location: 'Yerevan, AM', proposals: 25 },
]

// --- Main Dashboard ---
export const Dashboard = ({ user, onLogout }: { user?: any, onLogout: () => void }) => {
  const { lang, setLang, t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'projects' | 'catalog' | 'messages' | 'profile'>('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  
  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-[#0E0E10] text-white font-sans flex overflow-hidden">
      
      {/* --- Sidebar --- */}
      <aside className="w-72 flex flex-col h-screen shrink-0 bg-[#0E0E10] border-r border-white/5 py-8 px-6">
         <div className="mb-10 p-8 rounded-3xl bg-[#131315] border border-white/5 flex flex-col items-center justify-center space-y-4 shadow-xl">
            <div className="w-20 h-20 rounded-full border-2 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center bg-indigo-500/10 text-indigo-400 font-bold text-2xl">
               {user?.username?.[0]?.toUpperCase() || 'Ф'}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{user?.role === 'client' ? t('client') : t('freelancer')}</span>
         </div>

         <nav className="flex-1 space-y-2">
            <SidebarLink active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={LayoutGrid} label={t('nav_dashboard')} />
            <SidebarLink active={activeTab === 'search'} onClick={() => setActiveTab('search')} icon={Search} label={t('nav_find')} />
            <SidebarLink active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} icon={Briefcase} label={t('nav_my_jobs')} />
            <SidebarLink active={activeTab === 'catalog'} onClick={() => setActiveTab('catalog')} icon={List} label={t('nav_catalog')} />
            <SidebarLink active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} icon={MessageSquare} label={t('nav_messages')} badge="3" />
            <SidebarLink active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={Settings} label={t('nav_settings')} />
         </nav>

         <div className="pt-6 mt-6 border-t border-white/5 space-y-4">
            <div className="flex items-center justify-center space-x-2 bg-white/5 rounded-xl p-1">
               <button onClick={() => setLang('en')} className={`flex-1 text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg transition-colors ${lang === 'en' ? 'bg-indigo-500 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>EN</button>
               <button onClick={() => setLang('ru')} className={`flex-1 text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg transition-colors ${lang === 'ru' ? 'bg-indigo-500 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>RU</button>
               <button onClick={() => setLang('hy')} className={`flex-1 text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg transition-colors ${lang === 'hy' ? 'bg-indigo-500 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>HY</button>
            </div>
            <button onClick={onLogout} className="flex items-center justify-center space-x-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-500/80 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors w-full">
               <X className="w-4 h-4" />
               <span>{t('logout')}</span>
            </button>
         </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden p-8 relative">
         <div className="max-w-[1400px] mx-auto w-full h-full flex flex-col">
            
            {/* Search Bar */}
            <header className="mb-10 flex shrink-0">
               <div className="relative w-full max-w-2xl">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input 
                     type="text" 
                     value={searchQuery}
                     onChange={(e) => {
                       setSearchQuery(e.target.value);
                       if(e.target.value && activeTab !== 'search') setActiveTab('search');
                     }}
                     placeholder="Поиск топовых проектов..." 
                     className="w-full bg-[#131315] border border-white/5 rounded-full py-4 pl-14 pr-24 text-sm outline-none focus:border-white/20 transition-colors placeholder:text-white/20"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-white/30 border border-white/10">
                     CMD K
                  </div>
               </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
               <div className="flex gap-10 items-start">
                  
                  {/* Center Column */}
                  <div className="flex-1 space-y-12">
                     <AnimatePresence mode="wait">
                        {activeTab === 'home' && (
                           <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                              {/* Stat Cards */}
                              <div className="grid grid-cols-3 gap-6">
                                 <StatCard icon={TrendingUp} iconColor="text-emerald-400" iconBg="bg-emerald-400/10" title="EARNINGS THIS MONTH" trend="+12.5%" value="$0.00" />
                                 <StatCard icon={FileText} iconColor="text-indigo-400" iconBg="bg-indigo-400/10" title="ACTIVE APPLICATIONS" trend="+12.5%" value="1" />
                                 <StatCard icon={Sparkles} iconColor="text-purple-400" iconBg="bg-purple-400/10" title="AVAILABLE CONNECTS" trend="+12.5%" value="80" />
                              </div>

                              {/* Recommended Projects */}
                              <div className="space-y-6">
                                 <div className="flex justify-between items-end mb-6">
                                    <div>
                                       <h2 className="text-3xl font-black mb-1">Recommended for you</h2>
                                       <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Curated based on your professional DNA</p>
                                    </div>
                                    <button onClick={() => setActiveTab('search')} className="text-xs font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest flex items-center space-x-1">
                                       <span>View Marketplace</span>
                                       <ChevronRight className="w-4 h-4" />
                                    </button>
                                 </div>
                                 <div className="space-y-6">
                                    {MOCK_JOBS.slice(0,2).map(job => (
                                       <DashboardJobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
                                    ))}
                                 </div>
                              </div>
                           </motion.div>
                        )}

                        {activeTab === 'search' && (
                           <motion.div key="search" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                              <h2 className="text-3xl font-black mb-8">Top Projects Feed</h2>
                              {filteredJobs.length > 0 ? filteredJobs.map(job => (
                                 <DashboardJobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
                              )) : (
                                 <div className="text-center py-20 bg-[#131315] border border-white/5 rounded-[2rem]">
                                    <Search className="w-10 h-10 text-white/10 mx-auto mb-4" />
                                    <p className="text-white/40">No projects found matching "{searchQuery}"</p>
                                 </div>
                              )}
                           </motion.div>
                        )}

                        {(activeTab === 'projects' || activeTab === 'catalog' || activeTab === 'messages' || activeTab === 'profile') && (
                           <motion.div key="other" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                              <div className="bg-[#131315] border border-white/5 rounded-[2rem] p-12 text-center h-[50vh] flex flex-col items-center justify-center">
                                 <Sparkles className="w-12 h-12 text-indigo-500/50 mb-6" />
                                 <h2 className="text-2xl font-bold mb-2">Module "{activeTab}" is active</h2>
                                 <p className="text-white/40 text-sm max-w-md mx-auto">This section is part of the professional CRM workflow. Ready to integrate data API.</p>
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>

                  {/* Right Sidebar */}
                  <div className="w-80 shrink-0 space-y-8 sticky top-0 pb-8">
                     {/* Account Summary */}
                     <div className="bg-[#131315] border border-white/5 p-6 rounded-[2rem] space-y-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Account Summary</h4>
                        <div className="space-y-2">
                           <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/30">
                              <span>Profile completeness:</span>
                              <span className="text-white">35%</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500 w-[35%]" />
                           </div>
                        </div>
                        <div className="space-y-3 pt-4">
                           <button className="w-full flex items-center justify-between p-4 bg-[#1A1A1D] rounded-2xl hover:bg-[#202023] transition-colors border border-white/5">
                              <div className="flex items-center space-x-3">
                                 <ShieldCheck className="w-5 h-5 text-indigo-400" />
                                 <span className="text-sm font-bold">Identity verified</span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-white/30" />
                           </button>
                           <button className="w-full flex items-center justify-between p-4 bg-[#1A1A1D] rounded-2xl hover:bg-[#202023] transition-colors border border-white/5">
                              <div className="flex items-center space-x-3">
                                 <CreditCard className="w-5 h-5 text-purple-400" />
                                 <span className="text-sm font-bold">Payment method</span>
                              </div>
                              <Plus className="w-4 h-4 text-white/30" />
                           </button>
                        </div>
                     </div>

                     {/* Upcoming Deadlines */}
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30">Upcoming Deadlines</h4>
                        <p className="text-xs font-medium text-white/20 italic">No active contracts with deadlines.</p>
                     </div>

                     {/* Agency CTA */}
                     <div className="bg-gradient-to-b from-[#1E1B38] to-[#131315] border border-indigo-500/20 p-8 rounded-[2rem] space-y-6 relative overflow-hidden">
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center">
                           <Building2 className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold mb-3">Start an Agency to scale your business</h4>
                           <p className="text-xs text-white/50 leading-relaxed">Collaborate with other specialists under one banner and win bigger projects.</p>
                        </div>
                        <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors">
                           Create Agency
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Job Modal */}
         <AnimatePresence>
            {selectedJob && (
               <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedJob(null)} />
                  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#131315] w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl flex flex-col max-h-[85vh]">
                     <div className="p-8 border-b border-white/5 flex justify-between items-start">
                        <div>
                           <div className="flex items-center space-x-3 mb-4">
                              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-md">{selectedJob.category}</span>
                           </div>
                           <h2 className="text-3xl font-black mb-2">{selectedJob.title}</h2>
                           <p className="text-emerald-400 text-xl font-bold">{selectedJob.budget} <span className="text-[10px] text-white/30 uppercase tracking-widest">{selectedJob.type}</span></p>
                        </div>
                        <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-white/5 rounded-xl transition-colors"><X className="w-6 h-6" /></button>
                     </div>
                     <div className="p-8 overflow-y-auto space-y-8">
                        <div>
                           <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Description</h4>
                           <p className="text-white/70 leading-relaxed">{selectedJob.desc}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6 p-6 bg-white/5 rounded-2xl border border-white/5">
                           <div>
                              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Location</p>
                              <p className="text-sm font-bold flex items-center"><MapPin className="w-4 h-4 mr-2 text-indigo-400" />{selectedJob.location}</p>
                           </div>
                           <div>
                              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Client</p>
                              <p className="text-sm font-bold">{selectedJob.postedBy}</p>
                           </div>
                        </div>
                     </div>
                     <div className="p-6 border-t border-white/5 bg-[#0E0E10]">
                        <button onClick={() => setSelectedJob(null)} className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 transition-colors text-white text-[12px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center space-x-2">
                           <Send className="w-4 h-4" />
                           <span>Submit Proposal</span>
                        </button>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      </main>
    </div>
  )
}

// --- Sub-components ---

const SidebarLink = ({ icon: Icon, label, active, onClick, badge }: any) => (
   <button onClick={onClick} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${active ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'text-white/40 hover:bg-white/5 hover:text-white/80'}`}>
      <Icon className="w-5 h-5 shrink-0" />
      <span className="text-sm font-bold flex-1 text-left">{label}</span>
      {badge && <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}
   </button>
)

const StatCard = ({ icon: Icon, iconColor, iconBg, title, trend, value }: any) => (
   <div className="bg-[#131315] border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between h-48 hover:border-white/10 transition-colors">
      <div className="flex justify-between items-start">
         <div className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
         </div>
      </div>
      <div className="space-y-1">
         <div className="flex items-center space-x-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30">{title}</h4>
            <span className="text-[10px] font-bold text-emerald-400">{trend}</span>
         </div>
         <p className="text-4xl font-black">{value}</p>
      </div>
   </div>
)

const DashboardJobCard = ({ job, onClick }: { job: Job, onClick: () => void }) => {
   const colorMap: Record<string, { bg: string, text: string }> = {
      'Web Development': { bg: 'bg-indigo-500/20', text: 'text-indigo-400' },
      'Mobile Apps': { bg: 'bg-purple-500/20', text: 'text-purple-400' },
      'Design': { bg: 'bg-pink-500/20', text: 'text-pink-400' }
   }
   const colors = colorMap[job.category] || { bg: 'bg-blue-500/20', text: 'text-blue-400' }

   return (
      <div onClick={onClick} className="bg-[#131315] border border-white/5 p-8 rounded-[2rem] hover:border-white/20 transition-colors group cursor-pointer relative overflow-hidden">
         <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
               <span className={`px-3 py-1 ${colors.bg} ${colors.text} text-[10px] font-black uppercase tracking-widest rounded-md`}>{job.category}</span>
               <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">{job.postedAt}</span>
            </div>
            <div className="text-right">
               <p className="text-3xl font-black text-emerald-400">{job.budget}</p>
               <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{job.type} Price</p>
            </div>
         </div>
         
         <h3 className="text-3xl font-bold mb-4 w-3/4 group-hover:text-indigo-400 transition-colors">{job.title}</h3>
         <p className="text-sm text-white/40 leading-relaxed mb-8 w-3/4 line-clamp-2">{job.desc}</p>
         
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
               <div className="flex items-center space-x-2"><MapPin className="w-3.5 h-3.5 text-indigo-400" /> <span>{job.location}</span></div>
               <div className="flex items-center space-x-2"><Users className="w-3.5 h-3.5 text-indigo-400" /> <span>{job.proposals} Proposals</span></div>
            </div>
            
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
               <ChevronRight className="w-5 h-5 text-white/50" />
            </div>
         </div>
      </div>
   )
}

const Users = ({ className }: { className?: string }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
   </svg>
)

