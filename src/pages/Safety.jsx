import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shield, Flag, AlertTriangle, UserX, CheckCircle } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

const demoBlockedUsers = [
  { id: 1, username: 'user123', blockedDate: '2024-01-15' },
  { id: 2, username: 'spammer99', blockedDate: '2024-01-10' },
  { id: 3, username: 'badactor', blockedDate: '2024-01-05' }
];

export default function Safety() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('report');
  const [reportType, setReportType] = useState('');
  const [details, setDetails] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const reportTypes = [
    { key: 'threats', label: t('safetyReportThreats') },
    { key: 'hate', label: t('safetyReportHate') },
    { key: 'doxxing', label: t('safetyReportDoxxing') },
    { key: 'sexual', label: t('safetyReportSexual') },
    { key: 'spam', label: t('safetyReportSpam') },
    { key: 'other', label: t('safetyReportOther') }
  ];

  const handleSubmitReport = () => {
    setShowSuccess(true);
    setReportType('');
    setDetails('');
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen py-8 px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-8 h-8 text-[#28D17C]" />
            <h1 className="text-4xl font-black text-[#F4F1FF] tracking-tight">{t('safetyTitle')}</h1>
          </div>
          <p className="text-[rgba(244,241,255,0.72)] text-lg">{t('safetySubtitle')}</p>
        </div>

        {/* Tab Pills */}
        <div className="flex gap-2 mb-8">
          <Badge
            onClick={() => setActiveTab('report')}
            className={`cursor-pointer px-6 py-3 rounded-full text-base font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'report'
                ? 'gradient-primary text-white glow-subtle'
                : 'glass-panel-elevated text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF]'
            }`}
          >
            <Flag className="w-4 h-4" />
            {t('safetyReport')}
          </Badge>
          <Badge
            onClick={() => setActiveTab('blocked')}
            className={`cursor-pointer px-6 py-3 rounded-full text-base font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'blocked'
                ? 'gradient-primary text-white glow-subtle'
                : 'glass-panel-elevated text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF]'
            }`}
          >
            <UserX className="w-4 h-4" />
            {t('safetyBlocked')}
          </Badge>
        </div>

        {/* Report Tab */}
        {activeTab === 'report' && (
          <div className="space-y-6">
            {showSuccess && (
              <div className="glass-panel-elevated rounded-2xl p-6 border-2 border-[#28D17C]/50">
                <div className="flex items-center gap-3 text-[#28D17C]">
                  <CheckCircle className="w-6 h-6" />
                  <p className="text-[#F4F1FF]">{t('safetySuccess')}</p>
                </div>
              </div>
            )}

            <div className="glass-panel-elevated rounded-2xl p-8">
              <div className="bg-[#FFB020]/10 border border-[#FFB020]/30 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#FFB020] flex-shrink-0 mt-0.5" />
                  <p className="text-[rgba(244,241,255,0.72)] leading-relaxed text-sm">
                    {t('safetyImportant')}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[#F4F1FF] font-semibold mb-3 text-sm">
                    {t('safetyReportType')}
                  </label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="bg-[#0B0712] border-[rgba(255,255,255,0.08)] text-[#F4F1FF] rounded-xl py-6">
                      <SelectValue placeholder={t('safetyReportType')} />
                    </SelectTrigger>
                    <SelectContent className="glass-panel-elevated border-[rgba(255,255,255,0.12)]">
                      {reportTypes.map((type) => (
                        <SelectItem key={type.key} value={type.key} className="text-[#F4F1FF]">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-[#F4F1FF] font-semibold mb-3 text-sm">
                    {t('safetyDetails')}
                  </label>
                  <Textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder={t('safetyDetailsPlaceholder')}
                    className="min-h-32 bg-[#0B0712] border-[rgba(255,255,255,0.08)] text-[#F4F1FF] placeholder:text-[rgba(244,241,255,0.32)] rounded-xl resize-none focus:border-[#C77DFF]"
                  />
                </div>

                <Button
                  onClick={handleSubmitReport}
                  disabled={!reportType || !details}
                  className={`w-full py-6 text-base font-bold rounded-xl ${
                    reportType && details
                      ? 'gradient-primary text-white glow-primary hover:gradient-primary-hover'
                      : 'glass-panel text-[rgba(244,241,255,0.32)] cursor-not-allowed'
                  }`}
                >
                  <Flag className="w-5 h-5 mr-2" />
                  {t('safetySubmit')}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Blocked Users Tab */}
        {activeTab === 'blocked' && (
          <div className="space-y-4">
            {demoBlockedUsers.length > 0 ? (
              demoBlockedUsers.map((user) => (
                <div key={user.id} className="glass-panel-elevated rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#C77DFF]/20 to-[#FF3D9A]/20 rounded-xl flex items-center justify-center">
                        <UserX className="w-6 h-6 text-[rgba(244,241,255,0.52)]" />
                      </div>
                      <div>
                        <p className="text-[#F4F1FF] font-semibold text-lg">@{user.username}</p>
                        <p className="text-sm text-[rgba(244,241,255,0.52)]">Blocked on {user.blockedDate}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="glass-panel text-[rgba(244,241,255,0.72)] hover:text-[#F4F1FF] border-[rgba(255,255,255,0.08)] rounded-lg px-6"
                    >
                      {t('safetyUnblock')}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-panel-elevated rounded-2xl p-12 text-center">
                <p className="text-[rgba(244,241,255,0.52)]">{t('safetyNoBlocked')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}