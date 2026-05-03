import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Briefcase, 
  Users, 
  CheckCircle2,
  Camera,
  Layers,
  Star
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
    firstName: '',
    lastName: '',
    bio: '',
    category: 'Web Development',
    experienceYears: 1
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login({ 
        id: 'u1', 
        email: formData.email, 
        fullName: 'Demo User', 
        role: 'freelancer' 
      });
      navigate('/dashboard');
    } else {
      setStep(2);
    }
  };

  const handleFinalize = async () => {
    let ip = '127.0.0.1';
    let country = 'Armenia';
    
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      ip = data.ip;
      country = data.country_name;
    } catch (e) {
      console.error('Failed to fetch IP/Location', e);
    }

    login({ 
      id: Math.random().toString(36).substr(2, 9), 
      email: formData.email, 
      fullName: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      bio: formData.bio,
      category: formData.category,
      experienceYears: formData.experienceYears,
      role: role!,
      ip,
      country,
      verified: false,
      online: true,
      completedJobsCount: 0,
      appliedJobsCount: 0,
      postedJobsCount: 0
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="bg-mesh"></div>
      <div className="w-full max-w-lg relative z-10">
        <Link to="/" className="flex flex-col items-center mb-16 space-y-4 group">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)] group-hover:bg-indigo-500 transition-all">
            <div className="w-7 h-7 border-2 border-white rounded rotate-45"></div>
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">Armenia Freelance</h2>
        </Link>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key="step-1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }} className="glass-panel p-12 rounded-[3.5rem] space-y-10 border border-white/10 shadow-2xl backdrop-blur-2xl">
              <div className="text-center space-y-2">
                <h3 className="text-3xl font-black uppercase italic text-white">{isLogin ? 'Hello Again' : 'Join AF'}</h3>
                <p className="text-indigo-400/60 text-[10px] font-bold uppercase tracking-widest">Premium Professional Network</p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input required type="email" placeholder="Gmail / Email Address" className="input-capsule pl-14 w-full bg-white/5 border-white/10" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input required type="password" placeholder="Password" className="input-capsule pl-14 w-full bg-white/5 border-white/10" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
                {!isLogin && (
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input required type="password" placeholder="Confirm Password" className="input-capsule pl-14 w-full bg-white/5 border-white/10" />
                  </div>
                )}
                
                <button type="submit" className="btn-capsule w-full py-5 justify-center mt-6">
                  {isLogin ? 'Enter Workspace' : 'Continue to Role'} <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <p className="text-[9px] font-black uppercase text-gray-500 text-center tracking-widest">Or connect with</p>
                <div className="grid grid-cols-3 gap-3">
                  <SocialBtn icon="G" label="Google" />
                  <SocialBtn icon="V" label="VK" />
                  <SocialBtn icon="F" label="Facebook" color="bg-[#1877F2]" />
                </div>
              </div>

              <button onClick={() => setIsLogin(!isLogin)} className="w-full text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors pt-4">
                {isLogin ? "Create an Elite Account" : "Access Existing Workspace"}
              </button>
            </motion.div>
          ) : step === 2 ? (
            <motion.div key="step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
               <div className="text-center pb-8">
                 <h3 className="text-2xl font-black uppercase italic text-white">Choose Your Path</h3>
               </div>
               <RoleOption selected={role === 'freelancer'} onClick={() => setRole('freelancer')} icon={Briefcase} title="Elite Specialist" desc="I provide professional services" />
               <RoleOption selected={role === 'client'} onClick={() => setRole('client')} icon={Users} title="Marketplace Client" desc="I hire top-tier talent" />
               {role && (
                 <button onClick={() => setStep(3)} className="btn-capsule w-full py-5 justify-center mt-8">
                   Complete Profile <ArrowRight className="w-5 h-5" />
                 </button>
               )}
            </motion.div>
          ) : (
            <motion.div key="step-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-10 rounded-[3.5rem] space-y-8 border border-white/10 shadow-2xl">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-black uppercase italic text-white">Profile Details</h3>
                <p className="text-indigo-400/60 text-[10px] font-bold uppercase tracking-widest">Almost there, {role}</p>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="w-24 h-24 bg-white/5 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer group hover:bg-white/10 transition-all">
                  <Camera className="w-8 h-8 text-gray-500 group-hover:text-indigo-400" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  <input required type="text" placeholder="First Name" className="input-capsule w-full bg-white/5 border-white/10" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  <input required type="text" placeholder="Last Name" className="input-capsule w-full bg-white/5 border-white/10" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                </div>

                <textarea 
                  required 
                  placeholder={role === 'client' ? "Short bio about your project goals..." : "Detailed description of your experience and expertise..."} 
                  rows={role === 'freelancer' ? 5 : 3} 
                  className="input-capsule w-full rounded-3xl py-4 resize-none bg-white/5 border-white/10"
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                ></textarea>

                {role === 'freelancer' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="relative">
                      <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select 
                        className="input-capsule pl-11 w-full appearance-none"
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                      >
                        <option>Web Development</option>
                        <option>Mobile Apps</option>
                        <option>UI/UX Design</option>
                        <option>DevOps</option>
                        <option>AI / Data Science</option>
                      </select>
                    </div>
                    <div className="relative">
                      <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        required 
                        type="number" 
                        placeholder="Years of Exp" 
                        className="input-capsule pl-11 w-full" 
                        value={formData.experienceYears}
                        onChange={e => setFormData({...formData, experienceYears: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                )}

                <button onClick={handleFinalize} className="btn-capsule w-full py-5 justify-center mt-4">
                  Finalize & Launch <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const SocialBtn = ({ label, color, icon }: any) => (
  <button className={`flex items-center justify-center p-3 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/60 transition-all group`}>
    <div className={`w-5 h-5 rounded-md ${color || 'bg-white text-black'} flex items-center justify-center text-[10px] font-bold`}>
      {icon}
    </div>
  </button>
)

const RoleOption = ({ selected, onClick, icon: Icon, title, desc }: any) => (
  <div onClick={onClick} className={`glass-panel p-10 rounded-[3rem] border-2 cursor-pointer transition-all ${selected ? 'border-indigo-500 bg-indigo-600 shadow-[0_0_50px_rgba(99,102,241,0.3)] scale-105' : 'border-white/10 hover:border-white/20'} flex items-center gap-8`}>
    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all ${selected ? 'bg-white text-indigo-600' : 'bg-white/5 text-white'}`}>
      <Icon className="w-8 h-8" />
    </div>
    <div className="flex-1">
      <h4 className={`text-lg font-black uppercase italic text-white`}>{title}</h4>
      <p className={`text-[11px] font-medium ${selected ? 'text-white/80' : 'text-gray-400'}`}>{desc}</p>
    </div>
    {selected && <CheckCircle2 className="w-6 h-6 text-white" />}
  </div>
)
