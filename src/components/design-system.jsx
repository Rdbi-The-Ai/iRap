/**
 * iRap Design System — Single Source of Truth
 * 
 * This design system applies to:
 * - Landing Page
 * - App Shell
 * - Studio Wizard
 * - All future screens
 * 
 * DO NOT override these tokens locally unless adding to this system.
 */

export const designSystem = {
  // ============================================
  // COLOR SYSTEM
  // ============================================
  colors: {
    brand: {
      primary: '#C77DFF',      // Orchid - main accent
      secondary: '#FF3D9A',    // Magenta - secondary accent
      tertiary: '#4DE8FF',     // Cyan - highlights
      success: '#28D17C',      // Green - success states
      warning: '#FFB020',      // Amber - warnings
      error: '#FF4D4D',        // Red - errors
    },
    
    surfaces: {
      appBackground: '#0B0712',                    // Deep eggplant - app base
      primary: 'rgba(19, 10, 33, 0.72)',          // Glass panel - main work area
      secondary: 'rgba(26, 15, 44, 0.5)',         // Secondary panels
      elevated: 'rgba(26, 15, 44, 0.85)',         // Cards, modals, overlays
      elevatedHover: 'rgba(26, 15, 44, 0.95)',    // Hover state
    },
    
    text: {
      primary: '#F4F1FF',                         // White - main text
      secondary: 'rgba(244, 241, 255, 0.72)',     // 72% - secondary text
      muted: 'rgba(244, 241, 255, 0.52)',         // 52% - hints, placeholders
      disabled: 'rgba(244, 241, 255, 0.32)',      // 32% - disabled states
      ultraMuted: 'rgba(244, 241, 255, 0.20)',    // 20% - ultra subtle
    },
    
    borders: {
      subtle: 'rgba(255, 255, 255, 0.08)',        // Subtle dividers
      medium: 'rgba(255, 255, 255, 0.12)',        // Medium emphasis
      strong: 'rgba(255, 255, 255, 0.18)',        // Strong separation
      accent: 'rgba(199, 125, 255, 0.3)',         // Accent borders
    },
  },

  // ============================================
  // TYPOGRAPHY
  // ============================================
  typography: {
    fontFamily: {
      base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      mono: "'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace",
    },
    
    scale: {
      hero: { size: '3rem', weight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' },      // 48px
      h1: { size: '2.5rem', weight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' },      // 40px
      h2: { size: '2rem', weight: 600, lineHeight: 1.25, letterSpacing: '-0.01em' },       // 32px
      h3: { size: '1.5rem', weight: 600, lineHeight: 1.3, letterSpacing: '0' },            // 24px
      h4: { size: '1.25rem', weight: 600, lineHeight: 1.4, letterSpacing: '0' },           // 20px
      body: { size: '1rem', weight: 400, lineHeight: 1.5, letterSpacing: '0' },            // 16px
      bodySmall: { size: '0.875rem', weight: 400, lineHeight: 1.5, letterSpacing: '0' },   // 14px
      caption: { size: '0.75rem', weight: 400, lineHeight: 1.5, letterSpacing: '0.01em' }, // 12px
      label: { size: '0.875rem', weight: 500, lineHeight: 1.4, letterSpacing: '0.01em' },  // 14px
      button: { size: '0.875rem', weight: 500, lineHeight: 1, letterSpacing: '0' },        // 14px
    },
  },

  // ============================================
  // BUTTONS
  // ============================================
  buttons: {
    primary: {
      background: 'linear-gradient(135deg, #C77DFF 0%, #FF3D9A 55%, #4DE8FF 120%)',
      backgroundHover: 'linear-gradient(135deg, #D18FFF 0%, #FF4DAB 55%, #5EF2FF 120%)',
      text: '#FFFFFF',
      shadow: '0 4px 24px rgba(199, 125, 255, 0.25), 0 8px 48px rgba(255, 61, 154, 0.2)',
      shadowHover: '0 6px 32px rgba(199, 125, 255, 0.35), 0 12px 64px rgba(255, 61, 154, 0.3)',
      borderRadius: '0.75rem',  // 12px
      padding: '0.75rem 1.5rem', // 12px 24px
    },
    
    secondary: {
      background: 'rgba(255, 255, 255, 0.05)',
      backgroundHover: 'rgba(255, 255, 255, 0.08)',
      text: 'rgba(244, 241, 255, 0.78)',
      textHover: '#F4F1FF',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '0.75rem',
      padding: '0.75rem 1.5rem',
    },
    
    ghost: {
      background: 'transparent',
      backgroundHover: 'rgba(255, 255, 255, 0.05)',
      text: 'rgba(244, 241, 255, 0.65)',
      textHover: '#F4F1FF',
      borderRadius: '0.75rem',
      padding: '0.75rem 1.5rem',
    },
    
    disabled: {
      background: 'rgba(255, 255, 255, 0.03)',
      text: 'rgba(244, 241, 255, 0.32)',
      cursor: 'not-allowed',
      borderRadius: '0.75rem',
      padding: '0.75rem 1.5rem',
    },
    
    danger: {
      background: '#FF4D4D',
      backgroundHover: '#FF6666',
      text: '#FFFFFF',
      borderRadius: '0.75rem',
      padding: '0.75rem 1.5rem',
    },
  },

  // ============================================
  // INPUTS & FORMS
  // ============================================
  inputs: {
    base: {
      background: '#0B0712',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderFocus: '1px solid #C77DFF',
      borderRadius: '0.75rem',  // 12px
      padding: '0.75rem 1rem',  // 12px 16px
      text: '#F4F1FF',
      placeholder: 'rgba(244, 241, 255, 0.32)',
      focusGlow: '0 0 0 3px rgba(199, 125, 255, 0.15)',
    },
    
    textarea: {
      background: '#0B0712',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderFocus: '1px solid #C77DFF',
      borderRadius: '0.75rem',
      padding: '0.75rem 1rem',
      text: '#F4F1FF',
      placeholder: 'rgba(244, 241, 255, 0.32)',
      minHeight: '120px',
      focusGlow: '0 0 0 3px rgba(199, 125, 255, 0.15)',
    },
    
    search: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderFocus: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '999px',  // pill shape
      padding: '0.625rem 1rem',
      text: '#F4F1FF',
      placeholder: 'rgba(244, 241, 255, 0.45)',
    },
    
    error: {
      border: '1px solid #FF4D4D',
      focusGlow: '0 0 0 3px rgba(255, 77, 77, 0.15)',
      helperText: '#FF4D4D',
    },
  },

  // ============================================
  // CARDS & PANELS
  // ============================================
  cards: {
    base: {
      background: 'rgba(19, 10, 33, 0.72)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '1rem',  // 16px
      padding: '1.25rem',    // 20px
      shadow: 'none',
    },
    
    elevated: {
      background: 'rgba(26, 15, 44, 0.85)',
      backdropFilter: 'blur(32px)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '1rem',
      padding: '1.25rem',
      shadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
    },
    
    hover: {
      background: 'rgba(26, 15, 44, 0.95)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      transform: 'translateY(-2px)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    },
  },

  // ============================================
  // SPACING SYSTEM
  // ============================================
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
  },

  // ============================================
  // DIVIDERS & SEPARATION
  // ============================================
  dividers: {
    subtle: {
      color: 'rgba(255, 255, 255, 0.08)',
      thickness: '1px',
    },
    medium: {
      color: 'rgba(255, 255, 255, 0.12)',
      thickness: '1px',
    },
    strong: {
      color: 'rgba(255, 255, 255, 0.18)',
      thickness: '1px',
    },
  },

  // ============================================
  // FEEDBACK & STATES
  // ============================================
  states: {
    loading: {
      background: 'rgba(199, 125, 255, 0.15)',
      text: '#C77DFF',
      spinner: '#C77DFF',
    },
    
    empty: {
      icon: 'rgba(244, 241, 255, 0.32)',
      text: 'rgba(244, 241, 255, 0.45)',
      helper: 'rgba(244, 241, 255, 0.32)',
    },
    
    success: {
      background: 'rgba(40, 209, 124, 0.15)',
      border: '1px solid rgba(40, 209, 124, 0.3)',
      text: '#28D17C',
      icon: '#28D17C',
    },
    
    error: {
      background: 'rgba(255, 77, 77, 0.15)',
      border: '1px solid rgba(255, 77, 77, 0.3)',
      text: '#FF4D4D',
      icon: '#FF4D4D',
    },
    
    warning: {
      background: 'rgba(255, 176, 32, 0.15)',
      border: '1px solid rgba(255, 176, 32, 0.3)',
      text: '#FFB020',
      icon: '#FFB020',
    },
    
    disabled: {
      background: 'rgba(255, 255, 255, 0.03)',
      text: 'rgba(244, 241, 255, 0.32)',
      cursor: 'not-allowed',
    },
    
    locked: {
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      text: 'rgba(244, 241, 255, 0.32)',
      icon: 'rgba(244, 241, 255, 0.20)',
    },
  },

  // ============================================
  // TRANSITIONS & ANIMATIONS
  // ============================================
  transitions: {
    fast: '150ms ease-in-out',
    base: '250ms ease-in-out',
    slow: '350ms ease-in-out',
    smooth: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // ============================================
  // BREAKPOINTS
  // ============================================
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // ============================================
  // RADIUS SCALE
  // ============================================
  radius: {
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    pill: '999px',
    full: '50%',
  },

  // ============================================
  // SHADOWS & GLOWS
  // ============================================
  effects: {
    glowPrimary: '0 4px 24px rgba(199, 125, 255, 0.25), 0 8px 48px rgba(255, 61, 154, 0.2)',
    glowSubtle: '0 2px 16px rgba(199, 125, 255, 0.15)',
    shadowSm: '0 2px 8px rgba(0, 0, 0, 0.1)',
    shadowMd: '0 4px 16px rgba(0, 0, 0, 0.15)',
    shadowLg: '0 8px 32px rgba(0, 0, 0, 0.2)',
    shadowXl: '0 12px 48px rgba(0, 0, 0, 0.3)',
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get a design token value safely
 */
export function getToken(path) {
  const keys = path.split('.');
  let value = designSystem;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      console.warn(`Design token "${path}" not found`);
      return undefined;
    }
  }
  
  return value;
}

/**
 * Apply responsive breakpoint
 */
export function atBreakpoint(breakpoint) {
  const bp = designSystem.breakpoints[breakpoint];
  return bp ? `@media (min-width: ${bp})` : '';
}

export default designSystem;