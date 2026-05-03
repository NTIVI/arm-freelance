import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Sparkles, 
  Briefcase, 
  CheckCircle2,
  Clock
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

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
    <div className="min-h-screen bg-[#f3f4f6] p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="mb-12 flex items-center gap-3 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel Posting
        </button>

        <div className="space-y-12">
          <div className="space-y-4">
             <div className="inline-flex items-center space-x-2 px-6 py-2 bg-black/5 rounded-full text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Client Workspace</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9] text-black">
                Find your <br />
                <span className="text-gray-400">next specialist.</span>
              </h1>
          </div>

          <form onSubmit={handleSubmit} className="glass-panel p-12 rounded-[3.5rem] space-y-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">Project Title</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Need high-end React Developer"
                  className="input-capsule w-full text-xl font-black italic"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">Category</label>
                  <select 
                    className="input-capsule w-full font-bold"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option>Web Development</option>
                    <option>Design</option>
                    <option>Mobile Apps</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">Budget ($)</label>
                  <input 
                    required
                    type="number" 
                    placeholder="Enter budget"
                    className="input-capsule w-full font-bold"
                    value={formData.budget}
                    onChange={e => setFormData({...formData, budget: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">Detailed Description</label>
                <textarea 
                  required
                  rows={8}
                  placeholder="Describe the project goals, requirements and timeline..."
                  className="w-full bg-black/5 border border-black/5 rounded-[2.5rem] p-8 outline-none focus:bg-black/10 transition-all text-sm font-medium resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="flex gap-4">
                 <TypeBtn 
                   active={formData.type === 'fixed'} 
                   onClick={() => setFormData({...formData, type: 'fixed'})}
                   icon={Briefcase}
                   label="Fixed Price"
                 />
                 <TypeBtn 
                   active={formData.type === 'hourly'} 
                   onClick={() => setFormData({...formData, type: 'hourly'})}
                   icon={Clock}
                   label="Hourly Rate"
                 />
              </div>
            </div>

            <button type="submit" className="btn-capsule w-full py-6 justify-center shadow-2xl shadow-black/10">
              Launch Project <CheckCircle2 className="w-5 h-5 ml-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const TypeBtn = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    type="button"
    onClick={onClick}
    className={`flex-1 p-6 rounded-3xl border-2 transition-all flex items-center justify-center gap-3 ${active ? 'border-black bg-black text-white shadow-xl' : 'border-black/5 hover:border-black/10 text-gray-400'}`}
  >
    <Icon className="w-5 h-5" />
    <span className="text-xs font-black uppercase tracking-widest">{label}</span>
  </button>
)
