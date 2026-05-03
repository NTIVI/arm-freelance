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
  CheckCircle2,
  ChevronRight,
  Plus,
  ArrowUpRight,
  Filter
} from 'lucide-react'
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
    <div className="min-h-screen bg-[#f3f4f6] p-10 font-sans text-black overflow-x-hidden">
      
      {/* Header */}
      <header className="flex items-center justify-between mb-12">
        <div className="space-y-4">
           <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-all">
             <ArrowLeft className="w-4 h-4" /> EXIT ADMIN PANEL
           </button>
           <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">ADMIN WORKSPACE</h1>
        </div>
        
        <div className="bg-white border border-black/10 px-6 py-4 rounded-[1.5rem] flex items-center gap-4 shadow-sm">
           <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white shadow-lg">
             <ShieldCheck className="w-6 h-6" />
           </div>
           <div>
              <p className="text-xs font-black uppercase italic leading-none">{user?.fullName || 'Super Admin'}</p>
              <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mt-1">GLOBAL MODERATOR</p>
           </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 mb-12">
         <button 
           onClick={() => setActiveTab('users')} 
           className={`px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-black text-white shadow-xl' : 'bg-black/5 text-gray-400 hover:text-black'}`}
         >
           USER MANAGEMENT
         </button>
         <button 
           onClick={() => setActiveTab('stats')} 
           className={`px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'stats' ? 'bg-black text-white shadow-xl' : 'bg-black/5 text-gray-400 hover:text-black'}`}
         >
           PLATFORM STATISTICS
         </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
         <StatCard icon={Users} label="TOTAL USERS" value="1,240" trend="+12" />
         <StatCard icon={TrendingUp} label="DAILY GROWTH" value="25" trend="+5" />
         <StatCard icon={ShieldCheck} label="VERIFIED" value="890" trend="+18" />
         <StatCard icon={Mail} label="NEW INQUIRIES" value="12" />
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-[3.5rem] border border-black/10 p-12 shadow-sm min-h-[600px] relative overflow-hidden">
         {activeTab === 'users' ? (
           <div className="space-y-10">
              <div className="flex items-center justify-between">
                 <h2 className="text-2xl font-black uppercase italic tracking-tighter">USER MANAGEMENT</h2>
                 <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      className="bg-[#f8f9fa] border border-transparent rounded-full pl-14 pr-8 py-4 text-xs font-bold outline-none w-96 shadow-inner focus:bg-white focus:border-black/5 transition-all" 
                      placeholder="Filter users..." 
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                 </div>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 border-b border-black/5">
                          <th className="pb-6">USER</th>
                          <th className="pb-6">ROLE</th>
                          <th className="pb-6">STATUS</th>
                          <th className="pb-6">JOINED DATE</th>
                          <th className="pb-6 text-right">ACTIONS</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                       {filteredUsers.map(u => (
                         <tr key={u.id} className="group hover:bg-black/[0.02] transition-all">
                            <td className="py-8">
                               <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center font-black uppercase text-gray-400">{u.fullName[0]}</div>
                                  <div>
                                     <p className="text-sm font-black uppercase italic tracking-tight leading-none">{u.fullName}</p>
                                     <p className="text-[10px] font-bold text-gray-400 mt-1">{u.email}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="py-8">
                               <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${u.role === 'freelancer' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                 {u.role}
                               </span>
                            </td>
                            <td className="py-8">
                               <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${u.verified ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]'}`}></div>
                                  <span className="text-[10px] font-black uppercase tracking-widest">{u.verified ? 'VERIFIED' : 'PENDING'}</span>
                               </div>
                            </td>
                            <td className="py-8 text-[11px] font-bold text-gray-500">2023-05-12</td>
                            <td className="py-8 text-right">
                               <button className="p-3 hover:bg-black hover:text-white rounded-xl transition-all opacity-0 group-hover:opacity-100 shadow-lg">
                                  <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
         ) : (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-[#f8f9fa] rounded-[2.5rem] p-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Activity className="w-6 h-6" />
                       <h3 className="font-black uppercase italic tracking-tight">REAL-TIME ACTIVITY</h3>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                       <p className="text-4xl font-black italic tracking-tighter">142</p>
                       <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">USERS ONLINE NOW</p>
                    </div>
                    <div>
                       <p className="text-4xl font-black italic tracking-tighter">4,829</p>
                       <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">TOTAL REGISTRATIONS</p>
                    </div>
                 </div>
                 <div className="space-y-4 pt-4">
                    <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">TRAFFIC INTENSITY (24H)</p>
                    <div className="flex items-end justify-between h-32 gap-1">
                       {[40, 70, 45, 90, 65, 30, 85, 50, 40, 60, 75, 45].map((h, i) => (
                         <div key={i} className="flex-1 bg-black/5 rounded-t-lg transition-all hover:bg-black" style={{ height: h + '%' }}></div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="bg-[#f8f9fa] rounded-[2.5rem] p-10 space-y-8">
                 <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6" />
                    <h3 className="font-black uppercase italic tracking-tight">GEOGRAPHICAL BREAKDOWN</h3>
                 </div>
                 <div className="space-y-6">
                    <GeoStat label="ARMENIA" value="3,158" percentage={65} />
                    <GeoStat label="RUSSIA" value="869" percentage={18} />
                    <GeoStat label="UNITED STATES" value="483" percentage={10} />
                    <GeoStat label="FRANCE" value="193" percentage={4} />
                    <GeoStat label="OTHER" value="146" percentage={3} />
                 </div>
                 <div className="bg-blue-50 p-6 rounded-[1.5rem] mt-6">
                    <p className="text-[10px] font-black uppercase text-blue-600 mb-1">TARGET INSIGHT</p>
                    <p className="text-[11px] font-medium leading-relaxed">
                       Your core audience is 65% Armenian-based. Diaspora engagement in Russia and US is growing by 12% monthly.
                    </p>
                 </div>
              </div>
           </div>
         )}
      </div>
    </div>
  )
}

const StatCard = ({ icon: Icon, label, value, trend }: any) => (
  <div className="bg-white border border-black/10 p-10 rounded-[2.5rem] shadow-sm flex justify-between items-start relative group hover:shadow-xl transition-all">
     <div className="space-y-4">
        <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
           <Icon className="w-6 h-6" />
        </div>
        <div>
           <p className="text-3xl font-black italic tracking-tighter">{value}</p>
           <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-none mt-1">{label}</p>
        </div>
     </div>
     {trend && (
       <div className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-[10px] font-black shadow-sm">
         {trend}
       </div>
     )}
  </div>
)

const GeoStat = ({ label, value, percentage }: any) => (
  <div className="space-y-2">
     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
        <span>{label}</span>
        <span className="text-gray-400">{value} USERS ({percentage}%)</span>
     </div>
     <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
        <div className="h-full bg-black rounded-full" style={{ width: percentage + '%' }}></div>
     </div>
  </div>
)
