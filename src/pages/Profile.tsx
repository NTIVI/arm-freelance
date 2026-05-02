import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  MapPin, 
  Globe, 
  Mail, 
  Camera, 
  Settings
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="mb-12 flex items-center gap-3 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-all"><ArrowLeft className="w-4 h-4" /> Back to Dashboard</button>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 glass-card p-10 rounded-[3rem] text-center space-y-8">
            <div className="relative inline-block group mx-auto">
              <div className="w-40 h-40 rounded-[2.5rem] bg-indigo-500 flex items-center justify-center font-black text-white text-5xl">{user.fullName[0]}</div>
              <div className="absolute inset-0 flex items-center justify-center bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] backdrop-blur-sm"><Camera className="w-8 h-8 text-white" /></div>
            </div>
            <div><h2 className="text-2xl font-black italic uppercase">{user.fullName}</h2><p className="text-[10px] font-black uppercase text-indigo-400">{user.role}</p></div>
            <div className="pt-8 border-t border-white/5 space-y-4">
              <ProfileInfo icon={Mail} label="Email" value={user.email} />
              <ProfileInfo icon={MapPin} label="Location" value="Yerevan, AM" />
              <ProfileInfo icon={Globe} label="Language" value="EN, RU, HY" />
            </div>
          </div>
          <div className="md:col-span-8 space-y-8">
            <div className="glass-card p-10 rounded-[3rem] space-y-6">
              <h3 className="text-2xl font-black italic uppercase">Summary</h3>
              <p className="text-slate-400 text-lg">{user.bio || "No professional summary provided."}</p>
            </div>
            <div className="glass-card p-10 rounded-[3rem] flex items-center justify-between">
              <h3 className="text-xl font-black italic uppercase">Settings</h3>
              <button className="btn-secondary px-8"><Settings className="w-4 h-4" /> Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProfileInfo = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-4">
    <Icon className="w-4 h-4 text-slate-600" />
    <div className="text-left"><p className="text-[8px] font-black uppercase text-slate-600 leading-none">{label}</p><p className="text-[11px] font-bold text-slate-300">{value}</p></div>
  </div>
)
