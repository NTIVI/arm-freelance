import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ru' | 'hy';

interface Translations {
  [key: string]: {
    en: string;
    ru: string;
    hy: string;
  };
}

const translations: Translations = {
  // Hero
  hero_title: { en: 'Top-tier IT Talent for Your Vision', ru: 'IT-таланты высшего уровня для ваших идей', hy: 'Բարձրակարգ ՏՏ տաղանդներ ձեր գաղափարների համար' },
  hero_subtitle: { en: 'Elite Armenian tech marketplace connecting visionaries with world-class engineers.', ru: 'Элитный маркетплейс Армении, соединяющий визионеров с инженерами мирового уровня.', hy: 'Հայաստանի էլիտար տեխնոլոգիական հարթակ, որը միացնում է տեսլական ունեցողներին աշխարհակարգ ինժեներների հետ:' },
  find_talent: { en: 'Find Talent', ru: 'Найти талант', hy: 'Գտնել տաղանդ' },
  post_job: { en: 'Post a Project', ru: 'Разместить проект', hy: 'Տեղադրել նախագիծ' },
  
  // Auth
  login: { en: 'Login', ru: 'Вход', hy: 'Մուտք' },
  register: { en: 'Sign Up', ru: 'Регистрация', hy: 'Գրանցում' },
  email: { en: 'Email', ru: 'Электронная почта', hy: 'Էլ. փոստ' },
  password: { en: 'Password', ru: 'Пароль', hy: 'Գաղտնաբառ' },
  confirm_email_title: { en: 'Verify Your Email', ru: 'Подтвердите почту', hy: 'Հաստատեք էլ. փոստը' },
  confirm_email_desc: { en: 'We sent a code to your Gmail. Please enter it below.', ru: 'Мы отправили код на вашу почту. Введите его ниже.', hy: 'Մենք կոդ ենք ուղարկել ձեր էլ. փոստին: Մուտքագրեք այն ստորև:' },
  select_role: { en: 'Select Your Role', ru: 'Выберите вашу роль', hy: 'Ընտրեք ձեր դերը' },
  freelancer: { en: 'Freelancer', ru: 'Фрилансер', hy: 'Ֆրիլանսեր' },
  client: { en: 'Client', ru: 'Клиент', hy: 'Հաճախորդ' },
  
  // Dashboard
  browse_projects: { en: 'Browse Projects', ru: 'Биржа IT-проектов', hy: 'Նախագծերի բորսա' },
  my_projects: { en: 'My Projects', ru: 'Мои объявления', hy: 'Իմ հայտարարությունները' },
  responses: { en: 'Responses', ru: 'Отклики', hy: 'Արձագանքներ' },
  chats: { en: 'Chats', ru: 'Чаты', hy: 'Չաթեր' },
  create_ad: { en: 'Create Project', ru: 'Создать объявление', hy: 'Ստեղծել հայտարարություն' },
  
  // Profile
  edit_profile: { en: 'Edit Profile', ru: 'Редактировать профиль', hy: 'Խմբագրել պրոֆիլը' },
  years_exp: { en: 'Years of Experience', ru: 'Опыт работы (лет)', hy: 'Աշխատանքային փորձ (տարի)' },
  category: { en: 'Sphere of Activity', ru: 'Сфера деятельности', hy: 'Գործունեության ոլորտ' },
  bio: { en: 'About Me', ru: 'О себе', hy: 'Իմ մասին' },
  save: { en: 'Save Changes', ru: 'Сохранить изменения', hy: 'Պահպանել փոփոխությունները' },

  // Admin
  admin_panel: { en: 'Admin Panel', ru: 'Админ-панель', hy: 'Ադմինիստրատորի վահանակ' },
  total_users: { en: 'Total Users', ru: 'Всего пользователей', hy: 'Ընդհանուր օգտատերեր' },
  users_online: { en: 'Users Online', ru: 'Пользователей онлайн', hy: 'Օգտատերեր առցանց' },
  manage_users: { en: 'Manage Users', ru: 'Управление пользователями', hy: 'Օգտատերերի կառավարում' },
  manage_ads: { en: 'Manage Ads', ru: 'Все объявления', hy: 'Բոլոր հայտարարությունները' }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('af_lang');
    if (savedLang) {
      setLangState(savedLang as Language);
    } else {
      // Auto-detect by IP
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          if (data.country_code === 'AM') setLangState('hy');
          else if (['RU', 'BY', 'KZ'].includes(data.country_code)) setLangState('ru');
          else setLangState('en');
        })
        .catch(() => setLangState('en'));
    }
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('af_lang', l);
  };

  const t = (key: string) => {
    if (!translations[key]) return key;
    return translations[key][lang];
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
