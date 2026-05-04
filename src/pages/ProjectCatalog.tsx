import { useState } from 'react';
import { 
  Search, 
  ArrowUpRight, 
  Clock, 
  Zap, 
  Shield, 
  Briefcase, 
  Filter,
  Users,
  LayoutGrid,
  Command,
  ChevronDown,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

import { FilterCheck } from './SpecialistCatalog';

export const ProjectCatalog = () => {
  const { t, formatPrice } = useLanguage();
  const { jobs } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      <header className="space-y-12">
        <div className="space-y-4">
           <h1 className="text-display text-8xl italic leading-none bg-gradient-to-r from-white via-white to-white/20 bg-clip-text text-transparent uppercase text-center">Mission Registry</h1>
           <p className="text-label text-[8px] tracking-[0.5em] text-white/20 uppercase text-center">Audit active objectives in the Armenia Technical Grid</p>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filter Sidebar */}
        <aside className="w-full lg:w-80 space-y-10 shrink-0">
           <div className="premium-card p-8 bg-white/[0.02] border-white/5 space-y-10">
              <div className="space-y-6">
                 <h4 className="text-label text-violet-400 tracking-[0.4em]">Project Protocol</h4>
                 <div className="space-y-3">
                    <FilterCheck label="Fixed Price" />
                    <FilterCheck label="Hourly Sync" />
                    <FilterCheck label="Retainer Node" />
                 </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-label text-fuchsia-400 tracking-[0.4em]">Complexity Level</h4>
                 <div className="space-y-3">
                    <FilterCheck label="Expert Architecture" />
                    <FilterCheck label="Standard Implementation" />
                    <FilterCheck label="Entry Task" />
                 </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-label text-indigo-400 tracking-[0.4em]">Budget Allocation</h4>
                 <div className="space-y-4">
                    <div className="flex gap-4">
                       <input type="number" placeholder="Min AMD" className="w-full bg-white/[0.03] border border-white/10 p-3 text-[10px] text-white outline-none focus:border-violet-500" />
                       <input type="number" placeholder="Max AMD" className="w-full bg-white/[0.03] border border-white/10 p-3 text-[10px] text-white outline-none focus:border-violet-500" />
                    </div>
                 </div>
              </div>

              <button className="w-full bg-white text-black py-4 text-[9px] font-bold uppercase tracking-widest hover:bg-violet-500 hover:text-white transition-colors">Scan Registry</button>
           </div>
        </aside>

        {/* Main Catalog Content */}
        <div className="flex-1 space-y-12">
           <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex-1 glass-panel p-2 flex items-center border-white/10 w-full">
                 <Search className="w-5 h-5 text-white/20 ml-6" />
                 <input 
                  type="text" 
                  placeholder="Scan for mission keywords, categories, or tech stacks..." 
                  className="w-full bg-transparent border-none px-6 py-4 text-white font-bold placeholder:text-white/10 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
              <button className="px-6 py-5 text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2 hover:text-white">
                Sort By <ChevronDown className="w-3 h-3" />
              </button>
           </div>

           <div className="grid grid-cols-1 gap-8">
              {jobs.length === 0 ? (
                <div className="py-40 premium-card bg-white/[0.01] border-dashed border-white/10 text-center space-y-8">
                   <Command className="w-20 h-20 text-white/5 mx-auto" />
                   <p className="text-label text-white/10 tracking-[0.4em]">No active mission objectives detected in the current cycle.</p>
                </div>
              ) : (
                jobs.map(job => (
                  <motion.div 
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="premium-card p-12 bg-white/[0.02] border-white/5 hover:border-violet-500/40 transition-all duration-700 group flex flex-col md:flex-row justify-between items-center gap-12"
                  >
                     <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-4">
                           <span className="badge-lux">{job.category}</span>
                           <span className="text-label text-[8px] text-white/10 uppercase tracking-widest">{job.type} PROTOCOL</span>
                        </div>
                        <h3 className="text-display text-4xl italic text-white group-hover:translate-x-3 transition-transform">{job.title}</h3>
                        <p className="text-white/30 text-sm italic font-medium max-w-3xl line-clamp-2">"{job.description}"</p>
                        <div className="flex items-center gap-8 pt-4">
                           <div className="flex items-center gap-2 text-white/20 text-[9px] font-bold uppercase tracking-widest"><Clock className="w-4 h-4" /> {new Date(job.createdAt).toLocaleDateString()}</div>
                           <div className="flex items-center gap-2 text-violet-400 text-[9px] font-bold uppercase tracking-widest"><Users className="w-4 h-4" /> {job.proposalsCount} Proposals Received</div>
                        </div>
                     </div>
                     <div className="text-right space-y-6 shrink-0">
                        <div className="space-y-1">
                           <p className="text-display text-5xl italic text-white">{formatPrice(job.budget)}</p>
                           <p className="text-label text-[8px] text-white/20 uppercase tracking-widest">Resource Allocation</p>
                        </div>
                        <Link to={`/job/${job.id}`} className="btn-lux px-10 py-5 text-[10px]">Audit Objective <ArrowUpRight className="w-5 h-5" /></Link>
                     </div>
                  </motion.div>
                ))
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
