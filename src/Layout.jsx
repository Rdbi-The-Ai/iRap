import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { 
  Home, PlusCircle, Compass, BookOpen, Music, Users, 
  Swords, Shield, Settings, Menu, X
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ConsentGate from './components/ConsentGate';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { ThemeProvider } from './components/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

// Landing routes - NO app shell
const LANDING_ROUTES = ['Landing', 'Home'];

// App routes - REQUIRES app shell with sidebar
const APP_ROUTES = ['Dashboard', 'Create', 'Explore', 'Presets', 'Playlists', 'Groups', 'Battles', 'Safety', 'Settings', 'MySongs'];

const navItems = [
  { name: 'home', icon: Home, path: 'Dashboard' },
  { name: 'create', icon: PlusCircle, path: 'Create' },
  { name: 'explore', icon: Compass, path: 'Explore' },
  { name: 'presets', icon: BookOpen, path: 'Presets' },
  { name: 'playlists', icon: Music, path: 'Playlists' },
  { name: 'groups', icon: Users, path: 'Groups' },
  { name: 'battles', icon: Swords, path: 'Battles' },
  { name: 'safety', icon: Shield, path: 'Safety' },
  { name: 'settings', icon: Settings, path: 'Settings' }
];

// App Shell Layout - ONLY for app routes
function AppShellLayout({ children, currentPageName }) {
  const { language, changeLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActivePath = (pageName) => {
    return currentPageName === pageName;
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bgBase)' }}>
      {/* Layout Container - Sidebar + Content */}
      <div className="flex">
        {/* Desktop Sidebar - Suno-Style Navigation */}
        <aside 
          className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 overflow-y-auto transition-all duration-300"
          style={{ 
            width: sidebarCollapsed ? '72px' : '240px',
            background: 'var(--glassPanelBg)',
            backdropFilter: 'var(--glassBackdrop)',
            WebkitBackdropFilter: 'var(--glassBackdrop)',
            borderRight: '1px solid var(--borderSubtle)'
          }}
        >
          {/* Logo + Sign In Section */}
          <div className="flex-shrink-0 pt-8 px-6 pb-6 border-b" style={{ borderColor: 'var(--borderSubtle)' }}>
            {!sidebarCollapsed ? (
              <>
                <Link to={createPageUrl('Dashboard')} className="block mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden" style={{ border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                    <img 
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6974a37cd4253c840929d02d/948240583_image2.png"
                      alt="iRap"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => base44.auth.redirectToLogin(createPageUrl('Dashboard'))}
                  className="w-full py-2 px-4 rounded-lg transition-colors"
                  style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    color: 'var(--textSecondary)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--borderSubtle)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--textPrimary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--textSecondary)'}
                >
                  {language === 'HE' ? 'התחברות' : 'Sign In'}
                </button>
              </>
            ) : (
              <Link to={createPageUrl('Dashboard')} className="flex justify-center">
                <div className="w-10 h-10 rounded-full overflow-hidden" style={{ border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6974a37cd4253c840929d02d/948240583_image2.png"
                    alt="iRap"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            )}
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 py-6 space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(item.path);
              return (
                <Link
                  key={item.name}
                  to={createPageUrl(item.path)}
                  className="flex items-center py-2.5 px-3 rounded-lg transition-all relative group"
                  title={sidebarCollapsed ? t(item.name) : ''}
                  style={{
                    color: active ? 'var(--accentOrchid)' : 'var(--textMuted)',
                    gap: '12px',
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--textSecondary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--textMuted)';
                    }
                  }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                  {!sidebarCollapsed && (
                    <span style={{ fontSize: '14px', fontWeight: 400 }}>
                      {t(item.name)}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section - More + Social */}
          <div className="flex-shrink-0 px-3 pb-6 space-y-4">
            {/* Collapse Toggle */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center py-2.5 px-3 rounded-lg transition-colors hover:bg-white/5"
              style={{
                color: 'var(--textMuted)',
                gap: '12px',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
              }}
              title={sidebarCollapsed ? (language === 'HE' ? 'הרחב' : 'Expand') : (language === 'HE' ? 'כווץ' : 'Collapse')}
            >
              <Menu className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
              {!sidebarCollapsed && (
                <span style={{ fontSize: '14px', fontWeight: 400 }}>
                  {language === 'HE' ? 'כווץ' : 'Collapse'}
                </span>
              )}
            </button>

            {/* Language Switch */}
            {!sidebarCollapsed && (
              <button
                onClick={() => changeLanguage(language === 'EN' ? 'HE' : 'EN')}
                className="w-full flex items-center py-2.5 px-3 rounded-lg transition-colors hover:bg-white/5"
                style={{
                  color: 'var(--textMuted)',
                  gap: '12px',
                  justifyContent: 'flex-start'
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 400 }}>
                  {language === 'EN' ? '🌐 עברית' : '🌐 English'}
                </span>
              </button>
            )}

            {/* Theme Toggle */}
            {!sidebarCollapsed && (
              <div className="px-3">
                <ThemeToggle />
              </div>
            )}

            {/* More Section - Collapsible */}
            {!sidebarCollapsed && (
              <div className="pt-4 space-y-1">
                <button
                  onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                  className="w-full flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5"
                  style={{ color: 'var(--textMuted)', fontSize: '13px', fontWeight: 400 }}
                >
                  <span>{language === 'HE' ? 'עוד' : 'More'}</span>
                </button>

                {moreMenuOpen && (
                  <div className="pl-2 space-y-1">
                    <a href="#" className="flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5" style={{ color: 'rgba(244,241,255,0.65)', fontSize: '13px', fontWeight: 400 }}>
                      {language === 'HE' ? 'הזמינו חברים' : 'Invite Friends'}
                    </a>
                    <a href="#" className="flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5" style={{ color: 'rgba(244,241,255,0.65)', fontSize: '13px', fontWeight: 400 }}>
                      {language === 'HE' ? 'הרוויחו נקודות' : 'Earn Credits'}
                    </a>
                    <a href="#" className="flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5" style={{ color: 'rgba(244,241,255,0.65)', fontSize: '13px', fontWeight: 400 }}>
                      {language === 'HE' ? 'מה חדש' : "What's New"}
                    </a>
                    <a href="#" className="flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5" style={{ color: 'rgba(244,241,255,0.65)', fontSize: '13px', fontWeight: 400 }}>
                      {language === 'HE' ? 'עזרה' : 'Help'}
                    </a>
                    <a href="#" className="flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5" style={{ color: 'rgba(244,241,255,0.65)', fontSize: '13px', fontWeight: 400 }}>
                      {language === 'HE' ? 'תנאי שירות' : 'Terms'}
                    </a>
                    <a href="#" className="flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5" style={{ color: 'rgba(244,241,255,0.65)', fontSize: '13px', fontWeight: 400 }}>
                      {language === 'HE' ? 'פרטיות' : 'Privacy'}
                    </a>
                    <a href="#" className="flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5" style={{ color: 'rgba(244,241,255,0.65)', fontSize: '13px', fontWeight: 400 }}>
                      {language === 'HE' ? 'אודות' : 'About'}
                    </a>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4 px-3 pt-2" style={{ opacity: 0.5 }}>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[rgba(244,241,255,0.65)] hover:text-[#F4F1FF] transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      </a>
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[rgba(244,241,255,0.65)] hover:text-[#F4F1FF] transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      </a>
                      <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[rgba(244,241,255,0.65)] hover:text-[#F4F1FF] transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
                </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
            <div 
              className={`absolute top-0 ${language === 'HE' ? 'right-0' : 'left-0'} w-72 h-full overflow-y-auto flex flex-col`}
              style={{
                background: 'var(--glassPanelElevatedBg)',
                backdropFilter: 'var(--glassBackdrop)',
                WebkitBackdropFilter: 'var(--glassBackdrop)',
                borderRight: language === 'HE' ? 'none' : '1px solid var(--borderMedium)',
                borderLeft: language === 'HE' ? '1px solid var(--borderMedium)' : 'none'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Logo + Sign In */}
              <div className="flex-shrink-0 p-6 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                <Link to={createPageUrl('Dashboard')} onClick={() => setMobileMenuOpen(false)} className="block mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden" style={{ border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                    <img 
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6974a37cd4253c840929d02d/948240583_image2.png"
                      alt="iRap"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => base44.auth.redirectToLogin(createPageUrl('Dashboard'))}
                  className="w-full py-2 px-4 rounded-lg transition-colors"
                  style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    color: 'var(--textSecondary)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--borderSubtle)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--textPrimary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--textSecondary)'}
                >
                  {language === 'HE' ? 'התחברות' : 'Sign In'}
                </button>
              </div>

              {/* Main Nav */}
              <nav className="flex-1 p-6 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActivePath(item.path);
                  return (
                    <Link
                      key={item.name}
                      to={createPageUrl(item.path)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        language === 'HE' ? 'flex-row-reverse' : ''
                      }`}
                      style={{
                        color: active ? 'var(--accentOrchid)' : 'var(--textMuted)',
                        background: active ? 'rgba(199, 125, 255, 0.12)' : 'transparent'
                      }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                      <span style={{ fontSize: '14px', fontWeight: 400 }}>
                        {t(item.name)}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* More Section + Social */}
              <div className="flex-shrink-0 p-6 space-y-1 border-t" style={{ borderColor: 'var(--borderSubtle)' }}>
                <p className={`px-3 mb-2 ${language === 'HE' ? 'text-right' : ''}`} style={{ color: 'var(--textDisabled)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  {language === 'HE' ? 'עוד' : 'More'}
                </p>
                <button
                  onClick={() => changeLanguage(language === 'EN' ? 'HE' : 'EN')}
                  className={`flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5 w-full ${language === 'HE' ? 'flex-row-reverse' : ''}`}
                  style={{ color: 'var(--textMuted)', fontSize: '13px', fontWeight: 400 }}
                >
                  <span>{language === 'EN' ? '🌐 עברית' : '🌐 English'}</span>
                </button>
                <div className="px-3 pt-2">
                  <ThemeToggle />
                </div>
                <a href="#" className={`flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5 ${language === 'HE' ? 'flex-row-reverse' : ''}`} style={{ color: 'rgba(244,241,255,0.65)', fontSize: '13px', fontWeight: 400 }}>
                  {language === 'HE' ? 'הזמינו חברים' : 'Invite Friends'}
                </a>
                <a href="#" className={`flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5 ${language === 'HE' ? 'flex-row-reverse' : ''}`} style={{ color: 'rgba(244,241,255,0.65)', fontSize: '13px', fontWeight: 400 }}>
                  {language === 'HE' ? 'הרוויחו נקודות' : 'Earn Credits'}
                </a>
                <a href="#" className={`flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5 ${language === 'HE' ? 'flex-row-reverse' : ''}`} style={{ color: 'rgba(244,241,255,0.65)', fontSize: '13px', fontWeight: 400 }}>
                  {language === 'HE' ? 'מה חדש' : "What's New"}
                </a>
                <a href="#" className={`flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5 ${language === 'HE' ? 'flex-row-reverse' : ''}`} style={{ color: 'rgba(244,241,255,0.65)', fontSize: '13px', fontWeight: 400 }}>
                  {language === 'HE' ? 'עזרה' : 'Help'}
                </a>
                <a href="#" className={`flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5 ${language === 'HE' ? 'flex-row-reverse' : ''}`} style={{ color: 'rgba(244,241,255,0.65)', fontSize: '13px', fontWeight: 400 }}>
                  {language === 'HE' ? 'תנאי שירות' : 'Terms'}
                </a>
                <a href="#" className={`flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5 ${language === 'HE' ? 'flex-row-reverse' : ''}`} style={{ color: 'rgba(244,241,255,0.65)', fontSize: '13px', fontWeight: 400 }}>
                  {language === 'HE' ? 'פרטיות' : 'Privacy'}
                </a>
                <a href="#" className={`flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-white/5 ${language === 'HE' ? 'flex-row-reverse' : ''}`} style={{ color: 'rgba(244,241,255,0.65)', fontSize: '13px', fontWeight: 400 }}>
                  {language === 'HE' ? 'אודות' : 'About'}
                </a>

                {/* Social Icons */}
                <div className={`flex items-center gap-4 px-3 pt-3 ${language === 'HE' ? 'flex-row-reverse' : ''}`} style={{ opacity: 0.5 }}>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[rgba(244,241,255,0.65)] hover:text-[#F4F1FF] transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[rgba(244,241,255,0.65)] hover:text-[#F4F1FF] transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[rgba(244,241,255,0.65)] hover:text-[#F4F1FF] transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Responsive Margin */}
        <main 
          className="flex-1 min-h-screen pb-20 lg:pb-0 transition-all duration-300"
          style={{
            marginLeft: window.innerWidth >= 1024 ? (sidebarCollapsed ? '72px' : '240px') : '0'
          }}
        >
          {children}
        </main>
      </div>

      {/* Mobile Menu Toggle Button - Fixed Top Right */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-3 rounded-xl transition-colors"
        style={{
          background: 'var(--glassPanelElevatedBg)',
          backdropFilter: 'var(--glassBackdrop)',
          WebkitBackdropFilter: 'var(--glassBackdrop)',
          border: '1px solid var(--borderMedium)',
          color: 'var(--textMuted)'
        }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
      </button>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass-panel-elevated z-40" style={{ borderTop: '1px solid var(--borderSubtle)' }}>
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = isActivePath(item.path);
            return (
              <Link
                key={item.name}
                to={createPageUrl(item.path)}
                style={{
                  color: active ? 'var(--accentOrchid)' : 'var(--textMuted)'
                }}
                className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{t(item.name)}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <ConsentGate />
    </div>
  );
}

// Landing Layout - Clean, no app shell
function LandingLayout({ children }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}

// Root Layout - Routes to correct layout based on page
export default function Layout({ children, currentPageName }) {
  // HARD SPLIT: Landing routes get ZERO app shell
  if (LANDING_ROUTES.includes(currentPageName)) {
    return (
      <ThemeProvider>
        <LandingLayout>{children}</LandingLayout>
      </ThemeProvider>
    );
  }

  // App routes get full app shell with sidebar
  if (APP_ROUTES.includes(currentPageName)) {
    return (
      <ThemeProvider>
        <LanguageProvider>
          <AppShellLayout children={children} currentPageName={currentPageName} />
        </LanguageProvider>
      </ThemeProvider>
    );
  }

  // Fallback for any other routes - no app shell
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}