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
  Star,
  Check,
  ChevronLeft,
  ShieldCheck,
  Send,
  ArrowUpRight,
  Sparkles,
  Command,
  Shield,
  Zap
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

export const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const { t } = useLanguage();
  
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // 1: Form, 2: Verification, 3: Role, 4: Profile
  const [role, setRole] = useState<'client' | 'freelancer' | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    bio: '',
    category: 'Web Development',
    experienceYears: 1,
    age: 24
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Mock login
      login({ id: 'demo', fullName: 'Demo User', email: formData.email, role: 'freelancer' });
      navigate('/dashboard');
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      setStep(2);
      sendCode();
    }
  };

  const sendCode = () => {
    setIsCodeSent(true);
    // Simulation
    setTimeout(() => {
      alert("Verification code: 1234 (sent to " + formData.email + ")");
    }, 500);
  };

  const handleVerify = () => {
    if (verificationCode === '1234') {
      setStep(3);
    } else {
      alert("Invalid code. Please use 1234.");
    }
  };

  const handleFinalize = () => {
    login({
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: `${formData.firstName} ${formData.lastName}`,
      role: role!,
      bio: formData.bio,
      category: role === 'freelancer' ? formData.category : undefined,
      experienceYears: role === 'freelancer' ? formData.experienceYears : undefined,
      age: formData.age,
      verified: true,
      online: true,
      rating: 5,
      completedJobsCount: 0
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8 font-sans relative overflow-hidden text-black selection:bg-black selection:text-white">
      <BackgroundMesh />
      
      <div className="w-full max-w-xl relative z-10">
        <div className="flex flex-col items-center mb-16">
          <Link to="/" className="flex flex-col items-center group">
            <div className="w-16 h-16 bg-black rounded-[1.5rem] flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-700">
               <div className="w-6 h-6 border-2 border-white rounded rotate-45 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
               </div>
            </div>
            <h2 className="mt-8 text-display text-4xl italic">AF MARKET</h2>
          </Link>
          <div className="mt-4 flex items-center gap-3">
             <span className="w-8 h-[1px] bg-black/10"></span>
             <p className="text-label text-[8px] tracking-[0.5em] text-black/30">SECURE TERMINAL ACCESS</p>
             <span className="w-8 h-[1px] bg-black/10"></span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1" 
              initial={{ opacity: 0, scale: 0.95, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: -30 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="premium-card p-16 space-y-12 bg-white/70 backdrop-blur-3xl"
            >
              <div className="flex bg-zinc-100/50 p-2 rounded-3xl border border-black/5">
                <button 
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all duration-500 ${isLogin ? 'bg-black text-white shadow-2xl' : 'text-gray-400 hover:text-black'}`}
                >
                  Authentication
                </button>
                <button 
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all duration-500 ${!isLogin ? 'bg-black text-white shadow-2xl' : 'text-gray-400 hover:text-black'}`}
                >
                  Initialization
                </button>
              </div>

              <div className="text-center space-y-4">
                <h3 className="text-display text-5xl leading-none italic">{isLogin ? 'Welcome Back' : 'Entry Protocol'}</h3>
                <p className="text-label text-[8px] text-black/20 tracking-[0.3em]">{isLogin ? 'Synchronize with your profile' : 'Begin your elite specialist journey'}</p>
              </div>

              <form onSubmit={handleAuth} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-label text-[8px] ml-6 flex items-center gap-3">
                    <Mail className="w-3.5 h-3.5" /> Satellite Identity (Email)
                  </label>
                  <input 
                    type="email" 
                    required 
                    className="input-lux py-6 text-sm" 
                    placeholder="protocol-01@afmarket.io" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-label text-[8px] ml-6 flex items-center gap-3">
                    <Lock className="w-3.5 h-3.5" /> Access Key (Password)
                  </label>
                  <input 
                    type="password" 
                    required 
                    className="input-lux py-6 text-sm" 
                    placeholder="••••••••••••" 
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                </div>
                {!isLogin && (
                  <div className="space-y-4">
                    <label className="text-label text-[8px] ml-6 flex items-center gap-3">
                      <ShieldCheck className="w-3.5 h-3.5" /> Confirm Access Key
                    </label>
                    <input 
                      type="password" 
                      required 
                      className="input-lux py-6 text-sm" 
                      placeholder="••••••••••••" 
                      value={formData.confirmPassword}
                      onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                  </div>
                )}
                <button type="submit" className="btn-lux w-full py-8 text-sm group">
                  {isLogin ? 'Authorize Access' : 'Initiate Protocol'} <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2" 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -30 }} 
              className="premium-card p-16 space-y-12 bg-white/70 backdrop-blur-3xl"
            >
              <button onClick={() => setStep(1)} className="flex items-center gap-3 text-label text-[8px] text-black/30 hover:text-black transition-all">
                <ChevronLeft className="w-4 h-4" /> Revert to Base
              </button>
              <div className="text-center space-y-8">
                <div className="w-24 h-24 bg-black/5 rounded-[2.5rem] flex items-center justify-center mx-auto rotate-6 animate-pulse">
                   <Shield className="w-12 h-12 text-black" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-display text-5xl leading-none italic">Security Audit</h3>
                  <p className="text-label text-[8px] text-black/20 tracking-[0.3em]">Code transmitted to {formData.email}</p>
                </div>
              </div>
              <div className="space-y-10">
                <input 
                  type="text" 
                  maxLength={4} 
                  className="w-full text-center text-8xl font-black italic tracking-[0.5em] py-12 bg-zinc-50/50 rounded-[3rem] border border-black/5 outline-none focus:bg-white focus:ring-[16px] focus:ring-black/5 transition-all text-black" 
                  placeholder="0000"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                />
                <div className="flex flex-col gap-6">
                  <button onClick={handleVerify} className="btn-lux w-full py-8 text-sm">
                    Confirm Identity <Check className="w-6 h-6" />
                  </button>
                  <button onClick={sendCode} className="text-label text-[8px] hover:text-black transition-all">Re-transmit Credentials</button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3" 
              initial={{ opacity: 0, scale: 1.1 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }} 
              className="premium-card p-16 space-y-12 bg-white/70 backdrop-blur-3xl"
            >
              <div className="text-center space-y-4">
                <h3 className="text-display text-5xl leading-none italic">Path Selection</h3>
                <p className="text-label text-[8px] text-black/20 tracking-[0.3em]">Define your ecosystem role</p>
              </div>
              <div className="grid grid-cols-1 gap-8">
                <RoleSelectionCard 
                  active={role === 'freelancer'} 
                  onClick={() => setRole('freelancer')} 
                  icon={Briefcase} 
                  title="Specialist Architecture" 
                  desc="Supply high-end technical expertise"
                />
                <RoleSelectionCard 
                  active={role === 'client'} 
                  onClick={() => setRole('client')} 
                  icon={Command} 
                  title="Client Procurement" 
                  desc="Source elite talent for scaling visions"
                />
              </div>
              <button disabled={!role} onClick={() => setStep(4)} className="btn-lux w-full py-8 text-sm disabled:opacity-20 shadow-none">
                Proceed to Profiling <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4" 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="premium-card p-16 space-y-16 bg-white/70 backdrop-blur-3xl max-w-2xl mx-auto"
            >
              <div className="text-center space-y-4">
                <h3 className="text-display text-6xl leading-none italic text-emerald-500">Profile Genesis</h3>
                <p className="text-label text-[8px] text-black/20 tracking-[0.3em]">Metadata injection complete. Finalizing identity.</p>
              </div>
              <div className="space-y-12">
                <div className="flex justify-center">
                  <div className="w-32 h-32 rounded-[3rem] bg-zinc-50 border-4 border-dashed border-black/5 flex items-center justify-center text-black/10 hover:border-black/20 transition-all cursor-pointer rotate-6 hover:rotate-0 duration-700 group">
                    <Camera className="w-10 h-10 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="space-y-10">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-label text-[8px] ml-6">Given Name</label>
                      <input type="text" className="input-lux" placeholder="John" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                    </div>
                    <div className="space-y-4">
                      <label className="text-label text-[8px] ml-6">Surname</label>
                      <input type="text" className="input-lux" placeholder="Doe" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-label text-[8px] ml-6">Professional Narrative (Bio)</label>
                    <textarea 
                      rows={4} 
                      className="w-full bg-zinc-50 border border-black/5 rounded-[3rem] p-10 outline-none focus:bg-white focus:ring-[16px] focus:ring-black/5 transition-all text-sm font-medium italic resize-none" 
                      placeholder="Elaborate on your architectural focus and technical mastery..."
                      value={formData.bio} 
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                    ></textarea>
                  </div>
                  {role === 'freelancer' && (
                    <div className="grid grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-label text-[8px] ml-6">Experience Index</label>
                        <input type="number" className="input-lux" value={formData.experienceYears} onChange={e => setFormData({...formData, experienceYears: parseInt(e.target.value)})} />
                      </div>
                      <div className="space-y-4">
                        <label className="text-label text-[8px] ml-6">Biological Age</label>
                        <input type="number" className="input-lux" value={formData.age} onChange={e => setFormData({...formData, age: parseInt(e.target.value)})} />
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={handleFinalize} className="btn-lux w-full py-10 text-lg shadow-emerald-500/20">
                  Deploy Identity <Sparkles className="w-8 h-8" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const RoleSelectionCard = ({ active, onClick, icon: Icon, title, desc }: any) => (
  <button 
    onClick={onClick}
    className={`p-10 premium-card border-2 transition-all duration-700 flex flex-col items-center gap-8 text-center group relative overflow-hidden ${active ? 'bg-black text-white border-black shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] scale-[1.05]' : 'bg-white border-black/5 text-gray-400 hover:border-black/20 hover:shadow-2xl'}`}
  >
    {active && (
       <motion.div layoutId="glow" className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
    )}
    <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-700 relative z-10 rotate-6 group-hover:rotate-0 ${active ? 'bg-white/10' : 'bg-zinc-50'}`}>
      <Icon className={`w-10 h-10 ${active ? 'text-emerald-400' : 'text-black/10'}`} />
    </div>
    <div className="space-y-2 relative z-10">
      <h4 className="text-display text-2xl italic tracking-tighter leading-none">{title}</h4>
      <p className={`text-label text-[8px] tracking-[0.2em] font-bold ${active ? 'text-white/40' : 'text-gray-400'}`}>{desc}</p>
    </div>
  </button>
);

const BackgroundMesh = () => (
  <div className="bg-mesh-container">
    <div className="mesh-blob bg-indigo-200 w-[1200px] h-[1200px] top-[-500px] left-[-200px]"></div>
    <div className="mesh-blob bg-rose-100 w-[800px] h-[800px] bottom-[-400px] right-[-200px]" style={{ animationDelay: '-8s' }}></div>
  </div>
)
