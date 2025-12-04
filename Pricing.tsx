
import React, { useState } from 'react';
import { useLanguage } from '../index';
import { PaymentModal, SubscriptionSuccessModal } from '../components/Modals';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Pricing: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showFreeSuccess, setShowFreeSuccess] = useState(false);

  const plans = [
    {
      id: 'free',
      name: t('plan_free'),
      price: '$0',
      features: ['5 Exam Generations/mo', 'Basic Support', 'Community Access'],
      cta: t('btn_subscribe'),
      primary: false
    },
    {
      id: 'pro',
      name: t('plan_pro'),
      price: '$29',
      features: ['Unlimited Exams', 'Priority Support', 'API Access', 'Custom Branding'],
      cta: t('btn_subscribe'),
      primary: true
    },
    {
      id: 'enterprise',
      name: t('plan_enterprise'),
      price: 'Custom',
      features: ['Dedicated Server', '24/7 Phone Support', 'On-premise Deployment', 'Training'],
      cta: t('nav_contact'),
      primary: false
    }
  ];

  const handlePlanClick = (planId: string) => {
    if (planId === 'enterprise') {
      navigate('/contact?type=sales');
    } else if (planId === 'pro') {
      setSelectedPlan('pro');
    } else {
      // Show success modal for free plan
      setShowFreeSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('pricing_title')}</h1>
        <p className="text-gray-600 text-lg">Choose the perfect plan for your needs</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className={`relative bg-white rounded-3xl p-8 shadow-xl transition-transform hover:-translate-y-2 ${plan.primary ? 'border-2 border-primary-500 ring-4 ring-primary-100 scale-105 z-10' : 'border border-gray-100'}`}>
            {plan.primary && (
               <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                 Most Popular
               </div>
            )}
            <h3 className="text-xl font-bold text-gray-500 mb-4">{plan.name}</h3>
            <div className="text-4xl font-bold text-gray-900 mb-8">{plan.price}<span className="text-lg text-gray-400 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                    <Check size={12} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handlePlanClick(plan.id)}
              className={`w-full py-3 rounded-xl font-bold transition-colors ${plan.primary ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <PaymentModal 
        isOpen={!!selectedPlan} 
        onClose={() => setSelectedPlan(null)} 
        plan={selectedPlan || ''} 
      />
      
      <SubscriptionSuccessModal
        isOpen={showFreeSuccess}
        onClose={() => setShowFreeSuccess(false)}
        planName={t('plan_free')}
      />
    </div>
  );
};
