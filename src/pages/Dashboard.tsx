import { useState } from 'react'
import { 
  Search, 
  LayoutGrid, 
  Calendar, 
  Users, 
  Settings, 
  Bell, 
  Video, 
  Sun, 
  MoreHorizontal,
  ChevronRight,
  LogOut,
  Plus,
  Briefcase
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export const Dashboard = () => {
  const { user, logout } = useAppContext();
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="glass-panel rounded-[2.5rem] p-8 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-16 self-start px-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
          </div>
          <span className="font-bold text-lg tracking-tight">Armenia Freelance</span>
        </div>

        <nav className="flex-1 w-full space-y-2">
          <SidebarItem active={activeTab === 'home'} icon={LayoutGrid} onClick={() => setActiveTab('home')} />
          <SidebarItem active={activeTab === 'schedule'} icon={Calendar} onClick={() => setActiveTab('schedule')} />
          <SidebarItem active={activeTab === 'projects'} icon={Users} onClick={() => setActiveTab('projects')} />
          <SidebarItem active={activeTab === 'settings'} icon={Settings} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="mt-auto pt-8 border-t border-black/5 w-full flex flex-col items-center gap-6">
          <div className="relative group cursor-pointer">
            <div className="w-14 h-14 rounded-3xl bg-black/5 p-1 transition-all group-hover:scale-105">
              <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-xl">
                {user?.fullName?.[0]}
              </div>
            </div>
          </div>
          <button onClick={logout} className="p-3 text-gray-400 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Header Bar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <h1 className="text-4xl font-bold tracking-tight">Management</h1>
             <div className="flex items-center gap-2 px-4 py-1.5 bg-white/40 border border-white/60 rounded-full text-[10px] font-bold text-gray-500">
               <Calendar className="w-3 h-3" />
               JUNE 1, 2023
             </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/40 border border-white/60 p-1.5 rounded-full">
              <HeaderAction icon={Video} />
              <HeaderAction icon={Bell} dot />
              <div className="h-6 w-px bg-black/10 mx-1"></div>
              <div className="flex items-center gap-3 px-3">
                <Sun className="w-4 h-4 text-orange-400" />
                <span className="text-[11px] font-bold">23° Sunny</span>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Type searching..." className="input-capsule pl-11 w-64 shadow-sm" />
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Center Content */}
          <div className="space-y-6 overflow-hidden">
            <div className="glass-panel rounded-[2.5rem] p-10 h-[480px] relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Timeline</span>
                  <div className="flex gap-2 bg-black/5 p-1 rounded-full">
                    <button className="px-4 py-1 rounded-full bg-white text-[10px] font-bold shadow-sm">Day</button>
                    <button className="px-4 py-1 rounded-full text-[10px] font-bold text-gray-400">Week</button>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>

              {/* Timeline Mockup */}
              <div className="space-y-8">
                 <TimelineRow label="Design" progress="25%" time="2 hours" color="bg-black" />
                 <TimelineRow label="Mobile Apps" progress="45%" time="5 hours" color="bg-indigo-500" />
                 <TimelineRow label="Infography" progress="15%" time="1 hour" color="bg-pink-500" />
                 <TimelineRow label="Team Management" progress="70%" time="3 hours" color="bg-emerald-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel rounded-[2.5rem] p-8 space-y-6">
                 <h3 className="font-bold text-lg">My Team</h3>
                 <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="avatar" />
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-4 border-white bg-black text-white flex items-center justify-center text-xs font-bold">
                      +5
                    </div>
                 </div>
                 <button className="w-full py-4 bg-black/5 hover:bg-black/10 rounded-3xl text-xs font-bold flex items-center justify-center gap-2 transition-all">
                    View All Members <ChevronRight className="w-4 h-4" />
                 </button>
              </div>

              <div className="glass-panel rounded-[2.5rem] p-8 flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">Quick Post</h3>
                    <Plus className="w-5 h-5" />
                 </div>
                 <p className="text-xs text-gray-400">Need to hire someone quickly? Start a new project draft here.</p>
                 <button className="btn-capsule w-full justify-center">Start Drafting</button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
             <div className="glass-panel rounded-[2.5rem] p-8 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">Ongoing Projects</h3>
                  <LayoutGrid className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-center space-y-1">
                   <p className="text-4xl font-black">68,5%</p>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sales trend vs last month</p>
                </div>
                {/* Mini Chart Mockup */}
                <div className="h-20 flex items-end gap-1 px-4">
                   {[40,70,45,90,65,80,50].map((h, i) => (
                     <div key={i} className="flex-1 bg-black/5 rounded-t-lg transition-all hover:bg-black" style={{ height: `${h}%` }}></div>
                   ))}
                </div>
                <div className="space-y-4">
                   <ProjectStat label="Finance" value="48,800" />
                   <ProjectStat label="Design Reviews" value="15,200" />
                   <ProjectStat label="Other" value="09,400" />
                </div>
             </div>

             <div className="glass-panel rounded-[2.5rem] p-6 bg-black text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-all"></div>
                <div className="relative z-10 space-y-6">
                   <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                     <Briefcase className="w-6 h-6 text-white" />
                   </div>
                   <div>
                     <h4 className="text-lg font-bold italic">Armenia Elite</h4>
                     <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest mt-1">Premium Membership</p>
                   </div>
                   <button className="w-full py-4 bg-white text-black rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                     Upgrade Now
                   </button>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const SidebarItem = ({ active, icon: Icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-center p-4 rounded-3xl transition-all ${active ? 'bg-black text-white shadow-xl shadow-black/10 scale-105' : 'text-gray-400 hover:text-black hover:bg-black/5'}`}
  >
    <Icon className="w-6 h-6" />
  </button>
)

const HeaderAction = ({ icon: Icon, dot }: any) => (
  <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-black/5 relative transition-all">
    <Icon className="w-5 h-5" />
    {dot && <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>}
  </button>
)

const TimelineRow = ({ label, progress, time, color }: any) => (
  <div className="space-y-2">
     <div className="flex justify-between items-end">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
        <span className="text-[10px] font-black uppercase">{time}</span>
     </div>
     <div className="h-10 w-full bg-black/5 rounded-full overflow-hidden relative">
        <div className={`h-full ${color} rounded-full transition-all duration-1000 flex items-center px-4`} style={{ width: progress }}>
           <span className="text-[9px] text-white font-bold uppercase">{progress}</span>
        </div>
     </div>
  </div>
)

const ProjectStat = ({ label, value }: any) => (
  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest border-b border-black/5 pb-2">
    <span className="text-gray-400 flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
      {label}
    </span>
    <span>{value}</span>
  </div>
)
