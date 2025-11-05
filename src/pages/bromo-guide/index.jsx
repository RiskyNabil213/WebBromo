import React from 'react';
import Header from '../../components/ui/Header';
import WeatherWidget from './components/WeatherWidget';
import InteractiveTrailMap from './components/InteractiveTrailMap';
import ParkStatusCard from './components/ParkStatusCard';
import SafetyChecklist from './components/SafetyChecklist';
import CulturalGuide from './components/CulturalGuide';
import LocationGuide from './components/LocationGuide';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BromoGuide = () => {
  const quickStats = [
    {
      icon: 'Mountain',
      label: 'Elevation',
      value: '2,329m',
      description: 'Above sea level'
    },
    {
      icon: 'Thermometer',
      label: 'Temperature',
      value: '3-20°C',
      description: 'Daily range'
    },
    {
      icon: 'Clock',
      label: 'Best Time',
      value: '5:30 AM',
      description: 'Sunrise viewing'
    },
    {
      icon: 'Users',
      label: 'Visitors',
      value: '500K+',
      description: 'Annual visitors'
    }
  ];

  const guideHighlights = [
    {
      icon: 'MapPin',
      title: 'Location Intelligence',
      description: 'Detailed information about all key destinations and viewpoints'
    },
    {
      icon: 'CloudSun',
      title: 'Weather Forecasting',
      description: '7-day weather outlook with sunrise/sunset times'
    },
    {
      icon: 'Shield',
      title: 'Safety Guidelines',
      description: 'Comprehensive safety checklist and emergency procedures'
    },
    {
      icon: 'Globe',
      title: 'Cultural Insights',
      description: 'Learn about Tengger traditions and local customs'
    },
    {
      icon: 'Route',
      title: 'Trail Information',
      description: 'Interactive maps with difficulty ratings and GPS coordinates'
    },
    {
      icon: 'Activity',
      title: 'Real-time Updates',
      description: 'Live park status and volcanic activity monitoring'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-volcanic-deep via-volcanic-brown to-earth-brown text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 volcanic-particles"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Icon name="Shield" size={20} className="text-accent" />
              <span className="text-sm font-medium">Authoritative Destination Resource</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-sunrise-orange">
                Complete Bromo Guide
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Your definitive resource for Mount Bromo exploration with real-time conditions, 
              safety guidelines, and cultural insights from local experts.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="default" size="lg" iconName="Download" className="volcanic-glow">
                Download Guide PDF
              </Button>
              <Button variant="outline" size="lg" iconName="Phone" className="border-white text-white hover:bg-white hover:text-volcanic-deep">
                Emergency Contacts
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats?.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name={stat?.icon} size={24} className="text-accent" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat?.value}</div>
                <div className="text-sm font-medium text-white/90 mb-1">{stat?.label}</div>
                <div className="text-xs text-white/70">{stat?.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Guide Features Overview */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Comprehensive information, real-time updates, and expert insights to make your Bromo adventure safe and memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guideHighlights?.map((highlight, index) => (
              <div key={index} className="bg-card rounded-xl p-6 volcanic-glow hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={highlight?.icon} size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {highlight?.title}
                </h3>
                <p className="text-text-secondary">
                  {highlight?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Main Guide Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Weather & Park Status Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <WeatherWidget />
            <ParkStatusCard />
          </div>

          {/* Location Guide */}
          <LocationGuide />

          {/* Interactive Trail Map */}
          <InteractiveTrailMap />

          {/* Safety & Cultural Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SafetyChecklist />
            <CulturalGuide />
          </div>

        </div>
      </section>
      {/* Emergency Information Banner */}
      <section className="py-12 bg-red-50 border-y border-red-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Icon name="AlertTriangle" size={32} className="text-red-600" />
              <h2 className="text-2xl font-bold text-red-800">Emergency Information</h2>
            </div>
            
            <p className="text-red-700 mb-6 max-w-2xl mx-auto">
              In case of emergency, contact park rangers immediately. Always inform someone of your planned route and expected return time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <Icon name="Phone" size={24} className="text-red-600 mx-auto mb-2" />
                <div className="font-semibold text-red-800">Park Rangers</div>
                <div className="text-red-700">+62 335 541 821</div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <Icon name="Heart" size={24} className="text-red-600 mx-auto mb-2" />
                <div className="font-semibold text-red-800">Medical Emergency</div>
                <div className="text-red-700">+62 335 596 048</div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <Icon name="Shield" size={24} className="text-red-600 mx-auto mb-2" />
                <div className="font-semibold text-red-800">Tourist Police</div>
                <div className="text-red-700">+62 335 541 976</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for Your Bromo Adventure?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Use this guide to plan your perfect visit and book your experience with confidence.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" iconName="Calendar" className="bg-white text-primary hover:bg-white/90">
              Book Experience Now
            </Button>
            <Button variant="outline" size="lg" iconName="Route" className="border-white text-white hover:bg-white hover:text-primary">
              Plan Your Trip
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-volcanic-deep text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Mountain" size={24} color="white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Bromo Adventure Hub</h3>
                  <p className="text-sm text-white/70">Your Gateway to Volcanic Wonders</p>
                </div>
              </div>
              <p className="text-white/80 mb-4">
                Connecting adventurers with authentic Bromo experiences while supporting local communities and promoting responsible tourism.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="/experience-booking" className="hover:text-accent transition-colors">Book Experience</a></li>
                <li><a href="/trip-planning" className="hover:text-accent transition-colors">Trip Planning</a></li>
                <li><a href="/adventure-gallery" className="hover:text-accent transition-colors">Photo Gallery</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/80">
                <li>Emergency: +62 335 541 821</li>
                <li>Info: info@bromohub.com</li>
                <li>WhatsApp: +62 812 3456 7890</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; {new Date()?.getFullYear()} Bromo Adventure Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BromoGuide;