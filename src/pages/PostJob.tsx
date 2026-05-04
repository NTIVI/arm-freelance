import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Sparkles, 
  Briefcase, 
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Layers,
  Shield,
  Zap,
  Command
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'

export const PostJob = () => {
  const navigate = useNavigate();
  const { user, addJob } = useAppContext();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    budget: '',
    type: 'fixed' as 'fixed' | 'hourly',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    addJob({
      ...formData,
      clientId: user.id,
      clientName: user.fullName
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white relative overflow-hidden">
      <BackgroundMesh />
      
      <div className="max-w-7xl mx-auto px-10 py-20 relative z-10">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="mb-16 flex items-center gap-6 text-label text-[9px] text-black/30 hover:text-black transition-all group"
        >
          <div className="w-12 h-12 bg-white border border-black/5 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-700 shadow-sm">
             <ArrowLeft className="w-5 h-5" />
          </div>
          Abort Mission Control
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-20">
            <div className="space-y-10">
               <div className="flex items-center gap-6">
                  <div className="px-6 py-2 bg-black text-white rounded-full text-label text-[8px] shadow-xl shadow-black/10">Project Genesis</div>
                  <div className="flex items-center gap-3 text-label text-[8px] text-black/20 tracking-[0.4em]">
                     <Zap className="w-4 h-4" /> Priority Deployment
                  </div>
               </div>
               <h1 className="text-display text-9xl md:text-[10rem] lg:text-[12rem] italic leading-[0.8] tracking-tighter mix-blend-difference">
                 SOURCE <br />
                 <span className="text-black/10 group-hover:text-black transition-colors duration-1000">ELITE TALENT.</span>
               </h1>
            </div>

            <form onSubmit={handleSubmit} className="premium-card p-16 space-y-16 bg-white/70 backdrop-blur-3xl border-black/5">
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-label text-[9px] ml-10">Project Designation (Title)</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Neural Link Interface Architecture"
                    className="w-full bg-zinc-50 border-2 border-transparent rounded-[3rem] px-12 py-10 text-4xl font-black italic outline-none focus:bg-white focus:border-black transition-all shadow-inner"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-label text-[9px] ml-10">Technical Classification</label>
                    <select 
                      className="w-full bg-zinc-50 border-2 border-transparent rounded-[2.5rem] px-10 py-6 text-sm font-black uppercase outline-none focus:bg-white focus:border-black transition-all appearance-none"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option>Web Development</option>
                      <option>Mobile Engineering</option>
                      <option>Backend Infrastructure</option>
                      <option>AI / Neural Systems</option>
                      <option>Security / Audit</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-label text-[9px] ml-10">Capital Allocation ($)</label>
                    <input 
                      required
                      type="number" 
                      placeholder="e.g. 5000"
                      className="w-full bg-zinc-50 border-2 border-transparent rounded-[2.5rem] px-10 py-6 text-sm font-black italic outline-none focus:bg-white focus:border-black transition-all shadow-inner"
                      value={formData.budget}
                      onChange={e => setFormData({...formData, budget: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-label text-[9px] ml-10">Strategic Description (Brief)</label>
                  <textarea 
                    required
                    rows={8}
                    placeholder="Elaborate on the architectural goals, stack requirements, and production milestones..."
                    className="w-full bg-zinc-50 border-2 border-transparent rounded-[3.5rem] p-12 outline-none focus:bg-white focus:border-black transition-all text-base font-medium italic resize-none shadow-inner leading-relaxed"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="flex gap-6">
                   <TypeSelectionBtn 
                     active={formData.type === 'fixed'} 
                     onClick={() => setFormData({...formData, type: 'fixed'})}
                     icon={Briefcase}
                     label="Fixed Capital"
                   />
                   <TypeSelectionBtn 
                     active={formData.type === 'hourly'} 
                     onClick={() => setFormData({...formData, type: 'hourly'})}
                     icon={Clock}
                     label="Stream Valuation"
                   />
                </div>
              </div>

              <button type="submit" className="btn-lux w-full py-10 text-xl group shadow-emerald-500/20">
                Initiate Broadcast <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform" />
              </button>
            </form>
          </div>

          <div className="lg:col-span-4 space-y-10">
             <div className="premium-card p-12 bg-black text-white space-y-8 h-fit relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 bg-white/10 rounded-[2rem] flex items-center justify-center text-emerald-400 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                   <Shield className="w-8 h-8" />
                </div>
                <h4 className="text-display text-3xl italic leading-none relative z-10">Governance Policy</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium italic relative z-10">All project deployments are audited for technical clarity. Direct escrow protocols protect your capital throughout the development cycle.</p>
                
                <div className="pt-8 border-t border-white/10 space-y-4 relative z-10">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-emerald-500">
                      <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Secure Escrow</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-emerald-500">
                      <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Manual Audit</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-emerald-500">
                      <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Elite Matching</span>
                   </div>
                </div>
             </div>

             <div className="premium-card p-10 bg-zinc-50 border-none space-y-6">
                <div className="flex items-center gap-4">
                   <Command className="w-5 h-5 text-black/20" />
                   <p className="text-label text-[8px] tracking-[0.2em]">Procurement Intel</p>
                </div>
                <div className="space-y-4">
                   <p className="text-[10px] font-medium text-black/40 italic">Average specialist bid for {formData.category || 'General'} is currently $2.4k with a delivery cycle of 14 days.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TypeSelectionBtn = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    type="button"
    onClick={onClick}
    className={`flex-1 p-8 rounded-[2.5rem] border-2 transition-all duration-700 flex flex-col items-center gap-4 group relative overflow-hidden ${active ? 'border-black bg-black text-white shadow-2xl scale-[1.03]' : 'border-black/5 bg-zinc-50/50 text-black/30 hover:border-black/10'}`}
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 rotate-6 group-hover:rotate-0 ${active ? 'bg-white/10' : 'bg-white shadow-sm'}`}>
      <Icon className={`w-6 h-6 ${active ? 'text-white' : 'text-black/10'}`} />
    </div>
    <span className="text-label text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
)

const BackgroundMesh = () => (
  <div className="bg-mesh-container">
    <div className="mesh-blob bg-blue-50 w-[1200px] h-[1200px] -top-[500px] -left-[300px]"></div>
    <div className="mesh-blob bg-rose-50 w-[800px] h-[800px] -bottom-[300px] -right-[200px]" style={{ animationDelay: '-8s' }}></div>
  </div>
)
