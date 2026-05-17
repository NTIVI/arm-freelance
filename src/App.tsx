import { useState, useEffect } from 'react';
import { 
  Compass, ShieldCheck, User, Star, Plus, Trash2, ShieldAlert,
  Server, RefreshCw, LogIn, LogOut, Check, X, MapPin, 
  Car, Calendar, CreditCard, Layers, Eye, Users, Percent, HelpCircle, 
  Map, Activity, Wallet, Moon, Sun, AlertCircle, Sparkles, Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3001' : '');

export default function App() {
  // Theme System
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('armturn_theme');
    if (saved) return saved as any;
    return 'light';
  });

  // Auth States
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem('armturn_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [driverProfile, setDriverProfile] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'client' | 'driver'>('client');
  const [authForm, setAuthForm] = useState({
    email: '',
    fullName: '',
    phone: '',
    dob: '',
    carModel: '',
    carNumber: '',
    capacity: '4',
    passportUrl: ''
  });

  // Navigation / Views
  const [activeView, setActiveView] = useState<'landing' | 'booking' | 'driver' | 'admin'>('landing');

  // Business Logic Data
  const [routes, setRoutes] = useState<any[]>([]);
  const [clientOrders, setClientOrders] = useState<any[]>([]);
  const [driverOrders, setDriverOrders] = useState<any[]>([]);
  const [activeDriverId, setActiveDriverId] = useState<string>('');
  
  // Booking Constructor
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [includeHotel, setIncludeHotel] = useState(true);
  const [includeRest, setIncludeRest] = useState(true);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingGroupSize, setBookingGroupSize] = useState('1');

  // Review Modal Trigger
  const [pendingReviewOrder, setPendingReviewOrder] = useState<any>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Admin states
  const [adminDrivers, setAdminDrivers] = useState<any[]>([]);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [adminOrders, setAdminOrders] = useState<any[]>([]);
  const [adminRadar, setAdminRadar] = useState<any[]>([]);
  const [adminWallet, setAdminWallet] = useState<any>(null);
  const [adminTab, setAdminTab] = useState<'radar' | 'drivers' | 'users' | 'wallet' | 'routes'>('radar');

  // CMS Route Form
  const [cmsRouteForm, setCmsRouteForm] = useState({
    id: '',
    title: '',
    description: '',
    coverImage: '',
    price: '',
    duration: ''
  });
  
  // Notification Toast
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'gold'; message: string } | null>(null);
  const [isUrlAdmin, setIsUrlAdmin] = useState(false);

  // Set Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('armturn_theme', theme);
  }, [theme]);

  // Handle URL Secret Path
  useEffect(() => {
    if (window.location.pathname === '/admin-secret-url') {
      setIsUrlAdmin(true);
      setActiveView('admin');
      fetchAdminData();
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const showToast = (type: 'success' | 'error' | 'gold', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // ==========================================
  // API INTERACTIONS
  // ==========================================

  const fetchRoutes = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/routes`);
      const data = await res.json();
      setRoutes(data);
      if (data.length > 0) setSelectedRoute(data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClientBookings = async () => {
    if (!user || user.role !== 'client') return;
    try {
      const res = await fetch(`${API_BASE}/api/client/orders/${user.id}`);
      const data = await res.json();
      setClientOrders(data);
      
      // Check for unreviewed completed orders
      const completedUnreviewed = data.find((o: any) => o.status === 'completed');
      if (completedUnreviewed) {
        // Check if already reviewed (we mock review check by checking locally/backend)
        const checkReview = localStorage.getItem(`reviewed_${completedUnreviewed.id}`);
        if (!checkReview) {
          setPendingReviewOrder(completedUnreviewed);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDriverBookings = async () => {
    if (!user || user.role !== 'driver') return;
    try {
      const res = await fetch(`${API_BASE}/api/driver/orders/${user.id}`);
      const data = await res.json();
      if (res.ok) {
        setDriverOrders(data.orders);
        setActiveDriverId(data.driverId);
      } else {
        setDriverProfile({ status: data.status || 'pending' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAdminData = async () => {
    try {
      const driversRes = await fetch(`${API_BASE}/api/admin/drivers`);
      const drivers = await driversRes.json();
      setAdminDrivers(drivers);

      const usersRes = await fetch(`${API_BASE}/api/admin/users`);
      const users = await usersRes.json();
      setAdminUsers(users);

      const ordersRes = await fetch(`${API_BASE}/api/admin/orders`);
      const orders = await ordersRes.json();
      setAdminOrders(orders);

      const walletRes = await fetch(`${API_BASE}/api/admin/wallet`);
      const wallet = await walletRes.json();
      setAdminWallet(wallet);

      const radarRes = await fetch(`${API_BASE}/api/admin/radar`);
      const radar = await radarRes.json();
      setAdminRadar(radar);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authForm.email || !authForm.fullName) {
      showToast('error', 'Name and email are required.');
      return;
    }

    try {
      if (authTab === 'client') {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: authForm.email,
            fullName: authForm.fullName,
            role: 'client',
            phone: authForm.phone
          })
        });
        const loggedUser = await res.json();
        if (!res.ok) throw new Error(loggedUser.error);
        
        setUser(loggedUser);
        localStorage.setItem('armturn_user', JSON.stringify(loggedUser));
        showToast('success', `Welcome back, ${loggedUser.fullName}!`);
        setShowAuthModal(false);
        setActiveView('booking');
      } else {
        // Register Driver
        const res = await fetch(`${API_BASE}/api/auth/register-driver`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: authForm.email,
            fullName: authForm.fullName,
            phone: authForm.phone,
            dob: authForm.dob,
            carModel: authForm.carModel,
            carNumber: authForm.carNumber,
            capacity: authForm.capacity,
            passportUrl: authForm.passportUrl || 'https://vercel.com/blob/mock-scan.png'
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        
        setUser(data.user);
        localStorage.setItem('armturn_user', JSON.stringify(data.user));
        showToast('gold', 'Driver account registered! Awaiting Admin approval.');
        setShowAuthModal(false);
        setActiveView('driver');
      }
    } catch (err: any) {
      showToast('error', err.message);
    }
  };

  const handleCreateOrder = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (!bookingDate) {
      showToast('error', 'Please pick a travel date.');
      return;
    }

    try {
      const hotel = selectedRoute.objects.find((o: any) => o.type === 'hotel');
      const rest = selectedRoute.objects.find((o: any) => o.type === 'restaurant');

      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: user.id,
          routeId: selectedRoute.id,
          hotelId: includeHotel && hotel ? hotel.id : null,
          restaurantId: includeRest && rest ? rest.id : null,
          date: bookingDate,
          groupSize: parseInt(bookingGroupSize, 10)
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (data.vipTransferGranted) {
        showToast('gold', 'Luxury Tour Booked! Free VIP Airport Transfer included!');
      } else {
        showToast('success', 'Luxury Tour booked successfully!');
      }
      fetchClientBookings();
    } catch (err: any) {
      showToast('error', err.message);
    }
  };

  const submitReview = async () => {
    if (!pendingReviewOrder) return;
    try {
      const res = await fetch(`${API_BASE}/api/orders/${pendingReviewOrder.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: reviewRating,
          comment: reviewComment
        })
      });
      if (res.ok) {
        localStorage.setItem(`reviewed_${pendingReviewOrder.id}`, 'true');
        showToast('gold', 'Thank you for your rating! Safe travels with ArmTurn.');
        setPendingReviewOrder(null);
        setReviewComment('');
        fetchClientBookings();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDriverAction = async (orderId: string, action: 'accept' | 'start' | 'stop') => {
    try {
      const res = await fetch(`${API_BASE}/api/orders/${orderId}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driverId: activeDriverId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      showToast('success', data.message);
      fetchDriverBookings();
    } catch (err: any) {
      showToast('error', err.message);
    }
  };

  // Admin CMS
  const handleCMSAddRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/admin/routes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cmsRouteForm)
      });
      if (res.ok) {
        showToast('success', 'Route CMS updated successfully!');
        setCmsRouteForm({ id: '', title: '', description: '', coverImage: '', price: '', duration: '' });
        fetchRoutes();
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdminApproveDriver = async (driverId: string, status: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/drivers/${driverId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showToast('success', `Driver status set to: ${status}`);
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdminShadowBan = async (userId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${userId}/shadow-ban`, {
        method: 'POST'
      });
      const data = await res.json();
      if (res.ok) {
        showToast('success', data.message);
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Poll active radar coordinates & bookings
  useEffect(() => {
    fetchRoutes();
    if (user) {
      if (user.role === 'client') fetchClientBookings();
      if (user.role === 'driver') fetchDriverBookings();
    }

    const interval = setInterval(() => {
      if (activeView === 'admin') {
        fetchAdminData();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeView, user]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[var(--bg-main)] armenian-watermark-modern selection:bg-[#FFB347]/30">
      
      {/* Top Banner decoration */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#FFB347]/10 via-[#C0392B]/5 to-transparent pointer-events-none blur-[120px]"></div>

      {/* Navigation Header */}
      <nav className="fixed top-0 w-full glass-panel-modern z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <button onClick={() => setActiveView('landing')} className="flex items-center space-x-3 group">
              <div className="p-2.5 bg-gradient-to-tr from-[#FFB347] to-[#C0392B] rounded-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-amber-500/10">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-playfair font-black tracking-tight text-[var(--text-main)]">
                Arm<span className="text-[#FFB347] dark:text-[#C5A880]">Turn</span>
              </span>
            </button>

            {/* Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveView('landing')}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeView === 'landing' ? 'text-[#FFB347] dark:text-[#C5A880]' : 'hover:text-[#FFB347] text-[var(--text-muted)]'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => {
                  if (!user) setShowAuthModal(true);
                  else if (user.role === 'driver') showToast('error', 'Drivers cannot book client tours.');
                  else setActiveView('booking');
                }}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeView === 'booking' ? 'text-[#FFB347] dark:text-[#C5A880]' : 'hover:text-[#FFB347] text-[var(--text-muted)]'
                }`}
              >
                Book a Tour
              </button>
              <button 
                onClick={() => {
                  if (!user) { setAuthTab('driver'); setShowAuthModal(true); }
                  else if (user.role === 'client') showToast('error', 'Clients cannot access driver console.');
                  else setActiveView('driver');
                }}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeView === 'driver' ? 'text-[#FFB347] dark:text-[#C5A880]' : 'hover:text-[#FFB347] text-[var(--text-muted)]'
                }`}
              >
                Driver Hub
              </button>
              {isUrlAdmin && (
                <button 
                  onClick={() => setActiveView('admin')}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors text-rose-500 hover:text-rose-400 ${
                    activeView === 'admin' && 'underline'
                  }`}
                >
                  Admin Portal
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-5">
              
              {/* Theme toggler */}
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-xl border border-[var(--border-main)] hover:bg-[var(--border-main)]/35 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all"
                title="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
              </button>

              {/* User panel / Auth Button */}
              {!user ? (
                <button 
                  onClick={() => { setAuthTab('client'); setShowAuthModal(true); }}
                  className="btn-modern btn-apricot flex items-center space-x-2 shadow-lg"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-[var(--border-main)]/50 border border-[var(--border-main)] px-4 py-2 rounded-2xl">
                    <User className="w-4 h-4 text-[#FFB347]" />
                    <span className="text-xs font-bold text-[var(--text-main)] capitalize">{user.role}</span>
                  </div>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('armturn_user');
                      setUser(null);
                      setActiveView('landing');
                      showToast('success', 'Logged out successfully!');
                    }}
                    className="p-2.5 rounded-xl border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 transition-all"
                    title="Log Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      </nav>

      {/* Primary Workspace View Area */}
      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          
          {/* ==========================================
              A. PUBLIC LANDING VIEW
              ========================================== */}
          {activeView === 'landing' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-24"
            >
              
              {/* Hero */}
              <section className="text-center py-12 relative">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-3xl mx-auto space-y-6"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#C0392B] dark:text-[#C5A880] block animate-pulse">
                    The Ultimate Travel Experience
                  </span>
                  <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-tight text-[var(--text-main)]">
                    Sunny Armenian Modern <br />
                    <span className="bg-gradient-to-r from-[#FFB347] to-[#C0392B] bg-clip-text text-transparent">
                      Luxury Ecosystem
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
                    Premium fullstack adventure mapping, verified drivers, luxury lodging referrals, and real-time transit telemetry built on high-fidelity infrastructure.
                  </p>
                  <div className="flex justify-center space-x-4 pt-4">
                    <button 
                      onClick={() => {
                        if (!user) setShowAuthModal(true);
                        else setActiveView('booking');
                      }}
                      className="btn-modern btn-apricot text-sm"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Start Customizing Path</span>
                    </button>
                    <button 
                      onClick={() => {
                        const el = document.getElementById('about-armenia');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn-modern border border-[var(--border-main)] text-[var(--text-main)] hover:bg-[var(--border-main)]/40 text-sm"
                    >
                      Explore Culture
                    </button>
                  </div>
                </motion.div>
              </section>

              {/* About Armenia Block */}
              <section id="about-armenia" className="space-y-10">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-[var(--text-main)]">Explore Ancient Lands</h2>
                  <p className="text-sm text-[var(--text-muted)]">Discover historic monasteries, biblical mountains, and Hellenistic temples</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="glass-card-modern overflow-hidden group hover:scale-[1.02] hover:border-[#FFB347]/40 shadow-xl transition-all">
                    <div className="h-60 overflow-hidden relative">
                      <img 
                        src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=80" 
                        alt="Mount Ararat" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <h3 className="absolute bottom-5 left-6 text-xl font-bold text-white font-playfair">Mount Ararat</h3>
                    </div>
                    <div className="p-6.5 space-y-4">
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        The timeless biblical sentinel standing proud above the Ararat valley, reflecting the deep volcanic stone foundations of Armenian history.
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="glass-card-modern overflow-hidden group hover:scale-[1.02] hover:border-[#FFB347]/40 shadow-xl transition-all">
                    <div className="h-60 overflow-hidden relative">
                      <img 
                        src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80" 
                        alt="Tatev Monastery" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <h3 className="absolute bottom-5 left-6 text-xl font-bold text-white font-playfair">Tatev Monastery</h3>
                    </div>
                    <div className="p-6.5 space-y-4">
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        A medieval engineering marvel hanging over the deep basalt canyon of Vorotan, reached by the longest reversible aerial tramway on earth.
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="glass-card-modern overflow-hidden group hover:scale-[1.02] hover:border-[#FFB347]/40 shadow-xl transition-all">
                    <div className="h-60 overflow-hidden relative">
                      <img 
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" 
                        alt="Garni Temple" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <h3 className="absolute bottom-5 left-6 text-xl font-bold text-white font-playfair">Garni Pagan Temple</h3>
                    </div>
                    <div className="p-6.5 space-y-4">
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        The sole surviving Greco-Roman colonnaded temple in the region, resting majestically on a triangular basalt cliff above the Azat gorge.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Public Routes Showcase */}
              <section className="space-y-10">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-[var(--text-main)]">Signature Luxury Paths</h2>
                  <p className="text-sm text-[var(--text-muted)]">Preview our fully custom curated tours before booking</p>
                </div>

                <div className="space-y-8">
                  {routes.map((route: any) => (
                    <div key={route.id} className="glass-card-modern overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:border-[#FFB347]/30 transition-colors shadow-2xl">
                      
                      <div className="lg:col-span-5 h-64 lg:h-auto overflow-hidden relative">
                        <img src={route.cover_image} alt={route.title} className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4 bg-black/55 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#FFB347] dark:text-[#C5A880]">
                          {route.duration}
                        </div>
                      </div>

                      <div className="lg:col-span-7 p-8 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <h3 className="text-2xl font-bold font-playfair text-[var(--text-main)]">{route.title}</h3>
                            <span className="text-2xl font-bold text-[#FFB347] dark:text-[#C5A880] font-mono">${route.price}</span>
                          </div>
                          <p className="text-xs text-[var(--text-muted)] leading-relaxed">{route.description}</p>
                          
                          {/* Objects Along the Path Preview */}
                          <div className="pt-2 border-t border-[var(--border-main)]/50">
                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Luxury Stops along the road:</h4>
                            <div className="flex flex-wrap gap-3">
                              {route.objects?.map((obj: any) => (
                                <div key={obj.id} className="flex items-center space-x-2 bg-[var(--border-main)]/30 border border-[var(--border-main)] px-3 py-1.5 rounded-xl">
                                  <MapPin className="w-3.5 h-3.5 text-[#C0392B]" />
                                  <span className="text-xs font-semibold text-[var(--text-main)]">{obj.name} ({obj.type})</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end pt-4">
                          <button 
                            onClick={() => {
                              if (!user) setShowAuthModal(true);
                              else {
                                setSelectedRoute(route);
                                setActiveView('booking');
                              }
                            }}
                            className="btn-modern btn-apricot text-xs flex items-center space-x-2"
                          >
                            <Calendar className="w-4 h-4" />
                            <span>Select & Build Path</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </section>

              {/* About Us & Services */}
              <section className="glass-card-modern p-8 sm:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#C0392B]/5 blur-[120px] rounded-full"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C0392B] dark:text-[#C5A880]">Our Philosophy</span>
                    <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-[var(--text-main)]">Luxury Service Embedded in Ancient Roots</h2>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      ArmTurn is not just a routing engine; it is a fullstack luxury ecosystem. We handpick and verify premium local drivers using advanced vetting systems, establish direct pipelines with the most distinguished high-alpine lodges and organic traditional gastro-taverns, and provide real-time GPS telemetry checks to guarantee unmatched security, punctuality, and cultural immersion.
                    </p>
                    <div className="grid grid-cols-2 gap-5 text-left pt-2">
                      <div className="space-y-2">
                        <h4 className="font-bold text-[var(--text-main)] text-sm flex items-center space-x-2">
                          <ShieldCheck className="w-4 h-4 text-[#FFB347]" />
                          <span>Vetted Drivers</span>
                        </h4>
                        <p className="text-[11px] text-[var(--text-muted)]">Verified ID, car diagnostics & capacity.</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-bold text-[var(--text-main)] text-sm flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-[#FFB347]" />
                          <span>Smart Bonuses</span>
                        </h4>
                        <p className="text-[11px] text-[var(--text-muted)]">Automated VIP transfers for global clients.</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-80 rounded-2xl overflow-hidden shadow-2xl relative">
                    <img 
                      src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80" 
                      alt="Luxury Lodge" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white font-playfair text-xl font-bold">Dilijan Luxury Heights Referrals</div>
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* ==========================================
              B. BOOKING CONSTRUCTOR (CLIENT)
              ========================================== */}
          {activeView === 'booking' && user && (
            <motion.div 
              key="booking"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-10"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[var(--border-main)] pb-6 gap-4">
                <div>
                  <h1 className="text-3xl font-bold font-playfair text-[var(--text-main)]">Customize Your Travel Path</h1>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Configure your destination, referral dining, lodging, and coordinate details</p>
                </div>
                <button 
                  onClick={fetchClientBookings}
                  className="flex items-center space-x-2 text-xs font-semibold text-[#FFB347]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync Bookings</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Form: Path Settings */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Select Route */}
                  <div className="glass-card-modern p-6 space-y-4 shadow-xl">
                    <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center space-x-2">
                      <Compass className="w-5 h-5 text-[#FFB347]" />
                      <span>1. Select Travel Route</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {routes.map(r => (
                        <button
                          key={r.id}
                          onClick={() => setSelectedRoute(r)}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            selectedRoute?.id === r.id 
                              ? 'bg-gradient-to-tr from-[#FFB347]/10 to-[#C0392B]/5 border-[#FFB347] text-[var(--text-main)] shadow-md shadow-amber-500/5'
                              : 'bg-slate-900/10 dark:bg-slate-900/40 border-[var(--border-main)] text-[var(--text-muted)] hover:border-[#FFB347]/30 hover:text-[var(--text-main)]'
                          }`}
                        >
                          <span className="font-bold text-xs uppercase tracking-wider block text-[var(--text-muted)] mb-1">{r.duration}</span>
                          <span className="font-bold text-sm line-clamp-1">{r.title}</span>
                          <span className="font-bold text-xs text-[#FFB347] dark:text-[#C5A880] block mt-1">${r.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Path objects: Hotels / Taverns Referral */}
                  {selectedRoute && (
                    <div className="glass-card-modern p-6 space-y-6 shadow-xl">
                      <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center space-x-2">
                        <Layers className="w-5 h-5 text-[#FFB347]" />
                        <span>2. Recommended Luxury Stops strictly along the Path</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* Hotel object */}
                        {selectedRoute.objects?.filter((o: any) => o.type === 'hotel').map((hotel: any) => (
                          <div key={hotel.id} className="border border-[var(--border-main)] rounded-2xl overflow-hidden relative flex flex-col justify-between bg-[var(--bg-main)]/50">
                            <div className="h-44 relative">
                              <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase text-[#FFB347]">
                                Highly Rated Lodging
                              </div>
                            </div>
                            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                              <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-bold text-sm text-[var(--text-main)]">{hotel.name}</h4>
                                  <span className="font-bold text-xs text-[#FFB347] dark:text-[#C5A880] font-mono">${hotel.price}</span>
                                </div>
                                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{hotel.description}</p>
                              </div>

                              <div className="pt-2 border-t border-[var(--border-main)]/40 flex justify-between items-center">
                                <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Include in Path</span>
                                <input 
                                  type="checkbox" 
                                  checked={includeHotel}
                                  onChange={(e) => setIncludeHotel(e.target.checked)}
                                  className="h-4.5 w-4.5 rounded border-slate-700 text-[#FFB347] focus:ring-amber-500 accent-[#FFB347]"
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Restaurant object */}
                        {selectedRoute.objects?.filter((o: any) => o.type === 'restaurant').map((rest: any) => (
                          <div key={rest.id} className="border border-[var(--border-main)] rounded-2xl overflow-hidden relative flex flex-col justify-between bg-[var(--bg-main)]/50">
                            <div className="h-44 relative">
                              <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
                              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase text-[#C0392B]">
                                Gastronomic Taverna
                              </div>
                            </div>
                            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                              <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-bold text-sm text-[var(--text-main)]">{rest.name}</h4>
                                  <span className="font-bold text-xs text-[#FFB347] dark:text-[#C5A880] font-mono">${rest.price}</span>
                                </div>
                                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{rest.description}</p>
                                <div className="bg-[var(--border-main)]/30 p-2 rounded-xl text-[10px] font-mono text-[var(--text-muted)]">
                                  <span className="font-bold block text-slate-400">Specials:</span> {rest.menu}
                                </div>
                              </div>

                              <div className="pt-2 border-t border-[var(--border-main)]/40 flex justify-between items-center">
                                <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Include in Path</span>
                                <input 
                                  type="checkbox" 
                                  checked={includeRest}
                                  onChange={(e) => setIncludeRest(e.target.checked)}
                                  className="h-4.5 w-4.5 rounded border-slate-700 text-[#FFB347] focus:ring-amber-500 accent-[#FFB347]"
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>
                  )}

                </div>

                {/* Right Panel: Booking Summary */}
                <div className="lg:col-span-1 space-y-6">
                  
                  {/* Summary card */}
                  <div className="glass-card-modern p-6 space-y-5 shadow-2xl border-t-2 border-t-[#FFB347]">
                    <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center space-x-2">
                      <CreditCard className="w-5 h-5 text-[#FFB347]" />
                      <span>Booking Summary</span>
                    </h3>

                    {selectedRoute && (
                      <div className="space-y-4">
                        <div className="space-y-2.5 text-xs">
                          <div className="flex justify-between text-[var(--text-muted)]">
                            <span>Selected Tour Route:</span>
                            <span className="font-bold text-[var(--text-main)]">{selectedRoute.title}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[var(--text-muted)]">Base Price:</span>
                            <span className="font-bold text-[var(--text-main)] font-mono">${selectedRoute.price}</span>
                          </div>
                          
                          {includeHotel && selectedRoute.objects?.find((o: any) => o.type === 'hotel') && (
                            <div className="flex justify-between">
                              <span className="text-[var(--text-muted)]">Lodge Lodging:</span>
                              <span className="font-bold text-[var(--text-main)] font-mono">+${selectedRoute.objects.find((o: any) => o.type === 'hotel').price}</span>
                            </div>
                          )}

                          {includeRest && selectedRoute.objects?.find((o: any) => o.type === 'restaurant') && (
                            <div className="flex justify-between">
                              <span className="text-[var(--text-muted)]">Gastro Taverna:</span>
                              <span className="font-bold text-[var(--text-main)] font-mono">+${selectedRoute.objects.find((o: any) => o.type === 'restaurant').price}</span>
                            </div>
                          )}
                        </div>

                        {/* Smart Bonus Announcement */}
                        <div className="p-4 bg-gradient-to-tr from-[#FFB347]/20 via-[#C5A880]/15 to-[#C0392B]/5 border border-[#FFB347]/30 rounded-2xl relative overflow-hidden shadow-inner">
                          <div className="flex items-start space-x-3">
                            <Sparkles className="w-5 h-5 text-[#FFB347] shrink-0 animate-pulse mt-0.5" />
                            <div>
                              <h4 className="text-xs font-bold text-[var(--text-main)]">Smart Bonus Active!</h4>
                              <p className="text-[10px] text-[var(--text-muted)] mt-1 leading-relaxed">
                                Because your travel is scheduled in the future, we have automatically added a **Free VIP Airport Transfer from Zvartnots Airport (EVN)** with your dedicated luxury driver!
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Date & Group size inputs */}
                        <div className="space-y-4 pt-3 border-t border-[var(--border-main)]/50">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">Travel Date*</label>
                            <input 
                              type="date"
                              value={bookingDate}
                              onChange={(e) => setBookingDate(e.target.value)}
                              className="w-full px-4 py-2.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl text-xs focus:outline-none focus:border-[#FFB347] focus:ring-1 focus:ring-[#FFB347]/20"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">Group Size (Adults)</label>
                            <select 
                              value={bookingGroupSize}
                              onChange={(e) => setBookingGroupSize(e.target.value)}
                              className="w-full px-4 py-2.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl text-xs focus:outline-none focus:border-[#FFB347] focus:ring-1 focus:ring-[#FFB347]/20"
                            >
                              <option value="1">1 Person</option>
                              <option value="2">2 Persons</option>
                              <option value="3">3 Persons</option>
                              <option value="4">4 Persons</option>
                              <option value="5">5 Persons</option>
                              <option value="6">6 Persons (Max)</option>
                            </select>
                          </div>
                        </div>

                        {/* Grand Total */}
                        <div className="pt-4 border-t border-[var(--border-main)]/50 flex justify-between items-center">
                          <span className="font-bold text-sm text-[var(--text-main)]">Grand Total:</span>
                          <span className="text-2xl font-black text-[#FFB347] dark:text-[#C5A880] font-mono">
                            ${(
                              parseFloat(selectedRoute.price) + 
                              (includeHotel ? parseFloat(selectedRoute.objects.find((o: any) => o.type === 'hotel')?.price || 0) : 0) +
                              (includeRest ? parseFloat(selectedRoute.objects.find((o: any) => o.type === 'restaurant')?.price || 0) : 0)
                            ).toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={handleCreateOrder}
                          className="w-full btn-modern btn-apricot text-xs font-bold py-3.5 shadow-xl flex items-center justify-center space-x-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Confirm & Book Luxury Tour</span>
                        </button>

                      </div>
                    )}
                  </div>

                </div>

              </div>

              {/* Bookings list */}
              <div className="glass-card-modern p-6 sm:p-8 space-y-6 shadow-xl">
                <h3 className="text-xl font-bold text-[var(--text-main)] font-playfair flex items-center space-x-2.5">
                  <Layers className="w-5.5 h-5.5 text-[#FFB347]" />
                  <span>Your luxury itineraries</span>
                </h3>

                {clientOrders.length === 0 ? (
                  <div className="text-center py-12 text-[var(--text-muted)] text-sm">
                    No bookings placed yet. Customize your path above to reserve your luxury Armenian adventure.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {clientOrders.map((order: any) => (
                      <div key={order.id} className="border border-[var(--border-main)] p-5 rounded-2xl flex flex-col md:flex-row justify-between items-stretch md:items-center bg-[var(--bg-main)]/40 hover:border-[#FFB347]/30 transition-colors gap-4">
                        <div className="flex items-center space-x-4">
                          <img src={order.cover_image} alt={order.route_title} className="w-16 h-16 rounded-xl object-cover" />
                          <div>
                            <h4 className="font-bold text-sm text-[var(--text-main)]">{order.route_title}</h4>
                            <p className="text-[11px] text-[var(--text-muted)] mt-1 flex items-center gap-3">
                              <span>Date: {order.date}</span>
                              <span>•</span>
                              <span>Amount: ${order.total_amount}</span>
                              {order.vip_transfer && (
                                <span className="bg-[#FFB347]/20 text-[#FFB347] font-bold text-[9px] px-2 py-0.5 rounded-full border border-[#FFB347]/30">VIP Airport Transfer</span>
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-5 justify-between md:justify-end">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block text-right">Status</span>
                            <span className={`text-xs font-bold uppercase ${
                              order.status === 'completed' ? 'text-emerald-500' :
                              order.status === 'started' ? 'text-cyan-400 animate-pulse' :
                              order.status === 'accepted' ? 'text-indigo-400' : 'text-amber-500'
                            }`}>
                              {order.status}
                            </span>
                          </div>

                          {order.driver_name && (
                            <div className="text-right border-l border-[var(--border-main)] pl-5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Your Driver</span>
                              <span className="text-xs font-bold text-[var(--text-main)] block">{order.driver_name}</span>
                              <span className="text-[10px] text-slate-500 font-mono">{order.car_model} ({order.car_number})</span>
                            </div>
                          )}
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

            </motion.div>
          )}

          {/* ==========================================
              C. DRIVER CONSOLE (DRIVER)
              ========================================== */}
          {activeView === 'driver' && user && (
            <motion.div 
              key="driver"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-10"
            >
              
              {/* Check if driver is approved */}
              {driverProfile && driverProfile.status === 'pending' ? (
                <div className="glass-card-modern p-10 text-center space-y-6 max-w-xl mx-auto shadow-2xl">
                  <ShieldAlert className="h-16 w-16 text-[#FFB347] mx-auto animate-pulse" />
                  <h2 className="text-2xl font-bold font-playfair text-[var(--text-main)]">Driver Profile Under Review</h2>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Thank you for applying as an ArmTurn Luxury Partner! Your passport documents, driver details, and car passenger capacity are currently being vetted by our Administrators. You will be able to access the driver workspace once approved.
                  </p>
                  <button 
                    onClick={fetchDriverBookings}
                    className="btn-modern btn-apricot text-xs mx-auto"
                  >
                    Check Status
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[var(--border-main)] pb-6 gap-4">
                    <div>
                      <h1 className="text-3xl font-bold font-playfair text-[var(--text-main)]">Driver Partner Console</h1>
                      <p className="text-xs text-[var(--text-muted)] mt-1">Accept high-tier tours, toggle telemetry checks, and view path destinations</p>
                    </div>
                    <button 
                      onClick={fetchDriverBookings}
                      className="flex items-center space-x-2 text-xs font-semibold text-[#FFB347]"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh Job Board</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left: Job Exchange and active trips */}
                    <div className="lg:col-span-2 space-y-6">
                      
                      {/* Active Order in progress */}
                      <div className="glass-card-modern p-6 space-y-5 shadow-xl border-l-2 border-l-[#C0392B]">
                        <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center space-x-2">
                          <Car className="w-5 h-5 text-[#C0392B]" />
                          <span>Active Assigned Booking</span>
                        </h3>

                        {driverOrders.filter((o: any) => o.status === 'accepted' || o.status === 'started').length === 0 ? (
                          <p className="text-xs text-[var(--text-muted)]">No active trip in progress. Grab an available trip from the exchange below!</p>
                        ) : (
                          driverOrders.filter((o: any) => o.status === 'accepted' || o.status === 'started').map((order: any) => (
                            <div key={order.id} className="space-y-5">
                              <div className="flex justify-between items-start border-b border-[var(--border-main)]/50 pb-4">
                                <div>
                                  <h4 className="font-bold text-base text-[var(--text-main)]">{order.route_title}</h4>
                                  <span className="text-[11px] text-[var(--text-muted)]">Date: {order.date} | Group Size: {order.group_size} Adults</span>
                                  {order.vip_transfer && (
                                    <span className="bg-[#FFB347]/20 text-[#FFB347] font-bold text-[9px] px-2 py-0.5 rounded-full border border-[#FFB347]/30 block w-max mt-2">VIP Airport Transfer Requested</span>
                                  )}
                                </div>
                                <span className="text-xl font-bold text-[#FFB347] font-mono">${(order.total_amount * 0.85).toFixed(2)} (Earned)</span>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Client Contact</span>
                                  <span className="font-bold text-sm text-[var(--text-main)] block">{order.client_name}</span>
                                  <span className="text-xs text-[#FFB347] font-mono">{order.client_phone}</span>
                                </div>

                                <div className="flex items-center space-x-3">
                                  {order.status === 'accepted' ? (
                                    <button
                                      onClick={() => handleDriverAction(order.id, 'start')}
                                      className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl text-xs transition-all flex items-center space-x-1.5"
                                    >
                                      <Navigation className="w-3.5 h-3.5 animate-pulse" />
                                      <span>Start Trip</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleDriverAction(order.id, 'stop')}
                                      className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-xs transition-all flex items-center space-x-1.5"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                      <span>Stop Trip</span>
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Interactive SVG mock map route */}
                              <div className="border border-[var(--border-main)] rounded-2xl p-4 bg-slate-950/20 relative overflow-hidden">
                                <div className="flex justify-between items-center mb-3">
                                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Armenia Live Route Telemetry</span>
                                  <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full font-bold animate-pulse">Live</span>
                                </div>
                                <div className="h-44 relative bg-slate-900/40 rounded-xl flex items-center justify-center border border-[var(--border-main)]/30">
                                  {/* Draw simulated Armenian route */}
                                  <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 400 200">
                                    {/* Line */}
                                    <path d="M 50 150 Q 150 50 200 120 T 350 80" fill="none" stroke="#FFB347" strokeWidth="4" strokeDasharray="6 4" />
                                    {/* Start */}
                                    <circle cx="50" cy="150" r="8" fill="#C0392B" />
                                    <text x="35" y="180" fill="#fff" fontSize="10" fontWeight="bold">Yerevan</text>
                                    {/* End */}
                                    <circle cx="350" cy="80" r="8" fill="#0EA5E9" />
                                    <text x="320" y="60" fill="#fff" fontSize="10" fontWeight="bold">Destination</text>
                                    
                                    {/* Active driver coordinate marker */}
                                    {order.status === 'started' && (
                                      <g>
                                        <circle cx="180" cy="100" r="10" fill="#FFB347" className="animate-ping" />
                                        <circle cx="180" cy="100" r="6" fill="#FFB347" />
                                        <path d="M 180 100 L 195 85" stroke="#fff" strokeWidth="1.5" />
                                        <rect x="195" y="70" width="80" height="20" rx="4" fill="rgba(0,0,0,0.8)" />
                                        <text x="200" y="83" fill="#FFB347" fontSize="8" fontWeight="bold">V-Class GPS: 40.17</text>
                                      </g>
                                    )}
                                  </svg>
                                </div>
                                <div className="mt-3 text-[10px] text-[var(--text-muted)] leading-relaxed">
                                  <span className="font-bold text-slate-400">Luxury Driver Tip:</span> Follow the road strictly through the gorge, park at the dedicated VIP entrance (look for the gold ArmTurn flag at the facade).
                                </div>
                              </div>

                            </div>
                          ))
                        )}
                      </div>

                      {/* Job Exchange Board */}
                      <div className="glass-card-modern p-6 space-y-5 shadow-xl">
                        <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center space-x-2">
                          <Layers className="w-5 h-5 text-[#FFB347]" />
                          <span>ArmTurn Live Job Exchange</span>
                        </h3>

                        {driverOrders.filter((o: any) => o.status === 'pending').length === 0 ? (
                          <p className="text-xs text-[var(--text-muted)] text-center py-10">No pending trips on the board right now. Check back soon!</p>
                        ) : (
                          <div className="space-y-4">
                            {driverOrders.filter((o: any) => o.status === 'pending').map((order: any) => (
                              <div key={order.id} className="border border-[var(--border-main)] p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[var(--bg-main)]/50 gap-4">
                                <div className="flex items-center space-x-3">
                                  <img src={order.cover_image} alt={order.route_title} className="w-12 h-12 rounded-lg object-cover" />
                                  <div>
                                    <h4 className="font-bold text-sm text-[var(--text-main)]">{order.route_title}</h4>
                                    <p className="text-[10px] text-[var(--text-muted)]">Date: {order.date} | Group: {order.group_size} Pax</p>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-5 justify-between sm:justify-end w-full sm:w-auto">
                                  <div className="text-left sm:text-right">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Payout</span>
                                    <span className="text-sm font-bold text-[#FFB347] font-mono">${(order.total_amount * 0.85).toFixed(2)}</span>
                                  </div>
                                  <button
                                    onClick={() => handleDriverAction(order.id, 'accept')}
                                    className="px-5 py-2 bg-[#FFB347] hover:bg-amber-400 text-black font-bold rounded-lg text-xs transition-all"
                                  >
                                    Accept Trip
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Right Panel: Driver stats */}
                    <div className="lg:col-span-1 space-y-6">
                      <div className="glass-card-modern p-6 space-y-5 shadow-xl">
                        <h3 className="text-base font-bold text-[var(--text-main)] flex items-center space-x-2">
                          <ShieldCheck className="w-4.5 h-4.5 text-[#FFB347]" />
                          <span>Driver Partner Status</span>
                        </h3>

                        <div className="space-y-4 text-xs">
                          <div className="flex justify-between">
                            <span className="text-[var(--text-muted)]">Verified Account</span>
                            <span className="font-bold text-emerald-500">Approved</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[var(--text-muted)]">Vehicle Class</span>
                            <span className="font-semibold text-[var(--text-main)]">VIP V-Class</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[var(--text-muted)]">Active Orders Count</span>
                            <span className="font-bold text-[var(--text-main)]">
                              {driverOrders.filter((o: any) => o.status === 'completed').length}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[var(--text-muted)]">Platform Commission</span>
                            <span className="font-bold text-rose-500">15%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </>
              )}

            </motion.div>
          )}

          {/* ==========================================
              D. SECRET ADMIN CMS PANEL (/admin-secret-url)
              ========================================== */}
          {activeView === 'admin' && (
            <motion.div 
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-10"
            >
              <div className="border-b border-[var(--border-main)] pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold font-playfair text-[var(--text-main)]">ArmTurn Secret Admin Panel</h1>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Gaining total control of route configurations, user permissions, and real-time telemetry</p>
                </div>
                
                {/* Switch Tabs */}
                <div className="flex bg-[var(--border-main)]/40 border border-[var(--border-main)] p-1.5 rounded-2xl space-x-2 text-xs font-semibold">
                  <button 
                    onClick={() => setAdminTab('radar')}
                    className={`px-4 py-2 rounded-xl transition-all ${adminTab === 'radar' ? 'bg-[#FFB347] text-black shadow-md' : 'text-[var(--text-muted)]'}`}
                  >
                    Live Radar
                  </button>
                  <button 
                    onClick={() => setAdminTab('drivers')}
                    className={`px-4 py-2 rounded-xl transition-all ${adminTab === 'drivers' ? 'bg-[#FFB347] text-black shadow-md' : 'text-[var(--text-muted)]'}`}
                  >
                    Vetting CMS
                  </button>
                  <button 
                    onClick={() => setAdminTab('users')}
                    className={`px-4 py-2 rounded-xl transition-all ${adminTab === 'users' ? 'bg-[#FFB347] text-black shadow-md' : 'text-[var(--text-muted)]'}`}
                  >
                    Users
                  </button>
                  <button 
                    onClick={() => setAdminTab('routes')}
                    className={`px-4 py-2 rounded-xl transition-all ${adminTab === 'routes' ? 'bg-[#FFB347] text-black shadow-md' : 'text-[var(--text-muted)]'}`}
                  >
                    Routes CMS
                  </button>
                  <button 
                    onClick={() => setAdminTab('wallet')}
                    className={`px-4 py-2 rounded-xl transition-all ${adminTab === 'wallet' ? 'bg-[#FFB347] text-black shadow-md' : 'text-[var(--text-muted)]'}`}
                  >
                    Wallet
                  </button>
                </div>
              </div>

              {/* View 1: Live Radar */}
              {adminTab === 'radar' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 glass-card-modern p-6 space-y-4 shadow-xl">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-cyan-400" />
                        <span>Live Armenia Transit Radar</span>
                      </h3>
                      <span className="text-[10px] bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full font-bold animate-pulse">Synchronizing</span>
                    </div>

                    <div className="h-96 relative bg-slate-950/60 rounded-3xl border border-[var(--border-main)]/60 flex items-center justify-center overflow-hidden">
                      {/* Simulating beautiful topographic vector map of Armenia */}
                      <svg className="absolute inset-0 w-full h-full p-6" viewBox="0 0 600 300">
                        {/* Boundaries and topographic contours */}
                        <path d="M 50 250 C 150 150, 100 80, 200 50 C 300 20, 450 80, 500 150 C 550 220, 480 280, 300 280 Z" fill="none" stroke="rgba(255,179,71,0.08)" strokeWidth="3" />
                        <path d="M 120 200 C 180 140, 150 100, 220 80 C 280 60, 380 100, 420 150 C 460 200, 410 240, 280 240 Z" fill="none" stroke="rgba(255,179,71,0.04)" strokeWidth="2" />
                        
                        {/* Sevan Lake */}
                        <path d="M 400 110 Q 420 90 450 110 T 480 130 Q 440 160 410 140 Z" fill="rgba(14,165,233,0.15)" stroke="rgba(14,165,233,0.3)" strokeWidth="1.5" />
                        <text x="440" y="125" fill="#0EA5E9" fontSize="8" fontWeight="bold" opacity="0.6">Lake Sevan</text>

                        {/* Routes path */}
                        <path d="M 150 180 Q 250 80, 320 160 T 480 120" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                        
                        {/* Cities */}
                        <circle cx="150" cy="180" r="4" fill="#C0392B" />
                        <text x="135" y="195" fill="var(--text-muted)" fontSize="9" fontWeight="bold">Yerevan</text>

                        <circle cx="320" cy="160" r="4" fill="#FFB347" />
                        <text x="310" y="175" fill="var(--text-muted)" fontSize="9" fontWeight="bold">Dilijan</text>

                        {/* Active moving driver markers */}
                        {adminRadar.map((driver) => (
                          <g key={driver.id} className="cursor-pointer group">
                            {/* Marker */}
                            <circle 
                              cx={Math.max(100, Math.min(500, 150 + (parseFloat(driver.lat) - 40.17) * 4000))} 
                              cy={Math.max(50, Math.min(250, 180 - (parseFloat(driver.lng) - 44.5) * 4000))} 
                              r="8" 
                              fill="#FFB347" 
                              className="animate-ping" 
                            />
                            <circle 
                              cx={Math.max(100, Math.min(500, 150 + (parseFloat(driver.lat) - 40.17) * 4000))} 
                              cy={Math.max(50, Math.min(250, 180 - (parseFloat(driver.lng) - 44.5) * 4000))} 
                              r="5" 
                              fill="#FFB347" 
                            />
                            
                            {/* Hover driver panel details */}
                            <foreignObject 
                              x={Math.max(100, Math.min(500, 150 + (parseFloat(driver.lat) - 40.17) * 4000)) - 60} 
                              y={Math.max(50, Math.min(250, 180 - (parseFloat(driver.lng) - 44.5) * 4000)) - 45} 
                              width="120" 
                              height="40"
                            >
                              <div className="bg-black/80 border border-[#FFB347]/30 p-1.5 rounded-lg text-center backdrop-blur-md">
                                <span className="text-[7.5px] font-bold text-white block truncate">{driver.driver_name}</span>
                                <span className="text-[6.5px] text-[#FFB347] font-mono block">{driver.car_number}</span>
                              </div>
                            </foreignObject>
                          </g>
                        ))}
                      </svg>
                    </div>
                  </div>

                  {/* Active telemetry logs */}
                  <div className="lg:col-span-1 glass-card-modern p-6 space-y-5 shadow-xl">
                    <h3 className="text-base font-bold text-[var(--text-main)] flex items-center space-x-2">
                      <Layers className="w-4.5 h-4.5 text-[#FFB347]" />
                      <span>Live Telemetry Streams</span>
                    </h3>

                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2 text-xs">
                      {adminRadar.length === 0 ? (
                        <p className="text-[11px] text-[var(--text-muted)]">No active drivers online right now.</p>
                      ) : (
                        adminRadar.map(d => (
                          <div key={d.id} className="border border-[var(--border-main)]/50 p-3.5 rounded-xl space-y-2 bg-[var(--bg-main)]/50">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-[var(--text-main)]">{d.driver_name}</span>
                              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-semibold px-2 py-0.5 rounded-full">Active</span>
                            </div>
                            <div className="font-mono text-[9px] text-[var(--text-muted)] space-y-1">
                              <div>Car: {d.car_model}</div>
                              <div>Coordinates: {parseFloat(d.lat).toFixed(4)}°N, {parseFloat(d.lng).toFixed(4)}°E</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* View 2: Drivers CMS Vetting */}
              {adminTab === 'drivers' && (
                <div className="glass-card-modern p-6 shadow-xl space-y-6">
                  <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-[#FFB347]" />
                    <span>Driver Vetting & Approvals</span>
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[var(--border-main)] text-xs uppercase text-[var(--text-muted)] font-bold">
                          <th className="pb-4 px-4">Name</th>
                          <th className="pb-4 px-4">Phone / DOB</th>
                          <th className="pb-4 px-4">Vehicle Specs</th>
                          <th className="pb-4 px-4">Document Scan</th>
                          <th className="pb-4 px-4">Status</th>
                          <th className="pb-4 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border-main)]/40 text-xs">
                        {adminDrivers.map((driver) => (
                          <tr key={driver.id} className="hover:bg-[var(--border-main)]/10 transition-colors">
                            <td className="py-4 px-4 font-bold text-[var(--text-main)]">
                              <div>{driver.fullName}</div>
                              <span className="text-[10px] text-[var(--text-muted)] font-mono">{driver.email}</span>
                            </td>
                            <td className="py-4 px-4 text-[var(--text-muted)]">
                              <div>{driver.phone}</div>
                              <div>{driver.dob}</div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-semibold text-[var(--text-main)]">{driver.car_model}</div>
                              <div className="text-[10px] text-[var(--text-muted)] font-mono">{driver.car_number} | Capacity: {driver.capacity} Pax</div>
                            </td>
                            <td className="py-4 px-4">
                              <a href={driver.passport_url} target="_blank" rel="noreferrer" className="text-cyan-500 hover:underline flex items-center space-x-1">
                                <Eye className="w-3.5 h-3.5" />
                                <span>Inspect Passport</span>
                              </a>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                                driver.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                                driver.status === 'rejected' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                              }`}>
                                {driver.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  onClick={() => handleAdminApproveDriver(driver.id, 'approved')}
                                  className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/20 rounded-lg transition-all"
                                  title="Approve Driver"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleAdminApproveDriver(driver.id, 'rejected')}
                                  className="p-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 rounded-lg transition-all"
                                  title="Reject Driver"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* View 3: User Permissions & Shadow Ban */}
              {adminTab === 'users' && (
                <div className="glass-card-modern p-6 shadow-xl space-y-6">
                  <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center space-x-2">
                    <Users className="w-5 h-5 text-[#FFB347]" />
                    <span>User Management & Access Control</span>
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[var(--border-main)] text-xs uppercase text-[var(--text-muted)] font-bold">
                          <th className="pb-4 px-4">User</th>
                          <th className="pb-4 px-4">Contact</th>
                          <th className="pb-4 px-4">Role</th>
                          <th className="pb-4 px-4">Permissions</th>
                          <th className="pb-4 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border-main)]/40 text-xs">
                        {adminUsers.map((u) => (
                          <tr key={u.id} className="hover:bg-[var(--border-main)]/10 transition-colors">
                            <td className="py-4 px-4 font-bold text-[var(--text-main)]">
                              <div>{u.fullName}</div>
                              <span className="text-[10px] text-[var(--text-muted)] font-mono">{u.id}</span>
                            </td>
                            <td className="py-4 px-4 text-[var(--text-muted)]">
                              <div>{u.email}</div>
                              <div>{u.phone}</div>
                            </td>
                            <td className="py-4 px-4 capitalize font-semibold text-[var(--text-main)]">{u.role}</td>
                            <td className="py-4 px-4">
                              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                                u.shadow_banned ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              }`}>
                                {u.shadow_banned ? 'Shadow Banned' : 'Regular Access'}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button
                                onClick={() => handleAdminShadowBan(u.id)}
                                className={`px-4 py-1.5 font-bold rounded-lg transition-all ${
                                  u.shadow_banned 
                                    ? 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/20' 
                                    : 'bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20'
                                }`}
                              >
                                {u.shadow_banned ? 'Lift Ban' : 'Shadow Ban'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* View 4: Routes CMS */}
              {adminTab === 'routes' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Create / Edit Form */}
                  <div className="lg:col-span-1 glass-card-modern p-6 shadow-xl space-y-4">
                    <h3 className="text-base font-bold text-[var(--text-main)] flex items-center space-x-2">
                      <Plus className="w-4.5 h-4.5 text-[#FFB347]" />
                      <span>Configure Travel Path</span>
                    </h3>

                    <form onSubmit={handleCMSAddRoute} className="space-y-4 text-xs">
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Route ID*</label>
                        <input 
                          type="text" 
                          placeholder="e.g. r-tatev"
                          value={cmsRouteForm.id}
                          onChange={(e) => setCmsRouteForm({ ...cmsRouteForm, id: e.target.value })}
                          className="w-full px-3 py-2 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl focus:outline-none focus:border-[#FFB347]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Route Title*</label>
                        <input 
                          type="text" 
                          placeholder="Title..."
                          value={cmsRouteForm.title}
                          onChange={(e) => setCmsRouteForm({ ...cmsRouteForm, title: e.target.value })}
                          className="w-full px-3 py-2 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl focus:outline-none focus:border-[#FFB347]"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Base Price ($)*</label>
                          <input 
                            type="number" 
                            placeholder="Price"
                            value={cmsRouteForm.price}
                            onChange={(e) => setCmsRouteForm({ ...cmsRouteForm, price: e.target.value })}
                            className="w-full px-3 py-2 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl focus:outline-none focus:border-[#FFB347]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Duration*</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 10 hours"
                            value={cmsRouteForm.duration}
                            onChange={(e) => setCmsRouteForm({ ...cmsRouteForm, duration: e.target.value })}
                            className="w-full px-3 py-2 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl focus:outline-none focus:border-[#FFB347]"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Cover Image URL</label>
                        <input 
                          type="text" 
                          placeholder="https://..."
                          value={cmsRouteForm.coverImage}
                          onChange={(e) => setCmsRouteForm({ ...cmsRouteForm, coverImage: e.target.value })}
                          className="w-full px-3 py-2 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl focus:outline-none focus:border-[#FFB347]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Description</label>
                        <textarea 
                          placeholder="Details..."
                          value={cmsRouteForm.description}
                          onChange={(e) => setCmsRouteForm({ ...cmsRouteForm, description: e.target.value })}
                          className="w-full h-20 px-3 py-2 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl focus:outline-none focus:border-[#FFB347] resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full btn-modern btn-apricot text-xs py-3"
                      >
                        Publish Route Config
                      </button>
                    </form>
                  </div>

                  {/* Current Active Routes List */}
                  <div className="lg:col-span-2 glass-card-modern p-6 shadow-xl space-y-4">
                    <h3 className="text-base font-bold text-[var(--text-main)]">Configured Routes</h3>
                    <div className="space-y-4">
                      {routes.map(r => (
                        <div key={r.id} className="border border-[var(--border-main)] p-4 rounded-xl flex justify-between items-center bg-[var(--bg-main)]/50 text-xs">
                          <div>
                            <h4 className="font-bold text-sm text-[var(--text-main)]">{r.title}</h4>
                            <span className="text-[10px] text-[var(--text-muted)]">ID: {r.id} | Price: ${r.price} | Duration: {r.duration}</span>
                          </div>
                          
                          <button
                            onClick={async () => {
                              await fetch(`${API_BASE}/api/admin/routes/${r.id}`, { method: 'DELETE' });
                              showToast('success', 'Route deleted.');
                              fetchRoutes();
                              fetchAdminData();
                            }}
                            className="p-2 border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* View 5: Wallet Analytics */}
              {adminTab === 'wallet' && adminWallet && (
                <div className="space-y-8">
                  
                  {/* Financial cards grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    
                    <div className="glass-card-modern p-5 shadow-xl bg-gradient-to-tr from-[#FFB347]/10 to-[#C0392B]/5">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">Total Ledger Revenue</span>
                          <h2 className="text-2xl font-black text-[var(--text-main)] font-mono mt-1">${adminWallet.totalRevenue}</h2>
                        </div>
                        <div className="p-3 bg-slate-950 border border-[var(--border-main)] text-white rounded-xl">
                          <Wallet className="w-5 h-5 text-[#FFB347]" />
                        </div>
                      </div>
                    </div>

                    <div className="glass-card-modern p-5 shadow-xl">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">Platform Commission (15%)</span>
                          <h2 className="text-2xl font-black text-emerald-500 font-mono mt-1">${adminWallet.platformCommission}</h2>
                        </div>
                        <div className="p-3 bg-slate-950 border border-[var(--border-main)] text-white rounded-xl">
                          <Percent className="w-5 h-5 text-emerald-400" />
                        </div>
                      </div>
                    </div>

                    <div className="glass-card-modern p-5 shadow-xl">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">Driver Net Payout (85%)</span>
                          <h2 className="text-2xl font-black text-[#FFB347] font-mono mt-1">${adminWallet.driverPayout}</h2>
                        </div>
                        <div className="p-3 bg-slate-950 border border-[var(--border-main)] text-white rounded-xl">
                          <Car className="w-5 h-5 text-[#FFB347]" />
                        </div>
                      </div>
                    </div>

                    <div className="glass-card-modern p-5 shadow-xl">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">Hotel/Food Net Payout (90%)</span>
                          <h2 className="text-2xl font-black text-indigo-400 font-mono mt-1">${adminWallet.partnerPayout}</h2>
                        </div>
                        <div className="p-3 bg-slate-950 border border-[var(--border-main)] text-white rounded-xl">
                          <Users className="w-5 h-5 text-indigo-400" />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Revenue splits */}
                  <div className="glass-card-modern p-6 shadow-xl space-y-5">
                    <h3 className="text-lg font-bold text-[var(--text-main)]">Platform Financial Stream Breakdown</h3>
                    
                    <div className="space-y-4">
                      {/* Tours */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-[var(--text-main)]">Signature Curated Tours</span>
                          <span className="font-mono text-[#FFB347]">${adminWallet.toursRevenue}</span>
                        </div>
                        <div className="h-3.5 bg-slate-950 rounded-full overflow-hidden border border-[var(--border-main)]">
                          <div 
                            className="h-full bg-gradient-to-r from-[#FFB347] to-amber-600 rounded-full" 
                            style={{ width: `${Math.max(10, Math.min(100, (parseFloat(adminWallet.toursRevenue) / (parseFloat(adminWallet.totalRevenue) || 1)) * 100))}%` }}
                          />
                        </div>
                      </div>

                      {/* Hotels */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-[var(--text-main)]">Partner Hotel Referrals</span>
                          <span className="font-mono text-indigo-400">${adminWallet.hotelsRevenue}</span>
                        </div>
                        <div className="h-3.5 bg-slate-950 rounded-full overflow-hidden border border-[var(--border-main)]">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full" 
                            style={{ width: `${Math.max(10, Math.min(100, (parseFloat(adminWallet.hotelsRevenue) / (parseFloat(adminWallet.totalRevenue) || 1)) * 100))}%` }}
                          />
                        </div>
                      </div>

                      {/* Restaurants */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-[var(--text-main)]">Partner Dining/Taverna Referrals</span>
                          <span className="font-mono text-emerald-400">${adminWallet.restaurantsRevenue}</span>
                        </div>
                        <div className="h-3.5 bg-slate-950 rounded-full overflow-hidden border border-[var(--border-main)]">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full" 
                            style={{ width: `${Math.max(10, Math.min(100, (parseFloat(adminWallet.restaurantsRevenue) / (parseFloat(adminWallet.totalRevenue) || 1)) * 100))}%` }}
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Global bookings list */}
                  <div className="glass-card-modern p-6 shadow-xl space-y-4">
                    <h3 className="text-base font-bold text-[var(--text-main)]">Full Transaction Auditing</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-[var(--border-main)] text-[10px] uppercase text-[var(--text-muted)] font-bold">
                            <th className="pb-4 px-4">Booking ID</th>
                            <th className="pb-4 px-4">Client</th>
                            <th className="pb-4 px-4">Driver</th>
                            <th className="pb-4 px-4">Itinerary Stops</th>
                            <th className="pb-4 px-4">Status</th>
                            <th className="pb-4 px-4 text-right">Ledger Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-main)]/40 text-xs">
                          {adminOrders.map(o => (
                            <tr key={o.id} className="hover:bg-[var(--border-main)]/10 transition-colors">
                              <td className="py-4 px-4 font-mono text-[var(--text-muted)]">{o.id}</td>
                              <td className="py-4 px-4 font-bold text-[var(--text-main)]">{o.client_name}</td>
                              <td className="py-4 px-4 font-semibold text-[var(--text-main)]">{o.driver_name || 'Unassigned'}</td>
                              <td className="py-4 px-4">
                                <div className="font-semibold text-[var(--text-main)]">{o.route_title}</div>
                                <span className="text-[10px] text-[var(--text-muted)]">
                                  Lodge: {o.hotel_name || 'None'} | Taverna: {o.restaurant_name || 'None'}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <span className="font-bold uppercase text-[10px] text-[#FFB347]">{o.status}</span>
                              </td>
                              <td className="py-4 px-4 text-right font-mono font-bold text-[var(--text-main)]">${o.total_amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-16 border-t border-[var(--border-main)]/50 text-center relative z-10 space-y-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-2 bg-gradient-to-tr from-[#FFB347] to-[#C0392B] rounded-xl text-white">
            <Compass className="h-5 w-5" />
          </div>
          <span className="text-lg font-playfair font-black text-[var(--text-main)]">ArmTurn</span>
        </div>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-sm mx-auto">
          State-of-the-art Sunny Armenian Modern luxury travel logistics. Fully configured for Vercel, Render, Neon, and GitHub.
        </p>
        <div className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] opacity-50">
          © 2026 ArmTurn Ecosystem. All rights reserved.
        </div>
      </footer>

      {/* ==========================================
          MODALS & FLOATING OVERLAYS
          ========================================== */}

      {/* 1. AUTHENTICATION MODAL */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-[var(--bg-main)] border border-[var(--border-main)] p-8 rounded-3xl shadow-2xl z-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FFB347] to-[#C0392B]"></div>
              
              <h2 className="text-2xl font-bold font-playfair text-[var(--text-main)] mb-6 text-center">
                Join the ArmTurn Ecosystem
              </h2>

              {/* Tabs */}
              <div className="flex bg-[var(--border-main)]/50 border border-[var(--border-main)] p-1 rounded-2xl mb-6 text-xs font-bold">
                <button
                  onClick={() => setAuthTab('client')}
                  className={`w-1/2 py-2.5 rounded-xl transition-all ${authTab === 'client' ? 'bg-[#FFB347] text-black shadow-md' : 'text-[var(--text-muted)]'}`}
                >
                  Client Account
                </button>
                <button
                  onClick={() => setAuthTab('driver')}
                  className={`w-1/2 py-2.5 rounded-xl transition-all ${authTab === 'driver' ? 'bg-[#FFB347] text-black shadow-md' : 'text-[var(--text-muted)]'}`}
                >
                  Driver Partner
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-xs text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Full Name*</label>
                    <input
                      type="text"
                      placeholder="Anna Grigoryan"
                      value={authForm.fullName}
                      onChange={(e) => setAuthForm({ ...authForm, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl focus:outline-none focus:border-[#FFB347]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Email (Gmail)*</label>
                    <input
                      type="email"
                      placeholder="anna@gmail.com"
                      value={authForm.email}
                      onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl focus:outline-none focus:border-[#FFB347]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Phone Number*</label>
                  <input
                    type="text"
                    placeholder="+374 99 111 222"
                    value={authForm.phone}
                    onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl focus:outline-none focus:border-[#FFB347]"
                    required
                  />
                </div>

                {/* Driver Extended Form Fields */}
                {authTab === 'driver' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 pt-4 border-t border-[var(--border-main)]/50"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Date of Birth*</label>
                        <input
                          type="date"
                          value={authForm.dob}
                          onChange={(e) => setAuthForm({ ...authForm, dob: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Passenger Capacity*</label>
                        <select
                          value={authForm.capacity}
                          onChange={(e) => setAuthForm({ ...authForm, capacity: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl focus:outline-none"
                        >
                          <option value="4">4 Pax (Sedan)</option>
                          <option value="7">7 Pax (V-Class)</option>
                          <option value="15">15 Pax (Sprinter)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Vehicle Model*</label>
                        <input
                          type="text"
                          placeholder="e.g. Mercedes V-Class"
                          value={authForm.carModel}
                          onChange={(e) => setAuthForm({ ...authForm, carModel: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Car License Plate*</label>
                        <input
                          type="text"
                          placeholder="37 AA 777"
                          value={authForm.carNumber}
                          onChange={(e) => setAuthForm({ ...authForm, carNumber: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Scan Passport/ID Scan Upload Link</label>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={authForm.passportUrl}
                        onChange={(e) => setAuthForm({ ...authForm, passportUrl: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl focus:outline-none"
                      />
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-end space-x-3 pt-6 border-t border-[var(--border-main)]/50">
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(false)}
                    className="px-6 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#FFB347] hover:bg-amber-400 text-black font-bold rounded-xl transition-all"
                  >
                    {authTab === 'client' ? 'Sign In / Register' : 'Submit Vetting Docs'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. MANDATORY POST-TRIP REVIEW MODAL */}
      <AnimatePresence>
        {pendingReviewOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-md bg-[var(--bg-main)] border border-[var(--border-main)] p-8 rounded-3xl shadow-2xl z-10 text-center space-y-6"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FFB347]"></div>
              
              <div className="p-3 bg-gradient-to-tr from-[#FFB347] to-[#C0392B] w-max mx-auto rounded-full text-white">
                <Compass className="w-8 h-8 animate-spin-slow" />
              </div>

              <h2 className="text-2xl font-bold font-playfair text-[var(--text-main)]">Rate Your Luxury Experience</h2>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Your journey on **{pendingReviewOrder.route_title}** is completed! To maintain premium luxury service guarantees, please rate your experience with Vahan Sargsyan (Driver).
              </p>

              {/* Star Rating Select */}
              <div className="flex justify-center space-x-2.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="p-1 transition-all hover:scale-110"
                  >
                    <Star className={`w-8 h-8 ${star <= reviewRating ? 'fill-[#FFB347] text-[#FFB347]' : 'text-slate-600'}`} />
                  </button>
                ))}
              </div>

              <div>
                <textarea
                  placeholder="Share details about your VIP service..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full h-24 px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl text-xs focus:outline-none focus:border-[#FFB347] resize-none"
                  required
                />
              </div>

              <button
                onClick={submitReview}
                className="w-full btn-modern btn-apricot text-xs font-bold py-3 shadow-xl"
              >
                Submit Rating & Return
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. FLOATING TOAST notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-5 py-4 rounded-2xl border shadow-2xl backdrop-blur-md ${
              toast.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300' :
              toast.type === 'gold' ? 'bg-amber-950/90 border-[#FFB347]/40 text-amber-200' :
              'bg-rose-950/80 border-rose-500/30 text-rose-300'
            }`}
          >
            {toast.type === 'success' ? <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" /> :
             toast.type === 'gold' ? <Sparkles className="h-5 w-5 text-[#FFB347] shrink-0 animate-pulse" /> :
             <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />}
            <span className="text-xs font-bold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
