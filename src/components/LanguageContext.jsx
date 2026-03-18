import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  EN: {
    // Navigation
    logo: 'iRap',
    subscribe: 'Subscribe',
    home: 'Home',
    create: 'Create',
    explore: 'Explore',
    presets: 'Presets',
    playlists: 'Playlists',
    groups: 'Groups',
    battles: 'Battles',
    safety: 'Safety',
    settings: 'Settings',
    
    // Consent Gate
    consentTitle: 'Welcome to iRap',
    consentBody: 'Before you start creating amazing content, please review and accept our terms and conditions. This platform is designed for users aged 12-16 and includes AI-generated content with explicit language.',
    consentLabel: 'I have read and agree to the Terms of Service and Privacy Policy',
    consentApprove: 'Approve & Continue',
    consentSubscribe: 'View Subscription Plans',
    
    // Home
    homeHero: 'Create Your Next Diss',
    homeHeroSub: 'AI-powered rap generation for the next generation of artists',
    homeCtaPrimary: 'Start Creating',
    homeCtaSecondary: 'Explore Tracks',
    homeFeatureCreate: 'Create a Diss',
    homeFeatureCreateDesc: 'Generate AI-powered tracks in seconds',
    homeFeatureExplore: 'Explore',
    homeFeatureExploreDesc: 'Discover trending content from the community',
    homeFeatureBattles: 'Join Battles',
    homeFeatureBattlesDesc: 'Compete and climb the leaderboard',
    homeTrending: 'Trending Sounds',
    homePlays: 'plays',
    homeNewRelease: 'New',
    
    // Create
    createTitle: 'Studio',
    createSubtitle: 'Create your next track',
    createTextInput: 'Topic or Lyrics',
    createTextPlaceholder: 'Write about something or someone...',
    createStyle: 'Style',
    createLanguage: 'Language',
    createBeat: 'Beat',
    createDissHeat: 'Diss Heat',
    createHeatLow: 'Mild',
    createHeatHigh: 'Extreme',
    createGenerate: 'Generate Track',
    createComingSoon: 'Backend integration coming soon',
    createStyleAggressive: 'Aggressive',
    createStyleMelodic: 'Melodic',
    createStyleFastFlow: 'Fast Flow',
    createStyleTrap: 'Trap',
    createStyleBoomBap: 'Boom Bap',
    createStyleDrill: 'Drill',
    createLangEnglish: 'English',
    createLangHebrew: 'Hebrew',
    createLangMixed: 'Mixed',
    createBeat1: 'Urban Pulse',
    createBeat2: 'Dark Alley',
    createBeat3: 'Smooth Ride',
    createBeat4: 'Battle Mode',
    createBeat5: 'Night Drive',
    createPreview: 'Preview Output',
    createPreviewDesc: 'Your generated track will appear here',
    
    // Explore
    exploreTitle: 'Explore',
    exploreSubtitle: 'Discover what\'s trending',
    exploreSearch: 'Search tracks, artists...',
    exploreSortBy: 'Sort by',
    exploreSortTrending: 'Trending',
    exploreSortNew: 'New',
    exploreSortMostPlayed: 'Most Played',
    exploreSortMostLiked: 'Most Liked',
    exploreFilters: 'Filters',
    exploreAll: 'All',
    explorePlays: 'plays',
    exploreLikes: 'likes',
    
    // Presets
    presetsTitle: 'Presets Library',
    presetsSubtitle: 'Pre-made lines, hooks, and slang',
    presetsSearch: 'Search presets...',
    presetsPunchlines: 'Punchlines',
    presetsHooks: 'Hooks',
    presetsSlang: 'Slang',
    presetsOpeners: 'Openers',
    presetsInsert: 'Insert',
    presetsUses: 'uses',
    presetsPopular: 'Popular',
    
    // Playlists
    playlistsTitle: 'Playlists',
    playlistsSubtitle: 'Organize your favorite tracks',
    playlistsCreate: 'Create Playlist',
    playlistsTracks: 'tracks',
    
    // Groups
    groupsTitle: 'Groups',
    groupsSubtitle: 'Connect with the community',
    groupsPublic: 'Public',
    groupsPrivate: 'Private',
    groupsCreate: 'Create Group',
    groupsJoin: 'Join',
    groupsMembers: 'members',
    groupsAdmin: 'Admin',
    
    // Battles
    battlesTitle: 'Battles',
    battlesSubtitle: 'Compete and climb the leaderboard',
    battlesScheduled: 'Scheduled',
    battlesLive: 'Live',
    battlesEnded: 'Ended',
    battlesLeaderboard: 'Leaderboard',
    battlesJoin: 'Join',
    battlesWatch: 'Watch',
    battlesParticipants: 'participants',
    battlesWinner: 'Winner',
    battlesWins: 'Wins',
    battlesStartsIn: 'Starts in',
    
    // Safety
    safetyTitle: 'Safety Center',
    safetySubtitle: 'Report content and manage blocked users',
    safetyReport: 'Report',
    safetyBlocked: 'Blocked',
    safetyReportType: 'What are you reporting?',
    safetyReportThreats: 'Threats or Violence',
    safetyReportHate: 'Hate Speech',
    safetyReportDoxxing: 'Personal Information (Doxxing)',
    safetyReportSexual: 'Inappropriate Sexual Content',
    safetyReportSpam: 'Spam or Scam',
    safetyReportOther: 'Other',
    safetyDetails: 'Additional Details',
    safetyDetailsPlaceholder: 'Please provide more context...',
    safetySubmit: 'Submit Report',
    safetyNoBlocked: 'No blocked users',
    safetyUnblock: 'Unblock',
    safetySuccess: 'Your report has been submitted. Our team will review it shortly.',
    safetyImportant: 'Important: This platform has zero tolerance for threats, doxxing, hate speech, and sexual content involving minors.',
    
    // Settings
    settingsTitle: 'Settings',
    settingsSubtitle: 'Manage your preferences',
    settingsLanguage: 'Language & Region',
    settingsUILanguage: 'Interface Language',
    settingsNotifications: 'Notifications',
    settingsEmailNotif: 'Email Notifications',
    settingsPushNotif: 'Push Notifications',
    settingsBattleReminders: 'Battle Reminders',
    settingsNewFollowers: 'New Followers',
    settingsPrivacy: 'Privacy & Safety',
    settingsAllowMessages: 'Allow Direct Messages',
    settingsShowActivity: 'Show Activity Status',
    settingsAccount: 'Account',
    settingsAccountType: 'Account Type',
    settingsFree: 'Free',
    settingsPremium: 'Premium',
    
    // Plans
    plansTitle: 'Subscription Plans',
    plansSubtitle: 'Choose the plan that fits your creative needs',
    plansFree: 'Free',
    plansPremium: 'Premium',
    plansPro: 'Pro',
    plansCurrent: 'Current',
    plansSubscribe: 'Subscribe',
    plansPerMonth: '/month',
    plansPopular: 'Most Popular',
    
    // Common
    nowPlaying: 'Preview Track',
    notPlaying: 'Not playing'
  },
  HE: {
    // Navigation
    logo: 'iRap',
    subscribe: 'מינוי',
    home: 'בית',
    create: 'יצירה',
    explore: 'גלו',
    presets: 'תבניות',
    playlists: 'פלייליסטים',
    groups: 'קבוצות',
    battles: 'קרבות',
    safety: 'בטיחות',
    settings: 'הגדרות',
    
    // Consent Gate
    consentTitle: 'ברוכים הבאים ל-iRap',
    consentBody: 'לפני שתתחילו ליצור תוכן מדהים, אנא עיינו ואשרו את התנאים וההגבלות שלנו. פלטפורמה זו מיועדת למשתמשים בגילאי 12-16 וכוללת תוכן שנוצר על ידי AI עם שפה מפורשת.',
    consentLabel: 'קראנו ואנחנו מסכימים לתנאי השירות ולמדיניות הפרטיות',
    consentApprove: 'אישור והמשך',
    consentSubscribe: 'צפו בתוכניות מנוי',
    
    // Home
    homeHero: 'צרו את הדיס הבא שלכם',
    homeHeroSub: 'יצירת ראפ מבוססת AI לדור הבא של אמנים',
    homeCtaPrimary: 'התחילו ליצור',
    homeCtaSecondary: 'גלו רצועות',
    homeFeatureCreate: 'צרו דיס',
    homeFeatureCreateDesc: 'צרו רצועות מבוססות AI תוך שניות',
    homeFeatureExplore: 'גלו',
    homeFeatureExploreDesc: 'גלו תוכן טרנדי מהקהילה',
    homeFeatureBattles: 'הצטרפו לקרבות',
    homeFeatureBattlesDesc: 'התחרו וטפסו בדירוג',
    homeTrending: 'צלילים טרנדיים',
    homePlays: 'השמעות',
    homeNewRelease: 'חדש',
    
    // Create
    createTitle: 'סטודיו',
    createSubtitle: 'צרו את הרצועה הבאה שלכם',
    createTextInput: 'נושא או מילים',
    createTextPlaceholder: 'כתבו על משהו או מישהו...',
    createStyle: 'סגנון',
    createLanguage: 'שפה',
    createBeat: 'ביט',
    createDissHeat: 'רמת חום',
    createHeatLow: 'מתון',
    createHeatHigh: 'קיצוני',
    createGenerate: 'צרו רצועה',
    createComingSoon: 'אינטגרציה עם בקאנד בקרוב',
    createStyleAggressive: 'אגרסיבי',
    createStyleMelodic: 'מלודי',
    createStyleFastFlow: 'זרימה מהירה',
    createStyleTrap: 'טראפ',
    createStyleBoomBap: 'בום באפ',
    createStyleDrill: 'דריל',
    createLangEnglish: 'אנגלית',
    createLangHebrew: 'עברית',
    createLangMixed: 'מעורב',
    createBeat1: 'דופק עירוני',
    createBeat2: 'סמטה אפלה',
    createBeat3: 'נסיעה חלקה',
    createBeat4: 'מצב קרב',
    createBeat5: 'נסיעת לילה',
    createPreview: 'תצוגה מקדימה',
    createPreviewDesc: 'הרצועה שנוצרה תופיע כאן',
    
    // Explore
    exploreTitle: 'גלו',
    exploreSubtitle: 'גלו מה טרנדי',
    exploreSearch: 'חפשו רצועות, אמנים...',
    exploreSortBy: 'מיינו לפי',
    exploreSortTrending: 'טרנדים',
    exploreSortNew: 'חדש',
    exploreSortMostPlayed: 'הכי מושמע',
    exploreSortMostLiked: 'הכי אהוב',
    exploreFilters: 'סינונים',
    exploreAll: 'הכל',
    explorePlays: 'השמעות',
    exploreLikes: 'לייקים',
    
    // Presets
    presetsTitle: 'ספריית תבניות',
    presetsSubtitle: 'שורות, קטעים וסלנג מוכנים מראש',
    presetsSearch: 'חפשו תבניות...',
    presetsPunchlines: 'שורות מנצחות',
    presetsHooks: 'קטעים',
    presetsSlang: 'סלנג',
    presetsOpeners: 'פתיחות',
    presetsInsert: 'הכניסו',
    presetsUses: 'שימושים',
    presetsPopular: 'פופולרי',
    
    // Playlists
    playlistsTitle: 'פלייליסטים',
    playlistsSubtitle: 'ארגנו את הרצועות המועדפות שלכם',
    playlistsCreate: 'צרו פלייליסט',
    playlistsTracks: 'רצועות',
    
    // Groups
    groupsTitle: 'קבוצות',
    groupsSubtitle: 'התחברו לקהילה',
    groupsPublic: 'ציבורי',
    groupsPrivate: 'פרטי',
    groupsCreate: 'צרו קבוצה',
    groupsJoin: 'הצטרפו',
    groupsMembers: 'חברים',
    groupsAdmin: 'מנהל',
    
    // Battles
    battlesTitle: 'קרבות',
    battlesSubtitle: 'התחרו וטפסו בדירוג',
    battlesScheduled: 'מתוכנן',
    battlesLive: 'חי',
    battlesEnded: 'הסתיים',
    battlesLeaderboard: 'לוח מובילים',
    battlesJoin: 'הצטרפו',
    battlesWatch: 'צפו',
    battlesParticipants: 'משתתפים',
    battlesWinner: 'מנצח',
    battlesWins: 'ניצחונות',
    battlesStartsIn: 'מתחיל בעוד',
    
    // Safety
    safetyTitle: 'מרכז בטיחות',
    safetySubtitle: 'דווחו על תוכן וניהול משתמשים חסומים',
    safetyReport: 'דיווח',
    safetyBlocked: 'חסומים',
    safetyReportType: 'על מה אתם מדווחים?',
    safetyReportThreats: 'איומים או אלימות',
    safetyReportHate: 'דברי שנאה',
    safetyReportDoxxing: 'מידע אישי (דוקסינג)',
    safetyReportSexual: 'תוכן מיני לא הולם',
    safetyReportSpam: 'ספאם או הונאה',
    safetyReportOther: 'אחר',
    safetyDetails: 'פרטים נוספים',
    safetyDetailsPlaceholder: 'אנא ספקו הקשר נוסף...',
    safetySubmit: 'שלחו דיווח',
    safetyNoBlocked: 'אין משתמשים חסומים',
    safetyUnblock: 'בטלו חסימה',
    safetySuccess: 'הדיווח שלכם נשלח. הצוות שלנו יבדוק אותו בקרוב.',
    safetyImportant: 'חשוב: לפלטפורמה זו יש אפס סובלנות לאיומים, דוקסינג, דברי שנאה ותוכן מיני הכולל קטינים.',
    
    // Settings
    settingsTitle: 'הגדרות',
    settingsSubtitle: 'נהלו את ההעדפות שלכם',
    settingsLanguage: 'שפה ואזור',
    settingsUILanguage: 'שפת ממשק',
    settingsNotifications: 'התראות',
    settingsEmailNotif: 'התראות במייל',
    settingsPushNotif: 'התראות דחיפה',
    settingsBattleReminders: 'תזכורות קרב',
    settingsNewFollowers: 'עוקבים חדשים',
    settingsPrivacy: 'פרטיות ובטיחות',
    settingsAllowMessages: 'אפשרו הודעות ישירות',
    settingsShowActivity: 'הציגו סטטוס פעילות',
    settingsAccount: 'חשבון',
    settingsAccountType: 'סוג חשבון',
    settingsFree: 'חינם',
    settingsPremium: 'פרימיום',
    
    // Plans
    plansTitle: 'תוכניות מנוי',
    plansSubtitle: 'בחרו את התוכנית המתאימה לצרכים היצירתיים שלכם',
    plansFree: 'חינם',
    plansPremium: 'פרימיום',
    plansPro: 'מקצועי',
    plansCurrent: 'נוכחי',
    plansSubscribe: 'הירשמו',
    plansPerMonth: '/חודש',
    plansPopular: 'הכי פופולרי',
    
    // Common
    nowPlaying: 'תצוגה מקדימה',
    notPlaying: 'לא מנגן'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const savedLang = localStorage.getItem('uiLanguage') || 'EN';
    setLanguage(savedLang);
    updateDocumentLanguage(savedLang);
  }, []);

  const updateDocumentLanguage = (lang) => {
    document.documentElement.lang = lang === 'HE' ? 'he' : 'en';
    document.documentElement.dir = lang === 'HE' ? 'rtl' : 'ltr';
  };

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('uiLanguage', newLang);
    updateDocumentLanguage(newLang);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}