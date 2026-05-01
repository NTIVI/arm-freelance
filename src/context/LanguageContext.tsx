import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'hy' | 'ru' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    find_talent: 'Find Talent',
    find_work: 'Find Work',
    login: 'Log In',
    signup: 'Sign Up',
    hero_title: 'Hire the best Armenian talent.',
    hero_subtitle: 'Connecting world-class Armenian specialists with global opportunities. From Yerevan to Silicon Valley.',
    get_started: 'Get Started Now',
    freelancer: 'Freelancer',
    client: 'Client',
    agency: 'Agency',
    role_question: 'How would you like to use the platform?',
    step_1: 'Step 1: Account Type',
    step_2: 'Step 2: Professional Details',
  },
  ru: {
    find_talent: 'Найти таланты',
    find_work: 'Найти работу',
    login: 'Войти',
    signup: 'Регистрация',
    hero_title: 'Наймите лучших профи из Армении.',
    hero_subtitle: 'Соединяем армянских специалистов мирового уровня с глобальными возможностями. От Еревана до Кремниевой долины.',
    get_started: 'Начать сейчас',
    freelancer: 'Фрилансер',
    client: 'Заказчик',
    agency: 'Агентство',
    role_question: 'Как вы планируете использовать платформу?',
    step_1: 'Шаг 1: Тип аккаунта',
    step_2: 'Шаг 2: Профессиональные данные',
  },
  hy: {
    find_talent: 'Գտնել մասնագետ',
    find_work: 'Գտնել աշխատանք',
    login: 'Մուտք',
    signup: 'Գրանցում',
    hero_title: 'Վարձեք լավագույն հայ մասնագետներին:',
    hero_subtitle: 'Համաշխարհային կարգի հայ մասնագետների կապում գլոբալ հնարավորությունների հետ: Երևանից մինչև Սիլիկոնյան հովիտ:',
    get_started: 'Սկսել հիմա',
    freelancer: 'Ֆրիլանսեր',
    client: 'Պատվիրատու',
    agency: 'Գործակալություն',
    role_question: 'Ինչպե՞ս եք ցանկանում օգտագործել հարթակը:',
    step_1: 'Քայլ 1. Հաշվի տեսակը',
    step_2: 'Քայլ 2. Մասնագիտական տվյալներ',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
