import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Plus, 
  Briefcase, 
  MessageSquare, 
  UserCircle, 
  LayoutGrid, 
  TrendingUp, 
  MapPin, 
  Clock, 
  DollarSign,
  Filter
} from 'lucide-react'

export const Dashboard = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'my-work' | 'messages' | 'profile'>('home')
  const isFreelancer = user.role === 'freelancer'

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="lg:w-64 shrink-0 space-y-2">
           <div className="glass p-6 rounded-[2rem] mb-6 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center font-bold">
                 {user.name?.[0]}
              </div>
              <div className="overflow-hidden">
                 <h3 className="font-bold truncate">{user.name}</h3>
                 <p className="text-[10px] text-white/30 uppercase tracking-widest">{user.role}</p>
              </div>
           </div>

           {[
             { id: 'home', label: isFreelancer ? 'Find Work' : 'Find Talent', icon: LayoutGrid },
             { id: 'my-work', label: isFreelancer ? 'My Proposals' : 'My Projects', icon: Briefcase },
             { id: 'messages', label: 'Messages', icon: MessageSquare },
             { id: 'profile', label: 'My Profile', icon: UserCircle },
           ].map(item => (
             <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
             >
                <item.icon className="w-5 h-5" />
                <span className="font-bold text-sm">{item.label}</span>
             </button>
           ))}
           
           <button onClick={onLogout} className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-red-500/50 hover:bg-red-500/10 transition-all mt-10">
              <span className="font-bold text-sm uppercase tracking-widest">Logout</span>
           </button>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 space-y-6">
           
           {/* Top Bar / Search */}
           <div className="flex items-center space-x-4">
              <div className="flex-1 glass p-2 rounded-2xl flex items-center px-4">
                 <Search className="w-5 h-5 text-white/20" />
                 <input type="text" placeholder={isFreelancer ? "Search jobs..." : "Search freelancers..."} className="bg-transparent border-none outline-none w-full p-3 text-sm" />
              </div>
              <button className="glass p-4 rounded-2xl hover:bg-white/10 transition-all"><Filter className="w-5 h-5" /></button>
              {!isFreelancer && (
                <button className="btn-primary flex items-center space-x-2 px-6">
                   <Plus className="w-5 h-5" />
                   <span className="hidden sm:inline">Post a Job</span>
                </button>
              )}
           </div>

           {/* Content Tabs */}
           <div className="space-y-6">
              {activeTab === 'home' && (
                <>
                  <div className="flex justify-between items-center">
                     <h2 className="text-2xl font-black">{isFreelancer ? 'Best Matches for You' : 'Top Armenian Specialists'}</h2>
                     <div className="text-xs text-white/30 uppercase font-black tracking-[0.2em]">Based on your skills</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {isFreelancer ? <MockJobFeed /> : <MockFreelancerFeed />}
                  </div>
                </>
              )}
              
              {activeTab === 'my-work' && (
                <div className="glass p-20 rounded-[3rem] text-center opacity-30 space-y-4">
                   <Briefcase className="w-16 h-16 mx-auto" />
                   <p className="text-xl font-medium">You haven't started any projects yet.</p>
                </div>
              )}
           </div>

        </main>

        {/* Right Info Bar */}
        <aside className="hidden xl:block w-72 shrink-0 space-y-6">
           <div className="glass p-8 rounded-[2.5rem] space-y-6">
              <h4 className="text-xs font-black text-white/30 uppercase tracking-[0.2em]">Your Stats</h4>
              <div className="space-y-4">
                 <StatItem label="Available Connects" value="80" color="text-primary" />
                 <StatItem label="Active Contracts" value="0" color="text-white" />
                 <StatItem label="JSS Score" value="N/A" color="text-secondary" />
              </div>
           </div>

           <div className="glass p-8 rounded-[2.5rem] space-y-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h4 className="font-black leading-tight">Upgrade to Plus for better visibility</h4>
              <button className="w-full py-3 bg-primary text-xs font-black rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20">Learn More</button>
           </div>
        </aside>

      </div>
    </div>
  )
}

const StatItem = ({ label, value, color }: any) => (
  <div className="flex justify-between items-center">
     <span className="text-xs text-white/40 font-medium">{label}</span>
     <span className={`text-lg font-black ${color}`}>{value}</span>
  </div>
)

const MockJobFeed = () => (
  <>
    {[1, 2, 3, 4].map(i => (
      <motion.div whileHover={{ y: -5 }} key={i} className="glass p-8 rounded-[2.5rem] space-y-6 border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
         <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2 text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
               <Clock className="w-3 h-3" /> <span>Just now</span>
            </div>
            <DollarSign className="w-5 h-5 text-green-500" />
         </div>
         <div className="space-y-2">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">React & Tailwind Expert for Fintech Project</h3>
            <p className="text-sm text-white/40 line-clamp-2">Looking for a senior Armenian developer to help build a modern fintech dashboard with real-time data visualization.</p>
         </div>
         <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Node.js'].map(s => (
              <span key={s} className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-white/60">{s}</span>
            ))}
         </div>
         <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs text-white/30">
            <div className="flex items-center space-x-1">
               <MapPin className="w-3 h-3" /> <span>USA (Remote)</span>
            </div>
            <span className="font-bold text-white/60">$45/hr</span>
         </div>
      </motion.div>
    ))}
  </>
)

const MockFreelancerFeed = () => (
  <>
    {[1, 2, 3, 4].map(i => (
      <motion.div whileHover={{ y: -5 }} key={i} className="glass p-8 rounded-[2.5rem] space-y-6 border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
         <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center font-black text-2xl text-primary">A</div>
            <div>
               <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Armen S.</h3>
               <p className="text-xs text-white/40">Senior UX Designer • Yerevan</p>
            </div>
         </div>
         <p className="text-sm text-white/40 line-clamp-2">Ex-Google designer with 10+ years of experience in creating digital products that people love.</p>
         <div className="flex justify-between items-center pt-4 border-t border-white/5">
            <div className="flex items-center space-x-1 text-xs font-bold">
               <span className="text-yellow-500">★</span> <span>4.9 (124 reviews)</span>
            </div>
            <span className="text-lg font-black">$60/hr</span>
         </div>
         <button className="w-full py-4 bg-white/5 hover:bg-white text-white hover:text-black font-black rounded-2xl transition-all text-xs uppercase tracking-widest">Hire Now</button>
      </motion.div>
    ))}
  </>
)
