import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Users, 
  ShieldCheck, 
  Search, 
  Activity,
  Globe,
  CircleCheck,
  LogOut,
  ChevronRight,
  Briefcase,
  Trash2,
  Edit3,
  Zap,
  Shield,
  Clock,
  Command
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
    <div className="min-h-screen bg-[#050505] text-white font-sans relative overflow-hidden selection:bg-violet-500 selection:text-white">
      <BackgroundMesh />
      <div className="bg-overlay"></div>

      <div className="max-w-7xl mx-auto px-10 py-20 space-y-16 relative z-10">
        {/* Modern Admin Header */}
        <header className="flex items-start justify-between">
          <div className="space-y-6">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="flex items-center gap-6 text-label text-[9px] text-white/30 hover:text-white transition-all group"
            >
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700 shadow-sm">
                 <ArrowLeft className="w-5 h-5" />
              </div>
              De-authorize Session
            </button>
            <div className="space-y-2">
              <h1 className="text-display text-8xl italic leading-none bg-gradient-to-r from-white via-white to-white/20 bg-clip-text text-transparent">COMMAND CENTER</h1>
              <div className="flex items-center gap-4">
                 <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                 <p className="text-label text-[8px] tracking-[0.4em] text-white/40 uppercase">Global Oversight Protocol Active</p>
              </div>
            </div>
          </div>
          
          <div className="premium-card px-10 py-6 border-none bg-white/5 text-white flex items-center gap-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-violet-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center relative z-10 shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="relative z-10">
               <p className="text-display text-xl italic leading-none text-white">{user?.fullName || 'Super Admin'}</p>
               <p className="text-label text-[7px] text-white/30 tracking-[0.3em] mt-1">GLOBAL ARCHITECT</p>
            </div>
          </div>
        </header>

        {/* Dynamic Command Tabs */}
        <div className="flex items-center justify-between">
           <div className="bg-white/5 p-1.5 rounded-full flex gap-1 border border-white/5 backdrop-blur-xl">
             <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} label="Neural Registry" icon={Users} />
             <TabButton active={activeTab === 'ads'} onClick={() => setActiveTab('ads')} label="Project Clusters" icon={Briefcase} />
             <TabButton active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} label="Ecosystem Intel" icon={Activity} />
           </div>
           
           <div className="flex items-center gap-4 text-label text-[8px] text-white/20">
              <Clock className="w-4 h-4" /> System Uptime: 99.98%
           </div>
        </div>

        {/* Global Stats Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <MatrixStat icon={Users} label="Total Specialists" value={stats.total} growth="+24%" />
          <MatrixStat icon={Zap} label="Neural Activity" value={stats.online} color="text-violet-400" />
          <MatrixStat icon={ShieldCheck} label="Audit Status" value={stats.verified} color="text-fuchsia-400" />
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
              className="premium-card p-12 bg-white/[0.02] backdrop-blur-3xl border-white/10"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex gap-4">
                   <FilterPill label="All Nodes" active={userRoleFilter === 'all'} onClick={() => setUserRoleFilter('all')} />
                   <FilterPill label="Specialists" active={userRoleFilter === 'freelancer'} onClick={() => setUserRoleFilter('freelancer')} />
                   <FilterPill label="Clients" active={userRoleFilter === 'client'} onClick={() => setUserRoleFilter('client')} />
                </div>
                <div className="relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-violet-400 transition-colors" />
                  <input 
                    className="w-96 bg-white/5 border border-white/5 rounded-[1.5rem] pl-16 pr-8 py-4 text-xs font-bold outline-none focus:bg-white/10 focus:border-white/20 transition-all text-white shadow-inner" 
                    placeholder="Filter neural registry..." 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                  />
                </div>
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-separate border-spacing-y-2">
                  <thead className="text-label text-[8px] text-white/20">
                    <tr>
                      <th className="px-8 py-6">IDENTITY NODE</th>
                      <th className="px-8 py-6 text-center">PROTOCOL ROLE</th>
                      <th className="px-8 py-6 text-center">SYNC STATUS</th>
                      <th className="px-8 py-6 text-center">VALUE UNITS</th>
                      <th className="px-8 py-6 text-right">OPERATIONS</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="group transition-all duration-500">
                        <td className="px-8 py-6 bg-white/[0.01] rounded-l-[2rem] group-hover:bg-white/[0.03] border-y border-l border-white/[0.05]">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-lg font-black italic shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                                {u.fullName[0]}
                              </div>
                              <div>
                                 <p className="text-display text-xl italic leading-none text-white">{u.fullName}</p>
                                 <p className="text-label text-[8px] text-white/20 mt-1 uppercase tracking-[0.2em]">{u.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-center bg-white/[0.01] group-hover:bg-white/[0.03] border-y border-white/[0.05]">
                          <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl ${u.role === 'freelancer' ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' : 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-center bg-white/[0.01] group-hover:bg-white/[0.03] border-y border-white/[0.05]">
                          <div className="flex items-center justify-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${u.online ? 'bg-violet-500 animate-pulse shadow-[0_0_8px_rgba(139,92,246,1)]' : 'bg-white/10'}`}></div>
                            <span className="text-label text-[8px]">{u.online ? 'SYNCED' : 'OFFLINE'}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center text-display text-2xl italic text-white/10 bg-white/[0.01] group-hover:bg-white/[0.03] border-y border-white/[0.05]">
                          {u.completedJobsCount || 0}
                        </td>
                        <td className="px-8 py-6 text-right bg-white/[0.01] rounded-r-[2rem] group-hover:bg-white/[0.03] border-y border-r border-white/[0.05]">
                           <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 group-hover:translate-x-0">
                              <button className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white hover:text-black transition-all"><Edit3 className="w-4 h-4" /></button>
                              <button className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all text-red-500"><Trash2 className="w-4 h-4" /></button>
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
                <div key={job.id} className="premium-card p-12 bg-white/[0.02] border-white/5 hover:border-white/20 transition-all duration-700 flex justify-between items-center group">
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl ${job.status === 'completed' ? 'bg-violet-500 text-white' : 'bg-white/10 text-white'}`}>
                          {job.status === 'completed' ? 'Finalized' : job.category}
                        </span>
                        {job.status === 'in-progress' && <span className="px-5 py-2 bg-fuchsia-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse shadow-lg shadow-fuchsia-500/20">Processing</span>}
                      </div>
                      <h3 className="text-display text-5xl italic leading-none text-white group-hover:translate-x-2 transition-transform duration-700">{job.title}</h3>
                      <p className="text-label text-[8px] text-white/20 tracking-[0.4em]">SOURCE: {job.clientName?.toUpperCase()}</p>
                   </div>
                   <div className="flex items-center gap-16">
                      <div className="text-right space-y-1">
                         <p className="text-display text-6xl italic leading-none text-white">${job.budget}</p>
                         <p className="text-label text-[8px] text-white/20 tracking-[0.3em]">{job.status.toUpperCase()}</p>
                      </div>
                      <div className="flex gap-4">
                         <button className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-black transition-all duration-700"><Edit3 className="w-5 h-5" /></button>
                         <button className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-700 text-red-500"><Trash2 className="w-5 h-5" /></button>
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
              <div className="premium-card p-16 bg-white/[0.02] border-white/10 space-y-12 shadow-2xl">
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center text-white rotate-6"><Activity className="w-6 h-6" /></div>
                   <h3 className="text-display text-3xl italic text-white">Real-time Pulse</h3>
                </div>
                <div className="grid grid-cols-2 gap-12">
                   <div className="space-y-2">
                      <p className="text-display text-6xl italic leading-none text-violet-400">142</p>
                      <p className="text-label text-[8px] text-white/20 tracking-[0.3em]">Synced Nodes</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-display text-6xl italic leading-none text-white">4.8k</p>
                      <p className="text-label text-[8px] text-white/20 tracking-[0.3em]">Neural Registry Total</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <p className="text-label text-[7px] text-white/20 tracking-[0.5em]">24H INTENSITY MAP</p>
                   <div className="h-48 flex items-end gap-2 p-6 bg-white/5 rounded-[3rem] border border-white/5">
                      {[40, 60, 45, 90, 65, 30, 80, 50, 40, 70, 85, 35, 60, 45, 75, 55, 30, 95, 60].map((h, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ height: 0 }}
                          animate={{ height: h + '%' }}
                          transition={{ delay: i * 0.05, duration: 1 }}
                          className="flex-1 bg-violet-500/20 hover:bg-violet-400 transition-colors rounded-full" 
                        />
                      ))}
                   </div>
                </div>
              </div>

              <div className="premium-card p-16 bg-white/[0.02] border-white/10 space-y-12 shadow-2xl">
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-600 to-pink-600 rounded-2xl flex items-center justify-center text-white rotate-6"><Globe className="w-6 h-6" /></div>
                    <h3 className="text-display text-3xl italic text-white">Geo Breakdown</h3>
                 </div>
                 <div className="space-y-10">
                    <GeographicRow label="ARMENIA" value="3,158" percentage={65} color="bg-violet-500" />
                    <GeographicRow label="RUSSIA" value="869" percentage={18} color="bg-fuchsia-500" />
                    <GeographicRow label="EUROPE" value="483" percentage={12} color="bg-pink-500" />
                    <GeographicRow label="AMERICAS" value="126" percentage={5} color="bg-indigo-500" />
                 </div>
                 <div className="p-10 premium-card bg-violet-500/10 text-white border-none space-y-6">
                    <p className="text-label text-[8px] text-violet-400 tracking-[0.3em]">INTELLIGENCE REPORT</p>
                    <p className="text-sm font-medium italic leading-relaxed text-white/40">
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

function MatrixStat({ icon: Icon, label, value, growth, color = "text-white" }: any) {
  return (
    <div className="premium-card p-10 space-y-8 bg-white/[0.02] border-white/10 hover:border-violet-500/30 transition-all duration-700 relative overflow-hidden group shadow-2xl">
      <div className="flex justify-between items-start relative z-10">
        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white group-hover:bg-violet-500 group-hover:text-white transition-all duration-700 group-hover:rotate-12">
          <Icon className="w-7 h-7" />
        </div>
        {growth && (
          <div className="px-4 py-1.5 rounded-full bg-violet-500 text-white text-display text-sm italic shadow-xl shadow-violet-500/20">
            {growth}
          </div>
        )}
      </div>
      <div className="relative z-10">
         <p className={`text-display text-6xl italic leading-none ${color}`}>{value}</p>
         <p className="text-label text-[8px] text-white/20 tracking-[0.3em] mt-3 uppercase">{label}</p>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500 opacity-[0.02] group-hover:opacity-[0.06] rounded-full -mr-16 -mt-16 transition-all duration-1000 group-hover:scale-150"></div>
    </div>
  )
}

function TabButton({ active, onClick, label, icon: Icon }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`px-8 py-4 rounded-full text-label text-[9px] flex items-center gap-4 transition-all duration-500 ${active ? 'bg-white text-black shadow-2xl scale-[1.05]' : 'text-white/30 hover:text-white hover:bg-white/5'}`}
    >
      <Icon className={`w-4 h-4 transition-transform ${active ? '' : 'group-hover:scale-110'}`} />
      {label}
    </button>
  )
}

function FilterPill({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2.5 rounded-full text-label text-[8px] transition-all duration-500 ${active ? 'bg-violet-500 text-white shadow-xl shadow-violet-500/20 border border-violet-500/30' : 'bg-white/5 border border-white/5 text-white/30 hover:border-white/20 hover:text-white'}`}
    >
      {label}
    </button>
  )
}

function GeographicRow({ label, value, percentage, color }: any) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
         <p className="text-label text-[8px] tracking-widest text-white/40">{label}</p>
         <p className="text-display text-lg italic leading-none text-white">{value} <span className="text-label text-[10px] text-white/10 ml-2">({percentage}%)</span></p>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
         <motion.div 
           initial={{ width: 0 }} 
           animate={{ width: percentage + '%' }} 
           transition={{ duration: 1.5 }} 
           className={`h-full ${color} rounded-full shadow-[0_0_10px_rgba(139,92,246,0.3)]`} 
         />
      </div>
    </div>
  )
}

function BackgroundMesh() {
  return (
    <div className="bg-mesh-container">
      <div className="mesh-blob bg-violet-600/30 w-[1200px] h-[1200px] top-[-400px] right-[-200px]"></div>
      <div className="mesh-blob bg-fuchsia-600/20 w-[1000px] h-[1000px] bottom-[-300px] left-[-200px]" style={{ animationDelay: '-15s' }}></div>
    </div>
  )
}
