import React, { createContext, useContext, useState, useEffect } from 'react';

const themes = {
  dark: {
    // Backgrounds & Surfaces
    bgBase: '#0B0712',
    bgSurface: '#130A21',
    bgSurfaceElevated: '#1A0F2C',
    bgGlass: 'rgba(19, 10, 33, 0.72)',
    
    // Text
    textPrimary: '#F4F1FF',
    textSecondary: 'rgba(244, 241, 255, 0.72)',
    textMuted: 'rgba(244, 241, 255, 0.52)',
    textDisabled: 'rgba(244, 241, 255, 0.32)',
    
    // Borders
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
    borderMedium: 'rgba(255, 255, 255, 0.12)',
    
    // Accents (same hues across themes)
    accentOrchid: '#C77DFF',
    accentMagenta: '#FF3D9A',
    accentCyan: '#4DE8FF',
    
    // Status
    success: '#28D17C',
    warning: '#FFB020',
    danger: '#FF4D4D',
    
    // Glass Effects
    glassPanelBg: 'rgba(19, 10, 33, 0.72)',
    glassPanelElevatedBg: 'rgba(26, 15, 44, 0.85)',
    glassBackdrop: 'blur(24px)',
    
    // Shadows & Glow
    shadowSubtle: '0 2px 16px rgba(199, 125, 255, 0.15)',
    shadowPrimary: '0 4px 24px rgba(199, 125, 255, 0.25), 0 8px 48px rgba(255, 61, 154, 0.2)',
    
    // Gradients
    gradientPrimary: 'linear-gradient(135deg, #C77DFF 0%, #FF3D9A 55%, #4DE8FF 120%)',
    gradientPrimaryHover: 'linear-gradient(135deg, #D18FFF 0%, #FF4DAB 55%, #5EF2FF 120%)',
  },
  
  light: {
    // Backgrounds & Surfaces
    bgBase: '#F8F7FA',
    bgSurface: '#FFFFFF',
    bgSurfaceElevated: '#FFFFFF',
    bgGlass: 'rgba(255, 255, 255, 0.85)',
    
    // Text
    textPrimary: '#1A0F2C',
    textSecondary: 'rgba(26, 15, 44, 0.78)',
    textMuted: 'rgba(26, 15, 44, 0.52)',
    textDisabled: 'rgba(26, 15, 44, 0.32)',
    
    // Borders
    borderSubtle: 'rgba(26, 15, 44, 0.08)',
    borderMedium: 'rgba(26, 15, 44, 0.12)',
    
    // Accents (same hues, adjusted luminance)
    accentOrchid: '#9D4DCC',
    accentMagenta: '#E01A7C',
    accentCyan: '#0BB8D4',
    
    // Status
    success: '#1FA862',
    warning: '#E09000',
    danger: '#DC2626',
    
    // Glass Effects
    glassPanelBg: 'rgba(255, 255, 255, 0.85)',
    glassPanelElevatedBg: 'rgba(255, 255, 255, 0.95)',
    glassBackdrop: 'blur(24px)',
    
    // Shadows & Elevation
    shadowSubtle: '0 2px 8px rgba(26, 15, 44, 0.06)',
    shadowPrimary: '0 4px 16px rgba(26, 15, 44, 0.12), 0 8px 32px rgba(26, 15, 44, 0.08)',
    
    // Gradients
    gradientPrimary: 'linear-gradient(135deg, #9D4DCC 0%, #E01A7C 55%, #0BB8D4 120%)',
    gradientPrimaryHover: 'linear-gradient(135deg, #B05EDD 0%, #F02B8D 55%, #1CC9E5 120%)',
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('irap_theme') || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeName) => {
    const root = document.documentElement;
    const tokens = themes[themeName];
    
    // Apply CSS variables
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Set data attribute for CSS targeting
    root.setAttribute('data-theme', themeName);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('irap_theme', newTheme);
    applyTheme(newTheme);
  };

  const setThemeMode = (mode) => {
    setTheme(mode);
    localStorage.setItem('irap_theme', mode);
    applyTheme(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeMode, tokens: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}