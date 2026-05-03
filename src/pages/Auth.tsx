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
  CheckCircle2
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
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-lg">
        <Link to="/" className="flex flex-col items-center mb-16 space-y-4 group">
          <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center shadow-xl group-hover:bg-indigo-600 transition-all">
            <div className="w-7 h-7 border-2 border-white rounded rotate-45"></div>
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Armenia Freelance</h2>
        </Link>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key="auth-form" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }} className="glass-panel p-12 rounded-[3.5rem] space-y-10">
              <div className="text-center space-y-2">
                <h3 className="text-3xl font-black uppercase italic">{isLogin ? 'Hello Again' : 'Join AF'}</h3>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Premium Professional Network</p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                    <input required type="text" placeholder="Full Name" className="input-capsule pl-14 w-full" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                  </div>
                )}
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                  <input required type="email" placeholder="Gmail / Email Address" className="input-capsule pl-14 w-full" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                  <input required type="password" placeholder="Password" className="input-capsule pl-14 w-full" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
                {!isLogin && (
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                    <input required type="password" placeholder="Confirm Password" className="input-capsule pl-14 w-full" />
                  </div>
                )}
                
                <button type="submit" className="btn-capsule w-full py-5 justify-center shadow-2xl shadow-black/10 mt-6">
                  {isLogin ? 'Enter Workspace' : 'Create Account'} <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="space-y-4 pt-6 border-t border-black/5">
                <p className="text-[9px] font-black uppercase text-gray-400 text-center tracking-widest">Or connect with</p>
                <div className="grid grid-cols-3 gap-3">
                  <SocialBtn icon="/google-icon.svg" label="Google" />
                  <SocialBtn icon="/vk-icon.svg" label="VK" />
                  <SocialBtn icon="/fb-icon.svg" label="Facebook" color="bg-[#1877F2]" />
                </div>
              </div>

              <button onClick={() => setIsLogin(!isLogin)} className="w-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors pt-4">
                {isLogin ? "Create an Elite Account" : "Access Existing Workspace"}
              </button>
            </motion.div>
          ) : (
            <motion.div key="role-selection" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
               <RoleOption selected={role === 'freelancer'} onClick={() => setRole('freelancer')} icon={Briefcase} title="Elite Specialist" desc="I provide professional services" />
               <RoleOption selected={role === 'client'} onClick={() => setRole('client')} icon={Users} title="Marketplace Client" desc="I hire top-tier talent" />
               {role && (
                 <button onClick={handleFinalize} className="btn-capsule w-full py-5 justify-center animate-bounce mt-8">
                   Initialize Profile <ArrowRight className="w-5 h-5" />
                 </button>
               )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const SocialBtn = ({ label, color }: any) => (
  <button className={`flex items-center justify-center p-3 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/60 transition-all group`}>
    <div className={`w-5 h-5 rounded-md ${color || 'bg-white'} flex items-center justify-center text-[10px] font-bold`}>
      {label[0]}
    </div>
  </button>
)

const RoleOption = ({ selected, onClick, icon: Icon, title, desc }: any) => (
  <div onClick={onClick} className={`glass-panel p-10 rounded-[3rem] border-2 cursor-pointer transition-all ${selected ? 'border-black bg-black/90 shadow-2xl scale-105' : 'border-black/5 hover:border-black/10'} flex items-center gap-8`}>
    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all ${selected ? 'bg-white text-black' : 'bg-black/5 text-black'}`}>
      <Icon className="w-8 h-8" />
    </div>
    <div className="flex-1">
      <h4 className={`text-lg font-black uppercase italic ${selected ? 'text-white' : 'text-black'}`}>{title}</h4>
      <p className={`text-[11px] font-medium ${selected ? 'text-white/60' : 'text-gray-400'}`}>{desc}</p>
    </div>
    {selected && <CheckCircle2 className="w-6 h-6 text-white" />}
  </div>
)
