import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/appImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState({
    temperature: 12,
    condition: 'Clear',
    humidity: 78,
    windSpeed: 15,
    visibility: 'Excellent'
  });

  // Sunrise countdown timer
  const [sunriseCountdown, setSunriseCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // Calculate next sunrise (5:30 AM)
      const tomorrow = new Date(now);
      tomorrow?.setDate(tomorrow?.getDate() + 1);
      tomorrow?.setHours(5, 30, 0, 0);

      const timeDiff = tomorrow?.getTime() - now?.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor(timeDiff % (1000 * 60 * 60) / (1000 * 60));
      const seconds = Math.floor(timeDiff % (1000 * 60) / 1000);

      setSunriseCountdown({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const liveConditions = [
  { icon: 'Thermometer', label: 'Temperature', value: `${weatherData?.temperature}°C`, status: 'optimal' },
  { icon: 'Eye', label: 'Visibility', value: weatherData?.visibility, status: 'excellent' },
  { icon: 'Wind', label: 'Wind Speed', value: `${weatherData?.windSpeed} km/h`, status: 'moderate' },
  { icon: 'Droplets', label: 'Humidity', value: `${weatherData?.humidity}%`, status: 'good' }];


  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':return 'text-green-600 bg-green-50';
      case 'optimal':return 'text-blue-600 bg-blue-50';
      case 'good':return 'text-amber-600 bg-amber-50';
      case 'moderate':return 'text-orange-600 bg-orange-50';
      default:return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-volcanic-deep via-volcanic-brown to-earth-brown">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1720108425574-eac2e056dbc2"
          alt="Dramatic sunrise view over Mount Bromo volcanic crater with golden light illuminating the misty landscape and surrounding peaks"
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 volcanic-particles"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live from Mount Bromo</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Experience the
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sunrise-orange to-volcanic-orange animate-pulse-glow">
                  Volcanic Majesty
                </span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-2xl">
                Witness Indonesia's most dramatic sunrise from the rim of an active volcano. 
                Your authentic Bromo adventure starts with trusted local guides and real-time conditions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/experience-booking">
                <Button
                  variant="default"
                  size="lg"
                  className="btn-volcanic text-lg px-8 py-4 w-full sm:w-auto"
                  iconName="Calendar"
                  iconPosition="left">

                  Book Adventure Now
                </Button>
              </Link>
              
              <Link to="/bromo-guide">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4 w-full sm:w-auto"
                  iconName="Map"
                  iconPosition="left">

                  Explore Guide
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/80 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>Verified Local Guides</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Right Column - Live Conditions Widget */}
          <div className="space-y-6">
            {/* Sunrise Countdown */}
            <div className="glass-card p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Icon name="Sunrise" size={24} className="text-sunrise-orange" />
                <h3 className="text-xl font-semibold text-white">Next Sunrise</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-sunrise-orange">{String(sunriseCountdown?.hours)?.padStart(2, '0')}</div>
                  <div className="text-sm text-white/70">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sunrise-orange">{String(sunriseCountdown?.minutes)?.padStart(2, '0')}</div>
                  <div className="text-sm text-white/70">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sunrise-orange">{String(sunriseCountdown?.seconds)?.padStart(2, '0')}</div>
                  <div className="text-sm text-white/70">Seconds</div>
                </div>
              </div>
              
              <p className="text-white/80 text-sm">Tomorrow at 5:30 AM WIB</p>
            </div>

            {/* Live Conditions */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Live Conditions</h3>
                <div className="flex items-center space-x-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Updated now</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {liveConditions?.map((condition, index) =>
                <div key={index} className="text-center">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2 ${getStatusColor(condition?.status)}`}>
                      <Icon name={condition?.icon} size={20} />
                    </div>
                    <div className="text-sm text-white/70">{condition?.label}</div>
                    <div className="font-semibold text-white">{condition?.value}</div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                <div className="flex items-center space-x-2 text-green-300">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-sm font-medium">Perfect conditions for sunrise viewing!</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-sunrise-orange">2,329m</div>
                <div className="text-sm text-white/70">Elevation</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-sunrise-orange">-7°C</div>
                <div className="text-sm text-white/70">Min Temp</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-sunrise-orange">Active</div>
                <div className="text-sm text-white/70">Volcano Status</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center space-y-2 text-white/60">
          <span className="text-sm">Discover More</span>
          <Icon name="ChevronDown" size={24} className="animate-bounce" />
        </div>
      </div>
    </section>);

};

export default HeroSection;