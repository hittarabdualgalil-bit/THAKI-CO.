
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../index'; // Importing from index for context
import { Menu, X, Globe, Phone, MessageCircle, Eye } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { storageService } from '../services/storageService';

const BrandLogo: React.FC<{ light?: boolean }> = ({ light }) => (
  <div className="flex items-center gap-3 group cursor-pointer select-none">
    <div className="relative w-12 h-12 transition-transform group-hover:scale-105 duration-300">
       <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
         {/* Arrow */}
         <path d="M50 8 L62 22 H54 V30 H46 V22 H38 Z" fill="#f59e0b" className="animate-pulse" />
         
         {/* Arcs */}
         <path d="M20 65 A 30 30 0 0 1 80 65" stroke={light ? "#60a5fa" : "#1e40af"} strokeWidth="6" strokeLinecap="round" />
         <path d="M32 65 A 18 18 0 0 1 68 65" stroke="#2dd4bf" strokeWidth="6" strokeLinecap="round" />
         
         {/* Trunk */}
         <path d="M50 65 V 88" stroke={light ? "#60a5fa" : "#1e40af"} strokeWidth="6" strokeLinecap="round" />
         
         {/* Left Side Circuits */}
         <path d="M15 65 H 5" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
         <circle cx="5" cy="65" r="3" fill={light ? "#60a5fa" : "#1e40af"} />
         
         <path d="M50 82 L 25 92" stroke={light ? "#93c5fd" : "#1e40af"} strokeWidth="2" strokeLinecap="round" />
         <circle cx="25" cy="92" r="3" fill="#f59e0b" />

         {/* Right Side Circuits */}
         <path d="M85 65 H 95" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
         <circle cx="95" cy="65" r="3" fill={light ? "#60a5fa" : "#1e40af"} />
         
         <path d="M50 82 L 75 92" stroke={light ? "#93c5fd" : "#1e40af"} strokeWidth="2" strokeLinecap="round" />
         <circle cx="75" cy="92" r="3" fill="#f59e0b" />
       </svg>
    </div>
    <div className="flex flex-col">
      <span className={`text-3xl font-extrabold leading-none tracking-tight ${light ? 'text-white' : 'text-primary-800'}`}>THAKI</span>
      <span className={`text-[10px] font-bold tracking-wider uppercase ${light ? 'text-gray-400' : 'text-gray-500'}`}>Intelligent that Works for You</span>
    </div>
  </div>
);

const WhatsAppFAB: React.FC = () => {
  const { dir } = useLanguage();
  const positionClass = dir === 'rtl' ? 'left-6' : 'right-6';
  
  return (
    <a 
      href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 ${positionClass} z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center`}
    >
      <MessageCircle size={32} />
    </a>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, toggleLanguage, language, dir } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Get visitor count for display
    setVisitorCount(storageService.getVisitorCount());
  }, []);

  const navLinks = [
    { key: 'nav_home', path: '/' },
    { key: 'nav_about', path: '/about' },
    { key: 'nav_services', path: '/services' }, 
    { key: 'nav_careers', path: '/careers' },
    { key: 'nav_pricing', path: '/pricing' },
    { key: 'nav_demo', path: '/demo' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Font class based on language
  const fontClass = language === 'ar' ? 'font-cairo' : 'font-inter';

  return (
    <div className={`min-h-screen flex flex-col ${fontClass} bg-gray-50`}>
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div onClick={() => navigate('/')}>
              <BrandLogo />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary-800 font-bold'
                      : 'text-gray-600 hover:text-primary-500'
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
              <button 
                onClick={toggleLanguage}
                className="p-2 text-gray-600 hover:text-primary-800 transition-colors"
                aria-label="Toggle Language"
              >
                <Globe size={20} />
              </button>
              <Link to="/contact">
                <button className="bg-primary-800 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-900 transition-colors shadow-lg shadow-primary-500/30">
                  {t('nav_contact')}
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
               <button 
                onClick={toggleLanguage}
                className="p-2 mx-2 text-gray-600"
              >
                <Globe size={20} />
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 animate-fadeIn">
            <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-4 text-base font-medium rounded-md ${
                    isActive(link.path) ? 'bg-primary-50 text-primary-800' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-4 text-base font-medium text-center bg-primary-800 text-white rounded-md mt-4"
              >
                {t('nav_contact')}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      <WhatsAppFAB />

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Col 1: Brand */}
            <div>
              <div className="mb-6">
                 <BrandLogo light />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('footer_desc')}
              </p>
            </div>

            {/* Col 2: Solutions */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">{t('footer_solutions')}</h3>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link to="/services" className="hover:text-secondary-400 transition-colors">{t('srv_exam')}</Link></li>
                <li><Link to="/services" className="hover:text-secondary-400 transition-colors">{t('srv_content')}</Link></li>
                <li><Link to="/services" className="hover:text-secondary-400 transition-colors">{t('srv_image')}</Link></li>
                <li><Link to="/services" className="hover:text-secondary-400 transition-colors">{t('srv_auto')}</Link></li>
                <li><Link to="/services" className="hover:text-secondary-400 transition-colors">{t('srv_analytics')}</Link></li>
              </ul>
            </div>

             {/* Col 3: Company */}
             <div>
              <h3 className="text-lg font-bold mb-6 text-white">{t('footer_company')}</h3>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link to="/about" className="hover:text-secondary-400 transition-colors">{t('nav_about')}</Link></li>
                <li><Link to="/careers" className="hover:text-secondary-400 transition-colors">{t('nav_careers')}</Link></li>
                <li><Link to="/pricing" className="hover:text-secondary-400 transition-colors">{t('nav_pricing')}</Link></li>
              </ul>
            </div>

            {/* Col 4: Contact */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">{t('footer_contact')}</h3>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-center gap-3">
                  <span className="text-secondary-400">📍</span> {CONTACT_INFO.address[language]}
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-secondary-400" /> {CONTACT_INFO.phone}
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle size={16} className="text-secondary-400" /> {CONTACT_INFO.whatsapp}
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
            <p>&copy; 2024 THAKI Platform. All rights reserved.</p>
            
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full text-secondary-400">
                  <Eye size={14} />
                  <span className="font-mono">{visitorCount.toLocaleString()}</span> {t('visitor_count')}
               </div>
               <Link to="/admin" className="opacity-10 hover:opacity-100 transition-opacity">
                 {t('admin_dashboard')}
               </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
