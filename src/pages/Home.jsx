import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { LanguageProvider, useLanguage } from '../components/LanguageContext';
import SparkleBackground from '../components/SparkleBackground';
import { GlassButton } from '../components/GlassButton';
import { tokens } from '../components/tokens';
import { 
  Sparkles, Music, Users, Shield, Trophy, Mic2, 
  Zap, ArrowRight, Globe, CheckCircle, Headphones, Radio,
  ChevronLeft, ChevronRight
} from 'lucide-react';

function LandingContent() {
  const { language, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const galleryRef = React.useRef(null);

  const handleEnterApp = () => {
    navigate(createPageUrl('Dashboard'));
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = 240; // card width + gap
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0712]">
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 border-b" 
        style={{ 
          background: 'rgba(20, 10, 35, 0.45)',
          backdropFilter: 'blur(16px) saturate(140%)',
          WebkitBackdropFilter: 'blur(16px) saturate(140%)',
          borderColor: 'rgba(255,255,255,0.06)'
        }}
      >
        <div className="container mx-auto h-16 flex items-center justify-between" style={{ paddingLeft: language === 'HE' ? '24px' : '24px', paddingRight: language === 'HE' ? '24px' : '24px' }}>
          {/* Logo Avatar */}
          <div className={`flex-shrink-0 ${language === 'HE' ? 'order-2' : 'order-1'}`}>
            <div 
              className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 2px 12px rgba(199, 125, 255, 0.15)'
              }}
            >
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6974a37cd4253c840929d02d/948240583_image2.png"
                alt="iRap"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Language + Enter Group */}
          <div className={`flex items-center gap-2 ${language === 'HE' ? 'order-1' : 'order-2'}`}>
            <button
              onClick={() => changeLanguage(language === 'EN' ? 'HE' : 'EN')}
              className="glass-panel px-3 py-2 rounded-full text-xs font-bold text-[#F4F1FF] hover:glass-panel-elevated transition-all flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              {language === 'EN' ? 'HE' : 'EN'}
            </button>
            <button
              onClick={handleEnterApp}
              className="gradient-primary text-white px-6 py-2 rounded-full font-bold hover:gradient-primary-hover glow-subtle transition-all text-sm"
            >
              {language === 'HE' ? 'כניסה' : 'Enter'}
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6974a37cd4253c840929d02d/c939025c5_ron_ai_A_realistic_high-energy_hero_image_showing_a_FUN_diss_ra_8c6c68e9-a496-463e-a0e8-78d2e9202b69.png"
            alt="Hip-hop battle"
            className="w-full h-full object-cover"
            loading="eager"
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0712]/85 via-[#0B0712]/75 to-[#0B0712]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#C77DFF]/05 to-[#FF3D9A]/05"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 py-32">
          <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
            <h1 
              className="text-[42px] sm:text-5xl text-[#F4F1FF] mb-4 drop-shadow-2xl lg:whitespace-nowrap" 
              style={{ 
                fontSize: `clamp(${tokens.typography.h1.sizeMobile}, 5vw, ${tokens.typography.h1.size})`,
                fontWeight: tokens.typography.h1.weight,
                lineHeight: tokens.typography.h1.lineHeight,
                letterSpacing: tokens.typography.h1.letterSpacing,
              }}
            >
              {language === 'HE' ? (
                <>הפכו <span className="text-gradient">מילים</span> לכוח</>
              ) : (
                <>Turn <span className="text-gradient">Words</span> Into Power</>
              )}
            </h1>
            
            <p 
              className="mb-12" 
              style={{ 
                maxWidth: '680px',
                fontSize: `clamp(${tokens.typography.subheading.sizeMobile}, 2vw, ${tokens.typography.subheading.size})`,
                fontWeight: tokens.typography.subheading.weight,
                lineHeight: tokens.typography.subheading.lineHeight,
                color: tokens.colors.text.secondary,
              }}
            >
              {language === 'HE' 
                ? 'מגרש משחקים יצירתי בראפ שבו כולם הופכים דיס ראפ לביטחון, קצב וקול.'
                : 'A creative rap playground where kids turn diss rap into confidence, rhythm, and voice.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <GlassButton onClick={handleEnterApp} variant="primary" size="large">
                {language === 'HE' ? 'כניסה ל-IRAP' : 'ENTER IRAP'}
              </GlassButton>
              <GlassButton onClick={() => navigate(createPageUrl('Plans'))} variant="secondary" size="large">
                {language === 'HE' ? 'צפו בתוכניות' : 'VIEW PLANS'}
              </GlassButton>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-1 h-16 bg-gradient-to-b from-[#C77DFF] to-transparent rounded-full"></div>
        </div>
      </section>

      {/* BRAND STORY SECTION */}
      <section style={{ paddingTop: tokens.spacing.sectionPaddingY, paddingBottom: tokens.spacing.sectionPaddingY }} className="px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(199,125,255,0.05)] to-transparent"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className={`glass-panel px-4 py-2 rounded-full inline-block ${language === 'HE' ? 'float-right' : 'float-left'}`} style={{ marginBottom: tokens.spacing.titleToSubtitle }}>
                <span style={{ 
                  color: tokens.colors.accent.warning, 
                  fontWeight: tokens.typography.caption.weight,
                  fontSize: tokens.typography.caption.size,
                  letterSpacing: '0.03em',
                }}>
                  {language === 'HE' ? '💜 הסיפור שלנו' : '💜 Our Story'}
                </span>
              </div>
              <div className="clear-both"></div>
              <h2 
                className={`text-[#F4F1FF] ${language === 'HE' ? 'text-right' : 'text-left'}`} 
                style={{ 
                  fontSize: `clamp(${tokens.typography.h2.sizeMobile}, 4vw, ${tokens.typography.h2.size})`,
                  fontWeight: tokens.typography.h2.weight,
                  lineHeight: tokens.typography.h2.lineHeight,
                  letterSpacing: tokens.typography.h2.letterSpacing,
                  marginBottom: tokens.spacing.titleToSubtitle,
                }}
              >
                {language === 'HE' ? 'יותר מראפ. זה ביטוי.' : (
                  <>More Than Rap.<br />It's Expression.</>
                )}
              </h2>
              <div className="space-y-5 mb-8" style={{ 
                fontSize: tokens.typography.bodyLarge.size,
                fontWeight: tokens.typography.bodyLarge.weight,
                lineHeight: tokens.typography.bodyLarge.lineHeight,
                color: tokens.colors.text.muted,
              }}>
                <p>
                  {language === 'HE'
                    ? 'כולם רוצים לשחק. כולם רוצים להיות חכמים. כולם רוצים להרגיש חזקים עם מילים.'
                    : 'Kids want to play. Kids want to be clever. Kids want to feel powerful with words.'}
                </p>
                <p>
                  {language === 'HE'
                    ? 'iRap נותן להם מקום בטוח להביע, ליצור ולמצוא את הקול שלהם דרך האנרגיה של דיס ראפ.'
                    : 'iRap gives them a safe place to express, create, and find their voice through the energy of diss rap.'}
                </p>
              </div>
              <p style={{
                color: tokens.colors.accent.warning,
                fontWeight: tokens.typography.emphasis.weight,
                fontSize: tokens.typography.body.size,
                opacity: tokens.typography.emphasis.opacity,
              }}>
                {language === 'HE'
                  ? 'לא אלימות. לא בריונות. רק ביטחון, יצירתיות ומילים.'
                  : 'No violence. No bullying. Just confidence, creativity, and words.'}
              </p>
            </div>

            <div className="relative">
              <div className="glass-panel-elevated rounded-3xl p-2 glow-subtle overflow-hidden">
                <div className="rounded-2xl h-[500px] relative overflow-hidden group">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6974a37cd4253c840929d02d/43e06d673_soopgnl_A_silhouette_of_a_hip-hop_artist_performing_passionatel_5944a06f-551e-4ddb-927c-7235d3fdca94.png"
                    alt="Music creation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0712] via-transparent to-transparent opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN DO */}
      <section style={{ paddingTop: tokens.spacing.sectionPaddingY, paddingBottom: tokens.spacing.sectionPaddingY }} className="px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center" style={{ marginBottom: tokens.spacing.subtitleToContent }}>
            <h2 
              className="text-[#F4F1FF]" 
              style={{ 
                fontSize: `clamp(${tokens.typography.h2.sizeMobile}, 4vw, ${tokens.typography.h2.size})`,
                fontWeight: tokens.typography.h2.weight,
                lineHeight: tokens.typography.h2.lineHeight,
                letterSpacing: tokens.typography.h2.letterSpacing,
                marginBottom: tokens.spacing.titleToSubtitle,
              }}
            >
              {language === 'HE' ? 'מה אפשר לעשות' : 'What You Can Do'}
            </h2>
            <p style={{
              fontSize: tokens.typography.subheading.size,
              fontWeight: tokens.typography.subheading.weight,
              lineHeight: tokens.typography.subheading.lineHeight,
              color: tokens.colors.text.secondary,
              maxWidth: '768px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              {language === 'HE'
                ? 'צרו, שחקו, התחרו, וגדלו עם כל רצועה'
                : 'Create, play, compete, and grow with every track'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Music,
                title: language === 'HE' ? 'צרו דיס ראפ' : 'Create Diss Rap',
                desc: language === 'HE' ? 'AI עוזר לכם להפוך מילים למוזיקה' : 'AI helps you turn words into music',
                image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6974a37cd4253c840929d02d/ea9b5d403_341x192_2.png'
              },
              {
                icon: Users,
                title: language === 'HE' ? 'שחקו עם חברים' : 'Play With Friends',
                desc: language === 'HE' ? 'שתפו, הגיבו, התחרו יחד' : 'Share, react, compete together',
                image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6974a37cd4253c840929d02d/1d5eea112_341x192_4.png'
              },
              {
                icon: Trophy,
                title: language === 'HE' ? 'הצטרפו לקרבות' : 'Join Battles',
                desc: language === 'HE' ? 'הראו את הכישורים שלכם בזירה' : 'Show your skills in the arena',
                image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6974a37cd4253c840929d02d/0de88a5dd_341x192_3.png'
              },
              {
                icon: Zap,
                title: language === 'HE' ? 'בנו ביטחון' : 'Build Confidence',
                desc: language === 'HE' ? 'כל מילה עושה אתכם חזקים יותר' : 'Every word makes you stronger',
                image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6974a37cd4253c840929d02d/ed4c40383_341x192_1.png'
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="rounded-3xl overflow-hidden cursor-pointer group"
                  style={{
                    background: 'rgba(26, 15, 44, 0.85)',
                    backdropFilter: 'blur(32px)',
                    WebkitBackdropFilter: 'blur(32px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    transition: 'background-color 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
                    willChange: 'transform',
                    transform: 'translateZ(0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 15, 44, 0.92)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 15, 44, 0.85)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      style={{ 
                        transform: 'translateZ(0)',
                        filter: 'contrast(1.12) saturate(0.88) brightness(0.95)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0712] via-[#0B0712]/65 to-[rgba(199,125,255,0.08)] pointer-events-none"></div>
                    <div 
                      className="absolute inset-0 pointer-events-none" 
                      style={{
                        background: 'radial-gradient(circle at center, transparent 30%, rgba(11, 7, 18, 0.5) 100%)',
                        mixBlendMode: 'multiply'
                      }}
                    ></div>
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        transition: 'opacity 180ms ease'
                      }}
                    ></div>
                  </div>
                  <div className="px-6 pt-4 pb-5">
                    <h3 
                      className="text-[#F4F1FF] text-center" 
                      style={{ 
                        fontSize: `clamp(${tokens.typography.h3.sizeMobile}, 2.5vw, ${tokens.typography.h3.size})`,
                        fontWeight: tokens.typography.h3.weight,
                        lineHeight: tokens.typography.h3.lineHeight,
                        marginBottom: '8px',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="text-center" 
                      style={{ 
                        fontSize: tokens.typography.caption.size,
                        fontWeight: tokens.typography.caption.weight,
                        lineHeight: tokens.typography.caption.lineHeight,
                        color: tokens.colors.text.secondary,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ paddingTop: tokens.spacing.sectionPaddingY, paddingBottom: tokens.spacing.sectionPaddingY }} className="px-6 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center" style={{ marginBottom: tokens.spacing.subtitleToContent }}>
            <h2 
              className="text-[#F4F1FF]" 
              style={{ 
                fontSize: `clamp(${tokens.typography.h2.sizeMobile}, 4vw, ${tokens.typography.h2.size})`,
                fontWeight: tokens.typography.h2.weight,
                lineHeight: tokens.typography.h2.lineHeight,
                letterSpacing: tokens.typography.h2.letterSpacing,
                marginBottom: tokens.spacing.titleToSubtitle,
              }}
            >
              {language === 'HE' ? 'איך iRap מתעורר לחיים' : 'How iRap Comes to Life'}
            </h2>
            <p style={{
              fontSize: tokens.typography.subheading.size,
              fontWeight: tokens.typography.subheading.weight,
              lineHeight: tokens.typography.subheading.lineHeight,
              color: tokens.colors.text.muted,
              maxWidth: '640px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              {language === 'HE'
                ? 'iRap הופך את הרעיונות שלך לדיס ראפ בכמה צעדים קלים ויצירתיים — אין צורך במיומנות, רק דמיון.'
                : 'iRap turns your ideas into diss rap in a few easy, creative steps — no skills needed, just imagination.'}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-12 lg:gap-16">
            {[
              { 
                icon: Sparkles, 
                title: language === 'HE' ? 'התחילו עם רעיון' : 'Start with an Idea',
                text: language === 'HE' ? 'בחרו נושא, ווייב, או סתם משהו שעל הראש.' : 'Pick a topic, a vibe, or just something on your mind.'
              },
              { 
                icon: Headphones, 
                title: language === 'HE' ? 'בחרו את הצליל' : 'Choose the Sound',
                text: language === 'HE' ? 'בחרו ביט וסגנון בהשראת אנרגיית היפ-הופ האמיתית.' : 'Select a beat and style inspired by real hip-hop energy.'
              },
              { 
                icon: Mic2, 
                title: language === 'HE' ? 'צרו את הדיס שלכם' : 'Create Your Diss',
                text: language === 'HE' ? 'הפכו מילים לקצב וביטחון עם יצירה חכמה.' : 'Turn words into rhythm and confidence with smart generation.'
              },
              { 
                icon: Radio, 
                title: language === 'HE' ? 'שתפו את הרגע' : 'Share the Moment',
                text: language === 'HE' ? 'נגנו, תצחקו עם חברים, או תשמרו רק בשבילכם.' : 'Play it, laugh with friends, or keep it just for you.'
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <Icon 
                    style={{ 
                      width: tokens.icon.sizeLarge, 
                      height: tokens.icon.sizeLarge,
                      strokeWidth: tokens.icon.strokeWidth,
                      marginBottom: '16px',
                      color: tokens.colors.accent.orchid,
                    }} 
                  />
                  <h3 
                    className="text-[#F4F1FF]" 
                    style={{ 
                      fontSize: tokens.typography.subheading.size,
                      fontWeight: tokens.typography.emphasis.weight,
                      lineHeight: tokens.typography.subheading.lineHeight,
                      marginBottom: '8px',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: tokens.typography.caption.size,
                    fontWeight: tokens.typography.caption.weight,
                    lineHeight: tokens.typography.caption.lineHeight,
                    color: tokens.colors.text.muted,
                  }}>
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOCIAL FEED SECTION */}
      <section style={{ paddingTop: tokens.spacing.sectionPaddingY, paddingBottom: tokens.spacing.sectionPaddingY }} className="px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0712] via-[#1A0F2C] to-[#0B0712]"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-8">
            <h2 
              className="text-[#F4F1FF] mb-3" 
              style={{ 
                fontSize: `clamp(${tokens.typography.h2.sizeMobile}, 5vw, ${tokens.typography.h2.size})`,
                fontWeight: tokens.typography.h2.weight,
                lineHeight: tokens.typography.h2.lineHeight,
                letterSpacing: tokens.typography.h2.letterSpacing,
              }}
            >
              {language === 'HE' ? 'כך זה נשמע' : 'This Is How It Sounds'}
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-center mb-10" style={{
            fontSize: tokens.typography.caption.size,
            color: tokens.colors.text.muted,
            maxWidth: '640px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {language === 'HE' 
              ? 'רגעי דיס ראפ קצרים שנוצרו על ידי הקהילה'
              : 'Short diss rap moments created by the community'}
          </p>

          {/* Gallery Feed with Navigation */}
          <div className="relative max-w-7xl mx-auto mb-16">
            {/* Left Arrow */}
            <button
              onClick={() => scrollGallery('left')}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center transition-all"
              style={{
                background: 'rgba(26, 15, 44, 0.9)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(199, 125, 255, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(199, 125, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(26, 15, 44, 0.9)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scrollGallery('right')}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center transition-all"
              style={{
                background: 'rgba(26, 15, 44, 0.9)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(199, 125, 255, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(199, 125, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(26, 15, 44, 0.9)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Gallery Container */}
            <div 
              ref={galleryRef}
              className="flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory px-6" 
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollPaddingLeft: '24px',
                scrollPaddingRight: '24px',
              }}
            >
            {[
              { likes: '1.2K', duration: '15s', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80' },
              { likes: '890', duration: '12s', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&q=80' },
              { likes: '2.1K', duration: '18s', image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&q=80' },
              { likes: '1.5K', duration: '14s', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80' },
              { likes: '3.4K', duration: '16s', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80' },
              { likes: '920', duration: '13s', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80' },
              { likes: '1.8K', duration: '17s', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&q=80' }
            ].map((video, i) => (
              <div 
                key={i}
                className="rounded-3xl overflow-hidden cursor-pointer group relative flex-shrink-0 snap-center"
                style={{ 
                  width: '220px', 
                  height: '390px',
                  background: 'rgba(26, 15, 44, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 250ms ease',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(199, 125, 255, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(199, 125, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <img 
                  src={video.image}
                  alt="Diss rap moment"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  style={{ filter: 'brightness(0.9) contrast(1.1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0712] via-[#0B0712]/40 to-transparent"></div>

                {/* Centered Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }}
                  >
                    <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                </div>

                {/* Bottom Stats Overlay */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-white text-base font-bold drop-shadow-lg">
                    🔥 {video.likes}
                  </span>
                  <span className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-semibold">
                    {video.duration}
                  </span>
                </div>
              </div>
            ))}
            </div>

            {/* Edge Fade Gradients */}
            <div 
              className="hidden lg:block absolute left-0 top-0 bottom-8 w-32 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, #0B0712, transparent)',
              }}
            ></div>
            <div 
              className="hidden lg:block absolute right-0 top-0 bottom-8 w-32 pointer-events-none"
              style={{
                background: 'linear-gradient(to left, #0B0712, transparent)',
              }}
            ></div>
          </div>

          {/* Text Testimonials */}
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-12 px-4">
            {[
              {
                quote: language === 'HE' 
                  ? 'אף פעם לא חשבתי שכתיבת דיס ראפ תגרום לי להיות יותר בטוח בעצמי.'
                  : 'I never thought writing diss rap could actually make me more confident.',
                name: language === 'HE' ? 'מיכל, 14' : 'Alex, 14'
              },
              {
                quote: language === 'HE'
                  ? 'זה מרגיש כמו טיקטוק, אבל הרבה יותר חכם.'
                  : 'It feels like TikTok, but way smarter.',
                name: language === 'HE' ? 'יונתן, 15' : 'Jordan, 15'
              },
              {
                quote: language === 'HE'
                  ? 'הראיתי לחברים שלי והתחלנו סייפר שלם.'
                  : 'I showed my friends and we started a whole cypher.',
                name: language === 'HE' ? 'שרה, 13' : 'Sam, 13'
              }
            ].map((testimonial, i) => (
              <div key={i} className="glass-panel rounded-xl p-5">
                <p className="text-[rgba(244,241,255,0.78)] mb-3 leading-relaxed text-sm">
                  "{testimonial.quote}"
                </p>
                <p className="text-[rgba(244,241,255,0.45)] text-xs font-semibold">
                  — {testimonial.name}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <GlassButton 
              onClick={handleEnterApp} 
              variant="primary" 
              size="large"
            >
              {language === 'HE' ? 'צרו את הדיס שלכם' : 'Create Your Own Diss'}
              <ArrowRight style={{ width: tokens.icon.sizeMedium, height: tokens.icon.sizeMedium }} />
            </GlassButton>
          </div>
        </div>
      </section>

      {/* SAFETY & TRUST STRIP */}
      <section style={{ paddingTop: tokens.spacing.sectionPaddingY, paddingBottom: tokens.spacing.sectionPaddingY }} className="px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="glass-panel text-center" style={{ 
            borderRadius: tokens.card.radius, 
            padding: tokens.spacing.cardPadding,
          }}>
            <h3 
              className="text-[#F4F1FF]" 
              style={{ 
                fontSize: `clamp(${tokens.typography.h3.sizeMobile}, 3vw, ${tokens.typography.h3.size})`,
                fontWeight: tokens.typography.h3.weight,
                lineHeight: tokens.typography.h3.lineHeight,
                marginBottom: tokens.spacing.titleToSubtitle,
              }}
            >
              {language === 'HE' ? 'בטיחות קודם כל. תמיד.' : 'Safety First. Always.'}
            </h3>

            <p style={{
              fontSize: tokens.typography.body.size,
              fontWeight: tokens.typography.body.weight,
              lineHeight: tokens.typography.body.lineHeight,
              color: tokens.colors.text.muted,
              maxWidth: '640px',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: tokens.spacing.subtitleToContent,
            }}>
              {language === 'HE'
                ? 'iRap בנוי עם מודרציה קפדנית, כללי תוכן ברורים, ומערכות בטיחות המיועדות במיוחד לגילאי 12–16.'
                : 'iRap is built with strict moderation, clear content rules, and safety systems designed specifically for ages 12–16.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
              {[
                { icon: Shield, label: language === 'HE' ? 'מודרציה' : 'Moderation' },
                { icon: CheckCircle, label: language === 'HE' ? 'כללים ברורים' : 'Clear Rules' },
                { icon: Users, label: language === 'HE' ? '12-16' : 'Ages 12–16' },
                { icon: Zap, label: language === 'HE' ? 'דיווח מהיר' : 'Quick Reports' }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div 
                      className="rounded-xl flex items-center justify-center" 
                      style={{ 
                        width: '40px', 
                        height: '40px',
                        backgroundColor: 'rgba(40, 209, 124, 0.15)',
                        borderRadius: '12px',
                      }}
                    >
                      <Icon style={{ 
                        width: tokens.icon.sizeSmall, 
                        height: tokens.icon.sizeSmall,
                        color: tokens.colors.accent.success,
                      }} />
                    </div>
                    <span style={{
                      fontSize: tokens.typography.caption.size,
                      fontWeight: tokens.typography.emphasis.weight,
                      color: tokens.colors.text.muted,
                    }}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ paddingTop: tokens.spacing.sectionPaddingY, paddingBottom: tokens.spacing.sectionPaddingY }} className="px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1920&q=80"
            alt="Creative energy"
            className="w-full h-full object-cover opacity-15"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0712] via-[#0B0712]/80 to-[#0B0712]"></div>

          {/* Subtle luxury sparkle background */}
          <SparkleBackground />
        </div>

        <div className="container mx-auto max-w-6xl relative" style={{ zIndex: 1 }}>
          <div className="text-center" style={{ paddingTop: tokens.spacing.cardPadding, paddingBottom: tokens.spacing.cardPadding }}>
            <h2 
              className="text-[#F4F1FF]" 
              style={{ 
                fontSize: `clamp(${tokens.typography.h1.sizeMobile}, 6vw, ${tokens.typography.h1.size})`,
                fontWeight: tokens.typography.h1.weight,
                lineHeight: tokens.typography.h1.lineHeight,
                marginBottom: tokens.spacing.subtitleToContent,
              }}
            >
              {language === 'HE' ? (
                <>תנו לכולם <span style={{ fontWeight: 700 }}>לדבר</span>.<br />תנו לכולם <span style={{ fontWeight: 700 }}>לשחק</span>.<br />תנו לכולם <span style={{ fontWeight: 700 }}>לזרוח</span>.</>
              ) : (
                <>Let Them <span style={{ fontWeight: 700 }}>Speak</span>.<br />Let Them <span style={{ fontWeight: 700 }}>Play</span>.<br />Let Them <span style={{ fontWeight: 700 }}>Shine</span>.</>
              )}
            </h2>

            <button
              onClick={handleEnterApp}
              className="group inline-flex items-center justify-center gap-4 transition-all"
              style={{
                fontSize: `clamp(${tokens.typography.h3.sizeMobile}, 3vw, ${tokens.typography.h3.size})`,
                fontWeight: 900,
                paddingLeft: tokens.button.paddingXLarge,
                paddingRight: tokens.button.paddingXLarge,
                paddingTop: '28px',
                paddingBottom: '28px',
                borderRadius: tokens.button.radiusLarge,
                color: tokens.colors.accent.orchid,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = tokens.link.colorHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = tokens.colors.accent.orchid;
              }}
            >
              <Sparkles 
                className="group-hover:rotate-12 transition-transform" 
                style={{ 
                  width: tokens.icon.sizeLarge, 
                  height: tokens.icon.sizeLarge,
                }} 
              />
              {language === 'HE' ? 'התחילו ליצור' : 'Start Creating'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-panel border-t py-12 px-6" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6974a37cd4253c840929d02d/948240583_image2.png"
                alt="iRap Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <div className="text-[#F4F1FF] font-semibold">iRap</div>
                <div className="text-[rgba(244,241,255,0.52)] text-xs">
                  {language === 'HE' ? 'מצא את הקול שלך' : 'Find Your Voice'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8" style={{
              fontSize: tokens.typography.caption.size,
              color: tokens.colors.text.muted,
            }}>
              <a 
                href="#" 
                style={{
                  color: tokens.link.color,
                  textDecoration: 'none',
                  transition: tokens.link.transition,
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = tokens.link.colorHover}
                onMouseLeave={(e) => e.currentTarget.style.color = tokens.link.color}
              >
                {language === 'HE' ? 'תנאים' : 'Terms'}
              </a>
              <a 
                href="#" 
                style={{
                  color: tokens.link.color,
                  textDecoration: 'none',
                  transition: tokens.link.transition,
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = tokens.link.colorHover}
                onMouseLeave={(e) => e.currentTarget.style.color = tokens.link.color}
              >
                {language === 'HE' ? 'פרטיות' : 'Privacy'}
              </a>
              <button 
                onClick={handleEnterApp}
                style={{
                  color: tokens.link.color,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: tokens.link.transition,
                  padding: 0,
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = tokens.link.colorHover}
                onMouseLeave={(e) => e.currentTarget.style.color = tokens.link.color}
              >
                {language === 'HE' ? 'בטיחות' : 'Safety'}
              </button>
            </div>
          </div>
          <div className="text-center mt-8" style={{
            fontSize: tokens.typography.caption.size,
            color: tokens.colors.text.disabled,
          }}>
            © 2026 iRap. {language === 'HE' ? 'כל הזכויות שמורות.' : 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <LandingContent />
    </LanguageProvider>
  );
}