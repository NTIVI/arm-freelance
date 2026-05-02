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
    <div className="pt-32 pb-20 px-6 min-h-screen bg-[#0B0B0F]">
      <div className="max-w-4xl mx-auto">
        <motion.button onClick={onBack} className="mb-10 flex items-center space-x-2 text-white/30 hover:text-white transition-colors font-bold uppercase tracking-widest text-[10px]">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </motion.button>

        <div className="flex items-center justify-between mb-10">
           <h2 className="text-3xl font-bold font-display">{step === 1 ? t('step_1') : (step === 2 ? "Identity Verification" : "Professional Profile")}</h2>
           <div className="flex space-x-1.5">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-8 h-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-primary shadow-[0_0_10px_rgba(129,140,248,0.3)]' : 'bg-white/5'}`} />
              ))}
           </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <RoleCard role="freelancer" selected={role === 'freelancer'} onClick={() => setRole('freelancer')} title={t('freelancer')} desc="I am looking for professional projects" icon={Briefcase} />
               <RoleCard role="client" selected={role === 'client'} onClick={() => setRole('client')} title={t('client')} desc="I am looking to hire top talent" icon={Users} />
               <RoleCard role="agency" selected={role === 'agency'} onClick={() => setRole('agency')} title={t('agency')} desc="I represent a specialized team" icon={ShieldCheck} />
              {role && (
                <div className="col-span-full pt-8 flex justify-center">
                   <button onClick={() => setStep(2)} className="btn-primary w-full md:w-auto px-16 py-4">Continue to Verification</button>
                </div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-xl mx-auto glass-card p-10 space-y-8">
               <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold">Verification Method</h3>
                  <p className="text-sm text-white/40">Choose how you want to secure your identity</p>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setAuthMethod('email')} className={`p-6 rounded-xl flex flex-col items-center space-y-4 transition-all border ${authMethod === 'email' ? 'bg-primary/10 border-primary/50 text-white' : 'bg-white/[0.02] border-white/[0.05] text-white/40 hover:bg-white/[0.04]'}`}>
                    <Mail className="w-8 h-8" />
                    <span className="font-bold text-sm">Corporate Email</span>
                  </button>
                  <button onClick={() => setAuthMethod('phone')} className={`p-6 rounded-xl flex flex-col items-center space-y-4 transition-all border ${authMethod === 'phone' ? 'bg-primary/10 border-primary/50 text-white' : 'bg-white/[0.02] border-white/[0.05] text-white/40 hover:bg-white/[0.04]'}`}>
                    <Phone className="w-8 h-8" />
                    <span className="font-bold text-sm">Mobile Phone</span>
                  </button>
               </div>

               {authMethod && (
                 <div className="space-y-4 pt-4 animate-reveal">
                    <input type={authMethod === 'email' ? 'email' : 'tel'} placeholder={authMethod === 'email' ? 'Enter your business email' : '+374 00 000000'} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/10" />
                    <button onClick={() => setStep(3)} className="btn-primary w-full py-4">Verify Identity</button>
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
  <div onClick={onClick} className={`glass-card p-10 space-y-6 cursor-pointer border transition-all duration-300 text-center ${selected ? 'border-primary bg-primary/5 shadow-2xl ring-1 ring-primary/20' : 'border-white/5 hover:border-white/10'}`}>
    <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center transition-all ${selected ? 'bg-primary text-white shadow-lg' : 'bg-white/[0.03] text-primary group-hover:bg-white/[0.05]'}`}>
      <Icon className="w-8 h-8" />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold font-display">{title}</h3>
      <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
    </div>
  </div>
)

const ProfileBuilder = ({ role, onComplete }: { role: string, onComplete: () => void }) => {
  const [avatar, setAvatar] = useState<string | null>(null)
  
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-10 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4 flex flex-col items-center">
         <div className="relative group cursor-pointer" onClick={() => document.getElementById('avatar-up')?.click()}>
            <div className="w-40 h-40 rounded-full bg-white/[0.02] border-2 border-dashed border-white/[0.05] flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/40">
               {avatar ? <img src={avatar} className="w-full h-full object-cover" /> : <Camera className="w-10 h-10 text-white/10 group-hover:text-primary transition-colors" />}
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
               <Upload className="w-6 h-6 text-white" />
            </div>
            <input id="avatar-up" type="file" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setAvatar(URL.createObjectURL(file));
            }} />
         </div>
         <div className="text-center mt-6 space-y-1.5">
            <h4 className="text-base font-bold">Profile Portrait</h4>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-black italic">Required for verification</p>
         </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">First Name</label>
               <input type="text" placeholder="John" className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 focus:border-primary/50 outline-none transition-all placeholder:text-white/10" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Last Name</label>
               <input type="text" placeholder="Doe" className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 focus:border-primary/50 outline-none transition-all placeholder:text-white/10" />
            </div>
         </div>

         <div className="space-y-2">
            <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Geographic Location</label>
            <div className="relative">
               <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
               <select className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 pl-12 outline-none text-white appearance-none cursor-pointer focus:border-primary/50">
                  <option value="am">Armenia (Yerevan)</option>
                  <option value="am-gy">Armenia (Gyumri)</option>
                  <option value="am-va">Armenia (Vanadzor)</option>
                  <option value="other">International / Remote</option>
               </select>
            </div>
         </div>

         {role === 'freelancer' && (
           <div className="space-y-6 animate-reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Hourly Compensation ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">$</span>
                    <input type="number" placeholder="45.00" className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 pl-10 focus:border-primary/50 outline-none" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Specialization Title</label>
                  <input type="text" placeholder="e.g. Senior Product Designer" className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 focus:border-primary/50 outline-none" />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Professional Background</label>
               <textarea placeholder="Outline your core competencies and industry experience..." rows={4} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 focus:border-primary/50 outline-none resize-none text-sm leading-relaxed"></textarea>
            </div>
           </div>
         )}

         <button onClick={onComplete} className="btn-primary w-full py-5 text-base tracking-wide">Finalize & Enter Dashboard</button>
      </div>
    </motion.div>
  )
}
