import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MobileActionBar } from './components/common/MobileActionBar';
import { DemoDisclaimerBanner } from './components/common/DemoDisclaimerBanner';
import { AudioProvider } from './context/AudioContext';
import { MusicControl } from './components/common/MusicControl';

// Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { GalleryPage } from './pages/GalleryPage';
import { StoryPage } from './pages/StoryPage';
import { ReservePage } from './pages/ReservePage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AudioProvider>
        <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden bg-charcoal-950 text-cream-100 font-sans selection:bg-terracotta-500 selection:text-white">
          {/* Top Demo Disclaimer Notice */}
          <DemoDisclaimerBanner />

          {/* Floating Glassmorphic Navbar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/reviews" element={<HomePage scrollTo="reviews" />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/story" element={<StoryPage />} />
              <Route path="/reserve" element={<ReservePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Fixed Mobile Bottom Action Bar */}
          <MobileActionBar />

          {/* Persistent Ambient Music Controller */}
          <MusicControl />
        </div>
      </AudioProvider>
    </BrowserRouter>
  );
};

export default App;
