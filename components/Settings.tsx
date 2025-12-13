
import React from 'react';
import { Language, SUPPORTED_LANGUAGES, UserProfile, UI_TRANSLATIONS } from '../types';
import { Globe, Users, Save, Database } from 'lucide-react';

interface SettingsProps {
  language: Language;
  setLanguage: (l: Language) => void;
  profile: UserProfile | null;
  updateProfile: (p: UserProfile) => void;
}

const Settings: React.FC<SettingsProps> = ({ language, setLanguage, profile, updateProfile }) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS['en'];
  
  const handleContactChange = (index: 0 | 1, field: 'name' | 'number', value: string) => {
      if (!profile) return;
      const newContacts = [...profile.contacts];
      newContacts[index] = { ...newContacts[index], [field]: value };
      updateProfile({ ...profile, contacts: newContacts as [any, any] });
  };

  return (
    <div className="p-6 space-y-8 animate-fade-in max-w-2xl mx-auto h-full overflow-y-auto pb-24">
       
       <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Globe className="text-primary dark:text-teal-400" /> {t.language}
          </h2>
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-neutral-800">
             <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full bg-gray-50 dark:bg-neutral-800 p-3 rounded-xl border-none outline-none text-gray-700 dark:text-gray-200"
             >
                 {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
                     <option key={code} value={code}>{name}</option>
                 ))}
             </select>
          </div>
       </div>

       {profile && (
       <>
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Database className="text-primary dark:text-teal-400" /> {t.dataSources}
            </h2>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-neutral-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">{t.openFda}</p>
                <p className="text-[10px] text-gray-400 mb-3">{t.openFdaDesc}</p>
                <input 
                    type="password"
                    placeholder="Enter API Key" 
                    value={profile.openFdaKey || ''}
                    onChange={(e) => updateProfile({ ...profile, openFdaKey: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-neutral-800 p-3 rounded-xl text-sm dark:text-white placeholder:text-gray-400 focus:ring-2 ring-primary/50 outline-none transition" 
                />
            </div>
        </div>

        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Users className="text-primary dark:text-teal-400" /> {t.emergencyContacts}
            </h2>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-neutral-800 space-y-4">
                <div className="space-y-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">{t.contact1}</p>
                    <input 
                        placeholder={t.name}
                        value={profile.contacts[0].name}
                        onChange={(e) => handleContactChange(0, 'name', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-neutral-800 p-3 rounded-xl text-sm mb-2 dark:text-white placeholder:text-gray-400" 
                    />
                    <input 
                        placeholder={t.number}
                        value={profile.contacts[0].number}
                        onChange={(e) => handleContactChange(0, 'number', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-neutral-800 p-3 rounded-xl text-sm dark:text-white placeholder:text-gray-400" 
                    />
                </div>
                <div className="border-t border-gray-100 dark:border-neutral-800 pt-4 space-y-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">{t.contact2}</p>
                    <input 
                        placeholder={t.name}
                        value={profile.contacts[1].name}
                        onChange={(e) => handleContactChange(1, 'name', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-neutral-800 p-3 rounded-xl text-sm mb-2 dark:text-white placeholder:text-gray-400" 
                    />
                    <input 
                        placeholder={t.number}
                        value={profile.contacts[1].number}
                        onChange={(e) => handleContactChange(1, 'number', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-neutral-800 p-3 rounded-xl text-sm dark:text-white placeholder:text-gray-400" 
                    />
                </div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-xs font-medium justify-end">
                    <Save size={14} /> {t.autoSaved}
                </div>
            </div>
        </div>
       </>
       )}
    </div>
  );
};

export default Settings;
