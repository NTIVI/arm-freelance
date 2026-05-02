import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Users, ShieldCheck, Mail, Phone, ArrowLeft, Camera, Upload, Globe2, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export const RegistrationForm = ({ onBack, onComplete }: { onBack: () => void, onComplete: (data: any) => void }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: null as 'freelancer' | 'agency' | 'client' | null,
    location: 'am',
    title: '',
    bio: ''
  })

  const handleNext = () => setStep(s => s + 1)
  const handleBack = () => step === 1 ? onBack() : setStep(s => s - 1)

  const handleComplete = () => {
    onComplete(formData);
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-[#0A0A0B]">
      <div className="max-w-4xl mx-auto">
        <motion.button 
          whileHover={{ x: -5 }}
          onClick={handleBack} 
          className="mb-8 flex items-center space-x-3 text-white/30 hover:text-white transition-all font-bold uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{step === 1 ? 'Back to Home' : 'Previous Step'}</span>
        </motion.button>

        <div className="flex items-center justify-between mb-12 px-2">
           <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">
                {step === 1 ? "Create Account" : (step === 2 ? "Choose Role" : "Complete Profile")}
              </h2>
              <p className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase">
                {step === 1 ? "Start your journey" : (step === 2 ? "How will you use the platform?" : "Tell us about yourself")}
              </p>
           </div>
           <div className="flex space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-12 h-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-primary shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-white/5'}`} />
              ))}
           </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-xl mx-auto glass-card p-12 rounded-[2.5rem] border-white/5 space-y-8 bg-[#0E0E10]/80 backdrop-blur-2xl shadow-2xl">
               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                      placeholder="Gevorg Sargsyan" 
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/10 text-sm font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="gevorg@example.am" 
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/10 text-sm font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Password</label>
                    <input 
                      type="password" 
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••" 
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/10 text-sm font-medium" 
                    />
                  </div>
               </div>
               <button 
                 disabled={!formData.fullName || !formData.email || !formData.password}
                 onClick={handleNext} 
                 className="btn-primary w-full py-5 text-xs font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed group"
               >
                 <span>Register Account</span>
                 <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
               </button>
               <p className="text-center text-[10px] text-white/20 uppercase tracking-widest leading-relaxed">
                 By registering, you agree to our <span className="text-white/40 hover:text-white cursor-pointer transition-colors underline decoration-white/10">Terms</span> and <span className="text-white/40 hover:text-white cursor-pointer transition-colors underline decoration-white/10">Privacy Policy</span>
               </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <RoleCard selected={formData.role === 'freelancer'} onClick={() => setFormData({...formData, role: 'freelancer'})} title="Freelancer" desc="I want to work on projects" icon={Briefcase} />
               <RoleCard selected={formData.role === 'client'} onClick={() => setFormData({...formData, role: 'client'})} title="Client" desc="I want to hire talent" icon={Users} />
               <RoleCard selected={formData.role === 'agency'} onClick={() => setFormData({...formData, role: 'agency'})} title="Agency" desc="I manage a professional team" icon={ShieldCheck} />
               {formData.role && (
                 <div className="col-span-full pt-8 flex justify-center">
                    <button onClick={handleNext} className="btn-primary px-20 py-5 text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/40">Continue to Profile</button>
                 </div>
               )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-12 rounded-[3rem] border-white/5 bg-[#0E0E10]/80 shadow-2xl">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-4 flex flex-col items-center space-y-6">
                     <div className="relative group cursor-pointer" onClick={() => document.getElementById('avatar-up')?.click()}>
                        <div className="w-48 h-48 rounded-[2.5rem] bg-white/[0.02] border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-2xl shadow-primary/10">
                           {(formData as any).avatar ? (
                             <img src={(formData as any).avatar} className="w-full h-full object-cover" />
                           ) : (
                             <Camera className="w-12 h-12 text-white/5 group-hover:text-primary transition-all duration-500" />
                           )}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] backdrop-blur-sm">
                           <Upload className="w-8 h-8 text-white" />
                        </div>
                        <input id="avatar-up" type="file" className="hidden" onChange={(e) => {
                           const file = e.target.files?.[0];
                           if (file) setFormData({ ...formData, avatar: URL.createObjectURL(file) } as any);
                        }} />
                     </div>
                     <div className="text-center space-y-1">
                        <h4 className="text-sm font-black uppercase tracking-widest text-white">Identity Photo</h4>
                        <p className="text-[10px] text-white/20 uppercase tracking-widest">Verification required</p>
                     </div>
                  </div>

                  <div className="lg:col-span-8 space-y-8">
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Professional Title</label>
                           <input 
                             type="text" 
                             value={formData.title}
                             onChange={e => setFormData({...formData, title: e.target.value})}
                             placeholder="e.g. Senior Software Architect" 
                             className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 focus:border-primary/50 outline-none transition-all placeholder:text-white/10 font-bold text-sm" 
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Location</label>
                           <div className="flex items-center space-x-4 bg-white/[0.03] border border-white/5 rounded-2xl p-5 focus-within:border-primary/50 transition-all">
                              <Globe2 className="w-5 h-5 text-primary" />
                              <select 
                                value={formData.location}
                                onChange={e => setFormData({...formData, location: e.target.value})}
                                className="bg-transparent flex-1 outline-none text-white appearance-none cursor-pointer font-bold text-sm"
                              >
                                 <option value="am">Yerevan, Armenia</option>
                                 <option value="am-gy">Gyumri, Armenia</option>
                                 <option value="am-va">Vanadzor, Armenia</option>
                                 <option value="int">International / Remote</option>
                              </select>
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Professional Bio</label>
                           <textarea 
                             value={formData.bio}
                             onChange={e => setFormData({...formData, bio: e.target.value})}
                             placeholder="Briefly describe your expertise and projects..." 
                             rows={4} 
                             className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-6 focus:border-primary/50 outline-none resize-none transition-all text-sm leading-relaxed font-medium placeholder:text-white/10"
                           />
                        </div>
                     </div>

                     <button onClick={handleComplete} className="btn-primary w-full py-5 text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/20">
                        Finalize & Enter Dashboard
                     </button>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const RoleCard = ({ selected, onClick, title, desc, icon: Icon }: any) => (
  <div onClick={onClick} className={`glass-card p-10 rounded-[2.5rem] space-y-6 cursor-pointer border transition-all duration-500 text-center relative overflow-hidden group ${selected ? 'border-primary/50 bg-primary/5 shadow-2xl scale-[1.02]' : 'border-white/5 hover:border-white/10 hover:bg-white/[0.02]'}`}>
    <div className={`w-20 h-20 rounded-[1.5rem] mx-auto flex items-center justify-center transition-all duration-500 ${selected ? 'bg-primary text-white shadow-2xl shadow-primary/40' : 'bg-white/5 text-primary group-hover:bg-primary/20 group-hover:text-primary'}`}>
      <Icon className="w-10 h-10" />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-black tracking-tight uppercase italic text-white">{title}</h3>
      <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-relaxed px-4">{desc}</p>
    </div>
    {selected && <div className="absolute top-6 right-6"><CheckCircle2 className="w-5 h-5 text-primary" /></div>}
  </div>
)

