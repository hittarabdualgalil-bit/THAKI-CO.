import React from 'react';
import { useLanguage } from '../index';
import { Target, Lightbulb, ShieldCheck, Users, CircuitBoard } from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-primary-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <CircuitBoard className="w-full h-full text-white/10 absolute -right-20 -top-20 scale-150" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('nav_about')} THAKI</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">{t('footer_desc')}</p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-50 p-10 rounded-3xl relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-bl-full opacity-50 transition-transform group-hover:scale-110" />
            <Target className="w-12 h-12 text-primary-600 mb-6 relative z-10" />
            <h2 className="text-3xl font-bold mb-4 text-primary-900">{t('about_mission')}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              To empower businesses and educational institutions in the MENA region with cutting-edge, accessible AI tools that drive productivity and innovation.
            </p>
          </div>
          <div className="bg-gray-50 p-10 rounded-3xl relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-100 rounded-bl-full opacity-50 transition-transform group-hover:scale-110" />
            <Lightbulb className="w-12 h-12 text-secondary-500 mb-6 relative z-10" />
            <h2 className="text-3xl font-bold mb-4 text-primary-900">{t('about_vision')}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              To be the leading AI ecosystem in Yemen and beyond, bridging the gap between traditional workflows and the future of intelligent automation.
            </p>
          </div>
        </div>
      </div>

      {/* Story & USPs */}
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl font-bold mb-8 text-secondary-400">{t('about_story')}</h2>
                    <p className="text-gray-300 leading-loose text-lg mb-6">
                        Founded in Taiz, THAKI emerged from a desire to solve local challenges with global technology. We started as a small team of passionate engineers and grew into a robust platform serving hundreds of users.
                    </p>
                    <div className="grid grid-cols-1 gap-6 mt-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/10 rounded-lg"><CircuitBoard size={24} className="text-accent-500" /></div>
                            <span className="font-bold text-xl">100% Arab Identity</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/10 rounded-lg"><ShieldCheck size={24} className="text-green-400" /></div>
                            <span className="font-bold text-xl">Enterprise Grade Security</span>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 border-2 border-secondary-500 transform rotate-6 rounded-2xl" />
                    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Team" className="rounded-2xl relative z-10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
            </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold text-primary-900 mb-12">{t('team_title')}</h2>
        <div className="flex justify-center">
             <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-xs w-full hover:-translate-y-2 transition-transform">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-primary-500">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bilal&backgroundColor=b6e3f4" alt="Founder" />
                </div>
                <h3 className="text-xl font-bold text-primary-900">Dr. Bilal Al-Sameai</h3>
                <p className="text-secondary-500 font-semibold mb-4">Founder & CEO</p>
                <div className="flex justify-center gap-4 text-gray-400">
                   <Users size={18} />
                   <span className="text-sm">AI Research & Strategy</span>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};