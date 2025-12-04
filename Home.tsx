
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../index';
import { getOrGenerateHeroImage } from '../services/geminiService';
import { Brain, Cpu, BarChart3, ChevronDown, ChevronUp, Star, Plus, X, Rocket, MessageSquare, PenTool } from 'lucide-react';
import { ServiceModal, RatingModal } from '../components/Modals';
import { storageService } from '../services/storageService';
import { Review } from '../types';

export const Home: React.FC = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [heroImage, setHeroImage] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // Welcome Popup State
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Load Hero Image
    getOrGenerateHeroImage().then(setHeroImage);
    // Load Reviews
    setReviews(storageService.getReviews().slice(0, 3));
  }, []);

  const handleWelcomeExplore = () => {
    setShowWelcome(false);
    const element = document.getElementById('landing-services');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // The 3 Landing Services for Demand Tracking
  const services = [
    { 
      id: 'exam_gen', 
      icon: <Brain size={40} className="text-white" />, 
      color: 'bg-primary-500', 
      titleKey: 'srv_landing_1_title', 
      descKey: 'srv_landing_1_desc',
      // Removed direct navigation, setting action to null will trigger "I am Interested" modal
      action: null 
    },
    { 
      id: 'automation', 
      icon: <Cpu size={40} className="text-white" />, 
      color: 'bg-accent-500', 
      titleKey: 'srv_landing_2_title', 
      descKey: 'srv_landing_2_desc',
      action: null // Opens generic interested modal via default behavior
    },
    { 
      id: 'bi', 
      icon: <BarChart3 size={40} className="text-white" />, 
      color: 'bg-purple-600', 
      titleKey: 'srv_landing_3_title', 
      descKey: 'srv_landing_3_desc',
      action: null
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Welcome / Splash Modal */}
      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full text-center relative shadow-2xl border border-gray-100 animate-slideUp">
            <button 
              onClick={() => setShowWelcome(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <Rocket size={40} className="text-primary-600 animate-bounce" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('welcome_title')}</h2>
            <p className="text-xl text-primary-600 font-semibold mb-6">{t('welcome_msg')}</p>
            
            <div className="bg-gray-50 p-4 rounded-xl mb-6 text-sm text-gray-500">
              <p>Explore our top 3 AI solutions designed to revolutionize your business. Vote for your favorite by clicking "I'm Interested"!</p>
            </div>

            <button 
              onClick={handleWelcomeExplore}
              className="w-full bg-primary-800 text-white py-3 rounded-xl font-bold hover:bg-primary-900 transition-transform hover:scale-105 shadow-lg"
            >
              {t('welcome_btn')}
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
           <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white mb-6 border border-white/20 animate-fadeIn">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">{t('saas_badge')}</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
             {t('hero_title')}
           </h1>
           <p className="text-xl text-gray-100 mb-8 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
             {t('hero_subtitle')}
           </p>
           <Link to="/pricing">
             <button className="bg-accent-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-accent-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
               {t('hero_cta')}
             </button>
           </Link>
        </div>
      </section>

      {/* Landing Services Section */}
      <section className="py-24 bg-gray-50" id="landing-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">{t('services_title')}</h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full" />
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              These are our flagship AI innovations. Tell us which one you need the most!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group border border-gray-100">
                <div 
                   onClick={() => s.action ? s.action() : setSelectedService(t(s.titleKey))}
                   className={`${s.color} p-8 flex justify-center items-center h-48 group-hover:scale-105 transition-transform duration-500 cursor-pointer`}
                >
                  {s.icon}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{t(s.titleKey)}</h3>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedService === s.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-600 mb-4">{t(s.descKey)}</p>
                  </div>
                  <div className="flex gap-4 mt-4 items-center justify-between">
                    <button 
                      onClick={() => setExpandedService(expandedService === s.id ? null : s.id)}
                      className="text-gray-500 font-medium flex items-center gap-1 hover:text-gray-700 text-sm"
                    >
                      {t('btn_more')} {expandedService === s.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {s.action ? (
                      <button 
                         onClick={s.action}
                         className="bg-primary-50 text-primary-800 px-6 py-2 rounded-full font-bold text-sm hover:bg-primary-800 hover:text-white transition-all shadow-sm"
                      >
                         Try Now
                      </button>
                    ) : (
                      <button 
                         onClick={() => setSelectedService(t(s.titleKey))}
                         className="bg-primary-50 text-primary-800 px-6 py-2 rounded-full font-bold text-sm hover:bg-primary-800 hover:text-white transition-all shadow-sm"
                      >
                        {t('btn_interested')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-end mb-12">
             <div>
                <h2 className="text-4xl font-bold text-primary-900 mb-2">{t('testimonials_title')}</h2>
                <div className="w-20 h-1 bg-secondary-400 rounded-full" />
             </div>
             <button onClick={() => setShowRatingModal(true)} className="flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800">
               <Plus size={20} /> {t('btn_add_review')}
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.length > 0 ? reviews.map((r) => (
              <div key={r.id} className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < r.rating ? "currentColor" : "none"} className={i < r.rating ? "" : "text-gray-300"} />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{r.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center font-bold text-primary-800">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                    <p className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center text-gray-500 py-10 italic">No reviews yet. Be the first!</div>
            )}
          </div>
        </div>
      </section>

      {/* Modals */}
      <ServiceModal 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        serviceName={selectedService || ''} 
      />
      <RatingModal 
        isOpen={showRatingModal} 
        onClose={() => setShowRatingModal(false)} 
      />
    </div>
  );
};
