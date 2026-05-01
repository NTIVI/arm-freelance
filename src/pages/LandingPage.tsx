import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export const Hero = ({ onStart }: { onStart: () => void }) => {
  const { t } = useLanguage();
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[160px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto text-center space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-black tracking-widest text-primary uppercase">
            <Sparkles className="w-4 h-4" />
            <span>The Premier Marketplace</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">
            {t('hero_title').split('.')[0]}<span className="text-primary">.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 leading-relaxed">
            {t('hero_subtitle')}
          </p>
        </motion.div>

        <div className="flex justify-center gap-4">
          <button onClick={onStart} className="btn-primary text-lg h-16 px-12 flex items-center space-x-3 group">
            <span>{t('get_started')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap justify-center gap-8 text-white/30 text-sm font-bold uppercase tracking-widest">
          <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4" /> <span>Verified Pros</span></div>
          <div className="flex items-center space-x-2"><ShieldCheck className="w-4 h-4" /> <span>Secure Escrow</span></div>
          <div className="flex items-center space-x-2"><Globe className="w-4 h-4" /> <span>Global Payments</span></div>
        </motion.div>
      </div>
    </section>
  )
}
