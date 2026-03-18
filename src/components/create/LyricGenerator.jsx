import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Loader2, Copy, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '../LanguageContext';

export default function LyricGenerator({ topic, mood, style, language, onGenerated }) {
  const { t } = useLanguage();
  const [customTopic, setCustomTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedLyrics, setGeneratedLyrics] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLyrics = async () => {
    const finalTopic = customTopic || topic || 'freestyle';
    setLoading(true);
    
    try {
      const languageMap = {
        english: 'English',
        hebrew: 'Hebrew',
        mixed: 'mix English and Hebrew'
      };

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate creative diss rap lyrics (8-12 lines) about "${finalTopic}".
Style: ${style}
Mood: ${mood}
Language: ${languageMap[language] || 'English'}

Make it playful, clever, and age-appropriate (12-16). Focus on wordplay and rhythm. No explicit hate or violence.`,
        response_json_schema: {
          type: "object",
          properties: {
            lyrics: { type: "string" }
          }
        }
      });
      
      setGeneratedLyrics(result.lyrics || '');
      if (onGenerated) onGenerated(result.lyrics);
    } catch (error) {
      console.error('Lyric generation error:', error);
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLyrics);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Wand2 className="w-5 h-5 text-[#FF3D9A]" />
        <h3 className="text-lg font-bold text-[#F4F1FF]">AI Lyric Generator</h3>
      </div>

      <Textarea
        value={customTopic}
        onChange={(e) => setCustomTopic(e.target.value)}
        placeholder="Describe what you want to rap about... (or leave empty to use main topic)"
        className="mb-4 h-20"
      />

      <Button
        onClick={generateLyrics}
        disabled={loading}
        className="gradient-primary w-full mb-4"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4 mr-2" />
            Generate Lyrics
          </>
        )}
      </Button>

      {generatedLyrics && (
        <div className="glass-panel-elevated rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[rgba(244,241,255,0.52)] font-semibold">GENERATED</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="text-[rgba(244,241,255,0.72)]"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-[#F4F1FF] whitespace-pre-line leading-relaxed">
            {generatedLyrics}
          </p>
        </div>
      )}
    </div>
  );
}