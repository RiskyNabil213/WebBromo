import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationGuide = () => {
  const [selectedLocation, setSelectedLocation] = useState('penanjakan');

  const locations = [
    {
      id: 'penanjakan',
      name: 'Penanjakan Viewpoint',
      type: 'Sunrise Viewpoint',
      elevation: '2,770m',
      coordinates: { lat: -7.9425, lng: 112.9530 },
      description: 'The most famous sunrise viewpoint offering panoramic views of Mount Bromo, Mount Batok, and Mount Semeru. This is the classic postcard view of Bromo.',
      bestTime: '5:30 AM - 6:30 AM',
      difficulty: 'Easy',
      facilities: ['Parking', 'Toilets', 'Food stalls', 'Souvenir shops'],
      tips: 'Arrive by 4:30 AM for best spots. Bring warm clothing as temperatures can drop to 3°C.',
      crowdLevel: 'Very High',
      accessMethod: 'Jeep tour or motorcycle',
      entryFee: 'Included in park ticket',
      highlights: [
        'Iconic sunrise views',
        'Mount Semeru backdrop',
        'Sea of Sand panorama',
        'Photography paradise'
      ]
    },
    {
      id: 'bromo-crater',
      name: 'Bromo Crater',
      type: 'Active Volcano',
      elevation: '2,329m',
      coordinates: { lat: -7.9424, lng: 112.9530 },
      description: 'The active crater of Mount Bromo with sulfurous gases and occasional volcanic activity. Climbing to the rim offers dramatic views into the crater.',
      bestTime: '6:00 AM - 4:00 PM',
      difficulty: 'Moderate to Hard',
      facilities: ['Stairs to rim', 'Safety barriers', 'Guide posts'],
      tips: 'Check volcanic activity status. Avoid during high wind. Bring dust mask for sulfur gases.',
      crowdLevel: 'High',
      accessMethod: 'Walk from Sea of Sand',
      entryFee: 'Included in park ticket',
      highlights: [
        'Active volcanic crater',
        'Sulfur gas emissions',
        '360-degree rim views',
        'Geological wonder'
      ]
    },
    {
      id: 'sea-of-sand',
      name: 'Sea of Sand (Lautan Pasir)',
      type: 'Volcanic Plain',
      elevation: '2,100m',
      coordinates: { lat: -7.9426, lng: 112.9528 },
      description: 'A vast volcanic sand plain surrounding Mount Bromo, creating an otherworldly lunar landscape. Sacred to the Tengger people.',
      bestTime: 'All day (best at sunrise/sunset)',
      difficulty: 'Easy',
      facilities: ['Horse rental', 'Jeep parking', 'Local guides'],
      tips: 'Wear closed shoes to avoid sand. Horse rides available for 50,000 IDR.',
      crowdLevel: 'Moderate',
      accessMethod: 'Jeep or walking',
      entryFee: 'Included in park ticket',
      highlights: [
        'Lunar landscape',
        'Horse riding',
        'Sacred Tengger land',
        'Unique terrain'
      ]
    },
    {
      id: 'savanna-hill',
      name: 'Savanna Hill',
      type: 'Grassland Viewpoint',
      elevation: '2,400m',
      coordinates: { lat: -7.9420, lng: 112.9535 },
      description: 'Rolling grasslands offering panoramic views of the Tengger Caldera. Less crowded alternative viewpoint with beautiful sunrise and sunset views.',
      bestTime: '5:30 AM - 6:30 AM, 5:00 PM - 6:00 PM',
      difficulty: 'Moderate',
      facilities: ['Hiking trails', 'Basic shelter'],
      tips: 'Best visited in dry season. Great for photography during golden hour.',
      crowdLevel: 'Low',
      accessMethod: 'Hiking from Cemoro Lawang',
      entryFee: 'Included in park ticket',
      highlights: [
        'Panoramic caldera views',
        'Peaceful atmosphere',
        'Grassland scenery',
        'Alternative sunrise spot'
      ]
    },
    {
      id: 'whispering-sand',
      name: 'Whispering Sand',
      type: 'Cultural Site',
      elevation: '2,200m',
      coordinates: { lat: -7.9428, lng: 112.9532 },
      description: 'Mystical sand dunes where locals believe you can hear whispers in the wind. Important cultural and spiritual site for the Tengger people.',
      bestTime: 'Late afternoon for best acoustics',
      difficulty: 'Easy',
      facilities: ['Walking paths', 'Cultural information'],
      tips: 'Visit during sunset for magical atmosphere. Respect local customs and beliefs.',
      crowdLevel: 'Low',
      accessMethod: 'Walking from Cemoro Lawang',
      entryFee: 'Included in park ticket',
      highlights: [
        'Cultural significance',
        'Mystical atmosphere',
        'Sand dune formations',
        'Local legends'
      ]
    },
    {
      id: 'cemoro-lawang',
      name: 'Cemoro Lawang Village',
      type: 'Base Village',
      elevation: '2,217m',
      coordinates: { lat: -7.9430, lng: 112.9540 },
      description: 'The main village and base for Bromo exploration. Home to Tengger people with homestays, restaurants, and tour operators.',
      bestTime: 'All day',
      difficulty: 'Easy',
      facilities: ['Homestays', 'Restaurants', 'ATM', 'Medical clinic', 'Tour operators'],
      tips: 'Book accommodation in advance during peak season. Try local Tengger cuisine.',
      crowdLevel: 'Moderate',
      accessMethod: 'Road access',
      entryFee: 'No entry fee',
      highlights: [
        'Tengger culture',
        'Accommodation base',
        'Local cuisine',
        'Tour services'
      ]
    }
  ];

  const selectedLoc = locations?.find(loc => loc?.id === selectedLocation);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      case 'Moderate to Hard': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCrowdLevelColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Very High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 volcanic-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Icon name="MapPin" size={24} className="text-primary" />
          Location Guide & Key Destinations
        </h3>
        <Button variant="outline" size="sm" iconName="Map">
          View Full Map
        </Button>
      </div>
      {/* Location Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        {locations?.map((location) => (
          <button
            key={location?.id}
            onClick={() => setSelectedLocation(location?.id)}
            className={`p-3 rounded-lg text-left transition-all duration-200 ${
              selectedLocation === location?.id
                ? 'bg-primary text-primary-foreground volcanic-glow'
                : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <div className="font-medium text-sm mb-1">{location?.name}</div>
            <div className="text-xs opacity-75">{location?.type}</div>
          </button>
        ))}
      </div>
      {/* Selected Location Details */}
      {selectedLoc && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-text-primary mb-2">
                    {selectedLoc?.name}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Icon name="Mountain" size={16} />
                      {selectedLoc?.elevation}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="MapPin" size={16} />
                      {selectedLoc?.coordinates?.lat?.toFixed(4)}, {selectedLoc?.coordinates?.lng?.toFixed(4)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedLoc?.difficulty)}`}>
                    {selectedLoc?.difficulty}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCrowdLevelColor(selectedLoc?.crowdLevel)}`}>
                    {selectedLoc?.crowdLevel} Crowds
                  </span>
                </div>
              </div>
              
              <p className="text-text-secondary mb-4">
                {selectedLoc?.description}
              </p>

              {/* Highlights */}
              <div className="mb-4">
                <h5 className="font-medium text-text-primary mb-2">Key Highlights</h5>
                <div className="grid grid-cols-2 gap-2">
                  {selectedLoc?.highlights?.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Icon name="Star" size={14} className="text-accent" />
                      <span className="text-sm text-text-secondary">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div>
                <h5 className="font-medium text-text-primary mb-2">Available Facilities</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedLoc?.facilities?.map((facility, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="Lightbulb" size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-yellow-800 mb-1">Pro Tips</div>
                  <div className="text-sm text-yellow-700">{selectedLoc?.tips}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Panel */}
          <div className="space-y-4">
            {/* Map Preview */}
            <div className="bg-muted rounded-lg p-4 h-48 flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title={selectedLoc?.name}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${selectedLoc?.coordinates?.lat},${selectedLoc?.coordinates?.lng}&z=14&output=embed`}
                className="rounded-lg"
              />
            </div>

            {/* Quick Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm font-medium text-text-secondary">Best Time</span>
                <span className="text-sm text-text-primary">{selectedLoc?.bestTime}</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm font-medium text-text-secondary">Access Method</span>
                <span className="text-sm text-text-primary">{selectedLoc?.accessMethod}</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm font-medium text-text-secondary">Entry Fee</span>
                <span className="text-sm text-text-primary">{selectedLoc?.entryFee}</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-text-secondary">Elevation</span>
                <span className="text-sm text-text-primary">{selectedLoc?.elevation}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button variant="default" fullWidth iconName="Navigation">
                Get Directions
              </Button>
              <Button variant="outline" fullWidth iconName="Camera">
                View Photos
              </Button>
              <Button variant="outline" fullWidth iconName="Calendar">
                Plan Visit
              </Button>
            </div>

            {/* Weather Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="CloudSun" size={16} className="text-blue-600" />
                <span className="font-medium text-blue-800 text-sm">Current Conditions</span>
              </div>
              <div className="text-sm text-blue-700">
                <div>Temperature: 8-18°C</div>
                <div>Visibility: Excellent</div>
                <div>Wind: 12 km/h</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Distance Matrix */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="font-semibold text-text-primary mb-4">Distance Between Locations</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-text-secondary">From/To</th>
                <th className="text-center py-2 text-text-secondary">Penanjakan</th>
                <th className="text-center py-2 text-text-secondary">Bromo Crater</th>
                <th className="text-center py-2 text-text-secondary">Cemoro Lawang</th>
                <th className="text-center py-2 text-text-secondary">Savanna Hill</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 font-medium text-text-primary">Penanjakan</td>
                <td className="text-center py-2 text-text-secondary">-</td>
                <td className="text-center py-2 text-text-secondary">4.2 km</td>
                <td className="text-center py-2 text-text-secondary">6.8 km</td>
                <td className="text-center py-2 text-text-secondary">3.1 km</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 font-medium text-text-primary">Bromo Crater</td>
                <td className="text-center py-2 text-text-secondary">4.2 km</td>
                <td className="text-center py-2 text-text-secondary">-</td>
                <td className="text-center py-2 text-text-secondary">3.5 km</td>
                <td className="text-center py-2 text-text-secondary">5.8 km</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 font-medium text-text-primary">Cemoro Lawang</td>
                <td className="text-center py-2 text-text-secondary">6.8 km</td>
                <td className="text-center py-2 text-text-secondary">3.5 km</td>
                <td className="text-center py-2 text-text-secondary">-</td>
                <td className="text-center py-2 text-text-secondary">2.4 km</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LocationGuide;