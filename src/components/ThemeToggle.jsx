import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-white/5"
      style={{
        color: 'var(--textSecondary)',
        border: '1px solid var(--borderSubtle)'
      }}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-xs font-medium">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-xs font-medium">Dark</span>
        </>
      )}
    </button>
  );
}