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
  Calendar,
  Award,
  ExternalLink
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, user, applyToJob, users, proposals } = useAppContext();
  const [job, setJob] = useState<any>(null);
  const [showApply, setShowApply] = useState(false);
  const [applied, setApplied] = useState(false);
  const [proposal, setProposal] = useState({ bid: '', coverLetter: '' });
  
  // Profile Modal State
  const [selectedFreelancerIndex, setSelectedFreelancerIndex] = useState<number | null>(null);

  useEffect(() => {
    const foundJob = jobs.find(j => j.id === id);
    if (foundJob) setJob(foundJob);
  }, [id, jobs]);

  const jobProposals = proposals.filter(p => p.jobId === id);
  const isOwner = user?.id === job?.clientId;

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
      navigate('/dashboard'); 
    }, 2000);
  };

  const openProfile = (freelancerId: string) => {
    const index = jobProposals.findIndex(p => p.freelancerId === freelancerId);
    if (index !== -1) setSelectedFreelancerIndex(index);
  };

  const nextProfile = () => {
    if (selectedFreelancerIndex !== null && selectedFreelancerIndex < jobProposals.length - 1) {
      setSelectedFreelancerIndex(selectedFreelancerIndex + 1);
    }
  };

  const prevProfile = () => {
    if (selectedFreelancerIndex !== null && selectedFreelancerIndex > 0) {
      setSelectedFreelancerIndex(selectedFreelancerIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-8 font-sans relative overflow-hidden text-black">
      <div className="bg-mesh"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-6 mb-12">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="flex items-center gap-3 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Feed
          </button>
          <Link 
            to="/" 
            className="flex items-center gap-3 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-all"
          >
            Go to Main Page
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest">{job.category}</span>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Status: {job.status}</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-[0.85] tracking-tighter text-black">{job.title}</h1>
            </div>

            <div className="grid grid-cols-3 gap-8 py-12 border-y border-black/5">
              <DetailItem icon={DollarSign} label="Budget" value={`$${job.budget}`} />
              <DetailItem icon={Briefcase} label="Job Type" value={job.type} />
              <DetailItem icon={ShieldCheck} label="Verification" value="Verified" />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">Project Overview</h3>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap font-medium">{job.description}</p>
            </div>

            {/* Proposals Section for Client */}
            {isOwner && (
              <div className="space-y-8 pt-12 border-t border-black/5">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter">Applicants ({jobProposals.length})</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Top Armenian Talent</p>
                </div>
                <div className="space-y-6">
                  {jobProposals.length === 0 ? (
                    <div className="p-16 glass-panel rounded-[3rem] text-center text-gray-400 text-sm font-bold uppercase tracking-widest">
                      Waiting for proposals...
                    </div>
                  ) : (
                    jobProposals.map((p: any) => (
                      <ProposalActionCard key={p.id} proposal={p} job={job} onOpenProfile={() => openProfile(p.freelancerId)} />
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="glass-panel p-10 rounded-[3rem] space-y-8 sticky top-8 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center text-white shadow-xl rotate-3">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase italic tracking-tighter">{job.clientName}</h4>
                  <div className="flex items-center gap-1.5 text-emerald-500">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Elite Client</span>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between text-[11px] font-black uppercase text-gray-400 tracking-widest">
                  <span>Engagement</span>
                  <span className="text-black">{job.proposalsCount} Bids</span>
                </div>
                <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: job.status === 'open' ? '60%' : '100%' }}
                    className="h-full bg-black rounded-full"
                  />
                </div>
              </div>

              {user?.role === 'freelancer' && !applied && job.status === 'open' && (
                <button 
                  onClick={() => setShowApply(true)} 
                  className="btn-capsule w-full py-6 justify-center shadow-[0_20px_40px_rgba(0,0,0,0.15)] group"
                >
                  Submit Proposal <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              )}

              {applied && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-black text-white rounded-[2rem] text-[11px] font-black uppercase text-center flex items-center justify-center gap-3 shadow-xl"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Proposal Sent
                </motion.div>
              )}

              {job.status !== 'open' && (
                <div className="p-6 bg-zinc-100 text-black border border-black/5 rounded-[2rem] text-[11px] font-black uppercase text-center">
                  Project {job.status}
                </div>
              )}
              
              <div className="pt-4 border-t border-black/5">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center leading-relaxed">
                  Connect with Armenia's finest IT specialists
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showApply && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/80 backdrop-blur-2xl" 
              onClick={() => setShowApply(false)} 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 30 }} 
              className="relative w-full max-w-2xl bg-white p-16 rounded-[4rem] shadow-2xl space-y-12 overflow-hidden"
            >
              <div className="absolute top-8 right-8">
                <button onClick={() => setShowApply(false)} className="p-4 bg-black/5 hover:bg-black/10 rounded-full transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Your Proposal</h3>
                <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em]">Bidding for: {job.title}</p>
              </div>

              <form onSubmit={handleApply} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-6 flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5" /> Your Bid Amount ($)
                  </label>
                  <input 
                    required 
                    type="number" 
                    placeholder="Enter budget..." 
                    className="input-capsule w-full text-2xl font-black italic py-8" 
                    value={proposal.bid} 
                    onChange={e => setProposal({...proposal, bid: e.target.value})} 
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-6 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5" /> Cover Letter
                  </label>
                  <textarea 
                    required 
                    rows={8} 
                    placeholder="Describe your approach and why you're perfect for this task..." 
                    className="w-full bg-zinc-50 border border-black/5 rounded-[3rem] p-10 outline-none focus:bg-white focus:ring-8 focus:ring-black/5 transition-all text-base font-medium resize-none shadow-inner" 
                    value={proposal.coverLetter} 
                    onChange={e => setProposal({...proposal, coverLetter: e.target.value})} 
                  />
                </div>

                <button type="submit" className="btn-capsule w-full py-8 justify-center shadow-2xl shadow-black/30 text-base">
                  Deliver Proposal <Send className="w-6 h-6 ml-3" />
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {selectedFreelancerIndex !== null && (
          <ProfileCarouselModal 
            proposals={jobProposals} 
            currentIndex={selectedFreelancerIndex} 
            users={users} 
            onClose={() => setSelectedFreelancerIndex(null)}
            onNext={nextProfile}
            onPrev={prevProfile}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const DetailItem = ({ icon: Icon, label, value }: any) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 bg-black/5 rounded-xl flex items-center justify-center">
        <Icon className="w-4 h-4 text-black" />
      </div>
      <span className="text-[11px] font-black uppercase text-gray-400 tracking-[0.1em]">{label}</span>
    </div>
    <p className="text-3xl font-black italic uppercase tracking-tighter text-black">{value}</p>
  </div>
)

const ProposalActionCard = ({ proposal, job, onOpenProfile }: any) => {
  const { hireSpecialist, completeJob } = useAppContext();
  const [rating, setRating] = useState(5);
  const [showRating, setShowRating] = useState(false);

  const isAccepted = proposal.status === 'accepted';
  const isInProgress = job.status === 'in-progress' && isAccepted;
  const isCompleted = job.status === 'completed';

  return (
    <div className={`glass-panel p-10 rounded-[3.5rem] border-2 transition-all duration-500 hover:scale-[1.01] ${isAccepted ? 'border-black shadow-2xl bg-white' : 'border-transparent shadow-sm hover:shadow-xl'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-black rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl shadow-lg rotate-2 group-hover:rotate-0 transition-all">
            {proposal.freelancerName[0]}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h4 className="text-xl font-black uppercase italic tracking-tighter">{proposal.freelancerName}</h4>
              <button 
                onClick={onOpenProfile}
                className="p-2 bg-black/5 hover:bg-black hover:text-white rounded-full transition-all"
                title="View Full Profile"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
              <span className="text-black font-black">$ {proposal.bid}</span>
              <span>•</span>
              <span>Applied {new Date(proposal.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenProfile}
            className="px-6 py-3 bg-zinc-50 border border-black/5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
          >
            Review Profile
          </button>
          
          {job.status === 'open' && (
            <button 
              onClick={() => hireSpecialist(job.id, proposal.freelancerId)}
              className="btn-capsule bg-black text-white px-8 py-3 text-[10px]"
            >
              Hire Now
            </button>
          )}
          
          {isInProgress && (
            <button 
              onClick={() => setShowRating(true)}
              className="btn-capsule bg-emerald-600 text-white px-8 py-3 text-[10px]"
            >
              Release Payment
            </button>
          )}

          {isAccepted && !isInProgress && !isCompleted && (
            <span className="px-6 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest">Active Partner</span>
          )}

          {isCompleted && isAccepted && (
            <span className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Project Delivered</span>
          )}
        </div>
      </div>

      <div className="bg-zinc-50/50 p-8 rounded-[2rem] border border-black/5 relative">
        <div className="absolute -top-3 left-8 px-4 bg-white border border-black/5 rounded-full text-[9px] font-black uppercase tracking-widest">Cover Letter</div>
        <p className="text-gray-600 text-sm leading-relaxed font-medium italic">"{proposal.coverLetter}"</p>
      </div>

      {showRating && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-8 border-t border-black/5 mt-8 space-y-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-center text-gray-400">Rate Specialist Performance</p>
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star} onClick={() => setRating(star)} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${rating >= star ? 'bg-orange-400 text-white shadow-lg scale-110' : 'bg-zinc-100 text-gray-300'}`}>
                <Star className={`w-6 h-6 ${rating >= star ? 'fill-current' : ''}`} />
              </button>
            ))}
          </div>
          <button 
            onClick={() => {
              completeJob(job.id, proposal.freelancerId, rating);
              setShowRating(false);
            }}
            className="w-full btn-capsule justify-center bg-black text-white py-5 shadow-xl shadow-black/10"
          >
            Complete & Pay Specialist
          </button>
        </motion.div>
      )}
    </div>
  );
};

