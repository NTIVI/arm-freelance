import { useState } from 'react';
import { 
  Search, 
  ArrowUpRight, 
  Star, 
  MapPin, 
  Briefcase, 
  Filter,
  Users,
  LayoutGrid,
  ChevronDown,
  Layers,
  Zap,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export const FilterCheck = ({ label }: { label: string }) => (
  <label className="flex items-center gap-4 group cursor-pointer">
    <div className="w-5 h-5 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-violet-500 transition-all">
       <CheckCircle className="w-3 h-3 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <span className="text-[11px] font-medium text-white/40 group-hover:text-white transition-colors">{label}</span>
  </label>
);

export const SpecialistCatalog = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const specialists = [
    { id: '1', name: 'Aris Vardanian', category: 'Software Engineering', rating: 5.0, projects: 12, bio: 'Architecting neural networks and high-scale infrastructures.' },
    { id: '2', name: 'Nare Mkrtchyan', category: 'Visual Identity', rating: 4.9, projects: 25, bio: 'High-end UI/UX and brand strategy for global IT nodes.' },
    { id: '3', name: 'Suren Sargsyan', category: 'Data Architecture', rating: 5.0, projects: 8, bio: 'Specializing in big data pipelines and analytical clusters.' },
    { id: '4', name: 'Mane Gasparyan', category: 'Mobile Ecosystems', rating: 4.8, projects: 15, bio: 'iOS/Android elite deployment and optimization.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      <header className="space-y-12">
        <div className="space-y-4">
           <h1 className="text-display text-8xl italic leading-none bg-gradient-to-r from-white via-white to-white/20 bg-clip-text text-transparent uppercase text-center">Specialist Registry</h1>
           <p className="text-label text-[8px] tracking-[0.5em] text-white/20 uppercase text-center">Synchronize with Armenia's Elite Technical Nodes</p>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filter Sidebar */}
        <aside className="w-full lg:w-80 space-y-10 shrink-0">
           <div className="premium-card p-8 bg-white/[0.02] border-white/5 space-y-10">
              <div className="space-y-6">
                 <h4 className="text-label text-violet-400 tracking-[0.4em]">Operational Spheres</h4>
                 <div className="space-y-3">
                    <FilterCheck label="Software Engineering" />
                    <FilterCheck label="Visual Identity" />
                    <FilterCheck label="Data Architecture" />
                    <FilterCheck label="Cyber Security" />
                 </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-label text-fuchsia-400 tracking-[0.4em]">Geographical Nodes</h4>
                 <div className="space-y-3">
                    <FilterCheck label="Yerevan (Main)" />
                    <FilterCheck label="Gyumri Cluster" />
                    <FilterCheck label="Dilijan Hub" />
                    <FilterCheck label="Remote Sync" />
                 </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-label text-indigo-400 tracking-[0.4em]">Valuation Range</h4>
                 <div className="space-y-4">
                    <div className="flex gap-4">
                       <input type="number" placeholder="Min" className="input-lux py-3 text-[10px] px-4" />
                       <input type="number" placeholder="Max" className="input-lux py-3 text-[10px] px-4" />
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-label text-emerald-400 tracking-[0.4em]">Mastery Level</h4>
                 <div className="space-y-3">
                    <FilterCheck label="Expert (8+ yrs)" />
                    <FilterCheck label="Intermediate" />
                    <FilterCheck label="Beginner Node" />
                 </div>
              </div>

              <button className="btn-lux w-full py-4 text-[9px] shadow-none">Apply Filter Protocol</button>
           </div>
        </aside>

        {/* Main Catalog Content */}
        <div className="flex-1 space-y-12">
           <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex-1 glass-panel p-2 flex items-center border-white/10 w-full">
                 <Search className="w-5 h-5 text-white/20 ml-6" />
                 <input 
                  type="text" 
                  placeholder="Scan for technical skills, names, or categories..." 
                  className="w-full bg-transparent border-none px-6 py-4 text-white font-bold placeholder:text-white/10 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
              <div className="flex items-center gap-4 shrink-0">
                 <span className="text-label text-white/20">Sort By:</span>
                 <select className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-label text-[9px] text-white outline-none">
                    <option className="bg-[#0f0f0f]">Rating Protocol</option>
                    <option className="bg-[#0f0f0f]">Valuation (Low-High)</option>
                    <option className="bg-[#0f0f0f]">Active Responses</option>
                    <option className="bg-[#0f0f0f]">New Registry</option>
                 </select>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specialists.map(s => (
                <motion.div 
                 key={s.id}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className="premium-card p-10 bg-white/[0.02] border-white/5 hover:border-violet-500/40 transition-all duration-700 group cursor-pointer relative overflow-hidden"
                >
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <div className="space-y-8 relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[2rem] flex items-center justify-center text-white text-3xl font-black italic shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                         {s.name[0]}
                      </div>
                      <div className="space-y-4">
                         <span className="badge-lux">{s.category}</span>
                         <h3 className="text-display text-2xl italic text-white leading-tight group-hover:text-violet-400 transition-colors">{s.name}</h3>
                         <p className="text-[10px] text-white/20 leading-relaxed font-medium italic">"{s.bio}"</p>
                      </div>
                      <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                         <div className="flex items-center gap-2">
                            <Star className="w-3.5 h-3.5 text-violet-500 fill-current" />
                            <span className="text-display text-lg italic text-white">{s.rating}</span>
                         </div>
                         <p className="text-label text-[8px] text-white/20 uppercase tracking-widest">{s.projects} Missions</p>
                      </div>
                      <Link to="/profile" className="btn-ghost w-full py-4 text-[9px] mt-4 opacity-0 group-hover:opacity-100 transition-opacity">Audit Node <ArrowUpRight className="w-4 h-4" /></Link>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
