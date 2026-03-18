import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Copy, Star, BookOpen } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

const demoPresets = {
  punchlines: [
    { id: 1, text: "I'm spitting fire, you just warming up", uses: 1234, popular: true },
    { id: 2, text: "My rhymes hit harder than reality", uses: 987, popular: true },
    { id: 3, text: "You're talking big, but your bars are small", uses: 765, popular: false },
    { id: 4, text: "I'm on another level, you can't compete", uses: 654, popular: false }
  ],
  hooks: [
    { id: 5, text: "Yeah, yeah, we taking over now", uses: 2134, popular: true },
    { id: 6, text: "Can't stop, won't stop, that's how we roll", uses: 1876, popular: true },
    { id: 7, text: "Running the game, no one can claim", uses: 923, popular: false },
    { id: 8, text: "We rise up, never give up", uses: 745, popular: false }
  ],
  slang: [
    { id: 9, text: "fire 🔥", uses: 3421, popular: true },
    { id: 10, text: "no cap", uses: 2987, popular: true },
    { id: 11, text: "bussin", uses: 2134, popular: true },
    { id: 12, text: "straight facts", uses: 1654, popular: false }
  ],
  openers: [
    { id: 13, text: "Let me tell you how it is", uses: 1543, popular: true },
    { id: 14, text: "Listen up, I got something to say", uses: 1234, popular: true },
    { id: 15, text: "Check it, here's the real deal", uses: 987, popular: false },
    { id: 16, text: "Yo, step back and watch this", uses: 876, popular: false }
  ]
};

export default function Presets() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('punchlines');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen py-8 px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-8 h-8 text-[#C77DFF]" />
            <h1 className="text-4xl font-black text-[#F4F1FF] tracking-tight">{t('presetsTitle')}</h1>
          </div>
          <p className="text-[rgba(244,241,255,0.72)] text-lg">{t('presetsSubtitle')}</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[rgba(244,241,255,0.52)] w-5 h-5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('presetsSearch')}
              className="pl-12 bg-[#0B0712] glass-panel border-[rgba(255,255,255,0.08)] text-[#F4F1FF] placeholder:text-[rgba(244,241,255,0.32)] rounded-xl py-6 focus:border-[#C77DFF]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.keys(demoPresets).map((category) => (
            <Badge
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`cursor-pointer px-6 py-3 rounded-full text-base font-semibold transition-all ${
                activeCategory === category
                  ? 'gradient-primary text-white glow-subtle'
                  : 'glass-panel-elevated text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF]'
              }`}
            >
              {t(`presets${category.charAt(0).toUpperCase() + category.slice(1)}`)}
            </Badge>
          ))}
        </div>

        {/* Preset Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {demoPresets[activeCategory].map((preset) => (
            <div
              key={preset.id}
              className="glass-panel-elevated rounded-2xl p-6 hover:scale-[1.01] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <p className="text-[#F4F1FF] text-lg flex-1 leading-relaxed pr-4">
                  {preset.text}
                </p>
                {preset.popular && (
                  <Badge className="bg-[#FFB020]/20 text-[#FFB020] border-[#FFB020]/30 flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3" />
                    {t('presetsPopular')}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[rgba(244,241,255,0.52)] text-sm">
                  {preset.uses.toLocaleString()} {t('presetsUses')}
                </span>
                <Button
                  size="sm"
                  onClick={() => handleCopy(preset.text)}
                  className="gradient-primary text-white rounded-lg hover:gradient-primary-hover glow-subtle"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {t('presetsInsert')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}