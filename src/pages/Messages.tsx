import { useState } from 'react';
import { 
  Search, 
  Send, 
  Trash2, 
  Ban, 
  CheckCircle, 
  ShieldAlert,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export const Messages = () => {
  const { user } = useAppContext();
  const { t } = useLanguage();
  const [activeChat, setActiveChat] = useState<any>(null);
  const [message, setMessage] = useState('');

  // Mock Chats
  const chats = [
    { id: '1', name: 'Aris Vardanian', lastMsg: t('mock_msg_1'), online: true, role: t('role_freelancer') },
    { id: '2', name: 'Vigen Sargsyan', lastMsg: t('mock_msg_2'), online: false, role: t('role_client') },
    { id: '3', name: 'Mane Gasparyan', lastMsg: t('mock_msg_3'), online: true, role: t('role_freelancer') }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex gap-12 h-[calc(100vh-12rem)] overflow-hidden">
      {/* Chat Sidebar */}
      <aside className="w-96 flex flex-col gap-8 shrink-0">
        <div className="space-y-4">
           <h2 className="text-display text-5xl italic leading-none text-white uppercase">{t('dialogue_tunnels')}</h2>
           <p className="text-label text-[8px] tracking-[0.4em] text-white/20 uppercase">{t('secure_matrix')}</p>
        </div>

        <div className="relative group">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-violet-400 transition-colors" />
           <input 
            type="text" 
            placeholder={t('search_tunnels')} 
            className="input-lux pl-16 py-4 text-xs"
           />
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-4 hide-scrollbar">
           {chats.map(chat => (
             <button 
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`w-full text-left p-8 premium-card border-white/5 transition-all duration-500 relative overflow-hidden group ${activeChat?.id === chat.id ? 'bg-violet-600/20 border-violet-500/40 shadow-2xl scale-[1.02]' : 'bg-white/[0.01] hover:bg-white/[0.03]'}`}
             >
                {activeChat?.id === chat.id && <div className="absolute inset-y-0 left-0 w-1 bg-violet-500"></div>}
                <div className="flex items-center gap-6 relative z-10">
                   <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center text-white text-xl font-black italic shadow-lg">
                        {chat.name[0]}
                      </div>
                      {chat.online && <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[#050505] rounded-full animate-pulse"></div>}
                   </div>
                   <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-center">
                         <h4 className="text-display text-xl italic text-white truncate">{chat.name}</h4>
                         <span className="text-[7px] text-white/10 uppercase font-black tracking-widest">{t('chat_time_ago')}</span>
                      </div>
                      <p className="text-[10px] text-white/20 font-medium italic truncate">{chat.lastMsg}</p>
                   </div>
                </div>
             </button>
           ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col premium-card bg-white/[0.01] border-white/5 overflow-hidden shadow-2xl relative">
        <AnimatePresence mode="wait">
          {activeChat ? (
            <motion.div 
              key={activeChat.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
               {/* Chat Header */}
               <header className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-6">
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white font-black italic shadow-md">{activeChat.name[0]}</div>
                     <div>
                        <h3 className="text-display text-2xl italic text-white leading-none">{activeChat.name}</h3>
                        <p className="text-[9px] text-violet-400 uppercase tracking-widest font-bold mt-2">{activeChat.role} • {t('verified_sync')}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <ChatAction icon={Trash2} color="text-white/20 hover:text-red-500" />
                     <ChatAction icon={Ban} color="text-white/20 hover:text-fuchsia-500" />
                     <div className="h-8 w-[1px] bg-white/10 mx-2" />
                     <button className="btn-lux px-8 py-3 text-[9px] shadow-emerald-500/20">{t('confirm_completion')} <CheckCircle className="w-4 h-4" /></button>
                  </div>
               </header>

               {/* Messages Feed */}
               <div className="flex-1 overflow-y-auto p-12 space-y-8 hide-scrollbar bg-gradient-to-b from-transparent to-white/[0.01]">
                  <div className="flex flex-col items-center gap-4 py-8">
                     <ShieldAlert className="w-8 h-8 text-white/10" />
                     <p className="text-[9px] text-white/10 uppercase tracking-[0.4em] font-black">{t('encryption_active')}</p>
                  </div>

                  <MessageBubble me={false} text={t('msg_demo_1')} time="10:32 AM" />
                  <MessageBubble me={true} text={t('msg_demo_2')} time="10:35 AM" />
                  <MessageBubble me={false} text={t('msg_demo_3')} time="10:40 AM" />
               </div>

               {/* Input Area */}
               <div className="p-8 border-t border-white/5 bg-[#0a0a0a]">
                  <div className="relative group">
                     <input 
                      type="text" 
                      placeholder={t('type_transmission')} 
                      className="w-full bg-white/5 border border-white/10 rounded-[3rem] py-6 px-10 text-white font-bold outline-none focus:bg-white/10 focus:border-violet-500/30 transition-all shadow-inner"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                     />
                     <button className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-violet-600 text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-violet-500/20">
                        <Send className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center space-y-12 opacity-20">
               <div className="w-32 h-32 bg-white/5 rounded-[4rem] border-4 border-dashed border-white/10 flex items-center justify-center">
                  <MessageSquare className="w-12 h-12" />
               </div>
               <div className="space-y-4 text-center">
                  <p className="text-display text-4xl italic uppercase">{t('initialize_dialogue')}</p>
                  <p className="text-label text-[8px] tracking-[0.5em] uppercase">{t('select_node_sync')}</p>
               </div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const ChatAction = ({ icon: Icon, color }: any) => (
  <button className={`p-4 rounded-xl bg-white/5 border border-white/5 transition-all ${color}`}>
    <Icon className="w-4 h-4" />
  </button>
);

const MessageBubble = ({ me, text, time }: { me: boolean, text: string, time: string }) => (
  <div className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-xl p-8 rounded-[3rem] shadow-2xl relative group ${me ? 'bg-violet-600 text-white rounded-tr-none' : 'bg-white/5 border border-white/5 text-white/60 rounded-tl-none'}`}>
       <p className="text-sm font-medium italic leading-relaxed">"{text}"</p>
       <div className={`absolute bottom-[-24px] ${me ? 'right-6' : 'left-6'} opacity-0 group-hover:opacity-100 transition-opacity`}>
          <span className="text-[7px] text-white/20 uppercase font-black tracking-widest">{time}</span>
       </div>
    </div>
  </div>
);
