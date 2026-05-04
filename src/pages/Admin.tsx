import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Users, 
  ShieldCheck, 
  Search, 
  Mail,
  Activity,
  Globe,
  CheckCircle2,
  TrendingUp,
  MoreHorizontal,
  LogOut,
  ChevronRight,
  Plus
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../context/AppContext'

export const Admin = () => {
  const navigate = useNavigate();
  const { user, users, jobs } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'stats'>('users');

  const filteredUsers = users.filter(u => 
    u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] p-8 font-sans relative overflow-hidden text-black">
      <BackgroundAnimation />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Header */}
        <header className="flex items-start justify-between">
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-400 hover:text-black transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> 
              EXIT ADMIN PANEL
            </button>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">ADMIN WORKSPACE</h1>
          </div>
          
          <div className="bg-white border-2 border-black rounded-[1.5rem] px-6 py-3 flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase italic leading-none">{user?.fullName || 'Super Admin'}</p>
               <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">GLOBAL MODERATOR</p>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="bg-black/5 p-1 rounded-full w-fit flex gap-1 border-2 border-black/5">
          <button 
            onClick={() => setActiveTab('users')} 
            className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
          >
            USER MANAGEMENT
          </button>
          <button 
            onClick={() => setActiveTab('stats')} 
            className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'stats' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
          >
            PLATFORM STATISTICS
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <AdminStat icon={Users} label="TOTAL USERS" value="1,240" growth="+12" />
          <AdminStat icon={TrendingUp} label="DAILY GROWTH" value="25" growth="+5" color="text-emerald-500" />
          <AdminStat icon={ShieldCheck} label="VERIFIED" value="890" growth="+18" color="text-blue-500" />
          <AdminStat icon={Mail} label="NEW INQUIRIES" value="12" />
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'users' ? (
            <motion.div 
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border-2 border-black rounded-[3.5rem] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] overflow-hidden"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-black italic uppercase tracking-tight">USER MANAGEMENT</h2>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    className="w-80 bg-gray-50 border-2 border-black/5 rounded-full pl-12 pr-6 py-2.5 text-[10px] font-black uppercase tracking-widest outline-none focus:border-black transition-all" 
                    placeholder="Filter users..." 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-[9px] font-black uppercase text-gray-400 border-b border-black/5">
                    <tr>
                      <th className="px-4 py-6">USER</th>
                      <th className="px-4 py-6 text-center">ROLE</th>
                      <th className="px-4 py-6 text-center">STATUS</th>
                      <th className="px-4 py-6 text-center">JOINED DATE</th>
                      <th className="px-4 py-6 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {filteredUsers.slice(0, 4).map((u, i) => (
                      <tr key={u.id} className="group hover:bg-gray-50/50 transition-all">
                        <td className="px-4 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black border border-black/5">
                                {u.fullName[0]}
                              </div>
                              <div>
                                 <p className="text-[11px] font-black uppercase italic leading-none">{u.fullName}</p>
                                 <p className="text-[9px] font-bold text-gray-300 mt-1">{u.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-4 py-6 text-center">
                          <span className="px-4 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase">
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <span className="text-[9px] font-black uppercase">VERIFIED</span>
                          </div>
                        </td>
                        <td className="px-4 py-6 text-center text-[10px] font-bold text-gray-400 uppercase">
                          2023-05-{12 + i}
                        </td>
                        <td className="px-4 py-6 text-right">
                           <button className="p-2 hover:bg-black hover:text-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
                             <MoreHorizontal className="w-4 h-4" />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="bg-white border-2 border-black rounded-[3rem] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3 mb-10">
                   <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white"><Activity className="w-4 h-4" /></div>
                   <h3 className="text-sm font-black uppercase italic">REAL-TIME ACTIVITY</h3>
                </div>
                <div className="grid grid-cols-2 gap-10 mb-10">
                   <div>
                      <p className="text-4xl font-black italic tracking-tighter">142</p>
                      <p className="text-[9px] font-black uppercase text-gray-400 mt-1">USERS ONLINE NOW</p>
                   </div>
                   <div>
                      <p className="text-4xl font-black italic tracking-tighter">4,829</p>
                      <p className="text-[9px] font-black uppercase text-gray-400 mt-1">TOTAL REGISTRATIONS</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <p className="text-[9px] font-black uppercase tracking-widest text-gray-300">TRAFFIC INTENSITY (24H)</p>
                   <div className="h-32 flex items-end gap-1.5">
                      {[40, 60, 45, 90, 65, 30, 80, 50, 40, 70, 85, 35, 60, 45].map((h, i) => (
                        <div key={i} className="flex-1 bg-gray-100 rounded-t-sm" style={{ height: h + '%' }}></div>
                      ))}
                   </div>
                </div>
              </div>

              <div className="bg-white border-2 border-black rounded-[3rem] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3 mb-10">
                   <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white"><Globe className="w-4 h-4" /></div>
                   <h3 className="text-sm font-black uppercase italic">GEOGRAPHICAL BREAKDOWN</h3>
                </div>
                <div className="space-y-6">
                   <CountryRow label="ARMENIA" value="3,158" percentage={65} />
                   <CountryRow label="RUSSIA" value="869" percentage={18} />
                   <CountryRow label="UNITED STATES" value="483" percentage={10} />
                   <CountryRow label="FRANCE" value="193" percentage={4} />
                   <CountryRow label="OTHER" value="126" percentage={3} />
                </div>
                <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                   <p className="text-[9px] font-black uppercase text-blue-600 mb-2">TARGET INSIGHT</p>
                   <p className="text-[10px] font-bold text-blue-900 leading-relaxed">
                     Your core audience is 65% Armenian-based. Diaspora engagement in Russia and US is growing by 12% monthly.
                   </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const AdminStat = ({ icon: Icon, label, value, growth, color = "text-emerald-500" }: any) => (
  <div className="bg-white border-2 border-black rounded-[2.5rem] p-8 space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.02)] relative overflow-hidden group">
    <div className="flex justify-between items-start relative z-10">
      <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6" />
      </div>
      {growth && (
        <div className={`px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 ${color} text-[9px] font-black tracking-tighter`}>
          {growth}
        </div>
      )}
    </div>
    <div className="relative z-10">
       <p className="text-3xl font-black italic tracking-tighter">{value}</p>
       <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mt-1">{label}</p>
    </div>
    <div className="absolute top-0 right-0 w-24 h-24 bg-black/5 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700"></div>
  </div>
);

const CountryRow = ({ label, value, percentage }: any) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-end">
       <p className="text-[9px] font-black uppercase">{label}</p>
       <p className="text-[9px] font-black">{value} users <span className="text-gray-300">({percentage}%)</span></p>
    </div>
    <div className="h-1 bg-gray-50 rounded-full overflow-hidden">
       <div className="h-full bg-black rounded-full" style={{ width: percentage + '%' }}></div>
    </div>
  </div>
)

const BackgroundAnimation = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 bg-[#fcfcfc] overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          x: Math.random() * 100 + 'vw', 
          y: Math.random() * 100 + 'vh',
          scale: Math.random() * 0.5 + 0.5,
          opacity: Math.random() * 0.05 + 0.01
        }}
        animate={{ 
          x: [
            Math.random() * 100 + 'vw', 
            Math.random() * 100 + 'vw', 
            Math.random() * 100 + 'vw'
          ],
          y: [
            Math.random() * 100 + 'vh', 
            Math.random() * 100 + 'vh', 
            Math.random() * 100 + 'vh'
          ],
        }}
        transition={{ 
          duration: Math.random() * 40 + 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute w-64 h-64 bg-black rounded-full blur-3xl"
      />
    ))}
  </div>
);
