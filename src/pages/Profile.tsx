import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Briefcase, 
  Star, 
  ShieldCheck, 
  Globe, 
  Send,
  Zap,
  Layout,
  Layers,
  Settings,
  Camera,
  MessageSquare,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const { formatPrice } = useLanguage();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'services' | 'reviews'>('portfolio');

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <header className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-6 text-label text-[9px] text-white/30 hover:text-white transition-all group">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all duration-700 shadow-sm">
             <ArrowLeft className="w-5 h-5" />
          </div>
          Return to Registry
        </button>
        <button className="btn-ghost px-8 py-4 text-[9px]">
           Configure Profile <Settings className="w-4 h-4" />
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Col: Info */}
        <div className="lg:col-span-4 space-y-10">
           <div className="premium-card p-12 bg-white/[0.03] border-white/10 text-center space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600"></div>
              <div className="relative group mx-auto w-48 h-48">
                 <div className="w-48 h-48 rounded-[4rem] bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-7xl font-black italic shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                    {user?.fullName?.[0] || 'A'}
                 </div>
                 <div className="absolute bottom-2 right-2 w-12 h-12 bg-[#0a0a0a] border-4 border-violet-500 rounded-2xl flex items-center justify-center text-violet-400">
                    <ShieldCheck className="w-6 h-6" />
                 </div>
              </div>

              <div className="space-y-4">
                 <h2 className="text-display text-4xl italic text-white leading-none">{user.fullName}</h2>
                 <p className="text-label text-[10px] text-violet-400 tracking-[0.4em] uppercase font-black">{user.role}</p>
                 <div className="flex items-center justify-center gap-6 pt-4">
                    <div className="flex items-center gap-2 text-white/30 text-[9px] uppercase tracking-widest"><MapPin className="w-3.5 h-3.5" /> Yerevan</div>
                    <div className="w-1.5 h-1.5 bg-white/10 rounded-full"></div>
                    <div className="flex items-center gap-2 text-white/30 text-[9px] uppercase tracking-widest"><Globe className="w-3.5 h-3.5" /> Synchronized</div>
                 </div>
              </div>

              <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-6">
                 <div className="space-y-1">
                    <p className="text-display text-2xl italic text-white leading-none">5.0</p>
                    <p className="text-label text-[7px] text-white/20 uppercase tracking-widest">Trust Index</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-display text-2xl italic text-white leading-none">12</p>
                    <p className="text-label text-[7px] text-white/20 uppercase tracking-widest">Missions Done</p>
                 </div>
              </div>

              <button className="btn-lux w-full py-6 text-[10px] mt-6">
                 Initiate Dialogue <Send className="w-4 h-4" />
              </button>
           </div>

           <div className="premium-card p-10 bg-white/[0.01] border-white/5 space-y-8">
              <h4 className="text-label text-white/40 tracking-[0.4em] uppercase">Core Skillsets</h4>
                <div className="flex flex-wrap gap-3">
                   <SkillBadge label="React Architecture" level="Expert" />
                   <SkillBadge label="Node Infrastructure" level="Expert" />
                   <SkillBadge label="AWS Deployment" level="Intermediate" />
                   <SkillBadge label="UI/UX Sync" level="Expert" />
                </div>
           </div>
        </div>

        {/* Right Col: Content */}
        <div className="lg:col-span-8 space-y-12">
           <div className="premium-card p-16 bg-white/[0.02] border-white/10 space-y-12">
              <div className="space-y-6">
                 <h3 className="text-display text-5xl italic text-white uppercase">Identity Narrative</h3>
                 <p className="text-white/40 text-2xl leading-relaxed italic font-medium">
                    "{user.bio || "No technical narrative injected into the registry yet. Specialist focuses on high-end architectural deployment and cross-functional synchronization."}"
                 </p>
              </div>

              <div className="pt-16 border-t border-white/5">
                 <div className="flex items-center gap-12 border-b border-white/5 pb-6">
                    <TabLink active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} label="Visual Archive" />
                    <TabLink active={activeTab === 'services'} onClick={() => setActiveTab('services')} label="Pre-set Services" />
                    <TabLink active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} label="Feedback Logs" />
                 </div>

                 <div className="pt-12">
                    <AnimatePresence mode="wait">
                       {activeTab === 'portfolio' && (
                         <motion.div 
                           key="port"
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                           className="grid grid-cols-2 gap-8"
                         >
                            <PortfolioCard title="AF Market Core" category="Web Engineering" />
                            <PortfolioCard title="Neon Database Sync" category="Infrastructure" />
                            <PortfolioCard title="Cosmic Design System" category="Visual Identity" />
                            <PortfolioCard title="Neural Match Algo" category="AI Development" />
                         </motion.div>
                       )}
                       {activeTab === 'services' && (
                         <motion.div 
                           key="serv"
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           className="space-y-6"
                         >
                            <ServiceCard title="Full-Stack Deployment Cluster" price={500000} time="14 Cycles" />
                            <ServiceCard title="Visual Brand Architecture" price={150000} time="5 Cycles" />
                         </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const SkillBadge = ({ label, level }: { label: string, level: string }) => (
  <div className="flex flex-col gap-1">
     <span className="badge-lux">{label}</span>
     <span className="text-[7px] text-violet-400 font-black uppercase tracking-widest text-center">{level}</span>
  </div>
);

const TabLink = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`text-label text-[10px] tracking-[0.3em] font-black uppercase transition-all relative py-2 ${active ? 'text-violet-400' : 'text-white/20 hover:text-white'}`}
  >
    {label}
    {active && <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 right-0 h-1 bg-violet-600 rounded-full" />}
  </button>
);

const PortfolioCard = ({ title, category }: { title: string, category: string }) => (
  <div className="premium-card bg-white/5 border-white/5 group relative overflow-hidden aspect-video flex flex-col justify-end p-8 cursor-pointer">
     <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 group-hover:scale-110 transition-transform duration-1000"></div>
     <div className="relative z-10 space-y-2">
        <span className="badge-lux text-[7px] py-1">{category}</span>
        <h4 className="text-display text-2xl italic text-white group-hover:translate-x-2 transition-transform">{title}</h4>
     </div>
     <ArrowUpRight className="absolute top-8 right-8 w-6 h-6 text-white/10 group-hover:text-white transition-all" />
  </div>
);

const ServiceCard = ({ title, price, time }: { title: string, price: number, time: string }) => (
  <div className="premium-card p-10 bg-white/[0.03] border-white/5 flex items-center justify-between group hover:border-violet-500/30 transition-all">
     <div className="space-y-4">
        <h4 className="text-display text-3xl italic text-white">{title}</h4>
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2 text-white/20 text-[9px] uppercase tracking-widest font-bold"><Clock className="w-4 h-4" /> {time}</div>
           <div className="flex items-center gap-2 text-violet-400 text-[9px] uppercase tracking-widest font-bold"><Zap className="w-4 h-4" /> Premium Protocol</div>
        </div>
     </div>
     <div className="text-right">
        <p className="text-display text-4xl italic text-white">{new Intl.NumberFormat('hy-AM', { style: 'currency', currency: 'AMD' }).format(price)}</p>
        <button className="btn-lux px-10 py-4 text-[10px] mt-6">Initiate Service <ArrowUpRight className="w-4 h-4" /></button>
     </div>
  </div>
);
