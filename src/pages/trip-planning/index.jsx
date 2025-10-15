import React from 'react';
import Header from '../../components/ui/Header';
import PlanningHeader from './components/PlanningHeader';
import BudgetCalculator from './components/BudgetCalculator';
import WeatherForecast from './components/WeatherForecast';
import ItineraryBuilder from './components/ItineraryBuilder';
import GroupPlanningTools from './components/GroupPlanningTools';
import PackingChecklist from './components/PackingChecklist';
import TransportationPlanner from './components/TransportationPlanner';

const TripPlanning = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <PlanningHeader />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Budget Calculator */}
        <section id="budget-calculator">
          <BudgetCalculator />
        </section>

        {/* Weather Forecast */}
        <section id="weather-forecast">
          <WeatherForecast />
        </section>

        {/* Itinerary Builder */}
        <section id="itinerary-builder">
          <ItineraryBuilder />
        </section>

        {/* Group Planning Tools */}
        <section id="group-planning">
          <GroupPlanningTools />
        </section>

        {/* Packing Checklist */}
        <section id="packing-checklist">
          <PackingChecklist />
        </section>

        {/* Transportation Planner */}
        <section id="transportation-planner">
          <TransportationPlanner />
        </section>

        {/* Quick Actions Footer */}
        <section className="bg-gradient-to-r from-primary to-accent rounded-xl p-8 text-center text-white volcanic-glow">
          <h3 className="text-2xl font-bold mb-4">Ready to Book Your Adventure?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Your perfect Bromo adventure is planned! Now it's time to make it happen. 
            Book your experiences and start your volcanic journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center justify-center space-x-2">
              <span>Book Complete Package</span>
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center space-x-2">
              <span>Save & Continue Later</span>
            </button>
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="bg-volcanic-deep text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Need Help Planning?</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Our local experts are here to help you create the perfect Bromo adventure. 
              Get personalized recommendations and insider tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                <span>Chat with Expert</span>
              </button>
              <button className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center space-x-2">
                <span>View FAQ</span>
              </button>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © {new Date()?.getFullYear()} Bromo Adventure Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TripPlanning;