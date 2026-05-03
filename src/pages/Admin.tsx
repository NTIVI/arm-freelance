import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Users, 
  ShieldCheck, 
  Search, 
  MoreHorizontal, 
  Trash2, 
  UserCheck,
  TrendingUp,
  Mail,
  Globe,
  Activity
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export const Admin = () => {
  const navigate = useNavigate();
  const { user, users, jobs } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'stats'>('users');
  const [userListFilter, setUserListFilter] = useState<'all' | 'freelancer' | 'client'>('all');

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = userListFilter === 'all' || u.role === userListFilter;
    return matchesSearch && matchesRole;
  });

  const freelancers = filteredUsers.filter(u => u.role === 'freelancer');
  const clients = filteredUsers.filter(u => u.role === 'client');

  const stats = {
    total: users.length,
    online: users.filter(u => u.online).length,
    verified: users.filter(u => u.verified).length,
  };

  const countriesBreakdown = users.reduce((acc: any, u) => {
    const country = u.country || 'Unknown';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen text-white p-8 font-sans relative bg-neutral-950">
      <div className="bg-mesh"></div>
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex items-center justify-between">
          <div className="space-y-2">
             <button 
               onClick={() => navigate('/dashboard')}
               className="flex items-center gap-2 text-[10px] font-black uppercase text-neutral-400 hover:text-white transition-all mb-4"
             >
               <ArrowLeft className="w-4 h-4" />
               Exit Admin Panel
             </button>
             <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
               <Link to="/" className="hover:text-indigo-400 transition-colors">Admin</Link> <span className="text-neutral-500">Workspace</span>
             </h1>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-4 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-xs font-bold text-white">{user?.fullName || 'Super Admin'}</p>
                   <p className="text-[9px] font-black uppercase text-indigo-400">Global Moderator</p>
                </div>
             </div>
          </div>
        </header>

        <div className="flex gap-4 p-1 bg-white/5 rounded-full w-fit">
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-white text-black shadow-lg' : 'text-neutral-400 hover:text-white'}`}
          >
            User Management
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'stats' ? 'bg-white text-black shadow-lg' : 'text-neutral-400 hover:text-white'}`}
          >
            Platform Statistics
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <AdminStat icon={Users} label="Total Registered" value={stats.total} />
           <AdminStat icon={Activity} label="Users Online" value={stats.online} trend="Active Now" />
           <AdminStat icon={ShieldCheck} label="Verified Users" value={stats.verified} />
           <AdminStat icon={Globe} label="Top Region" value={Object.keys(countriesBreakdown)[0] || 'N/A'} />
        </div>

        {activeTab === 'users' ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2 p-1 bg-white/5 rounded-full shadow-sm border border-white/10">
                <button onClick={() => setUserListFilter('all')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${userListFilter === 'all' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}>All</button>
                <button onClick={() => setUserListFilter('freelancer')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${userListFilter === 'freelancer' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'}`}>Freelancers</button>
                <button onClick={() => setUserListFilter('client')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${userListFilter === 'client' ? 'bg-emerald-600 text-white' : 'text-neutral-400 hover:text-white'}`}>Clients</button>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input 
                  type="text" 
                  placeholder="Search name or email..."
                  className="input-capsule pl-11 w-80 text-xs bg-white/5 border-white/10 text-white placeholder:text-neutral-600"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {/* Freelancers List */}
              {(userListFilter === 'all' || userListFilter === 'freelancer') && (
                <div className="glass-panel rounded-[3.5rem] p-10 space-y-8">
                  <h2 className="text-xl font-black uppercase italic text-white border-b border-white/10 pb-6">Freelancers ({freelancers.length})</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.2em] border-b border-white/10">
                          <th className="text-left pb-6 pl-4">Specialist</th>
                          <th className="text-left pb-6">IP / Location</th>
                          <th className="text-center pb-6">Applications</th>
                          <th className="text-center pb-6">Closed Jobs</th>
                          <th className="text-right pb-6 pr-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {freelancers.map(u => (
                          <tr key={u.id} className="group hover:bg-white/5 transition-all">
                            <td className="py-6 pl-4">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">{u.fullName[0]}</div>
                                <div>
                                  <p className="text-sm font-bold text-white">{u.fullName}</p>
                                  <p className="text-[10px] text-neutral-500 font-medium">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-6">
                              <p className="text-[10px] font-bold text-white">{u.ip || '127.0.0.1'}</p>
                              <p className="text-[9px] text-neutral-600 uppercase font-black">{u.country || 'Armenia'}</p>
                            </td>
                            <td className="py-6 text-center text-xs font-black text-indigo-400">{u.appliedJobsCount || 0}</td>
                            <td className="py-6 text-center text-xs font-black text-emerald-400">{u.completedJobsCount || 0}</td>
                            <td className="py-6 text-right pr-4">
                              <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${u.online ? 'bg-emerald-500/10 text-emerald-500' : 'bg-neutral-500/10 text-neutral-500'}`}>
                                {u.online ? 'Online' : 'Offline'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Clients List */}
              {(userListFilter === 'all' || userListFilter === 'client') && (
                <div className="glass-panel rounded-[3.5rem] p-10 space-y-8">
                  <h2 className="text-xl font-black uppercase italic text-white border-b border-white/10 pb-6">Clients ({clients.length})</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.2em] border-b border-white/10">
                          <th className="text-left pb-6 pl-4">Client</th>
                          <th className="text-left pb-6">IP / Location</th>
                          <th className="text-center pb-6">Posted Jobs</th>
                          <th className="text-center pb-6">Successful</th>
                          <th className="text-right pb-6 pr-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {clients.map(u => (
                          <tr key={u.id} className="group hover:bg-white/5 transition-all">
                            <td className="py-6 pl-4">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">{u.fullName[0]}</div>
                                <div>
                                  <p className="text-sm font-bold text-white">{u.fullName}</p>
                                  <p className="text-[10px] text-neutral-500 font-medium">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-6">
                              <p className="text-[10px] font-bold text-white">{u.ip || '127.0.0.1'}</p>
                              <p className="text-[9px] text-neutral-600 uppercase font-black">{u.country || 'Armenia'}</p>
                            </td>
                            <td className="py-6 text-center text-xs font-black text-emerald-400">{u.postedJobsCount || 0}</td>
                            <td className="py-6 text-center text-xs font-black text-emerald-400">{u.completedJobsCount || 0}</td>
                            <td className="py-6 text-right pr-4">
                              <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${u.online ? 'bg-emerald-500/10 text-emerald-500' : 'bg-neutral-500/10 text-neutral-500'}`}>
                                {u.online ? 'Online' : 'Offline'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="glass-panel rounded-[3.5rem] p-10 space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                  <Activity className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black uppercase italic text-white">Live Stats</h2>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-5xl font-black italic tracking-tighter text-indigo-400">{stats.online}</p>
                  <p className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">Active Users</p>
                </div>
                <div className="space-y-1">
                  <p className="text-5xl font-black italic tracking-tighter text-white">{stats.total}</p>
                  <p className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">Total Users</p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-[3.5rem] p-10 space-y-10">
              <Link to="/" className="flex flex-col items-center mb-16 space-y-4 group">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)] group-hover:bg-indigo-500 transition-all">
                  <div className="w-7 h-7 border-2 border-white rounded rotate-45"></div>
                </div>
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                  <Globe className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black uppercase italic text-white">Geographical Breakdown</h2>
              </div>
              <div className="space-y-6">
                {Object.entries(countriesBreakdown).map(([name, count]: any) => (
                  <CountryRow key={name} name={name} percent={Math.round((count / stats.total) * 100)} count={count} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const CountryRow = ({ name, percent, count }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-[11px] font-bold">
      <span className="text-black uppercase">{name}</span>
      <span className="text-gray-400">{count} users ({percent}%)</span>
    </div>
    <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
      <div className="h-full bg-black rounded-full" style={{ width: `${percent}%` }}></div>
    </div>
  </div>
)

const AdminStat = ({ icon: Icon, label, value, trend }: any) => (
  <div className="glass-panel p-8 rounded-[2.5rem] space-y-4 border border-white/10 shadow-2xl">
     <div className="flex justify-between items-start">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]">
           <Icon className="w-6 h-6" />
        </div>
        {trend && <span className="text-[9px] font-black text-indigo-400 bg-indigo-400/10 px-3 py-1.5 rounded-lg border border-indigo-400/20">{trend}</span>}
     </div>
     <div className="space-y-1">
        <p className="text-3xl font-black italic tracking-tighter text-white">{value}</p>
        <p className="text-[9px] font-black uppercase text-gray-500 tracking-widest">{label}</p>
     </div>
  </div>
)
