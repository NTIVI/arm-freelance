import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Star, 
  Briefcase, 
  ShieldCheck,
  CheckCircle2,
  Globe,
  Camera,
  LogOut,
  ChevronRight,
  Edit3,
  User,
  Settings,
  Mail,
  Zap,
  ArrowUpRight,
  Shield,
  Command
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'

export const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, jobs } = useAppContext();
  const { lang, setLang, t } = useLanguage();

  if (!user) return null;

  const completedOrders = jobs.filter(j => 
    (user.role === 'freelancer' && j.selectedFreelancerId === user.id && j.status === 'completed') ||
    (user.role === 'client' && j.clientId === user.id && j.status === 'completed')
  );

  return (
    <div className="min-h-screen bg-white font-sans text-black relative overflow-hidden selection:bg-black selection:text-white">
      <BackgroundMesh />
      
      <div className="max-w-7xl mx-auto px-10 py-20 space-y-16 relative z-10">
        
        {/* Modern Nav Header */}
        <header className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-6 text-label text-[9px] text-black/30 hover:text-black transition-all group">
            <div className="w-12 h-12 bg-white border border-black/5 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-700 shadow-sm">
               <ArrowLeft className="w-5 h-5" />
            </div>
            Back to Registry
          </Link>

          <div className="flex items-center gap-6">
             <div className="flex bg-zinc-50 p-1.5 rounded-full border border-black/5">
                <span className="px-5 py-2 text-label text-[8px] text-black/20">Protocol: Account Control</span>
                <div className="w-[1px] h-4 bg-black/5 self-center"></div>
                <button onClick={logout} className="px-5 py-2 text-label text-[8px] text-red-500 hover:text-red-600 transition-colors">Sign Out Phase</button>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Detailed Profile Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            <div className="premium-card p-16 text-center space-y-10 bg-white/70 backdrop-blur-3xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-40 bg-zinc-50 border-b border-black/5 group-hover:bg-black transition-all duration-1000"></div>
              
              <div className="relative z-10 mt-10 group/avatar cursor-pointer inline-block">
                <div className="w-40 h-40 rounded-[4rem] bg-white border-[8px] border-white flex items-center justify-center text-black text-7xl font-black italic shadow-2xl overflow-hidden rotate-6 group-hover/avatar:rotate-0 transition-transform duration-700">
                  {user.fullName[0]}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity rounded-[4rem] backdrop-blur-sm">
                  <Camera className="w-10 h-10 text-white" />
                </div>
              </div>

              <div className="relative z-10 space-y-6">
                <div>
                  <h2 className="text-display text-4xl italic leading-none">{user.fullName}</h2>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <div className="px-5 py-2 bg-emerald-500 text-white rounded-full text-label text-[8px] shadow-xl shadow-emerald-500/10">Verified Identity</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-black/5">
                   <div className="text-center space-y-1">
                      <p className="text-display text-2xl italic">{(user.rating || 5.0).toFixed(1)}</p>
                      <p className="text-label text-[7px] text-black/20">Trust Factor</p>
                   </div>
                   <div className="text-center space-y-1 border-l border-black/5">
                      <p className="text-display text-2xl italic">{completedOrders.length}</p>
                      <p className="text-label text-[7px] text-black/20">Milestones</p>
                   </div>
                </div>

                <button className="w-full btn-lux py-5 text-[10px] justify-center bg-zinc-50 text-black border border-black/5 shadow-none hover:bg-black hover:text-white transition-all duration-700">
                  Edit Profile Protocol <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="premium-card p-12 space-y-10 bg-zinc-50/50 border-none">
              <div className="flex items-center gap-4">
                 <Settings className="w-5 h-5 text-black/20" />
                 <h4 className="text-label text-[10px]">Environmental Prefs</h4>
              </div>
              <div className="space-y-8">
                 <div className="flex justify-between items-center">
                    <span className="text-label text-[8px] text-black/40">Neural Language</span>
                    <div className="flex gap-1 bg-white p-1 rounded-full border border-black/5">
                       {['en', 'ru', 'hy'].map((l) => (
                         <button 
                           key={l} 
                           onClick={() => setLang(l as any)} 
                           className={`w-10 h-10 rounded-full text-label text-[8px] transition-all duration-500 ${lang === l ? 'bg-black text-white shadow-xl scale-110' : 'text-gray-300 hover:text-black'}`}
                         >
                           {l.toUpperCase()}
                         </button>
                       ))}
                    </div>
                 </div>

                 {user.role === 'freelancer' && (
                    <div className="space-y-6 pt-6 border-t border-black/5">
                       <ProfileSettingRow label="Architectural Sphere" value={user.category || 'Engineering'} />
                       <ProfileSettingRow label="Cycle Experience" value={`${user.experienceYears || 0} Years`} />
                       <ProfileSettingRow label="Platform Level" value="Senior Elite" color="text-indigo-500" />
                    </div>
                 )}
              </div>
            </div>
          </div>

          {/* Detailed Activity Feed */}
          <div className="lg:col-span-8 space-y-10">
            <div className="premium-card p-16 space-y-10 bg-white border-black/5">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white rotate-6"><Shield className="w-6 h-6" /></div>
                  <h3 className="text-display text-4xl italic leading-none">{t('bio')}</h3>
               </div>
               <p className="text-gray-500 text-2xl leading-relaxed italic font-medium whitespace-pre-wrap">"{user.bio || 'Architectural brief not provided. This specialist operates under strict precision standards.'}"</p>
            </div>

            <div className="premium-card p-16 space-y-12 bg-white border-black/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-1000">
                 <Zap className="w-64 h-64" />
              </div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="space-y-2">
                  <h3 className="text-display text-5xl italic leading-none">Transmission History</h3>
                  <p className="text-label text-[8px] text-black/20 tracking-[0.4em]">Audit of all completed transactions</p>
                </div>
                <div className="px-6 py-2 bg-zinc-50 rounded-full text-label text-[8px] text-black/30">{completedOrders.length} Completed Milestones</div>
              </div>

              <div className="grid grid-cols-1 gap-8 relative z-10">
                {completedOrders.length === 0 ? (
                  <div className="py-32 border-2 border-dashed border-black/5 rounded-[4rem] flex flex-col items-center justify-center text-center space-y-6">
                    <Command className="w-16 h-16 text-black/5" />
                    <p className="text-label text-black/20">Archive currently null</p>
                  </div>
                ) : (
                  completedOrders.map((order) => (
                    <div key={order.id} className="premium-card p-10 bg-zinc-50/30 hover:bg-black hover:text-white transition-all duration-700 border-none flex items-center justify-between group/item">
                      <div className="flex items-center gap-8">
                        <div className="w-14 h-14 bg-white shadow-xl rounded-2xl flex items-center justify-center transition-all duration-700 group-hover/item:rotate-12 group-hover/item:scale-110">
                          <Briefcase className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h4 className="text-display text-2xl italic group-hover/item:text-white transition-colors">{order.title}</h4>
                          <p className="text-label text-[8px] text-black/20 group-hover/item:text-white/40 mt-1">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="text-display text-4xl italic group-hover/item:text-white transition-colors">${order.budget}</p>
                        <div className="flex items-center gap-3 justify-end text-emerald-500 group-hover/item:text-emerald-400">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span className="text-label text-[7px] tracking-[0.2em]">Verified Milestone</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProfileSettingRow = ({ label, value, color = 'text-black' }: any) => (
  <div className="flex justify-between items-center">
    <span className="text-label text-[7px] text-black/30 tracking-widest">{label}</span>
    <span className={`text-display text-lg italic ${color}`}>{value}</span>
  </div>
)

const BackgroundMesh = () => (
  <div className="bg-mesh-container">
    <div className="mesh-blob bg-indigo-50 w-[1200px] h-[1200px] top-[-300px] left-[-400px]"></div>
    <div className="mesh-blob bg-amber-50 w-[800px] h-[800px] bottom-[-200px] right-[-200px]" style={{ animationDelay: '-12s' }}></div>
  </div>
)
