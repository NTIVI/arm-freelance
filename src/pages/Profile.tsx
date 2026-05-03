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
  ChevronRight
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'
import { motion } from 'framer-motion'

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
    <div className="min-h-screen text-white font-sans relative overflow-hidden">
      <div className="bg-mesh"></div>
      <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-8 relative z-10">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] group-hover:bg-indigo-500 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-black italic uppercase tracking-tighter text-[10px] text-neutral-400 group-hover:text-white transition-colors">{t('back_to_dashboard')}</span>
          </Link>

          <button 
            onClick={logout}
            className="flex items-center gap-2 text-[10px] font-black uppercase text-neutral-500 hover:text-red-400 transition-all"
          >
            <LogOut className="w-4 h-4" /> {t('logout')}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-8 rounded-[3rem] text-center space-y-6 relative overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-indigo-900 to-indigo-600 -z-10"></div>
              
              <div className="relative mt-8 group cursor-pointer inline-block">
                <div className="w-32 h-32 rounded-[2.5rem] bg-neutral-900 border-4 border-indigo-600/50 flex items-center justify-center text-white text-5xl font-black shadow-2xl overflow-hidden">
                  {user.fullName[0]}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-indigo-600/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">{user.fullName}</h2>
                <div className="flex items-center justify-center gap-1.5 text-indigo-400 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {user.role === 'freelancer' ? t('elite_specialist') : t('marketplace_client')}
                  </span>
                </div>
                {user.role === 'freelancer' && (
                  <div className="flex items-center justify-center gap-1 mt-2 text-orange-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-black text-white">{(user.rating || 5.0).toFixed(1)}</span>
                  </div>
                )}
                <button className="mt-6 w-full btn-capsule py-3 text-xs justify-center shadow-indigo-600/20">
                  {t('edit_profile')}
                </button>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-6">
                <div className="text-left space-y-4">
                  <p className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.2em]">{t('nav_settings')}</p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{t('nav_language')}</span>
                      <div className="flex gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                        {['en', 'ru', 'hy'].map((l) => (
                          <button 
                            key={l} 
                            onClick={() => setLang(l as any)} 
                            className={`w-8 h-8 rounded-full text-[9px] font-black transition-all ${lang === l ? 'bg-white text-black shadow-lg' : 'text-neutral-500 hover:text-white'}`}
                          >
                            {l.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {user.role === 'freelancer' && (
                      <>
                        <div className="flex justify-between items-center py-3 border-t border-white/5">
                          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{t('nav_category')}</span>
                          <span className="text-[11px] font-black uppercase text-indigo-400">{user.category}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-t border-white/5">
                          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{t('nav_experience')}</span>
                          <span className="text-[11px] font-bold text-white">{user.experienceYears} {t('years')}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 border border-white/10 shadow-2xl">
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">{t('about_me')}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-medium whitespace-pre-wrap">{user.bio || t('no_description')}</p>
              </div>
            </div>

            <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">{t('completed_orders')}</h3>
                <span className="px-4 py-1.5 bg-white/5 border border-white/5 rounded-full text-[10px] font-black uppercase text-neutral-400">{completedOrders.length} {t('projects_count')}</span>
              </div>

              <div className="space-y-4">
                {completedOrders.length === 0 ? (
                  <div className="p-12 border-2 border-dashed border-white/5 rounded-[2rem] text-center text-neutral-600 text-sm font-medium">
                    {t('no_completed_projects')}
                  </div>
                ) : (
                  completedOrders.map((order) => (
                    <div key={order.id} className="group p-6 rounded-[2rem] bg-white/5 hover:bg-indigo-600/10 transition-all border border-white/5 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 group-hover:bg-indigo-600/20 rounded-2xl flex items-center justify-center transition-all">
                          <Briefcase className="w-6 h-6 text-neutral-500 group-hover:text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="font-black uppercase italic text-sm text-white">{order.title}</h4>
                          <p className="text-[10px] font-bold text-neutral-500 uppercase">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black italic tracking-tighter text-white">${order.budget}</p>
                        <div className="flex items-center gap-1 justify-end text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span className="text-[9px] font-black uppercase tracking-widest">Completed</span>
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
