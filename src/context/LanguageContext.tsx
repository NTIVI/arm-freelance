import React, { createContext, useContext, useState } from 'react';

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
    nav_dashboard: 'Dashboard',
    nav_find: 'Find Work',
    nav_my_jobs: 'My Jobs',
    nav_catalog: 'Project Catalog',
    nav_messages: 'Messages',
    nav_settings: 'Profile Settings',
    logout: 'Logout Session',
    search_placeholder_freelancer: 'Search for high-tier projects...',
    search_placeholder_client: 'Search for world-class specialists...',
    post_job: 'Post New Project'
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
    nav_dashboard: 'Панель управления',
    nav_find: 'Поиск работы',
    nav_my_jobs: 'Мои проекты',
    nav_catalog: 'Каталог услуг',
    nav_messages: 'Сообщения',
    nav_settings: 'Настройки профиля',
    logout: 'Выйти из сессии',
    search_placeholder_freelancer: 'Поиск топовых проектов...',
    search_placeholder_client: 'Поиск специалистов мирового уровня...',
    post_job: 'Разместить проект'
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
    nav_dashboard: 'Կառավարման վահանակ',
    nav_find: 'Աշխատանքի փնտրում',
    nav_my_jobs: 'Իմ նախագծերը',
    nav_catalog: 'Ծառայությունների կատալոգ',
    nav_messages: 'Հաղորդագրություններ',
    nav_settings: 'Պրոֆիլի կարգավորումներ',
    logout: 'Դուրս գալ',
    search_placeholder_freelancer: 'Փնտրել բարձրակարգ նախագծեր...',
    search_placeholder_client: 'Փնտրել համաշխարհային կարգի մասնագետների...',
    post_job: 'Տեղադրել նախագիծ'
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
