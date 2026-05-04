import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'hy' | 'ru' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  currency: string;
  formatPrice: (amount: number, forceUSD?: boolean) => string;
}

const translations: Record<Language, Record<string, string>> = {
  hy: {
    // General
    site_name: 'Armenia Freelance',
    login: 'Մուտք',
    signup: 'Գրանցում',
    logout: 'Ելք',
    become_performer: 'Դառնալ կատարող',
    become_client_btn: 'Գտնել մասնագետ',
    
    // Auth
    auth_title: 'Մուտքի արձանագրություն',
    auth_subtitle: 'Մուտք գործեք ձեր պրոֆիլ',
    email_label: 'Էլ. հասցե',
    password_label: 'Գաղտնաբառ',
    nickname_label: 'Մականուն',
    verify_code: 'Հաստատման կոդ',
    
    // Landing
    hero_title: 'Հայաստանի Լավագույն ՏՏ Մասնագետները',
    hero_subtitle: 'ԷԼԻՏԱՐ ՖՐԻԼԱՆՍ ԷԿՈՀԱՄԱԿԱՐԳ',
    categories_title: 'Կատեգորիաներ',
    how_it_works: 'Ինչպես է այն աշխատում',
    
    // Roles
    role_freelancer: 'Ֆրիլանսեր',
    role_client: 'Պատվիրատու',
    role_agency: 'Գործակալություն',
    
    // Dashboard
    my_projects: 'Իմ նախագծերը',
    messages: 'Հաղորդագրություններ',
    balance: 'Հաշվեկշիռ',
    
    // Projects
    post_job: 'Տեղադրել նախագիծ',
    find_work: 'Գտնել աշխատանք',
    budget: 'Բյուջե',
    deadline: 'Վերջնաժամկետ'
  },
  ru: {
    site_name: 'Armenia Freelance',
    login: 'Вход',
    signup: 'Регистрация',
    logout: 'Выход',
    become_performer: 'Стать исполнителем',
    become_client_btn: 'Найти специалиста',
    
    auth_title: 'Протокол доступа',
    auth_subtitle: 'Синхронизируйтесь с профилем',
    email_label: 'Электронная почта',
    password_label: 'Пароль',
    nickname_label: 'Никнейм',
    verify_code: 'Код подтверждения',
    
    hero_title: 'Лучшие IT-специалисты Армении',
    hero_subtitle: 'ЭЛИТНАЯ ФРИЛАНС-ЭКОСИСТЕМА',
    categories_title: 'Категории',
    how_it_works: 'Как это работает',
    
    role_freelancer: 'Фрилансер',
    role_client: 'Заказчик',
    role_agency: 'Агентство',
    
    my_projects: 'Мои проекты',
    messages: 'Сообщения',
    balance: 'Баланс',
    
    post_job: 'Разместить проект',
    find_work: 'Найти работу',
    budget: 'Бюджет',
    deadline: 'Дедлайн'
  },
  en: {
    site_name: 'Armenia Freelance',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    become_performer: 'Become a Performer',
    become_client_btn: 'Find Specialist',
    
    auth_title: 'Access Protocol',
    auth_subtitle: 'Synchronize with your profile',
    email_label: 'Email Address',
    password_label: 'Password',
    nickname_label: 'Nickname',
    verify_code: 'Verification Code',
    
    hero_title: 'Armenia\'s Elite IT Network',
    hero_subtitle: 'PREMIUM FREELANCE ECOSYSTEM',
    categories_title: 'Categories',
    how_it_works: 'How it Works',
    
    role_freelancer: 'Freelancer',
    role_client: 'Client',
    role_agency: 'Agency',
    
    my_projects: 'My Projects',
    messages: 'Messages',
    balance: 'Balance',
    
    post_job: 'Post a Project',
    find_work: 'Find Work',
    budget: 'Budget',
    deadline: 'Deadline'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('hy');

  useEffect(() => {
    // Mock IP detection logic
    const detectLanguage = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.country_code === 'AM') setLang('hy');
        else if (data.country_code === 'RU') setLang('ru');
        else setLang('en');
      } catch (e) {
        setLang('hy'); // Default to hy
      }
    };
    detectLanguage();
  }, []);

  const t = (key: string) => translations[lang][key] || key;

  const formatPrice = (amount: number, forceUSD = false) => {
    if (forceUSD) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }
    return new Intl.NumberFormat('hy-AM', { 
      style: 'currency', 
      currency: 'AMD',
      maximumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, currency: 'AMD', formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
