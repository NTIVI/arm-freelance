import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Briefcase, ChevronRight, X, Sparkles, ArrowLeft, Camera, Upload } from "lucide-react";

export default function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [role, setRole] = useState<'client' | 'creator' | null>(null);

  if (role) {
    return <RegistrationScreen role={role} onBack={() => setRole(null)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-2000"></div>

      <div className="z-10 w-full max-w-md flex flex-col h-full justify-between py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12 space-y-6"
        >
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 mb-4 shadow-[0_0_40px_rgba(139,92,246,0.3)]">
            <Sparkles className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            ARM Freelance
          </h1>
          <p className="text-lg text-white/60 font-medium">
            Найди идеального исполнителя или новые заказы за пару кликов.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full space-y-4 mt-16"
        >
          <button 
            onClick={() => setRole('client')}
            className="group relative w-full flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-purple-500/25 active:scale-[0.98] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            <div className="flex items-center space-x-4 relative z-10">
              <div className="bg-white/20 p-2 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">Я Клиент</span>
            </div>
            <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white transition-colors relative z-10" />
          </button>

          <button 
            onClick={() => setRole('creator')}
            className="group relative w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300 active:scale-[0.98]"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-2 rounded-xl">
                <Briefcase className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-xl font-semibold text-white">Я Создатель</span>
            </div>
            <ChevronRight className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button 
            onClick={() => setShowInfo(true)}
            className="text-white/40 hover:text-white/80 transition-colors text-sm font-medium underline decoration-white/20 underline-offset-4"
          >
            Какая разница?
          </button>
        </motion.div>
      </div>

      {/* Info Bottom Sheet / Modal */}
      <AnimatePresence>
        {showInfo && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInfo(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="absolute bottom-0 left-0 right-0 bg-[#121214] border-t border-white/10 p-6 rounded-t-3xl z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Роли в приложении</h2>
                <button 
                  onClick={() => setShowInfo(false)}
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/70" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Клиент</h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Вы ищете специалистов для выполнения задач. Можете создавать объявления с описанием проекта, бюджетом и сроками, а также выбирать лучших исполнителей из откликнувшихся.
                  </p>
                </div>
                
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <Briefcase className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">Создатель</h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Вы предлагаете свои услуги. Создавайте посты с вашими навыками, собирайте портфолио и откликайтесь на интересные заказы от Клиентов.
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowInfo(false)}
                className="w-full mt-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                Понятно
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function RegistrationScreen({ role, onBack }: { role: 'client' | 'creator', onBack: () => void }) {
  const isCreator = role === 'creator';
  const categories = [
    "Разработка сайтов", "Разработка мобильных приложений", "Дизайн",
    "Продажи", "Маркетинг", "Обмен криптовалюты", "Программирование", "SMM"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-black text-white p-6 relative overflow-y-auto"
    >
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30"></div>
      
      <div className="max-w-md mx-auto relative z-10 pb-12">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors mb-6 flex items-center space-x-2">
          <ArrowLeft className="w-5 h-5 text-white/70" />
          <span className="text-sm font-medium text-white/70 pr-2">Назад</span>
        </button>

        <h2 className="text-3xl font-bold mb-2">
          {isCreator ? "Профиль Создателя" : "Профиль Клиента"}
        </h2>
        <p className="text-white/50 text-sm mb-8">
          Заполните информацию о себе, чтобы начать работу в ARM Freelance.
        </p>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Регистрация успешна!"); }}>
          
          {/* Avatar Upload */}
          <div className="flex flex-col items-center justify-center space-y-3 mb-8">
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group cursor-pointer">
              <Camera className="w-8 h-8 text-white/30 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Upload className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-sm text-white/50">Загрузить фото</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Имя</label>
              <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="Иван" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Фамилия</label>
              <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="Иванов" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Возраст</label>
            <input required type="number" min="14" max="100" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="18" />
          </div>

          {isCreator && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Сфера деятельности</label>
                <select required className="w-full bg-[#1c1c1e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none">
                  <option value="" disabled selected>Выберите категорию</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Опыт работы</label>
                <select required className="w-full bg-[#1c1c1e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none">
                  <option value="" disabled selected>Укажите опыт</option>
                  <option value="no">Без опыта</option>
                  <option value="1-3">1 - 3 года</option>
                  <option value="3-5">3 - 5 лет</option>
                  <option value="5+">Более 5 лет</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Что вы умеете? (Описание)</label>
                <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none" placeholder="Расскажите о своих навыках и технологиях..."></textarea>
              </div>
            </>
          )}

          <button 
            type="submit"
            className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 active:scale-[0.98]"
          >
            Продолжить
          </button>
        </form>
      </div>
    </motion.div>
  );
}
