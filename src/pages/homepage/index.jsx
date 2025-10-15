import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturedExperiences from './components/FeaturedExperiences';
import QuickBookingWidget from './components/QuickBookingWidget';
import SocialProofSection from './components/SocialProofSection';
import EmergencyContactFAB from './components/EmergencyContactFAB';

const Homepage = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Bromo Adventure Hub - Experience Indonesia's Most Iconic Volcanic Sunrise</title>
        <meta 
          name="description" 
          content="Book authentic Mount Bromo sunrise adventures with trusted local guides. Real-time conditions, instant booking, and 24/7 support for your volcanic journey in East Java, Indonesia." 
        />
        <meta name="keywords" content="Mount Bromo, sunrise tour, Indonesia volcano, East Java adventure, Bromo booking, volcanic landscape, Indonesian tourism" />
        <meta property="og:title" content="Bromo Adventure Hub - Volcanic Sunrise Adventures" />
        <meta property="og:description" content="Experience the raw majesty of Mount Bromo with authentic local guides and real-time booking." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bromoadventurehub.com/homepage" />
        <link rel="canonical" href="https://bromoadventurehub.com/homepage" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section with Live Conditions */}
          <HeroSection />

          {/* Featured Experiences Carousel */}
          <FeaturedExperiences />

          {/* Quick Booking Widget */}
          <QuickBookingWidget />

          {/* Social Proof & Reviews */}
          <SocialProofSection />
        </main>

        {/* Emergency Contact FAB */}
        <EmergencyContactFAB />
      </div>
    </>
  );
};

export default Homepage;