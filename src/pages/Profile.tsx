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
  const { user, logout } = useAppContext();
  const { lang, setLang, t } = useLanguage();

  if (!user) return null;

  const completedOrders = [
    { id: 1, title: "E-commerce Mobile App", date: "24.03.2024", status: "Completed", amount: "$2,400" },
    { id: 2, title: "Infrastructure Migration", date: "12.02.2024", status: "Completed", amount: "$1,850" },
    { id: 3, title: "UI/UX Redesign for Fintech", date: "05.01.2024", status: "Completed", amount: "$900" },
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans">
      <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-8">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-lg group-hover:bg-indigo-600 transition-all">
              <div className="w-5 h-5 border-2 border-white rounded rotate-45"></div>
            </div>
            <span className="font-black italic uppercase tracking-tighter text-xl">AF</span>
          </Link>

          <button 
            onClick={logout}
            className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-red-500 transition-all"
          >
            <LogOut className="w-4 h-4" /> {t('logout')}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-8 rounded-[3rem] text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-indigo-600 to-indigo-900 -z-10"></div>
              
              <div className="relative mt-8 group cursor-pointer inline-block">
                <div className="w-32 h-32 rounded-[2.5rem] bg-black border-4 border-white flex items-center justify-center text-white text-5xl font-black shadow-2xl overflow-hidden">
                  {user.fullName[0]}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">{user.fullName}</h2>
                <div className="flex items-center justify-center gap-1.5 text-indigo-600 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {user.role === 'freelancer' ? 'Elite Specialist' : 'Marketplace Client'}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-black/5 space-y-6">
                <div className="text-left space-y-4">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">{t('nav_settings')}</p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Language</span>
                      <div className="flex gap-1 bg-black/5 p-1 rounded-full">
                        {['en', 'ru', 'hy'].map((l) => (
                          <button 
                            key={l} 
                            onClick={() => setLang(l as any)} 
                            className={`w-8 h-8 rounded-full text-[9px] font-black transition-all ${lang === l ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}
                          >
                            {l.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-3 border-t border-black/5">
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Email</span>
                      <span className="text-[11px] font-medium text-gray-400 truncate max-w-[120px]">{user.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-10 rounded-[3.5rem] space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase italic tracking-tighter">Completed Orders</h3>
                <span className="px-4 py-1.5 bg-black/5 rounded-full text-[10px] font-black uppercase">{completedOrders.length} projects</span>
              </div>

              <div className="space-y-4">
                {completedOrders.map((order) => (
                  <div key={order.id} className="group p-6 rounded-[2rem] bg-white hover:bg-black hover:text-white transition-all border border-black/5 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black/5 group-hover:bg-white/10 rounded-2xl flex items-center justify-center transition-all">
                        <Briefcase className="w-6 h-6 text-gray-400 group-hover:text-white" />
                      </div>
                      <div>
                        <h4 className="font-black uppercase italic text-sm">{order.title}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase group-hover:text-white/60">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black italic tracking-tighter">{order.amount}</p>
                      <div className="flex items-center gap-1 justify-end text-emerald-500 group-hover:text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Completed</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-5 border-2 border-dashed border-black/10 rounded-[2rem] text-gray-400 hover:text-black hover:border-black/30 transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                View All History <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Activity Highlights */}
            <div className="grid grid-cols-2 gap-6">
              <ActivityStat label="Response Rate" value="100%" color="text-indigo-600" />
              <ActivityStat label="On Time" value="98%" color="text-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ActivityStat = ({ label, value, color }: any) => (
  <div className="glass-panel p-8 rounded-[2.5rem] space-y-2">
    <p className={`text-4xl font-black italic tracking-tighter ${color}`}>{value}</p>
    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{label}</p>
  </div>
)
