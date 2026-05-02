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
    post_job: 'Post New Project',
    
    // Dashboard new additions
    earnings_month: 'EARNINGS THIS MONTH',
    active_applications: 'ACTIVE APPLICATIONS',
    available_connects: 'AVAILABLE CONNECTS',
    recommended_for_you: 'Recommended for you',
    curated_dna: 'Curated based on your professional DNA',
    view_marketplace: 'View Marketplace',
    top_projects_feed: 'Top Projects Feed',
    no_projects_found: 'No projects found matching',
    module_active: 'Module is active',
    module_desc: 'This section is part of the professional CRM workflow. Ready to integrate data API.',
    account_summary: 'Account Summary',
    profile_completeness: 'Profile completeness:',
    identity_verified: 'Identity verified',
    payment_method: 'Payment method',
    upcoming_deadlines: 'Upcoming Deadlines',
    no_deadlines: 'No active contracts with deadlines.',
    start_agency: 'Start an Agency to scale your business',
    agency_desc: 'Collaborate with other specialists under one banner and win bigger projects.',
    create_agency: 'Create Agency',
    description: 'Description',
    location: 'Location',
    client_label: 'Client',
    submit_proposal: 'Submit Proposal',
    price: 'Price',
    proposals: 'Proposals',
    fixed: 'fixed',
    hourly: 'hourly',
    posted_just_now: 'Just now',
    posted_2h: '2h ago',
    posted_5h: '5h ago',
    posted_1d: '1d ago'
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
    post_job: 'Разместить проект',
    
    // Dashboard new additions
    earnings_month: 'ЗАРАБОТОК В ЭТОМ МЕСЯЦЕ',
    active_applications: 'АКТИВНЫЕ ЗАЯВКИ',
    available_connects: 'ДОСТУПНЫЕ КОННЕКТЫ',
    recommended_for_you: 'Рекомендуем вам',
    curated_dna: 'Подобрано на основе вашего профиля',
    view_marketplace: 'Смотреть биржу',
    top_projects_feed: 'Лента лучших проектов',
    no_projects_found: 'Не найдено проектов по запросу',
    module_active: 'Модуль активен',
    module_desc: 'Этот раздел — часть профессиональной CRM. Готов к интеграции с API.',
    account_summary: 'Сводка аккаунта',
    profile_completeness: 'Заполненность профиля:',
    identity_verified: 'Личность подтверждена',
    payment_method: 'Способ оплаты',
    upcoming_deadlines: 'Ближайшие дедлайны',
    no_deadlines: 'Нет активных контрактов с дедлайнами.',
    start_agency: 'Создайте агентство для масштабирования',
    agency_desc: 'Сотрудничайте с другими специалистами и получайте крупные заказы.',
    create_agency: 'Создать агентство',
    description: 'Описание',
    location: 'Локация',
    client_label: 'Клиент',
    submit_proposal: 'Подать заявку',
    price: 'Цена',
    proposals: 'Заявок',
    fixed: 'фикс.',
    hourly: 'почас.',
    posted_just_now: 'Только что',
    posted_2h: '2ч назад',
    posted_5h: '5ч назад',
    posted_1d: '1д назад'
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
    post_job: 'Տեղադրել նախագիծ',
    
    // Dashboard new additions
    earnings_month: 'ԱՅՍ ԱՄՍՎԱ ԵԿԱՄՈՒՏԸ',
    active_applications: 'ԱԿՏԻՎ ՀԱՅՏԵՐ',
    available_connects: 'ՀԱՍԱՆԵԼԻ ԿԱՊԵՐ',
    recommended_for_you: 'Առաջարկվում է ձեզ',
    curated_dna: 'Ընտրված է ըստ ձեր պրոֆիլի',
    view_marketplace: 'Դիտել շուկան',
    top_projects_feed: 'Լավագույն նախագծերի ժապավեն',
    no_projects_found: 'Ոչ մի նախագիծ չի գտնվել',
    module_active: 'Մոդուլն ակտիվ է',
    module_desc: 'Այս բաժինը պրոֆեսիոնալ CRM-ի մաս է: Պատրաստ է API ինտեգրման:',
    account_summary: 'Հաշվի ամփոփում',
    profile_completeness: 'Պրոֆիլի լրացվածություն՝',
    identity_verified: 'Ինքնությունը հաստատված է',
    payment_method: 'Վճարման եղանակ',
    upcoming_deadlines: 'Առաջիկա վերջնաժամկետներ',
    no_deadlines: 'Չկան ակտիվ պայմանագրեր վերջնաժամկետներով:',
    start_agency: 'Ստեղծեք գործակալություն՝ ընդլայնելու համար',
    agency_desc: 'Համագործակցեք այլ մասնագետների հետ և ստացեք խոշոր նախագծեր:',
    create_agency: 'Ստեղծել գործակալություն',
    description: 'Նկարագրություն',
    location: 'Գտնվելու վայրը',
    client_label: 'Պատվիրատու',
    submit_proposal: 'Ներկայացնել հայտ',
    price: 'Գին',
    proposals: 'Հայտեր',
    fixed: 'ֆիքսված',
    hourly: 'ժամավճար',
    posted_just_now: 'Քիչ առաջ',
    posted_2h: '2ժ առաջ',
    posted_5h: '5ժ առաջ',
    posted_1d: '1օր առաջ'
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
