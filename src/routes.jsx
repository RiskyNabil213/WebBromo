import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ExperienceBooking from './pages/experience-booking';
import TripPlanning from './pages/trip-planning';
import BromoGuide from './pages/bromo-guide';
import AdventureGallery from './pages/adventure-gallery';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/experience-booking" element={<ExperienceBooking />} />
        <Route path="/trip-planning" element={<TripPlanning />} />
        <Route path="/bromo-guide" element={<BromoGuide />} />
        <Route path="/adventure-gallery" element={<AdventureGallery />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
