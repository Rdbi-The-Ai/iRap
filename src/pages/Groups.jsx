import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Lock, Globe, Crown } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

const demoGroups = {
  public: [
    { id: 1, name: 'Rap Beginners', members: 1543, description: 'Learn the basics together', isAdmin: false },
    { id: 2, name: 'Battle Arena', members: 987, description: 'Competitive rap battles', isAdmin: false },
    { id: 3, name: 'Freestyle Friday', members: 2341, description: 'Weekly freestyle sessions', isAdmin: false },
    { id: 4, name: 'Beat Makers', members: 654, description: 'Share and discuss beats', isAdmin: false }
  ],
  private: [
    { id: 5, name: 'My Crew', members: 12, description: 'Private practice group', isAdmin: true },
    { id: 6, name: 'School Squad', members: 8, description: 'Friends from school', isAdmin: false }
  ]
};

export default function Groups() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('public');

  return (
    <div className="min-h-screen py-8 px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-8 h-8 text-[#28D17C]" />
              <h1 className="text-4xl font-black text-[#F4F1FF] tracking-tight">{t('groupsTitle')}</h1>
            </div>
            <p className="text-[rgba(244,241,255,0.72)] text-lg">{t('groupsSubtitle')}</p>
          </div>
          <Button className="gradient-primary text-white glow-subtle hover:gradient-primary-hover rounded-xl px-6 py-3">
            <Plus className="w-5 h-5 mr-2" />
            {t('groupsCreate')}
          </Button>
        </div>

        {/* Tab Pills */}
        <div className="flex gap-2 mb-8">
          <Badge
            onClick={() => setActiveTab('public')}
            className={`cursor-pointer px-6 py-3 rounded-full text-base font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'public'
                ? 'gradient-primary text-white glow-subtle'
                : 'glass-panel-elevated text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF]'
            }`}
          >
            <Globe className="w-4 h-4" />
            {t('groupsPublic')}
          </Badge>
          <Badge
            onClick={() => setActiveTab('private')}
            className={`cursor-pointer px-6 py-3 rounded-full text-base font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'private'
                ? 'gradient-primary text-white glow-subtle'
                : 'glass-panel-elevated text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF]'
            }`}
          >
            <Lock className="w-4 h-4" />
            {t('groupsPrivate')}
          </Badge>
        </div>

        {/* Groups Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {demoGroups[activeTab].map((group) => (
            <div key={group.id} className="glass-panel-elevated rounded-2xl p-6 hover:scale-[1.01] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  {activeTab === 'private' ? (
                    <Lock className="w-5 h-5 text-[#C77DFF]" />
                  ) : (
                    <Globe className="w-5 h-5 text-[#28D17C]" />
                  )}
                  <h3 className="text-xl font-bold text-[#F4F1FF]">{group.name}</h3>
                </div>
                {group.isAdmin && (
                  <Badge className="bg-[#FFB020]/20 text-[#FFB020] border-[#FFB020]/30 flex items-center gap-1 text-xs">
                    <Crown className="w-3 h-3" />
                    {t('groupsAdmin')}
                  </Badge>
                )}
              </div>
              <p className="text-[rgba(244,241,255,0.72)] mb-6 leading-relaxed">{group.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[rgba(244,241,255,0.52)] text-sm">
                  {group.members} {t('groupsMembers')}
                </span>
                <Button className="gradient-primary text-white rounded-lg hover:gradient-primary-hover glow-subtle px-6">
                  {t('groupsJoin')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}