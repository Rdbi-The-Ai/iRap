import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

const planFeatures = {
  free: [
    '10 tracks per day',
    'Basic rap styles',
    'Standard beats',
    'Community access',
    'Basic presets'
  ],
  premium: [
    '50 tracks per day',
    'All rap styles',
    'Premium beats library',
    'Priority support',
    'Advanced presets',
    'Battle participation',
    'Group creation'
  ],
  pro: [
    'Unlimited tracks',
    'All features unlocked',
    'Exclusive beats',
    '24/7 priority support',
    'Custom preset creation',
    'Tournament hosting',
    'Early feature access',
    'Ad-free experience'
  ]
};

const plans = [
  {
    id: 'free',
    icon: Sparkles,
    price: 0,
    gradient: 'from-[#C77DFF]/20 to-[#FF3D9A]/20'
  },
  {
    id: 'premium',
    icon: Zap,
    price: 9.99,
    gradient: 'from-[#C77DFF] to-[#FF3D9A]',
    popular: true
  },
  {
    id: 'pro',
    icon: Crown,
    price: 19.99,
    gradient: 'from-[#FFB020] to-[#FF3D9A]'
  }
];

export default function Plans() {
  const { t } = useLanguage();
  const [currentPlan, setCurrentPlan] = useState('free');

  return (
    <div className="min-h-screen py-8 px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-[#F4F1FF] mb-4 tracking-tight">
            {t('plansTitle')}
          </h1>
          <p className="text-xl text-[rgba(244,241,255,0.72)] max-w-2xl mx-auto">
            {t('plansSubtitle')}
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrent = currentPlan === plan.id;
            
            return (
              <div 
                key={plan.id}
                className={`glass-panel-elevated rounded-3xl p-8 relative transition-all ${
                  plan.popular ? 'scale-105 border-2 border-[#C77DFF]/50 glow-subtle' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 gradient-primary text-white px-4 py-1.5 rounded-full text-xs font-bold">
                    {t('plansPopular')}
                  </Badge>
                )}
                
                <div className={`w-20 h-20 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto ${
                  plan.id !== 'free' ? 'glow-subtle' : ''
                }`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-black text-[#F4F1FF] text-center mb-6">
                  {t(`plans${plan.id.charAt(0).toUpperCase() + plan.id.slice(1)}`)}
                </h2>
                
                <div className="text-center mb-8">
                  <span className="text-5xl font-black text-[#F4F1FF]">
                    ${plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-[rgba(244,241,255,0.52)] ml-2">{t('plansPerMonth')}</span>
                  )}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {planFeatures[plan.id].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#28D17C] flex-shrink-0 mt-0.5" />
                      <span className="text-[rgba(244,241,255,0.72)] leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full py-6 rounded-xl text-base font-bold transition-all ${
                    isCurrent
                      ? 'glass-panel text-[rgba(244,241,255,0.52)] cursor-not-allowed'
                      : plan.id !== 'free'
                      ? 'gradient-primary text-white glow-primary hover:gradient-primary-hover'
                      : 'glass-panel-elevated text-[#F4F1FF] hover:glass-panel'
                  }`}
                  disabled={isCurrent}
                >
                  {isCurrent ? t('plansCurrent') : t('plansSubscribe')}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}