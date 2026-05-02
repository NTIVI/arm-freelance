import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { 
  Search, 
  Briefcase, 
  MessageSquare, 
  LayoutGrid, 
  MapPin, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Settings, 
  TrendingUp,
  FileText,
  CreditCard,
  ChevronRight,
  Plus,
  Building2,
  List
} from 'lucide-react'

// --- Main Dashboard ---
export const Dashboard = ({ onLogout }: { user: any, onLogout: () => void }) => {
  useLanguage()
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'projects' | 'catalog' | 'messages' | 'profile'>('home')
  const [searchQuery, setSearchQuery] = useState('')
  
  return (
    <div className="min-h-screen bg-[#0E0E10] text-white font-sans flex overflow-hidden">
      
      {/* --- Sidebar --- */}
      <aside className="w-72 flex flex-col h-screen shrink-0 bg-[#0E0E10] border-r border-white/5 py-8 px-6">
         {/* Avatar Card */}
         <div className="mb-10 p-8 rounded-3xl bg-[#131315] border border-white/5 flex flex-col items-center justify-center space-y-4 shadow-xl">
            <div className="w-20 h-20 rounded-full border-2 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center bg-indigo-500/10">
               {/* Empty ring avatar like in screenshot */}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Фрилансер</span>
         </div>

         {/* Navigation */}
         <nav className="flex-1 space-y-2">
            <SidebarLink 
               active={activeTab === 'home'} 
               onClick={() => setActiveTab('home')} 
               icon={LayoutGrid} 
               label="Панель управления" 
            />
            <SidebarLink 
               active={activeTab === 'search'} 
               onClick={() => setActiveTab('search')} 
               icon={Search} 
               label="Поиск работы" 
            />
            <SidebarLink 
               active={activeTab === 'projects'} 
               onClick={() => setActiveTab('projects')} 
               icon={Briefcase} 
               label="Мои проекты" 
            />
            <SidebarLink 
               active={activeTab === 'catalog'} 
               onClick={() => setActiveTab('catalog')} 
               icon={List} 
               label="Каталог услуг" 
            />
            <SidebarLink 
               active={activeTab === 'messages'} 
               onClick={() => setActiveTab('messages')} 
               icon={MessageSquare} 
               label="Сообщения" 
            />
            <SidebarLink 
               active={activeTab === 'profile'} 
               onClick={() => setActiveTab('profile')} 
               icon={Settings} 
               label="Настройки профиля" 
            />
         </nav>

         <div className="pt-6 mt-6">
            <button 
               onClick={onLogout}
               className="flex items-center space-x-4 px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-500/80 hover:text-red-500 transition-colors w-full"
            >
               <X className="w-4 h-4" />
               <span>Выйти из сессии</span>
            </button>
         </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden p-8">
         <div className="max-w-[1400px] mx-auto w-full h-full flex flex-col">
            
            {/* Search Bar */}
            <header className="mb-10 flex shrink-0">
               <div className="relative w-full max-w-2xl">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input 
                     type="text" 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     placeholder="Поиск топовых проектов..." 
                     className="w-full bg-[#131315] border border-white/5 rounded-full py-4 pl-14 pr-24 text-sm outline-none focus:border-white/20 transition-colors placeholder:text-white/20"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-white/30 border border-white/10">
                     CMD K
                  </div>
               </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
               <div className="flex gap-10">
                  
                  {/* Center Column */}
                  <div className="flex-1 space-y-12">
                     
                     {/* Stat Cards */}
                     <div className="grid grid-cols-3 gap-6">
                        <StatCard 
                           icon={TrendingUp} 
                           iconColor="text-emerald-400"
                           iconBg="bg-emerald-400/10"
                           title="EARNINGS THIS MONTH"
                           trend="+12.5%"
                           value="$0.00"
                        />
                        <StatCard 
                           icon={FileText} 
                           iconColor="text-indigo-400"
                           iconBg="bg-indigo-400/10"
                           title="ACTIVE APPLICATIONS"
                           trend="+12.5%"
                           value="1"
                        />
                        <StatCard 
                           icon={Sparkles} 
                           iconColor="text-purple-400"
                           iconBg="bg-purple-400/10"
                           title="AVAILABLE CONNECTS"
                           trend="+12.5%"
                           value="80"
                        />
                     </div>

                     {/* Recommended Projects */}
                     <div className="space-y-6">
                        <div className="flex justify-between items-end mb-6">
                           <div>
                              <h2 className="text-3xl font-black mb-1">Recommended for you</h2>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Curated based on your professional DNA</p>
                           </div>
                           <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest flex items-center space-x-1">
                              <span>View Marketplace</span>
                              <ChevronRight className="w-4 h-4" />
                           </button>
                        </div>

                        <div className="space-y-6">
                           {/* Single Recommended Job Card */}
                           <div className="bg-[#131315] border border-white/5 p-8 rounded-[2rem] hover:border-white/10 transition-colors group cursor-pointer relative overflow-hidden">
                              <div className="flex justify-between items-start mb-6">
                                 <div className="flex items-center space-x-3">
                                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-md">Web Development</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Posted just now</span>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-3xl font-black text-emerald-400">2000</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Fixed Price</p>
                                 </div>
                              </div>
                              
                              <h3 className="text-3xl font-bold mb-4 w-3/4">UI/UX Designer for Fint...</h3>
                              <p className="text-sm text-white/40 leading-relaxed mb-8 w-3/4 line-clamp-2">
                                 We are looking for a talented UI/UX designer to create a modern fintech application for the local market.
                              </p>
                              
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
                                    <div className="flex items-center space-x-2"><MapPin className="w-3.5 h-3.5 text-indigo-400" /> <span>Yerevan, AM</span></div>
                                    <div className="flex items-center space-x-2"><Users className="w-3.5 h-3.5 text-indigo-400" /> <span>0 Proposals</span></div>
                                 </div>
                                 
                                 <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    <ChevronRight className="w-5 h-5 text-white/50" />
                                 </div>
                              </div>
                           </div>

                           {/* Secondary Card (Visual fill) */}
                           <div className="bg-[#131315] border border-white/5 p-8 rounded-[2rem] opacity-50 pointer-events-none">
                              <div className="flex items-center space-x-3 mb-6">
                                 <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest rounded-md">Mobile Apps</span>
                                 <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Posted 2h ago</span>
                              </div>
                              <h3 className="text-3xl font-bold mb-4 w-3/4">Senior React Native Dev...</h3>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Right Sidebar */}
                  <div className="w-80 shrink-0 space-y-8">
                     
                     {/* Account Summary */}
                     <div className="bg-[#131315] border border-white/5 p-6 rounded-[2rem] space-y-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Account Summary</h4>
                        
                        <div className="space-y-2">
                           <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/30">
                              <span>Profile completeness:</span>
                              <span className="text-white">35%</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500 w-[35%]" />
                           </div>
                        </div>

                        <div className="space-y-3 pt-4">
                           <button className="w-full flex items-center justify-between p-4 bg-[#1A1A1D] rounded-2xl hover:bg-[#202023] transition-colors border border-white/5">
                              <div className="flex items-center space-x-3">
                                 <ShieldCheck className="w-5 h-5 text-indigo-400" />
                                 <span className="text-sm font-bold">Identity verified</span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-white/30" />
                           </button>
                           
                           <button className="w-full flex items-center justify-between p-4 bg-[#1A1A1D] rounded-2xl hover:bg-[#202023] transition-colors border border-white/5">
                              <div className="flex items-center space-x-3">
                                 <CreditCard className="w-5 h-5 text-purple-400" />
                                 <span className="text-sm font-bold">Payment method</span>
                              </div>
                              <Plus className="w-4 h-4 text-white/30" />
                           </button>
                        </div>
                     </div>

                     {/* Upcoming Deadlines */}
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30">Upcoming Deadlines</h4>
                        <p className="text-xs font-medium text-white/20 italic">No active contracts with deadlines.</p>
                     </div>

                     {/* Agency CTA */}
                     <div className="bg-gradient-to-b from-[#1E1B38] to-[#131315] border border-indigo-500/20 p-8 rounded-[2rem] space-y-6 relative overflow-hidden">
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center">
                           <Building2 className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold mb-3">Start an Agency to scale your business</h4>
                           <p className="text-xs text-white/50 leading-relaxed">Collaborate with other specialists under one banner and win bigger projects.</p>
                        </div>
                        <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors">
                           Create Agency
                        </button>
                     </div>

                  </div>

               </div>
            </div>
         </div>
      </main>
    </div>
  )
}

// --- Sub-components ---

const SidebarLink = ({ icon: Icon, label, active, onClick }: any) => (
   <button
      onClick={onClick}
      className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${active ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'text-white/40 hover:bg-white/5 hover:text-white/80'}`}
   >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-bold">{label}</span>
   </button>
)

const StatCard = ({ icon: Icon, iconColor, iconBg, title, trend, value }: any) => (
   <div className="bg-[#131315] border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between h-48 hover:border-white/10 transition-colors">
      <div className="flex justify-between items-start">
         <div className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
         </div>
      </div>
      <div className="space-y-1">
         <div className="flex items-center space-x-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30">{title}</h4>
            <span className="text-[10px] font-bold text-emerald-400">{trend}</span>
         </div>
         <p className="text-4xl font-black">{value}</p>
      </div>
   </div>
)

const Users = ({ className }: { className?: string }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
   </svg>
)

