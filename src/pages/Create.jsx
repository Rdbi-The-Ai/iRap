import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Flame, Music, Zap, Info, Sparkles, Save, BookOpen, Check } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '../components/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import RhymeSuggestions from '../components/create/RhymeSuggestions';
import LyricGenerator from '../components/create/LyricGenerator';
import MoodPalette from '../components/create/MoodPalette';
import SaveSongDialog from '../components/create/SaveSongDialog';

export default function Create() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [style, setStyle] = useState('');
  const [trackLang, setTrackLang] = useState('english');
  const [beat, setBeat] = useState('');
  const [heatLevel, setHeatLevel] = useState([50]);
  const [mood, setMood] = useState('confident');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Completed, setStep1Completed] = useState(false);
  const [selectedRhyme, setSelectedRhyme] = useState('');
  const [generatedTrack, setGeneratedTrack] = useState(null);
  
  // Accordion state management
  const [activeSection, setActiveSection] = useState('section-1');
  const [completedSections, setCompletedSections] = useState(new Set());

  const insertWord = (word) => {
    setText(prev => prev ? `${prev} ${word}` : word);
    setSelectedRhyme(word);
  };

  const styles = [
    t('createStyleAggressive'),
    t('createStyleMelodic'),
    t('createStyleFastFlow'),
    t('createStyleTrap'),
    t('createStyleBoomBap'),
    t('createStyleDrill')
  ];

  const languages = [
    t('createLangEnglish'),
    t('createLangHebrew'),
    t('createLangMixed')
  ];

  const beats = [
    t('createBeat1'),
    t('createBeat2'),
    t('createBeat3'),
    t('createBeat4'),
    t('createBeat5')
  ];

  const moods = ['aggressive', 'confident', 'playful', 'smooth', 'intense', 'chill'];

  const steps = [
    { number: 1, name: language === 'HE' ? 'נושא ורעיון' : 'Topic & Idea', desc: language === 'HE' ? 'בחרו על מה הדיס שלכם' : 'Choose what your diss is about.' },
    { number: 2, name: language === 'HE' ? 'מצב רוח וסגנון' : 'Mood & Style', desc: language === 'HE' ? 'קבעו את הווייב והאנרגיה' : 'Set the vibe and energy of your diss.' },
    { number: 3, name: language === 'HE' ? 'שפה וביט' : 'Language & Beat', desc: language === 'HE' ? 'בחרו שפה ואינסטרומנטל' : 'Pick the language and beat.' },
    { number: 4, name: language === 'HE' ? 'יצירה ותצוגה' : 'Generate & Review', desc: language === 'HE' ? 'צרו וסקרו את הדיס המלא' : 'Generate and review your full diss.' }
  ];

  const canProceedToStep = (step) => {
    if (step === 2) return step1Completed;
    if (step === 3) return mood && style && completedSections.has('section-2') && completedSections.has('section-3');
    if (step === 4) return trackLang && beat && completedSections.has('section-2');
    return true;
  };

  const isSectionCompleted = (sectionId) => completedSections.has(sectionId);

  const handleSaveStep1 = () => {
    if (text.trim()) {
      setStep1Completed(true);
      markSectionComplete('section-2');
    }
  };

  const markSectionComplete = (sectionId) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
    // Auto-advance to next section
    const nextSection = getNextSection(sectionId);
    if (nextSection) {
      setActiveSection(nextSection);
    }
  };

  const getNextSection = (currentSectionId) => {
    const sectionMap = {
      1: ['section-1', 'section-2'],
      2: ['section-1', 'section-2', 'section-3', 'section-4'],
      3: ['section-1', 'section-2'],
      4: ['section-1']
    };
    
    const sections = sectionMap[currentStep];
    const currentIndex = sections.indexOf(currentSectionId);
    return sections[currentIndex + 1];
  };

  // Reset active section when step changes
  useEffect(() => {
    setActiveSection('section-1');
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 4 && canProceedToStep(currentStep + 1)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canCreateDiss = () => {
    return text.trim() && style && beat && trackLang;
  };

  const handleCreateDiss = () => {
    if (canCreateDiss()) {
      setCurrentStep(4);
    }
  };

  return (
    <>
    <div className="min-h-screen py-6 px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-[#C77DFF]" />
            <h1 className="text-xl font-bold text-[#F4F1FF] tracking-tight">Create</h1>
          </div>
          <p className="text-[rgba(244,241,255,0.65)] text-base">Drop your hardest bars. Make it legendary.</p>
        </div>

        {/* 3-AREA LAYOUT: Center + Side Preview */}
        <div className={`flex gap-6 ${language === 'HE' ? 'flex-row-reverse' : ''}`}>
          {/* CENTER TASK AREA */}
          <div className="flex-1 min-w-0 flex flex-col" style={{ height: 'calc(100vh - 100px)' }}>
            {/* TOP STEP BAR (Horizontal) */}
            <div className="flex-shrink-0 mb-3 glass-panel rounded-xl p-3">
              <div className="flex gap-2 overflow-x-auto mb-3">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg flex-shrink-0 cursor-pointer transition-all ${
                      currentStep === step.number
                        ? 'glass-panel-elevated border border-[rgba(199,125,255,0.3)]'
                        : (step.number === 1 && step1Completed) || currentStep > step.number
                        ? 'glass-panel opacity-70 hover:opacity-100'
                        : 'glass-panel opacity-40'
                    }`}
                    onClick={() => ((step.number === 1 && step1Completed) || currentStep > step.number) && setCurrentStep(step.number)}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      (step.number === 1 && step1Completed) || currentStep > step.number
                        ? 'bg-[#28D17C]'
                        : currentStep === step.number
                        ? 'gradient-primary'
                        : 'bg-[rgba(255,255,255,0.08)]'
                    }`}>
                      {(step.number === 1 && step1Completed) || currentStep > step.number ? (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-xs font-bold text-white">{step.number}</span>
                      )}
                    </div>
                    <div className="hidden md:block">
                      <div className={`text-xs font-semibold ${
                        currentStep === step.number ? 'text-[#F4F1FF]' : 'text-[rgba(244,241,255,0.65)]'
                      }`}>
                        {step.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TASK CONTENT (No Scroll - Fits Viewport) */}
            <div className="flex-1 overflow-hidden" style={{ minHeight: 0 }}>
              <div>
            {/* STEP 1: Topic & Idea */}
            {currentStep === 1 && (
              <Accordion type="single" value={activeSection} onValueChange={setActiveSection} className="space-y-3">
                {/* Section 1: Rhyme Finder */}
                <AccordionItem value="section-1" className="glass-panel rounded-xl border-0">
                  <AccordionTrigger className={`px-3 py-2.5 hover:no-underline rounded-xl transition-all ${
                    activeSection === 'section-1' 
                      ? 'bg-[rgba(199,125,255,0.08)] border border-[rgba(199,125,255,0.3)]' 
                      : isSectionCompleted('section-1')
                      ? 'bg-[rgba(40,209,124,0.05)] border border-[rgba(40,209,124,0.2)]'
                      : 'border border-transparent'
                  }`}>
                    <div className="flex items-center gap-2">
                      {isSectionCompleted('section-1') && (
                        <div className="w-4 h-4 rounded-full bg-[#28D17C] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                      <h3 className="text-[#F4F1FF] font-medium text-xs">Rhyme Finder</h3>
                      <span className="text-[rgba(244,241,255,0.4)] text-xs">{language === 'HE' ? '(אופציונלי)' : '(optional)'}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    <p className="text-[rgba(244,241,255,0.45)] text-xs mb-2">
                      {language === 'HE' 
                        ? 'מצא חרוזים ורעיונות למילים'
                        : 'Find rhymes and word ideas to inspire your lyrics'}
                    </p>
                    <RhymeSuggestions onSelectWord={(word) => {
                      insertWord(word);
                      markSectionComplete('section-1');
                    }} />
                  </AccordionContent>
                </AccordionItem>

                {/* Section 2: Topic or Lyrics */}
                <AccordionItem value="section-2" className="glass-panel rounded-xl border-0">
                  <AccordionTrigger className={`px-3 py-2.5 hover:no-underline rounded-xl transition-all ${
                    activeSection === 'section-2' 
                      ? 'bg-[rgba(199,125,255,0.08)] border border-[rgba(199,125,255,0.3)]' 
                      : step1Completed
                      ? 'bg-[rgba(40,209,124,0.05)] border border-[rgba(40,209,124,0.2)]'
                      : 'border border-transparent'
                  }`}>
                    <div className="flex items-center gap-2">
                      {step1Completed && (
                        <div className="w-4 h-4 rounded-full bg-[#28D17C] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                      <h3 className="text-[#F4F1FF] font-semibold text-xs">{t('createTextInput')}</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    <p className="text-[rgba(244,241,255,0.55)] text-xs mb-2">
                      {language === 'HE' 
                        ? 'כתוב בחופשיות — תמיד אפשר לשנות אחר כך'
                        : "Write freely — you can always change it later"}
                    </p>
                    <div className="relative">
                      <Textarea
                        value={text}
                        onChange={(e) => {
                          setText(e.target.value);
                          if (!e.target.value.trim()) {
                            setStep1Completed(false);
                            setCompletedSections(prev => {
                              const newSet = new Set(prev);
                              newSet.delete('section-2');
                              return newSet;
                            });
                          }
                        }}
                        placeholder={t('createTextPlaceholder')}
                        className="min-h-32 bg-[#0B0712] border-[rgba(255,255,255,0.1)] text-[#F4F1FF] placeholder:text-[rgba(244,241,255,0.32)] rounded-xl resize-none focus:border-[#C77DFF] transition-all font-mono text-sm pr-20 leading-relaxed"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          onClick={handleSaveStep1}
                          disabled={!text.trim()}
                          size="sm"
                          className={`transition-all ${
                            step1Completed 
                              ? 'bg-[#28D17C] hover:bg-[#28D17C]' 
                              : 'bg-[#FF3D9A] hover:bg-[#FF3D9A]'
                          }`}
                        >
                          {step1Completed ? (
                            language === 'HE' ? 'נשמר' : 'Saved'
                          ) : (
                            language === 'HE' ? 'שמור' : 'Save'
                          )}
                        </Button>
                      </div>
                    </div>
                    {step1Completed && (
                      <p className="text-[#28D17C] text-xs mt-2 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                        {language === 'HE' ? 'נשמר! מוכן להמשיך' : 'Saved! Ready to move on'}
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* STEP 2: Mood & Style */}
            {currentStep === 2 && (
              <Accordion type="single" value={activeSection} onValueChange={setActiveSection} className="space-y-3">
                {/* Section 1: Mood */}
                <AccordionItem value="section-1" className="glass-panel rounded-xl border-0">
                  <AccordionTrigger className={`px-3 py-2.5 hover:no-underline rounded-xl transition-all ${
                    activeSection === 'section-1' 
                      ? 'bg-[rgba(199,125,255,0.08)] border border-[rgba(199,125,255,0.3)]' 
                      : mood
                      ? 'bg-[rgba(40,209,124,0.05)] border border-[rgba(40,209,124,0.2)]'
                      : 'border border-transparent'
                  }`}>
                    <div className="flex items-center gap-2">
                      {mood && (
                        <div className="w-4 h-4 rounded-full bg-[#28D17C] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                      <h3 className="text-[#F4F1FF] font-semibold text-xs">Mood</h3>
                      {mood && <span className="text-[#C77DFF] text-xs">· {mood}</span>}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    <p className="text-[rgba(244,241,255,0.45)] text-xs mb-2">Choose the emotional vibe of your diss.</p>
                    <div className="flex flex-wrap gap-2">
                      {moods.map((m) => (
                        <Badge
                          key={m}
                          variant={mood === m ? 'default' : 'outline'}
                          className={`cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            mood === m
                              ? 'gradient-primary text-white glow-subtle'
                              : 'glass-panel text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF]'
                          }`}
                          onClick={() => {
                            setMood(m);
                            markSectionComplete('section-1');
                          }}
                        >
                          {m}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Section 2: Style */}
                <AccordionItem value="section-2" className="glass-panel rounded-xl border-0">
                  <AccordionTrigger className={`px-3 py-2.5 hover:no-underline rounded-xl transition-all ${
                    activeSection === 'section-2' 
                      ? 'bg-[rgba(199,125,255,0.08)] border border-[rgba(199,125,255,0.3)]' 
                      : style
                      ? 'bg-[rgba(40,209,124,0.05)] border border-[rgba(40,209,124,0.2)]'
                      : 'border border-transparent'
                  }`}>
                    <div className="flex items-center gap-2">
                      {style && (
                        <div className="w-4 h-4 rounded-full bg-[#28D17C] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                      <h3 className="text-[#F4F1FF] font-semibold text-xs">{t('createStyle')}</h3>
                      {style && <span className="text-[#FF3D9A] text-xs">· {style}</span>}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    <p className="text-[rgba(244,241,255,0.45)] text-xs mb-2">Pick the rap style that matches your flow.</p>
                    <div className="flex flex-wrap gap-2">
                      {styles.map((s) => (
                        <Badge
                          key={s}
                          variant={style === s ? 'default' : 'outline'}
                          className={`cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            style === s
                              ? 'gradient-primary text-white glow-subtle'
                              : 'glass-panel text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF]'
                          }`}
                          onClick={() => {
                            setStyle(s);
                            markSectionComplete('section-2');
                          }}
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Section 3: Diss Heat */}
                <AccordionItem value="section-3" className="glass-panel rounded-xl border-0">
                  <AccordionTrigger className={`px-3 py-2.5 hover:no-underline rounded-xl transition-all ${
                    activeSection === 'section-3' 
                      ? 'bg-[rgba(199,125,255,0.08)] border border-[rgba(199,125,255,0.3)]' 
                      : isSectionCompleted('section-3')
                      ? 'bg-[rgba(40,209,124,0.05)] border border-[rgba(40,209,124,0.2)]'
                      : 'border border-transparent'
                  }`}>
                    <div className="flex items-center gap-2">
                      {isSectionCompleted('section-3') && (
                        <div className="w-4 h-4 rounded-full bg-[#28D17C] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                      <Flame className="w-3.5 h-3.5 text-[#FFB020]" />
                      <h3 className="text-[#F4F1FF] font-semibold text-xs">{t('createDissHeat')}</h3>
                      {isSectionCompleted('section-3') && <span className="text-[#FFB020] text-xs">· {heatLevel[0]}%</span>}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    <p className="text-[rgba(244,241,255,0.45)] text-xs mb-2">Control how sharp or playful the diss feels.</p>
                    <div className="space-y-2">
                      <Slider
                        value={heatLevel}
                        onValueChange={(val) => {
                          setHeatLevel(val);
                          if (!isSectionCompleted('section-3')) {
                            markSectionComplete('section-3');
                          }
                        }}
                        max={100}
                        step={1}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs">
                        <span className="text-[rgba(244,241,255,0.52)]">{t('createHeatLow')}</span>
                        <span className="font-bold text-[#FFB020]">{heatLevel[0]}%</span>
                        <span className="text-[rgba(244,241,255,0.52)]">{t('createHeatHigh')}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Section 4: Mood Palette */}
                <AccordionItem value="section-4" className="glass-panel rounded-xl border-0">
                  <AccordionTrigger className={`px-3 py-2.5 hover:no-underline rounded-xl transition-all ${
                    activeSection === 'section-4' 
                      ? 'bg-[rgba(199,125,255,0.08)] border border-[rgba(199,125,255,0.3)]' 
                      : isSectionCompleted('section-4')
                      ? 'bg-[rgba(40,209,124,0.05)] border border-[rgba(40,209,124,0.2)]'
                      : 'border border-transparent'
                  }`}>
                    <div className="flex items-center gap-2">
                      {isSectionCompleted('section-4') && (
                        <div className="w-4 h-4 rounded-full bg-[#28D17C] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                      <h3 className="text-[#F4F1FF] font-semibold text-xs">Mood Palette</h3>
                      <span className="text-[rgba(244,241,255,0.4)] text-xs">{language === 'HE' ? '(אופציונלי)' : '(optional)'}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    <p className="text-[rgba(244,241,255,0.45)] text-xs mb-2">Get word suggestions based on selected mood.</p>
                    <MoodPalette mood={mood} onSelectWord={(word) => {
                      insertWord(word);
                      markSectionComplete('section-4');
                    }} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* STEP 3: Language & Beat */}
            {currentStep === 3 && (
              <Accordion type="single" value={activeSection} onValueChange={setActiveSection} className="space-y-3">
                {/* Section 1: Language */}
                <AccordionItem value="section-1" className="glass-panel rounded-xl border-0">
                  <AccordionTrigger className={`px-3 py-2.5 hover:no-underline rounded-xl transition-all ${
                    activeSection === 'section-1' 
                      ? 'bg-[rgba(199,125,255,0.08)] border border-[rgba(199,125,255,0.3)]' 
                      : trackLang
                      ? 'bg-[rgba(40,209,124,0.05)] border border-[rgba(40,209,124,0.2)]'
                      : 'border border-transparent'
                  }`}>
                    <div className="flex items-center gap-2">
                      {trackLang && (
                        <div className="w-4 h-4 rounded-full bg-[#28D17C] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                      <h3 className="text-[#F4F1FF] font-semibold text-xs">{t('createLanguage')}</h3>
                      {trackLang && <span className="text-[#4DE8FF] text-xs">· {trackLang}</span>}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    <p className="text-[rgba(244,241,255,0.45)] text-xs mb-2">Select the language for your track.</p>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang) => (
                        <Badge
                          key={lang}
                          variant={trackLang === lang ? 'default' : 'outline'}
                          className={`cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            trackLang === lang
                              ? 'gradient-primary text-white glow-subtle'
                              : 'glass-panel text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF]'
                          }`}
                          onClick={() => {
                            setTrackLang(lang);
                            markSectionComplete('section-1');
                          }}
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Section 2: Beat */}
                <AccordionItem value="section-2" className="glass-panel rounded-xl border-0">
                  <AccordionTrigger className={`px-3 py-2.5 hover:no-underline rounded-xl transition-all ${
                    activeSection === 'section-2' 
                      ? 'bg-[rgba(199,125,255,0.08)] border border-[rgba(199,125,255,0.3)]' 
                      : beat
                      ? 'bg-[rgba(40,209,124,0.05)] border border-[rgba(40,209,124,0.2)]'
                      : 'border border-transparent'
                  }`}>
                    <div className="flex items-center gap-2">
                      {beat && (
                        <div className="w-4 h-4 rounded-full bg-[#28D17C] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                      <Music className="w-3.5 h-3.5 text-[#C77DFF]" />
                      <h3 className="text-[#F4F1FF] font-semibold text-xs">{t('createBeat')}</h3>
                      {beat && <span className="text-[#C77DFF] text-xs">· {beat}</span>}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    <p className="text-[rgba(244,241,255,0.45)] text-xs mb-2">Choose the instrumental that fits your vibe.</p>
                    <div className="space-y-2">
                      {beats.map((b) => (
                        <div
                          key={b}
                          onClick={() => {
                            setBeat(b);
                            markSectionComplete('section-2');
                          }}
                          className={`p-2 rounded-lg cursor-pointer transition-all ${
                            beat === b
                              ? 'gradient-primary text-white glow-subtle'
                              : 'glass-panel text-[rgba(244,241,255,0.72)] hover:glass-panel-elevated'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{b}</span>
                            <Music className="w-4 h-4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* STEP 4: Generate & Review */}
            {currentStep === 4 && (
              <Accordion type="single" value={activeSection} onValueChange={setActiveSection} className="space-y-3">
                {/* Section 1: AI Lyric Generator */}
                <AccordionItem value="section-1" className="glass-panel rounded-xl border-0">
                  <AccordionTrigger className={`px-3 py-2.5 hover:no-underline rounded-xl transition-all ${
                    activeSection === 'section-1' 
                      ? 'bg-[rgba(199,125,255,0.08)] border border-[rgba(199,125,255,0.3)]' 
                      : isSectionCompleted('section-1')
                      ? 'bg-[rgba(40,209,124,0.05)] border border-[rgba(40,209,124,0.2)]'
                      : 'border border-transparent'
                  }`}>
                    <div className="flex items-center gap-2">
                      {isSectionCompleted('section-1') && (
                        <div className="w-4 h-4 rounded-full bg-[#28D17C] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                      <Sparkles className="w-3.5 h-3.5 text-[#C77DFF]" />
                      <h3 className="text-[#F4F1FF] font-semibold text-xs">AI Lyric Generator</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    <p className="text-[rgba(244,241,255,0.45)] text-xs mb-2">Generate complete lyrics based on your settings.</p>
                    <LyricGenerator 
                      topic={text}
                      mood={mood}
                      style={style}
                      language={trackLang}
                      onGenerated={(lyrics) => {
                        setText(lyrics);
                        markSectionComplete('section-1');
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

              </div>
            </div>

            {/* FOOTER (BACK/NEXT) - Fixed at bottom */}
            <div className="flex-shrink-0" style={{
              background: 'linear-gradient(to top, rgba(11, 7, 18, 1) 85%, rgba(11, 7, 18, 0.98) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '12px 0',
              boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.3)'
            }}>
              <div className={`flex gap-3 ${language === 'HE' ? 'flex-row-reverse' : ''}`}>
                <Button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="flex-1"
                >
                  {language === 'HE' ? 'הקודם' : 'Back'}
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentStep === 4 || !canProceedToStep(currentStep + 1)}
                  className="gradient-primary flex-1"
                >
                  {language === 'HE' ? 'הבא' : 'Next'}
                </Button>
              </div>
            </div>
          </div>

          {/* SIDE PREVIEW AREA (Persistent) */}
          <div className="hidden lg:block w-96 flex-shrink-0">
            <div className="sticky top-6">
              <div className="glass-panel-elevated rounded-xl p-5">
                <h3 className="text-[#F4F1FF] font-semibold text-base mb-1">
                  {language === 'HE' ? 'בניית הדיס שלך' : 'Your Diss Build'}
                </h3>
                <p className="text-[rgba(244,241,255,0.45)] text-xs mb-5">
                  {language === 'HE' ? 'מעקב חיי אחר ההתקדמות שלך' : 'Live checklist of your progress'}
                </p>
                
                {/* Build Checklist */}
                <div className="space-y-3 mb-6">
                  {/* Topic & Idea */}
                  <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[rgba(244,241,255,0.65)] text-xs font-medium">
                          {language === 'HE' ? 'נושא ורעיון' : 'Topic & Idea'}
                        </span>
                        {text && (
                          <svg className="w-3 h-3 text-[#28D17C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <p className={`text-xs leading-relaxed ${text ? 'text-[#F4F1FF]' : 'text-[rgba(244,241,255,0.32)]'}`}>
                        {text ? text.slice(0, 100) + (text.length > 100 ? '...' : '') : (language === 'HE' ? 'לא הוגדר עדיין' : 'Not set yet')}
                      </p>
                    </div>
                  </div>

                  {/* Rhyme */}
                  <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[rgba(244,241,255,0.65)] text-xs font-medium">
                          {language === 'HE' ? 'חרוז' : 'Rhyme'}
                        </span>
                        {selectedRhyme && (
                          <svg className="w-3 h-3 text-[#28D17C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <p className={`text-xs ${selectedRhyme ? 'text-[#F4F1FF]' : 'text-[rgba(244,241,255,0.32)]'}`}>
                        {selectedRhyme || (language === 'HE' ? 'לא נבחר חרוז' : 'No rhyme selected')}
                      </p>
                    </div>
                  </div>

                  {/* Lyrics */}
                  <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[rgba(244,241,255,0.65)] text-xs font-medium">
                          {language === 'HE' ? 'מילים' : 'Lyrics'}
                        </span>
                        {text && (
                          <svg className="w-3 h-3 text-[#28D17C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <p className={`text-xs leading-relaxed ${text ? 'text-[#F4F1FF]' : 'text-[rgba(244,241,255,0.32)]'}`}>
                        {text ? text.split('\n').slice(0, 3).join('\n') + (text.split('\n').length > 3 ? '...' : '') : (language === 'HE' ? 'התחל לכתוב...' : 'Start writing...')}
                      </p>
                    </div>
                  </div>

                  {/* Style */}
                  <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[rgba(244,241,255,0.65)] text-xs font-medium">
                          {language === 'HE' ? 'סגנון' : 'Style'}
                        </span>
                        {(mood && style) && (
                          <svg className="w-3 h-3 text-[#28D17C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {mood && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-[rgba(199,125,255,0.15)] text-[#C77DFF]">
                            {mood}
                          </span>
                        )}
                        {style && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-[rgba(255,61,154,0.15)] text-[#FF3D9A]">
                            {style}
                          </span>
                        )}
                        {!mood && !style && (
                          <span className="text-xs text-[rgba(244,241,255,0.32)]">
                            {language === 'HE' ? 'בחר מצב רוח וסגנון' : 'Choose mood & style'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Inspiration */}
                  <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[rgba(244,241,255,0.65)] text-xs font-medium">
                          {language === 'HE' ? 'השראה' : 'Inspiration'}
                        </span>
                        <span className="text-[rgba(244,241,255,0.32)] text-xs">
                          ({language === 'HE' ? 'אופציונלי' : 'optional'})
                        </span>
                      </div>
                      <p className="text-xs text-[rgba(244,241,255,0.32)]">
                        {language === 'HE' ? 'אופציונלי' : 'Optional'}
                      </p>
                    </div>
                  </div>

                  {/* Beat */}
                  <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[rgba(244,241,255,0.65)] text-xs font-medium">
                          {language === 'HE' ? 'ביט' : 'Beat'}
                        </span>
                        {beat && (
                          <svg className="w-3 h-3 text-[#28D17C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {beat && trackLang && (
                          <>
                            <span className="px-2 py-0.5 rounded-full text-xs bg-[rgba(40,209,124,0.15)] text-[#28D17C]">
                              {beat}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-xs bg-[rgba(77,232,255,0.15)] text-[#4DE8FF]">
                              {trackLang}
                            </span>
                          </>
                        )}
                        {!beat && (
                          <span className="text-xs text-[rgba(244,241,255,0.32)]">
                            {language === 'HE' ? 'בחר ביט' : 'Pick a beat'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Create This Diss CTA */}
                <Button
                  onClick={handleCreateDiss}
                  disabled={!canCreateDiss()}
                  className={`w-full ${canCreateDiss() ? 'gradient-primary glow-subtle' : 'bg-[rgba(255,255,255,0.05)]'} transition-all`}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {language === 'HE' ? 'צור את הדיס הזה' : 'Create this Diss'}
                </Button>

                {/* Generated Track Player (Only after generation) */}
                {generatedTrack && (
                  <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.08)]">
                    <div className="bg-[#0B0712] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#C77DFF]/20 to-[#FF3D9A]/20 flex items-center justify-center flex-shrink-0">
                          <Music className="w-5 h-5 text-[#C77DFF]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[#F4F1FF] font-medium text-sm truncate">
                            {generatedTrack.title}
                          </h4>
                          <p className="text-[rgba(244,241,255,0.52)] text-xs">
                            {language === 'HE' ? 'נוצר עכשיו' : 'Just created'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.08)] flex items-center justify-center">
                          <svg className="w-3 h-3 text-[rgba(244,241,255,0.5)] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                        <div className="flex-1 h-1 bg-[rgba(255,255,255,0.08)] rounded-full">
                          <div className="h-full w-0 bg-[#C77DFF] rounded-full"></div>
                        </div>
                        <span className="text-[rgba(244,241,255,0.4)] text-xs">0:00</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SaveSongDialog
      open={saveDialogOpen}
      onClose={(saved) => {
        setSaveDialogOpen(false);
        if (saved) {
          setText('');
        }
      }}
      lyrics={text}
      topic={text.slice(0, 50)}
      mood={mood}
      style={style}
      language={trackLang}
      beat={beat}
    />
    </>
  );
}