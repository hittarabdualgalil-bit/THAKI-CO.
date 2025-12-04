
import React, { useState, useRef, useEffect } from 'react';
import { X, CheckCircle, Upload, CreditCard, Briefcase, Image as ImageIcon, ShoppingCart, Smartphone, PartyPopper, Globe, Brain, Bot, HelpCircle, ArrowRight, ArrowLeft, Calendar, DollarSign, User, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../index';
import { storageService } from '../services/storageService';
import { Stock } from '../types';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'md' | 'lg' | 'xl';
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  
  const maxWidthClass = size === 'xl' ? 'max-w-xl' : size === 'lg' ? 'max-w-lg' : 'max-w-md';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidthClass} overflow-hidden animate-slideUp max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors bg-white p-2 rounded-full shadow-sm hover:shadow-md">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// 1. Service Interest Modal
export const ServiceModal: React.FC<{ isOpen: boolean; onClose: () => void; serviceName: string; isDream?: boolean }> = ({ isOpen, onClose, serviceName, isDream }) => {
  const { t, dir } = useLanguage();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    details: '', 
    phone: '', 
    serviceTitle: '',
    projectType: 'Website',
    budget: '$1,000 - $5,000',
    timeline: '1-3 Months'
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.addInterest({
      id: Date.now().toString(),
      serviceName: isDream ? formData.serviceTitle : serviceName,
      customerName: formData.name || (isDream ? 'Client' : ''),
      email: formData.email,
      phone: formData.phone,
      date: new Date().toISOString(),
      type: isDream ? 'dream' : 'standard',
      details: formData.details,
      projectType: isDream ? formData.projectType : undefined,
      budget: isDream ? formData.budget : undefined,
      timeline: isDream ? formData.timeline : undefined
    });
    setSuccess(true);
    setTimeout(() => { setSuccess(false); onClose(); }, 2000);
  };

  const projectTypes = [
    { id: 'Website', icon: Globe, label: 'Website' },
    { id: 'Mobile App', icon: Smartphone, label: 'App' },
    { id: 'AI Solution', icon: Brain, label: 'AI Tool' },
    { id: 'Automation', icon: Bot, label: 'Automation' },
    { id: 'Other', icon: HelpCircle, label: 'Other' },
  ];

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={isDream ? t('dream_service') : t('btn_interested')} size={isDream ? 'lg' : 'md'}>
      {success ? (
        <div className="text-center text-green-600 py-12 animate-fadeIn">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="font-bold text-2xl text-gray-900 mb-2">{t('modal_success')}</h3>
          <p className="text-gray-500">We will analyze your request and get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {isDream ? (
             <div className="animate-fadeIn space-y-6">
               {/* Project Details Section */}
               <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_service_title')}</label>
                     <input 
                        required 
                        type="text" 
                        placeholder="e.g. Custom CRM with AI Chatbot" 
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" 
                        value={formData.serviceTitle} 
                        onChange={e => setFormData({...formData, serviceTitle: e.target.value})} 
                     />
                   </div>
                   
                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">{t('lbl_project_type')}</label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {projectTypes.map(type => (
                          <div 
                            key={type.id}
                            onClick={() => setFormData({...formData, projectType: type.id})}
                            className={`cursor-pointer rounded-xl p-3 flex flex-col items-center justify-center gap-2 border transition-all ${formData.projectType === type.id ? 'border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-500' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600'}`}
                          >
                             <type.icon size={20} />
                             <span className="text-xs font-medium text-center">{type.label}</span>
                          </div>
                        ))}
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                           <DollarSign size={16} className="text-gray-400" /> {t('lbl_budget')}
                        </label>
                        <select className="w-full border border-gray-300 rounded-xl p-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
                            <option value="< $1,000">{'< $1,000'}</option>
                            <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                            <option value="$10,000+">$10,000+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <Calendar size={16} className="text-gray-400" /> {t('lbl_timeline')}
                        </label>
                        <select className="w-full border border-gray-300 rounded-xl p-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={formData.timeline} onChange={e => setFormData({...formData, timeline: e.target.value})}>
                            <option value="< 1 Month">{'< 1 Month'}</option>
                            <option value="1-3 Months">1-3 Months</option>
                            <option value="3-6 Months">3-6 Months</option>
                            <option value="6+ Months">6+ Months</option>
                        </select>
                      </div>
                   </div>

                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_details')}</label>
                     <textarea 
                        required 
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 outline-none min-h-[100px]" 
                        rows={3} 
                        value={formData.details} 
                        onChange={e => setFormData({...formData, details: e.target.value})} 
                        placeholder="Please describe your requirements, features, and goals..." 
                     />
                   </div>
               </div>

               <hr className="border-gray-100" />

               {/* Contact Information Section */}
               <div>
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User size={18} className="text-primary-600" /> Contact Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('form_name')}</label>
                      <div className="relative">
                        <User className="absolute top-3 left-3 text-gray-400 rtl:right-3 rtl:left-auto" size={16} />
                        <input required type="text" className="w-full border border-gray-300 rounded-xl p-3 pl-10 rtl:pr-10 rtl:pl-3 focus:ring-2 focus:ring-primary-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('form_email')}</label>
                      <div className="relative">
                        <Mail className="absolute top-3 left-3 text-gray-400 rtl:right-3 rtl:left-auto" size={16} />
                        <input required type="email" className="w-full border border-gray-300 rounded-xl p-3 pl-10 rtl:pr-10 rtl:pl-3 focus:ring-2 focus:ring-primary-500" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('form_phone')}</label>
                      <div className="relative">
                        <Smartphone className="absolute top-3 left-3 text-gray-400 rtl:right-3 rtl:left-auto" size={16} />
                        <input required type="tel" className="w-full border border-gray-300 rounded-xl p-3 pl-10 rtl:pr-10 rtl:pl-3 focus:ring-2 focus:ring-primary-500" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>
                    </div>
                  </div>
               </div>

               <button 
                  type="submit" 
                  className="w-full bg-primary-800 text-white py-4 rounded-xl font-bold hover:bg-primary-900 transition-all shadow-md flex items-center justify-center gap-2 group mt-4"
                >
                  {t('btn_submit')} <PartyPopper size={18} className="group-hover:rotate-12 transition-transform" />
               </button>
             </div>
          ) : (
            /* Standard Service Form */
            <div className="animate-fadeIn">
              <div className="bg-primary-50 p-4 rounded-xl mb-6 flex items-start gap-3">
                 <div className="bg-white p-2 rounded-full text-primary-600 shadow-sm mt-1">
                    <CheckCircle size={16} />
                 </div>
                 <div>
                    <h4 className="font-bold text-primary-900 text-sm">Expressing Interest</h4>
                    <p className="text-xs text-primary-700 mt-1">You are interested in: <span className="font-bold">{serviceName}</span>. Our team will contact you.</p>
                 </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('form_name')}</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-primary-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('form_email')}</label>
                  <input required type="email" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-primary-500" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('form_phone')}</label>
                  <input type="tel" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-primary-500" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="w-full bg-primary-800 text-white py-4 rounded-xl font-bold hover:bg-primary-900 transition-all shadow-md mt-6">
                {t('form_send')}
              </button>
            </div>
          )}
        </form>
      )}
    </BaseModal>
  );
};

