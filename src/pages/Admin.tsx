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
    <div className="min-h-screen bg-[#f3f4f6] p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex items-center justify-between">
          <div className="space-y-2">
             <button 
               onClick={() => navigate('/dashboard')}
               className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-all mb-4"
             >
               <ArrowLeft className="w-4 h-4" />
               Exit Admin Panel
             </button>
             <h1 className="text-4xl font-black italic uppercase tracking-tighter text-black">
               <Link to="/" className="hover:text-indigo-600 transition-colors">Admin</Link> <span className="text-black">Workspace</span>
             </h1>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-xs font-bold">{user?.fullName || 'Super Admin'}</p>
                   <p className="text-[9px] font-black uppercase text-indigo-500">Global Moderator</p>
                </div>
             </div>
          </div>
        </header>

        <div className="flex gap-4 p-1 bg-black/5 rounded-full w-fit">
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}
          >
            User Management
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'stats' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}
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
              <div className="flex gap-2 p-1 bg-white rounded-full shadow-sm border border-black/5">
                <button onClick={() => setUserListFilter('all')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${userListFilter === 'all' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}>All</button>
                <button onClick={() => setUserListFilter('freelancer')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${userListFilter === 'freelancer' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-black'}`}>Freelancers</button>
                <button onClick={() => setUserListFilter('client')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${userListFilter === 'client' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-black'}`}>Clients</button>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search name or email..."
                  className="input-capsule pl-11 w-80 text-xs"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {/* Freelancers List */}
              {(userListFilter === 'all' || userListFilter === 'freelancer') && (
                <div className="glass-panel rounded-[3.5rem] p-10 space-y-8">
                  <h2 className="text-xl font-black uppercase italic text-black border-b border-black/5 pb-6">Freelancers ({freelancers.length})</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] border-b border-black/5">
                          <th className="text-left pb-6 pl-4">Specialist</th>
                          <th className="text-left pb-6">IP / Location</th>
                          <th className="text-center pb-6">Applications</th>
                          <th className="text-center pb-6">Closed Jobs</th>
                          <th className="text-right pb-6 pr-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                        {freelancers.map(u => (
                          <tr key={u.id} className="group hover:bg-white/40 transition-all">
                            <td className="py-6 pl-4">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">{u.fullName[0]}</div>
                                <div>
                                  <p className="text-sm font-bold text-black">{u.fullName}</p>
                                  <p className="text-[10px] text-gray-500 font-medium">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-6">
                              <p className="text-[10px] font-bold text-black">{u.ip || '127.0.0.1'}</p>
                              <p className="text-[9px] text-gray-400 uppercase font-black">{u.country || 'Armenia'}</p>
                            </td>
                            <td className="py-6 text-center text-xs font-black text-indigo-600">{u.appliedJobsCount || 0}</td>
                            <td className="py-6 text-center text-xs font-black text-emerald-600">{u.completedJobsCount || 0}</td>
                            <td className="py-6 text-right pr-4">
                              <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${u.online ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-500/10 text-gray-500'}`}>
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
                  <h2 className="text-xl font-black uppercase italic text-black border-b border-black/5 pb-6">Clients ({clients.length})</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] border-b border-black/5">
                          <th className="text-left pb-6 pl-4">Client</th>
                          <th className="text-left pb-6">IP / Location</th>
                          <th className="text-center pb-6">Posted Jobs</th>
                          <th className="text-center pb-6">Successful</th>
                          <th className="text-right pb-6 pr-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                        {clients.map(u => (
                          <tr key={u.id} className="group hover:bg-white/40 transition-all">
                            <td className="py-6 pl-4">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">{u.fullName[0]}</div>
                                <div>
                                  <p className="text-sm font-bold text-black">{u.fullName}</p>
                                  <p className="text-[10px] text-gray-500 font-medium">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-6">
                              <p className="text-[10px] font-bold text-black">{u.ip || '127.0.0.1'}</p>
                              <p className="text-[9px] text-gray-400 uppercase font-black">{u.country || 'Armenia'}</p>
                            </td>
                            <td className="py-6 text-center text-xs font-black text-emerald-600">{u.postedJobsCount || 0}</td>
                            <td className="py-6 text-center text-xs font-black text-emerald-600">{u.completedJobsCount || 0}</td>
                            <td className="py-6 text-right pr-4">
                              <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${u.online ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-500/10 text-gray-500'}`}>
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
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white">
                  <Activity className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black uppercase italic text-black">Live Stats</h2>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-5xl font-black italic tracking-tighter text-indigo-600">{stats.online}</p>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Active Users</p>
                </div>
                <div className="space-y-1">
                  <p className="text-5xl font-black italic tracking-tighter text-black">{stats.total}</p>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total Users</p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-[3.5rem] p-10 space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white">
                  <Globe className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black uppercase italic text-black">Geographical Breakdown</h2>
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
  <div className="glass-panel p-8 rounded-[2.5rem] space-y-4">
     <div className="flex justify-between items-start">
        <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-lg shadow-black/10">
           <Icon className="w-6 h-6" />
        </div>
        {trend && <span className="text-xs font-black text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-lg shadow-sm">{trend}</span>}
     </div>
     <div className="space-y-1">
        <p className="text-3xl font-black italic tracking-tighter text-black">{value}</p>
        <p className="text-[9px] font-black uppercase text-gray-500 tracking-widest">{label}</p>
     </div>
  </div>
)
