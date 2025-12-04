
import React, { useState } from 'react';
import { useLanguage } from '../index';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { storageService } from '../services/storageService';

export const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const typeParam = searchParams.get('type') || 'general';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: typeParam,
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.addMessage({
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      type: formData.type,
      message: formData.message,
      date: new Date().toISOString()
    });
    setSuccess(true);
    setFormData({ name: '', email: '', type: 'general', message: '' });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
       <div className="bg-primary-900 text-white py-16 text-center">
         <h1 className="text-4xl font-bold">{t('contact_title')}</h1>
       </div>
       
       <div className="max-w-7xl mx-auto px-4 -mt-10 pb-20">
         <div className="grid md:grid-cols-3 gap-8">
           {/* Info Cards */}
           <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
             <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4"><MapPin /></div>
             <h3 className="font-bold text-gray-900 mb-2">Visit Us</h3>
             <p className="text-gray-500">{CONTACT_INFO.address[language]}</p>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
             <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4"><Phone /></div>
             <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
             <p className="text-gray-500 dir-ltr">{CONTACT_INFO.phone}</p>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
             <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4"><Mail /></div>
             <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
             <p className="text-gray-500">{CONTACT_INFO.email}</p>
           </div>
         </div>

         <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
               {success ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 animate-fadeIn text-center p-6">
                    <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('modal_success')}</h3>
                    <p className="text-gray-500">We will get back to you shortly.</p>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">{t('form_name')}</label>
                       <input required className="w-full border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                       <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary-500">
                         <option value="general">General Inquiry</option>
                         <option value="sales">Sales / Enterprise</option>
                         <option value="support">Support</option>
                       </select>
                     </div>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('form_email')}</label>
                      <input required type="email" className="w-full border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary-500" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('form_msg')}</label>
                      <textarea required rows={4} className="w-full border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary-500" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                   </div>
                   <button type="submit" className="w-full bg-primary-800 text-white py-4 rounded-xl font-bold hover:bg-primary-900 transition-colors shadow-lg">{t('form_send')}</button>
                 </form>
               )}
            </div>

            {/* Map */}
            <div className="bg-gray-200 rounded-2xl overflow-hidden h-96 md:h-auto shadow-sm border border-gray-100">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.516568393845!2d44.01168537591465!3d13.582888286815344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1618305609460a5f%3A0xc399f99723023e19!2sTaiz%2C%20Yemen!5e0!3m2!1sen!2s!4v1714000000000!5m2!1sen!2s" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               />
            </div>
         </div>
       </div>
    </div>
  );
};