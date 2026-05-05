import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ChevronLeft, 
  Check, 
  Briefcase, 
  Shield, 
  Zap,
  Camera,
  Globe,
  Command,
  Sparkles,
  ArrowUpRight,
  Layers,
  Activity
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppContext } from '../context/AppContext';

const TabButton = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-4 text-[9px] font-bold tracking-[0.2em] uppercase transition-all rounded-2xl ${active ? 'bg-white text-black shadow-lg' : 'text-white/30 hover:text-white'}`}
  >
    {label}
  </button>
);

const InputGroup = ({ label, type, placeholder, icon: Icon, value, onChange }: any) => (
  <div className="space-y-3">
    <label className="text-label text-[8px] ml-6 flex items-center gap-3 opacity-50">{Icon && <Icon className="w-3.5 h-3.5" />} {label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 px-8 text-white focus:border-violet-500/50 outline-none transition-all placeholder:text-white/10"
    />
  </div>
);

const RoleCard = ({ active, onClick, icon: Icon, title, desc }: any) => (
  <button 
    onClick={onClick}
    className={`w-full p-10 premium-card border-2 transition-all duration-700 flex flex-col items-center gap-8 text-center group relative overflow-hidden ${active ? 'bg-violet-600/20 border-violet-500 shadow-[0_50px_100px_-20px_rgba(139,92,246,0.3)] scale-[1.05] text-white' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:shadow-2xl'}`}
  >
    <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-700 relative z-10 rotate-6 group-hover:rotate-0 ${active ? 'bg-violet-600 shadow-2xl shadow-violet-500/50 text-white' : 'bg-white/5 text-white/10'}`}>
      <Icon className="w-10 h-10" />
    </div>
    <div className="space-y-2 relative z-10">
      <h4 className={`text-display text-2xl italic tracking-tighter leading-none ${active ? 'text-white' : 'text-white/40'}`}>{title}</h4>
      <p className={`text-label text-[8px] tracking-[0.2em] font-bold ${active ? 'text-violet-400' : 'text-white/20'}`}>{desc}</p>
    </div>
  </button>
);

const SocialBtn = ({ icon: Icon, label }: any) => (
  <button className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all group">
    <Icon className="w-5 h-5 text-white/40 group-hover:text-white" />
    <span className="text-label text-[7px] text-white/10 group-hover:text-white/40">{label}</span>
  </button>
);

export const Auth = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { login } = useAppContext();

  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'freelancer' | 'agency' | 'client' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
    firstName: '',
    lastName: '',
    bio: '',
    category: 'Software Engineering',
    experience: 1,
    rateAMD: '',
    rateUSD: ''
  });

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login({
        id: 'demo-user',
        email: formData.email,
        nickname: 'architect_01',
        fullName: 'Demian Architecture',
        role: 'freelancer',
        balance: 150000,
        credits: 50,
        registeredAt: new Date().toISOString(),
        verified: true,
        rating: 5,
        online: true
      });
      navigate('/dashboard');
    } else {
      setStep(2);
    }
  };

  const handleVerify = () => {
    if (formData.verificationCode === '1234') {
      setStep(3);
    } else {
      alert("Invalid code. Use 1234 for simulation.");
    }
  };

  const handleFinalize = () => {
    login({
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      nickname: formData.nickname,
      fullName: `${formData.firstName} ${formData.lastName}`,
      role: (role === 'agency' ? 'agency' : role!) as any,
      bio: formData.bio,
      category: formData.category,
      experienceYears: formData.experience,
      balance: 0,
      credits: 20,
      registeredAt: new Date().toISOString(),
      verified: true,
      rating: 0.5,
      online: true,
      rateAMD: parseFloat(formData.rateAMD) || 0,
      rateUSD: parseFloat(formData.rateUSD) || 0
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="premium-card p-16 space-y-12 bg-white/[0.03] backdrop-blur-3xl shadow-2xl border-white/10"
            >
              <div className="flex bg-white/5 p-1.5 rounded-3xl border border-white/5">
                <TabButton active={isLogin} onClick={() => setIsLogin(true)} label={t('authentication')} />
                <TabButton active={!isLogin} onClick={() => setIsLogin(false)} label={t('initialization')} />
              </div>

              <div className="text-center space-y-4">
                <h2 className="text-display text-6xl italic leading-none text-white">{isLogin ? t('welcome_back') : t('entry_protocol')}</h2>
                <p className="text-label text-[8px] text-white/20 tracking-[0.4em]">{isLogin ? t('auth_subtitle') : t('hero_subtitle')}</p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-8">
                <div className="space-y-6">
                  <InputGroup 
                    label={t('email_identity')} 
                    type="email" 
                    placeholder="protocol-01@afmarket.am" 
                    icon={Mail} 
                    value={formData.email}
                    onChange={(v: string) => setFormData({...formData, email: v})}
                  />
                  {!isLogin && (
                    <InputGroup 
                      label={t('nickname_tag')} 
                      type="text" 
                      placeholder="architect_v1" 
                      icon={User} 
                      value={formData.nickname}
                      onChange={(v: string) => setFormData({...formData, nickname: v})}
                    />
                  )}
                  <InputGroup 
                    label={t('password_key')} 
                    type="password" 
                    placeholder="••••••••••••" 
                    icon={Lock} 
                    value={formData.password}
                    onChange={(v: string) => setFormData({...formData, password: v})}
                  />
                  {!isLogin && (
                    <InputGroup 
                      label={t('confirm_key')} 
                      type="password" 
                      placeholder="••••••••••••" 
                      icon={Shield} 
                      value={formData.confirmPassword}
                      onChange={(v: string) => setFormData({...formData, confirmPassword: v})}
                    />
                  )}
                </div>

                <button type="submit" className="btn-lux w-full py-8 text-sm group">
                  {isLogin ? t('authorize_access') : t('initiate_protocol')} <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
                </button>
              </form>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="flex-1 h-[1px] bg-white/5"></span>
                  <p className="text-label text-[8px] text-white/10">{t('external_gateways')}</p>
                  <span className="flex-1 h-[1px] bg-white/5"></span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <SocialBtn icon={Globe} label="Google" />
                  <SocialBtn icon={Zap} label="VK" />
                  <SocialBtn icon={Command} label="FB" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="premium-card p-16 space-y-12 bg-white/[0.03] border-white/10"
            >
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-label text-[8px] text-white/20 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" /> {t('welcome_back')}
              </button>
              <div className="text-center space-y-10">
                <div className="w-24 h-24 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[2.5rem] flex items-center justify-center mx-auto rotate-6 animate-pulse">
                  <Mail className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-display text-5xl italic text-white">{t('security_audit')}</h3>
                  <p className="text-label text-[8px] text-white/20 tracking-[0.4em]">Code transmitted to {formData.email}</p>
                </div>
                <div className="space-y-6">
                  <input 
                    type="text" 
                    maxLength={4}
                    placeholder="0000"
                    className="w-full text-center text-7xl font-black italic tracking-[0.5em] py-10 bg-white/5 border border-white/10 rounded-[3rem] text-white outline-none focus:bg-white/10 focus:border-violet-500/30 transition-all"
                    value={formData.verificationCode}
                    onChange={(e) => setFormData({...formData, verificationCode: e.target.value})}
                  />
                </div>
                <button onClick={handleVerify} className="btn-lux w-full py-8 text-sm">
                  {t('confirm_identity')} <Check className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="premium-card p-16 space-y-12 bg-white/[0.03] border-white/10"
            >
              <div className="text-center space-y-4">
                <h3 className="text-display text-5xl italic text-white">{t('path_selection')}</h3>
                <p className="text-label text-[8px] text-white/20 tracking-[0.4em]">{t('entry_protocol')}</p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <RoleCard 
                  active={role === 'freelancer'} 
                  onClick={() => setRole('freelancer')} 
                  icon={Briefcase} 
                  title={t('specialist_arch')} 
                  desc={t('hero_subtitle')} 
                />
                <RoleCard 
                  active={role === 'agency'} 
                  onClick={() => setRole('agency')} 
                  icon={Layers} 
                  title={t('agency_infra')} 
                  desc={t('active_protocols')} 
                />
                <RoleCard 
                  active={role === 'client'} 
                  onClick={() => setRole('client')} 
                  icon={Command} 
                  title={t('client_procurement')} 
                  desc={t('become_client_btn')} 
                />
              </div>
              <button 
                disabled={!role}
                onClick={() => setStep(4)} 
                className="btn-lux w-full py-8 text-sm disabled:opacity-20 shadow-none mt-4"
              >
                {t('proceed_profiling')} <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="premium-card p-16 space-y-12 bg-white/[0.03] border-white/10"
            >
              <div className="text-center space-y-4">
                <h3 className="text-display text-6xl italic text-fuchsia-500 leading-none">{t('profile_genesis')}</h3>
                <p className="text-label text-[8px] text-white/20 tracking-[0.4em]">{t('entry_protocol')}</p>
              </div>
              
              <div className="space-y-10">
                <div className="flex justify-center">
                  <div className="w-32 h-32 rounded-[3.5rem] bg-white/5 border-4 border-dashed border-white/10 flex items-center justify-center text-white/10 hover:border-violet-500/30 transition-all cursor-pointer group">
                    <Camera className="w-10 h-10 group-hover:scale-110 group-hover:text-violet-400 transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <InputGroup 
                    label={t('nickname_tag')} 
                    type="text" 
                    placeholder="Aris" 
                    value={formData.firstName}
                    onChange={(v: string) => setFormData({...formData, firstName: v})}
                  />
                  <InputGroup 
                    label={t('nickname_tag')} 
                    type="text" 
                    placeholder="Vardanian" 
                    value={formData.lastName}
                    onChange={(v: string) => setFormData({...formData, lastName: v})}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-label text-[8px] ml-6 flex items-center gap-3"><Zap className="w-3.5 h-3.5 text-violet-400" /> {t('technical_brief')}</label>
                  <input 
                    type="text" 
                    className="input-lux py-6 text-sm" 
                    placeholder={role === 'client' ? t('ceo_placeholder') : t('specialist_placeholder')}
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  />
                </div>

                {role !== 'client' && (
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-label text-[8px] ml-6">{t('operational_domain')}</label>
                      <select 
                        className="input-lux py-6 appearance-none"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        <option className="bg-[#0f0f0f]">{t('domain_software')}</option>
                        <option className="bg-[#0f0f0f]">{t('domain_visual')}</option>
                        <option className="bg-[#0f0f0f]">{t('domain_data')}</option>
                      </select>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                       <InputGroup 
                         label={t('resource_allocation')} 
                         type="number" 
                         placeholder="5000" 
                         value={formData.rateAMD}
                         onChange={(v: string) => setFormData({...formData, rateAMD: v})} 
                       />
                       <InputGroup 
                         label={t('rate_usd')} 
                         type="number" 
                         placeholder="12" 
                         value={formData.rateUSD}
                         onChange={(v: string) => setFormData({...formData, rateUSD: v})} 
                       />
                    </div>
                  </div>
                )}

                <button onClick={handleFinalize} className="btn-lux w-full py-10 text-lg shadow-fuchsia-500/20">
                  {t('deploy_identity')} <Sparkles className="w-8 h-8" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
