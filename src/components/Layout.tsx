import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { motion } from 'framer-motion';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-[#050505] selection:bg-violet-500 selection:text-white">
      <Header />
      <main className="pt-24 min-h-screen">
        <Outlet />
      </main>
      <Footer />
      
      {/* Global Background Elements */}
      <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none">
        <div className="bg-mesh-container">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mesh-blob bg-violet-600/20 w-[1000px] h-[1000px] -top-[300px] -left-[200px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, -50, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="mesh-blob bg-fuchsia-600/10 w-[800px] h-[800px] -bottom-[200px] -right-[100px]" 
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
      </div>
    </div>
  );
};
