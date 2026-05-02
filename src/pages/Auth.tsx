import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Briefcase, 
  Users, 
  CheckCircle2, 
  Command
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'client' | 'freelancer' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login({ id: 'u1', email: formData.email, fullName: 'Demo User', role: 'freelancer' });
      navigate('/dashboard');
    } else {
      setStep(2);
    }
  };

  const handleFinalize = () => {
    login({ id: Math.random().toString(36).substr(2, 9), email: formData.email, fullName: formData.fullName, role: role! });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10 space-y-4">
          <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-2xl">
            <Command className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Armenia Freelance</h2>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key="auth-form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-[#0f172a]/50 backdrop-blur-xl border border-white/5 shadow-2xl p-10 rounded-[2.5rem] space-y-8">
              <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                    <input required type="text" placeholder="Full Name" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 pl-14 text-white focus:border-indigo-500/50 outline-none" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                  </div>
                )}
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                  <input required type="email" placeholder="Email Address" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 pl-14 text-white focus:border-indigo-500/50 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                  <input required type="password" placeholder="Password" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 pl-14 text-white focus:border-indigo-500/50 outline-none" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
                <button type="submit" className="w-full py-5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                  {isLogin ? 'Sign In' : 'Continue'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <button onClick={() => setIsLogin(!isLogin)} className="w-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </button>
            </motion.div>
          ) : (
            <motion.div key="role-selection" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
               <RoleOption selected={role === 'freelancer'} onClick={() => setRole('freelancer')} icon={Briefcase} title="Freelancer" desc="I want to find projects" />
               <RoleOption selected={role === 'client'} onClick={() => setRole('client')} icon={Users} title="Client" desc="I want to hire talent" />
               {role && <button onClick={handleFinalize} className="w-full py-5 bg-indigo-500 text-white font-bold rounded-2xl uppercase tracking-widest text-xs">Finalize & Enter</button>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const RoleOption = ({ selected, onClick, icon: Icon, title, desc }: any) => (
  <div onClick={onClick} className={`p-8 rounded-[2rem] border-2 cursor-pointer transition-all ${selected ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/5 hover:border-white/10'} flex items-start gap-6`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selected ? 'bg-indigo-500 text-white' : 'bg-white/5 text-indigo-400'}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div className="flex-1">
      <h4 className="text-sm font-black uppercase italic">{title}</h4>
      <p className="text-[11px] text-slate-500">{desc}</p>
    </div>
    {selected && <CheckCircle2 className="w-5 h-5 text-indigo-500" />}
  </div>
)
