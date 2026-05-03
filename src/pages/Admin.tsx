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
    <div className="min-h-screen bg-[#f3f4f6] p-8 font-sans relative">

      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex items-center justify-between">
          <div className="space-y-2">
             <button 
               onClick={() => navigate('/dashboard')}
               className="flex items-center gap-2 text-[10px] font-black uppercase text-neutral-400 hover:text-black transition-all mb-4"
             >
               <ArrowLeft className="w-4 h-4" />
               Exit Admin Panel
             </button>
             <h1 className="text-4xl font-black italic uppercase tracking-tighter text-black">
               <Link to="/" className="hover:text-indigo-600 transition-colors">Admin</Link> <span className="text-gray-400">Workspace</span>
             </h1>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-4 border border-black/5 bg-white shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-xs font-bold text-black">{user?.fullName || 'Super Admin'}</p>
                   <p className="text-[9px] font-black uppercase text-indigo-600">Global Moderator</p>
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
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                 {['all', 'freelancer', 'client'].map((f) => (
                   <button 
                    key={f}
                    onClick={() => setUserListFilter(f as any)}
                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${userListFilter === f ? 'bg-black text-white border-black' : 'border-black/5 text-gray-400 hover:border-black/20'}`}
                   >
                     {f}s
                   </button>
                 ))}
              </div>
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input 
                  type="text" 
                  placeholder="Search by name or email..." 
                  className="input-capsule pl-12 w-80 bg-white border-black/5 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
            </div>

            <div className="glass-panel rounded-[3rem] overflow-hidden border border-black/5 bg-white shadow-xl">
               <table className="w-full text-left">
                  <thead className="bg-black/5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <tr>
                      <th className="px-8 py-6">User / Role</th>
                      <th className="px-8 py-6">Location / IP</th>
                      <th className="px-8 py-6">Status</th>
                      <th className="px-8 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-black/5 transition-colors group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white font-bold">{u.fullName[0]}</div>
                              <div>
                                 <p className="text-sm font-black uppercase italic">{u.fullName}</p>
                                 <p className="text-xs text-gray-400">{u.email}</p>
                                 <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${u.role === 'freelancer' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>{u.role}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="space-y-1">
                              <p className="text-xs font-bold text-black">{u.country || 'Unknown'}</p>
                              <p className="text-[10px] text-gray-400">{u.ip || '0.0.0.0'}</p>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${u.online ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></div>
                              <span className="text-[10px] font-black uppercase tracking-widest">{u.online ? 'Online' : 'Offline'}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 hover:bg-black hover:text-white rounded-lg transition-all"><UserCheck className="w-4 h-4" /></button>
                              <button className="p-2 hover:bg-black hover:text-white rounded-lg transition-all"><Mail className="w-4 h-4" /></button>
                              <button className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="glass-panel p-10 rounded-[3rem] bg-white border border-black/5 shadow-xl space-y-8">
                <h3 className="text-xl font-black uppercase italic tracking-tighter">Geographical Distribution</h3>
                <div className="space-y-6">
                   {Object.entries(countriesBreakdown).map(([country, count]: any) => (
                     <div key={country} className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-black uppercase">
                           <span>{country}</span>
                           <span className="text-indigo-600">{count} Users</span>
                        </div>
                        <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                           <div className="h-full bg-black rounded-full" style={{ width: `${(count / stats.total) * 100}%` }}></div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="glass-panel p-10 rounded-[3rem] bg-white border border-black/5 shadow-xl space-y-8">
                <h3 className="text-xl font-black uppercase italic tracking-tighter">Activity Overview</h3>
                <div className="grid grid-cols-2 gap-6">
                   <div className="p-6 bg-black/5 rounded-[2rem] space-y-2">
                      <p className="text-4xl font-black italic tracking-tighter">{jobs.length}</p>
                      <p className="text-[10px] font-black uppercase text-gray-400">Active Jobs</p>
                   </div>
                   <div className="p-6 bg-black/5 rounded-[2rem] space-y-2">
                      <p className="text-4xl font-black italic tracking-tighter">98%</p>
                      <p className="text-[10px] font-black uppercase text-gray-400">Match Success</p>
                   </div>
                </div>
                <div className="p-8 border border-black/5 rounded-[2rem] bg-indigo-50 border-indigo-100">
                   <div className="flex items-center gap-4 text-indigo-600">
                      <TrendingUp className="w-8 h-8" />
                      <div>
                         <p className="text-sm font-black uppercase italic">Growth Rate +24%</p>
                         <p className="text-[10px] font-bold opacity-70">Weekly average increase in user registrations</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  )
}

const AdminStat = ({ icon: Icon, label, value, trend }: any) => (
  <div className="glass-panel p-8 rounded-[2.5rem] bg-white border border-black/5 shadow-xl space-y-4">
    <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-black">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
         <p className="text-3xl font-black italic tracking-tighter text-black">{value}</p>
         {trend && <span className="text-[10px] font-black uppercase text-emerald-500">{trend}</span>}
      </div>
    </div>
  </div>
)
