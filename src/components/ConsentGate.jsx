import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { base44 } from '@/api/base44Client';

const entryContent = {
  EN: {
    title: "Before You Enter iRap",
    bullets: [
      "I am above 12-16 years old",
      "This Platform can use hard and dirty language"
    ],
    checkbox: "I understand and agree to enter iRap",
    enter: "Enter iRap",
    leave: "Leave",
    accountText: "I have an account:",
    login: "Login here",
    noAccount: "I don't have an account:",
    register: "Register here",
    orGuest: "or continue as a guest"
  },
  HE: {
    title: "לפני שתכנסו ל-iRap",
    bullets: [
      "אני מעל גיל 12-16",
      "פלטפורמה זו יכולה להשתמש בשפה קשה ומלוכלכת"
    ],
    checkbox: "הבנתי ומסכים/ה להיכנס ל-iRap",
    enter: "כניסה ל-iRap",
    leave: "יציאה",
    accountText: "יש לי חשבון:",
    login: "התחברות כאן",
    noAccount: "אין לי חשבון:",
    register: "הרשמה כאן",
    orGuest: "או המשיכו כאורח"
  }
};

export default function ConsentGate() {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const content = entryContent[language] || entryContent.EN;

  useEffect(() => {
    const approved = localStorage.getItem('irap_entry_approved');
    const isLandingPage = location.pathname === '/' || location.pathname === '/Landing';
    const isPlansPage = location.pathname === '/Plans' || location.pathname === '/plans';
    
    if (approved !== 'true' && !isLandingPage && !isPlansPage) {
      setIsGateOpen(true);
      setIsChecked(false);
    } else {
      setIsGateOpen(false);
    }
  }, [location.pathname]);

  const handleApprove = () => {
    if (isChecked) {
      localStorage.setItem('irap_entry_approved', 'true');
      setIsGateOpen(false);
    }
  };

  const handleLeave = () => {
    navigate(createPageUrl('Landing'));
  };

  const handleLogin = () => {
    localStorage.setItem('irap_entry_approved', 'true');
    base44.auth.redirectToLogin(createPageUrl('Dashboard'));
  };

  const handleRegister = () => {
    localStorage.setItem('irap_entry_approved', 'true');
    base44.auth.redirectToLogin(createPageUrl('Dashboard'));
  };

  const handleGuest = () => {
    localStorage.setItem('irap_entry_approved', 'true');
    setIsGateOpen(false);
  };

  if (!isGateOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{ 
        background: 'rgba(11, 7, 18, 0.65)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        animation: 'fadeIn 200ms ease-out'
      }}
    >
      <div 
        className="max-w-lg w-full"
        style={{ 
          background: 'rgba(26, 15, 44, 0.75)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          padding: '40px',
          animation: 'scaleIn 300ms cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#F4F1FF] text-center mb-8">
          {content.title}
        </h2>

        {/* Bullet Points */}
        <div className={`space-y-3 mb-8 ${language === 'HE' ? 'text-right' : 'text-left'}`}>
          {content.bullets.map((bullet, i) => (
            <div key={i} className={`flex items-start gap-3 ${language === 'HE' ? 'flex-row-reverse' : ''}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#C77DFF] flex-shrink-0 mt-2"></div>
              <p className="text-[rgba(244,241,255,0.78)] leading-relaxed">
                {bullet}
              </p>
            </div>
          ))}
        </div>

        {/* Checkbox */}
        <label className={`flex items-center gap-3 cursor-pointer group mb-8 ${language === 'HE' ? 'flex-row-reverse' : ''}`}>
          <div className="relative flex items-center justify-center flex-shrink-0">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-5 h-5 rounded appearance-none cursor-pointer transition-all"
              style={{
                border: isChecked ? 'none' : '1.5px solid rgba(199, 125, 255, 0.4)',
                background: isChecked ? 'linear-gradient(135deg, #C77DFF 0%, #FF3D9A 100%)' : 'transparent'
              }}
            />
            {isChecked && (
              <CheckCircle2 className="absolute w-4 h-4 text-white pointer-events-none" />
            )}
          </div>
          <span className={`text-[rgba(244,241,255,0.72)] text-sm group-hover:text-[#F4F1FF] transition-colors ${language === 'HE' ? 'text-right' : 'text-left'}`}>
            {content.checkbox}
          </span>
        </label>

        {/* Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleApprove}
            disabled={!isChecked}
            className="flex-1 py-3.5 rounded-full font-semibold transition-all text-white"
            style={{
              background: isChecked 
                ? 'linear-gradient(135deg, #C77DFF 0%, #FF3D9A 100%)'
                : 'rgba(244, 241, 255, 0.1)',
              boxShadow: isChecked 
                ? '0 8px 24px rgba(199, 125, 255, 0.3)'
                : 'none',
              color: isChecked ? '#fff' : 'rgba(244, 241, 255, 0.32)',
              cursor: isChecked ? 'pointer' : 'not-allowed',
              opacity: isChecked ? 1 : 0.6
            }}
            onMouseEnter={(e) => {
              if (isChecked) {
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(199, 125, 255, 0.4)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (isChecked) {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(199, 125, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {content.enter}
          </button>
          <button
            onClick={handleLeave}
            className="flex-1 py-3.5 rounded-full font-medium transition-all"
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(255, 255, 255, 0.15)',
              color: 'rgba(244, 241, 255, 0.78)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.color = '#F4F1FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.color = 'rgba(244, 241, 255, 0.78)';
            }}
          >
            {content.leave}
          </button>
        </div>

        {/* Account Options */}
        <div className="text-center space-y-2">
          <p className="text-sm text-[rgba(244,241,255,0.65)]">
            {content.accountText}{' '}
            <button
              onClick={handleLogin}
              className="text-[#C77DFF] hover:text-[#D18FFF] transition-colors font-medium underline underline-offset-2"
            >
              {content.login}
            </button>
          </p>
          <p className="text-sm text-[rgba(244,241,255,0.65)]">
            {content.noAccount}{' '}
            <button
              onClick={handleRegister}
              className="text-[#C77DFF] hover:text-[#D18FFF] transition-colors font-medium underline underline-offset-2"
            >
              {content.register}
            </button>
            {' '}{content.orGuest}{' '}
            <button
              onClick={handleGuest}
              className="text-[#C77DFF] hover:text-[#D18FFF] transition-colors font-medium underline underline-offset-2"
            >
              {language === 'EN' ? 'here' : 'כאן'}
            </button>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}