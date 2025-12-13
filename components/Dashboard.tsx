
import React, { useState, useEffect } from 'react';
import { UserProfile, AppScreen, Language, UI_TRANSLATIONS } from '../types';
import { ShieldCheck, UserPlus, Phone, AlertCircle, Download, Search, MessageSquare } from 'lucide-react';

interface DashboardProps {
  profile: UserProfile | null;
  onNavigate: (screen: AppScreen) => void;
  onLogin: (p: UserProfile) => void;
  language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, onNavigate, onLogin, language }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '', email: '', age: '', gender: 'Unknown', 
    kidneyFunction: 'Normal', liverFunction: 'Normal', currentMeds: ''
  });
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS['en'];

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.age) {
        onLogin({
            ...formData as UserProfile,
            contacts: [{name: '', number: ''}, {name: '', number: ''}]
        });
        setShowLogin(false);
    }
  };

  return (
    <div className="p-6 space-y-8 pb-24 animate-fade-in h-full overflow-y-auto">
      
      {/* Introduction */}
      <div className="space-y-1 flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-bold text-primary dark:text-teal-400">MediGuard AI</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{t.subtitle || "Your personal medical assistant"}</p>
        </div>
        {deferredPrompt && (
            <button 
                onClick={handleInstallClick}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg animate-pulse"
            >
                <Download size={14} /> Install App
            </button>
        )}
      </div>

      {/* Hero Search Section */}
      <div className="bg-gradient-to-br from-primary/10 to-transparent dark:from-teal-900/20 p-8 rounded-[32px] border border-primary/10 dark:border-teal-800/30 text-center space-y-6 shadow-sm">
          <div className="w-24 h-24 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto shadow-sm text-primary dark:text-teal-400">
              <Search size={48} strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white leading-tight">
                  Find your medication<br/>at your fingertips
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                  Instant access to NLEM 2022 & Pharmacopoeia data
              </p>
          </div>
          <button 
            onClick={() => onNavigate('chat')}
            className="w-full max-w-xs mx-auto bg-primary dark:bg-teal-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
          >
              <MessageSquare size={20} />
              Start Search
          </button>
      </div>

      {/* Member Access Widget */}
      {!profile ? (
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-3xl p-6 text-center shadow-sm max-w-2xl mx-auto">
           <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserPlus size={24} className="text-gray-500 dark:text-gray-400" />
           </div>
           <h3 className="font-bold text-gray-800 dark:text-white mb-1">{t.join || "Join MediGuard"}</h3>
           <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{t.joinSub || "Sync your health profile for accurate AI analysis."}</p>
           <button 
             onClick={() => setShowLogin(true)}
             className="w-full md:w-auto md:px-12 bg-primary dark:bg-teal-600 text-white py-3 rounded-full font-semibold shadow-lg shadow-primary/20 dark:shadow-teal-900/30 active:scale-95 transition"
           >
             {t.signIn || "Sign In"} / Sign Up
           </button>
        </div>
      ) : (
         <div className="bg-primary/5 dark:bg-teal-900/10 border border-primary/10 dark:border-teal-800/30 rounded-3xl p-6 flex items-center justify-between max-w-2xl mx-auto">
            <div>
               <h3 className="font-bold text-primary dark:text-teal-300">{t.welcome}, {profile.name}</h3>
               <p className="text-xs text-gray-500 dark:text-gray-400">Profile Active • {profile.age} years</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-2 rounded-full shadow-sm">
                <ShieldCheck className="text-green-500 dark:text-green-400" size={24} />
            </div>
         </div>
      )}

      {/* 24/7 Support */}
      <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-3xl p-5 shadow-sm max-w-2xl mx-auto">
         <h4 className="font-bold text-gray-800 dark:text-white mb-3 text-sm">{t.support || "24/7 Support"}</h4>
         <div className="flex flex-col md:flex-row gap-3">
             <button className="flex-1 bg-gray-50 dark:bg-neutral-800 py-3 rounded-2xl text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-neutral-700 transition">
                <Phone size={16} /> {t.callSupport || "Call Support"}
             </button>
             {profile?.contacts[0]?.name && (
                 <button onClick={() => onNavigate('emergency')} className="flex-1 bg-red-50 dark:bg-red-900/20 py-3 rounded-2xl text-xs font-bold text-red-600 dark:text-red-400 flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/40 transition">
                    <AlertCircle size={16} /> SOS: {profile.contacts[0].name}
                 </button>
             )}
         </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white dark:bg-neutral-900 rounded-[32px] w-full max-w-sm p-6 shadow-2xl animate-fade-in border border-gray-100 dark:border-neutral-800">
              <h2 className="text-xl font-bold mb-4 dark:text-white">Create Profile</h2>
              <form onSubmit={handleLoginSubmit} className="space-y-3">
                 <input 
                    placeholder="Full Name" 
                    className="w-full bg-gray-50 dark:bg-neutral-800 border-none rounded-xl p-3 text-sm dark:text-white focus:ring-2 ring-primary"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required
                 />
                 <input 
                    placeholder="Email" 
                    className="w-full bg-gray-50 dark:bg-neutral-800 border-none rounded-xl p-3 text-sm dark:text-white focus:ring-2 ring-primary"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                 />
                 <div className="flex gap-3">
                    <input 
                        placeholder="Age" 
                        type="number"
                        className="w-1/3 bg-gray-50 dark:bg-neutral-800 border-none rounded-xl p-3 text-sm dark:text-white focus:ring-2 ring-primary"
                        value={formData.age}
                        onChange={e => setFormData({...formData, age: e.target.value})}
                        required
                    />
                    <select 
                        className="flex-1 bg-gray-50 dark:bg-neutral-800 border-none rounded-xl p-3 text-sm dark:text-white focus:ring-2 ring-primary"
                        value={formData.gender}
                        onChange={e => setFormData({...formData, gender: e.target.value as any})}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                 </div>
                 <div className="pt-2">
                    <button type="submit" className="w-full bg-primary dark:bg-teal-600 text-white py-3 rounded-xl font-bold">Start</button>
                    <button type="button" onClick={() => setShowLogin(false)} className="w-full mt-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm py-2">Cancel</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
