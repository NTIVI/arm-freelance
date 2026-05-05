import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { motion } from 'framer-motion';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-[#050505] selection:bg-violet-500 selection:text-white relative">
      <Header />
      <main className="pt-24 min-h-screen relative z-10">
        <Outlet />
      </main>
      <Footer />
      
      {/* Global Background Elements - Moved to z-[-1] and simplified */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute inset-0 bg-[#050505]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/5 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
};
