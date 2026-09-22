import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/home/Hero';
import { BrandStatement } from '../components/home/BrandStatement';
import { SignatureDishes } from '../components/home/SignatureDishes';
import { TandoorHeatSection } from '../components/home/TandoorHeatSection';
import { StorySection } from '../components/home/StorySection';
import { ExperienceSection } from '../components/home/ExperienceSection';
import { Marquee } from '../components/home/Marquee';
import { GalleryPreview } from '../components/home/GalleryPreview';
import { Testimonials } from '../components/home/Testimonials';
import { ReservationCTA } from '../components/home/ReservationCTA';
import { LocationSection } from '../components/home/LocationSection';

interface HomePageProps {
  scrollTo?: string;
}

export const HomePage: React.FC<HomePageProps> = ({ scrollTo }) => {
  const location = useLocation();

  useEffect(() => {
    if (scrollTo === 'reviews' || location.hash === '#reviews') {
      const scroll = () => {
        const elem = document.getElementById('reviews');
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      };
      // Trigger smooth scroll after render layout stabilizes
      const timer = setTimeout(scroll, 120);
      return () => clearTimeout(timer);
    }
  }, [scrollTo, location.hash]);
  return (
    <div className="relative">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Marquee */}
      <Marquee />

      {/* 3. Brand statement & Stats */}
      <BrandStatement />

      {/* Chapter 02: The Fire */}
      <TandoorHeatSection />

      {/* Chapter 03: The Table */}
      <SignatureDishes />

      {/* 5. Experience Section */}
      <ExperienceSection />

      {/* 6. Story preview */}
      <StorySection />

      {/* 7. Gallery preview */}
      <GalleryPreview />

      {/* 8. Testimonials */}
      <Testimonials />

      {/* 9. Reservation CTA */}
      <ReservationCTA />

      {/* 10. Location / Contact Section */}
      <LocationSection />
    </div>
  );
};
