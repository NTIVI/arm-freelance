import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  DollarSign, 
  Send, 
  Building2,
  Clock,
  Briefcase,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, user, applyToJob } = useAppContext();
  const [job, setJob] = useState<any>(null);
  const [showApply, setShowApply] = useState(false);
  const [applied, setApplied] = useState(false);
  const [proposal, setProposal] = useState({ bid: '', coverLetter: '' });

  useEffect(() => {
    const foundJob = jobs.find(j => j.id === id);
    if (foundJob) setJob(foundJob);
  }, [id, jobs]);

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

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="mb-12 flex items-center gap-3 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Feed
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">{job.category}</span>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase">Posted 2 hours ago</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-[0.9] tracking-tighter text-black">{job.title}</h1>
            </div>

            <div className="grid grid-cols-3 gap-8 py-12 border-y border-black/5">
              <DetailItem icon={DollarSign} label="Budget" value={`$${job.budget}`} />
              <DetailItem icon={Briefcase} label="Job Type" value={job.type} />
              <DetailItem icon={ShieldCheck} label="Verification" value="Payment Verified" />
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-black uppercase italic">Description</h3>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">{job.description}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black uppercase italic">Required Skills</h3>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Tailwind', 'REST API'].map(skill => (
                  <span key={skill} className="px-6 py-2 bg-white rounded-full text-xs font-bold shadow-sm border border-black/5">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="glass-panel p-10 rounded-[3rem] space-y-8 sticky top-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-white shadow-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase italic">{job.clientName}</h4>
                  <div className="flex items-center gap-1 text-emerald-500">
                    <CheckCircle2 className="w-3 h-3" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Verified Client</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-[11px] font-bold uppercase text-gray-400">
                  <span>Proposals</span>
                  <span className="text-black">{job.proposalsCount}</span>
                </div>
                <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                  <div className="h-full bg-black rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>

              {user?.role === 'freelancer' && !applied && (
                <button 
                  onClick={() => setShowApply(true)} 
                  className="btn-capsule w-full py-5 justify-center shadow-2xl shadow-black/10"
                >
                  Apply for Project <Send className="w-4 h-4 ml-2" />
                </button>
              )}

              {applied && (
                <div className="p-6 bg-emerald-500/10 text-emerald-600 rounded-[2rem] text-[11px] font-black uppercase text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Submitted Successfully
                </div>
              )}
              
              <p className="text-[10px] text-gray-400 font-medium text-center px-4 leading-relaxed">
                Applying uses 2 connects. Your current balance is 45 connects.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showApply && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-md" 
              onClick={() => setShowApply(false)} 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="relative w-full max-w-2xl bg-white p-12 rounded-[3.5rem] shadow-2xl space-y-10"
            >
              <div className="space-y-2">
                <h3 className="text-4xl font-black italic uppercase tracking-tighter">Submit Proposal</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">You are bidding for: {job.title}</p>
              </div>

              <form onSubmit={handleApply} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Your Professional Bid ($)</label>
                  <input 
                    required 
                    type="number" 
                    placeholder="Enter amount" 
                    className="input-capsule w-full text-lg font-black italic" 
                    value={proposal.bid} 
                    onChange={e => setProposal({...proposal, bid: e.target.value})} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Cover Letter / Proposal Details</label>
                  <textarea 
                    required 
                    rows={6} 
                    placeholder="Why are you the best fit for this project?" 
                    className="w-full bg-black/5 border border-black/5 rounded-[2rem] p-8 outline-none focus:bg-black/10 transition-all text-sm font-medium resize-none" 
                    value={proposal.coverLetter} 
                    onChange={e => setProposal({...proposal, coverLetter: e.target.value})} 
                  />
                </div>

                <button type="submit" className="btn-capsule w-full py-6 justify-center shadow-xl shadow-black/20">
                  Deliver Proposal <Send className="w-5 h-5 ml-2" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

const DetailItem = ({ icon: Icon, label, value }: any) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-gray-400" />
      <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{label}</span>
    </div>
    <p className="text-2xl font-black italic uppercase tracking-tighter text-black">{value}</p>
  </div>
)
