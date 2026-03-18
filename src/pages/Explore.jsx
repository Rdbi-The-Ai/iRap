import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Play, Heart, Share2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../components/LanguageContext';

const demoTracks = [
  { id: 1, title: 'Fire Bars', artist: 'MC Shadow', plays: 15420, likes: 892, style: 'Aggressive', heat: 'Hot' },
  { id: 2, title: 'Smooth Flow', artist: 'DJ Beats', plays: 12350, likes: 654, style: 'Melodic', heat: 'Medium' },
  { id: 3, title: 'Battle Ready', artist: 'RapKing', plays: 18900, likes: 1234, style: 'Fast Flow', heat: 'Extreme' },
  { id: 4, title: 'Street Tales', artist: 'Urban Voice', plays: 9870, likes: 432, style: 'Trap', heat: 'Hot' },
  { id: 5, title: 'Chill Vibes', artist: 'LoFi Rap', plays: 7650, likes: 321, style: 'Melodic', heat: 'Mild' },
  { id: 6, title: 'Night Shift', artist: 'Dark Flow', plays: 11200, likes: 789, style: 'Trap', heat: 'Medium' }
];

export default function Explore() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(t('exploreSortTrending'));
  const [selectedStyle, setSelectedStyle] = useState(t('exploreAll'));
  const [selectedMood, setSelectedMood] = useState(t('exploreAll'));
  const [selectedHeat, setSelectedHeat] = useState(t('exploreAll'));

  const sortOptions = [
    t('exploreSortTrending'),
    t('exploreSortNew'),
    t('exploreSortMostPlayed'),
    t('exploreSortMostLiked')
  ];

  const styles = [t('exploreAll'), t('createStyleAggressive'), t('createStyleMelodic'), t('createStyleFastFlow'), t('createStyleTrap')];
  const moods = [t('exploreAll'), 'Hype', 'Chill', 'Dark', 'Party'];
  const heat = [t('exploreAll'), t('createHeatLow'), 'Medium', 'Hot', t('createHeatHigh')];

  return (
    <div className="min-h-screen py-8 px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-8 h-8 text-[#C77DFF]" />
            <h1 className="text-4xl font-black text-[#F4F1FF] tracking-tight">{t('exploreTitle')}</h1>
          </div>
          <p className="text-[rgba(244,241,255,0.72)] text-lg">{t('exploreSubtitle')}</p>
        </div>

        {/* Top Filter Bar */}
        <div className="glass-panel-elevated rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[rgba(244,241,255,0.52)] w-5 h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('exploreSearch')}
                className="pl-12 bg-[#0B0712] border-[rgba(255,255,255,0.08)] text-[#F4F1FF] placeholder:text-[rgba(244,241,255,0.32)] rounded-xl focus:border-[#C77DFF]"
              />
            </div>

            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 bg-[#0B0712] border-[rgba(255,255,255,0.08)] text-[#F4F1FF] rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-panel-elevated border-[rgba(255,255,255,0.12)]">
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option} className="text-[#F4F1FF]">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter Chips */}
          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap gap-2">
              {styles.map((style) => (
                <Badge
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedStyle === style
                      ? 'gradient-primary text-white glow-subtle'
                      : 'glass-panel text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF]'
                  }`}
                >
                  {style}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <Badge
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedMood === mood
                      ? 'gradient-primary text-white glow-subtle'
                      : 'glass-panel text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF]'
                  }`}
                >
                  {mood}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {heat.map((h) => (
                <Badge
                  key={h}
                  onClick={() => setSelectedHeat(h)}
                  className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedHeat === h
                      ? 'gradient-primary text-white glow-subtle'
                      : 'glass-panel text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF]'
                  }`}
                >
                  {h}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoTracks.map((track) => (
            <div key={track.id} className="glass-panel-elevated rounded-2xl p-6 hover:scale-[1.02] transition-all group cursor-pointer">
              <div className="bg-gradient-to-br from-[#C77DFF]/20 to-[#FF3D9A]/20 rounded-xl h-40 mb-4 flex items-center justify-center group-hover:from-[#C77DFF]/30 group-hover:to-[#FF3D9A]/30 transition-all">
                <Play className="w-12 h-12 text-[#F4F1FF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <h3 className="text-lg font-bold text-[#F4F1FF] mb-1">{track.title}</h3>
              <p className="text-[rgba(244,241,255,0.52)] text-sm mb-4">{track.artist}</p>
              
              <div className="flex items-center justify-between mb-4 text-sm text-[rgba(244,241,255,0.52)]">
                <span>{track.plays.toLocaleString()} {t('explorePlays')}</span>
                <span>{track.likes.toLocaleString()} {t('exploreLikes')}</span>
              </div>
              
              <div className="flex gap-2 mb-4">
                <Badge className="bg-[#4DE8FF]/20 text-[#4DE8FF] border-[#4DE8FF]/30 text-xs">
                  {track.style}
                </Badge>
                <Badge className="bg-[#FFB020]/20 text-[#FFB020] border-[#FFB020]/30 text-xs">
                  {track.heat}
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 glass-panel text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF] border-[rgba(255,255,255,0.08)] rounded-lg">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="flex-1 glass-panel text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF] border-[rgba(255,255,255,0.08)] rounded-lg">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}