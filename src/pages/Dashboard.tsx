import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Search, 
  LayoutGrid, 
  Briefcase, 
  Send, 
  Settings, 
  LogOut,
  Plus,
  Clock,
  MoreVertical,
  Star
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

export const Dashboard = () => {
  const { user, logout, jobs, proposals } = useAppContext();
  const [activeTab, setActiveTab] = useState<'browse' | 'my-work' | 'settings'>('browse');
  const [search, setSearch] = useState('');

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.category.toLowerCase().includes(search.toLowerCase())
  );

  const myProposals = proposals.filter(p => p.freelancerId === user?.id);
  const myJobs = jobs.filter(j => j.clientId === user?.id);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="glass-panel rounded-[2.5rem] p-8 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-16 self-start px-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
          </div>
          <span className="font-bold text-lg tracking-tight">AF</span>
        </div>

        <nav className="flex-1 w-full space-y-4">
          <SidebarItem active={activeTab === 'browse'} icon={LayoutGrid} onClick={() => setActiveTab('browse')} label="Feed" />
          <SidebarItem active={activeTab === 'my-work'} icon={Briefcase} onClick={() => setActiveTab('my-work')} label="Work" />
          <SidebarItem active={activeTab === 'settings'} icon={Settings} onClick={() => setActiveTab('settings')} label="Settings" />
        </nav>

        <div className="mt-auto pt-8 border-t border-black/5 w-full flex flex-col items-center gap-6">
          <Link to="/profile" className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-white font-bold text-xl shadow-xl shadow-black/10">
            {user?.fullName?.[0]}
          </Link>
          <button onClick={logout} className="p-3 text-gray-400 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
              {activeTab === 'browse' ? 'Marketplace' : activeTab === 'my-work' ? 'My Workspace' : 'Settings'}
            </h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {user?.role === 'client' ? 'Hiring Mode' : 'Freelancing Mode'} • {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="input-capsule pl-11 w-64 shadow-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {user?.role === 'client' && (
              <Link to="/post-job" className="btn-capsule">
                <Plus className="w-4 h-4" /> Post Project
              </Link>
            )}
          </div>
        </header>

        <div className="dashboard-grid overflow-hidden">
          <div className="space-y-6 overflow-y-auto pr-4 pb-12">
            <AnimatePresence mode="wait">
              {activeTab === 'browse' && (
                <motion.div key="browse" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  {filteredJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </motion.div>
              )}

              {activeTab === 'my-work' && (
                <motion.div key="work" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  {user?.role === 'freelancer' ? (
                    <div className="space-y-6">
                      <h3 className="text-xl font-black italic uppercase">My Applications</h3>
                      {myProposals.length === 0 ? (
                        <EmptyState message="You haven't applied to any jobs yet." />
                      ) : (
                        myProposals.map(p => (
                          <ProposalCard key={p.id} proposal={p} job={jobs.find(j => j.id === p.jobId)!} />
                        ))
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <h3 className="text-xl font-black italic uppercase">My Postings</h3>
                      {myJobs.map(job => (
                        <MyJobCard key={job.id} job={job} />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Profile & Stats */}
          <div className="space-y-6">
            <div className="glass-panel rounded-[2.5rem] p-8 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-3xl bg-black/5 flex items-center justify-center font-black text-2xl">
                  {user?.fullName?.[0]}
                </div>
                <div>
                  <h3 className="font-black uppercase italic">{user?.fullName}</h3>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[10px] font-bold text-gray-500 ml-1">5.0</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatBox label="Earned" value="$12.4k" />
                <StatBox label="Success" value="100%" />
              </div>

              <div className="pt-6 border-t border-black/5 space-y-4">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Recommended Skills</p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'UI Design', 'Node.js', 'Web3'].map(s => (
                    <span key={s} className="px-3 py-1 bg-black/5 rounded-full text-[9px] font-bold uppercase">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-[2.5rem] p-8 bg-black text-white space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest italic">Upcoming Deadlines</h4>
              <div className="space-y-4">
                <DeadlineItem title="Fintech UI Review" date="Tomorrow" />
                <DeadlineItem title="API Integration" date="In 3 days" />
              </div>
              <button className="w-full py-4 bg-white text-black rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                Open Schedule
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const SidebarItem = ({ active, icon: Icon, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex flex-col items-center gap-1 p-4 rounded-3xl transition-all ${active ? 'bg-black text-white shadow-xl shadow-black/20 scale-105' : 'text-gray-400 hover:text-black hover:bg-black/5'}`}
  >
    <Icon className="w-6 h-6" />
    <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
  </button>
)

const JobCard = ({ job }: any) => (
  <Link to={`/jobs/${job.id}`} className="block glass-panel p-8 rounded-[3rem] hover:scale-[1.01] transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className="space-y-2">
        <span className="px-3 py-1 bg-indigo-500/10 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-widest">{job.category}</span>
        <h3 className="text-2xl font-black uppercase italic text-black group-hover:text-indigo-600 transition-colors">{job.title}</h3>
      </div>
      <div className="text-right">
        <p className="text-2xl font-black italic tracking-tighter">${job.budget}</p>
        <p className="text-[9px] font-bold text-gray-400 uppercase">{job.type}</p>
      </div>
    </div>
    <p className="text-gray-500 text-sm line-clamp-2 mb-8">{job.description}</p>
    <div className="flex items-center justify-between pt-6 border-t border-black/5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center font-bold text-xs">{job.clientName[0]}</div>
        <span className="text-[10px] font-black uppercase italic">{job.clientName}</span>
      </div>
      <div className="flex items-center gap-4 text-gray-400">
        <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /><span className="text-[10px] font-bold">2h ago</span></div>
        <div className="flex items-center gap-1.5"><Send className="w-3.5 h-3.5" /><span className="text-[10px] font-bold">{job.proposalsCount} bids</span></div>
      </div>
    </div>
  </Link>
)

const MyJobCard = ({ job }: any) => (
  <div className="glass-panel p-8 rounded-[3rem] space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-black uppercase italic">{job.title}</h3>
      <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase">{job.status}</span>
    </div>
    <div className="flex items-center gap-8">
      <StatBox label="Proposals" value={job.proposalsCount} />
      <StatBox label="Budget" value={`$${job.budget}`} />
    </div>
    <div className="flex gap-4">
      <button className="btn-capsule flex-1 justify-center">View Proposals</button>
      <button className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-all"><MoreVertical className="w-5 h-5" /></button>
    </div>
  </div>
)

const ProposalCard = ({ proposal, job }: any) => (
  <div className="glass-panel p-8 rounded-[3rem] space-y-4 border-l-4 border-black">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Applied for</p>
        <h4 className="text-lg font-black uppercase italic">{job?.title}</h4>
      </div>
      <div className="text-right">
        <p className="text-xl font-black italic">${proposal.bid}</p>
        <span className="text-[9px] font-bold text-indigo-500 uppercase">Pending Review</span>
      </div>
    </div>
  </div>
)

const StatBox = ({ label, value }: any) => (
  <div>
    <p className="text-2xl font-black tracking-tighter italic">{value}</p>
    <p className="text-[9px] font-bold uppercase text-gray-400 tracking-widest">{label}</p>
  </div>
)

const EmptyState = ({ message }: any) => (
  <div className="p-12 text-center space-y-4">
    <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto text-gray-300">
      <Briefcase className="w-8 h-8" />
    </div>
    <p className="text-sm font-medium text-gray-400">{message}</p>
  </div>
)

const DeadlineItem = ({ title, date }: any) => (
  <div className="flex justify-between items-center text-xs">
    <span className="font-medium text-white/80">{title}</span>
    <span className="text-[10px] font-black uppercase text-orange-400">{date}</span>
  </div>
)

const languages = [{ id: 'en', label: 'EN' }, { id: 'ru', label: 'RU' }, { id: 'hy', label: 'HY' }];

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-2 bg-white/40 border border-white/60 p-1.5 rounded-full shadow-sm">
      {languages.map((l) => (
        <button key={l.id} onClick={() => setLang(l.id as any)} className={`relative px-6 py-2 rounded-full text-xs font-black uppercase transition-all z-10 ${lang === l.id ? 'text-white' : 'text-gray-500 hover:text-black'}`}>
          {lang === l.id && <motion.div layoutId="activeLangDashboard" className="absolute inset-0 bg-black rounded-full -z-10 shadow-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
          {l.label}
        </button>
      ))}
    </div>
  );
};