// 2. Rating Modal
export const RatingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({ name: '', comment: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.addReview({
      id: Date.now().toString(),
      name: formData.name,
      rating,
      comment: formData.comment,
      date: new Date().toISOString()
    });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={t('btn_add_review')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center space-x-2 rtl:space-x-reverse mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => setRating(star)} className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</button>
          ))}
        </div>
        <input required placeholder={t('form_name')} className="w-full border rounded-lg p-2" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        <textarea required placeholder={t('form_msg')} className="w-full border rounded-lg p-2" rows={3} value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} />
        <button type="submit" className="w-full bg-accent-500 text-white py-2 rounded-lg font-bold">{t('form_send')}</button>
      </form>
    </BaseModal>
  );
};

// 3. Payment Modal (Bank Transfer)
export const PaymentModal: React.FC<{ isOpen: boolean; onClose: () => void; plan: string }> = ({ isOpen, onClose, plan }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ depositor: '', phone: '', receipt: '' });
  const [receiptImage, setReceiptImage] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptImage) {
      alert("Please upload the receipt image.");
      return;
    }

    storageService.addPayment({
      id: Date.now().toString(),
      plan,
      depositorName: formData.depositor,
      phone: formData.phone,
      receiptNumber: formData.receipt,
      receiptImageBase64: receiptImage, 
      status: 'pending',
      date: new Date().toISOString()
    });
    setSuccess(true);
    setTimeout(() => { setSuccess(false); onClose(); }, 3000);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={`${t('plan_pro')} - Bank Transfer`}>
      {success ? (
        <div className="text-center text-green-600 py-8">
          <CheckCircle className="mx-auto w-16 h-16 mb-4" />
          <p className="font-bold text-lg">{t('modal_success')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
              <CreditCard size={18} /> Al-Kuraimi Bank Info
            </h4>
            <div className="space-y-1 text-sm text-red-900">
               <p className="flex justify-between"><span>Account Name:</span> <span className="font-bold">THAKI Platform</span></p>
               <p className="flex justify-between"><span>Account Number:</span> <span className="font-mono font-bold bg-white px-2 rounded border border-red-200">123456789</span></p>
            </div>
            <p className="text-xs text-red-700 mt-2 opacity-80">Please transfer the amount and upload the receipt below.</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('form_name')}</label>
            <input required placeholder="Client Name" type="text" className="w-full border rounded-lg p-2" value={formData.depositor} onChange={e => setFormData({...formData, depositor: e.target.value})} />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">{t('form_phone')}</label>
             <div className="relative">
                <Smartphone className="absolute top-3 left-3 text-gray-400 rtl:right-3 rtl:left-auto" size={16} />
                <input required placeholder="77xxxxxxx" type="tel" className="w-full border rounded-lg p-2 pl-10 rtl:pr-10 rtl:pl-2" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Receipt / Bond Number</label>
            <input required placeholder="Transaction ID on receipt" type="text" className="w-full border rounded-lg p-2 font-mono" value={formData.receipt} onChange={e => setFormData({...formData, receipt: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Receipt Image</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${receiptImage ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
              {receiptImage ? (
                <div className="flex flex-col items-center text-green-700">
                  <ImageIcon className="mb-2" />
                  <p className="text-sm font-bold truncate max-w-full px-4">{fileName}</p>
                  <p className="text-xs">Click to change</p>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500">Click to upload receipt (Image)</p>
                </>
              )}
            </div>
          </div>

          <button type="submit" className="w-full bg-primary-800 text-white py-3 rounded-lg font-bold hover:bg-primary-900 transition-shadow shadow-md">
            {t('btn_submit')}
          </button>
        </form>
      )}
    </BaseModal>
  );
};

// 4. Job Application Modal
export const JobApplicationModal: React.FC<{ isOpen: boolean; onClose: () => void; jobTitle: string; jobId: string }> = ({ isOpen, onClose, jobTitle, jobId }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', position: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.addApplication({
      id: Date.now().toString(),
      jobId,
      applicantName: formData.name,
      email: formData.email,
      position: formData.position,
      cvBase64: 'mock_cv_base64', 
      date: new Date().toISOString()
    });
    setSuccess(true);
    setTimeout(() => { setSuccess(false); onClose(); }, 2000);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={`${t('btn_apply')} - ${jobTitle}`}>
      {success ? (
        <div className="text-center text-green-600 py-8">
          <CheckCircle className="mx-auto w-16 h-16 mb-4" />
          <p className="font-bold text-lg">{t('modal_success')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2 text-primary-800">
            <Briefcase size={18} />
            <span className="font-bold text-sm">{jobTitle}</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('form_name')}</label>
            <input required type="text" className="w-full border rounded-lg p-2" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('form_job_title')}</label>
            <input required placeholder="Current Title" type="text" className="w-full border rounded-lg p-2" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('form_email')}</label>
            <input required type="email" className="w-full border rounded-lg p-2" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('upload_cv')}</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors group">
              <Upload className="mx-auto text-gray-400 mb-2 group-hover:text-primary-500" />
              <p className="text-xs text-gray-500 group-hover:text-primary-600">PDF / Word (Max 5MB)</p>
            </div>
          </div>

          <button type="submit" className="w-full bg-primary-800 text-white py-3 rounded-lg font-bold hover:bg-primary-900">
            {t('form_send')}
          </button>
        </form>
      )}
    </BaseModal>
  );
};

