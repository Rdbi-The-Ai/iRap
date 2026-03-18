import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings as SettingsIcon, Globe, Bell, Shield, User } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

export default function Settings() {
  const { language, changeLanguage, t } = useLanguage();
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [battleReminders, setBattleReminders] = useState(true);
  const [newFollowers, setNewFollowers] = useState(false);
  const [allowMessages, setAllowMessages] = useState(true);
  const [showActivity, setShowActivity] = useState(true);

  return (
    <div className="min-h-screen py-8 px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <SettingsIcon className="w-8 h-8 text-[#4DE8FF]" />
            <h1 className="text-4xl font-black text-[#F4F1FF] tracking-tight">{t('settingsTitle')}</h1>
          </div>
          <p className="text-[rgba(244,241,255,0.72)] text-lg">{t('settingsSubtitle')}</p>
        </div>

        <div className="space-y-6">
          {/* Language & Region */}
          <div className="glass-panel-elevated rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-[#C77DFF]" />
              <h3 className="text-xl font-bold text-[#F4F1FF]">{t('settingsLanguage')}</h3>
            </div>
            <div>
              <label className="block text-[rgba(244,241,255,0.72)] text-sm mb-3 font-medium">
                {t('settingsUILanguage')}
              </label>
              <Select value={language} onValueChange={changeLanguage}>
                <SelectTrigger className="bg-[#0B0712] border-[rgba(255,255,255,0.08)] text-[#F4F1FF] rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-panel-elevated border-[rgba(255,255,255,0.12)]">
                  <SelectItem value="EN" className="text-[#F4F1FF]">English</SelectItem>
                  <SelectItem value="HE" className="text-[#F4F1FF]">עברית (Hebrew)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-panel-elevated rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-[#C77DFF]" />
              <h3 className="text-xl font-bold text-[#F4F1FF]">{t('settingsNotifications')}</h3>
            </div>
            <div className="space-y-5">
              <div className="flex items-center justify-between py-2">
                <label className="text-[rgba(244,241,255,0.72)] font-medium">{t('settingsEmailNotif')}</label>
                <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
              </div>
              <div className="flex items-center justify-between py-2">
                <label className="text-[rgba(244,241,255,0.72)] font-medium">{t('settingsPushNotif')}</label>
                <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
              </div>
              <div className="flex items-center justify-between py-2">
                <label className="text-[rgba(244,241,255,0.72)] font-medium">{t('settingsBattleReminders')}</label>
                <Switch checked={battleReminders} onCheckedChange={setBattleReminders} />
              </div>
              <div className="flex items-center justify-between py-2">
                <label className="text-[rgba(244,241,255,0.72)] font-medium">{t('settingsNewFollowers')}</label>
                <Switch checked={newFollowers} onCheckedChange={setNewFollowers} />
              </div>
            </div>
          </div>

          {/* Privacy & Safety */}
          <div className="glass-panel-elevated rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-[#28D17C]" />
              <h3 className="text-xl font-bold text-[#F4F1FF]">{t('settingsPrivacy')}</h3>
            </div>
            <div className="space-y-5">
              <div className="flex items-center justify-between py-2">
                <label className="text-[rgba(244,241,255,0.72)] font-medium">{t('settingsAllowMessages')}</label>
                <Switch checked={allowMessages} onCheckedChange={setAllowMessages} />
              </div>
              <div className="flex items-center justify-between py-2">
                <label className="text-[rgba(244,241,255,0.72)] font-medium">{t('settingsShowActivity')}</label>
                <Switch checked={showActivity} onCheckedChange={setShowActivity} />
              </div>
            </div>
          </div>

          {/* Account */}
          <div className="glass-panel-elevated rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-[#C77DFF]" />
              <h3 className="text-xl font-bold text-[#F4F1FF]">{t('settingsAccount')}</h3>
            </div>
            <div className="flex items-center justify-between py-2">
              <label className="text-[rgba(244,241,255,0.72)] font-medium">{t('settingsAccountType')}</label>
              <span className="glass-panel text-[rgba(244,241,255,0.72)] px-4 py-2 rounded-full text-sm font-semibold">
                {t('settingsFree')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}