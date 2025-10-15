import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = () => {
  const [selectedDay, setSelectedDay] = useState(0);

  // Mock weather data for 7 days
  const weatherData = [
    {
      date: "Today",
      fullDate: "Oct 15, 2024",
      temp: { high: 18, low: 8 },
      condition: "Clear",
      icon: "Sun",
      humidity: 65,
      windSpeed: 12,
      sunrise: "05:42",
      sunset: "17:58",
      visibility: "Excellent",
      precipitation: 0
    },
    {
      date: "Tomorrow",
      fullDate: "Oct 16, 2024",
      temp: { high: 20, low: 9 },
      condition: "Partly Cloudy",
      icon: "CloudSun",
      humidity: 58,
      windSpeed: 8,
      sunrise: "05:41",
      sunset: "17:59",
      visibility: "Good",
      precipitation: 10
    },
    {
      date: "Thu",
      fullDate: "Oct 17, 2024",
      temp: { high: 16, low: 7 },
      condition: "Cloudy",
      icon: "Cloud",
      humidity: 78,
      windSpeed: 15,
      sunrise: "05:40",
      sunset: "18:00",
      visibility: "Fair",
      precipitation: 30
    },
    {
      date: "Fri",
      fullDate: "Oct 18, 2024",
      temp: { high: 14, low: 6 },
      condition: "Light Rain",
      icon: "CloudRain",
      humidity: 85,
      windSpeed: 18,
      sunrise: "05:39",
      sunset: "18:01",
      visibility: "Poor",
      precipitation: 65
    },
    {
      date: "Sat",
      fullDate: "Oct 19, 2024",
      temp: { high: 17, low: 8 },
      condition: "Partly Cloudy",
      icon: "CloudSun",
      humidity: 62,
      windSpeed: 10,
      sunrise: "05:38",
      sunset: "18:02",
      visibility: "Good",
      precipitation: 15
    },
    {
      date: "Sun",
      fullDate: "Oct 20, 2024",
      temp: { high: 19, low: 10 },
      condition: "Clear",
      icon: "Sun",
      humidity: 55,
      windSpeed: 7,
      sunrise: "05:37",
      sunset: "18:03",
      visibility: "Excellent",
      precipitation: 5
    },
    {
      date: "Mon",
      fullDate: "Oct 21, 2024",
      temp: { high: 21, low: 11 },
      condition: "Clear",
      icon: "Sun",
      humidity: 50,
      windSpeed: 6,
      sunrise: "05:36",
      sunset: "18:04",
      visibility: "Excellent",
      precipitation: 0
    }
  ];

  const selectedWeather = weatherData?.[selectedDay];

  const getVisibilityColor = (visibility) => {
    switch (visibility) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Fair': return 'text-yellow-600';
      case 'Poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getConditionColor = (condition) => {
    if (condition?.includes('Clear') || condition?.includes('Sun')) return 'text-yellow-600';
    if (condition?.includes('Rain')) return 'text-blue-600';
    if (condition?.includes('Cloud')) return 'text-gray-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-card rounded-xl p-6 volcanic-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Icon name="CloudSun" size={24} className="text-primary" />
          Weather Forecast
        </h3>
        <div className="text-sm text-text-secondary">
          Mount Bromo Area
        </div>
      </div>
      {/* 7-Day Forecast Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {weatherData?.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(index)}
            className={`flex-shrink-0 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedDay === index
                ? 'bg-primary text-primary-foreground volcanic-glow'
                : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <div className="text-center">
              <div className="font-semibold">{day?.date}</div>
              <div className="text-xs opacity-75 mt-1">
                {day?.temp?.high}°/{day?.temp?.low}°
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Selected Day Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Weather Info */}
        <div className="space-y-4">
          <div className="text-center lg:text-left">
            <div className="text-sm text-text-secondary mb-1">
              {selectedWeather?.fullDate}
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <Icon 
                name={selectedWeather?.icon} 
                size={48} 
                className={getConditionColor(selectedWeather?.condition)}
              />
              <div>
                <div className="text-3xl font-bold text-text-primary">
                  {selectedWeather?.temp?.high}°C
                </div>
                <div className="text-sm text-text-secondary">
                  Low: {selectedWeather?.temp?.low}°C
                </div>
              </div>
            </div>
            <div className={`text-lg font-medium ${getConditionColor(selectedWeather?.condition)}`}>
              {selectedWeather?.condition}
            </div>
          </div>

          {/* Sunrise/Sunset */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="Sunrise" size={16} className="text-yellow-600" />
                <span className="text-sm font-medium text-text-secondary">Sunrise</span>
              </div>
              <div className="text-lg font-bold text-text-primary">
                {selectedWeather?.sunrise}
              </div>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="Sunset" size={16} className="text-orange-600" />
                <span className="text-sm font-medium text-text-secondary">Sunset</span>
              </div>
              <div className="text-lg font-bold text-text-primary">
                {selectedWeather?.sunset}
              </div>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div className="flex items-center gap-2">
              <Icon name="Droplets" size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-text-secondary">Humidity</span>
            </div>
            <span className="font-semibold text-text-primary">{selectedWeather?.humidity}%</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <div className="flex items-center gap-2">
              <Icon name="Wind" size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-text-secondary">Wind Speed</span>
            </div>
            <span className="font-semibold text-text-primary">{selectedWeather?.windSpeed} km/h</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <div className="flex items-center gap-2">
              <Icon name="Eye" size={16} className="text-purple-600" />
              <span className="text-sm font-medium text-text-secondary">Visibility</span>
            </div>
            <span className={`font-semibold ${getVisibilityColor(selectedWeather?.visibility)}`}>
              {selectedWeather?.visibility}
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Icon name="CloudRain" size={16} className="text-blue-500" />
              <span className="text-sm font-medium text-text-secondary">Rain Chance</span>
            </div>
            <span className="font-semibold text-text-primary">{selectedWeather?.precipitation}%</span>
          </div>
        </div>
      </div>
      {/* Weather Alert */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="AlertTriangle" size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-yellow-800 mb-1">Weather Advisory</div>
            <div className="text-sm text-yellow-700">
              {selectedWeather?.visibility === 'Poor' || selectedWeather?.precipitation > 50
                ? "Weather conditions may affect visibility for sunrise viewing. Consider rescheduling or bringing appropriate gear."
                : selectedWeather?.visibility === 'Fair'
                ? "Moderate weather conditions. Sunrise viewing possible but may be partially obscured." :"Excellent conditions for sunrise viewing and photography. Perfect weather for your Bromo adventure!"
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;