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
  const [tgUser, setTgUser] = useState<any>(null);

  // Load state from localStorage
  useEffect(() => {
    // Get Telegram user info
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      const user = tg.initDataUnsafe?.user;
      if (user) setTgUser(user);
    }

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

  // --- Image Compression Utility ---
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
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7); // 70% quality
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
    return <Dashboard role={role} userProfile={userProfile} onLogout={handleLogout} />;
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
      {/* Hidden Admin Button - Only for specific TG ID */}
      {(String(tgUser?.id) === "6444802382") && (
        <button onClick={() => { setRole('admin'); setIsRegistered(true); localStorage.setItem("arm_user_role", "admin"); }} className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 z-20 border border-white/10">
          <Settings className="w-5 h-5 text-white/70" />
        </button>
      )}

      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-2000"></div>

      <div className="z-10 w-full max-w-md flex flex-col h-full justify-between py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mt-12 space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 mb-4 shadow-[0_0_40px_rgba(139,92,246,0.3)]">
            <Sparkles className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            ARM Freelance
          </h1>
          <p className="text-lg text-white/60 font-medium">Найди идеального исполнителя или новые заказы за пару кликов.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-full space-y-4 mt-16">
          <button onClick={() => setRole('client')} className="group relative w-full flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-purple-500/25 active:scale-[0.98] overflow-hidden">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            <div className="flex items-center space-x-4 relative z-10">
              <div className="bg-white/20 p-2 rounded-xl"><Users className="w-6 h-6 text-white" /></div>
              <span className="text-xl font-semibold text-white">Я Клиент</span>
            </div>
            <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white transition-colors relative z-10" />
          </button>

          <button onClick={() => setRole('creator')} className="group relative w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300 active:scale-[0.98]">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-2 rounded-xl"><Briefcase className="w-6 h-6 text-purple-400" /></div>
              <span className="text-xl font-semibold text-white">Я Создатель</span>
            </div>
            <ChevronRight className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-center mt-12">
          <button onClick={() => setShowInfo(true)} className="text-white/40 hover:text-white/80 transition-colors text-sm font-medium underline decoration-white/20 underline-offset-4">
            Какая разница?
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showInfo && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowInfo(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", bounce: 0, duration: 0.4 }} className="absolute bottom-0 left-0 right-0 bg-[#121214] border-t border-white/10 p-6 rounded-t-3xl z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Роли в приложении</h2>
                <button onClick={() => setShowInfo(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X className="w-5 h-5 text-white/70" /></button>
              </div>
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-2"><Users className="w-5 h-5 text-blue-400" /><h3 className="text-lg font-semibold text-white">Клиент</h3></div>
                  <p className="text-white/60 text-sm leading-relaxed">Вы ищете специалистов для выполнения задач. Можете создавать объявления с описанием проекта, бюджетом и сроками.</p>
                </div>
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-2"><Briefcase className="w-5 h-5 text-purple-400" /><h3 className="text-lg font-semibold text-white">Создатель</h3></div>
                  <p className="text-white/60 text-sm leading-relaxed">Вы предлагаете свои услуги. Создавайте посты с вашими навыками, собирайте портфолио и откликайтесь на заказы.</p>
                </div>
              </div>
              <button onClick={() => setShowInfo(false)} className="w-full mt-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors">Понятно</button>
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
  
  // Form state
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
      // In a real app we'd call compressImage from props or context, 
      // but for simplicity in this structure, we'll use a local basic version if needed 
      // or assume the parent handles it. Let's use a local helper here too.
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readerEvent) => {
        const img = new Image();
        img.src = readerEvent.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const size = 300; // Small for avatar
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
        onRegister({ username, password, name, surname, age, category, exp, desc, avatar: avatarPreview, portfolio: [] });
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="min-h-screen bg-black text-white p-6 relative overflow-y-auto pb-20">
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30"></div>
      <div className="max-w-md mx-auto relative z-10">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors mb-6 flex items-center space-x-2">
          <ArrowLeft className="w-5 h-5 text-white/70" />
          <span className="text-sm font-medium text-white/70 pr-2">Назад</span>
        </button>

        <h2 className="text-3xl font-bold mb-2">
          {isLoginMode ? "С возвращением!" : (step === 'auth' ? "Создание аккаунта" : (isCreator ? "Профиль Создателя" : "Профиль Клиента"))}
        </h2>
        <p className="text-white/50 text-sm mb-8">
          {isLoginMode ? "Войдите в свой аккаунт для продолжения." : (step === 'auth' ? "Придумайте никнейм и пароль для входа." : "Заполните информацию о себе, чтобы начать работу.")}
        </p>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-xl text-sm mb-6">
            {error}
          </motion.div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {(isLoginMode || step === 'auth') && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Никнейм (Логин)</label>
                <input required value={username} onChange={e=>setUsername(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="user123" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Пароль</label>
                <input required value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="••••••••" />
              </div>
              {!isLoginMode && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Подтвердите пароль</label>
                  <input required value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} type="password" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="••••••••" />
                </div>
              )}
            </div>
          )}

          {!isLoginMode && step === 'profile' && (
            <>
              <div className="flex flex-col items-center justify-center space-y-3 mb-8">
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleAvatarChange} />
            <div onClick={() => fileInputRef.current?.click()} className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group cursor-pointer">
              {avatarPreview ? <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" /> : <Camera className="w-8 h-8 text-white/30 group-hover:scale-110 transition-transform" />}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><Upload className="w-6 h-6 text-white" /></div>
            </div>
            <span className="text-sm text-white/50">Загрузить фото</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Имя</label>
              <input required value={name} onChange={e=>setName(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="Иван" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Фамилия</label>
              <input required value={surname} onChange={e=>setSurname(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="Иванов" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Возраст</label>
            <input required value={age} onChange={e=>setAge(e.target.value)} type="number" min="14" max="100" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="18" />
          </div>

          {isCreator && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Сфера деятельности</label>
                <select required value={category} onChange={e=>setCategory(e.target.value)} className="w-full bg-[#1c1c1e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none">
                  <option value="" disabled>Выберите категорию</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Опыт работы</label>
                <select required value={exp} onChange={e=>setExp(e.target.value)} className="w-full bg-[#1c1c1e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none">
                  <option value="" disabled>Укажите опыт</option>
                  <option value="Без опыта">Без опыта</option>
                  <option value="1-3 года">1 - 3 года</option>
                  <option value="3-5 лет">3 - 5 лет</option>
                  <option value="Более 5 лет">Более 5 лет</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Что вы умеете? (Описание)</label>
                <textarea required value={desc} onChange={e=>setDesc(e.target.value)} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none" placeholder="Расскажите о своих навыках..."></textarea>
              </div>
            </>
          )}
          
          <button type="submit" className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 active:scale-[0.98]">
            {isLoginMode ? "Войти" : "Продолжить"}
          </button>

          <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="w-full text-center text-sm text-white/40 hover:text-white/60 transition-colors pt-2">
            {isLoginMode ? "Еще нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

// --- Dashboard Component ---
function Dashboard({ role, userProfile, onLogout }: { role: Role, userProfile: any, onLogout: () => void }) {
  const isCreator = role === 'creator';
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const categories = ["Все", "Разработка сайтов", "Разработка мобильных приложений", "Дизайн", "Продажи", "Маркетинг", "Обмен криптовалюты", "Программирование", "SMM"];
  const [activeFilter, setActiveFilter] = useState("Все");

  // Local State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [myItems, setMyItems] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any | null>(null);
  const [portfolio, setPortfolio] = useState<string[]>(userProfile?.portfolio || []);
  const [selectedCandidateProfile, setSelectedCandidateProfile] = useState<any | null>(null);
  
  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const jobPhotoRef = useRef<HTMLInputElement>(null);
  const [jobPhotoPreview, setJobPhotoPreview] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const mockCreators: any[] = [];

  const handleCreate = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = Date.now();
    if (isCreator) {
      const newItem = {
        id, title: formData.get("title"), category: formData.get("category"), price: formData.get("price"), desc: formData.get("desc"), duration: formData.get("duration")
      };
      setMyItems([newItem, ...myItems]);
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
    }
    setShowCreateModal(false);
    setJobPhotoPreview(null);
    showToast("Успешно добавлено!");
  };

  const handleRespond = (jobId: number) => {
    setJobs(prevJobs => prevJobs.map(job => {
      if (job.id === jobId) {
        const alreadyResponded = job.candidates?.some(c => c.name === userProfile.name);
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
    showToast("Чат создан! Перейдите во вкладку Чаты.");
  };

  const handlePortfolioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressed = await compressImage(file);
      setPortfolio([...portfolio, compressed]);
      showToast("Фото сжато и добавлено");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none"></div>

      {toast && (
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -50, opacity: 0 }} className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-2 rounded-xl z-50 text-sm font-medium shadow-lg backdrop-blur-md whitespace-nowrap">
          {toast}
        </motion.div>
      )}

      {/* Header */}
      <header className="p-6 pb-4 border-b border-white/10 relative z-10 bg-black/50 backdrop-blur-md sticky top-0">
        <h1 className="text-2xl font-bold">{
          activeTab === 'home' ? (isCreator ? "Биржа Заказов" : "Поиск Создателей") :
          activeTab === 'my' ? (isCreator ? "Мои Услуги" : "Мои Задания") :
          activeTab === 'chats' ? "Мои Чаты" : "Профиль"
        }</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24 relative z-10 space-y-6">
        
        {/* --- HOME TAB --- */}
        {activeTab === 'home' && (
          <>
            <div className="flex space-x-2">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 flex items-center space-x-2">
                <Search className="w-5 h-5 text-white/40" />
                <input type="text" placeholder="Поиск..." className="bg-transparent border-none outline-none w-full text-white placeholder-white/40" />
              </div>
            </div>

            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveFilter(cat)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === cat ? 'bg-purple-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {!isCreator ? (
                mockCreators.filter(c => activeFilter === "Все" || c.category === activeFilter).map((c) => (
                  <div key={c.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col space-y-3 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
                    <div className="flex items-center space-x-3 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold text-lg shadow-lg">{c.name[0]}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{c.name}</h3>
                        <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded-full border border-purple-400/20">{c.category} • {c.exp}</span>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed relative z-10">{c.desc}</p>
                    <button onClick={() => startChat(c.name, "Обсуждение проекта")} className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold transition-colors mt-2 relative z-10 backdrop-blur-md">Написать сообщение</button>
                  </div>
                ))
              ) : (
                jobs.filter(j => activeFilter === "Все" || j.category === activeFilter).map((j) => (
                  <div key={j.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col space-y-3 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors"></div>
                    <div className="flex justify-between items-start relative z-10">
                      <h3 className="font-semibold text-lg max-w-[70%]">{j.title}</h3>
                      <span className="text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded-lg border border-green-400/20 whitespace-nowrap">{j.budget}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full w-max border border-blue-400/20">{j.category}</span>
                      <span className="text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full w-max border border-orange-400/20">Срок: {j.deadline}</span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed relative z-10">{j.desc}</p>
                    {j.status === 'in_progress' ? (
                        <div className="w-full py-2.5 bg-green-500/20 text-green-400 rounded-xl text-sm font-semibold text-center border border-green-500/30">Заказ в работе</div>
                    ) : j.candidates?.some(c => c.name === userProfile.name) ? (
                        <div className="w-full py-2.5 bg-white/5 text-white/40 rounded-xl text-sm font-semibold text-center border border-white/10">Вы уже откликнулись</div>
                    ) : (
                        <button onClick={() => handleRespond(j.id)} className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/20 rounded-xl text-sm font-semibold transition-colors mt-2 relative z-10">Откликнуться на заказ</button>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* --- MY TAB --- */}
        {activeTab === 'my' && (
          <div className="space-y-4">
            <button onClick={() => setShowCreateModal(true)} className="w-full flex items-center justify-center space-x-2 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl border-dashed transition-colors">
              <Plus className="w-5 h-5" />
              <span className="font-semibold">{isCreator ? "Опубликовать услугу" : "Создать новое задание"}</span>
            </button>

            {myItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 opacity-50">
                <List className="w-16 h-16 mb-4" />
                <p>У вас пока нет активных {isCreator ? 'услуг' : 'заданий'}</p>
              </div>
            ) : (
              myItems.map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <span className="text-green-400 font-semibold">{item.budget || item.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full w-max">{item.category}</span>
                    {(item.deadline || item.duration) && <span className="text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full w-max">Срок: {item.deadline || item.duration}</span>}
                  </div>
                  {item.photo && <img src={item.photo} className="w-full h-32 object-cover rounded-xl mt-2" alt="Задание" />}
                  <p className="text-white/60 text-sm mt-2">{item.desc}</p>
                  
                  {!isCreator && item.candidates && item.candidates.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="text-sm font-bold text-white/40 uppercase">Отклики ({item.candidates.length}):</h4>
                      <div className="space-y-2">
                        {item.candidates.map((cand: any) => (
                          <div key={cand.id} className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                                {cand.avatar ? <img src={cand.avatar} className="w-full h-full object-cover" /> : <UserCircle className="w-full h-full text-white/20" />}
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{cand.name} {cand.surname}</p>
                                <p className="text-xs text-purple-400">{cand.category}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button onClick={() => setSelectedCandidateProfile(cand)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><Search className="w-4 h-4 text-white/60" /></button>
                              {item.status !== 'in_progress' && (
                                <button onClick={() => handleSelectCandidate(item.id, cand)} className="px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-bold transition-colors">Выбрать</button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.selectedCandidate && (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><Briefcase className="w-4 h-4 text-green-400" /></div>
                      <div>
                        <p className="text-xs text-green-400 font-bold">Выбран исполнитель:</p>
                        <p className="text-sm font-semibold">{item.selectedCandidate.name} {item.selectedCandidate.surname}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* --- CHATS TAB --- */}
        {activeTab === 'chats' && (
          <div className="space-y-3">
            {chats.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 opacity-50">
                <MessageCircle className="w-16 h-16 mb-4" />
                <p>У вас пока нет активных диалогов</p>
              </div>
            ) : (
              chats.map(chat => (
                <button key={chat.id} onClick={() => setActiveChat(chat)} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl flex items-center space-x-4 transition-colors text-left">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold text-lg shrink-0">{chat.name[0]}</div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-semibold text-white">{chat.name}</h3>
                    <p className="text-sm text-white/50 truncate">Тема: {chat.topic}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30" />
                </button>
              ))
            )}
          </div>
        )}

        {/* --- PROFILE TAB --- */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4 pt-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-1 relative group">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  {userProfile?.avatar ? <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" /> : <UserCircle className="w-12 h-12 text-white/50" />}
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{userProfile?.name} {userProfile?.surname}</h2>
                <p className="text-white/50">{isCreator ? 'Создатель' : 'Клиент'} • {userProfile?.age} лет</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-around">
              <div className="text-center">
                <span className="block text-2xl font-bold text-purple-400">{myItems.length}</span>
                <span className="text-xs text-white/50">{isCreator ? 'Услуг' : 'Заданий'}</span>
              </div>
              <div className="w-px bg-white/10"></div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-blue-400">{chats.length}</span>
                <span className="text-xs text-white/50">Откликов</span>
              </div>
            </div>

            {isCreator && (
              <>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                  <h3 className="font-semibold text-white/70 text-sm uppercase tracking-wider">О себе</h3>
                  <p className="text-sm text-white/90 leading-relaxed">{userProfile?.desc}</p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-md">{userProfile?.category}</span>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-md">Опыт: {userProfile?.exp}</span>
                  </div>
                </div>

                {/* Portfolio Section */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-white/70 text-sm uppercase tracking-wider">Портфолио</h3>
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handlePortfolioUpload} />
                    <button onClick={() => fileInputRef.current?.click()} className="text-purple-400 text-sm hover:text-purple-300 flex items-center"><Plus className="w-4 h-4 mr-1"/> Добавить фото</button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {portfolio.map((img, i) => (
                      <div key={i} className="aspect-square rounded-xl bg-white/10 overflow-hidden">
                        <img src={img} alt="portfolio" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {portfolio.length === 0 && (
                      <div className="col-span-3 text-center text-white/40 py-4 text-sm">Здесь будут ваши выполненные проекты</div>
                    )}
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
                   <h3 className="font-semibold text-white/70 text-sm uppercase tracking-wider">Отзывы и Оценки</h3>
                   <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {[1,2,3,4,5].map(star => <Sparkles key={star} className={`w-4 h-4 ${star <= (userProfile.rating || 5) ? 'fill-yellow-400' : 'text-white/20'}`} />)}
                      </div>
                      <span className="font-bold">{userProfile.rating || "5.0"}</span>
                   </div>
                   <div className="space-y-3">
                      {(userProfile.reviews || []).map((rev: Review) => (
                        <div key={rev.id} className="p-3 bg-white/5 rounded-xl border border-white/5">
                           <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-bold">{rev.from}</span>
                              <div className="flex text-yellow-400">
                                {[1,2,3,4,5].map(s => <Sparkles key={s} className={`w-3 h-3 ${s <= rev.stars ? 'fill-yellow-400' : 'text-white/10'}`} />)}
                              </div>
                           </div>
                           <p className="text-xs text-white/60">{rev.comment}</p>
                        </div>
                      ))}
                      {(!userProfile.reviews || userProfile.reviews.length === 0) && (
                        <p className="text-xs text-white/40 italic">У вас пока нет отзывов</p>
                      )}
                   </div>
                </div>
              </>
            )}

            {String(tgUser?.id) === "6444802382" && (
              <button onClick={() => { setRole('admin'); setIsRegistered(true); localStorage.setItem("arm_user_role", "admin"); }} className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 font-semibold transition-colors mt-4 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 mr-2" />
                Панель администратора
              </button>
            )}

            <button onClick={onLogout} className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-red-400 font-semibold transition-colors mt-8 flex items-center justify-center">
              Выйти из аккаунта
            </button>
          </div>
        )}
      </main>

      {/* --- CHAT MODAL --- */}
      <AnimatePresence>
        {activeChat && (
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="absolute inset-0 bg-[#0a0a0c] z-50 flex flex-col">
            <div className="p-4 border-b border-white/10 flex items-center space-x-3 bg-white/5 backdrop-blur-md">
              <button onClick={() => setActiveChat(null)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-5 h-5" /></button>
              <div>
                <h3 className="font-bold">{activeChat.name}</h3>
                <p className="text-xs text-white/50">{activeChat.topic}</p>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto flex flex-col justify-end space-y-4">
              <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none max-w-[80%] self-start text-sm">
                Здравствуйте! Я по поводу "{activeChat.topic}". Давайте обсудим детали?
              </div>
            </div>
            <div className="p-4 border-t border-white/10 flex space-x-2 bg-black">
              <input type="text" placeholder="Сообщение..." className="flex-1 bg-white/10 border border-white/10 rounded-full px-4 text-sm focus:outline-none focus:border-purple-500" />
              <button className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shrink-0"><Send className="w-4 h-4 ml-[-2px] mt-[2px]" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CREATE MODAL --- */}
      <AnimatePresence>
        {showCreateModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setShowCreateModal(false)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="absolute bottom-0 left-0 right-0 bg-[#121214] border-t border-white/10 p-6 rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto pb-20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{isCreator ? "Новая услуга" : "Новое задание"}</h2>
                <button onClick={() => setShowCreateModal(false)} className="p-2 bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
              </div>
              <form className="space-y-4" onSubmit={handleCreate}>
                <input required name="title" type="text" placeholder="Заголовок..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500" />
                <select required name="category" className="w-full bg-[#1c1c1e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 appearance-none">
                  <option value="" disabled selected>Категория</option>
                  {categories.filter(c => c !== "Все").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input required name={isCreator ? "price" : "budget"} type="text" placeholder={isCreator ? "Цена (например, от 5000 ₽)" : "Бюджет (например, 50 000 ₽)"} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500" />
                
                {/* Duration/Deadline */}
                <input required name={isCreator ? "duration" : "deadline"} type="text" placeholder={isCreator ? "За сколько дней сделаете? (напр. 3 дня)" : "Сроки (например, 2 недели)"} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500" />

                {/* Client specific photo upload */}
                {!isCreator && (
                  <>
                    <div className="w-full bg-white/5 border border-white/10 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors" onClick={() => jobPhotoRef.current?.click()}>
                      <input type="file" accept="image/*" className="hidden" ref={jobPhotoRef} onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const compressed = await compressImage(file);
                          setJobPhotoPreview(compressed);
                        }
                      }} />
                      {jobPhotoPreview ? (
                        <img src={jobPhotoPreview} className="h-20 object-contain rounded-md" />
                      ) : (
                        <>
                          <Camera className="w-6 h-6 text-white/40 mb-2" />
                          <span className="text-xs text-white/50">Прикрепить фото к заданию (опционально)</span>
                        </>
                      )}
                    </div>
                  </>
                )}

                <textarea required name="desc" rows={4} placeholder="Подробное описание..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 resize-none"></textarea>
                <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 text-white font-semibold rounded-xl">Опубликовать</button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Tab Bar */}
      <nav className="absolute bottom-0 left-0 right-0 bg-[#121214] border-t border-white/10 pb-safe z-50">
        <div className="flex justify-around items-center p-4">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center space-y-1 ${activeTab === 'home' ? 'text-purple-400 scale-110' : 'text-white/40'} transition-all`}>
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-medium">Главная</span>
          </button>
          <button onClick={() => setActiveTab('my')} className={`flex flex-col items-center space-y-1 ${activeTab === 'my' ? 'text-purple-400 scale-110' : 'text-white/40'} transition-all`}>
            <Briefcase className="w-6 h-6" />
            <span className="text-[10px] font-medium">{isCreator ? "Услуги" : "Задания"}</span>
          </button>
          <button onClick={() => setActiveTab('chats')} className={`flex flex-col items-center space-y-1 ${activeTab === 'chats' ? 'text-purple-400 scale-110' : 'text-white/40'} transition-all relative`}>
            <MessageCircle className="w-6 h-6" />
            {chats.length > 0 && <span className="absolute top-0 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#121214]"></span>}
            <span className="text-[10px] font-medium">Чаты</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center space-y-1 ${activeTab === 'profile' ? 'text-purple-400 scale-110' : 'text-white/40'} transition-all`}>
            <UserCircle className="w-6 h-6" />
            <span className="text-[10px] font-medium">Профиль</span>
          </button>
        </div>
      </nav>

      {/* --- CANDIDATE PROFILE MODAL --- */}
      <AnimatePresence>
        {selectedCandidateProfile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md z-[60]" onClick={() => setSelectedCandidateProfile(null)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="absolute bottom-0 left-0 right-0 bg-[#121214] border-t border-white/10 p-6 rounded-t-3xl z-[70] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Профиль кандидата</h2>
                    <button onClick={() => setSelectedCandidateProfile(null)} className="p-2 bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
                </div>
                <div className="flex flex-col items-center space-y-4 mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-1">
                        <div className="w-full h-full rounded-full bg-black overflow-hidden">
                            {selectedCandidateProfile.avatar ? <img src={selectedCandidateProfile.avatar} className="w-full h-full object-cover" /> : <UserCircle className="w-full h-full text-white/20" />}
                        </div>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">{selectedCandidateProfile.name} {selectedCandidateProfile.surname}</h3>
                        <p className="text-purple-400 font-medium">{selectedCandidateProfile.category} • {selectedCandidateProfile.exp}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white/5 p-4 rounded-2xl">
                        <h4 className="text-xs font-bold text-white/40 uppercase mb-2">О кандидате</h4>
                        <p className="text-sm text-white/80 leading-relaxed">{selectedCandidateProfile.desc || "Описание отсутствует"}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl text-center">
                            <span className="block text-2xl font-bold text-yellow-400">{selectedCandidateProfile.rating || "5.0"}</span>
                            <span className="text-[10px] text-white/40 uppercase">Рейтинг</span>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl text-center">
                            <span className="block text-2xl font-bold text-blue-400">{selectedCandidateProfile.reviews?.length || 0}</span>
                            <span className="text-[10px] text-white/40 uppercase">Отзывов</span>
                        </div>
                    </div>

                    {selectedCandidateProfile.reviews && selectedCandidateProfile.reviews.length > 0 && (
                        <div className="space-y-3">
                             <h4 className="text-xs font-bold text-white/40 uppercase">Последние отзывы:</h4>
                             {selectedCandidateProfile.reviews.map((r: any) => (
                                 <div key={r.id} className="p-3 bg-white/5 rounded-xl border border-white/5">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-bold">{r.from}</span>
                                        <div className="flex text-yellow-400">
                                            {[1,2,3,4,5].map(s => <Sparkles key={s} className={`w-3 h-3 ${s <= r.stars ? 'fill-yellow-400' : 'text-white/10'}`} />)}
                                        </div>
                                    </div>
                                    <p className="text-xs text-white/60">{r.comment}</p>
                                 </div>
                             ))}
                        </div>
                    )}
                    
                    <button onClick={() => {
                        startChat(selectedCandidateProfile.name, "Обсуждение работы");
                        setSelectedCandidateProfile(null);
                    }} className="w-full py-4 bg-white text-black font-bold rounded-xl mt-4">Написать кандидату</button>
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Admin Panel Component ---
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'users' | 'jobs' | 'stats'>('stats');

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col">
      <header className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-6 h-6 text-red-500" />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <button onClick={onLogout} className="text-sm text-red-400 hover:text-red-300">Выход</button>
      </header>

      <div className="flex p-4 space-x-2 overflow-x-auto scrollbar-hide border-b border-white/10">
        <button onClick={() => setActiveTab('stats')} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'stats' ? 'bg-red-500/20 text-red-400' : 'bg-white/5 hover:bg-white/10'}`}>Статистика</button>
        <button onClick={() => setActiveTab('users')} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'users' ? 'bg-red-500/20 text-red-400' : 'bg-white/5 hover:bg-white/10'}`}>Пользователи</button>
        <button onClick={() => setActiveTab('jobs')} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'jobs' ? 'bg-red-500/20 text-red-400' : 'bg-white/5 hover:bg-white/10'}`}>Объявления</button>
      </div>

      <main className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'stats' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
              <span className="block text-3xl font-bold text-white">1,204</span>
              <span className="text-xs text-white/50">Пользователей</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
              <span className="block text-3xl font-bold text-white">450</span>
              <span className="text-xs text-white/50">Активных задач</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center col-span-2">
              <span className="block text-3xl font-bold text-green-400">12 400 ₽</span>
              <span className="text-xs text-white/50">Доход (Комиссии)</span>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-3">
            <p className="text-center text-white/30 py-10 italic">Нет зарегистрированных пользователей</p>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-3">
            <p className="text-center text-white/30 py-10 italic">Нет активных объявлений</p>
          </div>
        )}
      </main>
    </div>
  );
}
