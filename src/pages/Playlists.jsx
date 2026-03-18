import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Music, Plus, Play, MoreVertical } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

const demoPlaylists = [
  { id: 1, name: 'My Favorites', tracks: 24, gradient: 'from-[#C77DFF] to-[#FF3D9A]' },
  { id: 2, name: 'Battle Ready', tracks: 15, gradient: 'from-[#FF3D9A] to-[#FFB020]' },
  { id: 3, name: 'Chill Vibes', tracks: 31, gradient: 'from-[#4DE8FF] to-[#C77DFF]' },
  { id: 4, name: 'Workout Mix', tracks: 18, gradient: 'from-[#28D17C] to-[#4DE8FF]' },
  { id: 5, name: 'Late Night', tracks: 22, gradient: 'from-[#C77DFF] to-[#4DE8FF]' },
  { id: 6, name: 'Best Disses', tracks: 12, gradient: 'from-[#FF3D9A] to-[#C77DFF]' }
];

export default function Playlists() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-8 px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Music className="w-8 h-8 text-[#C77DFF]" />
              <h1 className="text-4xl font-black text-[#F4F1FF] tracking-tight">{t('playlistsTitle')}</h1>
            </div>
            <p className="text-[rgba(244,241,255,0.72)] text-lg">{t('playlistsSubtitle')}</p>
          </div>
          <Button className="gradient-primary text-white glow-subtle hover:gradient-primary-hover rounded-xl px-6 py-3">
            <Plus className="w-5 h-5 mr-2" />
            {t('playlistsCreate')}
          </Button>
        </div>

        {/* Playlists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoPlaylists.map((playlist) => (
            <div key={playlist.id} className="glass-panel-elevated rounded-2xl p-6 hover:scale-[1.02] transition-all group cursor-pointer">
              <div className={`bg-gradient-to-br ${playlist.gradient} rounded-xl h-48 mb-6 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform`}>
                <Music className="w-16 h-16 text-white/20 absolute" />
                <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              </div>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-[#F4F1FF]">{playlist.name}</h3>
                <Button size="icon" variant="ghost" className="text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF] hover:bg-[rgba(255,255,255,0.05)] rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
              <Badge variant="outline" className="border-[rgba(255,255,255,0.12)] text-[rgba(244,241,255,0.72)] bg-[rgba(255,255,255,0.03)] rounded-full">
                {playlist.tracks} {t('playlistsTracks')}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}