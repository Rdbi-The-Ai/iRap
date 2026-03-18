import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Loader2, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '../LanguageContext';

export default function RhymeSuggestions({ onSelectWord }) {
  const { t } = useLanguage();
  const [word, setWord] = useState('');
  const [rhymes, setRhymes] = useState([]);
  const [loading, setLoading] = useState(false);

  const findRhymes = async () => {
    if (!word.trim()) return;
    
    setLoading(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate 12 words that rhyme with "${word}" suitable for rap lyrics. Include slang and creative variations. Return as a simple array of words.`,
        response_json_schema: {
          type: "object",
          properties: {
            rhymes: { type: "array", items: { type: "string" } }
          }
        }
      });
      setRhymes(result.rhymes || []);
    } catch (error) {
      console.error('Rhyme generation error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="flex gap-2 mb-4">
        <Input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word..."
          className="flex-1 text-[#F4F1FF]"
          onKeyPress={(e) => e.key === 'Enter' && findRhymes()}
        />
        <Button 
          onClick={findRhymes}
          disabled={loading || !word.trim()}
          className="gradient-primary"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Find'}
        </Button>
      </div>

      {rhymes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[rgba(244,241,255,0.52)]">{rhymes.length} rhymes</span>
            <button
              onClick={() => setRhymes([])}
              className="text-xs text-[rgba(244,241,255,0.52)] hover:text-[#F4F1FF] transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {rhymes.map((rhyme, i) => (
              <button
                key={i}
                onClick={() => onSelectWord(rhyme)}
                className="glass-panel px-3 py-2 rounded-lg text-sm text-[#F4F1FF] hover:glass-panel-elevated transition-all"
              >
                {rhyme}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}