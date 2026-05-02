import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export const Hero = ({ onStart }: { onStart: () => void }) => {
  const { t } = useLanguage();
  return (
    <section className="relative pt-48 pb-32 px-6 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/20 rounded-full blur-[180px] -z-10 translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[140px] -z-10 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto text-center space-y-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black tracking-[0.3em] text-primary uppercase shadow-xl backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>The Global Bridge for Armenian Talent</span>
          </div>
          <h1 className="text-7xl md:text-[10rem] font-black leading-[0.85] tracking-[-0.05em] font-display">
            Hire the <br /> 
            <span className="text-glow text-primary italic">Best</span> 
            <span className="opacity-20">.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-white/40 leading-relaxed font-medium">
            {t('hero_subtitle')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
        >
          <button onClick={onStart} className="btn-primary text-lg h-16 px-12 flex items-center space-x-4 group shadow-2xl">
            <span className="tracking-tight">{t('get_started')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
          </button>
          <button className="btn-secondary text-lg h-16 px-10">
            Explore Marketplace
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }} 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5 max-w-4xl mx-auto"
        >
           <TrustBadge icon={CheckCircle2} label="Verified Pros" />
           <TrustBadge icon={ShieldCheck} label="Safe Escrow" />
           <TrustBadge icon={Globe} label="International" />
           <TrustBadge icon={Sparkles} label="Premium Quality" />
        </motion.div>
      </div>
    </section>
  )
}

const TrustBadge = ({ icon: Icon, label }: any) => (
  <div className="flex flex-col items-center space-y-3 opacity-30 hover:opacity-100 transition-opacity cursor-default group">
    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/20 transition-colors">
       <Icon className="w-5 h-5 group-hover:text-primary transition-colors" />
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </div>
)