const ProfileCarouselModal = ({ proposals, currentIndex, users, onClose, onNext, onPrev }: any) => {
  const proposal = proposals[currentIndex];
  const freelancer = users.find((u: any) => u.id === proposal.freelancerId);
  
  if (!freelancer) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="absolute inset-0 bg-black/90 backdrop-blur-3xl" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-5xl flex items-center gap-8">
        <button 
          onClick={onPrev} 
          disabled={currentIndex === 0}
          className={`p-6 bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all disabled:opacity-10 disabled:hover:bg-white/10`}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <motion.div 
          key={freelancer.id}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="flex-1 bg-white rounded-[4rem] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2"
        >
          {/* Left Side: Photo & Quick Stats */}
          <div className="bg-black p-16 flex flex-col justify-between text-white relative">
            <div className="absolute top-12 left-12 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Candidate Profile</span>
            </div>

            <div className="mt-20 space-y-10">
              <div className="space-y-4">
                <div className="w-32 h-32 rounded-[3rem] bg-white/10 border border-white/20 flex items-center justify-center text-5xl font-black italic shadow-2xl">
                  {freelancer.fullName[0]}
                </div>
                <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">{freelancer.fullName}</h2>
                <div className="flex items-center gap-4">
                   <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < (freelancer.rating || 5) ? 'text-orange-400 fill-current' : 'text-white/20'}`} />
                      ))}
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{freelancer.completedJobsCount || 0} Projects Done</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/10">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Age</p>
                    <p className="text-2xl font-black italic uppercase">{freelancer.age || 24} Years</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Experience</p>
                    <p className="text-2xl font-black italic uppercase">{freelancer.experienceYears || 3}+ Years</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Location</p>
                    <p className="text-2xl font-black italic uppercase">Armenia</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Price / Hr</p>
                    <p className="text-2xl font-black italic uppercase">${freelancer.price || 45}</p>
                 </div>
              </div>
            </div>

            <div className="mt-12">
               <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 w-fit">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Verified Identity</span>
               </div>
            </div>
          </div>

          {/* Right Side: Bio & Cover Letter */}
          <div className="p-16 space-y-12 overflow-y-auto max-h-[80vh]">
            <div className="flex justify-end">
              <button onClick={onClose} className="p-4 bg-black/5 hover:bg-black hover:text-white rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-black" />
                  <h3 className="text-xl font-black uppercase italic tracking-tighter">About Specialist</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg font-medium">{freelancer.bio || 'Professional developer with deep expertise in modern tech stacks.'}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-black" />
                  <h3 className="text-xl font-black uppercase italic tracking-tighter">Current Proposal</h3>
                </div>
                <div className="bg-zinc-50 p-10 rounded-[3rem] border border-black/5 space-y-6">
                  <div className="flex justify-between items-center pb-6 border-b border-black/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Proposed Budget</span>
                    <span className="text-3xl font-black italic text-black">$ {proposal.bid}</span>
                  </div>
                  <p className="text-gray-600 font-medium italic leading-relaxed">"{proposal.coverLetter}"</p>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                 <h3 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-3">
                    <Award className="w-5 h-5 text-black" /> Skills & Tech
                 </h3>
                 <div className="flex flex-wrap gap-3">
                    {(freelancer.skills || ['React', 'Node.js', 'PostgreSQL', 'Figma', 'TypeScript']).map((skill: string) => (
                      <span key={skill} className="px-5 py-2 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest">{skill}</span>
                    ))}
                 </div>
              </div>
            </div>

            <div className="pt-8 border-t border-black/5">
               <button 
                 onClick={onClose}
                 className="btn-capsule w-full py-6 justify-center text-base"
               >
                 Close Overview
               </button>
            </div>
          </div>
        </motion.div>

        <button 
          onClick={onNext} 
          disabled={currentIndex === proposals.length - 1}
          className={`p-6 bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all disabled:opacity-10 disabled:hover:bg-white/10`}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};
