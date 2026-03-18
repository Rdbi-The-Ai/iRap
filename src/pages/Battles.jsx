import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Swords, Trophy, Clock, Users, Flame } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

const demoBattles = {
  scheduled: [
    { id: 1, name: 'Friday Night Clash', time: '2 hours', participants: 24 },
    { id: 2, name: 'Weekend Warriors', time: '1 day', participants: 16 },
    { id: 3, name: 'Championship Round', time: '3 days', participants: 32 }
  ],
  live: [
    { id: 4, name: 'Rapid Fire Battle', participants: 12, viewers: 345 },
    { id: 5, name: 'Freestyle Showdown', participants: 8, viewers: 567 }
  ],
  ended: [
    { id: 6, name: 'Monday Madness', winner: 'MC Shadow', participants: 16 },
    { id: 7, name: 'Beat Drop Battle', winner: 'RapKing', participants: 20 }
  ]
};

const leaderboard = [
  { rank: 1, player: 'MC Shadow', wins: 47 },
  { rank: 2, player: 'RapKing', wins: 42 },
  { rank: 3, player: 'DJ Beats', wins: 38 },
  { rank: 4, player: 'Urban Voice', wins: 35 },
  { rank: 5, player: 'LoFi Rap', wins: 31 }
];

export default function Battles() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('scheduled');

  return (
    <div className="min-h-screen py-8 px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Swords className="w-8 h-8 text-[#FFB020]" />
            <h1 className="text-4xl font-black text-[#F4F1FF] tracking-tight">{t('battlesTitle')}</h1>
          </div>
          <p className="text-[rgba(244,241,255,0.72)] text-lg">{t('battlesSubtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Pills */}
            <div className="flex gap-2">
              <Badge
                onClick={() => setActiveTab('scheduled')}
                className={`cursor-pointer px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'scheduled'
                    ? 'gradient-primary text-white glow-subtle'
                    : 'glass-panel-elevated text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF]'
                }`}
              >
                <Clock className="w-4 h-4" />
                {t('battlesScheduled')}
              </Badge>
              <Badge
                onClick={() => setActiveTab('live')}
                className={`cursor-pointer px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'live'
                    ? 'gradient-primary text-white glow-subtle'
                    : 'glass-panel-elevated text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF]'
                }`}
              >
                <Flame className="w-4 h-4" />
                {t('battlesLive')}
              </Badge>
              <Badge
                onClick={() => setActiveTab('ended')}
                className={`cursor-pointer px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'ended'
                    ? 'gradient-primary text-white glow-subtle'
                    : 'glass-panel-elevated text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF]'
                }`}
              >
                {t('battlesEnded')}
              </Badge>
            </div>

            {/* Battle Cards */}
            <div className="space-y-4">
              {activeTab === 'scheduled' && demoBattles.scheduled.map((battle) => (
                <div key={battle.id} className="glass-panel-elevated rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#F4F1FF] mb-3">{battle.name}</h3>
                      <div className="flex items-center gap-6 text-sm text-[rgba(244,241,255,0.72)]">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {t('battlesStartsIn')} {battle.time}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {battle.participants} {t('battlesParticipants')}
                        </span>
                      </div>
                    </div>
                    <Button className="gradient-primary text-white rounded-xl hover:gradient-primary-hover glow-subtle px-6">
                      {t('battlesJoin')}
                    </Button>
                  </div>
                </div>
              ))}

              {activeTab === 'live' && demoBattles.live.map((battle) => (
                <div key={battle.id} className="glass-panel-elevated rounded-2xl p-6 border-2 border-[#FF4D4D]/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-[#FF4D4D] text-white animate-pulse rounded-full px-3 py-1 text-xs font-bold">
                          LIVE
                        </Badge>
                        <h3 className="text-xl font-bold text-[#F4F1FF]">{battle.name}</h3>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-[rgba(244,241,255,0.72)]">
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {battle.participants} {t('battlesParticipants')}
                        </span>
                        <span>{battle.viewers} viewers</span>
                      </div>
                    </div>
                    <Button className="bg-[#FF4D4D] text-white rounded-xl hover:bg-[#FF4D4D]/90 px-6">
                      {t('battlesWatch')}
                    </Button>
                  </div>
                </div>
              ))}

              {activeTab === 'ended' && demoBattles.ended.map((battle) => (
                <div key={battle.id} className="glass-panel-elevated rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-[#F4F1FF] mb-3">{battle.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-[rgba(244,241,255,0.72)]">
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {battle.participants} {t('battlesParticipants')}
                      </span>
                    </div>
                    <Badge className="bg-[#FFB020]/20 text-[#FFB020] border-[#FFB020]/30 flex items-center gap-2 px-4 py-1.5">
                      <Trophy className="w-4 h-4" />
                      {t('battlesWinner')}: {battle.winner}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <div className="glass-panel-elevated rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#F4F1FF] mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#FFB020]" />
                {t('battlesLeaderboard')}
              </h3>
              <div className="space-y-3">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`p-4 rounded-xl flex items-center justify-between ${
                      entry.rank <= 3 
                        ? 'bg-gradient-to-r from-[#FFB020]/20 to-[#FFB020]/5' 
                        : 'bg-[rgba(255,255,255,0.03)]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-2xl font-black w-8 ${
                        entry.rank === 1 ? 'text-[#FFB020]' : 
                        entry.rank === 2 ? 'text-[#C77DFF]' : 
                        entry.rank === 3 ? 'text-[#4DE8FF]' : 
                        'text-[rgba(244,241,255,0.52)]'
                      }`}>
                        {entry.rank}
                      </span>
                      <div>
                        <p className="text-[#F4F1FF] font-semibold">{entry.player}</p>
                        <p className="text-sm text-[rgba(244,241,255,0.52)]">{entry.wins} {t('battlesWins')}</p>
                      </div>
                    </div>
                    {entry.rank <= 3 && <Trophy className="w-5 h-5 text-[#FFB020]" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}