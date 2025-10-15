import React from 'react';
import Icon from '../../../components/AppIcon';

const PlanningHeader = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-accent text-white py-16 px-4 sm:px-6 lg:px-8 volcanic-glow">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Icon name="Route" size={32} color="white" strokeWidth={2} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-accent">
            Plan Your Perfect Bromo Adventure
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Create your customized itinerary with our intelligent planning tools. From budget calculations to weather forecasts, we'll help you craft the perfect volcanic adventure experience.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Calculator" size={16} color="white" />
              <span>Budget Calculator</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Cloud" size={16} color="white" />
              <span>Weather Forecast</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} color="white" />
              <span>Itinerary Builder</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} color="white" />
              <span>Group Planning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningHeader;