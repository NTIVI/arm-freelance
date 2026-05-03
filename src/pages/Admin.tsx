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
  const { user } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'stats'>('users');

  // Mock Users Data for Admin
  const [users] = useState([
    { id: '1', name: 'Armen Sargsyan', email: 'armen@example.am', role: 'freelancer', status: 'verified', joined: '2023-05-12' },
    { id: '2', name: 'Ani Martirosyan', email: 'ani@example.am', role: 'client', status: 'pending', joined: '2023-05-15' },
    { id: '3', name: 'Karen Hovhannisyan', email: 'karen@example.am', role: 'freelancer', status: 'verified', joined: '2023-05-18' },
    { id: '4', name: 'Lilit Karapetyan', email: 'lilit@example.am', role: 'client', status: 'verified', joined: '2023-05-20' },
  ]);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
           <AdminStat icon={Users} label="Total Users" value="1,240" trend="+12" />
           <AdminStat icon={TrendingUp} label="Daily Growth" value="25" trend="+5" />
           <AdminStat icon={ShieldCheck} label="Verified" value="890" trend="+18" />
           <AdminStat icon={Mail} label="New Inquiries" value="12" />
        </div>

        {activeTab === 'users' ? (
          <div className="glass-panel rounded-[3.5rem] p-10 space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-black uppercase italic text-black">User Management</h2>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Filter users..."
                    className="input-capsule pl-11 w-64 text-xs"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                      <tr className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] border-b border-black/5">
                        <th className="text-left pb-6 pl-4">User</th>
                        <th className="text-left pb-6">Role</th>
                        <th className="text-left pb-6">Status</th>
                        <th className="text-left pb-6">Joined Date</th>
                        <th className="text-right pb-6 pr-4">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                      {filteredUsers.map(u => (
                        <tr key={u.id} className="group hover:bg-white/40 transition-all">
                            <td className="py-6 pl-4">
                              <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center font-bold text-xs">
                                    {u.name[0]}
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-black">{u.name}</p>
                                    <p className="text-[10px] text-gray-500 font-medium">{u.email}</p>
                                  </div>
                              </div>
                            </td>
                            <td className="py-6">
                              <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${u.role === 'freelancer' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                  {u.role}
                              </span>
                            </td>
                            <td className="py-6">
                              <div className="flex items-center gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'verified' ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                                  <span className="text-[10px] font-bold uppercase">{u.status}</span>
                              </div>
                            </td>
                            <td className="py-6 text-xs text-gray-600 font-bold">{u.joined}</td>
                            <td className="py-6 pr-4">
                              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                  <button className="p-2 hover:bg-black/5 rounded-xl text-gray-400 hover:text-black transition-colors">
                                    <UserCheck className="w-4 h-4" />
                                  </button>
                                  <button className="p-2 hover:bg-red-500/10 rounded-xl text-gray-400 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                  <button className="p-2 hover:bg-black/5 rounded-xl text-gray-400 hover:text-black transition-colors">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </button>
                              </div>
                            </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="glass-panel rounded-[3.5rem] p-10 space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white">
                  <Activity className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black uppercase italic text-black">Real-time Activity</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-5xl font-black italic tracking-tighter text-indigo-600">142</p>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Users Online Now</p>
                </div>
                <div className="space-y-1">
                  <p className="text-5xl font-black italic tracking-tighter text-black">4,829</p>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total Registrations</p>
                </div>
              </div>

              <div className="pt-8 border-t border-black/5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Traffic Intensity (24h)</p>
                <div className="h-40 flex items-end gap-2">
                  {[30, 45, 60, 25, 90, 75, 40, 55, 80, 65, 35, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-black/5 rounded-t-lg hover:bg-black transition-all" style={{ height: `${h}%` }}></div>
                  ))}
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
                <CountryRow name="Armenia" percent={65} count="3,138" />
                <CountryRow name="Russia" percent={18} count="869" />
                <CountryRow name="United States" percent={10} count="483" />
                <CountryRow name="France" percent={4} count="193" />
                <CountryRow name="Other" percent={3} count="146" />
              </div>

              <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 mt-8">
                <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-1">Target Insight</p>
                <p className="text-xs font-medium text-indigo-900">Your core audience is 65% Armenian-based. Diaspora engagement in Russia and US is growing by 12% monthly.</p>
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
