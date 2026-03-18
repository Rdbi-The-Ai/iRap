import React from 'react';
import { Globe } from 'lucide-react';

export default function LanguageToggle({ language, onChange }) {
  return (
    <div className="flex items-center gap-1 glass-panel rounded-full p-1">
      <button
        onClick={() => onChange('EN')}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
          language === 'EN'
            ? 'glass-panel-elevated text-[#F4F1FF]'
            : 'text-[rgba(244,241,255,0.52)] hover:text-[rgba(244,241,255,0.72)]'
        }`}
      >
        <Globe className="w-3.5 h-3.5" />
        EN
      </button>
      <button
        onClick={() => onChange('HE')}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
          language === 'HE'
            ? 'glass-panel-elevated text-[#F4F1FF]'
            : 'text-[rgba(244,241,255,0.52)] hover:text-[rgba(244,241,255,0.72)]'
        }`}
      >
        <Globe className="w-3.5 h-3.5" />
        HE
      </button>
    </div>
  );
}