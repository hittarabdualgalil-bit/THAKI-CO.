
import React, { useState } from 'react';
import { useLanguage } from '../index';
import { Calendar, Wand2, Sparkles, Globe, Smartphone, Brain, Bot, HelpCircle, DollarSign, ArrowRight, ArrowLeft, CheckCircle, PartyPopper } from 'lucide-react';
import { storageService } from '../services/storageService';

export const Demo: React.FC = () => {
  const { t, dir } = useLanguage();
  const [booked, setBooked] = useState(false);

  // Dream Service State (Simplified to single step)
  const [dreamData, setDreamData] = useState({
    serviceTitle: '',
    projectType: 'Website',
    budget: '$1,000 - $5,000',
    timeline: '1-3 Months',
    details: '',
    name: '',
    email: '',
    phone: ''
  });
  const [dreamSuccess, setDreamSuccess] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  const handleDreamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.addInterest({
      id: Date.now().toString(),
      serviceName: dreamData.serviceTitle,
      customerName: dreamData.name,
      email: dreamData.email,
      phone: dreamData.phone,
      date: new Date().toISOString(),
      type: 'dream',
      details: dreamData.details,
      projectType: dreamData.projectType,
      budget: dreamData.budget,
      timeline: dreamData.timeline
    });
    setDreamSuccess(true);
  };

  const projectTypes = [
    { id: 'Website', icon: Globe, label: 'Website' },
    { id: 'Mobile App', icon: Smartphone, label: 'App' },
    { id: 'AI Solution', icon: Brain, label: 'AI Tool' },
    { id: 'Automation', icon: Bot, label: 'Automation' },
    { id: 'Other', icon: HelpCircle, label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Left Column: Booking Section */}
          <div>
            <div className="inline-flex items-center gap-2 text-primary-600 font-bold mb-4 bg-primary-50 px-4 py-1 rounded-full">
               <Calendar size={18} /> {t('nav_demo')}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{t('demo_title')}</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Schedule a live walkthrough with our experts to see how Thaki can transform your business processes.
            </p>
            
            {booked ? (
              <div className="bg-green-50 p-8 rounded-2xl border border-green-100 text-center animate-fadeIn">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <CheckCircle size={32} />
                 </div>
                 <h3 className="text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h3>
                 <p className="text-green-700">We will contact you shortly to confirm the details.</p>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-6 bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                     <input required type="date" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                     <input required type="time" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                   <input required type="email" placeholder="you@company.com" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <button type="submit" className="w-full bg-primary-800 text-white py-4 rounded-xl font-bold hover:bg-primary-900 shadow-lg transition-transform hover:-translate-y-1">
                  Confirm Booking
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Embedded Dream Service Wizard (Now Single Step) */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 relative overflow-hidden flex flex-col">
             {/* Header */}
             <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
                  <Sparkles size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{t('dream_service')}</h2>
                  <p className="text-sm text-gray-500">Build your custom AI solution today</p>
                </div>
             </div>

             {dreamSuccess ? (
               <div className="flex-1 flex flex-col items-center justify-center text-center animate-fadeIn py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <PartyPopper className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-bold text-2xl text-gray-900 mb-2">{t('modal_success')}</h3>
                  <p className="text-gray-500 mb-8">Your request has been received. Our team will analyze it and get back to you.</p>
                  <button 
                    onClick={() => { setDreamSuccess(false); setDreamData({...dreamData, serviceTitle: ''}); }}
                    className="text-primary-600 font-bold hover:underline"
                  >
                    Submit another request
                  </button>
               </div>
             ) : (
               <form onSubmit={handleDreamSubmit} className="flex-1 flex flex-col">
                 
                 <div className="space-y-5 animate-fadeIn flex-1 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                      {/* Project Info */}
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{t('form_service_title')}</label>
                        <input 
                          required 
                          type="text" 
                          placeholder="e.g. Automated Inventory System" 
                          className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" 
                          value={dreamData.serviceTitle} 
                          onChange={e => setDreamData({...dreamData, serviceTitle: e.target.value})} 
                        />
                      </div>

                      <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{t('lbl_project_type')}</label>
                          <div className="grid grid-cols-5 gap-2">
                            {projectTypes.map(type => (
                              <div 
                                key={type.id}
                                onClick={() => setDreamData({...dreamData, projectType: type.id})}
                                className={`cursor-pointer rounded-xl p-2 flex flex-col items-center justify-center gap-1 border transition-all ${dreamData.projectType === type.id ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 hover:bg-gray-50 text-gray-400'}`}
                              >
                                 <type.icon size={18} />
                                 <span className="text-[10px] font-bold">{type.label}</span>
                              </div>
                            ))}
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{t('lbl_budget')}</label>
                            <select className="w-full border border-gray-200 rounded-xl p-3 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm" value={dreamData.budget} onChange={e => setDreamData({...dreamData, budget: e.target.value})}>
                                <option value="< $1,000">{'< $1,000'}</option>
                                <option value="$1,000 - $5,000">$1k - $5k</option>
                                <option value="$5,000 - $10,000">$5k - $10k</option>
                                <option value="$10,000+">$10k+</option>
                            </select>
                         </div>
                         <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{t('lbl_timeline')}</label>
                            <select className="w-full border border-gray-200 rounded-xl p-3 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm" value={dreamData.timeline} onChange={e => setDreamData({...dreamData, timeline: e.target.value})}>
                                <option value="< 1 Month">{'< 1 Month'}</option>
                                <option value="1-3 Months">1-3 M</option>
                                <option value="3-6 Months">3-6 M</option>
                                <option value="6+ Months">6+ M</option>
                            </select>
                         </div>
                      </div>

                      <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{t('form_details')}</label>
                         <textarea 
                            required 
                            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px] text-sm" 
                            rows={3} 
                            value={dreamData.details} 
                            onChange={e => setDreamData({...dreamData, details: e.target.value})} 
                            placeholder="Describe your vision..." 
                         />
                      </div>

                      <div className="border-t border-gray-100 pt-4 mt-4">
                        <h4 className="font-bold text-sm text-gray-900 mb-3">Contact Details</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{t('form_name')}</label>
                                <input required type="text" className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" value={dreamData.name} onChange={e => setDreamData({...dreamData, name: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{t('form_email')}</label>
                                <input required type="email" className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" value={dreamData.email} onChange={e => setDreamData({...dreamData, email: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{t('form_phone')}</label>
                                <input required type="tel" className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" value={dreamData.phone} onChange={e => setDreamData({...dreamData, phone: e.target.value})} />
                            </div>
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 mt-4"
                      >
                        {t('btn_submit')} <PartyPopper size={18} />
                      </button>
                   </div>
               </form>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};
