
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Careers } from './pages/Careers';
import { Pricing } from './pages/Pricing';
import { Demo } from './pages/Demo';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { storageService } from './services/storageService';

const App: React.FC = () => {
  useEffect(() => {
    // Increment visitor count when the app loads
    storageService.incrementVisitorCount();
  }, []);

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/exam-generator" element={<Services />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;