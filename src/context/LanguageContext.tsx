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
  hero_title: { en: 'High-qualified IT Specialists on Demand.', ru: 'Высококвалифицированные IT-специалисты по запросу.', hy: 'Բարձրորակ ՏՏ մասնագետներ ըստ պահանջի:' },
  hero_subtitle: { en: 'EVOLVE TOGETHER WITH THE BEST SPECIALISTS IN ARMENIA', ru: 'РАЗВИВАЙТЕСЬ ВМЕСТЕ С ЛУЧШИМИ СПЕЦИАЛИСТАМИ АРМЕНИИ', hy: 'ԶԱՐԳԱՑԵՔ ՀԱՅԱՍՏԱՆԻ ԼԱՎԱԳՈՒՅՆ ՄԱՍՆԱԳԵՏՆԵՐԻ ՀԵՏ' },
  become_performer: { en: 'Become a Performer', ru: 'СТАТЬ ИСПОЛНИТЕЛЕМ', hy: 'ԴԱՌՆԱԼ ԿԱՏԱՐՈՂ' },
  become_client_btn: { en: 'Become a Client', ru: 'СТАТЬ ЗАКАЗЧИКОМ', hy: 'ԴԱՌՆԱԼ ՊԱՏՎԻՐԱՏՈՒ' },
  
  // Categories
  categories_title: { en: 'CORE IT DIRECTIONS', ru: 'ОСНОВНЫЕ IT-НАПРАВЛЕНИЯ', hy: 'ՏՏ ՀԻՄՆԱԿԱՆ ՈՒՂՂՈՒԹՅՈՒՆՆԵՐԸ' },
  categories_subtitle: { en: 'SPECIALIZED SOLUTIONS FOR ANY STACK', ru: 'СПЕЦИАЛИЗИРОВАННЫЕ РЕШЕНИЯ ДЛЯ ЛЮБОГО СТЕКА', hy: 'ՄԱՍՆԱԳԻՏԱՑՎԱԾ ԼՈՒԾՈՒՄՆԵՐ ՑԱՆԿԱՑԱԾ ՍՏԵԿԻ ՀԱՄԱՐ' },
  cat_web: { en: 'Web Development', ru: 'ВЕБ-РАЗРАБОТКА', hy: 'ՎԵԲ ՄՇԱԿՈՒՄ' },
  cat_mobile: { en: 'Mobile Apps', ru: 'МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ', hy: 'ՄՈԲԱՅԼ ՀԱՎԵԼՎԱԾՆԵՐ' },
  cat_backend: { en: 'Backend / API', ru: 'BACKEND / API', hy: 'BACKEND / API' },
  cat_devops: { en: 'DevOps / Infrastructure', ru: 'DEVOPS / ИНФРАСТРУКТУРА', hy: 'DEVOPS / ԵՆԹԱԿԱՌՈՒՑՎԱԾՔ' },
  cat_db: { en: 'Databases', ru: 'БАЗЫ ДАННЫХ', hy: 'ՏՎՅԱԼՆԵՐԻ ԲԱԶԱՆԵՐ' },
  cat_testing: { en: 'Testing / QA', ru: 'ТЕСТИРОВАНИЕ / QA', hy: 'ԹԵՍՏԱՎՈՐՈՒՄ / QA' },
  cat_outsourcing: { en: 'IT Outsourcing', ru: 'IT-АУТСОРСИНГ', hy: 'ՏՏ ԱՈՒԹՍՈՐՍԻՆԳ' },
  cat_automation: { en: 'Automation / Chatbots', ru: 'АВТОМАТИЗАЦИЯ / ЧАТ-БОТЫ', hy: 'ԱՎՏՈՄԱՏԱՑՈՒՄ / ՉԱԹ-ԲՈՏԵՐ' },

  // Specialists
  specialists_title: { en: 'VERIFIED IT SPECIALISTS', ru: 'ПРОВЕРЕННЫЕ IT-СПЕЦИАЛИСТЫ', hy: 'ՍՏՈՒԳՎԱԾ ՏՏ ՄԱՍՆԱԳԵՏՆԵՐ' },
  specialists_subtitle: { en: 'TOP DEVELOPERS READY TO WORK', ru: 'ТОП-РАЗРАБОТЧИКИ, ГОТОВЫЕ К РАБОТЕ', hy: 'ԼԱՎԱԳՈՒՅՆ ՄՇԱԿՈՂՆԵՐԸ ՊԱՏՐԱՍՏ ԵՆ ԱՇԽԱՏԱՆՔԻ' },
  view_marketplace: { en: 'VIEW MARKETPLACE', ru: 'СМОТРЕТЬ БИРЖУ', hy: 'ԴԻՏԵԼ ԲՈՐՍԱՆ' },
  price_from: { en: 'from', ru: 'ОТ', hy: 'ՍԿՍԱԾ' },
  per_hour: { en: '/hr', ru: '/ЧАС', hy: '/Ժ' },
  contact_specialist: { en: 'CONTACT', ru: 'СВЯЗАТЬСЯ', hy: 'ԿԱՊՆՎԵԼ' },

  // Order Form
  post_project_form_title: { en: 'PUBLISH IT ORDER', ru: 'ОПУБЛИКОВАТЬ IT-ЗАКАЗ', hy: 'ՀՐԱՊԱՐԱԿԵԼ ՏՏ ՊԱՏՎԵՐ' },
  get_started: { en: 'START NOW', ru: 'НАЧАТЬ СЕЙЧАС', hy: 'ՍԿՍԵԼ ՀԻՄԱ' },
  project_name: { en: 'PROJECT NAME', ru: 'НАЗВАНИЕ ПРОЕКТА', hy: 'ՆԱԽԱԳԾԻ ԱՆՎԱՆՈՒՄԸ' },
  project_category: { en: 'CATEGORY', ru: 'КАТЕГОРИЯ', hy: 'ԿԱՏԵԳՈՐԻԱ' },
  project_budget: { en: 'BUDGET (OR "NEGOTIABLE")', ru: 'БЮДЖЕТ (ИЛИ "ДОГОВОРНОЙ")', hy: 'ԲՅՈՒՋԵ (ԿԱՄ «ՊԱՅՄԱՆԱԳՐԱՅԻՆ»)' },
  project_desc: { en: 'DESCRIPTION (STACK, DEADLINES, REQUIREMENTS)', ru: 'ОПИСАНИЕ (СТЕК, СРОКИ, ТРЕБОВАНИЯ)', hy: 'ՆԿԱՐԱԳՐՈՒԹՅՈՒՆ (ՍՏԵԿ, ԺԱՄԿԵՏՆԵՐ, ՊԱՀԱՆՋՆԵՐ)' },
  submit_project: { en: 'PUBLISH PROJECT', ru: 'ОПУБЛИКОВАТЬ ПРОЕКТ', hy: 'ՀՐԱՊԱՐԱԿԵԼ ՆԱԽԱԳԻԾԸ' },

  // Testimonials
  testimonials_title: { en: 'VOICES OF SUCCESS', ru: 'ГОЛОСА УСПЕХА', hy: 'ՀԱՋՈՂՈՒԹՅԱՆ ՁԱՅՆԵՐԸ' },
  testimonials_subtitle: { en: 'CLIENT REVIEWS ABOUT SPECIALISTS WORK', ru: 'ОТЗЫВЫ ЗАКАЗЧИКОВ О РАБОТЕ СПЕЦИАЛИСТОВ', hy: 'ՊԱՏՎԻՐԱՏՈՒՆԵՐԻ ԿԱՐԾԻՔՆԵՐԸ ՄԱՍՆԱԳԵՏՆԵՐԻ ԱՇԽԱՏԱՆՔԻ ՄԱՍԻՆ' },
  average_rating: { en: 'AVERAGE RATING 4.9/5', ru: 'СРЕДНИЙ РЕЙТИНГ 4.9/5', hy: 'ՄԻՋԻՆ ՎԱՐԿԱՆԻՇԸ 4.9/5' },

  // Footer
  platform: { en: 'PLATFORM', ru: 'ПЛАТФОРМА', hy: 'ՀԱՐԹԱԿ' },
  support: { en: 'SUPPORT', ru: 'САППОРТ', hy: 'ԱՋԱԿՑՈՒԹՅՈՒՆ' },
  feedback: { en: 'FEEDBACK', ru: 'ОБРАТНАЯ СВЯЗЬ', hy: 'ՀԵՏԱԴԱՐՁ ԿԱՊ' },
  all_rights: { en: 'All rights reserved.', ru: 'Все права защищены.', hy: 'Բոլոր իրավունքները պաշտպանված են:' },
  made_by: { en: 'Made by', ru: 'Сделано командой', hy: 'Պատրաստված է' },
  
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
  find_work: { en: 'Find Work', ru: 'Найти работу', hy: 'Գտնել աշխատանք' },
  personal_account: { en: 'Dashboard', ru: 'Личный кабинет', hy: 'Անձնական էջ' },
  
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
