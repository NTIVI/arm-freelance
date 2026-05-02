import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  DollarSign, 
  Sparkles
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export const PostJob = () => {
  const navigate = useNavigate();
  const { addJob, user } = useAppContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    type: 'fixed' as 'fixed' | 'hourly',
    category: 'Web Development'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJob({ ...formData, clientId: user?.id || 'c1', clientName: user?.fullName || 'Demo Client' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="mb-12 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <h1 className="text-4xl md:text-5xl font-black italic uppercase italic mb-12">Post new <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">opportunity.</span></h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 glass-card p-10 rounded-[3rem] space-y-8">
            <input required type="text" placeholder="Project Title" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            <textarea required rows={8} placeholder="Description..." className="input-field resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          <div className="md:col-span-4 glass-card p-8 rounded-[2.5rem] space-y-8">
            <div className="relative group">
              <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
              <input required type="text" placeholder="Budget" className="input-field pl-12 font-black text-emerald-400 italic" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} />
            </div>
            <select className="input-field appearance-none cursor-pointer" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option>Web Development</option>
              <option>Mobile Development</option>
              <option>UI/UX Design</option>
            </select>
            <button type="submit" className="btn-primary w-full py-5 text-xs font-black uppercase tracking-widest">Launch Project <Sparkles className="w-4 h-4" /></button>
          </div>
        </form>
      </div>
    </div>
  )
}
