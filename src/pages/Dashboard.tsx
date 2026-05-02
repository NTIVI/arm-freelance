import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { 
  Search, 
  Plus, 
  Briefcase, 
  Users,
  MessageSquare, 
  UserCircle, 
  LayoutGrid, 
  TrendingUp, 
  MapPin, 
  Clock, 
  DollarSign,
  ChevronRight,
  CheckCircle2,
  Star,
  FileText,
  Send,
  X,
  CreditCard,
  ShieldCheck,
  Building2,
  Sparkles
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

interface Proposal {
  id: string;
  jobId: string;
  freelancerName: string;
  coverLetter: string;
  bidAmount: string;
  status: 'pending' | 'accepted' | 'declined';
}

// --- Main Dashboard ---

export const Dashboard = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'home' | 'my-jobs' | 'messages' | 'profile' | 'search' | 'catalog'>('home')
  const [showPostJob, setShowPostJob] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [myProposals, setMyProposals] = useState<Proposal[]>([])
  
  const isFreelancer = user.role === 'freelancer'

  useEffect(() => {
    // Load data from localStorage
    const savedJobs = JSON.parse(localStorage.getItem('af_global_jobs') || '[]')
    setJobs(savedJobs.length > 0 ? savedJobs : MOCK_JOBS)
    
    const savedProposals = JSON.parse(localStorage.getItem(`af_proposals_${user.username}`) || '[]')
    setMyProposals(savedProposals)
  }, [user.username])

  const handlePostJob = (newJob: any) => {
    const updatedJobs = [newJob, ...jobs]
    setJobs(updatedJobs)
    localStorage.setItem('af_global_jobs', JSON.stringify(updatedJobs))
    setShowPostJob(false)
  }

  const handleApply = (proposal: any) => {
    const updatedProposals = [proposal, ...myProposals]
    setMyProposals(updatedProposals)
    localStorage.setItem(`af_proposals_${user.username}`, JSON.stringify(updatedProposals))
    setSelectedJob(null)
  }

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-20 px-6 font-sans selection:bg-primary/20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* Sidebar Nav (Fixed Alignment) */}
        <aside className="lg:w-80 shrink-0 space-y-4">
           <div className="glass-card p-10 rounded-[3.5rem] mb-8 flex flex-col items-center text-center space-y-6 border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {/* Perfected Avatar Shape */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-secondary p-1 relative z-10 shadow-2xl flex items-center justify-center">
                 <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center text-4xl font-black text-white text-glow">
                    {user.name?.[0]}
                 </div>
              </div>
              <div className="relative z-10">
                 <h3 className="font-display font-black text-2xl tracking-tight">{user.name}</h3>
                 <div className="flex items-center justify-center space-x-2 mt-2">
                    <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-black">
                      {user.role === 'freelancer' ? t('freelancer') : user.role === 'client' ? t('client') : t('agency')}
                    </span>
                    {user.verified && <CheckCircle2 className="w-4 h-4 text-primary" />}
                 </div>
              </div>
           </div>

           <nav className="space-y-3">
             {[
               { id: 'home', label: t('nav_dashboard'), icon: LayoutGrid },
               { id: 'search', label: isFreelancer ? t('nav_find') : t('find_talent'), icon: Search },
               { id: 'my-jobs', label: isFreelancer ? t('nav_my_jobs') : t('nav_my_jobs'), icon: Briefcase },
               { id: 'catalog', label: isFreelancer ? t('nav_catalog') : t('nav_catalog'), icon: LayoutGrid },
               { id: 'messages', label: t('nav_messages'), icon: MessageSquare },
               { id: 'profile', label: t('nav_settings'), icon: UserCircle },
             ].map(item => (
               <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center space-x-5 px-10 py-6 rounded-[2.5rem] transition-all duration-500 group ${activeTab === item.id ? 'bg-primary text-white shadow-[0_20px_40px_rgba(99,102,241,0.4)]' : 'text-white/30 hover:bg-white/[0.05] hover:text-white'}`}
               >
                  <item.icon className={`w-5 h-5 transition-transform duration-500 group-hover:scale-110 ${activeTab === item.id ? 'text-white' : 'text-primary'}`} />
                  <span className="font-black text-sm tracking-tight uppercase tracking-widest">{item.label}</span>
               </button>
             ))}
           </nav>
           
           <button onClick={onLogout} className="w-full flex items-center space-x-5 px-10 py-6 rounded-[2.5rem] text-red-500/40 hover:text-red-400 hover:bg-red-500/5 transition-all mt-10 group">
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
              <span className="font-black text-[11px] uppercase tracking-[0.4em]">{t('logout')}</span>
           </button>
        </aside>

        {/* Main Feed (Perfect Alignment) */}
        <main className="flex-1 space-y-10 min-w-0">
           
           {/* Top Actions (Fixed Centering) */}
           <div className="flex items-center justify-between gap-8">
              <div className="flex-1 glass-card p-2 rounded-[2.5rem] flex items-center px-8 border-white/10 shadow-none focus-within:border-primary/50 transition-all">
                 <Search className="w-6 h-6 text-white/20" />
                 <input 
                    type="text" 
                    placeholder={isFreelancer ? t('search_placeholder_freelancer') : t('search_placeholder_client')} 
                    className="bg-transparent border-none outline-none w-full p-5 text-lg font-medium placeholder:text-white/10" 
                 />
                 <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-white/[0.05] rounded-2xl border border-white/5 text-[10px] font-black text-white/20">
                    <span className="tracking-tighter uppercase">Cmd</span>
                    <span>K</span>
                 </div>
              </div>
              
              {!isFreelancer && (
                <button onClick={() => setShowPostJob(true)} className="btn-primary flex items-center space-x-4 h-[78px] px-12 shrink-0">
                   <Plus className="w-6 h-6" />
                   <span className="font-black text-sm uppercase tracking-[0.2em]">{t('post_job')}</span>
                </button>
              )}
           </div>

           {/* Content Tabs */}
           <AnimatePresence mode="wait">
              {activeTab === 'home' && (
                <motion.div key="home" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="space-y-12">
                   
                   {/* Stat Cards (Normalized spacing) */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <QuickStatCard label="Earnings this month" value="$0.00" icon={TrendingUp} color="text-green-400" />
                      <QuickStatCard label="Active Applications" value={myProposals.length.toString()} icon={FileText} color="text-primary" />
                      <QuickStatCard label="Available Connects" value="80" icon={Sparkles} color="text-secondary" />
                   </div>

                   <div className="flex justify-between items-end border-b border-white/5 pb-8">
                      <div className="space-y-3">
                         <h2 className="text-4xl font-black font-display tracking-tight text-glow">{isFreelancer ? 'Recommended Projects' : 'Top Specialists'}</h2>
                         <p className="text-[11px] text-white/20 font-black uppercase tracking-[0.4em]">Based on your professional intelligence</p>
                      </div>
                      <button className="flex items-center space-x-3 text-xs font-black text-primary hover:text-white transition-all uppercase tracking-widest hover:translate-x-2">
                         <span>Full Marketplace</span>
                         <ChevronRight className="w-5 h-5" />
                      </button>
                   </div>
                   
                   <div className="grid grid-cols-1 gap-10">
                      {isFreelancer ? (
                        jobs.map(job => (
                          <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
                        ))
                      ) : (
                        <MockFreelancerFeed />
                      )}
                   </div>
                </motion.div>
              )}

              {activeTab === 'search' && (
                <motion.div key="search" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row gap-10">
                   <div className="lg:w-80 shrink-0 space-y-10">
                      <div className="glass-card p-10 rounded-[3.5rem] space-y-8 border-white/10">
                         <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Marketplace Filters</h4>
                         <div className="space-y-6">
                            <FilterOption label="Fixed Price Projects" />
                            <FilterOption label="Hourly Rate Contracts" />
                            <FilterOption label="Verified Clients Only" />
                         </div>
                         <div className="pt-8 border-t border-white/10 space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Experience Level</h4>
                            <div className="space-y-4">
                               <FilterOption label="Entry Level (Junior)" />
                               <FilterOption label="Intermediate (Mid)" />
                               <FilterOption label="Expert (Senior/Lead)" />
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="flex-1 space-y-10">
                      <div className="flex justify-between items-center px-4">
                        <h2 className="text-3xl font-black font-display">{isFreelancer ? 'Available Opportunities' : 'Top Talent Pool'}</h2>
                        <span className="text-[11px] font-black text-white/20 uppercase tracking-[0.3em]">{jobs.length} Results Matching</span>
                      </div>
                      <div className="grid grid-cols-1 gap-8">
                        {isFreelancer ? (
                          jobs.map(job => <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />)
                        ) : (
                          <MockFreelancerFeed />
                        )}
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'messages' && (
                <motion.div key="messages" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card h-[650px] rounded-[3.5rem] overflow-hidden flex flex-col border-white/10">
                   <div className="p-10 border-b border-white/10 bg-white/[0.01] flex justify-between items-center">
                      <h2 className="text-3xl font-black font-display">Message Center</h2>
                      <button className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-all shadow-xl"><Plus className="w-6 h-6" /></button>
                   </div>
                   <div className="flex-1 flex items-center justify-center text-center p-16 opacity-30 space-y-6 flex-col">
                      <MessageSquare className="w-20 h-20 text-primary" />
                      <div className="space-y-3">
                        <p className="text-2xl font-black tracking-tight uppercase">Encryption Secured</p>
                        <p className="text-base max-w-sm font-medium">Your professional conversations are private and end-to-end encrypted.</p>
                      </div>
                      <button className="btn-secondary px-12">Initialize Chat</button>
                   </div>
                </motion.div>
              )}

              {activeTab === 'catalog' && (
                <motion.div key="catalog" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                   <div className="flex justify-between items-center px-4">
                      <h2 className="text-4xl font-black font-display tracking-tight text-glow">{isFreelancer ? 'My Service Catalog' : 'Project Solutions'}</h2>
                      {isFreelancer && <button className="btn-primary">New Solution</button>}
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                      <GigCard title="World-Class React Landing Page" price="$250+" rating="5.0" />
                      <GigCard title="Premium Branding & UI Design" price="$600+" rating="4.9" />
                      <GigCard title="Enterprise Node.js Backend" price="$1,200+" rating="5.0" />
                   </div>
                </motion.div>
              )}

              {activeTab === 'my-jobs' && (
                <motion.div key="my-jobs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-10">
                   <h2 className="text-4xl font-black font-display tracking-tight px-4">{isFreelancer ? 'Application Tracking' : 'Active Postings'}</h2>
                   {isFreelancer ? (
                     myProposals.length === 0 ? (
                        <div className="glass-card p-32 rounded-[4rem] text-center opacity-30 space-y-6 border-white/5">
                          <Briefcase className="w-20 h-20 mx-auto text-primary" />
                          <p className="text-2xl font-black tracking-tight uppercase">No Active Proposals</p>
                        </div>
                     ) : (
                        <div className="grid grid-cols-1 gap-6">
                           {myProposals.map(p => (
                             <div key={p.id} className="glass-card p-10 rounded-[3rem] flex justify-between items-center hover:border-primary/30 transition-all group">
                                <div className="space-y-3">
                                   <h4 className="font-black text-2xl tracking-tight group-hover:text-primary transition-colors">Project #{p.jobId.substring(0, 4)} Application</h4>
                                   <p className="text-base text-white/30 font-medium">{p.coverLetter.substring(0, 80)}...</p>
                                </div>
                                <div className="text-right space-y-2">
                                   <span className="block font-black text-primary text-3xl text-glow">{p.bidAmount}</span>
                                   <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full">
                                      <span className="text-[10px] uppercase tracking-[0.3em] font-black text-primary">{p.status}</span>
                                   </div>
                                </div>
                             </div>
                           ))}
                        </div>
                     )
                   ) : (
                     <div className="glass-card p-32 rounded-[4rem] text-center opacity-30 space-y-6 border-white/5">
                        <Plus className="w-20 h-20 mx-auto" />
                        <p className="text-2xl font-black tracking-tight uppercase italic">No active contracts found.</p>
                     </div>
                   )}
                </motion.div>
              )}
           </AnimatePresence>

        </main>

        {/* Right Info Bar (Perfect Alignment) */}
        <aside className="hidden xl:block w-80 shrink-0 space-y-8">
           <div className="glass-card p-10 rounded-[3.5rem] space-y-10 bg-white/[0.01] border-white/10">
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Profile Integrity</h4>
                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '35%' }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                 </div>
                 <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Completeness: <span className="text-white">35%</span></p>
              </div>

              <div className="space-y-5">
                 <SidebarAction icon={ShieldCheck} label="Identity Verified" active={true} color="text-primary" />
                 <SidebarAction icon={CreditCard} label="Finance Method" active={false} color="text-secondary" />
              </div>

              <div className="pt-6 space-y-6 border-t border-white/5">
                 <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Timeline Monitor</h4>
                 <p className="text-xs text-white/30 italic font-medium leading-relaxed">System is active. No pending deadlines detected for your current session.</p>
              </div>
           </div>

           <div className="glass-card p-10 rounded-[3.5rem] space-y-8 bg-gradient-to-br from-primary/10 via-transparent to-transparent border-primary/20 relative overflow-hidden group hover:scale-[1.02] transition-all">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/20 blur-[60px] rounded-full group-hover:bg-primary/30 transition-all duration-700" />
              <div className="relative z-10 space-y-6">
                 <Building2 className="w-12 h-12 text-primary" />
                 <h4 className="text-2xl font-black font-display leading-tight tracking-tight">Form a Specialized Agency</h4>
                 <p className="text-xs text-white/40 leading-relaxed font-medium">Multiply your earning potential by scaling your operations through the Agency system.</p>
                 <button className="w-full py-5 bg-white text-black text-[10px] font-black rounded-[2rem] uppercase tracking-[0.3em] hover:shadow-2xl transition-all shadow-white/10 active:scale-95">Initiate Agency</button>
              </div>
           </div>
        </aside>

      </div>

      {/* --- Modals --- */}
      <AnimatePresence>
         {selectedJob && (
           <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} onApply={handleApply} />
         )}
         {showPostJob && (
           <PostJobModal onClose={() => setShowPostJob(false)} onPost={handlePostJob} />
         )}
      </AnimatePresence>
    </div>
  )
}

// --- Polished Sub-components ---

const QuickStatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="glass-card p-10 rounded-[3.5rem] space-y-8 border-white/10 hover:bg-white/[0.05] transition-all duration-500 group relative overflow-hidden shadow-none hover:shadow-2xl hover:shadow-black/50">
     <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/15 transition-all duration-700"></div>
     <div className="flex items-center justify-between relative z-10">
        <div className={`p-5 rounded-[2rem] bg-white/[0.04] ${color} shadow-inner group-hover:scale-110 transition-transform duration-500`}>
           <Icon className="w-8 h-8" />
        </div>
        <div className="flex flex-col items-end">
           <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{label}</span>
           <div className="flex items-center space-x-1.5 text-green-500 text-[11px] font-black mt-2">
              <TrendingUp className="w-4 h-4" />
              <span className="tracking-widest">+12.5%</span>
           </div>
        </div>
     </div>
     <div className="relative z-10">
        <span className="block text-5xl font-black tracking-tighter font-display text-glow leading-none">{value}</span>
     </div>
  </div>
)

const JobCard = ({ job, onClick }: { job: Job, onClick: () => void }) => (
  <motion.div 
    whileHover={{ x: 15 }}
    onClick={onClick}
    className="glass-card p-12 rounded-[4rem] border-white/10 hover:border-primary/40 transition-all duration-700 cursor-pointer group flex flex-col md:flex-row gap-10 items-start relative overflow-hidden"
  >
     <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
     
     <div className="flex-1 space-y-8 min-w-0 relative z-10">
        <div className="flex flex-wrap items-center gap-6">
           <span className="text-[11px] font-black text-primary bg-primary/10 px-5 py-2 rounded-full uppercase tracking-[0.3em] shadow-inner">{job.category}</span>
           <div className="flex items-center space-x-2 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
              <Clock className="w-4 h-4" /> 
              <span>Published {job.postedAt}</span>
           </div>
        </div>
        <h3 className="text-4xl font-black font-display group-hover:text-primary transition-colors tracking-tight leading-none text-glow-hover">{job.title}</h3>
        <p className="text-lg text-white/40 line-clamp-3 leading-relaxed font-medium">{job.desc}</p>
        <div className="flex items-center gap-10 text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">
           <div className="flex items-center space-x-3 group-hover:text-white/40 transition-colors"><MapPin className="w-4 h-4 text-primary" /> <span>{job.location}</span></div>
           <div className="flex items-center space-x-3 group-hover:text-white/40 transition-colors"><Users className="w-4 h-4 text-secondary" /> <span>{job.proposals} Intentions</span></div>
        </div>
     </div>
     <div className="shrink-0 flex flex-col items-end justify-between self-stretch text-right space-y-8 relative z-10">
        <div className="bg-white/[0.04] p-8 rounded-[3rem] border border-white/5 group-hover:border-primary/30 transition-all shadow-2xl">
           <span className="block text-4xl font-black text-green-400 font-display leading-none text-glow-green">{job.budget}</span>
           <span className="text-[11px] uppercase font-black text-white/20 tracking-[0.4em] mt-3 block">{job.type === 'hourly' ? 'Hourly Performance' : 'Fixed Protocol'}</span>
        </div>
        <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:bg-primary transition-all duration-700 shadow-2xl group-hover:shadow-primary/30 group-hover:translate-x-3">
           <ChevronRight className="w-8 h-8 text-white/30 group-hover:text-white" />
        </div>
     </div>
  </motion.div>
)

const SidebarAction = ({ icon: Icon, label, active, color }: any) => (
  <div className="flex items-center justify-between p-6 bg-white/[0.04] rounded-[2.5rem] border border-white/5 group cursor-pointer hover:bg-white/[0.08] transition-all">
     <div className="flex items-center space-x-4">
        <Icon className={`w-6 h-6 ${color} ${active ? 'opacity-100' : 'opacity-40'}`} />
        <span className={`text-sm font-black uppercase tracking-widest ${active ? 'text-white' : 'text-white/30'}`}>{label}</span>
     </div>
     {active ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Plus className="w-4 h-4 text-white/20 group-hover:text-white" />}
  </div>
)

const FilterOption = ({ label }: { label: string }) => (
  <label className="flex items-center space-x-4 cursor-pointer group">
    <div className="w-6 h-6 rounded-2xl border border-white/10 flex items-center justify-center group-hover:border-primary transition-all duration-300">
       <div className="w-3 h-3 bg-primary rounded-full opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
    </div>
    <span className="text-sm font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{label}</span>
  </label>
)

const JobDetailModal = ({ job, onClose, onApply }: { job: Job, onClose: () => void, onApply: (p: any) => void }) => {
  const [cover, setCover] = useState('')
  const [bid, setBid] = useState(job.budget)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative glass-card w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[4rem] flex flex-col border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)]">
         <div className="p-12 border-b border-white/10 flex justify-between items-start bg-white/[0.01]">
            <div className="space-y-6">
               <span className="text-xs font-black text-primary uppercase tracking-[0.4em]">{job.category}</span>
               <h2 className="text-5xl font-black tracking-tighter leading-none font-display">{job.title}</h2>
               <div className="flex items-center space-x-6 text-sm text-white/30 font-bold uppercase tracking-widest">
                  <span>Origin: <span className="text-white">{job.postedBy}</span></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  <span>{job.location}</span>
               </div>
            </div>
            <button onClick={onClose} className="p-5 bg-white/5 rounded-full hover:bg-white/10 transition-all shadow-2xl border border-white/10"><X className="w-8 h-8" /></button>
         </div>
         
         <div className="flex-1 overflow-y-auto p-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
               <div className="space-y-6">
                  <h4 className="text-xl font-black uppercase tracking-widest text-primary">Intelligence Brief</h4>
                  <p className="text-white/50 leading-relaxed text-xl font-medium">{job.desc}</p>
               </div>
               
               <div className="space-y-8 pt-12 border-t border-white/10">
                  <h4 className="text-xl font-black uppercase tracking-widest text-secondary">Operational Proposal</h4>
                  <div className="space-y-8">
                     <div className="space-y-3">
                        <label className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">Cover Intelligence</label>
                        <textarea 
                          value={cover} 
                          onChange={e=>setCover(e.target.value)}
                          placeholder="Describe your capabilities for this operation..." 
                          className="w-full bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 h-48 focus:border-primary outline-none resize-none transition-all text-lg font-medium placeholder:text-white/5" 
                        />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">Resource Allocation (Bid)</label>
                        <div className="relative">
                           <DollarSign className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                           <input 
                              type="text" 
                              value={bid}
                              onChange={e=>setBid(e.target.value)}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 pl-16 focus:border-primary outline-none transition-all font-black text-2xl" 
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="space-y-10">
               <div className="glass-card p-10 rounded-[3.5rem] space-y-8 bg-white/[0.02] border-white/10">
                  <h4 className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">Operation Specs</h4>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-black uppercase tracking-widest">Protocol</span>
                        <span className="font-black text-green-400 text-xl">{job.budget}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-black uppercase tracking-widest">Format</span>
                        <span className="font-black uppercase text-[11px] tracking-[0.3em] text-white">{job.type}</span>
                     </div>
                  </div>
                  <button 
                    disabled={!cover}
                    onClick={() => onApply({ id: Date.now().toString(), jobId: job.id, freelancerName: 'Current Operator', coverLetter: cover, bidAmount: bid, status: 'pending' })}
                    className="w-full py-6 btn-primary text-xs uppercase tracking-[0.4em] flex items-center justify-center space-x-3 disabled:opacity-20 shadow-2xl"
                  >
                     <Send className="w-5 h-5" />
                     <span>Deploy Proposal</span>
                  </button>
               </div>
               
               <div className="glass-card p-10 rounded-[3.5rem] border-primary/20 bg-primary/5">
                  <h4 className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em] mb-8">Client Dossier</h4>
                  <div className="flex items-center space-x-5 mb-8">
                     <div className="w-14 h-14 rounded-[1.5rem] bg-primary flex items-center justify-center font-black text-2xl text-white shadow-2xl">G</div>
                     <div>
                        <p className="font-black text-lg tracking-tight">Global Tech Corp</p>
                        <p className="text-[10px] text-primary uppercase tracking-[0.3em] font-black">Verified Nexus</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center space-x-3 text-yellow-500"><Star className="w-4 h-4 fill-current" /> <span className="text-sm font-black tracking-widest">4.8 (Global)</span></div>
                     <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]"><MapPin className="w-4 h-4 inline mr-2 text-primary" /> Yerevan Hub</p>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>
    </div>
  )
}

const PostJobModal = ({ onClose, onPost }: { onClose: () => void, onPost: (j: Job) => void }) => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [budget, setBudget] = useState('')
  const [category, setCategory] = useState('Web Engineering')

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative glass-card w-full max-w-3xl rounded-[4rem] p-16 space-y-12 border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)]">
         <div className="flex justify-between items-center">
            <h2 className="text-4xl font-black font-display tracking-tight text-glow">Initiate Project</h2>
            <button onClick={onClose} className="p-5 bg-white/5 rounded-full hover:bg-white/10 transition-all border border-white/10"><X className="w-6 h-6" /></button>
         </div>
         
         <form className="space-y-10" onSubmit={(e) => {
            e.preventDefault()
            onPost({
               id: Date.now().toString(),
               title,
               desc,
               budget,
               category,
               type: 'fixed',
               postedBy: 'Direct Client',
               postedAt: 'Instant',
               location: 'Remote/AM',
               proposals: 0
            })
         }}>
            <div className="space-y-3">
               <label className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em] ml-2">Operation Title</label>
               <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Define the objective..." className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 focus:border-primary outline-none transition-all text-lg font-bold placeholder:text-white/5" />
            </div>
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-3">
                  <label className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em] ml-2">Domain</label>
                  <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full bg-[#050505] border border-white/10 rounded-[2rem] p-6 focus:border-primary outline-none appearance-none cursor-pointer text-sm font-bold uppercase tracking-widest text-white/50">
                     <option>Web Engineering</option>
                     <option>Mobile Systems</option>
                     <option>AI & Architecture</option>
                     <option>Global Marketing</option>
                     <option>Strategic Translation</option>
                  </select>
               </div>
               <div className="space-y-3">
                  <label className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em] ml-2">Allocation (USD)</label>
                  <input required value={budget} onChange={e=>setBudget(e.target.value)} placeholder="e.g. $2,500" className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 focus:border-primary outline-none transition-all font-black text-xl" />
               </div>
            </div>
            <div className="space-y-3">
               <label className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em] ml-2">Objective Requirements</label>
               <textarea required value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Detailed briefing..." rows={4} className="w-full bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 focus:border-primary outline-none resize-none transition-all text-base font-medium placeholder:text-white/5" />
            </div>
            
            <button type="submit" className="w-full py-8 btn-primary text-xs font-black uppercase tracking-[0.5em] shadow-2xl shimmer">Publish Operation</button>
         </form>
      </motion.div>
    </div>
  )
}

const MockFreelancerFeed = () => (
  <>
    {[1, 2, 3].map(i => (
      <motion.div whileHover={{ x: 15 }} key={i} className="glass-card p-12 rounded-[4rem] border-white/10 hover:border-primary/40 transition-all duration-700 cursor-pointer group flex items-center gap-10">
         <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center font-black text-4xl text-primary border border-white/10 shadow-2xl">A</div>
         <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-3">
               <h3 className="text-3xl font-black font-display group-hover:text-primary transition-colors tracking-tight">Armen S.</h3>
               <CheckCircle2 className="w-5 h-5 text-primary shadow-xl" />
            </div>
            <p className="text-[11px] text-white/20 font-black uppercase tracking-[0.4em]">Principal Systems Architect • Armenia</p>
            <p className="text-lg text-white/40 line-clamp-2 leading-relaxed font-medium">Over a decade of engineering high-tier platforms. Specialized in global infrastructure and Armenian digital expansion.</p>
            <div className="flex items-center space-x-8 pt-2">
               <div className="flex items-center space-x-2 text-yellow-500 font-black text-sm tracking-widest"><Star className="w-4 h-4 fill-current" /> <span>5.0 Intelligence</span></div>
               <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">142 Operations Secured</span>
            </div>
         </div>
         <div className="text-right shrink-0 space-y-4">
            <span className="block text-4xl font-black text-white text-glow">$65/hr</span>
            <button className="px-10 py-3 bg-white/[0.04] hover:bg-white text-white hover:text-black rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all border border-white/10 shadow-2xl active:scale-90">Dossier</button>
         </div>
      </motion.div>
    ))}
  </>
)

const GigCard = ({ title, price, rating }: any) => (
  <motion.div whileHover={{ y: -15 }} className="glass-card overflow-hidden rounded-[4rem] group cursor-pointer border-white/10 hover:border-primary/40 transition-all duration-700 shadow-none hover:shadow-2xl">
     <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
        <Sparkles className="w-16 h-16 text-white/5 group-hover:text-white/20 transition-all duration-1000 group-hover:rotate-180" />
     </div>
     <div className="p-10 space-y-6">
        <h3 className="font-black text-2xl group-hover:text-primary transition-colors leading-tight font-display tracking-tight text-glow-hover">{title}</h3>
        <div className="flex justify-between items-center pt-4">
           <div className="flex items-center space-x-2 text-yellow-500 font-black text-xs tracking-widest"><Star className="w-3 h-3 fill-current" /> <span>{rating}</span></div>
           <span className="font-black text-xl text-green-400 text-glow-green">{price}</span>
        </div>
     </div>
  </motion.div>
)

const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Mobile App Developer (React Native) for Taxi Service', desc: 'We are launching a new taxi service in Yerevan and need a robust mobile application for both riders and drivers.', budget: '$3,500', type: 'fixed', category: 'Mobile Systems', postedBy: 'Ani G.', postedAt: '2h ago', location: 'Yerevan, AM', proposals: 12 },
  { id: '2', title: 'UI/UX Designer for Armenian E-commerce Platform', desc: 'Redesigning a major retail website. Looking for modern, clean, and mobile-first design language.', budget: '$45/hr', type: 'hourly', category: 'Intelligence Design', postedBy: 'Levon K.', postedAt: '5h ago', location: 'Dilijan, AM', proposals: 8 },
  { id: '3', title: 'Content Writer (Armenian & English) for Travel Blog', desc: 'Write engaging articles about tourism in Armenia. Must be fluent in both languages.', budget: '$200', type: 'fixed', category: 'Strategic Content', postedBy: 'Sona M.', postedAt: '1d ago', location: 'Remote', proposals: 24 },
]
