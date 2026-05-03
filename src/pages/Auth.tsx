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
  Check
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

export const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const { t } = useLanguage();
  
  const [step, setStep] = useState(1); // 1: Email/Pass, 2: Verification, 3: Role, 4: Profile
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'client' | 'freelancer' | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    bio: '',
    category: 'Web Development',
    experienceYears: 1
  });

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Mock login for demo
      login({ id: 'demo', fullName: 'Demo User', email: formData.email, role: 'freelancer' });
      navigate('/dashboard');
    } else {
      setStep(2);
    }
  };

  const handleVerify = () => {
    if (verificationCode === '1234' || verificationCode.length === 4) {
      setStep(3);
    }
  };

  const handleFinalize = () => {
    login({
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      fullName: formData.fullName,
      role: role!,
      bio: formData.bio,
      category: formData.category,
      experienceYears: formData.experienceYears,
      verified: true,
      online: true
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans relative overflow-hidden">
      <BackgroundAnimation />
      
      <div className="w-full max-w-lg relative z-10">
        <Link to="/" className="flex flex-col items-center mb-12 group">
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
            <div className="w-6 h-6 border-2 border-white rounded-sm rotate-45"></div>
          </div>
          <h2 className="mt-4 text-xl font-black uppercase italic tracking-tighter text-black">Armenia Freelance</h2>
        </Link>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass-panel p-10 space-y-8 bg-white border border-black/5 shadow-2xl">
              <div className="text-center">
                <h3 className="text-3xl font-black uppercase italic">{isLogin ? t('login') : t('register')}</h3>
              </div>
              <form onSubmit={handleStep1} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-4">{t('email')}</label>
                  <input 
                    type="email" 
                    required 
                    className="input-capsule w-full bg-zinc-50 border-black/5 focus:bg-white" 
                    placeholder="name@gmail.com" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-4">{t('password')}</label>
                  <input 
                    type="password" 
                    required 
                    className="input-capsule w-full bg-zinc-50 border-black/5 focus:bg-white" 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn-capsule w-full py-5 justify-center">
                  {isLogin ? t('login') : t('register')} <ArrowRight className="w-5 h-5" />
                </button>
              </form>
              <button onClick={() => setIsLogin(!isLogin)} className="w-full text-[10px] font-black uppercase text-gray-400 hover:text-black transition-colors">
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass-panel p-10 space-y-8 bg-white border border-black/5 shadow-2xl">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto">
                   <Mail className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-black uppercase italic">{t('confirm_email_title')}</h3>
                <p className="text-xs text-gray-400 font-medium">{t('confirm_email_desc')}</p>
              </div>
              <div className="space-y-6">
                <input 
                  type="text" 
                  maxLength={4} 
                  className="w-full text-center text-4xl font-black tracking-[1em] py-6 bg-zinc-50 rounded-3xl border border-black/5 outline-none focus:bg-white transition-all" 
                  placeholder="0000"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                />
                <button onClick={handleVerify} className="btn-capsule w-full py-5 justify-center">
                  Verify <Check className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass-panel p-10 space-y-8 bg-white border border-black/5 shadow-2xl">
              <div className="text-center">
                <h3 className="text-2xl font-black uppercase italic">{t('select_role')}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              <button disabled={!role} onClick={() => setStep(4)} className="btn-capsule w-full py-5 justify-center disabled:opacity-30">
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass-panel p-10 space-y-8 bg-white border border-black/5 shadow-2xl">
              <div className="text-center">
                <h3 className="text-2xl font-black uppercase italic">Complete Profile</h3>
              </div>
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-3xl bg-black/5 border-2 border-dashed border-black/10 flex items-center justify-center text-gray-400 group cursor-pointer hover:border-black/30 transition-all">
                    <Camera className="w-8 h-8" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-4">Full Name</label>
                    <input type="text" className="input-capsule w-full py-4 text-sm" placeholder="John Doe" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-4">{t('bio')}</label>
                    <textarea rows={3} className="input-capsule w-full py-4 text-sm resize-none rounded-3xl" placeholder="Tell us about yourself..." value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})}></textarea>
                  </div>
                  {role === 'freelancer' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-4">Experience (Years)</label>
                        <input type="number" className="input-capsule w-full py-4 text-sm" value={formData.experienceYears} onChange={e => setFormData({...formData, experienceYears: parseInt(e.target.value)})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-4">Sphere</label>
                        <select className="input-capsule w-full py-4 text-sm appearance-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                          <option>Web Development</option>
                          <option>Design</option>
                          <option>Mobile Apps</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={handleFinalize} className="btn-capsule w-full py-5 justify-center">
                  Start Working <CheckCircle2 className="w-5 h-5" />
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
    className={`p-6 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 text-center ${active ? 'bg-black text-white border-black shadow-xl scale-105' : 'bg-white border-black/5 text-gray-400 hover:border-black/20'}`}
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${active ? 'bg-white/20' : 'bg-black/5'}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h4 className="text-sm font-black uppercase italic">{title}</h4>
      <p className={`text-[9px] font-bold uppercase tracking-tighter ${active ? 'text-white/60' : 'text-gray-400'}`}>{desc}</p>
    </div>
  </button>
);

const BackgroundAnimation = () => {
  return (
    <div className="bg-mesh">
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className="floating-circle"
          style={{
            width: Math.random() * 200 + 50 + 'px',
            height: Math.random() * 200 + 50 + 'px',
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 20 + 's',
            animationDuration: Math.random() * 20 + 10 + 's',
            opacity: Math.random() * 0.05
          }}
        />
      ))}
    </div>
  );
};
