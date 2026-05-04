import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Building2, 
  Clock, 
  Briefcase, 
  CircleCheck,
  Star,
  X,
  ChevronLeft,
  ShieldCheck,
  Zap,
  Sparkles,
  Command,
  ArrowUpRight,
  MessageSquare
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../context/AppContext'

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, user, applyToJob, proposals } = useAppContext();
  
  const job = jobs.find(j => j.id === id);
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applied, setApplied] = useState(proposals.some(p => p.jobId === id && p.freelancerId === user?.id));

  if (!job) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    applyToJob({
      jobId: job.id,
      freelancerId: user.id,
      freelancerName: user.fullName,
      coverLetter
    });
    setApplied(true);
    setIsApplying(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans relative overflow-hidden selection:bg-violet-500 selection:text-white">
      <BackgroundMesh />
      <div className="bg-overlay"></div>
      
      <div className="max-w-7xl mx-auto px-10 py-20 relative z-10">
        <header className="flex items-center justify-between mb-20">
          <button onClick={() => navigate(-1)} className="flex items-center gap-6 text-label text-[9px] text-white/30 hover:text-white transition-all group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700 shadow-sm">
               <ArrowLeft className="w-5 h-5" />
            </div>
            Abort Detail View
          </button>
          <div className="flex bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-xl">
             <span className="px-5 py-2 text-label text-[8px] text-white/20 uppercase tracking-widest">Protocol: Asset Discovery</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="premium-card p-16 bg-white/[0.03] border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-1000">
                 <Briefcase className="w-64 h-64 text-violet-500" />
              </div>

              <div className="relative z-10 space-y-10">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="badge-lux bg-violet-600 text-white shadow-violet-500/20">{job.category}</span>
                  <span className="px-5 py-1.5 rounded-full bg-white/5 border border-white/10 text-label text-[8px] uppercase tracking-widest font-black text-white/40">ID: {job.id.slice(0,8).toUpperCase()}</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-display text-8xl italic leading-none bg-gradient-to-r from-white via-white to-white/20 bg-clip-text text-transparent">{job.title}</h1>
                  <div className="flex items-center gap-6 pt-4">
                    <div className="flex items-center gap-3">
                       <Building2 className="w-4 h-4 text-violet-400" />
                       <span className="text-label text-white/40 tracking-widest">{job.clientName}</span>
                    </div>
                    <div className="w-1.5 h-1.5 bg-white/10 rounded-full"></div>
                    <div className="flex items-center gap-3">
                       <Clock className="w-4 h-4 text-fuchsia-400" />
                       <span className="text-label text-white/40 tracking-widest uppercase">{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-12 border-t border-white/5">
                  <h3 className="text-display text-3xl italic mb-8 text-white/60 uppercase tracking-tighter">Technical Brief</h3>
                  <p className="text-white/40 text-2xl leading-relaxed italic font-medium whitespace-pre-wrap">"{job.description}"</p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="premium-card p-12 bg-white/[0.02] border-white/5 space-y-6 group hover:border-violet-500/30 transition-all duration-700">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-violet-400 group-hover:rotate-12 transition-transform"><Zap className="w-6 h-6" /></div>
                  <div className="space-y-1">
                     <p className="text-label text-[8px] text-white/20 tracking-widest uppercase">Complexity Matrix</p>
                     <p className="text-display text-2xl italic text-white uppercase">High-End Engineering</p>
                  </div>
               </div>
               <div className="premium-card p-12 bg-white/[0.02] border-white/5 space-y-6 group hover:border-fuchsia-500/30 transition-all duration-700">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-fuchsia-400 group-hover:rotate-12 transition-transform"><Sparkles className="w-6 h-6" /></div>
                  <div className="space-y-1">
                     <p className="text-label text-[8px] text-white/20 tracking-widest uppercase">Verified Specialist Status</p>
                     <p className="text-display text-2xl italic text-white uppercase">Neural Tier 1</p>
                  </div>
               </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-10">
             <div className="premium-card p-12 bg-[#0a0a0a] border-white/10 text-white space-y-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="relative z-10 space-y-10">
                   <div className="space-y-2">
                      <p className="text-label text-violet-400 tracking-[0.5em] uppercase">Value Allocation</p>
                      <p className="text-display text-7xl italic leading-none">${job.budget}</p>
                   </div>
                   
                   <div className="space-y-6 pt-10 border-t border-white/10">
                      {applied ? (
                        <div className="p-12 premium-card bg-violet-600/20 text-white border-violet-500/30 text-center space-y-6">
                          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto shadow-xl"><CircleCheck className="w-10 h-10 text-white" /></div>
                          <div className="space-y-1">
                             <p className="text-display text-2xl uppercase">Broadcast Success</p>
                             <p className="text-label text-[8px] text-white/40 uppercase tracking-widest">Credentials Transmitted</p>
                          </div>
                        </div>
                      ) : (
                        user?.role === 'freelancer' && (
                          <button 
                            onClick={() => setIsApplying(true)}
                            className="btn-lux w-full py-8 text-lg shadow-violet-500/30"
                          >
                            Initiate Proposal <ArrowUpRight className="w-8 h-8" />
                          </button>
                        )
                      )}
                      
                      <div className="p-10 premium-card bg-white/[0.03] border-white/5 space-y-6">
                        <div className="flex items-center gap-4">
                           <Shield className="w-5 h-5 text-white/20" />
                           <h4 className="text-label text-[10px] text-white/40 uppercase tracking-widest">Secure Escrow Protection</h4>
                        </div>
                        <p className="text-[10px] text-white/20 leading-relaxed italic font-medium">Value units are held in multi-signature orbital escrow until milestone delivery is verified.</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="premium-card p-12 bg-white/[0.02] border-white/5 space-y-10 shadow-xl">
                <h4 className="text-label text-white/40 uppercase tracking-widest">Client Authenticity</h4>
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white text-2xl font-black italic shadow-xl border border-white/5">{job.clientName[0]}</div>
                   <div>
                      <p className="text-display text-2xl text-white">{job.clientName}</p>
                      <div className="flex items-center gap-2 mt-1">
                         <Star className="w-3 h-3 text-violet-400 fill-current" />
                         <span className="text-label text-[8px] text-white/30 uppercase tracking-widest font-black">Verified Procurer</span>
                      </div>
                   </div>
                </div>
             </div>
          </aside>
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {isApplying && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setIsApplying(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 50 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-[5rem] p-20 w-full max-w-4xl relative z-10 overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,1)]"
            >
              <div className="flex flex-col md:flex-row gap-16">
                 <div className="flex-1 space-y-12">
                    <div className="space-y-4">
                       <h3 className="text-display text-6xl italic leading-none text-white">PROPOSAL DEPLOYMENT</h3>
                       <p className="text-label text-white/20 tracking-[0.4em] uppercase">Injecting Credentials for: {job.title}</p>
                    </div>

                    <form id="applyForm" onSubmit={handleApply} className="space-y-10">
                       <div className="space-y-4">
                          <label className="text-label text-[8px] ml-6 flex items-center gap-3"><MessageSquare className="w-3.5 h-3.5 text-violet-400" /> Operational Overview (Cover Letter)</label>
                          <textarea 
                            required
                            rows={8}
                            className="w-full bg-white/5 border border-white/10 rounded-[3rem] p-10 outline-none focus:bg-white/10 focus:border-violet-500/30 focus:ring-[16px] focus:ring-violet-500/5 transition-all text-sm font-medium italic resize-none text-white" 
                            placeholder="Detail your technical approach and architectural fit for this specific objective..."
                            value={coverLetter}
                            onChange={e => setCoverLetter(e.target.value)}
                          ></textarea>
                       </div>
                       <button type="submit" className="btn-lux w-full py-8 text-lg group">Execute Transmission <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform" /></button>
                    </form>
                 </div>

                 <div className="w-72 space-y-10 shrink-0 hidden md:block">
                    <div className="premium-card p-10 bg-white/5 border-white/10 space-y-8">
                       <Command className="w-12 h-12 text-violet-400" />
                       <h4 className="text-display text-2xl italic text-white uppercase tracking-tighter">Transmission Rules</h4>
                       <p className="text-[10px] text-white/20 leading-relaxed font-medium italic">Your proposal will be immediately broadcasted to the client authority. Abort is only possible before synchronization.</p>
                       <ul className="space-y-4 pt-6 border-t border-white/10">
                          <li className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-violet-400"><CircleCheck className="w-4 h-4 shadow-[0_0_8px_rgba(139,92,246,0.5)]" /> Real-time Sync</li>
                          <li className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-fuchsia-400"><CircleCheck className="w-4 h-4 shadow-[0_0_8px_rgba(236,72,153,0.5)]" /> Secure Tunnel</li>
                       </ul>
                    </div>
                    <button onClick={() => setIsApplying(false)} className="w-full text-label text-white/20 hover:text-white transition-colors uppercase tracking-[0.4em] font-black">Abort Transmission</button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function BackgroundMesh() {
  return (
    <div className="bg-mesh-container">
      <div className="mesh-blob bg-violet-600/30 w-[1200px] h-[1200px] top-[-400px] left-[-200px]"></div>
      <div className="mesh-blob bg-fuchsia-600/20 w-[1000px] h-[1000px] bottom-[-300px] right-[-200px]" style={{ animationDelay: '-12s' }}></div>
    </div>
  )
}
