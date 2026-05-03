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
  Activity,
  Briefcase,
  Edit3,
  CheckCircle2
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export const Admin = () => {
  const navigate = useNavigate();
  const { user, users, jobs } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'ads' | 'stats'>('users');
  const [userListFilter, setUserListFilter] = useState<'all' | 'freelancer' | 'client'>('all');

  const filteredUsers = users.filter(u => 
    u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(u => userListFilter === 'all' || u.role === userListFilter);

  const stats = {
    total: users.length,
    online: users.filter(u => u.online).length,
    verified: users.filter(u => u.verified).length,
    completed: jobs.filter(j => j.status === 'completed').length
  };

  const countriesBreakdown = users.reduce((acc: any, u) => {
    const country = u.country || 'Armenia';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white p-8 font-sans relative overflow-hidden">
      <BackgroundAnimation />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <header className="flex items-center justify-between">
          <div className="space-y-2">
             <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-all mb-4">
               <ArrowLeft className="w-4 h-4" /> Exit Admin Panel
             </button>
             <h1 className="text-4xl font-black italic uppercase tracking-tighter text-black">Admin <span className="text-gray-400">Hub</span></h1>
          </div>
          
          <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-4 bg-white shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white"><ShieldCheck className="w-5 h-5" /></div>
            <div>
               <p className="text-xs font-bold text-black">{user?.fullName || 'Super Admin'}</p>
               <p className="text-[9px] font-black uppercase text-indigo-600">Platform Manager</p>
            </div>
          </div>
        </header>

        <div className="flex gap-4 p-1 bg-black/5 rounded-full w-fit">
          <button onClick={() => setActiveTab('users')} className={`px-8 py-3 rounded-full text-xs font-black uppercase transition-all ${activeTab === 'users' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}>Users</button>
          <button onClick={() => setActiveTab('ads')} className={`px-8 py-3 rounded-full text-xs font-black uppercase transition-all ${activeTab === 'ads' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}>All Ads</button>
          <button onClick={() => setActiveTab('stats')} className={`px-8 py-3 rounded-full text-xs font-black uppercase transition-all ${activeTab === 'stats' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}>Stats</button>
        </div>

        {activeTab === 'users' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
               <div className="flex gap-2">
                  {['all', 'freelancer', 'client'].map(f => (
                    <button key={f} onClick={() => setUserListFilter(f as any)} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase border transition-all ${userListFilter === f ? 'bg-black text-white border-black' : 'border-black/5 text-gray-400'}`}>{f}s</button>
                  ))}
               </div>
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input className="input-capsule pl-12 w-80 shadow-sm" placeholder="Search users..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
               </div>
            </div>

            <div className="glass-panel rounded-[3rem] overflow-hidden bg-white shadow-2xl border border-black/5">
               <table className="w-full text-left">
                  <thead className="bg-black/5 text-[10px] font-black uppercase text-gray-400">
                    <tr>
                      <th className="px-8 py-6">User</th>
                      <th className="px-8 py-6">Role</th>
                      <th className="px-8 py-6">Status</th>
                      <th className="px-8 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-black/5 transition-all group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold">{u.fullName[0]}</div>
                              <div>
                                 <p className="text-sm font-black uppercase italic">{u.fullName}</p>
                                 <p className="text-[10px] text-gray-400 font-bold">{u.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6"><span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase ${u.role === 'freelancer' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>{u.role}</span></td>
                        <td className="px-8 py-6"><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${u.online ? 'bg-emerald-500' : 'bg-gray-300'}`}></div><span className="text-[10px] font-black uppercase">{u.online ? 'Online' : 'Offline'}</span></div></td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 hover:bg-black hover:text-white rounded-lg transition-all"><Edit3 className="w-4 h-4" /></button>
                              <button className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {activeTab === 'ads' && (
          <div className="space-y-6">
             <div className="grid grid-cols-1 gap-4">
                {jobs.map(job => (
                  <div key={job.id} className={`glass-panel p-8 rounded-[3rem] bg-white flex justify-between items-center shadow-xl border-l-8 ${job.status === 'completed' ? 'border-emerald-500' : 'border-black/5'}`}>
                     <div>
                        <h3 className="text-xl font-black uppercase italic">{job.title}</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Posted by: {job.clientName}</p>
                     </div>
                     <div className="flex items-center gap-8">
                        <div className="text-right">
                           <p className="text-2xl font-black italic">${job.budget}</p>
                           <span className={`text-[9px] font-black uppercase px-4 py-1 rounded-full ${job.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-black/5'}`}>{job.status}</span>
                        </div>
                        <div className="flex gap-2">
                           <button className="p-4 hover:bg-black/5 rounded-2xl transition-all"><Edit3 className="w-5 h-5" /></button>
                           <button className="p-4 hover:bg-red-50 text-red-500 rounded-2xl transition-all"><Trash2 className="w-5 h-5" /></button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <AdminStat icon={Users} label="Total Users" value={stats.total} />
             <AdminStat icon={Activity} label="Active Now" value={stats.online} />
             <AdminStat icon={CheckCircle2} label="Verified" value={stats.verified} />
             <AdminStat icon={Briefcase} label="Completed Deals" value={stats.completed} />
          </div>
        )}
      </div>
    </div>
  )
}

const AdminStat = ({ icon: Icon, label, value }: any) => (
  <div className="glass-panel p-8 rounded-[2.5rem] bg-white shadow-xl space-y-4">
    <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center"><Icon className="w-6 h-6" /></div>
    <div>
       <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{label}</p>
       <p className="text-3xl font-black italic tracking-tighter">{value}</p>
    </div>
  </div>
);

const BackgroundAnimation = () => (
  <div className="bg-mesh">
    {[...Array(15)].map((_, i) => (
      <div 
        key={i}
        className="floating-circle"
        style={{
          width: Math.random() * 200 + 50 + 'px',
          height: Math.random() * 200 + 50 + 'px',
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 20 + 's',
          animationDuration: Math.random() * 20 + 10 + 's',
          opacity: Math.random() * 0.03
        }}
      />
    ))}
  </div>
);
