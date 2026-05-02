import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, ShieldCheck, Globe, Zap, Briefcase, Users, LayoutDashboard } from 'lucide-react'
export const Hero = ({ onStart }: { onStart: () => void }) => {

  return (
    <div className="flex flex-col">
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Subtle glowing orbs matching dashboard vibe */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-[#121212] border border-white/10 rounded-full text-[11px] font-bold tracking-widest text-primary uppercase shadow-lg shadow-primary/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Armenia Freelance Platform v1.0</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight text-white">
              Elevate your business with <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
                top-tier Armenian talent
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-white/50 leading-relaxed font-medium">
              Join the most professional marketplace. Connect with verified experts, manage projects effortlessly, and scale your operations with our advanced dashboard.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <button onClick={onStart} className="btn-primary w-full sm:w-auto h-12 px-8 flex items-center justify-center space-x-3 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] group">
              <span className="text-sm font-bold tracking-wide">GET STARTED</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="h-12 px-8 bg-[#121212] border border-white/10 text-white font-semibold rounded-lg hover:bg-white/5 transition-all text-sm tracking-wide">
              EXPLORE MARKETPLACE
            </button>
          </motion.div>

          {/* Abstract Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="rounded-[2rem] bg-[#0B0E14] border border-white/10 p-4 shadow-2xl shadow-black/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0E14] z-10"></div>
              {/* Fake Dashboard UI */}
              <div className="grid grid-cols-12 gap-4 opacity-70">
                <div className="col-span-3 space-y-4">
                  <div className="h-32 bg-[#121212] border border-white/5 rounded-2xl"></div>
                  <div className="h-64 bg-[#121212] border border-white/5 rounded-2xl"></div>
                </div>
                <div className="col-span-6 space-y-4">
                  <div className="flex gap-4">
                     <div className="h-24 flex-1 bg-[#121212] border border-white/5 rounded-2xl flex items-center p-4"><div className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center"><Zap className="w-4 h-4" /></div></div>
                     <div className="h-24 flex-1 bg-[#121212] border border-white/5 rounded-2xl flex items-center p-4"><div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center"><Briefcase className="w-4 h-4" /></div></div>
                     <div className="h-24 flex-1 bg-[#121212] border border-white/5 rounded-2xl flex items-center p-4"><div className="w-8 h-8 rounded-full bg-purple-400/20 text-purple-400 flex items-center justify-center"><Users className="w-4 h-4" /></div></div>
                  </div>
                  <div className="h-48 bg-[#121212] border border-white/5 rounded-2xl"></div>
                </div>
                <div className="col-span-3 space-y-4">
                  <div className="h-48 bg-[#121212] border border-white/5 rounded-2xl"></div>
                  <div className="h-40 bg-[#121212] border border-white/5 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-[#080808]">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black text-white">Professional toolkit included.</h2>
            <p className="text-white/50 text-sm font-medium tracking-wide">Everything you need to manage freelance operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={LayoutDashboard} 
              title="Advanced Dashboard" 
              desc="Track earnings, active applications, and available connects in real-time with our sleek UI."
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Verified Identities" 
              desc="Work with confidence. Every freelancer and client undergoes a strict verification process."
            />
            <FeatureCard 
              icon={Globe} 
              title="Global Reach" 
              desc="Seamlessly collaborate with talent across borders with integrated payment systems."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
  <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 hover:border-primary/30 transition-colors group">
    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
      <Icon className="w-6 h-6 text-white/70 group-hover:text-primary transition-colors" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
  </div>
)
