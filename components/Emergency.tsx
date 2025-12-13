import React from 'react';
import { Phone, AlertOctagon, User } from 'lucide-react';
import { UserProfile } from '../types';

interface EmergencyProps {
    profile: UserProfile | null;
}

const Emergency: React.FC<EmergencyProps> = ({ profile }) => {
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center space-y-6 animate-pulse-slow">
      <div className="bg-red-50 p-6 rounded-full ring-4 ring-red-100">
         <AlertOctagon size={64} className="text-red-600" />
      </div>
      
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-bold text-gray-900">Emergency</h2>
        <p className="text-gray-500 text-sm">Immediate Assistance</p>
      </div>

      <a href="tel:112" className="w-full max-w-xs bg-red-600 text-white rounded-[28px] py-6 text-xl font-bold shadow-xl shadow-red-200 active:scale-95 transition-transform flex items-center justify-center gap-3">
         <Phone size={28} />
         CALL 112
      </a>

      {profile && (profile.contacts[0].name || profile.contacts[1].name) && (
          <div className="w-full max-w-xs space-y-3">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider text-center">Saved Contacts</p>
              {profile.contacts.map((contact, idx) => contact.name && (
                  <a 
                    key={idx} 
                    href={`tel:${contact.number}`}
                    className="flex items-center justify-between w-full bg-white border border-gray-200 text-gray-700 rounded-[20px] px-6 py-4 font-semibold shadow-sm hover:bg-gray-50 transition active:bg-gray-100"
                  >
                     <span className="flex items-center gap-3"><User size={18} /> {contact.name}</span>
                     <Phone size={18} className="text-green-600" />
                  </a>
              ))}
          </div>
      )}
    </div>
  );
};

export default Emergency;