// 5. Stock Order Modal (Kept for compatibility, though stock feature is removed)
export const OrderModal: React.FC<{ isOpen: boolean; onClose: () => void; stock: Stock | null; type: 'buy' | 'sell' }> = ({ isOpen, onClose, stock, type }) => {
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stock) return;

    storageService.addOrder({
      id: Date.now().toString(),
      type,
      symbol: stock.symbol,
      price: stock.price,
      quantity,
      date: new Date().toISOString()
    });
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setQuantity(1); onClose(); }, 2000);
  };

  if (!stock) return null;

  const total = (quantity * stock.price).toFixed(2);
  const colorClass = type === 'buy' ? 'text-green-600' : 'text-red-600';
  const buttonClass = type === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={`${t(type === 'buy' ? 'btn_buy' : 'btn_sell')} ${stock.symbol}`}>
      {success ? (
        <div className="text-center text-green-600 py-8">
          <ShoppingCart className="mx-auto w-16 h-16 mb-4" />
          <p className="font-bold text-lg">{t('order_success')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
             <div>
               <h4 className="font-bold text-lg">{stock.name}</h4>
               <p className="text-gray-500 text-sm">{stock.symbol}</p>
             </div>
             <div className="text-right">
               <p className="font-bold text-xl">${stock.price}</p>
               <p className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                 {stock.change > 0 ? '+' : ''}{stock.change}%
               </p>
             </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">{t('lbl_quantity')}</label>
             <div className="flex items-center gap-4">
               <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 font-bold text-xl">-</button>
               <input 
                 type="number" 
                 min="1" 
                 className="flex-1 text-center text-xl font-bold border-none bg-transparent outline-none" 
                 value={quantity} 
                 onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 0))} 
               />
               <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 font-bold text-xl">+</button>
             </div>
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-gray-600 font-medium">{t('lbl_total')}</span>
            <span className={`text-2xl font-bold ${colorClass}`}>${total}</span>
          </div>

          <button type="submit" className={`w-full text-white py-4 rounded-xl font-bold transition-all shadow-lg ${buttonClass}`}>
            {t('confirm_order')}
          </button>
        </form>
      )}
    </BaseModal>
  );
};

// 6. Subscription Success Modal (For Free Plan)
export const SubscriptionSuccessModal: React.FC<{ isOpen: boolean; onClose: () => void; planName: string }> = ({ isOpen, onClose, planName }) => {
  const { t } = useLanguage();
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Subscription Activated">
      <div className="text-center py-8">
         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <PartyPopper className="text-green-600 w-10 h-10" />
         </div>
         <h2 className="text-2xl font-bold text-gray-900 mb-3">Congratulations!</h2>
         <p className="text-gray-600 mb-6">
            You have successfully subscribed to the <span className="font-bold text-primary-600">{planName}</span> plan.
         </p>
         <button 
           onClick={onClose} 
           className="bg-primary-800 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-900 transition-colors"
         >
           Start Exploring
         </button>
      </div>
    </BaseModal>
  );
};
