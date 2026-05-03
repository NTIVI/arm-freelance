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
    <div className="min-h-screen bg-[#f3f4f6] p-12 font-sans text-black selection:bg-black selection:text-white">
      
      {/* Header */}
      <header className="flex items-center justify-between mb-16 max-w-[1600px] mx-auto">
        <div className="space-y-4">
           <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-all">
             <ArrowLeft className="w-3.5 h-3.5" /> EXIT ADMIN PANEL
           </button>
           <h1 className="text-5xl font-black italic uppercase tracking-[-0.05em] leading-none">ADMIN WORKSPACE</h1>
        </div>
        
        <div className="bg-white border-[1.5px] border-black px-6 py-4 rounded-[1.2rem] flex items-center gap-4 shadow-[5px_5px_0_0_rgba(0,0,0,1)]">
           <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center text-white">
             <ShieldCheck className="w-5.5 h-5.5" />
           </div>
           <div>
              <p className="text-[11px] font-black uppercase italic leading-none">{user?.fullName || 'Super Admin'}</p>
              <p className="text-[8px] font-black uppercase text-black/40 tracking-wider mt-1.5">GLOBAL MODERATOR</p>
           </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-3 mb-16 max-w-[1600px] mx-auto">
         <button 
           onClick={() => setActiveTab('users')} 
           className={`px-9 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-black text-white' : 'bg-black/5 text-black/40 hover:text-black'}`}
         >
           USER MANAGEMENT
         </button>
         <button 
           onClick={() => setActiveTab('stats')} 
           className={`px-9 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'stats' ? 'bg-black text-white' : 'bg-black/5 text-black/40 hover:text-black'}`}
         >
           PLATFORM STATISTICS
         </button>
      </div>

      <div className="max-w-[1600px] mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
           <StatCard icon={Users} label="TOTAL USERS" value="1,240" trend="+12" />
           <StatCard icon={TrendingUp} label="DAILY GROWTH" value="25" trend="+5" />
           <StatCard icon={ShieldCheck} label="VERIFIED" value="890" trend="+18" />
           <StatCard icon={Mail} label="NEW INQUIRIES" value="12" />
        </div>

        {/* Tab Content Container */}
        <div className="bg-white rounded-[3rem] border-[1.5px] border-black p-12 shadow-[10px_10px_0_0_rgba(0,0,0,1)] relative overflow-hidden">
           {activeTab === 'users' ? (
             <div className="space-y-12">
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-black uppercase italic tracking-tighter">USER MANAGEMENT</h2>
                   <div className="relative">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                      <input 
                        className="bg-white border-[1.5px] border-black/10 rounded-full pl-13 pr-8 py-3.5 text-[11px] font-bold outline-none w-[320px] focus:border-black transition-all" 
                        placeholder="Filter users..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                   </div>
                </div>

                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="text-[9px] font-black uppercase tracking-[0.25em] text-black/20 border-b border-black/5">
                            <th className="pb-7 pl-4">USER</th>
                            <th className="pb-7">ROLE</th>
                            <th className="pb-7">STATUS</th>
                            <th className="pb-7">JOINED DATE</th>
                            <th className="pb-7 text-right pr-4">ACTIONS</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                         {filteredUsers.map(u => (
                           <tr key={u.id} className="group hover:bg-black/[0.01] transition-all">
                              <td className="py-8 pl-4">
                                 <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-full bg-black/5 flex items-center justify-center font-black uppercase text-black/20 text-xs">{u.fullName[0]}</div>
                                    <div>
                                       <p className="text-[13px] font-black uppercase italic leading-none tracking-tight">{u.fullName}</p>
                                       <p className="text-[10px] font-bold text-black/30 mt-1">{u.email}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="py-8">
                                 <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${u.role === 'freelancer' ? 'bg-indigo-50 text-indigo-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                   {u.role}
                                 </span>
                              </td>
                              <td className="py-8">
                                 <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${u.verified ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                                    <span className="text-[9px] font-black uppercase tracking-widest">{u.verified ? 'VERIFIED' : 'PENDING'}</span>
                                 </div>
                              </td>
                              <td className="py-8 text-[11px] font-bold text-black/40 tracking-tight">2023-05-12</td>
                              <td className="py-8 text-right pr-4">
                                 <button className="p-2.5 text-black/20 hover:text-black transition-all">
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
                <div className="bg-white rounded-[2.5rem] border-[1.5px] border-black p-10 space-y-10">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
                         <Activity className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-black uppercase italic tracking-tight">REAL-TIME ACTIVITY</h3>
                   </div>
                   
                   <div className="flex items-center gap-16">
                      <div>
                         <p className="text-5xl font-black italic tracking-tighter leading-none">142</p>
                         <p className="text-[9px] font-black uppercase text-black/40 tracking-widest mt-2.5">USERS ONLINE NOW</p>
                      </div>
                      <div>
                         <p className="text-5xl font-black italic tracking-tighter leading-none">4,829</p>
                         <p className="text-[9px] font-black uppercase text-black/40 tracking-widest mt-2.5">TOTAL REGISTRATIONS</p>
                      </div>
                   </div>

                   <div className="space-y-5 pt-4">
                      <p className="text-[9px] font-black uppercase text-black/40 tracking-widest">TRAFFIC INTENSITY (24H)</p>
                      <div className="flex items-end justify-between h-36 gap-1 px-1">
                         {[35, 60, 40, 85, 70, 30, 90, 55, 45, 65, 80, 50].map((h, i) => (
                           <div key={i} className="flex-1 bg-black/5 rounded-t-lg transition-all hover:bg-black" style={{ height: h + '%' }}></div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border-[1.5px] border-black p-10 space-y-10">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
                         <Globe className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-black uppercase italic tracking-tight">GEOGRAPHICAL BREAKDOWN</h3>
                   </div>
                   <div className="space-y-7">
                      <GeoStat label="ARMENIA" value="3,158" percentage={65} />
                      <GeoStat label="RUSSIA" value="869" percentage={18} />
                      <GeoStat label="UNITED STATES" value="483" percentage={10} />
                      <GeoStat label="FRANCE" value="193" percentage={4} />
                      <GeoStat label="OTHER" value="146" percentage={3} />
                   </div>
                   <div className="bg-indigo-50/50 border border-indigo-100 p-6 rounded-2xl">
                      <p className="text-[9px] font-black uppercase text-indigo-500 mb-1.5 tracking-wider">TARGET INSIGHT</p>
                      <p className="text-[11px] font-medium leading-relaxed text-indigo-900/60">
                         Your core audience is 65% Armenian-based. Diaspora engagement in Russia and US is growing by 12% monthly.
                      </p>
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon: Icon, label, value, trend }: any) => (
  <div className="bg-white border-[1.5px] border-black p-10 rounded-[2.5rem] shadow-[7px_7px_0_0_rgba(0,0,0,1)] flex justify-between items-start relative group hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[5px_5px_0_0_rgba(0,0,0,1)] transition-all">
     <div className="space-y-6">
        <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
           <Icon className="w-5.5 h-5.5" />
        </div>
        <div>
           <p className="text-4xl font-black italic tracking-tighter leading-none">{value}</p>
           <p className="text-[9px] font-black uppercase text-black/40 tracking-widest leading-none mt-2.5">{label}</p>
        </div>
     </div>
     {trend && (
       <div className="bg-emerald-50 text-emerald-500 px-3 py-1.5 rounded-full text-[9px] font-black border border-emerald-100/50">
         {trend}
       </div>
     )}
  </div>
)

const GeoStat = ({ label, value, percentage }: any) => (
  <div className="space-y-2.5">
     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
        <span>{label}</span>
        <span className="text-black/30">{value} USERS ({percentage}%)</span>
     </div>
     <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
        <div className="h-full bg-black rounded-full" style={{ width: percentage + '%' }}></div>
     </div>
  </div>
)
