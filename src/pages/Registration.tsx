import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Users, ShieldCheck, Mail, Phone, ArrowLeft, Camera, Upload, Globe2, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export const RegistrationForm = ({ onBack, onComplete }: { onBack: () => void, onComplete: (data: any) => void }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<'freelancer' | 'agency' | 'client' | null>(null)
  const [authMethod, setAuthMethod] = useState<'email' | 'phone' | null>(null)

  const handleComplete = () => {
    onComplete({ role });
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen mesh-gradient">
      <div className="max-w-4xl mx-auto">
        <motion.button 
          whileHover={{ x: -5 }}
          onClick={onBack} 
          className="mb-12 flex items-center space-x-3 text-white/30 hover:text-white transition-all font-black uppercase tracking-[0.4em] text-[10px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Genesis / Back</span>
        </motion.button>

        <div className="flex items-center justify-between mb-12 px-2">
           <h2 className="text-4xl font-black tracking-tight font-display text-glow">
             {step === 1 ? t('step_1') : (step === 2 ? "Verification Protocol" : "Identity Blueprint")}
           </h2>
           <div className="flex space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-12 h-1.5 rounded-full transition-all duration-700 ${step >= i ? 'bg-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-white/5'}`} />
              ))}
           </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <RoleCard role="freelancer" selected={role === 'freelancer'} onClick={() => setRole('freelancer')} title={t('freelancer')} desc="I am an independent operator" icon={Briefcase} />
               <RoleCard role="client" selected={role === 'client'} onClick={() => setRole('client')} title={t('client')} desc="I am scouting for elite talent" icon={Users} />
               <RoleCard role="agency" selected={role === 'agency'} onClick={() => setRole('agency')} title={t('agency')} desc="I represent a tactical team" icon={ShieldCheck} />
              {role && (
                <div className="col-span-full pt-10 flex justify-center">
                   <button onClick={() => setStep(2)} className="btn-primary px-20 py-6 text-sm uppercase tracking-[0.3em] shadow-2xl shimmer">Initiate Connection</button>
                </div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="max-w-xl mx-auto glass-card p-12 rounded-[4rem] space-y-10 border-white/10">
               <div className="text-center space-y-3">
                  <h3 className="text-3xl font-black font-display tracking-tight uppercase">Security Layer</h3>
                  <p className="text-white/30 font-medium tracking-wide">Validate your digital signature via Email or Secure Mobile</p>
               </div>
               
               <div className="grid grid-cols-2 gap-6">
                  <button onClick={() => setAuthMethod('email')} className={`p-8 rounded-[2.5rem] flex flex-col items-center space-y-4 transition-all border-2 ${authMethod === 'email' ? 'bg-primary/10 border-primary shadow-2xl text-white' : 'bg-white/[0.02] border-white/5 text-white/30 hover:bg-white/[0.05]'}`}>
                    <Mail className="w-10 h-10" />
                    <span className="font-black text-xs uppercase tracking-widest">Digital Mail</span>
                  </button>
                  <button onClick={() => setAuthMethod('phone')} className={`p-8 rounded-[2.5rem] flex flex-col items-center space-y-4 transition-all border-2 ${authMethod === 'phone' ? 'bg-primary/10 border-primary shadow-2xl text-white' : 'bg-white/[0.02] border-white/5 text-white/30 hover:bg-white/[0.05]'}`}>
                    <Phone className="w-10 h-10" />
                    <span className="font-black text-xs uppercase tracking-widest">Mobile Link</span>
                  </button>
               </div>

               {authMethod && (
                 <div className="space-y-5 pt-4 animate-reveal">
                    <input type={authMethod === 'email' ? 'email' : 'tel'} placeholder={authMethod === 'email' ? 'Enter professional email' : '+374 XX XXXXXX'} className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-5 text-white focus:border-primary outline-none transition-all placeholder:text-white/5 font-bold" />
                    <button onClick={() => setStep(3)} className="btn-primary w-full py-6 text-xs uppercase tracking-[0.3em] shimmer">Verify Identity</button>
                 </div>
               )}
            </motion.div>
          )}

          {step === 3 && (
            <ProfileBuilder role={role!} onComplete={handleComplete} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const RoleCard = ({ selected, onClick, title, desc, icon: Icon }: any) => (
  <div onClick={onClick} className={`glass-card p-12 rounded-[4rem] space-y-8 cursor-pointer border-2 transition-all duration-500 text-center relative overflow-hidden group ${selected ? 'border-primary bg-primary/5 shadow-2xl scale-105' : 'border-white/5 hover:border-white/10'}`}>
    <div className={`w-20 h-20 rounded-[2rem] mx-auto flex items-center justify-center transition-all duration-500 ${selected ? 'bg-primary text-white shadow-[0_0_30px_rgba(99,102,241,0.5)]' : 'bg-white/5 text-primary group-hover:bg-white/10'}`}>
      <Icon className="w-10 h-10" />
    </div>
    <div className="space-y-3">
      <h3 className="text-2xl font-black tracking-tight font-display uppercase">{title}</h3>
      <p className="text-xs text-white/30 font-medium leading-relaxed px-4">{desc}</p>
    </div>
    {selected && <div className="absolute top-4 right-4"><CheckCircle2 className="w-6 h-6 text-primary" /></div>}
  </div>
)

const ProfileBuilder = ({ role, onComplete }: { role: string, onComplete: () => void }) => {
  const [avatar, setAvatar] = useState<string | null>(null)
  
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-12 md:p-20 rounded-[5rem] grid grid-cols-1 lg:grid-cols-12 gap-16 border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
      <div className="lg:col-span-4 space-y-10 flex flex-col items-center">
         <div className="relative group cursor-pointer" onClick={() => document.getElementById('avatar-up')?.click()}>
            <div className="w-56 h-56 rounded-full bg-white/5 border-4 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all duration-700 group-hover:border-primary group-hover:shadow-[0_0_50px_rgba(99,102,241,0.2)]">
               {avatar ? <img src={avatar} className="w-full h-full object-cover" /> : <Camera className="w-16 h-16 text-white/5 group-hover:text-primary transition-all duration-500" />}
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full backdrop-blur-sm">
               <Upload className="w-10 h-10 text-white" />
            </div>
            <input id="avatar-up" type="file" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setAvatar(URL.createObjectURL(file));
            }} />
         </div>
         <div className="text-center space-y-2">
            <h4 className="text-xl font-black font-display uppercase">Identity Portrait</h4>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black italic">Protocol Requirement</p>
         </div>
      </div>

      <div className="lg:col-span-8 space-y-10">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
               <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] ml-2">Assigned First Name</label>
               <input type="text" placeholder="John" className="w-full bg-white/[0.02] border border-white/10 rounded-[1.5rem] p-5 focus:border-primary outline-none transition-all placeholder:text-white/5 font-bold" />
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] ml-2">Assigned Last Name</label>
               <input type="text" placeholder="Doe" className="w-full bg-white/[0.02] border border-white/10 rounded-[1.5rem] p-5 focus:border-primary outline-none transition-all placeholder:text-white/5 font-bold" />
            </div>
         </div>

         <div className="space-y-3">
            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] ml-2">Geographic Hub</label>
            <div className="flex items-center space-x-5 bg-white/[0.02] border border-white/10 rounded-[1.5rem] p-5 focus-within:border-primary transition-all">
               <Globe2 className="w-6 h-6 text-primary" />
               <select className="bg-transparent flex-1 outline-none text-white appearance-none cursor-pointer font-bold text-sm uppercase tracking-widest">
                  <option value="am">Armenia (Yerevan Hub)</option>
                  <option value="am-gy">Armenia (Gyumri Nexus)</option>
                  <option value="am-va">Armenia (Vanadzor Node)</option>
                  <option value="other">International / Satellite</option>
               </select>
            </div>
         </div>

         {role === 'freelancer' && (
           <div className="space-y-10 animate-reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] ml-2">Compensation Index ($)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-primary font-black text-lg">$</span>
                    <input type="number" placeholder="45.00" className="w-full bg-white/[0.02] border border-white/10 rounded-[1.5rem] p-5 pl-10 focus:border-primary outline-none transition-all font-black" />
                  </div>
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] ml-2">Core Designation</label>
                  <input type="text" placeholder="e.g. Senior Architecture Lead" className="w-full bg-white/[0.02] border border-white/10 rounded-[1.5rem] p-5 focus:border-primary outline-none transition-all font-bold" />
               </div>
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] ml-2">Operational Background</label>
               <textarea placeholder="Outline your tactical experience and skillsets..." rows={4} className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 focus:border-primary outline-none resize-none transition-all text-base leading-relaxed font-medium placeholder:text-white/5"></textarea>
            </div>
           </div>
         )}

         <button onClick={onComplete} className="btn-primary w-full py-8 text-xs font-black uppercase tracking-[0.5em] shadow-2xl shimmer">Finalize Profile & Sync</button>
      </div>
    </motion.div>
  )
}
