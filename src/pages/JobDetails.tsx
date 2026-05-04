import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Zap, 
  Shield, 
  ArrowUpRight, 
  MessageSquare, 
  Users, 
  Star,
  CheckCircle,
  Briefcase,
  Command,
  Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, user, proposals, applyToJob } = useAppContext();
  const { formatPrice } = useLanguage();
  
  const job = jobs.find(j => j.id === id) || jobs[0]; // Fallback for simulation
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  if (!job) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    applyToJob({
      jobId: job.id,
      freelancerId: user.id,
      freelancerName: user.fullName,
      coverLetter,
      bidAmount: job.budget
    });
    setIsApplying(false);
  };

  const isOwner = user?.id === job.clientId;
  const hasApplied = proposals.some(p => p.jobId === job.id && p.freelancerId === user?.id);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <header className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-6 text-label text-[9px] text-white/30 hover:text-white transition-all group">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-500 transition-all duration-700 shadow-sm">
             <ArrowLeft className="w-5 h-5" />
          </div>
          Return to Registry
        </button>
        <div className="flex items-center gap-6">
           <span className="text-label text-white/20">Protocol: Asset Audit</span>
           <div className="h-6 w-[1px] bg-white/10"></div>
           <span className="badge-lux">{job.status.toUpperCase()}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card p-16 space-y-12 bg-white/[0.02] border-white/10 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
               <Briefcase className="w-64 h-64 text-violet-500" />
            </div>
            
            <div className="relative z-10 space-y-10">
               <div className="flex flex-wrap items-center gap-4">
                  <span className="badge-lux bg-violet-600 text-white border-violet-500/50">{job.category}</span>
                  <span className="text-label text-white/20">ID: {job.id.toUpperCase()}</span>
               </div>
               
               <div className="space-y-4">
                  <h1 className="text-display text-8xl italic leading-none bg-gradient-to-r from-white via-white to-white/20 bg-clip-text text-transparent">{job.title}</h1>
                  <div className="flex items-center gap-6 pt-4">
                     <p className="text-label text-white/40 tracking-widest uppercase flex items-center gap-2"><Layout className="w-4 h-4" /> {job.clientName}</p>
                     <div className="w-1.5 h-1.5 bg-white/10 rounded-full"></div>
                     <p className="text-label text-white/40 tracking-widest uppercase flex items-center gap-2"><Clock className="w-4 h-4" /> {new Date(job.createdAt).toLocaleDateString()}</p>
                  </div>
               </div>

               <div className="pt-12 border-t border-white/5 space-y-8">
                  <h3 className="text-display text-3xl italic text-white/60">Technical Brief</h3>
                  <p className="text-white/40 text-2xl leading-relaxed italic font-medium whitespace-pre-wrap">"{job.description}"</p>
               </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <DetailCard icon={Zap} title="Complexity Level" value="Senior Architecture" />
             <DetailCard icon={Shield} title="Escrow Security" value="Multi-Sig Enabled" />
          </div>

          {/* Proposals List for Client */}
          {isOwner && (
            <div className="space-y-8 pt-12">
               <h3 className="text-display text-5xl italic text-white">Neural Responses</h3>
               <div className="grid grid-cols-1 gap-6">
                  {proposals.filter(p => p.jobId === job.id).map(p => (
                    <div key={p.id} className="premium-card p-10 bg-white/[0.02] border-white/5 flex items-center justify-between group hover:border-violet-500/30 transition-all">
                       <div className="flex items-center gap-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black italic shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                             {p.freelancerName[0]}
                          </div>
                          <div>
                             <h4 className="text-display text-2xl italic text-white">{p.freelancerName}</h4>
                             <p className="text-[10px] text-white/20 font-medium italic mt-1 max-w-lg">"{p.coverLetter}"</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-8">
                          <div className="text-right">
                             <p className="text-display text-4xl italic text-white">{formatPrice(p.bidAmount)}</p>
                             <p className="text-label text-[7px] text-white/20 uppercase tracking-widest mt-1">Valuation Proposal</p>
                          </div>
                          <button className="btn-lux px-8 py-4 text-[9px]">Initiate Sync <ArrowUpRight className="w-4 h-4" /></button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-10">
           <div className="premium-card p-12 bg-[#0a0a0a] border-white/10 space-y-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative z-10 space-y-10">
                 <div className="space-y-2">
                    <p className="text-label text-violet-400 tracking-[0.5em] uppercase">Value Allocation</p>
                    <p className="text-display text-7xl italic leading-none">{formatPrice(job.budget)}</p>
                    <p className="text-label text-[8px] text-white/10 uppercase tracking-widest mt-4">Protocol: {job.type.toUpperCase()}</p>
                 </div>

                 <div className="space-y-6 pt-10 border-t border-white/10">
                    {user?.role === 'freelancer' && !hasApplied && (
                       <button 
                        onClick={() => setIsApplying(true)}
                        className="btn-lux w-full py-8 text-lg"
                       >
                        Initiate Proposal <ArrowUpRight className="w-8 h-8" />
                       </button>
                    )}
                    {hasApplied && (
                       <div className="p-10 premium-card bg-violet-600/10 border-violet-500/30 text-center space-y-4">
                          <CheckCircle className="w-12 h-12 text-violet-400 mx-auto" />
                          <p className="text-label text-white/40 uppercase tracking-widest">Proposal Broadcasted</p>
                       </div>
                    )}
                    <div className="p-8 premium-card bg-white/[0.02] border-white/5 space-y-4">
                       <Shield className="w-5 h-5 text-white/20" />
                       <p className="text-[10px] text-white/20 leading-relaxed font-medium italic">Protected by multi-signature escrow. Secure exchange protocol active.</p>
                    </div>
                 </div>
              </div>
           </div>
        </aside>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {isApplying && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={() => setIsApplying(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 50 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-[5rem] p-20 w-full max-w-4xl relative z-10 overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col md:flex-row gap-16">
                 <div className="flex-1 space-y-12">
                    <div className="space-y-4">
                       <h3 className="text-display text-6xl italic leading-none text-white uppercase">Proposal Deployment</h3>
                       <p className="text-label text-white/20 tracking-[0.4em]">Broadcast for: {job.title}</p>
                    </div>

                    <form onSubmit={handleApply} className="space-y-10">
                       <div className="space-y-4">
                          <label className="text-label text-[8px] ml-6 flex items-center gap-3"><MessageSquare className="w-4 h-4 text-violet-400" /> Operational Narrative</label>
                          <textarea 
                            required
                            rows={8}
                            className="input-lux h-64 py-8 resize-none" 
                            placeholder="Detail your technical approach and architectural fit for this specific objective..."
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                          />
                       </div>
                       <button type="submit" className="btn-lux w-full py-8 text-lg group">Execute Transmission <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform" /></button>
                    </form>
                 </div>
                 <div className="w-72 hidden md:block space-y-8">
                    <div className="premium-card p-10 bg-white/5 border-white/10 space-y-6">
                       <Command className="w-10 h-10 text-violet-400" />
                       <h4 className="text-display text-2xl italic text-white uppercase leading-tight">Sync Requirements</h4>
                       <p className="text-[10px] text-white/20 font-medium italic">Credentials will be broadcasted to the client. This action consumes 1 Bid Credit.</p>
                       <div className="pt-6 border-t border-white/5 space-y-4">
                          <div className="flex items-center gap-3 text-violet-400 text-[9px] font-black uppercase"><Star className="w-4 h-4" /> Neural Match</div>
                          <div className="flex items-center gap-3 text-fuchsia-400 text-[9px] font-black uppercase"><Clock className="w-4 h-4" /> 24H Deadline</div>
                       </div>
                    </div>
                    <button onClick={() => setIsApplying(false)} className="w-full text-label text-white/10 hover:text-white transition-colors">Abort Procedure</button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DetailCard = ({ icon: Icon, title, value }: any) => (
  <div className="premium-card p-12 bg-white/[0.02] border-white/5 space-y-6 group hover:border-violet-500/30 transition-all duration-700">
    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-violet-400 group-hover:rotate-12 transition-transform">
      <Icon className="w-6 h-6" />
    </div>
    <div className="space-y-1">
      <p className="text-label text-[8px] text-white/20 tracking-widest uppercase">{title}</p>
      <p className="text-display text-2xl italic text-white uppercase">{value}</p>
    </div>
  </div>
);
