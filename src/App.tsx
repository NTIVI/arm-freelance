import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Briefcase, ChevronRight, X, Sparkles, ArrowLeft, Camera, Upload, Home, List, MessageCircle, UserCircle, Search, Plus, Send, Settings, ShieldAlert, Trash2 } from "lucide-react";

// --- Types ---
type Role = 'client' | 'creator' | 'admin';
type Tab = 'home' | 'my' | 'chats' | 'profile';

interface Review {
  id: number;
  from: string;
  stars: number;
  comment: string;
}

interface Job {
  id: number;
  title: string;
  category: string;
  budget: string;
  desc: string;
  deadline: string;
  photo?: string | null;
  status?: 'open' | 'in_progress' | 'completed';
  candidates?: any[];
  selectedCandidate?: any;
}

// --- Main App Component ---
export default function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Load state from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("arm_user_profile");
    const savedRole = localStorage.getItem("arm_user_role");
    if (savedProfile && savedRole) {
      setUserProfile(JSON.parse(savedProfile));
      setRole(savedRole as Role);
      setIsRegistered(true);
    }
  }, []);

  const saveToAccounts = (profile: any, role: Role) => {
    const savedAccounts = JSON.parse(localStorage.getItem("arm_accounts") || "[]");
    const updatedAccounts = [...savedAccounts.filter((a: any) => a.username !== profile.username), { ...profile, role }];
    localStorage.setItem("arm_accounts", JSON.stringify(updatedAccounts));
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
          resolve(compressedBase64);
        };
      };
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("arm_user_profile");
    localStorage.removeItem("arm_user_role");
    setUserProfile(null);
    setRole(null);
    setIsRegistered(false);
  };

  if (isRegistered && role === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (isRegistered && role) {
    return <Dashboard role={role} userProfile={userProfile} onLogout={handleLogout} compressImage={compressImage} />;
  }

  if (role && role !== 'admin') {
    return <RegistrationScreen role={role} onBack={() => setRole(null)} onRegister={(profile) => {
      setUserProfile(profile);
      setRole(profile.role || role);
      setIsRegistered(true);
      localStorage.setItem("arm_user_profile", JSON.stringify(profile));
      localStorage.setItem("arm_user_role", profile.role || role);
      saveToAccounts(profile, profile.role || role);
    }} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-pulse delay-700"></div>

      <div className="z-10 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-12 py-12">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-1 text-left space-y-8">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.3)]">
            <Sparkles className="w-12 h-12 text-purple-400" />
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40 leading-none">
              ARM <br /> FREELANCE
            </h1>
            <p className="text-xl text-white/50 font-medium max-w-md">Платформа нового поколения для поиска специалистов и заказов. Просто, быстро, надежно.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-4">
             <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-white/70">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                <span>1,240 исполнителей</span>
             </div>
             <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-white/70">
                <span>450 активных заказов</span>
             </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full max-w-md space-y-4 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-8">Начните прямо сейчас</h2>
          
          <button onClick={() => setRole('client')} className="group relative w-full flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-500 shadow-xl shadow-purple-500/20 active:scale-[0.98] overflow-hidden">
            <div className="flex items-center space-x-4 relative z-10">
              <div className="bg-white/20 p-3 rounded-xl"><Users className="w-6 h-6 text-white" /></div>
              <div className="text-left">
                <span className="block text-xl font-bold text-white leading-none">Я Клиент</span>
                <span className="text-white/60 text-xs mt-1 block">Ищу исполнителя</span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-white/70 group-hover:translate-x-1 transition-transform relative z-10" />
          </button>

          <button onClick={() => setRole('creator')} className="group relative w-full flex items-center justify-between p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-500 active:scale-[0.98]">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-3 rounded-xl"><Briefcase className="w-6 h-6 text-purple-400" /></div>
              <div className="text-left">
                <span className="block text-xl font-bold text-white leading-none">Я Создатель</span>
                <span className="text-white/50 text-xs mt-1 block">Ищу работу</span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-white/30 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="pt-6 text-center">
            <button onClick={() => setShowInfo(true)} className="text-white/40 hover:text-white/80 transition-colors text-sm font-medium underline decoration-white/20 underline-offset-8">
              Узнать больше о возможностях
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showInfo && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowInfo(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#121214] border border-white/10 p-8 rounded-3xl z-[60] shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Роли в системе</h2>
                <button onClick={() => setShowInfo(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-colors"><X className="w-6 h-6 text-white/70" /></button>
              </div>
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/5 p-6 rounded-2xl group hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center space-x-4 mb-3"><Users className="w-8 h-8 text-blue-400" /><h3 className="text-xl font-bold text-white">Клиент</h3></div>
                  <p className="text-white/50 text-sm leading-relaxed">Публикуйте задания, выбирайте лучших исполнителей и контролируйте процесс выполнения ваших идей в реальном времени. Вы устанавливаете бюджет и сроки.</p>
                </div>
                <div className="bg-white/5 border border-white/5 p-6 rounded-2xl group hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center space-x-4 mb-3"><Briefcase className="w-8 h-8 text-purple-400" /><h3 className="text-xl font-bold text-white">Создатель</h3></div>
                  <p className="text-white/50 text-sm leading-relaxed">Предлагайте свои услуги миру, собирайте впечатляющее портфолио и получайте прямые заказы от клиентов без посредников. Вы сам себе босс.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                   <p className="text-xs text-white/30 leading-relaxed italic">Приложение соединяет заказчиков и исполнителей напрямую. Мы обеспечиваем удобный поиск, фильтрацию по сферам деятельности и систему откликов.</p>
                </div>
              </div>
              <button onClick={() => setShowInfo(false)} className="w-full mt-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all active:scale-[0.98]">Все понятно</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Registration Screen ---
function RegistrationScreen({ role, onBack, onRegister }: { role: Role, onBack: () => void, onRegister: (data: any) => void }) {
  const isCreator = role === 'creator';
  const categories = ["Разработка сайтов", "Разработка мобильных приложений", "Дизайн", "Продажи", "Маркетинг", "Обмен криптовалюты", "Программирование", "SMM", "Копирайтинг"];
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [step, setStep] = useState<'auth' | 'profile'>('auth');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [exp, setExp] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readerEvent) => {
        const img = new Image();
        img.src = readerEvent.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const size = 300;
          canvas.width = size;
          canvas.height = size;
          canvas.getContext("2d")?.drawImage(img, 0, 0, size, size);
          setAvatarPreview(canvas.toDataURL("image/jpeg", 0.8));
        };
      };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const accounts = JSON.parse(localStorage.getItem("arm_accounts") || "[]");

    if (isLoginMode) {
      if (username === 'admin' && password === 'admin') {
        onRegister({ username: 'admin', role: 'admin', name: 'Administrator' });
        return;
      }
      const user = accounts.find((a: any) => a.username === username && a.password === password);
      if (user) {
        onRegister(user);
      } else {
        setError("Неверный логин или пароль");
        setTimeout(() => setError(null), 3000);
      }
    } else {
      if (step === 'auth') {
        if (accounts.some((a: any) => a.username === username)) {
          setError("Этот ник уже занят");
          setTimeout(() => setError(null), 3000);
          return;
        }
        if (password !== confirmPassword) {
          setError("Пароли не совпадают");
          setTimeout(() => setError(null), 3000);
          return;
        }
        setStep('profile');
      } else {
        onRegister({ username, password, name, surname, age, category, exp, desc, avatar: avatarPreview, portfolio: [], role });
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center relative overflow-y-auto">
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl bg-white/5 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl relative z-10">
        <button onClick={onBack} className="absolute top-10 left-10 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors flex items-center space-x-2 group">
          <ArrowLeft className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-3">
            {isLoginMode ? "С возвращением!" : (step === 'auth' ? "Создание аккаунта" : (isCreator ? "Профиль Создателя" : "Профиль Клиента"))}
          </h2>
          <p className="text-white/50">
            {isLoginMode ? "Рады видеть вас снова на ARM Freelance." : (step === 'auth' ? "Шаг 1: Основные данные для входа." : "Шаг 2: Расскажите немного о себе.")}
          </p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm mb-8 text-center">
            {error}
          </motion.div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {(isLoginMode || step === 'auth') && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/60 ml-1">Никнейм</label>
                <input required value={username} onChange={e=>setUsername(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-all" placeholder="Напр: best_dev_2024" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/60 ml-1">Пароль</label>
                <input required value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-all" placeholder="••••••••" />
              </div>
              {!isLoginMode && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/60 ml-1">Подтверждение пароля</label>
                  <input required value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} type="password" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-all" placeholder="••••••••" />
                </div>
              )}
            </div>
          )}

          {!isLoginMode && step === 'profile' && (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center space-y-3 mb-4">
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleAvatarChange} />
                <div onClick={() => fileInputRef.current?.click()} className="w-28 h-28 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group cursor-pointer shadow-xl">
                  {avatarPreview ? <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" /> : <Camera className="w-10 h-10 text-white/20 group-hover:scale-110 transition-transform" />}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><Upload className="w-8 h-8 text-white" /></div>
                </div>
                <span className="text-sm text-white/40">Нажмите, чтобы загрузить фото</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/60 ml-1">Имя</label>
                  <input required value={name} onChange={e=>setName(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-all" placeholder="Иван" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/60 ml-1">Фамилия</label>
                  <input required value={surname} onChange={e=>setSurname(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-all" placeholder="Иванов" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/60 ml-1">Возраст</label>
                <input required value={age} onChange={e=>setAge(e.target.value)} type="number" min="14" max="100" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-all" placeholder="18" />
              </div>

              {isCreator && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white/60 ml-1">Сфера</label>
                      <select required value={category} onChange={e=>setCategory(e.target.value)} className="w-full bg-[#1c1c1e] border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 appearance-none">
                        <option value="" disabled>Категория</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white/60 ml-1">Опыт</label>
                      <select required value={exp} onChange={e=>setExp(e.target.value)} className="w-full bg-[#1c1c1e] border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 appearance-none">
                        <option value="" disabled>Опыт</option>
                        <option value="Без опыта">Без опыта</option>
                        <option value="1-3 года">1 - 3 года</option>
                        <option value="3-5 лет">3 - 5 лет</option>
                        <option value="Более 5 лет">Более 5 лет</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/60 ml-1">О себе</label>
                    <textarea required value={desc} onChange={e=>setDesc(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-all resize-none" placeholder="Расскажите о ваших навыках и проектах..."></textarea>
                  </div>
                </>
              )}
            </div>
          )}
          
          <button type="submit" className="w-full py-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-purple-500/20 active:scale-[0.98]">
            {isLoginMode ? "Войти в систему" : (step === 'auth' ? "Продолжить" : "Завершить регистрацию")}
          </button>

          <div className="text-center pt-2">
            <button type="button" onClick={() => {
              if (step === 'profile') setStep('auth');
              else setIsLoginMode(!isLoginMode);
            }} className="text-sm text-white/30 hover:text-white/60 transition-colors">
              {isLoginMode ? "Еще нет аккаунта? Зарегистрироваться" : (step === 'profile' ? "Вернуться к логину" : "Уже есть аккаунт? Войти")}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// --- Dashboard Component ---
function Dashboard({ role, userProfile, onLogout, compressImage }: { role: Role, userProfile: any, onLogout: () => void, compressImage: any }) {
  const isCreator = role === 'creator';
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const categories = ["Все", "Разработка сайтов", "Разработка мобильных приложений", "Дизайн", "Продажи", "Маркетинг", "Обмен криптовалюты", "Программирование", "SMM"];
  const [activeFilter, setActiveFilter] = useState("Все");

  const [jobs, setJobs] = useState<Job[]>([]);
  const [myItems, setMyItems] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any | null>(null);
  const [portfolio, setPortfolio] = useState<string[]>(userProfile?.portfolio || []);
  const [selectedCandidateProfile, setSelectedCandidateProfile] = useState<any | null>(null);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const jobPhotoRef = useRef<HTMLInputElement>(null);
  const [jobPhotoPreview, setJobPhotoPreview] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = Date.now();
    if (isCreator) {
      const newItem = {
        id, 
        title: formData.get("title") as string, 
        category: formData.get("category") as string, 
        price: formData.get("price") as string, 
        desc: formData.get("desc") as string, 
        duration: formData.get("duration") as string,
        creatorName: userProfile.name,
        creatorAvatar: userProfile.avatar
      };
      setMyItems([newItem, ...myItems]);
      // Save globally for Clients to see
      const globalServices = JSON.parse(localStorage.getItem("arm_global_services") || "[]");
      localStorage.setItem("arm_global_services", JSON.stringify([newItem, ...globalServices]));
    } else {
      const newJob: Job = {
        id,
        title: formData.get("title") as string,
        category: formData.get("category") as string,
        budget: formData.get("budget") as string,
        desc: formData.get("desc") as string,
        deadline: formData.get("deadline") as string,
        photo: jobPhotoPreview,
        status: 'open',
        candidates: []
      };
      setJobs([newJob, ...jobs]);
      setMyItems([newJob, ...myItems]);
      // Save globally for Creators to see
      const globalJobs = JSON.parse(localStorage.getItem("arm_global_jobs") || "[]");
      localStorage.setItem("arm_global_jobs", JSON.stringify([newJob, ...globalJobs]));
    }
    setShowCreateModal(false);
    setJobPhotoPreview(null);
    showToast("Успешно добавлено!");
  };

  const handleRespond = (jobId: number) => {
    setJobs(prevJobs => prevJobs.map(job => {
      if (job.id === jobId) {
        const alreadyResponded = job.candidates?.some(c => c.username === userProfile.username);
        if (alreadyResponded) {
          showToast("Вы уже откликнулись!");
          return job;
        }
        showToast("Отклик успешно отправлен!");
        return { ...job, candidates: [...(job.candidates || []), { ...userProfile, id: Date.now() }] };
      }
      return job;
    }));
  };

  const handleSelectCandidate = (jobId: number, candidate: any) => {
    setJobs(prevJobs => prevJobs.map(job => {
      if (job.id === jobId) {
        return { ...job, status: 'in_progress', selectedCandidate: candidate };
      }
      return job;
    }));
    setMyItems(prev => prev.map(item => {
      if (item.id === jobId) {
        return { ...item, status: 'in_progress', selectedCandidate: candidate };
      }
      return item;
    }));
    showToast(`Исполнитель ${candidate.name} выбран!`);
  };

  const startChat = (personName: string, itemTitle: string) => {
    const newChat = { id: Date.now(), name: personName, topic: itemTitle, messages: [] };
    setChats([newChat, ...chats]);
    setActiveTab('chats');
    showToast("Чат создан!");
  };

  const handlePortfolioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressed = await compressImage(file);
      setPortfolio([...portfolio, compressed]);
      showToast("Фото добавлено в портфолио");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 30, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className="fixed top-0 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-2xl z-[100] text-sm font-bold shadow-2xl flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Desktop Navbar */}
      <header className="sticky top-0 z-50 px-6 py-4 bg-black/40 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter">ARM FREELANCE</span>
            </div>

            <nav className="hidden md:flex items-center space-x-1">
              {[
                { id: 'home', label: 'Биржа', icon: Home },
                { id: 'my', label: isCreator ? 'Мои услуги' : 'Мои задания', icon: Briefcase },
                { id: 'chats', label: 'Сообщения', icon: MessageCircle },
                { id: 'profile', label: 'Профиль', icon: UserCircle },
              ].map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === item.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
                >
                  <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-purple-400' : ''}`} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
             <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center">
                        {userProfile?.avatar ? <img src={userProfile.avatar} className="w-full h-full object-cover" /> : <UserCircle className="w-full h-full text-white/20" />}
                    </div>
                </div>
                <span className="text-sm font-bold">{userProfile?.name}</span>
             </div>
             <button onClick={onLogout} className="p-2.5 bg-white/5 hover:bg-red-500/20 rounded-2xl border border-white/5 text-white/40 hover:text-red-400 transition-all">
                <Trash2 className="w-5 h-5" />
             </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters / Info */}
            <aside className="w-full lg:w-72 shrink-0 space-y-6">
                {activeTab === 'home' && (
                    <div className="bg-white/5 border border-white/5 rounded-[2rem] p-6 space-y-6 backdrop-blur-xl">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Категории</h3>
                            <div className="flex flex-col space-y-1">
                                {categories.map(cat => (
                                    <button 
                                        key={cat} 
                                        onClick={() => setActiveFilter(cat)} 
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeFilter === cat ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                   <div className="bg-white/5 border border-white/5 rounded-[2rem] p-6 text-center space-y-4 backdrop-blur-xl">
                        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-purple-500 via-blue-500 to-purple-500 p-1 shadow-2xl">
                            <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center">
                                {userProfile?.avatar ? <img src={userProfile.avatar} className="w-full h-full object-cover" /> : <UserCircle className="w-20 h-20 text-white/10" />}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">{userProfile?.name} {userProfile?.surname}</h2>
                            <p className="text-purple-400 font-bold text-sm tracking-wide mt-1">{isCreator ? 'СОЗДАТЕЛЬ' : 'КЛИЕНТ'}</p>
                        </div>
                   </div>
                )}
            </aside>

            {/* Main Dynamic View */}
            <div className="flex-1 space-y-6">
                
                {/* Search Bar (Visible on Home) */}
                {activeTab === 'home' && (
                    <div className="flex items-center space-x-4 bg-white/5 border border-white/5 rounded-[2rem] p-3 backdrop-blur-xl group focus-within:border-purple-500/50 transition-colors">
                        <div className="flex-1 flex items-center space-x-4 px-4">
                            <Search className="w-5 h-5 text-white/20 group-focus-within:text-purple-400 transition-colors" />
                            <input type="text" placeholder="Что вы ищете сегодня?" className="bg-transparent border-none outline-none w-full text-lg text-white placeholder-white/20" />
                        </div>
                        <button className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-white/90 transition-all">Найти</button>
                    </div>
                )}

                {/* Content Rendering */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                    
                    {activeTab === 'home' && (
                        <>
                            {isCreator ? (
                                // Creators see Jobs from Clients
                                (() => {
                                    const allJobs = JSON.parse(localStorage.getItem("arm_global_jobs") || "[]");
                                    const filtered = allJobs.filter((j: any) => activeFilter === "Все" || j.category === activeFilter);
                                    
                                    if (filtered.length === 0) return (
                                        <div className="col-span-full py-20 text-center space-y-4 opacity-30">
                                            <Briefcase className="w-16 h-16 mx-auto" />
                                            <p className="text-xl font-medium">Нет доступных заказов в этой категории</p>
                                        </div>
                                    );

                                    return filtered.map((j: any) => (
                                        <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} key={j.id} className="bg-white/5 border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between hover:border-purple-500/30 transition-all group backdrop-blur-xl">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-[10px] font-black text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full uppercase tracking-widest">{j.category}</span>
                                                    <span className="text-xl font-black text-green-400">{j.budget}</span>
                                                </div>
                                                <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">{j.title}</h3>
                                                <p className="text-white/40 text-sm line-clamp-3 leading-relaxed">{j.desc}</p>
                                                <div className="flex items-center space-x-1 text-xs text-white/30 pt-2">
                                                    <Sparkles className="w-3 h-3" />
                                                    <span>Дедлайн: {j.deadline}</span>
                                                </div>
                                            </div>
                                            <div className="mt-8">
                                                <button onClick={() => handleRespond(j.id)} className="w-full py-4 bg-white/5 hover:bg-white text-white hover:text-black rounded-2xl text-sm font-bold transition-all">Откликнуться</button>
                                            </div>
                                        </motion.div>
                                    ));
                                })()
                            ) : (
                                // Clients see Creators & their Services
                                (() => {
                                    const allServices = JSON.parse(localStorage.getItem("arm_global_services") || "[]");
                                    const filtered = allServices.filter((s: any) => activeFilter === "Все" || s.category === activeFilter);
                                    
                                    if (filtered.length === 0) return (
                                        <div className="col-span-full py-20 text-center space-y-4 opacity-30">
                                            <Users className="w-16 h-16 mx-auto" />
                                            <p className="text-xl font-medium">Исполнители пока не добавили услуги в этой категории</p>
                                        </div>
                                    );

                                    return filtered.map((s: any) => (
                                        <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} key={s.id} className="bg-white/5 border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between hover:border-blue-500/30 transition-all group backdrop-blur-xl">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-[10px] font-black text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full uppercase tracking-widest">{s.category}</span>
                                                    <span className="text-xl font-black text-green-400">{s.price}</span>
                                                </div>
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                                                        {s.creatorAvatar ? <img src={s.creatorAvatar} className="w-full h-full object-cover" /> : <UserCircle className="w-full h-full text-white/10" />}
                                                    </div>
                                                    <span className="text-sm font-bold text-white/60">{s.creatorName}</span>
                                                </div>
                                                <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">{s.title}</h3>
                                                <p className="text-white/40 text-sm line-clamp-3 leading-relaxed">{s.desc}</p>
                                            </div>
                                            <div className="mt-8">
                                                <button onClick={() => startChat(s.creatorName, s.title)} className="w-full py-4 bg-white/5 hover:bg-white text-white hover:text-black rounded-2xl text-sm font-bold transition-all">Связаться</button>
                                            </div>
                                        </motion.div>
                                    ));
                                })()
                            )}
                        </>
                    )}

                    {activeTab === 'my' && (
                        <div className="col-span-full space-y-6">
                            <button onClick={() => setShowCreateModal(true)} className="w-full py-10 bg-white/5 hover:bg-white/10 border-2 border-white/5 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center space-y-4 transition-all group">
                                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Plus className="w-8 h-8 text-purple-400" />
                                </div>
                                <span className="text-xl font-bold">{isCreator ? "Добавить новую услугу" : "Опубликовать новое задание"}</span>
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {myItems.map((item, i) => (
                                    <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-[2rem] space-y-6 backdrop-blur-xl relative overflow-hidden">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <h3 className="text-2xl font-bold">{item.title}</h3>
                                                <span className="text-xs text-white/30 uppercase tracking-widest">{item.category}</span>
                                            </div>
                                            <span className="text-xl font-black text-green-400">{item.budget || item.price}</span>
                                        </div>
                                        {item.photo && <img src={item.photo} className="w-full h-48 object-cover rounded-2xl shadow-2xl" alt="Job" />}
                                        <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                                        
                                        {!isCreator && item.candidates && item.candidates.length > 0 && (
                                            <div className="pt-6 border-t border-white/5 space-y-4">
                                                <h4 className="text-xs font-black text-white/30 uppercase tracking-widest">Отклики ({item.candidates.length})</h4>
                                                <div className="space-y-3">
                                                    {item.candidates.map((cand: any) => (
                                                        <div key={cand.id} className="bg-white/5 p-4 rounded-2xl flex items-center justify-between group">
                                                            <div className="flex items-center space-x-4">
                                                                <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden">
                                                                    {cand.avatar ? <img src={cand.avatar} className="w-full h-full object-cover" /> : <UserCircle className="w-full h-full text-white/10" />}
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold">{cand.name} {cand.surname}</p>
                                                                    <p className="text-[10px] text-purple-400 uppercase tracking-widest">{cand.category}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex space-x-2">
                                                                <button onClick={() => setSelectedCandidateProfile(cand)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"><Search className="w-4 h-4" /></button>
                                                                {item.status !== 'in_progress' && (
                                                                    <button onClick={() => handleSelectCandidate(item.id, cand)} className="px-5 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-black transition-all shadow-lg shadow-purple-500/20">ВЫБРАТЬ</button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'chats' && (
                        <div className="col-span-full max-w-2xl mx-auto w-full space-y-4">
                            {chats.length === 0 ? (
                                <div className="py-20 text-center space-y-4 opacity-30">
                                    <MessageCircle className="w-16 h-16 mx-auto" />
                                    <p className="text-xl font-medium">У вас пока нет активных диалогов</p>
                                </div>
                            ) : (
                                chats.map(chat => (
                                    <button key={chat.id} onClick={() => setActiveChat(chat)} className="w-full bg-white/5 hover:bg-white/10 border border-white/5 p-6 rounded-[2rem] flex items-center space-x-6 transition-all text-left group backdrop-blur-xl">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold text-2xl shrink-0 shadow-lg shadow-purple-500/20">{chat.name[0]}</div>
                                        <div className="flex-1 overflow-hidden">
                                            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{chat.name}</h3>
                                            <p className="text-sm text-white/40 truncate mt-1">Тема: {chat.topic}</p>
                                        </div>
                                        <ChevronRight className="w-6 h-6 text-white/10 group-hover:text-white transition-all group-hover:translate-x-1" />
                                    </button>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="col-span-full space-y-8">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] space-y-6 backdrop-blur-xl">
                                    <h3 className="text-xs font-black text-white/30 uppercase tracking-widest">Информация</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                                            <span className="text-white/40">Возраст</span>
                                            <span className="font-bold">{userProfile?.age} лет</span>
                                        </div>
                                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                                            <span className="text-white/40">Специализация</span>
                                            <span className="font-bold text-purple-400">{userProfile?.category || 'Не указана'}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-4">
                                            <span className="text-white/40">Опыт работы</span>
                                            <span className="font-bold">{userProfile?.exp || 'Без опыта'}</span>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                        <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-3">О себе</h4>
                                        <p className="text-sm text-white/70 leading-relaxed italic">"{userProfile?.desc || 'Пользователь не оставил описания'}"</p>
                                    </div>
                                </div>

                                {isCreator && (
                                    <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] space-y-8 backdrop-blur-xl">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xs font-black text-white/30 uppercase tracking-widest">Портфолио</h3>
                                            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handlePortfolioUpload} />
                                            <button onClick={() => fileInputRef.current?.click()} className="text-purple-400 text-xs font-bold hover:text-purple-300 flex items-center uppercase tracking-wider group">
                                                <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform"/> Добавить работу
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            {portfolio.map((img, i) => (
                                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} key={i} className="aspect-square rounded-[1.5rem] bg-white/5 overflow-hidden group relative">
                                                    <img src={img} alt="portfolio" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <Search className="w-6 h-6 text-white" />
                                                    </div>
                                                </motion.div>
                                            ))}
                                            {portfolio.length === 0 && (
                                                <div className="col-span-3 text-center text-white/10 py-10 border-2 border-white/5 border-dashed rounded-3xl">
                                                    Пусто
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                             </div>
                        </div>
                    )}

                </div>
            </div>

        </div>
      </main>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {activeChat && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-3xl bg-[#0a0a0c] border border-white/10 rounded-[3rem] overflow-hidden flex flex-col h-[80vh] shadow-2xl">
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold text-xl shadow-lg">{activeChat.name[0]}</div>
                        <div>
                            <h3 className="text-2xl font-black">{activeChat.name}</h3>
                            <p className="text-xs text-white/30 uppercase tracking-widest">{activeChat.topic}</p>
                        </div>
                    </div>
                    <button onClick={() => setActiveChat(null)} className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-all"><X className="w-6 h-6" /></button>
                </div>
                <div className="flex-1 p-8 overflow-y-auto space-y-6">
                    <div className="bg-white/5 p-6 rounded-[2rem] rounded-bl-none max-w-[80%] self-start text-sm leading-relaxed border border-white/5 shadow-xl">
                        Здравствуйте! Я по поводу вашего объявления <span className="text-purple-400 font-bold">"{activeChat.topic}"</span>. Давайте обсудим детали сотрудничества?
                    </div>
                </div>
                <div className="p-8 border-t border-white/5 flex space-x-4 bg-black/50">
                    <input type="text" placeholder="Напишите сообщение..." className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm focus:outline-none focus:border-purple-500 transition-all" />
                    <button className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center shrink-0 hover:scale-105 transition-all active:scale-95 shadow-xl">
                        <Send className="w-6 h-6" />
                    </button>
                </div>
            </motion.div>
          </motion.div>
        )}

        {showCreateModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100]" onClick={() => setShowCreateModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#0a0a0c] border border-white/10 p-10 rounded-[3rem] z-[110] shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black">{isCreator ? "НОВАЯ УСЛУГА" : "НОВОЕ ЗАДАНИЕ"}</h2>
                <button onClick={() => setShowCreateModal(false)} className="p-3 bg-white/5 rounded-full hover:bg-white/10"><X className="w-6 h-6" /></button>
              </div>
              <form className="grid grid-cols-2 gap-6" onSubmit={handleCreate}>
                <div className="col-span-2 space-y-2">
                    <label className="text-xs font-black text-white/30 uppercase tracking-[0.2em] ml-1">Заголовок</label>
                    <input required name="title" type="text" placeholder="Название услуги или задачи..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-purple-500 transition-all" />
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-black text-white/30 uppercase tracking-[0.2em] ml-1">Категория</label>
                    <select required name="category" className="w-full bg-[#1c1c1e] border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-purple-500 appearance-none">
                        <option value="" disabled selected>Выберите сферу</option>
                        {categories.filter(c => c !== "Все").map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-black text-white/30 uppercase tracking-[0.2em] ml-1">{isCreator ? "Стоимость" : "Бюджет"}</label>
                    <input required name={isCreator ? "price" : "budget"} type="text" placeholder="Напр: 50 000 ₽" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-purple-500 transition-all" />
                </div>
                
                <div className="col-span-2 space-y-2">
                    <label className="text-xs font-black text-white/30 uppercase tracking-[0.2em] ml-1">{isCreator ? "Срок выполнения" : "Крайний срок"}</label>
                    <input required name={isCreator ? "duration" : "deadline"} type="text" placeholder="Напр: 5 рабочих дней" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-purple-500 transition-all" />
                </div>

                {!isCreator && (
                  <div className="col-span-2">
                    <div className="w-full bg-white/5 border-2 border-white/5 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-all group" onClick={() => jobPhotoRef.current?.click()}>
                      <input type="file" accept="image/*" className="hidden" ref={jobPhotoRef} onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const compressed = await compressImage(file);
                          setJobPhotoPreview(compressed);
                        }
                      }} />
                      {jobPhotoPreview ? (
                        <img src={jobPhotoPreview} className="h-32 object-contain rounded-xl shadow-2xl" />
                      ) : (
                        <>
                          <Camera className="w-8 h-8 text-white/20 group-hover:text-purple-400 group-hover:scale-110 transition-all mb-3" />
                          <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Добавить визуализацию</span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="col-span-2 space-y-2">
                    <label className="text-xs font-black text-white/30 uppercase tracking-[0.2em] ml-1">Описание</label>
                    <textarea required name="desc" rows={4} placeholder="Опишите все детали..." className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 text-white focus:outline-none focus:border-purple-500 transition-all resize-none"></textarea>
                </div>
                
                <button type="submit" className="col-span-2 py-5 bg-white text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl mt-4 uppercase tracking-widest">ОПУБЛИКОВАТЬ</button>
              </form>
            </motion.div>
          </>
        )}

        {selectedCandidateProfile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[150]" onClick={() => setSelectedCandidateProfile(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#0a0a0c] border border-white/10 p-10 rounded-[3.5rem] z-[160] shadow-2xl">
                <div className="flex justify-between items-start mb-10">
                    <div className="flex items-center space-x-6">
                         <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 via-blue-500 to-purple-500 p-1">
                            <div className="w-full h-full rounded-full bg-black overflow-hidden">
                                {selectedCandidateProfile.avatar ? <img src={selectedCandidateProfile.avatar} className="w-full h-full object-cover" /> : <UserCircle className="w-full h-full text-white/10" />}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-4xl font-black">{selectedCandidateProfile.name} {selectedCandidateProfile.surname}</h3>
                            <p className="text-purple-400 font-black text-sm tracking-widest mt-1">{selectedCandidateProfile.category} • {selectedCandidateProfile.exp}</p>
                        </div>
                    </div>
                    <button onClick={() => setSelectedCandidateProfile(null)} className="p-4 bg-white/5 rounded-full hover:bg-white/10"><X className="w-6 h-6" /></button>
                </div>

                <div className="space-y-8">
                    <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5">
                        <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4">О кандидате</h4>
                        <p className="text-sm text-white/80 leading-relaxed italic">"{selectedCandidateProfile.desc || "Кандидат предпочел оставить этот раздел пустым."}"</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-3xl text-center border border-white/5">
                            <span className="block text-3xl font-black text-yellow-400 mb-1">{selectedCandidateProfile.rating || "5.0"}</span>
                            <span className="text-[10px] text-white/30 font-black uppercase tracking-widest">Рейтинг</span>
                        </div>
                        <div className="bg-white/5 p-6 rounded-3xl text-center border border-white/5">
                            <span className="block text-3xl font-black text-blue-400 mb-1">{selectedCandidateProfile.reviews?.length || 0}</span>
                            <span className="text-[10px] text-white/30 font-black uppercase tracking-widest">Отзывов</span>
                        </div>
                    </div>
                    
                    <button onClick={() => {
                        startChat(selectedCandidateProfile.name, "Сотрудничество");
                        setSelectedCandidateProfile(null);
                    }} className="w-full py-6 bg-white text-black font-black rounded-3xl text-lg hover:scale-[1.02] transition-all shadow-2xl uppercase tracking-widest mt-4">Связаться с исполнителем</button>
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Admin Panel Component ---
  const [accounts, setAccounts] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const savedAccounts = JSON.parse(localStorage.getItem("arm_accounts") || "[]");
    setAccounts(savedAccounts);
    // In a real app, we'd also load jobs. For now, we simulate from the current session or a global storage if implemented.
    // Let's check for arm_global_jobs
    const savedJobs = JSON.parse(localStorage.getItem("arm_global_jobs") || "[]");
    setJobs(savedJobs);
  }, []);

  const deleteAccount = (username: string) => {
    const updated = accounts.filter(a => a.username !== username);
    setAccounts(updated);
    localStorage.setItem("arm_accounts", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <header className="px-8 py-6 border-b border-white/5 bg-black/40 backdrop-blur-2xl flex justify-between items-center relative z-50">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-600/20 rounded-2xl flex items-center justify-center border border-red-500/30 shadow-lg shadow-red-500/10">
            <ShieldAlert className="w-7 h-7 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter">ADMIN PANEL</h1>
            <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">ARM FREELANCE CONTROL</p>
          </div>
        </div>
        <button onClick={onLogout} className="px-6 py-3 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded-xl text-sm font-black transition-all border border-red-500/20 uppercase tracking-widest shadow-lg shadow-red-500/5 active:scale-95">Выход</button>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full p-8 relative z-10">
        <div className="flex space-x-2 mb-10 bg-white/5 p-1.5 rounded-2xl w-max backdrop-blur-xl border border-white/5">
            {[
                { id: 'stats', label: 'Статистика', icon: Sparkles },
                { id: 'users', label: 'Пользователи', icon: Users },
                { id: 'jobs', label: 'Объявления', icon: List }
            ].map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)} 
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${activeTab === tab.id ? 'bg-red-600 text-white shadow-xl shadow-red-600/30' : 'text-white/40 hover:text-white'}`}
                >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>

        <main className="space-y-8">
            {activeTab === 'stats' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                    <span className="block text-5xl font-black text-white mb-2 tracking-tighter">{accounts.length}</span>
                    <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">Пользователей</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                    <span className="block text-5xl font-black text-white mb-2 tracking-tighter">{jobs.length}</span>
                    <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">Объявлений</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                    <span className="block text-5xl font-black text-green-400 mb-2 tracking-tighter">{(jobs.length * 1000).toLocaleString()}</span>
                    <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">Оборот (₽)</span>
                </div>
            </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
                 <table className="w-full text-left">
                   <thead className="bg-white/5 border-b border-white/5">
                      <tr>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/30">Пользователь</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/30">Роль</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/30">Сфера</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/30">Действие</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {accounts.map(acc => (
                        <tr key={acc.username} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                                {acc.avatar ? <img src={acc.avatar} className="w-full h-full object-cover" /> : <UserCircle className="w-full h-full text-white/10" />}
                              </div>
                              <div>
                                <p className="font-bold">{acc.name || acc.username}</p>
                                <p className="text-xs text-white/30">@{acc.username}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${acc.role === 'creator' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                              {acc.role}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-sm text-white/60">{acc.category || '-'}</td>
                          <td className="px-8 py-6">
                            <button onClick={() => deleteAccount(acc.username)} className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group">
                              <Trash2 className="w-5 h-5 text-white/20 group-hover:text-red-500" />
                            </button>
                          </td>
                        </tr>
                      ))}
                   </tbody>
                 </table>
                 {accounts.length === 0 && (
                   <div className="p-20 text-center opacity-30">
                      <Users className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-lg">Список пользователей пуст</p>
                   </div>
                 )}
              </div>
            )}

            {activeTab === 'jobs' && (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {jobs.map(job => (
                   <div key={job.id} className="bg-white/5 border border-white/5 p-8 rounded-[2rem] space-y-4 relative group">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full uppercase tracking-widest">{job.category}</span>
                        <button className="p-2 bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4 text-red-400" /></button>
                      </div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <p className="text-sm text-white/40 line-clamp-2">{job.desc}</p>
                   </div>
                 ))}
                 {jobs.length === 0 && (
                   <div className="col-span-full bg-white/5 border border-white/5 rounded-[2.5rem] p-20 text-center opacity-30">
                      <List className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-lg">Нет активных объявлений</p>
                   </div>
                 )}
               </div>
            )}
        </main>
      </div>
    </div>
  );
}

