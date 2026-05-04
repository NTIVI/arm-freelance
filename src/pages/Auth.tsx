import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Briefcase, 
  Camera,
  Check,
  CircleCheck,
  ChevronLeft,
  ShieldCheck,
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
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 font-sans relative overflow-hidden text-white selection:bg-violet-500 selection:text-white">
      <BackgroundMesh />
      <div className="bg-overlay"></div>
      
      <div className="w-full max-w-xl relative z-10">
        <div className="flex flex-col items-center mb-16">
          <Link to="/" className="flex flex-col items-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[2rem] flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-700 shadow-violet-500/30">
               <div className="w-8 h-8 border-2 border-white rounded rotate-45 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
               </div>
            </div>
            <h2 className="mt-8 text-display text-5xl italic text-white tracking-tighter">AF MARKET</h2>
          </Link>
          <div className="mt-6 flex items-center gap-4">
             <span className="w-12 h-[1px] bg-white/10"></span>
             <p className="text-label text-[8px] tracking-[0.6em] text-white/30">SECURE TERMINAL ACCESS</p>
             <span className="w-12 h-[1px] bg-white/10"></span>
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
              className="premium-card p-16 space-y-12 bg-white/[0.03] backdrop-blur-3xl shadow-2xl border-white/10"
            >
              <div className="flex bg-white/5 p-2 rounded-3xl border border-white/5">
                <button 
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all duration-500 ${isLogin ? 'bg-white text-black shadow-2xl' : 'text-white/20 hover:text-white'}`}
                >
                  Authentication
                </button>
                <button 
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all duration-500 ${!isLogin ? 'bg-white text-black shadow-2xl' : 'text-white/20 hover:text-white'}`}
                >
                  Initialization
                </button>
              </div>

              <div className="text-center space-y-4">
                <h3 className="text-display text-6xl leading-none italic bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">{isLogin ? 'Welcome Back' : 'Entry Protocol'}</h3>
                <p className="text-label text-[8px] text-white/20 tracking-[0.4em]">{isLogin ? 'Synchronize with your profile' : 'Begin your elite specialist journey'}</p>
              </div>

              <form onSubmit={handleAuth} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-label text-[8px] ml-6 flex items-center gap-3">
                    <Mail className="w-3.5 h-3.5 text-violet-400" /> Satellite Identity (Email)
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
                    <Lock className="w-3.5 h-3.5 text-fuchsia-400" /> Access Key (Password)
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
                      <ShieldCheck className="w-3.5 h-3.5 text-pink-400" /> Confirm Access Key
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
                <button type="submit" className="btn-lux w-full py-8 text-sm group mt-4">
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
              className="premium-card p-16 space-y-12 bg-white/[0.03] backdrop-blur-3xl shadow-2xl border-white/10"
            >
              <button onClick={() => setStep(1)} className="flex items-center gap-3 text-label text-[8px] text-white/30 hover:text-white transition-all">
                <ChevronLeft className="w-4 h-4" /> Revert to Base
              </button>
              <div className="text-center space-y-8">
                <div className="w-24 h-24 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[2.5rem] flex items-center justify-center mx-auto rotate-6 animate-pulse shadow-2xl shadow-violet-500/20">
                   <Shield className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-display text-5xl leading-none italic text-white">Security Audit</h3>
                  <p className="text-label text-[8px] text-white/20 tracking-[0.4em]">Code transmitted to {formData.email}</p>
                </div>
              </div>
              <div className="space-y-10">
                <input 
                  type="text" 
                  maxLength={4} 
                  className="w-full text-center text-8xl font-black italic tracking-[0.5em] py-12 bg-white/5 rounded-[3rem] border border-white/10 outline-none focus:bg-white/10 focus:ring-[16px] focus:ring-violet-500/5 transition-all text-white" 
                  placeholder="0000"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                />
                <div className="flex flex-col gap-6">
                  <button onClick={handleVerify} className="btn-lux w-full py-8 text-sm">
                    Confirm Identity <Check className="w-6 h-6" />
                  </button>
                  <button onClick={sendCode} className="text-label text-[8px] text-white/20 hover:text-white transition-all">Re-transmit Credentials</button>
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
              className="premium-card p-16 space-y-12 bg-white/[0.03] backdrop-blur-3xl shadow-2xl border-white/10"
            >
              <div className="text-center space-y-4">
                <h3 className="text-display text-5xl leading-none italic text-white">Path Selection</h3>
                <p className="text-label text-[8px] text-white/20 tracking-[0.4em]">Define your ecosystem role</p>
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
              <button disabled={!role} onClick={() => setStep(4)} className="btn-lux w-full py-8 text-sm disabled:opacity-20 shadow-none mt-4">
                Proceed to Profiling <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4" 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="premium-card p-16 space-y-16 bg-white/[0.03] backdrop-blur-3xl max-w-2xl mx-auto shadow-2xl border-white/10"
            >
              <div className="text-center space-y-4">
                <h3 className="text-display text-6xl leading-none italic text-fuchsia-500">Profile Genesis</h3>
                <p className="text-label text-[8px] text-white/20 tracking-[0.4em]">Metadata injection complete. Finalizing identity.</p>
              </div>
              <div className="space-y-12">
                <div className="flex justify-center">
                  <div className="w-32 h-32 rounded-[3rem] bg-white/5 border-4 border-dashed border-white/10 flex items-center justify-center text-white/10 hover:border-violet-500/30 transition-all cursor-pointer rotate-6 hover:rotate-0 duration-700 group">
                    <Camera className="w-10 h-10 group-hover:scale-110 group-hover:text-violet-400 transition-all" />
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
                      className="w-full bg-white/5 border border-white/10 rounded-[3rem] p-10 outline-none focus:bg-white/10 focus:border-violet-500/30 focus:ring-[16px] focus:ring-violet-500/5 transition-all text-sm font-medium italic resize-none text-white" 
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
                <button onClick={handleFinalize} className="btn-lux w-full py-10 text-lg shadow-fuchsia-500/20">
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

function RoleSelectionCard({ active, onClick, icon: Icon, title, desc }: any) {
  return (
    <button 
      onClick={onClick}
      className={`p-10 premium-card border-2 transition-all duration-700 flex flex-col items-center gap-8 text-center group relative overflow-hidden ${active ? 'bg-white text-black border-white shadow-[0_50px_100px_-20px_rgba(255,255,255,0.2)] scale-[1.05]' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:shadow-2xl'}`}
    >
      {active && (
         <motion.div layoutId="glow" className="absolute inset-0 bg-violet-500/30 blur-3xl rounded-full" />
      )}
      <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-700 relative z-10 rotate-6 group-hover:rotate-0 ${active ? 'bg-black/10' : 'bg-white/5'}`}>
        <Icon className={`w-10 h-10 ${active ? 'text-violet-600' : 'text-white/10'}`} />
      </div>
      <div className="space-y-2 relative z-10">
        <h4 className="text-display text-2xl italic tracking-tighter leading-none">{title}</h4>
        <p className={`text-label text-[8px] tracking-[0.2em] font-bold ${active ? 'text-black/40' : 'text-white/20'}`}>{desc}</p>
      </div>
    </button>
  )
}

function BackgroundMesh() {
  return (
    <div className="bg-mesh-container">
      <div className="mesh-blob bg-violet-600/30 w-[1200px] h-[1200px] top-[-500px] left-[-200px]"></div>
      <div className="mesh-blob bg-fuchsia-600/20 w-[800px] h-[800px] bottom-[-400px] right-[-200px]" style={{ animationDelay: '-8s' }}></div>
    </div>
  )
}
