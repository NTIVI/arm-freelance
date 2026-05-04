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
  Plus,
  Briefcase,
  Trash2,
  Edit3,
  Terminal,
  Database,
  Cpu,
  Layers,
  Zap,
  ArrowUpRight,
  Shield,
  Command,
  Sparkles
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../context/AppContext'

export const Admin = () => {
  const navigate = useNavigate();
  const { user, users, jobs } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'ads' | 'stats'>('users');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'freelancer' | 'client'>('all');

  const filteredUsers = users.filter(u => 
    (u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (userRoleFilter === 'all' || u.role === userRoleFilter)
  );

  const stats = {
    total: users.length,
    online: users.filter(u => u.online).length,
    verified: users.filter(u => u.verified).length,
    completed: jobs.filter(j => j.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans relative overflow-hidden selection:bg-black selection:text-white">
      <BackgroundMesh />

      <div className="max-w-7xl mx-auto px-10 py-20 space-y-16 relative z-10">
        {/* Modern Admin Header */}
        <header className="flex items-start justify-between">
          <div className="space-y-6">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="flex items-center gap-6 text-label text-[9px] text-black/30 hover:text-black transition-all group"
            >
              <div className="w-12 h-12 bg-white border border-black/5 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-700 shadow-sm">
                 <ArrowLeft className="w-5 h-5" />
              </div>
              De-authorize Session
            </button>
            <div className="space-y-2">
              <h1 className="text-display text-8xl italic leading-none">COMMAND CENTER</h1>
              <div className="flex items-center gap-4">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                 <p className="text-label text-[8px] tracking-[0.4em] text-black/40 uppercase">Global Oversight Protocol Active</p>
              </div>
            </div>
          </div>
          
          <div className="premium-card px-10 py-6 border-none bg-black text-white flex items-center gap-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center relative z-10">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="relative z-10">
               <p className="text-display text-xl italic leading-none">{user?.fullName || 'Super Admin'}</p>
               <p className="text-label text-[7px] text-white/30 tracking-[0.3em] mt-1">GLOBAL ARCHITECT</p>
            </div>
          </div>
        </header>

        {/* Dynamic Command Tabs */}
        <div className="flex items-center justify-between">
           <div className="bg-zinc-50 p-1.5 rounded-full flex gap-1 border border-black/5">
             <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} label="Neural Registry" icon={Users} />
             <TabButton active={activeTab === 'ads'} onClick={() => setActiveTab('ads')} label="Project Clusters" icon={Briefcase} />
             <TabButton active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} label="Ecosystem Intel" icon={Activity} />
           </div>
           
           <div className="flex items-center gap-4 text-label text-[8px] text-black/20">
              <Clock className="w-4 h-4" /> System Uptime: 99.98%
           </div>
        </div>

        {/* Global Stats Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <MatrixStat icon={Users} label="Total Specialists" value={stats.total} growth="+24%" />
          <MatrixStat icon={Zap} label="Neural Activity" value={stats.online} color="text-emerald-500" />
          <MatrixStat icon={ShieldCheck} label="Audit Status" value={stats.verified} color="text-blue-500" />
          <MatrixStat icon={Briefcase} label="Value Swaps" value={stats.completed} />
        </div>

        {/* Operational Interface */}
        <AnimatePresence mode="wait">
          {activeTab === 'users' && (
            <motion.div 
              key="users"
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              className="premium-card p-12 bg-white/70 backdrop-blur-3xl border-black/5"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex gap-4">
                   <FilterPill label="All Nodes" active={userRoleFilter === 'all'} onClick={() => setUserRoleFilter('all')} />
                   <FilterPill label="Specialists" active={userRoleFilter === 'freelancer'} onClick={() => setUserRoleFilter('freelancer')} />
                   <FilterPill label="Clients" active={userRoleFilter === 'client'} onClick={() => setUserRoleFilter('client')} />
                </div>
                <div className="relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input 
                    className="w-96 bg-zinc-50 border border-transparent rounded-[1.5rem] pl-16 pr-8 py-4 text-xs font-bold outline-none focus:bg-white focus:border-black/10 transition-all shadow-inner" 
                    placeholder="Filter neural registry..." 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                  />
                </div>
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left">
                  <thead className="text-label text-[8px] text-black/30 border-b border-black/5">
                    <tr>
                      <th className="px-6 py-8">IDENTITY NODE</th>
                      <th className="px-6 py-8 text-center">PROTOCOL ROLE</th>
                      <th className="px-6 py-8 text-center">SYNC STATUS</th>
                      <th className="px-6 py-8 text-center">VALUE UNITS</th>
                      <th className="px-6 py-8 text-right">OPERATIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="group hover:bg-zinc-50 transition-all duration-500">
                        <td className="px-6 py-10">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-white text-lg font-black italic shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                                {u.fullName[0]}
                              </div>
                              <div>
                                 <p className="text-display text-xl italic leading-none">{u.fullName}</p>
                                 <p className="text-label text-[8px] text-black/20 mt-1 uppercase tracking-[0.2em]">{u.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-10 text-center">
                          <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl shadow-black/5 ${u.role === 'freelancer' ? 'bg-indigo-500 text-white' : 'bg-emerald-500 text-white'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-10 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${u.online ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-200'}`}></div>
                            <span className="text-label text-[8px]">{u.online ? 'SYNCED' : 'OFFLINE'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-10 text-center text-display text-2xl italic text-black/30">
                          {u.completedJobsCount || 0}
                        </td>
                        <td className="px-6 py-10 text-right">
                           <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 group-hover:translate-x-0">
                              <button className="w-12 h-12 bg-white border border-black/5 rounded-xl flex items-center justify-center hover:bg-black hover:text-white transition-all"><Edit3 className="w-4 h-4" /></button>
                              <button className="w-12 h-12 bg-white border border-black/5 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all text-red-500"><Trash2 className="w-4 h-4" /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'ads' && (
            <motion.div 
              key="ads"
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              className="grid grid-cols-1 gap-10"
            >
              {jobs.map(job => (
                <div key={job.id} className="premium-card p-12 bg-white hover:border-black/20 transition-all duration-700 flex justify-between items-center group">
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl shadow-black/5 ${job.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-black text-white'}`}>
                          {job.status === 'completed' ? 'Finalized' : job.category}
                        </span>
                        {job.status === 'in-progress' && <span className="px-5 py-2 bg-indigo-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">Processing</span>}
                      </div>
                      <h3 className="text-display text-5xl italic leading-none group-hover:translate-x-2 transition-transform duration-700">{job.title}</h3>
                      <p className="text-label text-[8px] text-black/20 tracking-[0.4em]">SOURCE: {job.clientName?.toUpperCase()}</p>
                   </div>
                   <div className="flex items-center gap-16">
                      <div className="text-right space-y-1">
                         <p className="text-display text-6xl italic leading-none">${job.budget}</p>
                         <p className="text-label text-[8px] text-black/20 tracking-[0.3em]">{job.status.toUpperCase()}</p>
                      </div>
                      <div className="flex gap-4">
                         <button className="w-14 h-14 bg-zinc-50 border border-black/5 rounded-2xl flex items-center justify-center hover:bg-black hover:text-white transition-all duration-700"><Edit3 className="w-5 h-5" /></button>
                         <button className="w-14 h-14 bg-zinc-50 border border-black/5 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-700 text-red-500"><Trash2 className="w-5 h-5" /></button>
                      </div>
                   </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div 
              key="stats"
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              <div className="premium-card p-16 bg-white space-y-12">
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white rotate-6"><Activity className="w-6 h-6" /></div>
                   <h3 className="text-display text-3xl italic">Real-time Pulse</h3>
                </div>
                <div className="grid grid-cols-2 gap-12">
                   <div className="space-y-2">
                      <p className="text-display text-6xl italic leading-none text-emerald-500">142</p>
                      <p className="text-label text-[8px] text-black/20 tracking-[0.3em]">Synced Nodes</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-display text-6xl italic leading-none">4.8k</p>
                      <p className="text-label text-[8px] text-black/20 tracking-[0.3em]">Neural Registry Total</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <p className="text-label text-[7px] text-black/20 tracking-[0.5em]">24H INTENSITY MAP</p>
                   <div className="h-48 flex items-end gap-2 p-6 bg-zinc-50 rounded-[3rem]">
                      {[40, 60, 45, 90, 65, 30, 80, 50, 40, 70, 85, 35, 60, 45, 75, 55, 30, 95, 60].map((h, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ height: 0 }}
                          animate={{ height: h + '%' }}
                          transition={{ delay: i * 0.05, duration: 1 }}
                          className="flex-1 bg-black/10 hover:bg-black transition-colors rounded-full" 
                        />
                      ))}
                   </div>
                </div>
              </div>

              <div className="premium-card p-16 bg-zinc-50 border-none space-y-12">
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white rotate-6"><Globe className="w-6 h-6" /></div>
                   <h3 className="text-display text-3xl italic">Geo Breakdown</h3>
                </div>
                <div className="space-y-10">
                   <GeographicRow label="ARMENIA" value="3,158" percentage={65} />
                   <GeographicRow label="RUSSIA" value="869" percentage={18} />
                   <GeographicRow label="EUROPE" value="483" percentage={12} />
                   <GeographicRow label="AMERICAS" value="126" percentage={5} />
                </div>
                <div className="p-10 premium-card bg-black text-white border-none space-y-6">
                   <p className="text-label text-[8px] text-emerald-400 tracking-[0.3em]">INTELLIGENCE REPORT</p>
                   <p className="text-sm font-medium italic leading-relaxed text-zinc-400">
                     Core synchronization is centralized in the Armenia node (65%). Inbound requests from the US and Europe clusters are showing a 15% expansion in the current cycle.
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

const MatrixStat = ({ icon: Icon, label, value, growth, color = "text-black" }: any) => (
  <div className="premium-card p-10 space-y-8 bg-white border-black/5 hover:border-black/20 transition-all duration-700 relative overflow-hidden group">
    <div className="flex justify-between items-start relative z-10">
      <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-700 group-hover:rotate-12">
        <Icon className="w-7 h-7" />
      </div>
      {growth && (
        <div className="px-4 py-1.5 rounded-full bg-emerald-500 text-white text-display text-sm italic shadow-xl shadow-emerald-500/20">
          {growth}
        </div>
      )}
    </div>
    <div className="relative z-10">
       <p className={`text-display text-6xl italic leading-none ${color}`}>{value}</p>
       <p className="text-label text-[8px] text-black/20 tracking-[0.3em] mt-3">{label}</p>
    </div>
    <div className="absolute top-0 right-0 w-32 h-32 bg-black opacity-[0.02] group-hover:opacity-[0.06] rounded-full -mr-16 -mt-16 transition-all duration-1000 group-hover:scale-150"></div>
  </div>
);

const TabButton = ({ active, onClick, label, icon: Icon }: any) => (
  <button 
    onClick={onClick} 
    className={`px-8 py-4 rounded-full text-label text-[9px] flex items-center gap-4 transition-all duration-500 ${active ? 'bg-black text-white shadow-2xl scale-[1.05]' : 'text-black/30 hover:text-black hover:bg-black/5'}`}
  >
    <Icon className={`w-4 h-4 transition-transform ${active ? '' : 'group-hover:scale-110'}`} />
    {label}
  </button>
)

const FilterPill = ({ label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`px-6 py-2.5 rounded-full text-label text-[8px] transition-all duration-500 ${active ? 'bg-black text-white shadow-xl' : 'bg-white border border-black/5 text-black/30 hover:border-black/20 hover:text-black'}`}
  >
    {label}
  </button>
)

const GeographicRow = ({ label, value, percentage }: any) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
       <p className="text-label text-[8px] tracking-widest">{label}</p>
       <p className="text-display text-lg italic leading-none">{value} <span className="text-label text-[10px] text-black/20 ml-2">({percentage}%)</span></p>
    </div>
    <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
       <motion.div initial={{ width: 0 }} animate={{ width: percentage + '%' }} transition={{ duration: 1.5 }} className="h-full bg-black rounded-full" />
    </div>
  </div>
)

const BackgroundMesh = () => (
  <div className="bg-mesh-container">
    <div className="mesh-blob bg-blue-50 w-[1200px] h-[1200px] top-[-400px] right-[-200px]"></div>
    <div className="mesh-blob bg-rose-50 w-[1000px] h-[1000px] bottom-[-300px] left-[-200px]" style={{ animationDelay: '-15s' }}></div>
  </div>
)
