import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  MapPin, 
  Globe, 
  Star, 
  Briefcase, 
  ShieldCheck,
  Edit2,
  Mail,
  Linkedin,
  Twitter,
  ExternalLink
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: user?.fullName || '',
    title: user?.title || 'Senior React Developer',
    bio: user?.bio || 'Experienced professional focused on delivering high-quality web solutions for the Armenian market.',
    location: user?.location || 'Yerevan, Armenia'
  });

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="flex items-center gap-3 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Workspace
          </button>
          
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="btn-capsule"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'} <Edit2 className="w-4 h-4 ml-2" />
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Personal Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-10 rounded-[3.5rem] text-center space-y-6">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-[2.5rem] bg-black flex items-center justify-center text-white text-5xl font-black shadow-2xl">
                  {user.fullName[0]}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
              </div>

              <div>
                {isEditing ? (
                  <input 
                    className="input-capsule w-full text-center mb-2" 
                    value={editData.fullName} 
                    onChange={e => setEditData({...editData, fullName: e.target.value})} 
                  />
                ) : (
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter">{user.fullName}</h2>
                )}
                {isEditing ? (
                  <input 
                    className="input-capsule w-full text-center text-xs" 
                    value={editData.title} 
                    onChange={e => setEditData({...editData, title: e.target.value})} 
                  />
                ) : (
                  <p className="text-indigo-600 text-xs font-black uppercase tracking-widest">{editData.title}</p>
                )}
              </div>

              <div className="flex items-center justify-center gap-6 py-6 border-y border-black/5">
                <ProfileStat label="Rating" value="5.0" icon={Star} color="text-orange-400" />
                <ProfileStat label="Jobs" value="24" icon={Briefcase} />
                <ProfileStat label="Verified" value="YES" icon={ShieldCheck} />
              </div>

              <div className="space-y-4">
                 <ContactItem icon={MapPin} label={editData.location} />
                 <ContactItem icon={Mail} label={user.email} />
                 <ContactItem icon={Globe} label="portfolio.af.am" />
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <SocialIcon icon={Linkedin} />
                <SocialIcon icon={Twitter} />
                <SocialIcon icon={ExternalLink} />
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Reviews */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel p-12 rounded-[3.5rem] space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Professional Bio</h3>
                {isEditing && (
                  <button onClick={handleSave} className="px-6 py-2 bg-black text-white rounded-full text-[10px] font-black uppercase">Save Changes</button>
                )}
              </div>
              
              {isEditing ? (
                <textarea 
                  rows={6}
                  className="w-full bg-black/5 border border-black/5 rounded-[2rem] p-8 outline-none focus:bg-black/10 transition-all text-sm font-medium resize-none"
                  value={editData.bio}
                  onChange={e => setEditData({...editData, bio: e.target.value})}
                />
              ) : (
                <p className="text-gray-600 text-lg leading-relaxed">
                  {editData.bio}
                </p>
              )}

              <div className="pt-8 border-t border-black/5">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Top Skills</h4>
                <div className="flex flex-wrap gap-3">
                  {['Product Design', 'Full-stack', 'UX Strategy', 'Armenian Localization', 'Blockchain'].map(s => (
                    <span key={s} className="px-5 py-2 bg-black/5 rounded-full text-[11px] font-bold uppercase">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-panel p-12 rounded-[3.5rem] space-y-8">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">Client Reviews</h3>
              <div className="space-y-8">
                <ReviewItem 
                  author="Aram Sargsyan" 
                  date="May 12, 2023" 
                  rating={5} 
                  comment="Exceptional work on our mobile dashboard. Highly recommend for any high-end professional projects." 
                />
                <ReviewItem 
                  author="Lilit Martirosyan" 
                  date="April 28, 2023" 
                  rating={5} 
                  comment="Brilliant communication and perfect execution. The quality of code is top-tier." 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProfileStat = ({ label, value, icon: Icon, color }: any) => (
  <div className="space-y-1">
    <div className="flex items-center justify-center gap-1.5">
      <Icon className={`w-3.5 h-3.5 ${color || 'text-gray-400'}`} />
      <p className="text-xl font-black italic tracking-tighter">{value}</p>
    </div>
    <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{label}</p>
  </div>
)

const ContactItem = ({ icon: Icon, label }: any) => (
  <div className="flex items-center gap-3 text-[11px] font-medium text-gray-500">
    <Icon className="w-4 h-4 text-gray-400" />
    <span>{label}</span>
  </div>
)

const SocialIcon = ({ icon: Icon }: any) => (
  <button className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all">
    <Icon className="w-4 h-4" />
  </button>
)

const ReviewItem = ({ author, date, rating, comment }: any) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <div>
        <h4 className="font-black uppercase italic text-sm">{author}</h4>
        <p className="text-[10px] font-bold text-gray-400 uppercase">{date}</p>
      </div>
      <div className="flex gap-1">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-3 h-3 text-orange-400 fill-current" />
        ))}
      </div>
    </div>
    <p className="text-gray-500 text-sm leading-relaxed">{comment}</p>
    <div className="border-b border-black/5" />
  </div>
)
