
export type Language = 
  | 'en' | 'es' | 'hi' | 'te' | 'ta' | 'kn' | 'ml' | 'mr' | 'gu' | 'pa' 
  | 'bn' | 'ur' | 'or' | 'as' | 'mai' | 'sat' | 'ks' | 'ne' | 'kok' | 'sd' 
  | 'doi' | 'mni' | 'bo' | 'sa';

export interface EmergencyContact {
  name: string;
  number: string;
}

export interface UserProfile {
  name: string;
  email: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other' | 'Unknown';
  kidneyFunction: 'Normal' | 'Impaired' | 'Unknown';
  liverFunction: 'Normal' | 'Impaired' | 'Unknown';
  currentMeds: string;
  contacts: [EmergencyContact, EmergencyContact];
  language?: string;
  openFdaKey?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  image?: string; // Base64
  groundingSources?: Array<{
    title: string;
    url: string;
  }>;
}

export type AppScreen = 'dashboard' | 'chat' | 'emergency' | 'credits' | 'settings';

export const SUPPORTED_LANGUAGES: Record<Language, string> = {
  en: 'English', es: 'Español', hi: 'हिंदी', te: 'తెలుగు', ta: 'தமிழ்',
  kn: 'ಕನ್ನಡ', ml: 'മലയാളം', mr: 'മറാഠി', gu: 'ગુજરાતી', pa: 'ਪੰਜਾਬੀ',
  bn: 'বাংলা', ur: 'اردو', or: 'ଓଡ଼ିଆ', as: 'অসমীয়া', mai: 'मैथिली',
  sat: 'संथाली', ks: 'कश्मीरी', ne: 'नेपाली', kok: 'कोंकणी', sd: 'सिंधी',
  doi: 'डोगरी', mni: 'मणिपुरी', bo: 'बोडो', sa: 'संस्कृत'
};

export const UI_TRANSLATIONS: Record<Language, any> = {
  en: {
    welcome: "Hello",
    dashboard: "Dashboard",
    chat: "Chatbot",
    settings: "Settings",
    emergency: "Emergency",
    credits: "Credits",
    logout: "Logout",
    signIn: "Sign In",
    guest: "Guest",
    subtitle: "Your personal medical assistant",
    checkInteraction: "Drug Interactions",
    safeDosage: "Safe Dosage",
    sideEffects: "Side Effects",
    join: "Join MediGuard",
    joinSub: "Sync your health profile for accurate AI analysis.",
    support: "24/7 Support",
    callSupport: "Call Support"
  },
  hi: {
    welcome: "नमस्ते",
    dashboard: "डैशबोर्ड",
    chat: "चैटबॉट",
    settings: "सेटिंग्स",
    emergency: "आपातकालीन",
    credits: "क्रेडिट्स",
    logout: "लॉग आउट",
    signIn: "साइन इन",
    guest: "अतिथि",
    subtitle: "आपका व्यक्तिगत चिकित्सा सहायक",
    checkInteraction: "दवा पारस्परिक क्रिया",
    safeDosage: "सुरक्षित खुराक",
    sideEffects: "दुष्प्रभाव",
    join: "मेडिगार्ड से जुड़ें",
    joinSub: "सटीक एआई विश्लेषण के लिए अपनी स्वास्थ्य प्रोफ़ाइल सिंक करें।",
    support: "24/7 सहायता",
    callSupport: "सपोर्ट कॉल करें"
  }
} as any;
