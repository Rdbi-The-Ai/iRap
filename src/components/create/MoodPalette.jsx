import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Palette, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '../LanguageContext';

export default function MoodPalette({ mood, onSelectWord }) {
  const { t } = useLanguage();
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

  const moodDescriptions = {
    aggressive: 'hard-hitting, powerful, intense',
    confident: 'bold, strong, self-assured',
    playful: 'fun, clever, witty',
    smooth: 'chill, laid-back, cool',
    intense: 'fierce, passionate, energetic',
    chill: 'relaxed, easy-going, smooth'
  };

  const loadMoodWords = async () => {
    setLoading(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate 16 words and short phrases perfect for ${mood} rap lyrics. Theme: ${moodDescriptions[mood] || mood}. Include adjectives, verbs, and slang that capture this mood. Make them punchy and suitable for ages 12-16.`,
        response_json_schema: {
          type: "object",
          properties: {
            words: { type: "array", items: { type: "string" } }
          }
        }
      });
      setWords(result.words || []);
    } catch (error) {
      console.error('Mood palette error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#4DE8FF]" />
          <h3 className="text-lg font-bold text-[#F4F1FF]">Mood Palette</h3>
        </div>
        {words.length === 0 && (
          <Button
            onClick={loadMoodWords}
            disabled={loading}
            size="sm"
            className="gradient-primary"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Load'}
          </Button>
        )}
      </div>

      {words.length > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[rgba(244,241,255,0.52)] font-semibold uppercase">
              {mood} vibes
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={loadMoodWords}
              className="text-xs text-[rgba(244,241,255,0.52)]"
            >
              Refresh
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {words.map((word, i) => (
              <button
                key={i}
                onClick={() => onSelectWord(word)}
                className="glass-panel px-3 py-2 rounded-lg text-sm text-[#F4F1FF] hover:glass-panel-elevated transition-all"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-[rgba(244,241,255,0.52)] text-sm text-center py-4">
          Click Load to get {mood} words
        </p>
      )}
    </div>
  );
}