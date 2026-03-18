import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { useLanguage } from '../components/LanguageContext';
import { 
  Play, Star, TrendingUp, Music, Mic2, Swords
} from 'lucide-react';

const demoPlaylists = [
  { id: 1, title: 'Fire Disses 🔥', creator: 'iRap', plays: '45.2K', tracks: 24 },
  { id: 2, title: 'Chill Roasts', creator: 'MC Flow', plays: '32.8K', tracks: 18 },
  { id: 3, title: 'Battle Ready', creator: 'VerseKing', plays: '28.5K', tracks: 15 },
  { id: 4, title: 'Clever Lines', creator: 'RapQueen', plays: '22.1K', tracks: 12 },
  { id: 5, title: 'Wordplay Central', creator: 'FlowMaster', plays: '19.4K', tracks: 16 }
];

const demoTikTok = [
  { id: 1, title: 'Comeback King', artist: 'MC Flow', views: '2.1M', rating: 4.8, thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80' },
  { id: 2, title: 'Wordplay Wizard', artist: 'LilWordz', views: '1.8M', rating: 4.9, thumbnail: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&q=80' },
  { id: 3, title: 'Rhythm Roaster', artist: 'FlowMaster', views: '1.5M', rating: 4.7, thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&q=80' },
  { id: 4, title: 'Battle Master', artist: 'RapQueen', views: '1.3M', rating: 4.6, thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80' },
  { id: 5, title: 'Savage Lines', artist: 'VerseKing', views: '1.1M', rating: 4.5, thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80' }
];

export default function Dashboard() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0712]">
      <div className="px-6 lg:px-8 py-8 space-y-12 max-w-[1400px] mx-auto">
        {/* Top Primary Action Zones */}
        <section className="grid lg:grid-cols-2 gap-6">
          {/* Diss Creation Zone */}
          <div
            onClick={() => navigate(createPageUrl('Create'))}
            className="relative h-64 lg:h-80 rounded-2xl overflow-hidden cursor-pointer group transition-all"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(199, 125, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="absolute inset-0">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6974a37cd4253c840929d02d/ff615b099_ron_ai_A_realistic_high-energy_hero_image_showing_a_FUN_diss_ra_8c6c68e9-a496-463e-a0e8-78d2e9202b69.png"
                alt="Create diss"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0712] via-[#0B0712]/85 to-[#0B0712]/40"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <Mic2 className="w-8 h-8 text-[#C77DFF] mb-4" strokeWidth={1.5} />
              <h2 className="text-[#F4F1FF] mb-2" style={{ fontSize: '24px', fontWeight: 600 }}>
                {language === 'HE' ? 'צרו דיס חדש' : 'Create a Diss'}
              </h2>
              <p className="text-[rgba(244,241,255,0.72)]" style={{ fontSize: '14px', fontWeight: 400 }}>
                {language === 'HE' ? 'הפכו מילים למוזיקה תוך שניות' : 'Turn words into music in seconds'}
              </p>
            </div>
          </div>

          {/* Online Battles Zone */}
          <div
            onClick={() => navigate(createPageUrl('Battles'))}
            className="relative h-64 lg:h-80 rounded-2xl overflow-hidden cursor-pointer group transition-all"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 61, 154, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80"
                alt="Online battles"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0712] via-[#0B0712]/85 to-[#0B0712]/40"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <Swords className="w-8 h-8 text-[#FF3D9A] mb-4" strokeWidth={1.5} />
              <h2 className="text-[#F4F1FF] mb-2" style={{ fontSize: '24px', fontWeight: 600 }}>
                {language === 'HE' ? 'קרבות אונליין' : 'Online Battles'}
              </h2>
              <p className="text-[rgba(244,241,255,0.72)]" style={{ fontSize: '14px', fontWeight: 400 }}>
                {language === 'HE' ? 'התחרו בזמן אמת עם אמנים' : 'Compete live with other artists'}
              </p>
            </div>
          </div>
        </section>

        {/* Most Played Playlists */}
        <section>
          <h2 className="text-[#F4F1FF] mb-5" style={{ fontSize: '21px', fontWeight: 500 }}>
            {language === 'HE' ? 'הפלייליסטים הנצפים ביותר' : 'Most Played Playlists'}
          </h2>

          <div className="space-y-2">
            {demoPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                onClick={() => navigate(createPageUrl('Playlists'))}
                className="rounded-xl p-4 cursor-pointer transition-all flex items-center gap-4"
                style={{
                  background: 'rgba(26, 15, 44, 0.5)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(26, 15, 44, 0.65)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(26, 15, 44, 0.5)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#C77DFF]/20 to-[#FF3D9A]/20 flex items-center justify-center flex-shrink-0" style={{ border: '1px solid rgba(199, 125, 255, 0.2)' }}>
                  <Music className="w-5 h-5 text-[#C77DFF]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#F4F1FF] truncate" style={{ fontSize: '15px', fontWeight: 500 }}>{playlist.title}</h3>
                  <p className="text-[rgba(244,241,255,0.65)]" style={{ fontSize: '13px' }}>
                    {playlist.tracks} {language === 'HE' ? 'רצועות' : 'tracks'} · {playlist.plays} {language === 'HE' ? 'השמעות' : 'plays'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Most Viewed on TikTok */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <h2 className="text-[#F4F1FF]" style={{ fontSize: '21px', fontWeight: 500 }}>
                {language === 'HE' ? 'הנצפים ביותר ב-TikTok' : 'Most Viewed on TikTok'}
              </h2>
              <TrendingUp className="w-4 h-4 text-[#4DE8FF]" strokeWidth={1.5} />
            </div>
          </div>

          <div 
            className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6 lg:mx-0 lg:px-0" 
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
          >
            {demoTikTok.map((video) => (
              <div
                key={video.id}
                className="flex-shrink-0 w-44 cursor-pointer group snap-center"
                onClick={() => {
                  // TODO: Open TikTok-style viewer modal
                }}
              >
                {/* Vertical Video Card (9:16) */}
                <div 
                  className="relative rounded-2xl overflow-hidden transition-transform"
                  style={{
                    aspectRatio: '9/16',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {/* Video Thumbnail */}
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Dark Gradient Overlay (bottom) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" fill="white" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  {/* Metadata Overlay (bottom) */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1">
                    <p className="text-white font-medium truncate" style={{ fontSize: '14px' }}>
                      {video.title}
                    </p>
                    <p className="text-white/70" style={{ fontSize: '12px' }}>
                      @{video.artist}
                    </p>
                    <div className="flex items-center justify-between text-white/60" style={{ fontSize: '11px' }}>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" strokeWidth={1.5} fill="white" /> {video.rating}
                      </span>
                      <span>{video.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}