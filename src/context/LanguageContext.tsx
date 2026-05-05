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
    hero_grid: 'ԷԼԻՏԱՐ ՑԱՆՑ',
    search_placeholder: 'Փնտրեք տեխնիկական վարպետություն կամ նախագծեր...',
    initialize_search: 'Սկսել որոնումը',
    verified_specialists: 'Ստուգված մասնագետներ',
    projected_volume: 'Նախագծված ծավալ',
    node_uptime: 'Համակարգի աշխատունակություն',
    elite_specialists: 'Էլիտար մասնագետներ',
    top_tier_performers: 'Բարձրակարգ կատարողներ',
    client_reviews: 'Հաճախորդների կարծիքները',
    success_transmissions: 'Հաջողության հաղորդումներ',
    categories_title: 'Գործառնական տիրույթներ',
    browse_all: 'Դիտել բոլորը',
    how_it_works: 'Ինչպես է այն աշխատում',
    execution_protocol: 'Կատարման արձանագրություն',
    security_escrow: 'Անվտանգություն և Էսքրոու',
    
    // Process Steps
    step_1_title: 'Սահմանել նպատակը',
    step_1_desc: 'Կազմեք ձեր նախագծի մանրամասն տեխնիկական առաջադրանքը:',
    step_2_title: 'Համապատասխանեցնել որակավորումը',
    step_2_desc: 'Վերանայեք մասնագետների առաջարկները և ստուգված պորտֆոլիոները:',
    step_3_title: 'Իրականացնել սինխրոնիզացիա',
    step_3_desc: 'Ստեղծեք անվտանգ կապ և սկսեք նախագծի իրականացումը:',
    
    // Roles
    role_freelancer: 'Ֆրիլանսեր',
    role_client: 'Պատվիրատու',
    role_agency: 'Գործակալություն',
    
    // Dashboard
    dashboard_title: 'Կառավարման վահանակ',
    my_projects: 'Իմ նախագծերը',
    messages: 'Հաղորդագրություններ',
    balance: 'Հաշվեկշիռ',
    active_missions: 'Ակտիվ առաքելություններ',
    credits: 'Կրեդիտներ',
    overview: 'Ակնարկ',
    wallet: 'Քսակ',
    trust_rating: 'Վստահության վարկանիշ',
    op_cycles: 'Գործառնական ցիկլեր',
    verification: 'Վերիֆիկացում',
    active_protocols: 'Ակտիվ արձանագրություններ',
    view_archive: 'Դիտել արխիվը',
    system_status: 'Համակարգի կարգավիճակ',
    synchronized: 'Սինխրոնիզացված',
    proposals: 'Առաջարկներ',
    audit_status: 'Աուդիտի կարգավիճակ',
    pulse: 'Էկոհամակարգի պուլս',
    
    // Auth Flow
    authentication: 'Աուտենտիկացում',
    initialization: 'Ինիցիալիզացիա',
    welcome_back: 'Բարի գալուստ',
    entry_protocol: 'Մուտքի արձանագրություն',
    email_identity: 'Էլ. հասցե',
    nickname_tag: 'Մականուն',
    password_key: 'Գաղտնաբառ',
    confirm_key: 'Հաստատել գաղտնաբառը',
    authorize_access: 'Լիազորել մուտքը',
    initiate_protocol: 'Սկսել արձանագրությունը',
    external_gateways: 'Արտաքին մուտքեր',
    security_audit: 'Անվտանգության աուդիտ',
    confirm_identity: 'Հաստատել ինքնությունը',
    path_selection: 'Ուղու ընտրություն',
    specialist_arch: 'Մասնագիտական ճարտարապետություն',
    agency_infra: 'Գործակալության ենթակառուցվածք',
    client_procurement: 'Պատվիրատուի գնումներ',
    proceed_profiling: 'Անցնել պրոֆիլավորմանը',
    profile_genesis: 'Պրոֆիլի ստեղծում',
    deploy_identity: 'Տեղադրել ինքնությունը',
    
    // Specialist Catalog
    specialist_registry: 'Մասնագետների ռեգիստր',
    geo_nodes: 'Աշխարհագրական հանգույցներ',
    valuation_range: 'Գնահատման միջակայք',
    mastery_level: 'Վարպետության մակարդակ',
    apply_filters: 'Կիրառել ֆիլտրման արձանագրությունը',
    sort_by: 'Տեսակավորել ըստ',
    rating_protocol: 'Վարկանիշի արձանագրություն',
    valuation_low_high: 'Գնահատում (ցածր-բարձր)',
    active_responses: 'Ակտիվ արձագանքներ',
    new_registry: 'Նոր ռեգիստր',
    missions: 'Առաքելություններ',
    audit_node: 'Աուդիտի հանգույց',
    
    // Job Details
    return_registry: 'Վերադառնալ ռեգիստր',
    asset_audit: 'Արձանագրություն. Ակտիվների աուդիտ',
    technical_brief: 'Տեխնիկական բրիֆ',
    complexity_level: 'Բարդության մակարդակ',
    escrow_security: 'Էսքրոու անվտանգություն',
    neural_responses: 'Նյարդային պատասխաններ',
    valuation_proposal: 'Գնահատման առաջարկ',
    initiate_sync: 'Նախաձեռնել սինխրոնիզացիա',
    initiate_proposal: 'Նախաձեռնել առաջարկ',
    proposal_broadcasted: 'Առաջարկը հեռարձակված է',
    proposal_deployment: 'Առաջարկի տեղադրում',
    broadcast_for: 'Հեռարձակում համար',
    operational_narrative: 'Գործառնական պատմություն',
    execute_transmission: 'Կատարել փոխանցում',
    sync_requirements: 'Սինխրոնիզացման պահանջներ',
    abort_procedure: 'Ընդհատել ընթացակարգը',
    
    // Profile
    configure_profile: 'Կարգավորել պրոֆիլը',
    trust_index: 'Վստահության ինդեքս',
    missions_done: 'Ավարտված առաքելություններ',
    initiate_dialogue: 'Նախաձեռնել երկխոսություն',
    core_skillsets: 'Հիմնական հմտություններ',
    identity_narrative: 'Ինքնության պատմություն',
    visual_archive: 'Վիզուալ արխիվ',
    preset_services: 'Կանխորոշված ծառայություններ',
    feedback_logs: 'Հետադարձ կապի մատյաններ',
    initiate_service: 'Նախաձեռնել ծառայություն',
    
    // Post Job
    post_job: 'Տեղադրել նախագիծ',
    find_work: 'Գտնել աշխատանք',
    budget: 'Բյուջե',
    deadline: 'Վերջնաժամկետ',
    mission_registry: 'Առաքելությունների ռեեստր',
    registry_subtitle: 'Ստուգեք ակտիվ նպատակները Հայաստանի տեխնիկական ցանցում',
    project_protocol: 'Նախագծի արձանագրություն',
    fixed_price: 'Ֆիքսված գին',
    hourly_sync: 'Ժամավճար',
    retainer_node: 'Ռետեյներ',
    complexity_level: 'Բարդության մակարդակ',
    expert_arch: 'Փորձագիտական ճարտարապետություն',
    standard_impl: 'Ստանդարտ իրականացում',
    entry_task: 'Մեկնարկային առաջադրանք',
    budget_allocation: 'Բյուջեի բաշխում',
    scan_registry: 'Սկանավորել ռեեստրը',
    no_missions: 'Ակտիվ առաքելություններ չեն հայտնաբերվել:',
    proposals_received: 'Առաջարկ ստացված',
    resource_allocation: 'Ռեսուրսների բաշխում',
    audit_objective: 'Ստուգել նպատակը',
    
    // Post Job
    initiate_request: 'Նախաձեռնել հարցում',
    broadcasting: 'Հեռարձակում էլիտար մասնագետների ցանցին',
    objective_title: 'Նպատակի վերնագիր',
    operational_domain: 'Գործառնական տիրույթ',
    technical_brief: 'Տեխնիկական ամփոփագիր',
    deploy_mission: 'Տեղադրել առաքելությունը ռեեստրում',
    abort_deployment: 'Ընդհատել տեղադրումը'
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
    hero_grid: 'ЭЛИТНАЯ СЕТЬ',
    search_placeholder: 'Поиск технического мастерства или проектов...',
    initialize_search: 'Начать поиск',
    verified_specialists: 'Проверенные специалисты',
    projected_volume: 'Прогнозируемый объем',
    node_uptime: 'Аптайм системы',
    elite_specialists: 'Элитные специалисты',
    top_tier_performers: 'Топ-исполнители',
    client_reviews: 'Отзывы клиентов',
    success_transmissions: 'Передачи успеха',
    categories_title: 'Операционные области',
    browse_all: 'Посмотреть все',
    how_it_works: 'Как это работает',
    execution_protocol: 'Протокол выполнения',
    security_escrow: 'Безопасность и Эскроу',
    
    step_1_title: 'Определить цель',
    step_1_desc: 'Составьте детальный технический бриф для вашего проекта.',
    step_2_title: 'Сопоставить квалификацию',
    step_2_desc: 'Просмотрите предложения специалистов и проверенные портфолио.',
    step_3_title: 'Выполнить синхронизацию',
    step_3_desc: 'Установите защищенное соединение и начните развертывание.',
    
    role_freelancer: 'Фрилансер',
    role_client: 'Заказчик',
    role_agency: 'Агентство',
    
    dashboard_title: 'Панель управления',
    my_projects: 'Мои проекты',
    messages: 'Сообщения',
    balance: 'Баланс',
    active_missions: 'Активные миссии',
    credits: 'Кредиты',
    overview: 'Обзор',
    wallet: 'Кошелек',
    trust_rating: 'Рейтинг доверия',
    op_cycles: 'Операционные циклы',
    verification: 'Верификация',
    active_protocols: 'Активные протоколы',
    view_archive: 'Посмотреть архив',
    system_status: 'Статус системы',
    synchronized: 'Синхронизировано',
    proposals: 'Предложения',
    audit_status: 'Статус аудита',
    pulse: 'Пульс экосистемы',
    
    // Auth Flow
    authentication: 'Аутентификация',
    initialization: 'Инициализация',
    welcome_back: 'С возвращением',
    entry_protocol: 'Протокол входа',
    email_identity: 'Эл. почта',
    nickname_tag: 'Никнейм',
    password_key: 'Пароль',
    confirm_key: 'Подтвердить пароль',
    authorize_access: 'Авторизовать доступ',
    initiate_protocol: 'Начать протокол',
    external_gateways: 'Внешние шлюзы',
    security_audit: 'Аудит безопасности',
    confirm_identity: 'Подтвердить личность',
    path_selection: 'Выбор пути',
    specialist_arch: 'Архитектура специалиста',
    agency_infra: 'Инфраструктура агентства',
    client_procurement: 'Закупки клиента',
    proceed_profiling: 'Перейти к профилированию',
    profile_genesis: 'Создание профиля',
    deploy_identity: 'Развернуть личность',
    
    // Specialist Catalog
    specialist_registry: 'Реестр специалистов',
    geo_nodes: 'Географические узлы',
    valuation_range: 'Диапазон оценки',
    mastery_level: 'Уровень мастерства',
    apply_filters: 'Применить протокол фильтрации',
    sort_by: 'Сортировать по',
    rating_protocol: 'Протокол рейтинга',
    valuation_low_high: 'Оценка (низкая-высокая)',
    active_responses: 'Активные ответы',
    new_registry: 'Новый реестр',
    missions: 'Миссии',
    audit_node: 'Аудит узла',
    
    // Job Details
    return_registry: 'Вернуться в реестр',
    asset_audit: 'Протокол: Аудит активов',
    technical_brief: 'Технический бриф',
    complexity_level: 'Уровень сложности',
    escrow_security: 'Безопасность эскроу',
    neural_responses: 'Отклики сети',
    valuation_proposal: 'Предложение по стоимости',
    initiate_sync: 'Начать синхронизацию',
    initiate_proposal: 'Подать предложение',
    proposal_broadcasted: 'Предложение отправлено',
    proposal_deployment: 'Развертывание предложения',
    broadcast_for: 'Трансляция для',
    operational_narrative: 'Описание подхода',
    execute_transmission: 'Выполнить передачу',
    sync_requirements: 'Требования синхронизации',
    abort_procedure: 'Прервать процедуру',
    
    // Profile
    configure_profile: 'Настроить профиль',
    trust_index: 'Индекс доверия',
    missions_done: 'Миссий выполнено',
    initiate_dialogue: 'Начать диалог',
    core_skillsets: 'Ключевые навыки',
    identity_narrative: 'Личная история',
    visual_archive: 'Визуальный архив',
    preset_services: 'Готовые услуги',
    feedback_logs: 'Журнал отзывов',
    initiate_service: 'Заказать услугу',
    
    post_job: 'Разместить проект',
    find_work: 'Найти работу',
    budget: 'Бюджет',
    deadline: 'Дедлайн',
    mission_registry: 'Реестр миссий',
    registry_subtitle: 'Проверьте активные цели в технической сети Армении',
    project_protocol: 'Протокол проекта',
    fixed_price: 'Фиксированная цена',
    hourly_sync: 'Почасовая оплата',
    retainer_node: 'Ретейнер',
    complexity_level: 'Уровень сложности',
    expert_arch: 'Экспертная архитектура',
    standard_impl: 'Стандартная реализация',
    entry_task: 'Начальная задача',
    budget_allocation: 'Распределение бюджета',
    scan_registry: 'Сканировать реестр',
    no_missions: 'Активных миссий не обнаружено.',
    proposals_received: 'Предложений получено',
    resource_allocation: 'Распределение ресурсов',
    audit_objective: 'Проверить цель',
    
    initiate_request: 'Инициировать запрос',
    broadcasting: 'Трансляция сети элитных специалистов',
    objective_title: 'Заголовок цели',
    operational_domain: 'Операционная область',
    technical_brief: 'Технический бриф',
    deploy_mission: 'Развернуть миссию в реестре',
    abort_deployment: 'Прервать развертывание'
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
    hero_grid: 'ELITE GRID',
    search_placeholder: 'Scan for technical mastery or project objectives...',
    initialize_search: 'Initialize Search',
    verified_specialists: 'Verified Specialists',
    projected_volume: 'Projected Volume',
    node_uptime: 'Node Uptime',
    elite_specialists: 'Elite Specialists',
    top_tier_performers: 'Top-Tier Performers',
    client_reviews: 'Client Reviews',
    success_transmissions: 'Success Transmissions',
    categories_title: 'Operational Domains',
    browse_all: 'Browse All Segments',
    how_it_works: 'How it Works',
    execution_protocol: 'Execution Protocol',
    security_escrow: 'Security & Escrow Layer',
    
    step_1_title: 'Define Objective',
    step_1_desc: 'Draft a detailed architectural brief for your project.',
    step_2_title: 'Match Credentials',
    step_2_desc: 'Review elite specialist proposals and verified portfolios.',
    step_3_title: 'Execute Sync',
    step_3_desc: 'Establish a secure tunnel and begin architectural deployment.',
    
    role_freelancer: 'Freelancer',
    role_client: 'Client',
    role_agency: 'Agency',
    
    dashboard_title: 'Dashboard',
    my_projects: 'My Projects',
    messages: 'Messages',
    balance: 'Balance',
    active_missions: 'Active Missions',
    credits: 'Credits',
    overview: 'Overview',
    wallet: 'Wallet',
    trust_rating: 'Trust Rating',
    op_cycles: 'Operational Cycles',
    verification: 'Verification',
    active_protocols: 'Active Protocols',
    view_archive: 'View Archive',
    system_status: 'System Status',
    synchronized: 'Synchronized',
    proposals: 'Proposals',
    audit_status: 'Audit Status',
    pulse: 'Ecosystem Pulse',
    
    // Auth Flow
    authentication: 'Authentication',
    initialization: 'Initialization',
    welcome_back: 'Welcome Back',
    entry_protocol: 'Entry Protocol',
    email_identity: 'Satellite Identity (Email)',
    nickname_tag: 'Visual Tag (Nickname)',
    password_key: 'Access Key (Password)',
    confirm_key: 'Confirm Access Key',
    authorize_access: 'Authorize Access',
    initiate_protocol: 'Initiate Protocol',
    external_gateways: 'External Gateways',
    security_audit: 'Security Audit',
    confirm_identity: 'Confirm Identity',
    path_selection: 'Path Selection',
    specialist_arch: 'Specialist Architecture',
    agency_infra: 'Agency Infrastructure',
    client_procurement: 'Client Procurement',
    proceed_profiling: 'Proceed to Profiling',
    profile_genesis: 'Profile Genesis',
    deploy_identity: 'Deploy Identity',
    
    // Specialist Catalog
    specialist_registry: 'Specialist Registry',
    geo_nodes: 'Geographical Nodes',
    valuation_range: 'Valuation Range',
    mastery_level: 'Mastery Level',
    apply_filters: 'Apply Filter Protocol',
    sort_by: 'Sort By',
    rating_protocol: 'Rating Protocol',
    valuation_low_high: 'Valuation (Low-High)',
    active_responses: 'Active Responses',
    new_registry: 'New Registry',
    missions: 'Missions',
    audit_node: 'Audit Node',
    
    // Job Details
    return_registry: 'Return to Registry',
    asset_audit: 'Protocol: Asset Audit',
    technical_brief: 'Technical Brief',
    complexity_level: 'Complexity Level',
    escrow_security: 'Escrow Security',
    neural_responses: 'Neural Responses',
    valuation_proposal: 'Valuation Proposal',
    initiate_sync: 'Initiate Sync',
    initiate_proposal: 'Initiate Proposal',
    proposal_broadcasted: 'Proposal Broadcasted',
    proposal_deployment: 'Proposal Deployment',
    broadcast_for: 'Broadcast for',
    operational_narrative: 'Operational Narrative',
    execute_transmission: 'Execute Transmission',
    sync_requirements: 'Sync Requirements',
    abort_procedure: 'Abort Procedure',
    
    // Profile
    configure_profile: 'Configure Profile',
    trust_index: 'Trust Index',
    missions_done: 'Missions Done',
    initiate_dialogue: 'Initiate Dialogue',
    core_skillsets: 'Core Skillsets',
    identity_narrative: 'Identity Narrative',
    visual_archive: 'Visual Archive',
    preset_services: 'Pre-set Services',
    feedback_logs: 'Feedback Logs',
    initiate_service: 'Initiate Service',
    
    // Post Job
    post_job: 'Post a Project',
    find_work: 'Find Work',
    budget: 'Budget',
    deadline: 'Deadline',
    mission_registry: 'Mission Registry',
    registry_subtitle: 'Audit active objectives in the Armenia Technical Grid',
    project_protocol: 'Project Protocol',
    fixed_price: 'Fixed Price',
    hourly_sync: 'Hourly Sync',
    retainer_node: 'Retainer Node',
    complexity_level: 'Complexity Level',
    expert_arch: 'Expert Architecture',
    standard_impl: 'Standard Implementation',
    entry_task: 'Entry Task',
    budget_allocation: 'Budget Allocation',
    scan_registry: 'Scan Registry',
    no_missions: 'No active mission objectives detected in the current cycle.',
    proposals_received: 'Proposals Received',
    resource_allocation: 'Resource Allocation',
    audit_objective: 'Audit Objective',
    
    initiate_request: 'Initiate Request',
    broadcasting: 'Broadcasting to elite specialist network',
    objective_title: 'Objective Title',
    operational_domain: 'Operational Domain',
    technical_brief: 'Technical Brief',
    deploy_mission: 'Deploy Mission to Registry',
    abort_deployment: 'Abort Deployment'
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
