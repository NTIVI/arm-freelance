import { Link } from 'react-router-dom';
import { Globe, Twitter, Linkedin, Github, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-32 pb-20 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 pb-24 border-b border-white/5">
          <div className="space-y-8">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg group-hover:rotate-12 transition-transform">AF</div>
              <span className="text-display text-2xl italic tracking-tighter text-white uppercase">ARMENIA <span className="text-white/20">FREELANCE</span></span>
            </div>
            <p className="text-label text-[8px] text-white/20 uppercase tracking-[0.4em] leading-loose">
              The premier technical grid connecting the global visionaries with Armenian architectural mastery.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Linkedin} />
              <SocialIcon icon={Github} />
            </div>
          </div>

          <FooterColumn 
            title="Specialist Ecosystem" 
            links={['Mission Registry', 'Certification Nodes', 'Connect Economy', 'Value Withdrawal']} 
          />
          <FooterColumn 
            title="Client Clusters" 
            links={['Source Mastery', 'Initiate Mission', 'Escrow Protocol', 'Enterprise Sync']} 
          />
          
          <div className="space-y-8">
            <h4 className="text-label text-white/60 tracking-[0.4em]">Operational Hub</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-violet-500 mt-1" />
                <div>
                  <p className="text-xs font-bold text-white/80">Yerevan, Armenia</p>
                  <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest font-black">Innovation Hub District</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-fuchsia-500 mt-1" />
                <div>
                  <p className="text-xs font-bold text-white/80">support@afmarket.am</p>
                  <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest font-black">24/7 Deployment Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-label text-[8px] text-white/20 uppercase tracking-[0.3em]">
          <p>© 2026 ARMENIA FREELANCE (AF MARKET). ALL ARCHITECTURAL RIGHTS RESERVED.</p>
          <div className="flex gap-10 font-black">
            <a href="#" className="hover:text-white transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Sync</a>
            <a href="#" className="hover:text-white transition-colors">Security Layer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }: { title: string, links: string[] }) => (
  <div className="space-y-8">
    <h4 className="text-label text-white/60 tracking-[0.4em] uppercase">{title}</h4>
    <div className="flex flex-col gap-4">
      {links.map(l => (
        <a key={l} href="#" className="text-[10px] font-black text-white/30 hover:text-white transition-all hover:translate-x-2 tracking-widest uppercase">
          {l}
        </a>
      ))}
    </div>
  </div>
);

const SocialIcon = ({ icon: Icon }: any) => (
  <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-violet-600 hover:text-white hover:border-violet-500 transition-all duration-500 text-white/20">
    <Icon className="w-4 h-4" />
  </button>
);
