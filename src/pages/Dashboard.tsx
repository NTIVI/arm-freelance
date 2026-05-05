import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  Wallet, 
  Zap, 
  Search, 
  Bell, 
  MessageSquare,
  ArrowUpRight,
  ShieldCheck,
  Star,
  Clock,
  Plus,
  Command,
  LayoutGrid,
  Activity
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user, jobs, proposals, logout } = useAppContext();
  const { formatPrice, t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'messages' | 'wallet'>('overview');

  if (!user) {
    navigate('/auth');
    return null;
  }

  const isFreelancer = user.role === 'freelancer';

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-80 space-y-10 shrink-0">
        <div className="premium-card p-10 space-y-10 bg-white/[0.03] border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600"></div>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-3xl font-black italic shadow-2xl rotate-3 group-hover:rotate-0 transition-transform">
              {user?.fullName ? user.fullName[0] : 'A'}
            </div>
            <div className="space-y-1">
              <h3 className="text-display text-xl leading-none text-white">{user.fullName}</h3>
              <p className="text-label text-[8px] text-white/20 tracking-widest">{t(`role_${user.role}`)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
             <SidebarStat label={t('balance')} value={formatPrice(user.balance)} />
             <SidebarStat label={t('credits')} value={user.credits} />
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarLink active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label={t('overview')} icon={LayoutGrid} />
          <SidebarLink active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} label={isFreelancer ? t('active_missions') : t('my_projects')} icon={Briefcase} />
          <SidebarLink active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} label={t('messages')} icon={MessageSquare} />
          <SidebarLink active={activeTab === 'wallet'} onClick={() => setActiveTab('wallet')} label={t('wallet')} icon={Wallet} />
          <div className="h-[1px] bg-white/5 my-4" />
          <SidebarLink active={false} onClick={logout} label={t('logout')} icon={Zap} color="text-fuchsia-500" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 space-y-12">
        <header className="flex justify-between items-end">
           <div className="space-y-4">
              <h2 className="text-display text-7xl italic leading-none text-white uppercase">{activeTab === 'overview' ? t('dashboard_title') : t(activeTab)}</h2>
              <div className="flex items-center gap-4">
                 <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.5)]"></div>
                 <p className="text-label text-[8px] tracking-[0.4em] text-white/30 uppercase">{t('system_status')}: {t('synchronized')}</p>
              </div>
           </div>

           {!isFreelancer && (
             <Link to="/post-job" className="btn-lux px-10 py-5 text-[10px]">
               {t('post_job')} <Plus className="w-5 h-5" />
             </Link>
           )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <StatusCard icon={Activity} label={t('trust_rating')} value={user?.rating?.toFixed(1) || "5.0"} sub={`${t('total_rating')} 5.0`} />
           <StatusCard icon={Clock} label={t('op_cycles')} value={isFreelancer ? "12" : "5"} sub={t('milestones')} />
           <StatusCard icon={ShieldCheck} label={t('verification')} value={t('tier_1')} sub={t('audit_passed')} color="text-fuchsia-400" />
        </div>

        {activeTab === 'overview' && (
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-10">
                 <div className="flex items-center justify-between">
                    <h4 className="text-label text-white/40 tracking-[0.4em]">{t('active_protocols')}</h4>
                    <button className="text-[10px] text-violet-400 font-black uppercase hover:text-white transition-colors">{t('view_archive')}</button>
                 </div>

                 {isFreelancer ? (
                   <div className="space-y-6">
                      {jobs.filter(j => j.status === 'in-progress').length === 0 ? (
                        <EmptyState message={t('no_missions')} />
                      ) : (
                        <div className="space-y-6">
                           {/* Job Cards */}
                        </div>
                      )}
                   </div>
                 ) : (
                   <div className="space-y-6">
                      {jobs.filter(j => j.clientId === user.id).map(job => (
                        <div key={job.id} className="premium-card p-10 bg-white/[0.02] border-white/5 hover:border-violet-500/30 transition-all duration-700 flex justify-between items-center group">
                           <div className="space-y-4">
                              <span className="badge-lux">{job.category}</span>
                              <h3 className="text-display text-4xl italic text-white group-hover:translate-x-2 transition-transform">{job.title}</h3>
                              <div className="flex items-center gap-6">
                                 <div className="flex items-center gap-2 text-white/20 text-[9px] font-bold uppercase tracking-widest">
                                    <Clock className="w-3.5 h-3.5" /> {new Date(job.createdAt).toLocaleDateString()}
                                 </div>
                                 <div className="flex items-center gap-2 text-violet-400 text-[9px] font-bold uppercase tracking-widest">
                                    <Users className="w-3.5 h-3.5" /> {job.proposalsCount} {t('proposals')}
                                 </div>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-display text-4xl italic text-white">{formatPrice(job.budget)}</p>
                              <Link to={`/job/${job.id}`} className="btn-ghost px-6 py-3 text-[8px] mt-6">{t('audit_status')} <ArrowUpRight className="w-4 h-4" /></Link>
                           </div>
                        </div>
                      ))}
                   </div>
                 )}
              </div>

              <div className="lg:col-span-4 space-y-10">
                 <h4 className="text-label text-white/40 tracking-[0.4em]">{t('pulse')}</h4>
                 <div className="premium-card p-8 space-y-8 bg-white/[0.01] border-white/5">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-violet-600/20 rounded-xl flex items-center justify-center text-violet-400"><Command className="w-5 h-5" /></div>
                       <p className="text-[11px] font-bold text-white/60">{t('new_proposal_notif')}</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-fuchsia-600/20 rounded-xl flex items-center justify-center text-fuchsia-400"><Zap className="w-5 h-5" /></div>
                       <p className="text-[11px] font-bold text-white/60">{t('balance_update_notif')}</p>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </main>
    </div>
  );
};

const SidebarStat = ({ label, value }: { label: string, value: string | number }) => (
  <div className="space-y-1">
    <p className="text-label text-[7px] text-white/20">{label}</p>
    <p className="text-display text-sm italic text-white">{value}</p>
  </div>
);

const SidebarLink = ({ active, onClick, label, icon: Icon, color = "text-white/40" }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-5 px-8 py-5 rounded-[2rem] transition-all duration-500 group ${active ? 'bg-violet-600 text-white shadow-xl shadow-violet-500/20' : `hover:bg-white/5 ${color} hover:text-white`}`}
  >
    <Icon className={`w-5 h-5 transition-transform ${active ? '' : 'group-hover:scale-110'}`} />
    <span className="text-label text-[9px] text-inherit">{label}</span>
  </button>
);

const StatusCard = ({ icon: Icon, label, value, sub, color = "text-violet-400" }: any) => (
  <div className="premium-card p-8 bg-white/[0.02] border-white/5 space-y-6 group hover:border-white/10 transition-all duration-700">
    <div className="flex justify-between items-start">
       <div className={`w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center ${color} group-hover:rotate-12 transition-transform`}>
          <Icon className="w-6 h-6" />
       </div>
       <p className="text-label text-[7px] text-white/10 uppercase tracking-widest">{label}</p>
    </div>
    <div>
       <p className="text-display text-4xl italic text-white leading-none">{value}</p>
       <p className="text-label text-[8px] text-white/20 mt-2 uppercase">{sub}</p>
    </div>
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="py-24 premium-card bg-white/[0.01] border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-6">
     <Search className="w-16 h-16 text-white/5" />
     <p className="text-label text-white/10 uppercase tracking-widest">{message}</p>
  </div>
);
