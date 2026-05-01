import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Users, ShieldCheck, Mail, Phone, ArrowLeft, Camera, Upload, Globe2 } from 'lucide-react'
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
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.button onClick={onBack} className="mb-12 flex items-center space-x-2 text-white/40 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </motion.button>

        <div className="flex items-center justify-between mb-12">
           <h2 className="text-3xl font-black tracking-tight">{step === 1 ? t('step_1') : (step === 2 ? "Verification" : "Profile Details")}</h2>
           <div className="flex space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-12 h-1.5 rounded-full transition-colors ${step >= i ? 'bg-primary' : 'bg-white/10'}`} />
              ))}
           </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <RoleCard role="freelancer" selected={role === 'freelancer'} onClick={() => setRole('freelancer')} title={t('freelancer')} desc="I am looking for work" icon={Briefcase} />
               <RoleCard role="client" selected={role === 'client'} onClick={() => setRole('client')} title={t('client')} desc="I am looking for talent" icon={Users} />
               <RoleCard role="agency" selected={role === 'agency'} onClick={() => setRole('agency')} title={t('agency')} desc="I represent a team" icon={ShieldCheck} />
              {role && (
                <div className="col-span-full pt-8 flex justify-center">
                   <button onClick={() => setStep(2)} className="btn-primary px-12 py-5 text-lg">Continue</button>
                </div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-xl mx-auto glass p-10 rounded-[3rem] space-y-8">
               <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold">Verification</h3>
                  <p className="text-white/40">Secure your account with Email or Phone</p>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setAuthMethod('email')} className={`p-6 rounded-2xl flex flex-col items-center space-y-3 transition-all border ${authMethod === 'email' ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                    <Mail className={`w-8 h-8 ${authMethod === 'email' ? 'text-white' : 'text-primary'}`} />
                    <span className="font-bold">Email</span>
                  </button>
                  <button onClick={() => setAuthMethod('phone')} className={`p-6 rounded-2xl flex flex-col items-center space-y-3 transition-all border ${authMethod === 'phone' ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                    <Phone className={`w-8 h-8 ${authMethod === 'phone' ? 'text-white' : 'text-primary'}`} />
                    <span className="font-bold">Phone</span>
                  </button>
               </div>

               {authMethod && (
                 <div className="space-y-4 pt-4">
                    <input type={authMethod === 'email' ? 'email' : 'tel'} placeholder={authMethod === 'email' ? 'Enter your Gmail/Email' : '+374 00 000000'} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all" />
                    <button onClick={() => setStep(3)} className="btn-primary w-full py-5">Send Verification Code</button>
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
  <div onClick={onClick} className={`glass p-10 rounded-[3rem] space-y-6 cursor-pointer border-2 transition-all text-center ${selected ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/20 scale-105' : 'border-white/5 hover:border-white/20'}`}>
    <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center ${selected ? 'bg-primary' : 'bg-white/5'}`}>
      <Icon className={`w-10 h-10 ${selected ? 'text-white' : 'text-primary'}`} />
    </div>
    <div>
      <h3 className="text-2xl font-black tracking-tight">{title}</h3>
      <p className="text-sm text-white/40 mt-2">{desc}</p>
    </div>
  </div>
)

const ProfileBuilder = ({ role, onComplete }: { role: string, onComplete: () => void }) => {
  const [avatar, setAvatar] = useState<string | null>(null)
  
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass p-10 md:p-16 rounded-[4rem] grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4 space-y-8 flex flex-col items-center">
         <div className="relative group cursor-pointer" onClick={() => document.getElementById('avatar-up')?.click()}>
            <div className="w-48 h-48 rounded-[3rem] bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/50">
               {avatar ? <img src={avatar} className="w-full h-full object-cover" /> : <Camera className="w-12 h-12 text-white/10 group-hover:text-primary transition-colors" />}
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]">
               <Upload className="w-8 h-8 text-white" />
            </div>
            <input id="avatar-up" type="file" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setAvatar(URL.createObjectURL(file));
            }} />
         </div>
         <div className="text-center space-y-2">
            <h4 className="text-xl font-bold">Profile Photo</h4>
            <p className="text-xs text-white/30 uppercase tracking-widest font-black">Mandatory for {role}</p>
         </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-xs font-black text-white/30 uppercase tracking-widest ml-1">First Name</label>
               <input type="text" placeholder="John" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary outline-none" />
            </div>
            <div className="space-y-2">
               <label className="text-xs font-black text-white/30 uppercase tracking-widest ml-1">Last Name</label>
               <input type="text" placeholder="Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary outline-none" />
            </div>
         </div>

         <div className="space-y-2">
            <label className="text-xs font-black text-white/30 uppercase tracking-widest ml-1">Location (Based in Armenia?)</label>
            <div className="flex items-center space-x-4 bg-white/5 border border-white/10 rounded-2xl p-4">
               <Globe2 className="w-5 h-5 text-primary" />
               <select className="bg-transparent flex-1 outline-none text-white appearance-none cursor-pointer">
                  <option value="am">Armenia (Yerevan)</option>
                  <option value="am-gy">Armenia (Gyumri)</option>
                  <option value="am-va">Armenia (Vanadzor)</option>
                  <option value="other">International</option>
               </select>
            </div>
         </div>

         {role === 'freelancer' && (
           <>
            <div className="space-y-2">
               <label className="text-xs font-black text-white/30 uppercase tracking-widest ml-1">Hourly Rate (USD)</label>
               <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">$</span>
                 <input type="number" placeholder="25" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-8 focus:border-primary outline-none" />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-xs font-black text-white/30 uppercase tracking-widest ml-1">Professional Title</label>
               <input type="text" placeholder="Senior Full-stack Developer" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary outline-none" />
            </div>
            <div className="space-y-2">
               <label className="text-xs font-black text-white/30 uppercase tracking-widest ml-1">About You</label>
               <textarea placeholder="Describe your experience and skills..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary outline-none resize-none"></textarea>
            </div>
           </>
         )}

         <button onClick={onComplete} className="btn-primary w-full py-6 text-xl">Create My Profile</button>
      </div>
    </motion.div>
  )
}
