import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Briefcase, 
  MessageSquare, 
  LayoutGrid, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  TrendingUp,
  CreditCard,
  ChevronRight,
  Plus,
  Command,
  LogOut,
  Clock,
  Star
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export const Dashboard = () => {
  const { user, jobs, logout } = useAppContext();
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-grid bg-background">
      <aside className="dashboard-sidebar border-r border-white/5 bg-[#050811] flex flex-col p-8">
        <div className="flex items-center space-x-3 mb-12 px-2">
          <Command className="w-8 h-8 text-indigo-500" />
          <span className="text-xl font-black italic tracking-tighter uppercase">AF Platform</span>
        </div>
        <nav className="flex-1 space-y-2">
          <SidebarLink active={activeTab === 'feed'} onClick={() => setActiveTab('feed')} icon={LayoutGrid} label="Dashboard" />
          <SidebarLink active={activeTab === 'search'} onClick={() => setActiveTab('search')} icon={Search} label="Browse Jobs" />
          <SidebarLink active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} icon={MessageSquare} label="Messages" badge="3" />
        </nav>
        <div className="pt-8 border-t border-white/5 space-y-6">
          <div className="flex items-center space-x-4 px-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center font-black text-white">{user?.fullName?.[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{user?.fullName}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">{user?.role}</p>
            </div>
          </div>
          <button onClick={logout} className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-red-500/5 text-red-500 hover:bg-red-500/10 transition-all text-[10px] font-black uppercase">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="p-8 pb-0 shrink-0">
          <div className="flex items-center justify-between gap-8 max-w-5xl mx-auto w-full">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              <input type="text" placeholder="Search projects..." className="input-field pl-14" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            {user?.role === 'client' && <Link to="/post-job" className="btn-primary px-8"><Plus className="w-4 h-4" /> Post Job</Link>}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Earnings" value="$12,450" trend="+12%" icon={TrendingUp} color="text-emerald-400" bg="bg-emerald-400/10" />
              <StatCard title="Active Jobs" value="4" trend="0%" icon={Briefcase} color="text-indigo-400" bg="bg-indigo-400/10" />
              <StatCard title="Response" value="98%" trend="+2%" icon={Zap} color="text-amber-400" bg="bg-amber-400/10" />
            </div>
            <div className="space-y-6">
              {filteredJobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          </div>
        </div>
      </main>

      <aside className="dashboard-right border-l border-white/5 bg-[#050811] flex flex-col p-8 overflow-y-auto">
        <div className="glass-card p-6 rounded-[2.5rem] space-y-6">
          <h4 className="text-[10px] font-black uppercase text-slate-500">Account Health</h4>
          <IntegrityItem icon={ShieldCheck} label="Identity Verified" active />
          <IntegrityItem icon={Star} label="Top Rated Seller" active />
          <IntegrityItem icon={CreditCard} label="Payment Verified" />
        </div>
      </aside>
    </div>
  )
}

const SidebarLink = ({ icon: Icon, label, active, onClick, badge }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all ${active ? 'bg-indigo-500 text-white shadow-2xl' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
    <Icon className="w-5 h-5 shrink-0" />
    <span className="text-xs font-black uppercase flex-1 text-left">{label}</span>
    {badge && <span className="px-2 py-0.5 bg-indigo-400/20 text-indigo-400 text-[9px] font-black rounded-lg">{badge}</span>}
  </button>
)

const StatCard = ({ title, value, trend, icon: Icon, color, bg }: any) => (
  <div className="glass-card p-8 rounded-[2.5rem] space-y-4">
    <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center`}><Icon className={`w-6 h-6 ${color}`} /></div>
    <div className="flex justify-between items-end"><p className="text-3xl font-black italic">{value}</p><span className="text-[10px] font-bold text-emerald-400">{trend}</span></div>
    <p className="text-[10px] font-black uppercase text-slate-600">{title}</p>
  </div>
)

const JobCard = ({ job }: { job: any }) => (
  <Link to={`/jobs/${job.id}`} className="block glass-card p-10 rounded-[3rem] hover:border-indigo-500/30 transition-all">
    <div className="flex justify-between gap-8">
      <div className="flex-1 space-y-4">
        <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-400 text-[9px] font-black uppercase rounded-lg">{job.category}</span>
        <h3 className="text-3xl font-black italic uppercase">{job.title}</h3>
        <div className="flex gap-8 text-[10px] font-black uppercase text-slate-400">
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-500" /> Remote</div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-indigo-500" /> {job.proposalsCount} Proposals</div>
        </div>
      </div>
      <div className="text-right flex flex-col justify-between items-end">
        <p className="text-4xl font-black text-emerald-400 italic">${job.budget}</p>
        <ChevronRight className="w-6 h-6" />
      </div>
    </div>
  </Link>
)

const IntegrityItem = ({ icon: Icon, label, active }: any) => (
  <div className={`flex items-center gap-3 text-[10px] font-bold uppercase ${active ? 'text-white' : 'text-slate-600'}`}>
    <Icon className={`w-4 h-4 ${active ? 'text-indigo-400' : 'text-slate-700'}`} /> {label}
  </div>
)
