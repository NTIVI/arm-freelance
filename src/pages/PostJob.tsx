import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Briefcase, 
  Zap, 
  Clock, 
  Sparkles, 
  Command,
  ArrowUpRight,
  Shield,
  Layers,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export const PostJob = () => {
  const navigate = useNavigate();
  const { addJob, user } = useAppContext();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    type: 'fixed' as 'fixed' | 'hourly',
    category: 'Software Engineering',
    deadline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    addJob({
      ...formData,
      budget: parseInt(formData.budget),
      clientId: user.id,
      clientName: user.fullName
    });
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">
      <header className="flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-6 text-label text-[9px] text-white/30 hover:text-white transition-all group">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-500 transition-all duration-700 shadow-sm">
             <ArrowLeft className="w-5 h-5" />
          </div>
          {t('abort_deployment')}
        </Link>
        <div className="flex bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-xl">
           <span className="px-5 py-2 text-label text-[8px] text-white/20 uppercase tracking-widest">{t('execution_protocol')}: {t('initiate_request')}</span>
        </div>
      </header>

      <div className="space-y-6">
        <h1 className="text-display text-8xl italic leading-none bg-gradient-to-r from-white via-white to-white/20 bg-clip-text text-transparent uppercase">{t('initiate_request')}</h1>
        <div className="flex items-center gap-4">
           <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
           <p className="text-label text-[8px] tracking-[0.4em] text-white/40 uppercase">{t('broadcasting')}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="premium-card p-16 space-y-12 bg-white/[0.02] border-white/10 backdrop-blur-3xl shadow-2xl">
        <div className="space-y-4">
          <label className="text-label text-[8px] ml-6 flex items-center gap-3"><Command className="w-3.5 h-3.5 text-violet-400" /> {t('objective_title')}</label>
          <input 
            type="text" 
            required 
            className="input-lux py-8 text-xl" 
            placeholder={t('objective_placeholder')} 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <label className="text-label text-[8px] ml-6 flex items-center gap-3"><Layers className="w-3.5 h-3.5 text-fuchsia-400" /> {t('operational_domain')}</label>
            <select 
              className="input-lux py-8 text-lg appearance-none cursor-pointer"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option className="bg-[#0f0f0f]">{t('domain_software')}</option>
              <option className="bg-[#0f0f0f]">{t('domain_mobile_arch')}</option>
              <option className="bg-[#0f0f0f]">{t('domain_neural_networks')}</option>
              <option className="bg-[#0f0f0f]">{t('domain_visual')}</option>
            </select>
          </div>
          <div className="space-y-4">
            <label className="text-label text-[8px] ml-6 flex items-center gap-3"><Zap className="w-3.5 h-3.5 text-pink-400" /> {t('resource_allocation')} (AMD)</label>
            <input 
              type="number" 
              required 
              className="input-lux py-8 text-xl" 
              placeholder={t('budget_placeholder')} 
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <label className="text-label text-[8px] ml-6 flex items-center gap-3"><Clock className="w-3.5 h-3.5 text-indigo-400" /> {t('project_protocol')}</label>
            <div className="flex bg-white/5 p-1.5 rounded-3xl border border-white/5">
              <button 
                type="button"
                onClick={() => setFormData({...formData, type: 'fixed'})}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all ${formData.type === 'fixed' ? 'bg-violet-600 text-white shadow-xl' : 'text-white/20 hover:text-white'}`}
              >
                {t('fixed_price')}
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, type: 'hourly'})}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all ${formData.type === 'hourly' ? 'bg-violet-600 text-white shadow-xl' : 'text-white/20 hover:text-white'}`}
              >
                {t('hourly_sync')}
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-label text-[8px] ml-6 flex items-center gap-3"><Briefcase className="w-3.5 h-3.5 text-emerald-400" /> {t('deadline')}</label>
            <input 
              type="date" 
              required 
              className="input-lux py-8 text-xl" 
              value={formData.deadline}
              onChange={(e) => setFormData({...formData, deadline: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-label text-[8px] ml-6 flex items-center gap-3"><Sparkles className="w-3.5 h-3.5 text-violet-400" /> {t('technical_brief')}</label>
          <textarea 
            required 
            rows={6}
            className="input-lux h-48 py-8 resize-none" 
            placeholder={t('tech_brief_placeholder')}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <button type="submit" className="btn-lux w-full py-10 text-lg group">
          {t('deploy_mission')} <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform" />
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SecurityFeature icon={Shield} title={t('security_escrow_title')} desc={t('security_escrow_desc')} />
        <SecurityFeature icon={Zap} title={t('elite_matching_title')} desc={t('elite_matching_desc')} />
        <SecurityFeature icon={CheckCircle} title={t('verified_protocol_title')} desc={t('verified_protocol_desc')} />
      </div>
    </div>
  );
};

const SecurityFeature = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 premium-card bg-white/[0.01] border-white/5 space-y-4">
     <Icon className="w-8 h-8 text-violet-500/40" />
     <h4 className="text-display text-xl italic text-white leading-none">{title}</h4>
     <p className="text-[10px] text-white/20 leading-relaxed font-medium italic">{desc}</p>
  </div>
);
