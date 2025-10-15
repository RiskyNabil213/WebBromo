import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveTrailMap = () => {
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const trails = [
    {
      id: 1,
      name: "Sunrise Viewpoint Trail",
      difficulty: "Easy",
      duration: "30 minutes",
      distance: "1.2 km",
      elevation: "200m gain",
      startPoint: "Penanjakan Parking",
      endPoint: "Penanjakan 1 Viewpoint",
      description: "The most popular trail leading to the iconic sunrise viewpoint. Well-maintained path with moderate incline.",
      highlights: ["Best sunrise views", "Photography spots", "Crowd-friendly"],
      tips: "Arrive by 4:30 AM for best spots. Bring warm clothing and flashlight.",
      coordinates: { lat: -7.9425, lng: 112.9530 },
      color: "green",
      status: "Open"
    },
    {
      id: 2,
      name: "Crater Rim Walk",
      difficulty: "Moderate",
      duration: "45 minutes",
      distance: "2.1 km",
      elevation: "150m gain",
      startPoint: "Cemoro Lawang",
      endPoint: "Bromo Crater Edge",
      description: "Scenic walk around the crater rim offering multiple viewpoints of the active volcano.",
      highlights: ["Crater views", "Volcanic activity", "Less crowded"],
      tips: "Check volcanic activity status. Avoid during high wind conditions.",
      coordinates: { lat: -7.9424, lng: 112.9530 },
      color: "orange",
      status: "Open"
    },
    {
      id: 3,
      name: "Sea of Sand Crossing",
      difficulty: "Easy",
      duration: "20 minutes",
      distance: "800m",
      elevation: "Flat",
      startPoint: "Jeep Drop Point",
      endPoint: "Bromo Base",
      description: "Walk across the famous Sea of Sand (Lautan Pasir) to reach the base of Mount Bromo.",
      highlights: ["Lunar landscape", "Unique terrain", "Horse riding option"],
      tips: "Wear closed shoes to avoid sand. Horse rides available for 50,000 IDR.",
      coordinates: { lat: -7.9426, lng: 112.9528 },
      color: "yellow",
      status: "Open"
    },
    {
      id: 4,
      name: "Bromo Crater Climb",
      difficulty: "Hard",
      duration: "1.5 hours",
      distance: "3.2 km",
      elevation: "400m gain",
      startPoint: "Bromo Base",
      endPoint: "Bromo Summit",
      description: "Challenging climb to the crater rim of Mount Bromo. Steep stairs and rocky terrain.",
      highlights: ["Summit views", "Crater edge", "Adventure challenge"],
      tips: "Start early morning. Bring water and energy snacks. Check weather conditions.",
      coordinates: { lat: -7.9422, lng: 112.9526 },
      color: "red",
      status: "Restricted"
    },
    {
      id: 5,
      name: "Savanna Hill Trek",
      difficulty: "Moderate",
      duration: "1 hour",
      distance: "2.8 km",
      elevation: "250m gain",
      startPoint: "Cemoro Lawang Village",
      endPoint: "Savanna Viewpoint",
      description: "Beautiful trek through grasslands offering panoramic views of the Tengger Caldera.",
      highlights: ["Grassland scenery", "Panoramic views", "Peaceful atmosphere"],
      tips: "Best visited in dry season. Great for photography during golden hour.",
      coordinates: { lat: -7.9420, lng: 112.9535 },
      color: "blue",
      status: "Open"
    },
    {
      id: 6,
      name: "Whispering Sand Trail",
      difficulty: "Easy",
      duration: "40 minutes",
      distance: "1.8 km",
      elevation: "100m gain",
      startPoint: "Cemoro Lawang",
      endPoint: "Whispering Sand Dunes",
      description: "Gentle walk to the mystical sand dunes where locals believe you can hear whispers in the wind.",
      highlights: ["Cultural significance", "Sand dunes", "Local legends"],
      tips: "Visit during sunset for magical atmosphere. Respect local customs and beliefs.",
      coordinates: { lat: -7.9428, lng: 112.9532 },
      color: "purple",
      status: "Open"
    }
  ];

  const difficultyFilters = [
    { key: 'all', label: 'All Trails', icon: 'Map' },
    { key: 'Easy', label: 'Easy', icon: 'Smile' },
    { key: 'Moderate', label: 'Moderate', icon: 'Zap' },
    { key: 'Hard', label: 'Hard', icon: 'Mountain' }
  ];

  const filteredTrails = activeFilter === 'all' 
    ? trails 
    : trails?.filter(trail => trail?.difficulty === activeFilter);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'text-green-600 bg-green-100';
      case 'Restricted': return 'text-red-600 bg-red-100';
      case 'Closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 volcanic-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Icon name="Map" size={24} className="text-primary" />
          Interactive Trail Map
        </h3>
        <Button variant="outline" size="sm" iconName="Download">
          Download Map
        </Button>
      </div>
      {/* Difficulty Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {difficultyFilters?.map((filter) => (
          <button
            key={filter?.key}
            onClick={() => setActiveFilter(filter?.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeFilter === filter?.key
                ? 'bg-primary text-primary-foreground volcanic-glow'
                : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <Icon name={filter?.icon} size={16} />
            {filter?.label}
          </button>
        ))}
      </div>
      {/* Map Container */}
      <div className="relative bg-muted rounded-lg mb-6 overflow-hidden" style={{ height: '400px' }}>
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-yellow-50 to-orange-100">
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 400 300">
              {/* Mountain silhouettes */}
              <path d="M0,200 Q100,150 200,180 T400,160 L400,300 L0,300 Z" fill="#8B7355" opacity="0.3"/>
              <path d="M50,220 Q150,170 250,200 T400,180 L400,300 L50,300 Z" fill="#A0916B" opacity="0.4"/>
              
              {/* Crater representation */}
              <circle cx="200" cy="180" r="30" fill="#DC2626" opacity="0.6"/>
              <circle cx="200" cy="180" r="20" fill="#EF4444" opacity="0.4"/>
            </svg>
          </div>
        </div>

        {/* Trail Markers */}
        {filteredTrails?.map((trail, index) => (
          <button
            key={trail?.id}
            onClick={() => setSelectedTrail(selectedTrail === trail?.id ? null : trail?.id)}
            className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-110 ${
              selectedTrail === trail?.id ? 'scale-125 z-10' : 'z-5'
            }`}
            style={{
              backgroundColor: trail?.color === 'green' ? '#10B981' :
                             trail?.color === 'orange' ? '#F59E0B' :
                             trail?.color === 'yellow' ? '#EAB308' :
                             trail?.color === 'red' ? '#EF4444' :
                             trail?.color === 'blue' ? '#3B82F6' :
                             trail?.color === 'purple' ? '#8B5CF6' : '#6B7280',
              left: `${20 + (index * 12) % 60}%`,
              top: `${30 + (index * 15) % 40}%`
            }}
          >
            <Icon name="MapPin" size={16} color="white" />
          </button>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
          <div className="text-xs font-semibold text-gray-700 mb-2">Trail Difficulty</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-600">Easy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs text-gray-600">Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-600">Hard</span>
            </div>
          </div>
        </div>
      </div>
      {/* Trail List */}
      <div className="space-y-4">
        {filteredTrails?.map((trail) => (
          <div
            key={trail?.id}
            className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
              selectedTrail === trail?.id
                ? 'border-primary bg-primary/5 volcanic-glow' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
            onClick={() => setSelectedTrail(selectedTrail === trail?.id ? null : trail?.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-text-primary mb-1">{trail?.name}</h4>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trail?.difficulty)}`}>
                    {trail?.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trail?.status)}`}>
                    {trail?.status}
                  </span>
                </div>
              </div>
              <Icon 
                name={selectedTrail === trail?.id ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-text-secondary" 
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">{trail?.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Route" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">{trail?.distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="TrendingUp" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">{trail?.elevation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">GPS Available</span>
              </div>
            </div>

            {selectedTrail === trail?.id && (
              <div className="border-t border-border pt-4 space-y-4">
                <p className="text-sm text-text-secondary">{trail?.description}</p>
                
                <div>
                  <h5 className="font-medium text-text-primary mb-2">Trail Highlights</h5>
                  <div className="flex flex-wrap gap-2">
                    {trail?.highlights?.map((highlight, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-text-primary mb-2">Route</h5>
                  <div className="text-sm text-text-secondary">
                    <strong>Start:</strong> {trail?.startPoint} → <strong>End:</strong> {trail?.endPoint}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Icon name="Lightbulb" size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-800 mb-1">Pro Tips</div>
                      <div className="text-sm text-blue-700">{trail?.tips}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" iconName="Navigation">
                    Get Directions
                  </Button>
                  <Button variant="outline" size="sm" iconName="Download">
                    Download GPX
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveTrailMap;