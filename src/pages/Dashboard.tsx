import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    <div className="min-h-screen bg-background text-white pt-24 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="lg:w-72 shrink-0 space-y-2">
           <div className="glass-card p-8 rounded-[3rem] mb-6 flex flex-col items-center text-center space-y-4 border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-tr from-primary to-secondary p-1 relative z-10 shadow-2xl">
                 <div className="w-full h-full bg-background rounded-[2.2rem] flex items-center justify-center text-3xl font-black text-white">
                    {user.name?.[0]}
                 </div>
              </div>
              <div className="relative z-10">
                 <h3 className="font-display font-black text-xl tracking-tight">{user.name}</h3>
                 <div className="flex items-center justify-center space-x-2 mt-1">
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">{user.role}</span>
                    {user.verified && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                 </div>
              </div>
           </div>

           <nav className="space-y-2">
             {[
               { id: 'home', label: 'Dashboard', icon: LayoutGrid },
               { id: 'search', label: isFreelancer ? 'Find Work' : 'Find Talent', icon: Search },
               { id: 'my-jobs', label: isFreelancer ? 'My Proposals' : 'My Jobs', icon: Briefcase },
               { id: 'catalog', label: isFreelancer ? 'Manage Services' : 'Project Catalog', icon: LayoutGrid },
               { id: 'messages', label: 'Messages', icon: MessageSquare },
               { id: 'profile', label: 'Profile Settings', icon: UserCircle },
             ].map(item => (
               <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center space-x-4 px-8 py-5 rounded-[2rem] transition-all duration-500 group ${activeTab === item.id ? 'bg-primary text-white shadow-[0_20px_40px_rgba(99,102,241,0.3)]' : 'text-white/40 hover:bg-white/[0.03] hover:text-white'}`}
               >
                  <item.icon className={`w-5 h-5 transition-transform duration-500 group-hover:scale-110 ${activeTab === item.id ? 'text-white' : 'text-primary'}`} />
                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
               </button>
             ))}
           </nav>
           
           <button onClick={onLogout} className="w-full flex items-center space-x-4 px-8 py-5 rounded-[2rem] text-red-500/30 hover:text-red-400 hover:bg-red-500/5 transition-all mt-12 group">
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
              <span className="font-black text-[10px] uppercase tracking-[0.3em]">Logout Session</span>
           </button>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 space-y-8 min-w-0">
           
           {/* Top Actions */}
           <div className="flex items-center justify-between gap-6">
              <div className="flex-1 glass-card p-1.5 rounded-[2rem] flex items-center px-6 border-white/5 bg-white/[0.01] shadow-none focus-within:border-primary/50 transition-all">
                 <Search className="w-5 h-5 text-white/10" />
                 <input type="text" placeholder={isFreelancer ? "Search for high-tier projects..." : "Search for world-class specialists..."} className="bg-transparent border-none outline-none w-full p-4 text-base font-medium placeholder:text-white/10" />
                 <div className="hidden sm:flex items-center space-x-1 px-3 py-1.5 bg-white/[0.03] rounded-xl border border-white/5 text-[9px] font-black text-white/20">
                    <span className="tracking-tighter">CMD</span>
                    <span>K</span>
                 </div>
              </div>
              
              {!isFreelancer && (
                <button onClick={() => setShowPostJob(true)} className="btn-primary flex items-center space-x-3 h-[70px] px-10 shrink-0">
                   <Plus className="w-6 h-6" />
                   <span className="font-black text-sm uppercase tracking-[0.15em]">Post New Project</span>
                </button>
              )}
           </div>

           {/* Content Tabs */}
           <AnimatePresence mode="wait">
              {activeTab === 'home' && (
                <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="space-y-10">
                  
                  {/* Hero Dashboard Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <QuickStatCard label="Earnings this month" value="$0.00" icon={TrendingUp} color="text-green-400" />
                     <QuickStatCard label="Active Applications" value={myProposals.length.toString()} icon={FileText} color="text-primary" />
                     <QuickStatCard label="Available Connects" value="80" icon={Sparkles} color="text-secondary" />
                  </div>

                  <div className="flex justify-between items-end border-b border-white/5 pb-6">
                     <div className="space-y-2">
                        <h2 className="text-3xl font-black font-display tracking-tight">{isFreelancer ? 'Recommended for you' : 'Top Armenian Specialists'}</h2>
                        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">Curated based on your professional DNA</p>
                     </div>
                     <button className="flex items-center space-x-2 text-xs font-black text-primary hover:text-white transition-colors uppercase tracking-widest">
                        <span>View Marketplace</span>
                        <ChevronRight className="w-4 h-4" />
                     </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-8">
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

              {activeTab === 'messages' && (
                <motion.div key="messages" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card h-[600px] rounded-[3rem] overflow-hidden flex flex-col">
                   <div className="p-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
                      <h2 className="text-2xl font-black">Messages</h2>
                      <button className="p-3 bg-white/5 rounded-full hover:bg-white/10"><Plus className="w-5 h-5" /></button>
                   </div>
                   <div className="flex-1 flex items-center justify-center text-center p-12 opacity-30 space-y-4 flex-col">
                      <MessageSquare className="w-16 h-16 text-primary" />
                      <div className="space-y-2">
                        <p className="text-xl font-bold">No active conversations</p>
                        <p className="text-sm max-w-xs">When you reach out to clients or receive an invite, your chats will appear here.</p>
                      </div>
                      <button className="btn-secondary">Start a New Chat</button>
                   </div>
                </motion.div>
              )}

              {activeTab === 'catalog' && (
                <motion.div key="catalog" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                   <div className="flex justify-between items-center">
                      <h2 className="text-3xl font-black">{isFreelancer ? 'My Pre-defined Services' : 'Project Catalog'}</h2>
                      {isFreelancer && <button className="btn-primary">Create a Gig</button>}
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <GigCard title="Modern Landing Page with React" price="Starting at $250" rating="5.0" />
                      <GigCard title="Armenian/English Professional Translation" price="Starting at $50" rating="4.9" />
                      <GigCard title="Social Media Management (30 days)" price="Starting at $400" rating="4.8" />
                   </div>
                </motion.div>
              )}

              {activeTab === 'my-jobs' && (
                <motion.div key="my-jobs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                   <h2 className="text-3xl font-black">{isFreelancer ? 'Your Active Proposals' : 'Your Job Postings'}</h2>
                   {isFreelancer ? (
                     myProposals.length === 0 ? (
                        <div className="glass-card p-20 rounded-[3rem] text-center opacity-30 space-y-4">
                          <Briefcase className="w-16 h-16 mx-auto" />
                          <p className="text-xl font-medium">You haven't submitted any proposals yet.</p>
                        </div>
                     ) : (
                        <div className="grid grid-cols-1 gap-4">
                           {myProposals.map(p => (
                             <div key={p.id} className="glass-card p-8 rounded-[2rem] flex justify-between items-center">
                                <div>
                                   <h4 className="font-bold text-lg">Application for #{p.jobId}</h4>
                                   <p className="text-sm text-white/40 mt-1">{p.coverLetter.substring(0, 60)}...</p>
                                </div>
                                <div className="text-right">
                                   <span className="block font-black text-primary text-xl">{p.bidAmount}</span>
                                   <span className="text-[10px] uppercase tracking-widest font-black text-white/20">{p.status}</span>
                                </div>
                             </div>
                           ))}
                        </div>
                     )
                   ) : (
                     <p className="text-white/30 italic">No job postings found.</p>
                   )}
                </motion.div>
              )}
           </AnimatePresence>

        </main>

        {/* Right Info Bar */}
        <aside className="hidden xl:block w-80 shrink-0 space-y-6">
           <div className="glass-card p-8 rounded-[3rem] space-y-8 bg-white/[0.01]">
              <div className="space-y-2">
                 <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Account Summary</h4>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[35%]" />
                 </div>
                 <p className="text-[10px] text-white/30">Profile completeness: <span className="text-white">35%</span></p>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group cursor-pointer hover:bg-white/10 transition-all">
                    <div className="flex items-center space-x-3">
                       <ShieldCheck className="w-5 h-5 text-primary" />
                       <span className="text-sm font-bold">Identity verified</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white" />
                 </div>
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group cursor-pointer hover:bg-white/10 transition-all">
                    <div className="flex items-center space-x-3">
                       <CreditCard className="w-5 h-5 text-secondary" />
                       <span className="text-sm font-bold">Payment method</span>
                    </div>
                    <Plus className="w-4 h-4 text-white/20 group-hover:text-white" />
                 </div>
              </div>

              <div className="pt-4 space-y-4">
                 <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Upcoming Deadlines</h4>
                 <p className="text-xs text-white/30 italic">No active contracts with deadlines.</p>
              </div>
           </div>

           <div className="glass-card p-8 rounded-[3rem] space-y-6 bg-gradient-to-br from-primary/5 via-transparent to-transparent border-primary/10 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 blur-[40px] rounded-full group-hover:bg-primary/30 transition-all" />
              <div className="relative z-10 space-y-4">
                 <Building2 className="w-10 h-10 text-primary" />
                 <h4 className="text-xl font-black leading-tight">Start an Agency to scale your business</h4>
                 <p className="text-xs text-white/40 leading-relaxed">Collaborate with other specialists under one banner and win bigger projects.</p>
                 <button className="w-full py-4 bg-white text-black text-xs font-black rounded-2xl uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">Create Agency</button>
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

// --- Sub-components ---

const QuickStatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="glass-card p-8 rounded-[3rem] space-y-6 border-white/5 hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden">
     <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
     <div className="flex items-center justify-between relative z-10">
        <div className={`p-4 rounded-2xl bg-white/[0.03] ${color} shadow-inner`}>
           <Icon className="w-8 h-8" />
        </div>
        <div className="flex flex-col items-end">
           <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">{label}</span>
           <div className="flex items-center space-x-1 text-green-500 text-[10px] font-bold mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+12.5%</span>
           </div>
        </div>
     </div>
     <div className="relative z-10">
        <span className="block text-4xl font-black tracking-tighter font-display text-glow">{value}</span>
     </div>
  </div>
)

const JobCard = ({ job, onClick }: { job: Job, onClick: () => void }) => (
  <motion.div 
    whileHover={{ x: 10 }}
    onClick={onClick}
    className="glass-card p-10 rounded-[3.5rem] border-white/5 hover:border-primary/30 transition-all duration-500 cursor-pointer group flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
  >
     <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
     
     <div className="flex-1 space-y-6 min-w-0 relative z-10">
        <div className="flex flex-wrap items-center gap-4">
           <span className="text-[10px] font-black text-primary bg-primary/10 px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">{job.category}</span>
           <div className="flex items-center space-x-2 text-[10px] font-black text-white/20 uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5" /> 
              <span>Posted {job.postedAt}</span>
           </div>
        </div>
        <h3 className="text-3xl font-black font-display group-hover:text-primary transition-colors truncate tracking-tight leading-none">{job.title}</h3>
        <p className="text-base text-white/40 line-clamp-2 leading-relaxed font-medium">{job.desc}</p>
        <div className="flex items-center gap-8 text-[11px] font-black text-white/20 uppercase tracking-widest">
           <div className="flex items-center space-x-2.5 group-hover:text-white/40 transition-colors"><MapPin className="w-4 h-4 text-primary" /> <span>{job.location}</span></div>
           <div className="flex items-center space-x-2.5 group-hover:text-white/40 transition-colors"><Users className="w-4 h-4 text-secondary" /> <span>{job.proposals} Proposals</span></div>
        </div>
     </div>
     <div className="shrink-0 flex flex-col items-end justify-between self-stretch text-right space-y-6 relative z-10">
        <div className="bg-white/[0.03] p-6 rounded-[2rem] border border-white/5 group-hover:border-primary/20 transition-all">
           <span className="block text-3xl font-black text-green-400 font-display leading-none">{job.budget}</span>
           <span className="text-[10px] uppercase font-black text-white/20 tracking-[0.3em] mt-2 block">{job.type === 'hourly' ? 'Hourly' : 'Fixed Price'}</span>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-xl group-hover:shadow-primary/20 group-hover:translate-x-2">
           <ChevronRight className="w-6 h-6 text-white/20 group-hover:text-white" />
        </div>
     </div>
  </motion.div>
)

const JobDetailModal = ({ job, onClose, onApply }: { job: Job, onClose: () => void, onApply: (p: any) => void }) => {
  const [cover, setCover] = useState('')
  const [bid, setBid] = useState(job.budget)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[3rem] flex flex-col">
         <div className="p-10 border-b border-white/5 flex justify-between items-start">
            <div className="space-y-4">
               <span className="text-xs font-black text-primary uppercase tracking-widest">{job.category}</span>
               <h2 className="text-4xl font-black tracking-tight leading-none">{job.title}</h2>
               <div className="flex items-center space-x-4 text-sm text-white/40">
                  <span>Posted by <span className="text-white font-bold">{job.postedBy}</span></span>
                  <span>•</span>
                  <span>{job.location}</span>
               </div>
            </div>
            <button onClick={onClose} className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-all"><X className="w-6 h-6" /></button>
         </div>
         
         <div className="flex-1 overflow-y-auto p-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
               <div className="space-y-4">
                  <h4 className="text-lg font-bold">Job Description</h4>
                  <p className="text-white/60 leading-relaxed text-lg">{job.desc}</p>
               </div>
               
               <div className="space-y-4 pt-8 border-t border-white/5">
                  <h4 className="text-lg font-bold">Submit Your Proposal</h4>
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-widest">Your Cover Letter</label>
                        <textarea 
                          value={cover} 
                          onChange={e=>setCover(e.target.value)}
                          placeholder="Tell the client why you're a good fit..." 
                          className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 h-40 focus:border-primary outline-none resize-none transition-all" 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-widest">Bid Amount</label>
                        <div className="relative">
                           <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                           <input 
                              type="text" 
                              value={bid}
                              onChange={e=>setBid(e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 pl-14 focus:border-primary outline-none transition-all font-bold" 
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="space-y-8">
               <div className="glass-card p-8 rounded-[2.5rem] space-y-6 bg-white/[0.02]">
                  <h4 className="text-xs font-black text-white/20 uppercase tracking-widest">Project Summary</h4>
                  <div className="space-y-4">
                     <div className="flex justify-between">
                        <span className="text-white/40 text-xs">Budget</span>
                        <span className="font-bold text-green-400">{job.budget}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-white/40 text-xs">Project Type</span>
                        <span className="font-bold uppercase text-[10px] tracking-widest">{job.type}</span>
                     </div>
                  </div>
                  <button 
                    disabled={!cover}
                    onClick={() => onApply({ id: Date.now().toString(), jobId: job.id, freelancerName: 'Current User', coverLetter: cover, bidAmount: bid, status: 'pending' })}
                    className="w-full py-5 btn-primary text-sm uppercase tracking-widest flex items-center justify-center space-x-2 disabled:opacity-30"
                  >
                     <Send className="w-4 h-4" />
                     <span>Submit Proposal</span>
                  </button>
               </div>
               
               <div className="glass-card p-8 rounded-[2.5rem] border-primary/20 bg-primary/5">
                  <h4 className="text-xs font-black text-white/20 uppercase tracking-widest mb-4">About the Client</h4>
                  <div className="flex items-center space-x-3 mb-4">
                     <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold">G</div>
                     <div>
                        <p className="font-bold text-sm">Global Tech Inc.</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest">Verified Client</p>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex items-center space-x-2 text-yellow-500"><Star className="w-3 h-3 fill-current" /> <span className="text-xs font-bold">4.8 (42 jobs posted)</span></div>
                     <p className="text-[10px] text-white/40"><MapPin className="w-3 h-3 inline mr-1" /> San Francisco, CA</p>
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
  const [category, setCategory] = useState('Web Development')

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative glass-card w-full max-w-2xl rounded-[3rem] p-12 space-y-8">
         <div className="flex justify-between items-center">
            <h2 className="text-3xl font-black">Post a New Job</h2>
            <button onClick={onClose} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all"><X className="w-5 h-5" /></button>
         </div>
         
         <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault()
            onPost({
               id: Date.now().toString(),
               title,
               desc,
               budget,
               category,
               type: 'fixed',
               postedBy: 'You',
               postedAt: 'Just now',
               location: 'Yerevan, AM',
               proposals: 0
            })
         }}>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-white/20 uppercase tracking-widest">Project Title</label>
               <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Need an Armenian speaking content manager" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-primary outline-none transition-all" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-white/20 uppercase tracking-widest">Category</label>
               <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full bg-[#121214] border border-white/10 rounded-2xl p-5 focus:border-primary outline-none appearance-none cursor-pointer">
                  <option>Web Development</option>
                  <option>Mobile Apps</option>
                  <option>UI/UX Design</option>
                  <option>Marketing</option>
                  <option>Translations</option>
               </select>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-white/20 uppercase tracking-widest">Description</label>
               <textarea required value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Describe the requirements..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-primary outline-none resize-none transition-all" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-white/20 uppercase tracking-widest">Estimated Budget (USD)</label>
               <input required value={budget} onChange={e=>setBudget(e.target.value)} placeholder="e.g. $500 - $1,000" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-primary outline-none transition-all font-bold" />
            </div>
            
            <button type="submit" className="w-full py-6 btn-primary text-lg font-black uppercase tracking-widest shadow-2xl">Publish Project</button>
         </form>
      </motion.div>
    </div>
  )
}

const MockFreelancerFeed = () => (
  <>
    {[1, 2, 3, 4].map(i => (
      <motion.div whileHover={{ x: 10 }} key={i} className="glass-card p-8 rounded-[2.5rem] border-white/5 hover:border-primary/30 transition-all cursor-pointer group flex items-center gap-6">
         <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center font-black text-2xl text-primary border border-white/10">A</div>
         <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
               <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Armen S.</h3>
               <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Senior Full-stack Developer • Yerevan</p>
            <p className="text-sm text-white/60 line-clamp-2">12+ years experience in Node.js and React. Specialized in high-load Armenian e-commerce projects.</p>
            <div className="flex items-center space-x-4 pt-2">
               <div className="flex items-center space-x-1 text-yellow-500 font-bold text-xs"><Star className="w-3 h-3 fill-current" /> <span>5.0</span></div>
               <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">142 jobs completed</span>
            </div>
         </div>
         <div className="text-right shrink-0">
            <span className="block text-2xl font-black text-white">$65/hr</span>
            <button className="mt-4 px-6 py-2 bg-white/5 hover:bg-white text-white hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">View Profile</button>
         </div>
      </motion.div>
    ))}
  </>
)

const GigCard = ({ title, price, rating }: any) => (
  <motion.div whileHover={{ y: -10 }} className="glass-card overflow-hidden rounded-[2.5rem] group cursor-pointer border-white/5 hover:border-primary/30 transition-all">
     <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <Sparkles className="w-12 h-12 text-white/10 group-hover:text-white/30 transition-all" />
     </div>
     <div className="p-6 space-y-4">
        <h3 className="font-bold text-lg group-hover:text-primary transition-colors leading-tight">{title}</h3>
        <div className="flex justify-between items-center pt-2">
           <div className="flex items-center space-x-1 text-yellow-500 font-bold text-xs"><Star className="w-3 h-3 fill-current" /> <span>{rating}</span></div>
           <span className="font-black text-sm text-green-400">{price}</span>
        </div>
     </div>
  </motion.div>
)

const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Need a Mobile App Developer (React Native) for Taxi Service', desc: 'We are launching a new taxi service in Yerevan and need a robust mobile application for both riders and drivers.', budget: '$3,500', type: 'fixed', category: 'Mobile Apps', postedBy: 'Ani G.', postedAt: '2h ago', location: 'Yerevan, AM', proposals: 12 },
  { id: '2', title: 'UI/UX Designer for Armenian E-commerce Platform', desc: 'Redesigning a major retail website. Looking for modern, clean, and mobile-first design language.', budget: '$45/hr', type: 'hourly', category: 'UI/UX Design', postedBy: 'Levon K.', postedAt: '5h ago', location: 'Dilijan, AM', proposals: 8 },
  { id: '3', title: 'Content Writer (Armenian & English) for Travel Blog', desc: 'Write engaging articles about tourism in Armenia. Must be fluent in both languages.', budget: '$200', type: 'fixed', category: 'Translations', postedBy: 'Sona M.', postedAt: '1d ago', location: 'Remote', proposals: 24 },
]
