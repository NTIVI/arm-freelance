import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  DollarSign, 
  Send, 
  Building2,
  Clock,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  User as UserIcon,
  Layers,
  Zap,
  Calendar,
  ArrowUpRight,
  Command,
  Shield,
  MessageSquare,
  Sparkles
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, user, applyToJob, hireSpecialist, completeJob, proposals, users } = useAppContext();
  const [job, setJob] = useState<any>(null);
  const [showApply, setShowApply] = useState(false);
  const [applied, setApplied] = useState(false);
  const [proposal, setProposal] = useState({ bid: '', coverLetter: '' });
  const [selectedFreelancerIndex, setSelectedFreelancerIndex] = useState<number | null>(null);

  useEffect(() => {
    const foundJob = jobs.find(j => j.id === id);
    if (foundJob) setJob(foundJob);
  }, [id, jobs]);

  const jobProposals = proposals.filter(p => p.jobId === id);
  const isOwner = user?.id === job?.clientId;

  const currentFreelancer = selectedFreelancerIndex !== null 
    ? users.find(u => u.id === jobProposals[selectedFreelancerIndex]?.freelancerId) 
    : null;

  const handleNext = () => {
    if (selectedFreelancerIndex !== null && selectedFreelancerIndex < jobProposals.length - 1) {
      setSelectedFreelancerIndex(selectedFreelancerIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedFreelancerIndex !== null && selectedFreelancerIndex > 0) {
      setSelectedFreelancerIndex(selectedFreelancerIndex - 1);
    }
  };

  if (!job) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    applyToJob({
      jobId: job.id,
      freelancerId: user.id,
      freelancerName: user.fullName,
      bid: proposal.bid,
      coverLetter: proposal.coverLetter
    });
    
    setApplied(true);
    setTimeout(() => { 
      setShowApply(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white relative overflow-hidden">
      <BackgroundMesh />
      
      <div className="max-w-7xl mx-auto px-10 py-20 relative z-10">
        {/* Modern Navigation Header */}
        <div className="flex items-center justify-between mb-24">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="flex items-center gap-6 text-label text-[9px] text-black/30 hover:text-black transition-all group"
          >
            <div className="w-12 h-12 bg-white border border-black/5 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-700 shadow-sm">
               <ArrowLeft className="w-5 h-5" />
            </div>
            Back to Registry
          </button>
          
          <div className="flex items-center gap-6">
             <div className="flex bg-zinc-50 p-1.5 rounded-full border border-black/5">
                <span className="px-5 py-2 text-label text-[8px] text-black/20">Protocol ID: {job.id.substr(0, 8).toUpperCase()}</span>
                <div className="w-[1px] h-4 bg-black/5 self-center"></div>
                <span className="px-5 py-2 text-label text-[8px]">{job.category}</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-24">
            {/* Project Hero Title */}
            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <div className="px-6 py-2 bg-emerald-500 text-white rounded-full text-label text-[8px] shadow-xl shadow-emerald-500/20 animate-pulse">Live Recruitment</div>
                <div className="flex items-center gap-3 text-label text-[8px] text-black/20">
                   <Clock className="w-4 h-4" /> Active for 24h
                </div>
              </div>
              <h1 className="text-display text-9xl md:text-[10rem] lg:text-[12rem] italic leading-[0.8] tracking-tighter mix-blend-difference">{job.title}</h1>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <MetricCard icon={DollarSign} label="Allocated Capital" value={`$${job.budget}`} />
              <MetricCard icon={Briefcase} label="Deployment Type" value={job.type === 'fixed' ? 'FIXED-COST' : 'STREAM-BASED'} />
              <MetricCard icon={Calendar} label="Timeline Target" value={job.deadline || 'AGILE-FLEX'} />
            </div>

            {/* Brief / Requirements */}
            <div className="premium-card p-16 bg-zinc-50/50 border-none space-y-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000">
                 <Command className="w-48 h-48" />
              </div>
              <div className="flex items-center gap-6 relative z-10">
                 <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white rotate-6 group-hover:rotate-0 transition-transform duration-700">
                    <Layers className="w-6 h-6" />
                 </div>
                 <h3 className="text-display text-3xl italic">Mission Scope</h3>
              </div>
              <p className="text-gray-500 text-2xl leading-relaxed italic font-medium relative z-10">"{job.description}"</p>
              
              <div className="pt-10 flex flex-wrap gap-4 relative z-10">
                 {['Architecture', 'Infrastructure', 'Scaling', 'AI Alignment'].map(tag => (
                   <span key={tag} className="px-6 py-2 bg-white border border-black/5 rounded-full text-label text-[7px] text-black/40">{tag}</span>
                 ))}
              </div>
            </div>

            {/* Applicant Flow (Client Side) */}
            {isOwner && (
              <div className="space-y-16 pt-20">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-display text-6xl italic leading-none">Bids Inventory</h3>
                    <p className="text-label text-black/20 tracking-[0.4em]">{jobProposals.length} Verified Submissions</p>
                  </div>
                  <div className="flex gap-3">
                     <button className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all"><Command className="w-4 h-4" /></button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-10">
                  {jobProposals.length === 0 ? (
                    <div className="py-40 flex flex-col items-center justify-center premium-card border-dashed">
                      <UserIcon className="w-20 h-20 text-black/10 mb-8" />
                      <p className="text-label">Registry Null for this project</p>
                    </div>
                  ) : (
                    jobProposals.map((p: any, index: number) => (
                      <ModernProposalCard 
                        key={p.id} 
                        proposal={p} 
                        job={job} 
                        onOpenProfile={() => setSelectedFreelancerIndex(index)} 
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Authority Sidebar */}
          <div className="lg:col-span-4">
            <div className="premium-card p-16 space-y-12 bg-white border-black/5 sticky top-20 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.06)]">
              <div className="flex flex-col items-center text-center space-y-8">
                <div className="w-24 h-24 bg-black rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl rotate-6 hover:rotate-0 transition-transform duration-700">
                  <Building2 className="w-12 h-12" />
                </div>
                <div>
                  <h4 className="text-display text-3xl italic leading-none">{job.clientName}</h4>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <div className="px-5 py-2 bg-emerald-500 text-white rounded-full text-label text-[8px] shadow-xl shadow-emerald-500/10">Authority Confirmed</div>
                  </div>
                </div>
              </div>

              <div className="space-y-8 pt-8 border-t border-black/5">
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-label text-[7px] text-black/30">Engagement Index</span>
                    <span className="text-label text-[8px]">{job.proposalsCount} Bids Active</span>
                  </div>
                  <div className="h-1.5 bg-zinc-50 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: (job.proposalsCount * 10) + '%' }} className="h-full bg-black"></motion.div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-label text-[7px] text-black/40">
                   <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 24h avg. response</span>
                   <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Secure Contract</span>
                </div>
              </div>

              <div className="space-y-4">
                {user?.role === 'freelancer' && !applied && job.status === 'open' && (
                  <button 
                    onClick={() => setShowApply(true)} 
                    className="btn-lux w-full py-10 text-lg shadow-emerald-500/10"
                  >
                    Transmit Proposal <ArrowUpRight className="w-8 h-8" />
                  </button>
                )}

                {applied && (
                  <div className="p-12 premium-card bg-emerald-500 text-white border-none text-center space-y-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto shadow-xl"><CheckCircle2 className="w-10 h-10" /></div>
                    <div className="space-y-1">
                       <p className="text-display text-2xl">Broadcast Success</p>
                       <p className="text-label text-[8px] text-white/40">Credentials Transmitted</p>
                    </div>
                  </div>
                )}

                {job.status !== 'open' && (
                  <div className="p-12 premium-card bg-zinc-50 border-none text-center flex flex-col items-center gap-6">
                    <Layers className="w-12 h-12 text-black/10" />
                    <p className="text-display text-2xl italic tracking-tighter opacity-20">LOCKED: {job.status.toUpperCase()}</p>
                  </div>
                )}
                <button className="w-full py-5 text-label text-[8px] text-black/30 hover:text-black transition-colors">Audit Legal Framework</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Apply Terminal */}
      <AnimatePresence>
        {showApply && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setShowApply(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 50 }} 
              className="relative w-full max-w-4xl bg-white p-24 rounded-[5rem] shadow-2xl flex flex-col md:flex-row gap-20 overflow-hidden"
            >
              <div className="flex-1 space-y-12">
                <div className="space-y-6">
                  <h3 className="text-display text-9xl leading-[0.8] italic">BIDDING TERMINAL</h3>
                  <p className="text-label text-black/20 tracking-[0.4em]">Project: {job.title.toUpperCase()}</p>
                </div>

                <form onSubmit={handleApply} className="space-y-12">
                  <div className="space-y-4">
                    <label className="text-label text-[9px] ml-10">Valuation Proposal ($)</label>
                    <input 
                      required 
                      type="number" 
                      className="w-full bg-zinc-50 border-2 border-transparent rounded-[3rem] px-12 py-10 text-8xl font-black italic outline-none focus:bg-white focus:border-black transition-all shadow-inner" 
                      placeholder="0000" 
                      value={proposal.bid} 
                      onChange={e => setProposal({...proposal, bid: e.target.value})} 
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-label text-[9px] ml-10">Architectural Narrative</label>
                    <textarea 
                      required 
                      rows={6} 
                      className="w-full bg-zinc-50 border-2 border-transparent rounded-[3rem] p-12 outline-none focus:bg-white focus:border-black transition-all text-sm font-medium italic resize-none shadow-inner leading-relaxed" 
                      placeholder="Define your strategic approach and specialized experience relevant to this deployment..." 
                      value={proposal.coverLetter} 
                      onChange={e => setProposal({...proposal, coverLetter: e.target.value})} 
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
                    <p className="text-[10px] text-zinc-400 leading-relaxed font-medium italic">All bids are subject to platform governance. Ensure your valuation is precise and your narrative is explicit.</p>
                    <div className="pt-6 border-t border-white/10 space-y-6">
                       <StatItem label="Market Avg." value="$1.2k" />
                       <StatItem label="Competition" value="High" color="text-rose-400" />
                    </div>
                 </div>
                 <button onClick={() => setShowApply(false)} className="w-full text-label text-black/30 hover:text-black transition-colors">Abort Procedure</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Elite Profile Carousel */}
      <AnimatePresence>
        {selectedFreelancerIndex !== null && currentFreelancer && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedFreelancerIndex(null)} />
            
            <div className="relative w-full max-w-7xl flex items-center gap-12">
               <NavCircle disabled={selectedFreelancerIndex === 0} onClick={handlePrev} icon={ChevronLeft} />

               <motion.div 
                 key={currentFreelancer.id}
                 initial={{ scale: 0.9, opacity: 0, x: 50 }} 
                 animate={{ scale: 1, opacity: 1, x: 0 }} 
                 exit={{ scale: 0.9, opacity: 0, x: -50 }} 
                 transition={{ type: 'spring', damping: 25 }}
                 className="flex-1 bg-white rounded-[6rem] overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row h-[800px]"
               >
                  <div className="w-full md:w-[40%] bg-zinc-50 p-20 flex flex-col justify-between relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-1000 rotate-12 group-hover:rotate-0">
                        <Sparkles className="w-64 h-64 text-black" />
                     </div>
                     
                     <div className="w-48 h-48 bg-black rounded-[4rem] flex items-center justify-center text-white text-8xl font-black italic shadow-2xl rotate-6 group-hover:rotate-0 transition-transform duration-1000 relative z-10">
                        {currentFreelancer.fullName[0]}
                     </div>
                     
                     <div className="space-y-8 relative z-10">
                        <div className="flex flex-wrap gap-3">
                           <span className="px-6 py-2 bg-emerald-500 text-white rounded-full text-label text-[8px] shadow-xl shadow-emerald-500/20">Elite Verified</span>
                           <div className="px-6 py-2 bg-white border border-black/5 rounded-full text-label text-[8px] flex items-center gap-3">
                              <Star className="w-4 h-4 fill-current text-emerald-500" /> {currentFreelancer.rating || 5.0}
                           </div>
                        </div>
                        <h3 className="text-display text-8xl italic leading-[0.8] tracking-tighter">{currentFreelancer.fullName}</h3>
                        <p className="text-label tracking-[0.4em] text-black/30">{currentFreelancer.category || 'SYSTEMS ARCHITECT'}</p>
                     </div>
                     <div className="absolute top-12 right-12 z-20">
                        <button onClick={() => setSelectedFreelancerIndex(null)} className="w-16 h-16 bg-white border border-black/5 hover:bg-black hover:text-white rounded-full flex items-center justify-center transition-all duration-700 shadow-xl group/close">
                           <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
                        </button>
                     </div>
                  </div>

                  <div className="flex-1 p-24 overflow-y-auto space-y-20 custom-scrollbar bg-white/50 backdrop-blur-3xl">
                     <div className="grid grid-cols-2 gap-16">
                        <ProfileMetric label="Age Cycle" value={`${currentFreelancer.age || 24} YRS`} />
                        <ProfileMetric label="Experience Index" value={`${currentFreelancer.experienceYears || 3}+ YRS`} />
                        <ProfileMetric label="Platform Trust" value="98%" />
                        <ProfileMetric label="Milestones" value={currentFreelancer.completedJobsCount || 0} />
                     </div>

                     <div className="space-y-8 pt-10 border-t border-black/5">
                        <h4 className="text-display text-3xl italic leading-none">Specialist Narrative</h4>
                        <p className="text-gray-500 text-2xl leading-relaxed italic font-medium">"{currentFreelancer.bio || 'Highly specialized IT professional focused on delivering robust, scalable infrastructure and premium user experiences.'}"</p>
                     </div>

                     <div className="pt-20 flex gap-8">
                        <button 
                          onClick={() => {
                            hireSpecialist(job.id, currentFreelancer.id);
                            setSelectedFreelancerIndex(null);
                          }}
                          className="btn-lux flex-1 py-10 text-lg shadow-emerald-500/10"
                        >
                          Authorize Hire Protocol <Zap className="w-8 h-8" />
                        </button>
                        <button className="px-12 py-10 premium-card bg-zinc-50 border-none text-label text-sm hover:bg-black hover:text-white transition-all duration-700">Open Dialogue <MessageSquare className="w-6 h-6" /></button>
                     </div>
                  </div>
               </motion.div>

               <NavCircle disabled={selectedFreelancerIndex === jobProposals.length - 1} onClick={handleNext} icon={ChevronRight} />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

const BackgroundMesh = () => (
  <div className="bg-mesh-container">
    <div className="mesh-blob bg-blue-50 w-[1200px] h-[1200px] top-[-400px] left-[-200px]"></div>
    <div className="mesh-blob bg-emerald-50 w-[900px] h-[900px] bottom-[-300px] right-[-100px]" style={{ animationDelay: '-10s' }}></div>
  </div>
)

const MetricCard = ({ icon: Icon, label, value }: any) => (
  <div className="premium-card p-10 bg-white border-black/5 shadow-sm hover:shadow-2xl transition-all duration-700 group">
     <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-black group-hover:text-white transition-all duration-700 group-hover:rotate-6">
        <Icon className="w-7 h-7" />
     </div>
     <p className="text-label text-[8px] text-black/30 tracking-[0.3em] mb-2">{label}</p>
     <p className="text-display text-4xl italic tracking-tighter leading-none">{value}</p>
  </div>
)

const ModernProposalCard = ({ proposal, job, onOpenProfile }: any) => {
  const { hireSpecialist, completeJob } = useAppContext();
  const [rating, setRating] = useState(5);
  const [showRating, setShowRating] = useState(false);

  const isAccepted = proposal.status === 'accepted';
  const isInProgress = job.status === 'in-progress' && isAccepted;

  return (
    <div className={`premium-card p-12 border-black/5 hover:border-black/20 transition-all duration-1000 relative overflow-hidden group ${isAccepted ? 'ring-4 ring-emerald-500/20' : ''}`}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 relative z-10">
        <div className="flex items-center gap-10">
          <div className="w-20 h-20 bg-black rounded-[2rem] flex items-center justify-center font-black text-3xl italic text-white shadow-2xl rotate-6 group-hover:rotate-0 transition-all duration-1000">
            {proposal.freelancerName[0]}
          </div>
          <div className="space-y-3">
            <h4 className="text-display text-4xl italic leading-none">{proposal.freelancerName}</h4>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-4 py-1.5 bg-zinc-50 rounded-full border border-black/5">
                  <Star className="w-3.5 h-3.5 text-emerald-500 fill-current" />
                  <span className="text-display text-lg italic leading-none">5.0</span>
               </div>
               <span className="w-1.5 h-1.5 bg-black/10 rounded-full"></span>
               <span className="text-label text-[8px] text-black/20 tracking-widest">{new Date(proposal.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-start lg:items-end gap-2">
           <p className="text-display text-6xl italic leading-none">${proposal.bid}</p>
           <p className="text-label text-[7px] text-black/20 tracking-[0.5em]">VALUATION BID</p>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <button 
            onClick={onOpenProfile}
            className="px-10 py-5 premium-card border-black/5 bg-zinc-50 text-label text-[9px] hover:bg-black hover:text-white transition-all duration-700 shadow-none"
          >
            Review Profile
          </button>

          {job.status === 'open' && (
            <button 
              onClick={() => hireSpecialist(job.id, proposal.freelancerId)}
              className="btn-lux px-10 py-5 text-[10px]"
            >
              Authorize Hire
            </button>
          )}
          
          {isInProgress && (
            <button 
              onClick={() => setShowRating(true)}
              className="btn-lux px-10 py-5 text-[10px] bg-emerald-500 text-white shadow-emerald-500/20"
            >
              Verify Delivery
            </button>
          )}
        </div>
      </div>

      <div className="mt-12 pt-12 border-t border-black/5 relative z-10">
         <p className="text-gray-400 text-lg leading-relaxed italic font-medium max-w-4xl">"{proposal.coverLetter}"</p>
      </div>

      {showRating && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 z-[3000] flex items-center justify-center p-10 bg-black/95 backdrop-blur-3xl">
          <div className="bg-white p-24 rounded-[5rem] max-w-2xl w-full text-center space-y-16 shadow-2xl">
            <div className="w-32 h-32 bg-black rounded-[3.5rem] flex items-center justify-center mx-auto shadow-2xl rotate-12">
               <Star className="w-16 h-16 text-emerald-400 fill-current" />
            </div>
            <div className="space-y-4">
               <h3 className="text-display text-6xl italic leading-none">Quality Assurance</h3>
               <p className="text-label text-black/20 tracking-[0.3em]">Verify the architectural outcome</p>
            </div>
            <div className="flex justify-center gap-6">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} onClick={() => setRating(star)} className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl font-black italic transition-all duration-700 ${rating >= star ? 'bg-black text-white shadow-2xl scale-110' : 'bg-zinc-50 text-black/10'}`}>
                  {star}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-6 pt-10">
               <button 
                 onClick={() => {
                   completeJob(job.id, proposal.freelancerId, rating);
                   setShowRating(false);
                 }}
                 className="btn-lux w-full py-8 text-lg"
               >
                 Finalize Transaction & Verify
               </button>
               <button onClick={() => setShowRating(false)} className="text-label text-[8px] hover:text-black transition-colors">Abort Verification</button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const ProfileMetric = ({ label, value }: any) => (
  <div className="space-y-4">
     <p className="text-label text-[8px] text-black/30 tracking-[0.4em]">{label}</p>
     <p className="text-display text-5xl italic leading-none">{value}</p>
  </div>
)

const StatItem = ({ label, value, color = 'text-white' }: any) => (
  <div className="flex justify-between items-center">
     <span className="text-label text-[7px] text-white/30">{label}</span>
     <span className={`text-display text-xl italic ${color}`}>{value}</span>
  </div>
)

const NavCircle = ({ disabled, onClick, icon: Icon }: any) => (
  <button 
    disabled={disabled} 
    onClick={onClick}
    className="w-24 h-24 bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all duration-700 disabled:opacity-5 shrink-0 flex items-center justify-center shadow-2xl group border border-white/5"
  >
    <Icon className="w-10 h-10 group-hover:scale-110 transition-transform" />
  </button>
)
