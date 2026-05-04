import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Briefcase, 
  Camera,
  Edit3,
  Settings,
  Zap,
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
    <div className="min-h-screen bg-[#050505] font-sans text-white relative overflow-hidden selection:bg-violet-500 selection:text-white">
      <BackgroundMesh />
      <div className="bg-overlay"></div>
      
      <div className="max-w-7xl mx-auto px-10 py-20 space-y-16 relative z-10">
        
        {/* Modern Nav Header */}
        <header className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-6 text-label text-[9px] text-white/30 hover:text-white transition-all group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700 shadow-sm">
               <ArrowLeft className="w-5 h-5" />
            </div>
            Back to Registry
          </Link>

          <div className="flex items-center gap-6">
             <div className="flex bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-xl">
                <span className="px-5 py-2 text-label text-[8px] text-white/20">Protocol: Account Control</span>
                <div className="w-[1px] h-4 bg-white/10 self-center"></div>
                <button onClick={logout} className="px-5 py-2 text-label text-[8px] text-red-400 hover:text-red-500 transition-colors">Sign Out Phase</button>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Detailed Profile Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            <div className="premium-card p-16 text-center space-y-10 bg-white/[0.03] backdrop-blur-3xl relative overflow-hidden group border-white/10 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-40 bg-white/[0.02] border-b border-white/5 group-hover:bg-violet-500/10 transition-all duration-1000"></div>
              
              <div className="relative z-10 mt-10 group/avatar cursor-pointer inline-block">
                <div className="w-40 h-40 rounded-[4rem] bg-gradient-to-br from-violet-600 to-fuchsia-600 border-[8px] border-white/5 flex items-center justify-center text-white text-7xl font-black italic shadow-2xl overflow-hidden rotate-6 group-hover/avatar:rotate-0 transition-transform duration-700 shadow-violet-500/30">
                  {user.fullName[0]}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity rounded-[4rem] backdrop-blur-md">
                   <Camera className="w-10 h-10 text-white" />
                </div>
              </div>

              <div className="relative z-10 space-y-6">
                <div>
                  <h2 className="text-display text-4xl italic leading-none text-white">{user.fullName}</h2>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <div className="px-5 py-2 bg-violet-500 text-white rounded-full text-label text-[8px] shadow-xl shadow-violet-500/20 uppercase tracking-widest font-black">Verified Identity</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                   <div className="text-center space-y-1">
                      <p className="text-display text-2xl italic text-violet-400">{(user.rating || 5.0).toFixed(1)}</p>
                      <p className="text-label text-[7px] text-white/20 uppercase tracking-widest">Trust Factor</p>
                   </div>
                   <div className="text-center space-y-1 border-l border-white/5">
                      <p className="text-display text-2xl italic text-white">{completedOrders.length}</p>
                      <p className="text-label text-[7px] text-white/20 uppercase tracking-widest">Milestones</p>
                   </div>
                </div>

                <button className="w-full btn-lux py-5 text-[10px] justify-center bg-white/5 text-white border border-white/10 shadow-none hover:bg-white hover:text-black transition-all duration-700">
                  Edit Profile Protocol <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="premium-card p-12 space-y-10 bg-white/[0.02] border-white/5 shadow-xl">
              <div className="flex items-center gap-4">
                 <Settings className="w-5 h-5 text-white/20" />
                 <h4 className="text-label text-[10px] text-white/40">Environmental Prefs</h4>
              </div>
              <div className="space-y-8">
                 <div className="flex justify-between items-center">
                    <span className="text-label text-[8px] text-white/20">Neural Language</span>
                    <div className="flex gap-1 bg-white/5 p-1 rounded-full border border-white/10">
                       {['en', 'ru', 'hy'].map((l) => (
                         <button 
                           key={l} 
                           onClick={() => setLang(l as any)} 
                           className={`w-10 h-10 rounded-full text-label text-[8px] transition-all duration-500 ${lang === l ? 'bg-white text-black shadow-xl scale-110' : 'text-white/20 hover:text-white'}`}
                         >
                           {l.toUpperCase()}
                         </button>
                       ))}
                    </div>
                 </div>

                 {user.role === 'freelancer' && (
                    <div className="space-y-6 pt-6 border-t border-white/5">
                       <ProfileSettingRow label="Architectural Sphere" value={user.category || 'Engineering'} />
                       <ProfileSettingRow label="Cycle Experience" value={`${user.experienceYears || 0} Years`} />
                       <ProfileSettingRow label="Platform Level" value="Senior Elite" color="text-violet-400" />
                    </div>
                 )}
              </div>
            </div>
          </div>

          {/* Detailed Activity Feed */}
          <div className="lg:col-span-8 space-y-10">
            <div className="premium-card p-16 space-y-10 bg-white/[0.02] border-white/5 shadow-xl">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center text-white rotate-6 shadow-lg shadow-violet-500/20"><Shield className="w-6 h-6" /></div>
                  <h3 className="text-display text-4xl italic leading-none text-white">{t('bio')}</h3>
               </div>
               <p className="text-white/40 text-2xl leading-relaxed italic font-medium whitespace-pre-wrap">"{user.bio || 'Architectural brief not provided. This specialist operates under strict precision standards.'}"</p>
            </div>

            <div className="premium-card p-16 space-y-12 bg-white/[0.02] border-white/5 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-1000">
                 <Zap className="w-64 h-64 text-violet-500" />
              </div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="space-y-2">
                  <h3 className="text-display text-5xl italic leading-none text-white">Transmission History</h3>
                  <p className="text-label text-[8px] text-white/20 tracking-[0.4em] uppercase">Audit of all completed transactions</p>
                </div>
                <div className="px-6 py-2 bg-white/5 rounded-full text-label text-[8px] text-white/30 border border-white/5">{completedOrders.length} Completed Milestones</div>
              </div>

              <div className="grid grid-cols-1 gap-8 relative z-10">
                {completedOrders.length === 0 ? (
                  <div className="py-32 border-2 border-dashed border-white/5 rounded-[4rem] flex flex-col items-center justify-center text-center space-y-6">
                    <Command className="w-16 h-16 text-white/5" />
                    <p className="text-label text-white/10 uppercase tracking-widest">Archive currently null</p>
                  </div>
                ) : (
                  completedOrders.map((order) => (
                    <div key={order.id} className="premium-card p-10 bg-white/[0.01] hover:bg-white hover:text-black transition-all duration-700 border-white/5 flex items-center justify-between group/item">
                      <div className="flex items-center gap-8">
                        <div className="w-14 h-14 bg-white/5 shadow-xl rounded-2xl flex items-center justify-center transition-all duration-700 group-hover/item:bg-black group-hover/item:rotate-12 group-hover/item:scale-110">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-display text-2xl italic group-hover/item:text-black transition-colors">{order.title}</h4>
                          <p className="text-label text-[8px] text-white/20 group-hover/item:text-black/40 mt-1 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="text-display text-4xl italic group-hover/item:text-black transition-colors">${order.budget}</p>
                        <div className="flex items-center gap-3 justify-end text-violet-400 group-hover/item:text-violet-600">
                          <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,1)]"></div>
                          <span className="text-label text-[7px] tracking-[0.2em] font-black uppercase">Verified Milestone</span>
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

function ProfileSettingRow({ label, value, color = 'text-white' }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-label text-[7px] text-white/20 tracking-widest uppercase">{label}</span>
      <span className={`text-display text-lg italic ${color}`}>{value}</span>
    </div>
  )
}

function BackgroundMesh() {
  return (
    <div className="bg-mesh-container">
      <div className="mesh-blob bg-violet-600/30 w-[1200px] h-[1200px] top-[-300px] left-[-400px]"></div>
      <div className="mesh-blob bg-fuchsia-600/20 w-[800px] h-[800px] bottom-[-200px] right-[-200px]" style={{ animationDelay: '-12s' }}></div>
    </div>
  )
}
