import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  Send, 
  Calendar,
  Building2
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
    applyToJob(job.id);
    setApplied(true);
    setTimeout(() => { navigate('/dashboard'); }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="mb-12 flex items-center gap-3 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-all"><ArrowLeft className="w-4 h-4" /> Back to Feed</button>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <h1 className="text-4xl md:text-6xl font-black italic uppercase leading-tight">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-10 border-y border-white/5 py-10">
              <DetailItem icon={DollarSign} label="Budget" value={`$${job.budget}`} />
              <DetailItem icon={Calendar} label="Type" value={job.type.toUpperCase()} />
              <DetailItem icon={MapPin} label="Location" value="Remote" />
            </div>
            <p className="text-slate-400 text-lg leading-relaxed whitespace-pre-wrap">{job.description}</p>
          </div>
          <div className="lg:col-span-4">
            <div className="glass-card p-10 rounded-[3rem] space-y-8 sticky top-8">
              <div className="flex items-center gap-4"><Building2 className="w-6 h-6 text-indigo-400" /><div><h4 className="text-sm font-black uppercase italic">{job.clientName}</h4><p className="text-[10px] font-bold text-slate-600 uppercase">Verified Client</p></div></div>
              {user?.role === 'freelancer' && !applied && <button onClick={() => setShowApply(true)} className="btn-primary w-full py-5 text-xs font-black uppercase">Apply Now <Send className="w-4 h-4" /></button>}
              {applied && <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl text-[10px] font-black uppercase text-center">Submitted!</div>}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showApply && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setShowApply(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-2xl glass-card p-12 rounded-[3.5rem] space-y-8">
              <h3 className="text-3xl font-black italic uppercase">Submit Proposal</h3>
              <form onSubmit={handleApply} className="space-y-8">
                <input required type="number" placeholder="Your Bid" className="input-field text-emerald-400" value={proposal.bid} onChange={e => setProposal({...proposal, bid: e.target.value})} />
                <textarea required rows={6} placeholder="Cover Letter..." className="input-field resize-none" value={proposal.coverLetter} onChange={e => setProposal({...proposal, coverLetter: e.target.value})} />
                <button type="submit" className="btn-primary w-full py-5 text-xs font-black uppercase">Send Proposal</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

const DetailItem = ({ icon: Icon, label, value }: any) => (
  <div>
    <div className="flex items-center gap-2"><Icon className="w-4 h-4 text-indigo-500" /><span className="text-[10px] font-black uppercase text-slate-600">{label}</span></div>
    <p className="text-xl font-black italic uppercase">{value}</p>
  </div>
)
