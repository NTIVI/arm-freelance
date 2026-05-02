import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Users, 
  ShieldCheck, 
  Search, 
  MoreHorizontal, 
  Trash2, 
  UserCheck,
  TrendingUp,
  Mail
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

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
             <h1 className="text-4xl font-black italic uppercase tracking-tighter">Admin <span className="text-gray-300">Workspace</span></h1>
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <AdminStat icon={Users} label="Total Users" value="1,240" trend="+12" />
           <AdminStat icon={TrendingUp} label="Daily Growth" value="25" trend="+5" />
           <AdminStat icon={ShieldCheck} label="Verified" value="890" trend="+18" />
           <AdminStat icon={Mail} label="New Inquiries" value="12" />
        </div>

        <div className="glass-panel rounded-[3.5rem] p-10 space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-black uppercase italic">User Management</h2>
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
                    <tr className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-black/5">
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
                                   <p className="text-sm font-bold">{u.name}</p>
                                   <p className="text-[10px] text-gray-400">{u.email}</p>
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
                          <td className="py-6 text-xs text-gray-400 font-medium">{u.joined}</td>
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
      </div>
    </div>
  )
}

const AdminStat = ({ icon: Icon, label, value, trend }: any) => (
  <div className="glass-panel p-8 rounded-[2.5rem] space-y-4">
     <div className="flex justify-between items-start">
        <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-lg shadow-black/10">
           <Icon className="w-6 h-6" />
        </div>
        {trend && <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">{trend}</span>}
     </div>
     <div className="space-y-1">
        <p className="text-3xl font-black italic tracking-tighter">{value}</p>
        <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{label}</p>
     </div>
  </div>
)
