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
    <div className="pt-32 pb-20 px-6 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.button 
          whileHover={{ x: -5 }}
          onClick={onBack} 
          className="mb-8 flex items-center space-x-3 text-white/30 hover:text-white transition-all font-bold uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </motion.button>

        <div className="flex items-center justify-between mb-12 px-2">
           <h2 className="text-3xl font-bold tracking-tight">
             {step === 1 ? t('step_1') : (step === 2 ? "Verification" : "Profile Setup")}
           </h2>
           <div className="flex space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-10 h-1.5 rounded-full transition-all duration-700 ${step >= i ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-white/5'}`} />
              ))}
           </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <RoleCard role="freelancer" selected={role === 'freelancer'} onClick={() => setRole('freelancer')} title={t('freelancer')} desc="I am looking for work" icon={Briefcase} />
               <RoleCard role="client" selected={role === 'client'} onClick={() => setRole('client')} title={t('client')} desc="I am hiring for projects" icon={Users} />
               <RoleCard role="agency" selected={role === 'agency'} onClick={() => setRole('agency')} title={t('agency')} desc="I represent a team" icon={ShieldCheck} />
              {role && (
                <div className="col-span-full pt-8 flex justify-center">
                   <button onClick={() => setStep(2)} className="btn-primary px-16 py-4 text-xs uppercase tracking-widest">Continue</button>
                </div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="max-w-xl mx-auto glass-card p-10 rounded-2xl space-y-8 border-white/5">
               <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight uppercase">Security</h3>
                  <p className="text-white/40 text-sm font-medium">Verify your account via Email or Phone</p>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setAuthMethod('email')} className={`p-6 rounded-xl flex flex-col items-center space-y-4 transition-all border ${authMethod === 'email' ? 'bg-primary/10 border-primary shadow-lg text-white' : 'bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/[0.05]'}`}>
                    <Mail className="w-8 h-8" />
                    <span className="font-bold text-[10px] uppercase tracking-widest">Email</span>
                  </button>
                  <button onClick={() => setAuthMethod('phone')} className={`p-6 rounded-xl flex flex-col items-center space-y-4 transition-all border ${authMethod === 'phone' ? 'bg-primary/10 border-primary shadow-lg text-white' : 'bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/[0.05]'}`}>
                    <Phone className="w-8 h-8" />
                    <span className="font-bold text-[10px] uppercase tracking-widest">Phone</span>
                  </button>
               </div>

               {authMethod && (
                 <div className="space-y-4 pt-2">
                    <input type={authMethod === 'email' ? 'email' : 'tel'} placeholder={authMethod === 'email' ? 'your@email.com' : '+374 XX XXXXXX'} className="w-full bg-black/20 border border-border rounded-xl p-4 text-white focus:border-primary outline-none transition-all placeholder:text-white/10 text-sm font-medium" />
                    <button onClick={() => setStep(3)} className="btn-primary w-full py-4 text-xs uppercase tracking-widest">Verify</button>
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
  <div onClick={onClick} className={`glass-card p-10 rounded-2xl space-y-6 cursor-pointer border transition-all duration-300 text-center relative overflow-hidden group ${selected ? 'border-primary bg-primary/5 shadow-xl scale-105' : 'border-white/5 hover:border-white/10'}`}>
    <div className={`w-16 h-16 rounded-xl mx-auto flex items-center justify-center transition-all duration-300 ${selected ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-primary group-hover:bg-white/10'}`}>
      <Icon className="w-8 h-8" />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold tracking-tight uppercase">{title}</h3>
      <p className="text-xs text-white/40 font-medium leading-relaxed px-2">{desc}</p>
    </div>
    {selected && <div className="absolute top-4 right-4"><CheckCircle2 className="w-4 h-4 text-primary" /></div>}
  </div>
)

const ProfileBuilder = ({ role, onComplete }: { role: string, onComplete: () => void }) => {
  const [avatar, setAvatar] = useState<string | null>(null)
  
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-12 border-white/5 shadow-2xl">
      <div className="lg:col-span-4 space-y-8 flex flex-col items-center">
         <div className="relative group cursor-pointer" onClick={() => document.getElementById('avatar-up')?.click()}>
            <div className="w-48 h-48 rounded-full bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-primary group-hover:shadow-lg shadow-primary/10">
               {avatar ? <img src={avatar} className="w-full h-full object-cover" /> : <Camera className="w-12 h-12 text-white/5 group-hover:text-primary transition-all duration-500" />}
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full backdrop-blur-sm">
               <Upload className="w-8 h-8 text-white" />
            </div>
            <input id="avatar-up" type="file" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setAvatar(URL.createObjectURL(file));
            }} />
         </div>
         <div className="text-center space-y-1">
            <h4 className="text-lg font-bold">Profile Photo</h4>
            <p className="text-[10px] text-white/20 uppercase tracking-widest">Recommended: 400x400px</p>
         </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">First Name</label>
               <input type="text" placeholder="John" className="w-full bg-black/20 border border-border rounded-xl p-4 focus:border-primary outline-none transition-all placeholder:text-white/10 font-medium text-sm" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">Last Name</label>
               <input type="text" placeholder="Doe" className="w-full bg-black/20 border border-border rounded-xl p-4 focus:border-primary outline-none transition-all placeholder:text-white/10 font-medium text-sm" />
            </div>
         </div>

         <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">Location</label>
            <div className="flex items-center space-x-4 bg-black/20 border border-border rounded-xl p-4 focus-within:border-primary transition-all">
               <Globe2 className="w-5 h-5 text-primary" />
               <select className="bg-transparent flex-1 outline-none text-white appearance-none cursor-pointer font-bold text-sm tracking-widest">
                  <option value="am">Armenia (Yerevan)</option>
                  <option value="am-gy">Armenia (Gyumri)</option>
                  <option value="am-va">Armenia (Vanadzor)</option>
                  <option value="other">International</option>
               </select>
            </div>
         </div>

         {role === 'freelancer' && (
           <div className="space-y-8 animate-reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">Hourly Rate ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-sm">$</span>
                    <input type="number" placeholder="45.00" className="w-full bg-black/20 border border-border rounded-xl p-4 pl-8 focus:border-primary outline-none transition-all font-bold text-sm" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">Professional Title</label>
                  <input type="text" placeholder="e.g. Senior Frontend Lead" className="w-full bg-black/20 border border-border rounded-xl p-4 focus:border-primary outline-none transition-all font-bold text-sm" />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">Bio</label>
               <textarea placeholder="Tell us about your experience..." rows={4} className="w-full bg-black/20 border border-border rounded-xl p-6 focus:border-primary outline-none resize-none transition-all text-sm leading-relaxed font-medium placeholder:text-white/10"></textarea>
            </div>
           </div>
         )}

         <button onClick={onComplete} className="btn-primary w-full py-5 text-xs font-bold uppercase tracking-widest shadow-xl">Complete Registration</button>
      </div>
    </motion.div>
  )
}
