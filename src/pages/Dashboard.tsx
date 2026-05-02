import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { 
  Search, 
  Plus, 
  Briefcase, 
  MessageSquare, 
  LayoutGrid, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  Star, 
  Send, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Settings, 
  Bell, 
  Filter,
  ArrowUpRight
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
  complexity?: 'Entry' | 'Intermediate' | 'Expert';
}

interface Proposal {
  id: string;
  jobId: string;
  jobTitle: string;
  freelancerName: string;
  coverLetter: string;
  bidAmount: string;
  status: 'pending' | 'accepted' | 'declined';
  date: string;
}

// --- Main Dashboard ---

export const Dashboard = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
  useLanguage()
  const [activeTab, setActiveTab] = useState<'home' | 'my-jobs' | 'messages' | 'profile' | 'catalog'>('home')
  const [showPostJob, setShowPostJob] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [jobs, setJobs] = useState<Job[]>([])
  const [myProposals, setMyProposals] = useState<Proposal[]>([])
  
  const isFreelancer = user.role === 'freelancer'

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('af_global_jobs') || '[]')
    setJobs(savedJobs.length > 0 ? savedJobs : MOCK_JOBS)
    
    const savedProposals = JSON.parse(localStorage.getItem(`af_proposals_${user.username}`) || '[]')
    setMyProposals(savedProposals)
  }, [user.username])

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [jobs, searchQuery])

  const handlePostJob = (newJob: Job) => {
    const updatedJobs = [newJob, ...jobs]
    setJobs(updatedJobs)
    localStorage.setItem('af_global_jobs', JSON.stringify(updatedJobs))
    setShowPostJob(false)
  }

  const handleApply = (proposal: Proposal) => {
    const updatedProposals = [proposal, ...myProposals]
    setMyProposals(updatedProposals)
    localStorage.setItem(`af_proposals_${user.username}`, JSON.stringify(updatedProposals))
    setSelectedJob(null)
  }

  return (
    <div className="min-h-screen bg-background text-white font-sans flex overflow-hidden">
      
      {/* --- Sidebar (VK Style) --- */}
      <aside className="w-64 flex flex-col h-screen shrink-0 bg-surface/80 border-r border-border">
         <div className="p-6">
            <h1 className="text-xl font-bold text-primary tracking-tight">ARM Freelance</h1>
         </div>

         <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
            <SidebarLink 
               active={activeTab === 'home'} 
               onClick={() => setActiveTab('home')} 
               icon={LayoutGrid} 
               label="Моя страница" 
            />
            <SidebarLink 
               active={activeTab === 'catalog'} 
               onClick={() => setActiveTab('catalog')} 
               icon={Search} 
               label="Поиск работы" 
            />
            <SidebarLink 
               active={activeTab === 'messages'} 
               onClick={() => setActiveTab('messages')} 
               icon={MessageSquare} 
               label="Сообщения" 
               badge="3"
            />
            <SidebarLink 
               active={activeTab === 'my-jobs'} 
               onClick={() => setActiveTab('my-jobs')} 
               icon={Briefcase} 
               label={isFreelancer ? "Мои отклики" : "Мои заказы"} 
            />
            
            <div className="my-4 border-t border-border/50 mx-4" />
            
            <SidebarLink 
               active={activeTab === 'profile'} 
               onClick={() => setActiveTab('profile')} 
               icon={Settings} 
               label="Настройки" 
            />
         </nav>

         <div className="p-4 border-t border-border">
            <button 
               onClick={onLogout}
               className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-white/40 hover:text-white/80 transition-colors rounded-lg hover:bg-white/5"
            >
               <X className="w-4 h-4" />
               <span>Выйти</span>
            </button>
         </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
         
         {/* Top Header */}
         <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-surface/30 backdrop-blur-md shrink-0">
            <div className="flex items-center space-x-4 flex-1 max-w-xl">
               <Search className="w-4 h-4 text-white/20" />
               <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, talent, or services..." 
                  className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder:text-white/10" 
               />
            </div>
            <div className="flex items-center space-x-6">
               <div className="flex items-center space-x-2 text-xs font-bold text-white/40">
                  <Bell className="w-4 h-4" />
                  <span>3 Notifications</span>
               </div>
               {!isFreelancer && (
                  <button onClick={() => setShowPostJob(true)} className="btn-primary flex items-center space-x-2 text-xs">
                     <Plus className="w-4 h-4" />
                     <span>Post Job</span>
                  </button>
               )}
            </div>
         </header>

         {/* Scrollable Feed */}
         <div className="flex-1 overflow-y-auto bg-[#0D1117] p-8">
            <div className="max-w-6xl mx-auto flex gap-10">
               
               {/* Left Column (Feed) */}
               <div className="flex-1 space-y-8">
                  <AnimatePresence mode="wait">
                     {activeTab === 'home' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                           <div className="flex justify-between items-end">
                              <div>
                                 <h1 className="text-3xl font-bold tracking-tight mb-2">Recommended for you</h1>
                                 <p className="text-sm text-white/40">Based on your skills and search history</p>
                              </div>
                              <div className="flex items-center space-x-4">
                                 <button className="text-xs font-bold text-white/20 hover:text-white transition-colors">Most Recent</button>
                                 <button className="text-xs font-bold text-primary">Best Match</button>
                              </div>
                           </div>

                           <div className="space-y-4">
                              {filteredJobs.map(job => (
                                 <PCJobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
                              ))}
                           </div>
                        </motion.div>
                     )}

                     {activeTab === 'my-jobs' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                           <h1 className="text-2xl font-bold">My Active Applications</h1>
                           <div className="grid grid-cols-1 gap-4">
                              {myProposals.map(p => (
                                 <div key={p.id} className="glass-card p-6 rounded-xl flex justify-between items-center hover:bg-white/[0.02] transition-colors border-white/5">
                                    <div className="space-y-1">
                                       <div className="flex items-center space-x-2">
                                          <span className={`w-2 h-2 rounded-full ${p.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{p.status}</span>
                                       </div>
                                       <h3 className="font-bold text-lg">{p.jobTitle}</h3>
                                       <p className="text-sm text-white/30 truncate max-w-md">{p.coverLetter}</p>
                                    </div>
                                    <div className="text-right">
                                       <p className="font-bold text-xl">{p.bidAmount}</p>
                                       <p className="text-[10px] text-white/20">{p.date}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>

               {/* Right Column (Info/Filters - PC Only) */}
               <div className="w-80 shrink-0 space-y-8 hidden xl:block">
                  
                  {/* Account Snapshot */}
                  <div className="glass-card p-6 rounded-2xl space-y-6 bg-surface/80 border-white/5">
                     <h4 className="text-[11px] font-bold text-white/20 uppercase tracking-widest">My Snapshot</h4>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                           <span className="text-white/40">Connects</span>
                           <span className="font-bold">80</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                           <span className="text-white/40">Earnings</span>
                           <span className="font-bold text-green-400">$0.00</span>
                        </div>
                        <div className="pt-4 border-t border-white/5 space-y-3">
                           <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Profile Strength</p>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-primary w-[45%]" />
                           </div>
                           <p className="text-right text-[10px] text-primary font-bold">45% Complete</p>
                        </div>
                     </div>
                  </div>

                  {/* Quick Filters */}
                  <div className="glass-card p-6 rounded-2xl space-y-6 border-white/5">
                     <div className="flex items-center justify-between">
                        <h4 className="text-[11px] font-bold text-white/20 uppercase tracking-widest">Filters</h4>
                        <Filter className="w-3 h-3 text-white/20" />
                     </div>
                     <div className="space-y-4">
                        <PCFilterOption label="Armenian Market" checked />
                        <PCFilterOption label="Payment Verified" />
                        <PCFilterOption label="Fixed Budget" />
                        <PCFilterOption label="Hourly Rate" />
                     </div>
                  </div>

                  {/* Pro Tip */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/20 space-y-4">
                     <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                     </div>
                     <h4 className="font-bold text-lg leading-tight">Scale to Agency</h4>
                     <p className="text-xs text-white/60 leading-relaxed">Expand your horizon by building a team. Agencies on AF win 2.5x larger contracts on average.</p>
                     <button className="w-full py-3 bg-white text-black text-[10px] font-bold rounded-lg uppercase tracking-widest hover:bg-white/90 transition-colors">Learn More</button>
                  </div>

               </div>

            </div>
         </div>

      </main>

      {/* --- Modals --- */}
      <AnimatePresence>
         {selectedJob && (
           <PCJobModal job={selectedJob} onClose={() => setSelectedJob(null)} onApply={handleApply} />
         )}
         {showPostJob && (
           <PostJobModal onClose={() => setShowPostJob(false)} onPost={handlePostJob} />
         )}
      </AnimatePresence>
    </div>
  )
}

// --- Sub-components ---

const SidebarLink = ({ icon: Icon, label, active, onClick, badge }: any) => (
   <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${active ? 'bg-white/10 text-white font-bold' : 'text-white/40 hover:bg-white/5 hover:text-white/80'}`}
   >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-white/30'}`}>
         <Icon className="w-4 h-4" />
      </div>
      <span className="text-sm flex-1 text-left">{label}</span>
      {badge && (
         <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded-full">{badge}</span>
      )}
   </button>
)

// --- PC Optimized Sub-components ---

const PostJobModal = ({ onClose, onPost }: { onClose: () => void, onPost: (j: Job) => void }) => {
   const [title, setTitle] = useState('')
   const [desc, setDesc] = useState('')
   const [budget, setBudget] = useState('')
   const [category, setCategory] = useState('Engineering')

   return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
         <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-surface w-full max-w-2xl overflow-hidden rounded-2xl p-8 border border-border shadow-2xl space-y-8">
            <div className="flex justify-between items-center">
               <h2 className="text-2xl font-bold tracking-tight uppercase">Initiate Project</h2>
               <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors"><X className="w-6 h-6" /></button>
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
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-2">Strategic Title</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Lead React Systems Architect" className="w-full bg-black/20 border border-border rounded-xl p-4 focus:border-primary outline-none text-sm transition-all" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-2">Category</label>
                     <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-black/20 border border-border rounded-xl p-4 focus:border-primary outline-none text-sm appearance-none cursor-pointer">
                        <option>Engineering</option>
                        <option>Design</option>
                        <option>Marketing</option>
                        <option>Writing</option>
                        <option>AI Services</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-2">Budget (USD)</label>
                     <input required value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. $5,000" className="w-full bg-black/20 border border-border rounded-xl p-4 focus:border-primary outline-none text-sm transition-all font-bold" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-2">Parameters (Description)</label>
                  <textarea required value={desc} onChange={e => setDesc(e.target.value)} placeholder="Outline the technical requirements..." rows={4} className="w-full bg-black/20 border border-border rounded-xl p-6 focus:border-primary outline-none resize-none transition-all text-sm leading-relaxed" />
               </div>

               <button type="submit" className="w-full btn-primary py-4 text-xs font-bold uppercase tracking-widest shadow-xl">Deploy to Marketplace</button>
            </form>
         </motion.div>
      </div>
   )
}

const PCJobCard = ({ job, onClick }: { job: Job, onClick: () => void }) => (
   <div 
      onClick={onClick}
      className="glass-card p-8 rounded-2xl border-white/5 hover:border-primary/30 transition-all cursor-pointer group hover:bg-white/[0.01]"
   >
      <div className="flex justify-between items-start mb-6">
         <div className="space-y-2">
            <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-primary/80">
               <span className="px-3 py-1 bg-primary/10 rounded-md border border-primary/20">{job.category}</span>
               <span className="text-white/20">Posted {job.postedAt}</span>
            </div>
            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
         </div>
         <div className="text-right">
            <p className="text-2xl font-bold text-white/90">{job.budget}</p>
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{job.type === 'hourly' ? 'Hourly' : 'Fixed Price'}</p>
         </div>
      </div>
      
      <p className="text-sm text-white/50 leading-relaxed mb-6 line-clamp-2">{job.desc}</p>
      
      <div className="flex items-center justify-between border-t border-white/5 pt-6">
         <div className="flex items-center space-x-8 text-[11px] font-bold text-white/30 uppercase tracking-widest">
            <div className="flex items-center space-x-2"><MapPin className="w-3.5 h-3.5" /> <span>{job.location}</span></div>
            <div className="flex items-center space-x-2"><ShieldCheck className="w-3.5 h-3.5 text-green-500/50" /> <span>Verified Payment</span></div>
            <div className="flex items-center space-x-2"><Star className="w-3.5 h-3.5 text-yellow-500/50" /> <span>Rating 4.9</span></div>
         </div>
         <button className="p-2 bg-white/5 rounded-lg hover:bg-primary transition-all text-white/20 hover:text-white">
            <ArrowUpRight className="w-5 h-5" />
         </button>
      </div>
   </div>
)

const PCFilterOption = ({ label, checked }: { label: string, checked?: boolean }) => (
   <label className="flex items-center space-x-3 cursor-pointer group">
      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${checked ? 'bg-primary border-primary' : 'border-white/10 group-hover:border-primary/40'}`}>
         {checked && <CheckCircle2 className="w-3 h-3 text-white" />}
      </div>
      <span className={`text-xs ${checked ? 'text-white' : 'text-white/40 group-hover:text-white/60'} transition-colors`}>{label}</span>
   </label>
)

const PCJobModal = ({ job, onClose, onApply }: { job: Job, onClose: () => void, onApply: (p: any) => void }) => {
   const [cover, setCover] = useState('')
   const [bid, setBid] = useState(job.budget)

   return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
         <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-surface w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl flex flex-col border border-border shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-8 border-b border-border flex justify-between items-start">
               <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-[10px] font-bold text-primary uppercase tracking-widest">
                     <Briefcase className="w-3.5 h-3.5" />
                     <span>Job Description</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">{job.title}</h2>
               </div>
               <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors"><X className="w-6 h-6" /></button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8 grid grid-cols-3 gap-10">
               <div className="col-span-2 space-y-10">
                  <div className="space-y-4">
                     <h4 className="text-sm font-bold text-white/20 uppercase tracking-widest">Details</h4>
                     <p className="text-base text-white/70 leading-relaxed">{job.desc}</p>
                  </div>
                  
                  <div className="space-y-6 pt-10 border-t border-border">
                     <h4 className="text-sm font-bold text-white/20 uppercase tracking-widest">Submit Proposal</h4>
                     <div className="space-y-4">
                        <textarea 
                           value={cover}
                           onChange={e=>setCover(e.target.value)}
                           placeholder="Why are you the right fit for this project?" 
                           className="w-full bg-black/20 border border-border rounded-xl p-6 h-48 focus:border-primary outline-none text-sm transition-all resize-none"
                        />
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-2">Your Bid</label>
                              <div className="relative">
                                 <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                 <input type="text" value={bid} onChange={e=>setBid(e.target.value)} className="w-full bg-black/20 border border-border rounded-xl p-4 pl-10 focus:border-primary outline-none text-sm" />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-2">Project Duration</label>
                              <select className="w-full bg-black/20 border border-border rounded-xl p-4 focus:border-primary outline-none text-sm appearance-none">
                                 <option>Less than 1 month</option>
                                 <option>1-3 months</option>
                                 <option>Long term</option>
                              </select>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-8">
                  <div className="p-6 rounded-2xl bg-white/5 border border-border space-y-6">
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-white/40">Budget</span>
                        <span className="font-bold">{job.budget}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-white/40">Type</span>
                        <span className="font-bold capitalize">{job.type}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-white/40">Complexity</span>
                        <span className="font-bold">Expert</span>
                     </div>
                     <button 
                        disabled={!cover}
                        onClick={() => onApply({ id: Date.now().toString(), jobId: job.id, jobTitle: job.title, freelancerName: 'You', coverLetter: cover, bidAmount: bid, status: 'pending', date: 'Just now' })}
                        className="w-full btn-primary disabled:opacity-20 flex items-center justify-center space-x-2"
                     >
                        <Send className="w-4 h-4" />
                        <span>Submit Proposal</span>
                     </button>
                  </div>

                  <div className="p-6 space-y-6">
                     <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-widest">About the Client</h4>
                     <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-white/10 rounded-lg" />
                        <div>
                           <p className="text-sm font-bold">{job.postedBy}</p>
                           <p className="text-[10px] text-white/40 tracking-widest">Verified Client</p>
                        </div>
                     </div>
                     <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-xs text-yellow-500 font-bold">
                           <Star className="w-3.5 h-3.5 fill-current" />
                           <span>4.9 of 12 reviews</span>
                        </div>
                        <p className="text-xs text-white/40 flex items-center space-x-2"><MapPin className="w-3 h-3" /> <span>{job.location}</span></p>
                     </div>
                  </div>
               </div>
            </div>

         </motion.div>
      </div>
   )
}

const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Senior React Developer for Fintech SaaS', desc: 'Looking for an experienced engineer to build the core architecture of a new financial platform. Experience with Web3 and high-load systems is a plus.', budget: '$8,500', type: 'fixed', category: 'Engineering', postedBy: 'Vahagn A.', postedAt: '2h ago', location: 'Yerevan, AM', proposals: 12 },
  { id: '2', title: 'Lead UI Designer for Mobile Marketplace', desc: 'We need a complete design overhaul for our flagship mobile app. Focus on clean typography and motion design.', budget: '$65/hr', type: 'hourly', category: 'Design', postedBy: 'Sona M.', postedAt: '5h ago', location: 'Dilijan, AM', proposals: 8 },
  { id: '3', title: 'Content Strategist & Copywriter', desc: 'Developing brand voice and documentation for a growing tech startup. Must be fluent in Armenian and English.', budget: '$1,200', type: 'fixed', category: 'Marketing', postedBy: 'Davit K.', postedAt: '1d ago', location: 'Remote', proposals: 24 },
]
