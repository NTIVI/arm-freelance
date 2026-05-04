import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Briefcase, 
  CircleCheck,
  Clock,
  ArrowUpRight,
  Shield,
  Zap,
  Sparkles,
  Command
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../context/AppContext'

export const PostJob = () => {
  const navigate = useNavigate();
  const { addJob, user } = useAppContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    category: 'Web Development',
    deadline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJob({
      ...formData,
      clientId: user?.id || 'demo-client',
      clientName: user?.fullName || 'Demo Client'
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans relative overflow-hidden selection:bg-violet-500 selection:text-white">
      <BackgroundMesh />
      <div className="bg-overlay"></div>
      
      <div className="max-w-4xl mx-auto px-10 py-20 relative z-10">
        <header className="flex items-center justify-between mb-20">
          <Link to="/dashboard" className="flex items-center gap-6 text-label text-[9px] text-white/30 hover:text-white transition-all group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700 shadow-sm">
               <ArrowLeft className="w-5 h-5" />
            </div>
            Back to Dashboard
          </Link>
          <div className="flex bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-xl">
             <span className="px-5 py-2 text-label text-[8px] text-white/20">Protocol: Project Deployment</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-4">
              <h1 className="text-display text-8xl italic leading-none bg-gradient-to-r from-white via-white to-white/20 bg-clip-text text-transparent">INITIATE REQUEST</h1>
              <div className="flex items-center gap-4">
                 <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                 <p className="text-label text-[8px] tracking-[0.4em] text-white/40 uppercase">Broadcasting to Elite Specialist Network</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="premium-card p-16 space-y-12 bg-white/[0.02] border-white/10 backdrop-blur-3xl shadow-2xl">
              <div className="space-y-4">
                <label className="text-label text-[8px] ml-6 flex items-center gap-3"><Command className="w-3 h-3 text-violet-400" /> Objective Title</label>
                <input 
                  type="text" 
                  required 
                  className="input-lux py-8 text-lg" 
                  placeholder="Architectural Design for Neural Network Interface..." 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-label text-[8px] ml-6 flex items-center gap-3"><Zap className="w-3 h-3 text-fuchsia-400" /> Resource Allocation ($)</label>
                  <input 
                    type="number" 
                    required 
                    className="input-lux py-8 text-lg" 
                    placeholder="5000" 
                    value={formData.budget}
                    onChange={e => setFormData({...formData, budget: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-label text-[8px] ml-6 flex items-center gap-3"><Clock className="w-3 h-3 text-pink-400" /> Delivery Deadline</label>
                  <input 
                    type="date" 
                    required 
                    className="input-lux py-8 text-lg" 
                    value={formData.deadline}
                    onChange={e => setFormData({...formData, deadline: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-label text-[8px] ml-6 flex items-center gap-3"><Briefcase className="w-3 h-3 text-indigo-400" /> Operational Domain</label>
                <select 
                  className="input-lux py-8 text-lg appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option className="bg-[#0f0f0f] text-white">Web Development</option>
                  <option className="bg-[#0f0f0f] text-white">Mobile Architecture</option>
                  <option className="bg-[#0f0f0f] text-white">Neural Engineering (AI)</option>
                  <option className="bg-[#0f0f0f] text-white">Visual Identity</option>
                  <option className="bg-[#0f0f0f] text-white">Cyber Security</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-label text-[8px] ml-6 flex items-center gap-3"><Sparkles className="w-3 h-3 text-emerald-400" /> Detailed Specifications</label>
                <textarea 
                  rows={6} 
                  required 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[3rem] p-10 outline-none focus:bg-white/[0.05] focus:border-violet-500/30 focus:ring-[16px] focus:ring-violet-500/5 transition-all text-sm font-medium italic resize-none text-white" 
                  placeholder="Elaborate on the technical requirements and desired outcomes..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="btn-lux w-full py-10 text-lg group">
                Deploy Project to Registry <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform" />
              </button>
            </form>
          </div>

          <aside className="lg:col-span-4 space-y-10">
             <div className="premium-card p-12 bg-white/[0.03] border-white/10 text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000">
                   <Shield className="w-48 h-48" />
                </div>
                <div className="relative z-10 space-y-8">
                   <h3 className="text-display text-3xl italic">Security Protocol</h3>
                   <p className="text-xs text-white/30 leading-relaxed font-medium">All deployments undergo a manual audit by our neural security layer before being broadcast to the network.</p>
                   
                   <div className="pt-8 border-t border-white/10 space-y-4 relative z-10">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-violet-400">
                         <span className="flex items-center gap-2"><CircleCheck className="w-4 h-4 shadow-[0_0_8px_rgba(139,92,246,0.5)]" /> Secure Escrow</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-fuchsia-400">
                         <span className="flex items-center gap-2"><CircleCheck className="w-4 h-4 shadow-[0_0_8px_rgba(236,72,153,0.5)]" /> Manual Audit</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-indigo-400">
                         <span className="flex items-center gap-2"><CircleCheck className="w-4 h-4 shadow-[0_0_8px_rgba(99,102,241,0.5)]" /> Elite Matching</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-12 premium-card bg-violet-500/5 border-dashed border-violet-500/20 text-center space-y-6">
                <div className="w-16 h-16 bg-violet-500/20 rounded-2xl flex items-center justify-center mx-auto rotate-6"><Zap className="w-8 h-8 text-violet-400" /></div>
                <p className="text-label text-[8px] text-violet-400 tracking-[0.4em]">EXPRESS DEPLOYMENT</p>
                <p className="text-xs text-white/20 italic">Average specialist discovery time: 42 minutes.</p>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function BackgroundMesh() {
  return (
    <div className="bg-mesh-container">
      <div className="mesh-blob bg-violet-600/30 w-[1200px] h-[1200px] top-[-300px] left-[-400px]"></div>
      <div className="mesh-blob bg-fuchsia-600/20 w-[800px] h-[800px] bottom-[-200px] right-[-200px]" style={{ animationDelay: '-12s' }}></div>
    </div>
  )
}
