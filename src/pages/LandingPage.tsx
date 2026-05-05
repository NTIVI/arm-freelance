import { motion } from 'framer-motion';
import {
  Search,
  ArrowUpRight,
  Zap,
  Shield,
  Globe,
  Users,
  Briefcase,
  Code,
  Smartphone,
  Palette,
  Megaphone,
  Database,
  Lock,
  Star,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-40 pb-40">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-40 scale-105"
            alt="Armenian Landscape"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-4">
              <span className="w-12 h-[1px] bg-violet-500/50"></span>
              <p className="text-label tracking-[0.6em] text-violet-400 font-black">{t('hero_subtitle')}</p>
              <span className="w-12 h-[1px] bg-violet-500/50"></span>
            </div>
            <h1 className="text-display text-7xl md:text-[10rem] bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent leading-none">
              ARMENIA'S <br />
              <span className="italic outline-text text-white/50">ELITE GRID</span>
            </h1>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="w-full max-w-3xl glass-panel p-2 flex flex-col sm:flex-row gap-2 border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" />
              <input
                type="text"
                placeholder="Scan for technical mastery or project objectives..."
                className="w-full bg-transparent border-none px-16 py-6 text-white font-bold placeholder:text-white/20 outline-none"
              />
            </div>
            <button className="btn-lux px-12 py-6 text-sm">
              Initialize Search <ArrowUpRight className="w-5 h-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap justify-center gap-16 pt-10"
          >
            <QuickStat label="Verified Specialists" value="1,500+" />
            <QuickStat label="Projected Volume" value="12,000+" />
            <QuickStat label="Node Uptime" value="99.9%" />
          </motion.div>
        </div>
      </section>

      {/* Popular Freelancers Carousel Placeholder */}
      <section className="max-w-7xl mx-auto px-6 space-y-20">
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <p className="text-label tracking-[0.4em] text-violet-400">Top-Tier Performers</p>
            <h2 className="text-display text-7xl italic">Elite Specialists</h2>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-white hover:bg-violet-600 transition-all"><ArrowUpRight className="w-5 h-5 rotate-[225deg]" /></button>
            <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-white hover:bg-violet-600 transition-all"><ArrowUpRight className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <SpecialistMiniCard name="Aris Vardanian" role="System Architect" rating={5.0} />
          <SpecialistMiniCard name="Nare Mkrtchyan" role="UI/UX Lead" rating={4.9} />
          <SpecialistMiniCard name="Suren Sargsyan" role="Data Engineer" rating={5.0} />
          <SpecialistMiniCard name="Mane Gasparyan" role="Mobile Expert" rating={4.8} />
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="max-w-7xl mx-auto px-6 space-y-20">
        <div className="text-center space-y-4">
          <p className="text-label tracking-[0.4em] text-fuchsia-400">Success Transmissions</p>
          <h2 className="text-display text-7xl italic leading-none">Client Reviews</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <ReviewCard name="Vigen S." company="Fintech AM" text="The level of technical expertise in the Armenian cluster is unmatched. Synchronized a full banking core in 3 cycles." />
          <ReviewCard name="Elena R." company="E-Gov Node" text="Architectural precision and perfect communication. The platform handled the escrow protocol flawlessly." />
          <ReviewCard name="Gevorg M." company="GameFlow" text="Found a specialized neural network engineer within 24 hours. Scaling has never been this efficient." />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-6">
            <p className="text-label tracking-[0.4em] text-violet-400">Operational Domains</p>
            <h2 className="text-display text-7xl italic leading-none">{t('categories_title')}</h2>
          </div>
          <Link to="/catalog" className="text-label text-white/30 hover:text-white flex items-center gap-3 transition-all group">
            Browse All Segments <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CategoryCard icon={Code} title="Software Engineering" desc="Full-stack, Backend, and Architectural design." />
          <CategoryCard icon={Smartphone} title="Mobile Ecosystems" desc="iOS, Android, and Cross-platform excellence." />
          <CategoryCard icon={Palette} title="Visual Identity" desc="High-end UI/UX and brand architecture." />
          <CategoryCard icon={Database} title="Data Architecture" desc="Neural networks and scalable data models." />
          <CategoryCard icon={Lock} title="Cyber Security" desc="Infrastructure audits and defense protocols." />
          <CategoryCard icon={Megaphone} title="Growth Strategies" desc="Market penetration and digital presence." />
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white/[0.02] border-y border-white/5 py-60 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-16">
            <div className="space-y-6">
              <p className="text-label tracking-[0.4em] text-violet-400">Execution Protocol</p>
              <h2 className="text-display text-8xl italic leading-none">{t('how_it_works')}</h2>
            </div>

            <div className="space-y-12">
              <ProcessStep
                num="01"
                title="Define Objective"
                desc="Draft a detailed architectural brief for your project."
              />
              <ProcessStep
                num="02"
                title="Match Credentials"
                desc="Review elite specialist proposals and verified portfolios."
              />
              <ProcessStep
                num="03"
                title="Execute Sync"
                desc="Establish a secure tunnel and begin architectural deployment."
              />
            </div>
          </div>

          <div className="premium-card p-20 bg-[#0a0a0a] border-white/10 relative overflow-hidden group shadow-[0_100px_200px_-50px_rgba(0,0,0,1)]">
            <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:opacity-10 transition-opacity">
              <Shield className="w-64 h-64 text-violet-500" />
            </div>
            <div className="relative z-10 space-y-10">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-500/20">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-display text-4xl italic text-white">Security & Escrow Layer</h3>
              <p className="text-white/30 text-lg italic leading-relaxed">
                All value transfers are protected by multi-signature orbital escrow. Funds are only released upon verified milestone completion, ensuring absolute security for both nodes.
              </p>
              <div className="flex gap-4">
                <span className="badge-lux">Verified Auth</span>
                <span className="badge-lux">Escrow Protection</span>
                <span className="badge-lux">AMD Currency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .outline-text {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4);
          color: transparent;
        }
      `}</style>
    </div>
  );
};

const SpecialistMiniCard = ({ name, role, rating }: any) => (
  <div className="premium-card p-8 bg-white/[0.02] border-white/5 hover:border-violet-500/40 transition-all duration-700 group cursor-pointer text-center space-y-6">
    <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[2.5rem] flex items-center justify-center text-white text-3xl font-black italic shadow-xl mx-auto rotate-3 group-hover:rotate-0 transition-transform">
      {name[0]}
    </div>
    <div className="space-y-2">
      <h4 className="text-display text-xl italic text-white group-hover:text-violet-400 transition-colors">{name}</h4>
      <p className="text-label text-[8px] text-white/20 tracking-widest uppercase font-black">{role}</p>
    </div>
    <div className="flex items-center justify-center gap-2 pt-2">
      <Star className="w-3.5 h-3.5 text-violet-500 fill-current" />
      <span className="text-display text-sm italic text-white">{rating}</span>
    </div>
  </div>
);

const ReviewCard = ({ name, company, text }: any) => (
  <div className="premium-card p-12 bg-white/[0.02] border-white/5 hover:border-fuchsia-500/20 transition-all duration-700 space-y-8 relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
      <MessageSquare className="w-16 h-16 text-fuchsia-500" />
    </div>
    <p className="text-white/40 text-lg leading-relaxed italic font-medium relative z-10">"{text}"</p>
    <div className="flex items-center gap-4 pt-4 relative z-10">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 font-black italic">{name[0]}</div>
      <div>
        <p className="text-display text-sm italic text-white">{name}</p>
        <p className="text-label text-[7px] text-white/20 uppercase tracking-widest">{company}</p>
      </div>
    </div>
  </div>
);

const QuickStat = ({ label, value }: { label: string, value: string }) => (
  <div className="text-center space-y-1">
    <p className="text-display text-4xl italic text-white leading-none">{value}</p>
    <p className="text-label text-[8px] tracking-[0.2em] text-white/20 uppercase">{label}</p>
  </div>
);

const CategoryCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="premium-card p-12 hover:-translate-y-2 transition-all duration-700 group cursor-pointer border-white/5 bg-white/[0.02]">
    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all duration-700 group-hover:rotate-12 mb-10">
      <Icon className="w-7 h-7 text-white/20 group-hover:text-white" />
    </div>
    <div className="space-y-4">
      <h3 className="text-display text-2xl italic leading-none text-white group-hover:text-violet-400 transition-colors">{title}</h3>
      <p className="text-white/20 text-sm font-medium italic leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ProcessStep = ({ num, title, desc }: { num: string, title: string, desc: string }) => (
  <div className="flex gap-8 group">
    <div className="text-display text-5xl italic text-white/10 group-hover:text-violet-500 transition-colors duration-700 leading-none">{num}</div>
    <div className="space-y-2">
      <h4 className="text-display text-3xl italic text-white">{title}</h4>
      <p className="text-white/30 text-base font-medium italic">{desc}</p>
    </div>
  </div>
);
