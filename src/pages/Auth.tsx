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
  KeyRound
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

export const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const { t } = useLanguage();
  
  const [step, setStep] = useState(1); // 1: Auth (Login/Reg), 2: Verification, 3: Role, 4: Profile
  const [isLogin, setIsLogin] = useState(true);
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
    experienceYears: 1
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
    }
  };

  const sendCode = () => {
    setIsCodeSent(true);
    // Simulate API call
    setTimeout(() => {
      alert("Verification code sent to " + formData.email + " (Code: 1234)");
    }, 500);
  };

  const handleVerify = () => {
    if (verificationCode === '1234') {
      setStep(3);
    } else {
      alert("Invalid code. Please try again.");
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
      verified: true,
      online: true,
      rating: 5,
      completedJobs: 0,
      age: 25 // Default for demo
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans relative overflow-hidden">
      <BackgroundAnimation />
      
      <div className="w-full max-w-lg relative z-10">
        <div className="flex flex-col items-center mb-12">
          <Link to="/" className="flex flex-col items-center group">
            <div className="w-14 h-14 bg-black rounded-[2rem] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-all duration-700 shadow-2xl">
              <div className="w-6 h-6 border-2 border-white rounded rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-black uppercase italic tracking-tighter text-black text-gradient">AF MARKET</h2>
          </Link>
          <div className="mt-4 flex flex-col items-center gap-2">
             <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] leading-none">Powered by Agile Business</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1" 
              initial={{ opacity: 0, y: 20, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: -20, scale: 0.95 }} 
              className="glass-panel p-12 space-y-10"
            >
              <div className="flex justify-center mb-8">
                <div className="bg-black/5 p-1 rounded-2xl flex w-full">
                  <button 
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${isLogin ? 'bg-white text-black shadow-lg' : 'text-gray-400'}`}
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${!isLogin ? 'bg-white text-black shadow-lg' : 'text-gray-400'}`}
                  >
                    Register
                  </button>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-4xl font-black uppercase italic tracking-tighter">{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">
                  {isLogin ? 'Enter your details to continue' : 'Join the elite freelance network'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-4 flex items-center gap-2">
                    <Mail className="w-3 h-3" /> {t('email')}
                  </label>
                  <input 
                    type="email" 
                    required 
                    className="input-capsule w-full" 
                    placeholder="name@gmail.com" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-4 flex items-center gap-2">
                    <Lock className="w-3 h-3" /> {t('password')}
                  </label>
                  <input 
                    type="password" 
                    required 
                    className="input-capsule w-full" 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                </div>
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-4 flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3" /> Confirm Password
                    </label>
                    <input 
                      type="password" 
                      required 
                      className="input-capsule w-full" 
                      placeholder="••••••••" 
                      value={formData.confirmPassword}
                      onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                  </div>
                )}
                <button type="submit" className="btn-capsule w-full py-6 justify-center shadow-2xl shadow-black/20">
                  {isLogin ? 'Sign In' : 'Get Started'} <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }} 
              className="glass-panel p-12 space-y-10"
            >
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-all">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-black/5 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                   <KeyRound className="w-10 h-10 text-black" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter">Verify Email</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">We sent a 4-digit code to {formData.email}</p>
                </div>
              </div>

              <div className="space-y-8">
                {!isCodeSent ? (
                  <button onClick={sendCode} className="btn-capsule w-full py-6 justify-center bg-zinc-100 !text-black border border-black/5">
                    Send Verification Code
                  </button>
                ) : (
                  <div className="space-y-6">
                    <input 
                      type="text" 
                      maxLength={4} 
                      className="w-full text-center text-5xl font-black tracking-[0.5em] py-8 bg-zinc-50 rounded-[2.5rem] border border-black/5 outline-none focus:bg-white focus:ring-8 focus:ring-black/5 transition-all text-black" 
                      placeholder="0000"
                      value={verificationCode}
                      onChange={e => setVerificationCode(e.target.value)}
                    />
                    <div className="flex flex-col gap-4">
                      <button onClick={handleVerify} className="btn-capsule w-full py-6 justify-center shadow-2xl shadow-black/20">
                        Confirm Code <Check className="w-5 h-5 ml-2" />
                      </button>
                      <button onClick={sendCode} className="text-[10px] font-black uppercase text-gray-400 hover:text-black transition-all">
                        Resend Code
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3" 
              initial={{ opacity: 0, scale: 1.1 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }} 
              className="glass-panel p-12 space-y-10"
            >
              <div className="text-center">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">{t('select_role')}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">Choose how you want to use the platform</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <RoleCard 
                  active={role === 'freelancer'} 
                  onClick={() => setRole('freelancer')} 
                  icon={Briefcase} 
                  title={t('freelancer')} 
                  desc="I want to work"
                />
                <RoleCard 
                  active={role === 'client'} 
                  onClick={() => setRole('client')} 
                  icon={Users} 
                  title={t('client')} 
                  desc="I want to hire"
                />
              </div>
              <button disabled={!role} onClick={() => setStep(4)} className="btn-capsule w-full py-6 justify-center disabled:opacity-30 shadow-2xl shadow-black/10">
                Continue <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4" 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="glass-panel p-12 space-y-10"
            >
              <div className="text-center">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">Complete Profile</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">Tell us more about yourself</p>
              </div>
              <div className="space-y-8">
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="w-28 h-28 rounded-[2.5rem] bg-black/5 border-2 border-dashed border-black/10 flex items-center justify-center text-gray-400 group-hover:border-black/30 transition-all duration-500 cursor-pointer overflow-hidden">
                      <Camera className="w-10 h-10 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl">
                      <Check className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-4">First Name</label>
                      <input type="text" className="input-capsule w-full py-4 text-sm" placeholder="John" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-4">Last Name</label>
                      <input type="text" className="input-capsule w-full py-4 text-sm" placeholder="Doe" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-4">
                      {role === 'freelancer' ? 'Professional Bio' : 'Brief Bio'}
                    </label>
                    <textarea 
                      rows={role === 'freelancer' ? 5 : 3} 
                      className="input-capsule w-full py-5 text-sm resize-none" 
                      placeholder={role === 'freelancer' ? "Describe your expertise, projects and skills in detail..." : "What do you need help with?"}
                      value={formData.bio} 
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                    ></textarea>
                  </div>
                  {role === 'freelancer' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-4">Experience (Years)</label>
                        <input type="number" className="input-capsule w-full py-4 text-sm" value={formData.experienceYears} onChange={e => setFormData({...formData, experienceYears: parseInt(e.target.value)})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-4">Industry</label>
                        <select className="input-capsule w-full py-4 text-sm appearance-none cursor-pointer" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                          <option>Web Development</option>
                          <option>Design</option>
                          <option>Mobile Apps</option>
                          <option>Marketing</option>
                          <option>Copywriting</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={handleFinalize} className="btn-capsule w-full py-6 justify-center shadow-2xl shadow-black/20">
                  Complete Registration <CheckCircle2 className="w-5 h-5 ml-2" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const RoleCard = ({ active, onClick, icon: Icon, title, desc }: any) => (
  <button 
    onClick={onClick}
    className={`p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col items-center gap-6 text-center group ${active ? 'bg-black text-white border-black shadow-2xl scale-105' : 'bg-white border-black/5 text-gray-400 hover:border-black/10 hover:shadow-xl'}`}
  >
    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500 ${active ? 'bg-white/10 scale-110 rotate-3' : 'bg-black/5 group-hover:bg-black/10'}`}>
      <Icon className={`w-8 h-8 ${active ? 'text-white' : 'text-black'}`} />
    </div>
    <div className="space-y-1">
      <h4 className="text-sm font-black uppercase italic tracking-tighter">{title}</h4>
      <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${active ? 'text-white/50' : 'text-gray-400'}`}>{desc}</p>
    </div>
  </button>
);

const BackgroundAnimation = () => {
  return (
    <div className="bg-mesh">
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="floating-circle"
          style={{
            width: Math.random() * 300 + 100 + 'px',
            height: Math.random() * 300 + 100 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 20 + 's',
            animationDuration: Math.random() * 30 + 15 + 's',
            opacity: Math.random() * 0.03
          }}
        />
      ))}
    </div>
  );
};

