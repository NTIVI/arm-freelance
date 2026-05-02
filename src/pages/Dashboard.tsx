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
  MapPin, 
  Clock, 
  ChevronRight,
  CheckCircle2,
  FileText,
  X,
  Sparkles,
  Bell
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
    <div className="flex min-h-screen bg-[#0B0B0F] font-sans selection:bg-primary/20">
      
      {/* --- Sidebar (Professional Slim) --- */}
      <aside className="w-64 border-r border-white/[0.05] flex flex-col fixed inset-y-0 bg-[#0E0E12]">
         <div className="p-8">
            <div className="flex items-center space-x-3 mb-10">
               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-white text-xs">AF</div>
               <span className="font-display font-black text-lg tracking-tight">ARMENIA</span>
            </div>

            <nav className="space-y-1.5">
               <NavItem active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={LayoutGrid} label={t('nav_dashboard')} />
               <NavItem active={activeTab === 'search'} onClick={() => setActiveTab('search')} icon={Search} label={isFreelancer ? t('nav_find') : t('find_talent')} />
               <NavItem active={activeTab === 'my-jobs'} onClick={() => setActiveTab('my-jobs')} icon={Briefcase} label={t('nav_my_jobs')} />
               <NavItem active={activeTab === 'catalog'} onClick={() => setActiveTab('catalog')} icon={FileText} label={t('nav_catalog')} />
               <NavItem active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} icon={MessageSquare} label={t('nav_messages')} />
               <NavItem active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={UserCircle} label={t('nav_settings')} />
            </nav>
         </div>

         <div className="mt-auto p-8 border-t border-white/[0.05]">
            <div className="flex items-center space-x-3 mb-6">
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-sm text-primary">
                  {user.name?.[0]}
               </div>
               <div className="overflow-hidden">
                  <p className="text-sm font-bold truncate">{user.name}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">{user.role}</p>
               </div>
            </div>
            <button onClick={onLogout} className="w-full py-3 text-red-500/50 hover:text-red-400 hover:bg-red-500/5 transition-all text-xs font-bold rounded-lg border border-transparent hover:border-red-500/10">
               {t('logout')}
            </button>
         </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 pl-64">
         
         {/* Top Header Bar */}
         <header className="h-20 border-b border-white/[0.05] bg-[#0B0B0F]/80 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-50">
            <div className="flex-1 max-w-xl">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                  <input type="text" placeholder={t('search_placeholder_freelancer')} className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-2.5 pl-12 pr-4 text-sm focus:border-primary/50 outline-none transition-all placeholder:text-white/10" />
               </div>
            </div>
            
            <div className="flex items-center space-x-6">
               <button className="relative p-2 text-white/30 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[#0B0B0F]" />
               </button>
               {!isFreelancer && (
                  <button onClick={() => setShowPostJob(true)} className="btn-primary flex items-center space-x-2 text-sm">
                     <Plus className="w-4 h-4" />
                     <span>{t('post_job')}</span>
                  </button>
               )}
            </div>
         </header>

         {/* Content Area */}
         <div className="p-10 max-w-6xl mx-auto space-y-10">
            
            <AnimatePresence mode="wait">
               {activeTab === 'home' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-12">
                     
                     {/* Clean Stats */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatItem label="Active Applications" value={myProposals.length.toString()} icon={FileText} trend="+2 from last week" />
                        <StatItem label="Available Connects" value="80" icon={Sparkles} trend="Reset in 12 days" />
                        <StatItem label="Job Success Score" value="100%" icon={CheckCircle2} trend="Top Rated status" />
                     </div>

                     {/* Job Feed */}
                     <div className="space-y-6">
                        <div className="flex justify-between items-end">
                           <div>
                              <h2 className="text-2xl font-bold font-display">{isFreelancer ? 'Jobs for you' : 'Top Talent'}</h2>
                              <p className="text-sm text-white/30 mt-1">Based on your activity and professional profile</p>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                           {isFreelancer ? (
                              jobs.map(job => <JobRow key={job.id} job={job} onClick={() => setSelectedJob(job)} />)
                           ) : (
                              <MockFreelancerFeed />
                           )}
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

         </div>
      </main>

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

// --- Professional Components ---

const NavItem = ({ active, onClick, icon: Icon, label }: any) => (
  <button onClick={onClick} className={`nav-item w-full ${active ? 'active' : ''}`}>
     <Icon className="w-4 h-4" />
     <span>{label}</span>
  </button>
)

const StatItem = ({ label, value, icon: Icon, trend }: any) => (
  <div className="glass-card p-6 bg-[#14141A] hover:border-white/10 transition-all group">
     <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 rounded-lg bg-white/[0.03] text-primary">
           <Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-bold text-green-500/80 bg-green-500/5 px-2 py-1 rounded tracking-tight">{trend}</span>
     </div>
     <p className="text-xs text-white/30 font-medium mb-1">{label}</p>
     <p className="text-3xl font-bold font-display text-white">{value}</p>
  </div>
)

const JobRow = ({ job, onClick }: { job: Job, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-white/[0.02] cursor-pointer group transition-all"
  >
     <div className="flex-1 space-y-2">
        <div className="flex items-center space-x-3">
           <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{job.title}</h3>
           <span className="px-2 py-0.5 bg-white/[0.05] rounded text-[10px] font-bold text-white/40 uppercase tracking-wider">{job.category}</span>
        </div>
        <p className="text-sm text-white/40 line-clamp-1 max-w-2xl">{job.desc}</p>
        <div className="flex items-center space-x-4 text-[11px] text-white/20 font-medium uppercase tracking-widest">
           <span className="flex items-center space-x-1.5"><Clock className="w-3.5 h-3.5" /> <span>{job.postedAt}</span></span>
           <span className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5" /> <span>{job.location}</span></span>
           <span className="flex items-center space-x-1.5"><Users className="w-3.5 h-3.5" /> <span>{job.proposals} Proposals</span></span>
        </div>
     </div>
     <div className="mt-4 md:mt-0 md:ml-10 flex items-center space-x-8">
        <div className="text-right">
           <p className="text-xl font-bold text-white">{job.budget}</p>
           <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">{job.type}</p>
        </div>
        <button className="p-2 rounded-lg bg-white/[0.03] group-hover:bg-primary group-hover:text-white text-white/20 transition-all">
           <ChevronRight className="w-5 h-5" />
        </button>
     </div>
  </div>
)

// --- Other components remain same but with refined radius/spacing ---

const JobDetailModal = ({ job, onClose, onApply }: any) => {
   const [cover, setCover] = useState('')
   return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
         <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} className="relative bg-[#14141A] border border-white/[0.05] w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-10 space-y-6">
               <div className="flex justify-between items-start">
                  <div className="space-y-2">
                     <span className="text-[10px] font-black text-primary uppercase tracking-widest">{job.category}</span>
                     <h2 className="text-3xl font-bold font-display">{job.title}</h2>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-all"><X className="w-5 h-5" /></button>
               </div>
               <p className="text-white/60 leading-relaxed">{job.desc}</p>
               <div className="pt-6 border-t border-white/[0.05] space-y-4">
                  <h4 className="text-sm font-bold">Write Proposal</h4>
                  <textarea value={cover} onChange={e=>setCover(e.target.value)} placeholder="Explain why you are the best fit..." className="w-full h-32 bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 outline-none focus:border-primary/50 transition-all resize-none text-sm" />
                  <button onClick={() => onApply({ id: '1', jobId: job.id, freelancerName: 'You', coverLetter: cover, bidAmount: job.budget, status: 'pending' })} className="btn-primary w-full">Submit Application</button>
               </div>
            </div>
         </motion.div>
      </div>
   )
}

const PostJobModal = ({ onClose, onPost }: any) => {
   const [title, setTitle] = useState('')
   const [desc, setDesc] = useState('')
   return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
         <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} className="relative bg-[#14141A] border border-white/[0.05] w-full max-w-xl rounded-2xl p-10 space-y-8">
            <h2 className="text-2xl font-bold font-display">Post New Project</h2>
            <div className="space-y-4">
               <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest">Title</label>
                  <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg p-3 outline-none focus:border-primary/50" />
               </div>
               <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest">Description</label>
                  <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={4} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg p-3 outline-none focus:border-primary/50" />
               </div>
               <button onClick={() => onPost({ id: '9', title, desc, budget: '$1000', type: 'fixed', category: 'General', postedAt: 'Now', location: 'Remote', proposals: 0 })} className="btn-primary w-full">Publish Project</button>
            </div>
         </motion.div>
      </div>
   )
}

