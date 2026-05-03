import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Search, 
  LayoutGrid, 
  Briefcase, 
  Settings, 
  LogOut,
  Plus,
  Star,
  CheckCircle2,
  Clock,
  Send,
  Github,
  MoreVertical
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useLanguage } from '../context/LanguageContext'

export const Dashboard = () => {
  const { t } = useLanguage();
  const { user, logout, jobs, proposals, specialists } = useAppContext();
  const [activeTab, setActiveTab] = useState<'browse' | 'my-work' | 'settings'>('browse');

  if (!user) return null;
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'jobs' | 'specialists'>(user?.role === 'client' ? 'specialists' : 'jobs');

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSpecialists = specialists.filter(s => 
    s.fullName.toLowerCase().includes(search.toLowerCase()) || 
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
  );

  const myProposals = proposals.filter(p => p.freelancerId === user?.id);
  const myJobs = jobs.filter(j => j.clientId === user?.id);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="glass-panel rounded-[2.5rem] p-8 flex flex-col items-center">
        <Link to="/" className="flex items-center gap-3 mb-16 self-start px-2 group">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-all">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
          </div>
          <span className="font-bold text-lg tracking-tight">AF</span>
        </Link>

        <nav className="flex-1 w-full space-y-4">
          <SidebarItem active={activeTab === 'browse'} icon={LayoutGrid} onClick={() => setActiveTab('browse')} label="Market" />
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
            <h1 className="text-6xl font-black italic uppercase tracking-tighter">
              {activeTab === 'browse' ? (user?.role === 'client' ? t('find_it_talent') : t('browse_it_projects')) : activeTab === 'my-work' ? t('my_workspace') : t('settings')}
            </h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {user?.role === 'client' ? t('client_dashboard') : t('freelancer_dashboard')} • {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link 
              to="/" 
              className="px-8 py-3 bg-black/5 border border-black/10 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black/10 transition-all flex items-center gap-2"
            >
              {t('main_page')}
            </Link>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder={filterType === 'jobs' ? t('search_projects_placeholder') : t('search_talent_placeholder')} 
                className="input-capsule pl-14 w-80 shadow-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {user?.role === 'client' && (
              <Link to="/post-job" className="btn-capsule">
                <Plus className="w-4 h-4" /> {t('post_it_project')}
              </Link>
            )}
          </div>
        </header>

        <div className="dashboard-grid overflow-hidden">
          <div className="space-y-6 overflow-y-auto pr-4 pb-12">
            {activeTab === 'browse' && user?.role === 'client' && (
              <div className="flex gap-4 p-1 bg-black/5 rounded-full w-fit mb-8">
                 <button onClick={() => setFilterType('specialists')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filterType === 'specialists' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}>{t('tab_specialists')}</button>
                 <button onClick={() => setFilterType('jobs')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filterType === 'jobs' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}>{t('tab_my_postings')}</button>
              </div>
            )}

            <AnimatePresence mode="wait">
              {activeTab === 'browse' && (
                <motion.div key="browse" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  {user?.role === 'freelancer' ? (
                    filteredJobs.map(job => (
                      <JobCard key={job.id} job={job} />
                    ))
                  ) : (
                    filterType === 'specialists' ? (
                      <div className="grid grid-cols-1 gap-6">
                        {filteredSpecialists.map(spec => (
                          <SpecialistCard key={spec.id} spec={spec} />
                        ))}
                      </div>
                    ) : (
                      myJobs.map(job => (
                        <MyJobCard key={job.id} job={job} />
                      ))
                    )
                  )}
                </motion.div>
              )}

              {activeTab === 'my-work' && (
                <motion.div key="work" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  {user?.role === 'freelancer' ? (
                    <div className="space-y-6">
                      <h3 className="text-xl font-black italic uppercase">{t('tab_my_applications')}</h3>
                      {myProposals.length === 0 ? (
                        <EmptyState message="You haven't applied to any IT projects yet." />
                      ) : (
                        myProposals.map(p => (
                          <ProposalCard key={p.id} proposal={p} job={jobs.find(j => j.id === p.jobId)!} />
                        ))
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <h3 className="text-xl font-black italic uppercase">{t('tab_project_proposals')}</h3>
                      {proposals.filter(p => jobs.find(j => j.id === p.jobId)?.clientId === user.id).map(p => (
                        <ClientProposalCard key={p.id} proposal={p} job={jobs.find(j => j.id === p.jobId)!} />
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
                <div className="w-16 h-16 rounded-3xl bg-black flex items-center justify-center text-white font-black text-2xl">
                  {user?.fullName?.[0]}
                </div>
                <div>
                  <h3 className="font-black uppercase italic">{user?.fullName}</h3>
                  <div className="flex items-center gap-1 text-emerald-500">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-xs font-black uppercase tracking-widest">{t('verified_user')} {user?.role}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatBox label={user?.role === 'client' ? t('spent') : t('earned')} value={user?.role === 'client' ? "$45.2k" : "$12.4k"} />
                <StatBox label={t('success')} value="100%" />
              </div>

              <div className="pt-6 border-t border-black/5 space-y-4">
                <p className="text-xs font-black uppercase text-gray-400 tracking-widest">{t('platform_activity')}</p>
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-[11px] font-bold">
                     <span className="text-gray-400 uppercase">{t('response_rate')}</span>
                     <span className="text-black">98%</span>
                   </div>
                   <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                     <div className="h-full bg-black rounded-full" style={{ width: '98%' }}></div>
                   </div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-[2.5rem] p-8 bg-indigo-600 text-white space-y-6">
               <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 fill-current" />
               </div>
               <div className="space-y-2">
                 <h4 className="text-lg font-black uppercase tracking-tighter italic">{t('help_me_choose_title')}</h4>
                 <p className="text-xs text-white/70 leading-relaxed font-medium">{t('help_me_choose_desc')}</p>
               </div>
               <button className="w-full py-4 bg-white text-indigo-600 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
                 {t('request_consultation')}
               </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const SidebarItem = ({ active, icon: Icon, onClick, label }: any) => {
  return (
  <button 
    onClick={onClick}
    className={`w-full flex flex-col items-center gap-1 p-4 rounded-3xl transition-all ${active ? 'bg-black text-white shadow-xl shadow-black/20 scale-105' : 'text-gray-400 hover:text-black hover:bg-black/5'}`}
  >
    <Icon className="w-8 h-8" />
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
  );
}

const JobCard = ({ job }: any) => {
  const { t } = useLanguage();
  return (
  <Link to={`/jobs/${job.id}`} className="block glass-panel p-8 rounded-[3rem] hover:scale-[1.01] transition-all group border border-white">
    <div className="flex justify-between items-start mb-6">
      <div className="space-y-2">
        <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-600 rounded-full text-[11px] font-black uppercase tracking-widest">{job.category}</span>
        <h3 className="text-3xl font-black uppercase italic text-black group-hover:text-indigo-600 transition-colors">{job.title}</h3>
      </div>
      <div className="text-right">
        <p className="text-3xl font-black italic tracking-tighter">${job.budget}</p>
        <p className="text-[11px] font-bold text-gray-400 uppercase">{job.type}</p>
      </div>
    </div>
    <p className="text-gray-500 text-base line-clamp-2 mb-8">{job.description}</p>
    <div className="flex items-center justify-between pt-6 border-t border-black/5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center font-bold text-xs">{job.clientName[0]}</div>
        <span className="text-[10px] font-black uppercase italic">{job.clientName}</span>
      </div>
      <div className="flex items-center gap-4 text-gray-400">
        <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /><span className="text-xs font-bold">New</span></div>
        <div className="flex items-center gap-1.5"><Send className="w-4 h-4" /><span className="text-xs font-bold">{job.proposalsCount} bids</span></div>
      </div>
    </div>
  </Link>
  );
}

const SpecialistCard = ({ spec }: any) => {
  const { t } = useLanguage();
  return (
  <div className="glass-panel p-8 rounded-[3rem] space-y-6 hover:scale-[1.01] transition-all border border-white">
    <div className="flex justify-between items-start">
      <div className="flex gap-6">
        <div className="w-20 h-20 bg-black rounded-[2rem] flex items-center justify-center text-white text-3xl font-black shadow-xl">
          {spec.avatar}
        </div>
        <div className="space-y-2">
           <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black uppercase italic">{spec.fullName}</h3>
              <div className="flex items-center gap-1 text-orange-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-xs font-black text-black">{spec.rating}</span>
              </div>
           </div>
           <p className="text-indigo-600 text-xs font-black uppercase tracking-widest">{spec.title}</p>
           <div className="flex flex-wrap gap-2 pt-2">
             {spec.skills.map((s: string) => <span key={s} className="px-3 py-1 bg-black/5 rounded-full text-[9px] font-bold uppercase">{s}</span>)}
           </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-3xl font-black italic tracking-tighter">${spec.price}</p>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Starting from</p>
      </div>
    </div>
    <div className="flex gap-3 pt-4">
       <button className="btn-capsule flex-1 justify-center">{t('hire_specialist')}</button>
       <button className="btn-ghost flex-1 justify-center bg-white border border-black/10">{t('view_portfolio')}</button>
       <button className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center hover:bg-black transition-all hover:text-white group"><Github className="w-5 h-5" /></button>
    </div>
  </div>
  );
}

const MyJobCard = ({ job }: any) => {
  const { t } = useLanguage();
  return (
  <div className="glass-panel p-8 rounded-[3rem] space-y-6 border border-white">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-black uppercase italic">{job.title}</h3>
      <span className="px-5 py-2 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-black uppercase">{job.status}</span>
    </div>
    <div className="flex items-center gap-8">
      <StatBox label={t('proposals_count')} value={job.proposalsCount} />
      <StatBox label={t('budget')} value={`$${job.budget}`} />
    </div>
    <div className="flex gap-4">
      <button className="btn-capsule flex-1 justify-center">{t('review_bids')} ({job.proposalsCount})</button>
      <button className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-all"><MoreVertical className="w-5 h-5" /></button>
    </div>
  </div>
  );
}

const ProposalCard = ({ proposal, job }: any) => {
  const { t } = useLanguage();
  return (
  <div className="glass-panel p-8 rounded-[3rem] space-y-4 border-l-4 border-black">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{t('applied_for_project')}</p>
        <h4 className="text-lg font-black uppercase italic">{job?.title}</h4>
      </div>
      <div className="text-right">
        <p className="text-xl font-black italic">${proposal.bid}</p>
        <span className="text-[9px] font-bold text-indigo-500 uppercase">{t('awaiting_client_review')}</span>
      </div>
    </div>
  </div>
  );
}

const ClientProposalCard = ({ proposal, job }: any) => {
  const { t } = useLanguage();
  return (
  <div className="glass-panel p-8 rounded-[3rem] space-y-6 hover:border-black transition-all border border-transparent">
    <div className="flex justify-between items-start">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white font-black text-xl">{proposal.freelancerName[0]}</div>
        <div>
           <h4 className="text-lg font-black uppercase italic">{proposal.freelancerName}</h4>
           <p className="text-[10px] font-bold text-gray-400 uppercase">Bid for: {job?.title}</p>
        </div>
      </div>
      <div className="text-right">
         <p className="text-2xl font-black italic tracking-tighter">${proposal.bid}</p>
      </div>
    </div>
    <p className="text-gray-500 text-xs font-medium leading-relaxed italic line-clamp-3">"{proposal.coverLetter}"</p>
    <div className="flex gap-4 pt-4">
       <button className="btn-capsule flex-1 justify-center bg-emerald-600 hover:bg-emerald-700">{t('approve_and_hire')}</button>
       <button className="btn-ghost flex-1 justify-center bg-white border border-black/10">{t('message')}</button>
    </div>
  </div>
  );
}

const StatBox = ({ label, value }: any) => (
  <div>
    <p className="text-3xl font-black tracking-tighter italic">{value}</p>
    <p className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">{label}</p>
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

const languages = [{ id: 'en', label: 'EN' }, { id: 'ru', label: 'RU' }, { id: 'hy', label: 'HY' }];

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-1 bg-black/5 p-1 rounded-full">
      {languages.map((l) => (
        <button key={l.id} onClick={() => setLang(l.id as any)} className={`relative px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all z-10 ${lang === l.id ? 'text-white' : 'text-gray-400 hover:text-black'}`}>
          {lang === l.id && <motion.div layoutId="activeLangDashboard" className="absolute inset-0 bg-black rounded-full -z-10 shadow-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
          {l.label}
        </button>
      ))}
    </div>
  );
};
