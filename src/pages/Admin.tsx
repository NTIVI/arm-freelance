import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  ShieldCheck, 
  Activity, 
  Globe, 
  Search, 
  Zap, 
  Briefcase, 
  MessageSquare,
  Clock,
  ArrowUpRight,
  Shield,
  Trash2,
  Lock,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

export const Admin = () => {
  const navigate = useNavigate();
  const { user, users, jobs } = useAppContext();
  const [activeTab, setActiveTab] = useState<'users' | 'missions' | 'stats'>('users');
  const [searchTerm, setSearchTerm] = useState('');

  if (user?.role !== 'admin' && user?.id !== 'demo-user') { // Simulation bypass
     // navigate('/');
  }

  const stats = {
    online: users.filter(u => u.online).length + 142, // Mocking
    registrations: users.length + 4850,
    countries: ['Armenia', 'Russia', 'USA', 'France'],
    successDeals: jobs.filter(j => j.status === 'completed').length + 850
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Admin Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-4">
           <h1 className="text-display text-8xl italic leading-none bg-gradient-to-r from-white via-white to-white/20 bg-clip-text text-transparent uppercase">Command Center</h1>
           <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <p className="text-label text-[8px] tracking-[0.4em] text-white/40 uppercase">Global Oversight Active | System Master Level</p>
           </div>
        </div>

        <div className="flex bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-xl">
           <TabBtn active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={Users} label="Neural Registry" />
           <TabBtn active={activeTab === 'missions'} onClick={() => setActiveTab('missions')} icon={Briefcase} label="Missions" />
           <TabBtn active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={Activity} label="Intel" />
        </div>
      </header>

      {/* Stats Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <MatrixStat icon={Zap} label="Synced Nodes" value={stats.online} color="text-violet-400" />
        <MatrixStat icon={Users} label="Registry Total" value={stats.registrations} color="text-fuchsia-400" />
        <MatrixStat icon={Globe} label="Active Clusters" value={stats.countries.length} color="text-indigo-400" />
        <MatrixStat icon={ShieldCheck} label="Secured Deals" value={stats.successDeals} color="text-emerald-400" />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'users' && (
          <motion.div 
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center">
              <div className="relative group w-96">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-violet-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Scan neural registry (email, nickname, IP)..." 
                  className="input-lux pl-16 py-4 text-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="premium-card overflow-hidden bg-white/[0.01] border-white/5 shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-label text-[8px] text-white/20 uppercase tracking-[0.2em]">
                  <tr>
                    <th className="px-8 py-6">Identity Node</th>
                    <th className="px-8 py-6 text-center">Protocol Role</th>
                    <th className="px-8 py-6 text-center">IP Address</th>
                    <th className="px-8 py-6 text-center">Registry Date</th>
                    <th className="px-8 py-6 text-right">Ops</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AdminUserRow name="Aris Vardanian" email="aris@afmarket.am" role="Freelancer" ip="185.12.30.45" date="2026-05-01" />
                  <AdminUserRow name="Vigen Sargsyan" email="vigen@fintech.am" role="Client" ip="178.45.12.90" date="2026-05-03" />
                  <AdminUserRow name="Artak Dev" email="artak@cyber.am" role="Freelancer" ip="109.123.4.5" date="2026-05-04" />
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div 
            key="stats"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="premium-card p-16 bg-white/[0.02] border-white/10 space-y-12">
                  <h3 className="text-display text-3xl italic text-white flex items-center gap-4">
                     <MapPin className="w-6 h-6 text-violet-400" /> Cluster Distribution
                  </h3>
                  <div className="space-y-8">
                     <StatProgress label="Armenia (Main Node)" value={65} color="bg-violet-500" />
                     <StatProgress label="Russia Cluster" value={18} color="bg-fuchsia-500" />
                     <StatProgress label="USA / Europe" value={12} color="bg-indigo-500" />
                     <StatProgress label="Others" value={5} color="bg-white/20" />
                  </div>
               </div>

               <div className="premium-card p-16 bg-white/[0.02] border-white/10 space-y-12">
                  <h3 className="text-display text-3xl italic text-white flex items-center gap-4">
                     <Activity className="w-6 h-6 text-fuchsia-400" /> Registry Velocity
                  </h3>
                  <div className="h-48 flex items-end gap-3 p-6 bg-black/40 rounded-[3rem] border border-white/5">
                     {[40, 60, 45, 90, 65, 30, 80, 50, 40, 70, 85, 35, 60, 45, 75, 55, 30, 95, 60].map((h, i) => (
                       <motion.div 
                         key={i} 
                         initial={{ height: 0 }}
                         animate={{ height: h + '%' }}
                         transition={{ delay: i * 0.05, duration: 1 }}
                         className="flex-1 bg-violet-500/20 hover:bg-violet-500 transition-all rounded-full" 
                       />
                     ))}
                  </div>
                  <p className="text-label text-[8px] text-white/20 uppercase tracking-[0.4em] text-center">Last 24 Cycles Activities</p>
               </div>
            </div>

            {/* Economy Management */}
            <div className="premium-card p-16 bg-violet-600/5 border-violet-500/20 space-y-12">
               <div className="flex justify-between items-center">
                  <h3 className="text-display text-4xl italic text-white uppercase">Protocol Economy (Connects)</h3>
                  <button className="btn-lux px-10 py-4 text-[9px]">Update Rates</button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <EconomyCard label="Base Commission" value="10%" desc="Platform fee per transaction node" />
                  <EconomyCard label="Credit Valuation" value="500 AMD" desc="Price per single bid connect" />
                  <EconomyCard label="Free Allocation" value="20 Units" desc="Initial credits for new nodes" />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TabBtn = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`px-8 py-4 rounded-full text-label text-[9px] flex items-center gap-4 transition-all duration-500 ${active ? 'bg-violet-600 text-white shadow-2xl scale-[1.05]' : 'text-white/20 hover:text-white'}`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

const EconomyCard = ({ label, value, desc }: any) => (
  <div className="premium-card p-10 bg-white/5 border-white/5 space-y-4">
     <p className="text-label text-[8px] text-white/20 uppercase tracking-widest">{label}</p>
     <p className="text-display text-4xl italic text-violet-400">{value}</p>
     <p className="text-[10px] text-white/10 font-medium italic">{desc}</p>
  </div>
);

const MatrixStat = ({ icon: Icon, label, value, color }: any) => (
  <div className="premium-card p-8 bg-white/[0.02] border-white/5 space-y-4 group hover:border-white/20 transition-all duration-700">
     <div className={`w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center ${color} group-hover:rotate-12 transition-transform`}>
        <Icon className="w-6 h-6" />
     </div>
     <div>
        <p className={`text-display text-5xl italic leading-none ${color}`}>{value}</p>
        <p className="text-label text-[8px] text-white/20 mt-2 uppercase">{label}</p>
     </div>
  </div>
);

const AdminUserRow = ({ name, email, role, ip, date }: any) => (
  <tr className="group hover:bg-white/[0.02] transition-colors">
    <td className="px-8 py-6">
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg">{name[0]}</div>
          <div>
             <p className="text-display text-lg italic text-white">{name}</p>
             <p className="text-[10px] text-white/20 font-bold">{email}</p>
          </div>
       </div>
    </td>
    <td className="px-8 py-6 text-center">
       <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${role === 'Freelancer' ? 'bg-violet-500/10 border-violet-500/30 text-violet-400' : 'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-400'}`}>
          {role}
       </span>
    </td>
    <td className="px-8 py-6 text-center text-label text-[9px] text-white/30 tracking-widest">
       {ip}
    </td>
    <td className="px-8 py-6 text-center text-label text-[9px] text-white/30 tracking-widest">
       {date}
    </td>
    <td className="px-8 py-6 text-right">
       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-violet-600 hover:text-white transition-all"><Lock className="w-3.5 h-3.5" /></button>
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-red-500 hover:text-white transition-all text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
       </div>
    </td>
  </tr>
);

const StatProgress = ({ label, value, color }: any) => (
  <div className="space-y-3">
     <div className="flex justify-between items-end">
        <p className="text-label text-[8px] tracking-widest text-white/40">{label}</p>
        <p className="text-display text-lg italic leading-none text-white">{value}%</p>
     </div>
     <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: value + '%' }} 
          transition={{ duration: 1.5 }} 
          className={`h-full ${color} rounded-full shadow-[0_0_10px_rgba(139,92,246,0.3)]`} 
        />
     </div>
  </div>
);