const MockFreelancerFeed = () => (
  <>
    {[1, 2, 3].map(i => (
      <div key={i} className="glass-card p-6 flex items-center justify-between hover:bg-white/[0.02] cursor-pointer transition-all">
         <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">A</div>
            <div>
               <div className="flex items-center space-x-2">
                  <h4 className="font-bold">Armen S.</h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
               </div>
               <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">Senior Developer • 142 Jobs</p>
            </div>
         </div>
         <div className="text-right">
            <p className="font-bold text-white">$65/hr</p>
            <button className="mt-2 px-3 py-1 bg-white/[0.03] hover:bg-primary hover:text-white rounded text-[9px] font-black uppercase tracking-widest transition-all">View Profile</button>
         </div>
      </div>
    ))}
  </>
)

const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Mobile App Developer for Taxi Service', desc: 'We are launching a new taxi service in Yerevan and need a robust mobile application for both riders and drivers.', budget: '$3,500', type: 'fixed', category: 'Mobile Apps', postedBy: 'Ani G.', postedAt: '2h ago', location: 'Yerevan, AM', proposals: 12 },
  { id: '2', title: 'UI/UX Designer for Armenian E-commerce', desc: 'Redesigning a major retail website. Looking for modern, clean, and mobile-first design language.', budget: '$45/hr', type: 'hourly', category: 'UI/UX Design', postedBy: 'Levon K.', postedAt: '5h ago', location: 'Dilijan, AM', proposals: 8 },
  { id: '3', title: 'Content Writer (Armenian & English)', desc: 'Write engaging articles about tourism in Armenia. Must be fluent in both languages.', budget: '$200', type: 'fixed', category: 'Translations', postedBy: 'Sona M.', postedAt: '1d ago', location: 'Remote', proposals: 24 },
]
