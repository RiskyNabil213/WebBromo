import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeatherForecast = () => {
  const [selectedDay, setSelectedDay] = useState(0);

  const weatherData = [
    {
      date: "2025-10-15",
      day: "Today",
      temperature: { min: 8, max: 18 },
      condition: "Clear",
      icon: "Sun",
      humidity: 65,
      windSpeed: 12,
      visibility: "Excellent",
      sunriseTime: "05:45",
      recommendation: "Perfect conditions for sunrise viewing! Clear skies expected.",
      activities: ["Sunrise Tour", "Photography", "Crater Exploration"],
      alerts: []
    },
    {
      date: "2025-10-16",
      day: "Tomorrow",
      temperature: { min: 9, max: 19 },
      condition: "Partly Cloudy",
      icon: "CloudSun",
      humidity: 70,
      windSpeed: 15,
      visibility: "Good",
      sunriseTime: "05:45",
      recommendation: "Good conditions with some clouds. Sunrise still visible.",
      activities: ["Sunrise Tour", "Hiking", "Cultural Visit"],
      alerts: []
    },
    {
      date: "2025-10-17",
      day: "Thursday",
      temperature: { min: 7, max: 16 },
      condition: "Cloudy",
      icon: "Cloud",
      humidity: 80,
      windSpeed: 18,
      visibility: "Moderate",
      sunriseTime: "05:44",
      recommendation: "Overcast conditions. Consider indoor activities or cultural tours.",
      activities: ["Cultural Visit", "Village Tour", "Museum"],
      alerts: ["Limited visibility for sunrise viewing"]
    },
    {
      date: "2025-10-18",
      day: "Friday",
      temperature: { min: 6, max: 15 },
      condition: "Light Rain",
      icon: "CloudRain",
      humidity: 85,
      windSpeed: 20,
      visibility: "Poor",
      sunriseTime: "05:44",
      recommendation: "Rainy conditions. Indoor activities recommended.",
      activities: ["Indoor Activities", "Cultural Center", "Local Crafts"],
      alerts: ["Rain expected", "Slippery trails", "Limited outdoor activities"]
    },
    {
      date: "2025-10-19",
      day: "Saturday",
      temperature: { min: 8, max: 17 },
      condition: "Partly Cloudy",
      icon: "CloudSun",
      humidity: 72,
      windSpeed: 14,
      visibility: "Good",
      sunriseTime: "05:43",
      recommendation: "Improving conditions. Good for most outdoor activities.",
      activities: ["Sunrise Tour", "Hiking", "Photography", "Crater Exploration"],
      alerts: []
    },
    {
      date: "2025-10-20",
      day: "Sunday",
      temperature: { min: 9, max: 20 },
      condition: "Clear",
      icon: "Sun",
      humidity: 60,
      windSpeed: 10,
      visibility: "Excellent",
      sunriseTime: "05:43",
      recommendation: "Excellent conditions! Perfect for all outdoor activities.",
      activities: ["Sunrise Tour", "Photography", "Crater Exploration", "Hiking", "Camping"],
      alerts: []
    },
    {
      date: "2025-10-21",
      day: "Monday",
      temperature: { min: 10, max: 21 },
      condition: "Clear",
      icon: "Sun",
      humidity: 58,
      windSpeed: 8,
      visibility: "Excellent",
      sunriseTime: "05:42",
      recommendation: "Outstanding conditions! Ideal for photography and sunrise tours.",
      activities: ["Sunrise Tour", "Photography", "Crater Exploration", "Hiking", "Camping"],
      alerts: []
    }
  ];

  const currentWeather = weatherData?.[selectedDay];

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Clear': return 'text-yellow-600';
      case 'Partly Cloudy': return 'text-blue-500';
      case 'Cloudy': return 'text-gray-500';
      case 'Light Rain': return 'text-blue-700';
      default: return 'text-gray-500';
    }
  };

  const getVisibilityColor = (visibility) => {
    switch (visibility) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-yellow-600';
      case 'Moderate': return 'text-orange-500';
      case 'Poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 volcanic-glow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <Icon name="Cloud" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Weather Forecast</h3>
          <p className="text-text-secondary text-sm">Plan activities based on weather conditions</p>
        </div>
      </div>
      {/* Weather Timeline */}
      <div className="mb-8">
        <div className="flex space-x-2 overflow-x-auto pb-4 custom-scrollbar">
          {weatherData?.map((day, index) => (
            <button
              key={day?.date}
              onClick={() => setSelectedDay(index)}
              className={`flex-shrink-0 p-4 rounded-lg border transition-all duration-200 min-w-[120px] ${
                selectedDay === index
                  ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background hover:bg-muted/50 text-text-secondary'
              }`}
            >
              <div className="text-center">
                <p className="text-xs font-medium mb-1">{day?.day}</p>
                <Icon name={day?.icon} size={24} className={`mx-auto mb-2 ${getConditionColor(day?.condition)}`} />
                <p className="text-xs">{day?.temperature?.max}°/{day?.temperature?.min}°</p>
                <p className="text-xs mt-1">{day?.condition}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Detailed Weather Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Conditions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-text-primary">{currentWeather?.day}</h4>
                <p className="text-text-secondary text-sm">{currentWeather?.date}</p>
              </div>
              <Icon name={currentWeather?.icon} size={48} className={getConditionColor(currentWeather?.condition)} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-text-primary">{currentWeather?.temperature?.max}°C</p>
                <p className="text-sm text-text-secondary">High</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-text-primary">{currentWeather?.temperature?.min}°C</p>
                <p className="text-sm text-text-secondary">Low</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary flex items-center space-x-2">
                  <Icon name="Droplets" size={16} />
                  <span>Humidity</span>
                </span>
                <span className="font-medium text-text-primary">{currentWeather?.humidity}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary flex items-center space-x-2">
                  <Icon name="Wind" size={16} />
                  <span>Wind Speed</span>
                </span>
                <span className="font-medium text-text-primary">{currentWeather?.windSpeed} km/h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary flex items-center space-x-2">
                  <Icon name="Eye" size={16} />
                  <span>Visibility</span>
                </span>
                <span className={`font-medium ${getVisibilityColor(currentWeather?.visibility)}`}>
                  {currentWeather?.visibility}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary flex items-center space-x-2">
                  <Icon name="Sunrise" size={16} />
                  <span>Sunrise</span>
                </span>
                <span className="font-medium text-text-primary">{currentWeather?.sunriseTime}</span>
              </div>
            </div>
          </div>

          {/* Alerts */}
          {currentWeather?.alerts?.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} color="orange" />
                <div>
                  <h5 className="font-medium text-orange-800 mb-2">Weather Alerts</h5>
                  <ul className="space-y-1">
                    {currentWeather?.alerts?.map((alert, index) => (
                      <li key={index} className="text-sm text-orange-700">• {alert}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start space-x-3 mb-4">
              <Icon name="Lightbulb" size={20} color="green" />
              <div>
                <h5 className="font-medium text-green-800 mb-2">Weather Recommendation</h5>
                <p className="text-sm text-green-700">{currentWeather?.recommendation}</p>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-medium text-text-primary mb-3">Recommended Activities</h5>
            <div className="space-y-2">
              {currentWeather?.activities?.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <Icon name="CheckCircle" size={16} color="green" />
                  <span className="text-sm text-text-primary">{activity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
              <div className="text-sm text-text-secondary">
                <p className="font-medium text-text-primary mb-1">Weather Tips:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Best sunrise viewing: Clear or partly cloudy conditions</li>
                  <li>• Temperature drops significantly at night (bring warm clothes)</li>
                  <li>• Weather can change quickly at high altitude</li>
                  <li>• Check conditions before departing for sunrise tours</li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            fullWidth
            iconName="RefreshCw"
            iconPosition="left"
          >
            Update Forecast
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;