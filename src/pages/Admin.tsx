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
      <header className="flex items-center justify-between mb-16">
        <div className="space-y-4">
           <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-all">
             <ArrowLeft className="w-4 h-4" /> EXIT ADMIN PANEL
           </button>
           <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">ADMIN WORKSPACE</h1>
        </div>
        
        <div className="bg-white border-2 border-black px-6 py-4 rounded-[1.5rem] flex items-center gap-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
           <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white">
             <ShieldCheck className="w-6 h-6" />
           </div>
           <div>
              <p className="text-xs font-black uppercase italic leading-none">{user?.fullName || 'Super Admin'}</p>
              <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mt-1">GLOBAL MODERATOR</p>
           </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 mb-16">
         <button 
           onClick={() => setActiveTab('users')} 
           className={`px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-black text-white shadow-xl scale-105' : 'bg-black/5 text-gray-400 hover:text-black'}`}
         >
           USER MANAGEMENT
         </button>
         <button 
           onClick={() => setActiveTab('stats')} 
           className={`px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'stats' ? 'bg-black text-white shadow-xl scale-105' : 'bg-black/5 text-gray-400 hover:text-black'}`}
         >
           PLATFORM STATISTICS
         </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
         <StatCard icon={Users} label="TOTAL USERS" value="1,240" trend="+12" />
         <StatCard icon={TrendingUp} label="DAILY GROWTH" value="25" trend="+5" />
         <StatCard icon={ShieldCheck} label="VERIFIED" value="890" trend="+18" />
         <StatCard icon={Mail} label="NEW INQUIRIES" value="12" />
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-[3.5rem] border-2 border-black p-12 shadow-[12px_12px_0_0_rgba(0,0,0,1)] min-h-[600px] relative overflow-hidden mb-20">
         {activeTab === 'users' ? (
           <div className="space-y-12">
              <div className="flex items-center justify-between">
                 <h2 className="text-3xl font-black uppercase italic tracking-tighter">USER MANAGEMENT</h2>
                 <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      className="bg-[#f8f9fa] border-2 border-black/5 rounded-full pl-14 pr-8 py-4 text-xs font-bold outline-none w-96 focus:bg-white focus:border-black transition-all" 
                      placeholder="Filter users..." 
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                 </div>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 border-b-2 border-black/5">
                          <th className="pb-8">USER</th>
                          <th className="pb-8">ROLE</th>
                          <th className="pb-8">STATUS</th>
                          <th className="pb-8">JOINED DATE</th>
                          <th className="pb-8 text-right">ACTIONS</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-black/5">
                       {filteredUsers.map(u => (
                         <tr key={u.id} className="group hover:bg-black/[0.02] transition-all">
                            <td className="py-10">
                               <div className="flex items-center gap-4">
                                  <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center font-black uppercase text-gray-400 border-2 border-transparent group-hover:border-black transition-all">{u.fullName[0]}</div>
                                  <div>
                                     <p className="text-sm font-black uppercase italic tracking-tight leading-none">{u.fullName}</p>
                                     <p className="text-[10px] font-bold text-gray-400 mt-1.5">{u.email}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="py-10">
                               <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border-2 ${u.role === 'freelancer' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                                 {u.role}
                               </span>
                            </td>
                            <td className="py-10">
                               <div className="flex items-center gap-2.5">
                                  <div className={`w-2.5 h-2.5 rounded-full ${u.verified ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.5)]'}`}></div>
                                  <span className="text-[10px] font-black uppercase tracking-widest">{u.verified ? 'VERIFIED' : 'PENDING'}</span>
                               </div>
                            </td>
                            <td className="py-10 text-[11px] font-bold text-gray-500 tracking-tight">2023-05-12</td>
                            <td className="py-10 text-right">
                               <button className="p-3.5 bg-black text-white rounded-xl transition-all opacity-0 group-hover:opacity-100 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:scale-110">
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
              <div className="bg-[#f8f9fa] rounded-[3rem] border-2 border-black/5 p-12 space-y-10">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-lg">
                          <Activity className="w-6 h-6" />
                       </div>
                       <h3 className="text-xl font-black uppercase italic tracking-tight">REAL-TIME ACTIVITY</h3>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-10">
                    <div>
                       <p className="text-5xl font-black italic tracking-tighter leading-none">142</p>
                       <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-2">USERS ONLINE NOW</p>
                    </div>
                    <div>
                       <p className="text-5xl font-black italic tracking-tighter leading-none">4,829</p>
                       <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-2">TOTAL REGISTRATIONS</p>
                    </div>
                 </div>
                 <div className="space-y-6 pt-6">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">TRAFFIC INTENSITY (24H)</p>
                    <div className="flex items-end justify-between h-40 gap-1.5 px-2">
                       {[40, 70, 45, 90, 65, 30, 85, 50, 40, 60, 75, 45].map((h, i) => (
                         <div key={i} className="flex-1 bg-black/10 rounded-t-xl transition-all hover:bg-black hover:scale-x-110" style={{ height: h + '%' }}></div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="bg-[#f8f9fa] rounded-[3rem] border-2 border-black/5 p-12 space-y-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-lg">
                       <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black uppercase italic tracking-tight">GEOGRAPHICAL BREAKDOWN</h3>
                 </div>
                 <div className="space-y-8">
                    <GeoStat label="ARMENIA" value="3,158" percentage={65} />
                    <GeoStat label="RUSSIA" value="869" percentage={18} />
                    <GeoStat label="UNITED STATES" value="483" percentage={10} />
                    <GeoStat label="FRANCE" value="193" percentage={4} />
                    <GeoStat label="OTHER" value="146" percentage={3} />
                 </div>
                 <div className="bg-blue-50 border-2 border-blue-100 p-8 rounded-[2rem] mt-6 shadow-sm">
                    <p className="text-[10px] font-black uppercase text-blue-600 mb-2 tracking-widest">TARGET INSIGHT</p>
                    <p className="text-xs font-medium leading-relaxed text-blue-900/80">
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
  <div className="bg-white border-2 border-black p-10 rounded-[2.5rem] shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex justify-between items-start relative group hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all">
     <div className="space-y-6">
        <div className="w-14 h-14 bg-black/5 rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all border-2 border-transparent group-hover:border-black">
           <Icon className="w-7 h-7" />
        </div>
        <div>
           <p className="text-4xl font-black italic tracking-tighter leading-none">{value}</p>
           <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none mt-2">{label}</p>
        </div>
     </div>
     {trend && (
       <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-[10px] font-black border-2 border-emerald-100 shadow-sm">
         {trend}
       </div>
     )}
  </div>
)

const GeoStat = ({ label, value, percentage }: any) => (
  <div className="space-y-3">
     <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
        <span>{label}</span>
        <span className="text-gray-400">{value} USERS ({percentage}%)</span>
     </div>
     <div className="h-2 bg-black/5 rounded-full overflow-hidden border border-black/5">
        <div className="h-full bg-black rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]" style={{ width: percentage + '%' }}></div>
     </div>
  </div>
)
