import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TransportationPlanner = () => {
  const [selectedRoute, setSelectedRoute] = useState('malang-bromo');
  const [transportMode, setTransportMode] = useState('jeep');
  const [groupSize, setGroupSize] = useState(4);

  const routes = [
    {
      id: 'malang-bromo',
      name: 'Malang to Bromo',
      distance: '45 km',
      duration: '1.5 hours',
      description: 'Most popular route via Tumpang and Gubukklakah'
    },
    {
      id: 'surabaya-bromo',
      name: 'Surabaya to Bromo',
      distance: '85 km',
      duration: '2.5 hours',
      description: 'Direct route via Pasuruan and Tosari'
    },
    {
      id: 'yogyakarta-bromo',
      name: 'Yogyakarta to Bromo',
      distance: '320 km',
      duration: '6 hours',
      description: 'Long journey via Madiun and Malang'
    },
    {
      id: 'jakarta-bromo',
      name: 'Jakarta to Bromo',
      distance: '680 km',
      duration: '12 hours',
      description: 'Overnight journey via Surabaya'
    }
  ];

  const transportOptions = [
    {
      id: 'jeep',
      name: '4WD Jeep Tour',
      icon: 'Truck',
      capacity: '6-8 people',
      price: 400000,
      duration: 'Full day',
      description: 'Traditional hardtop jeep with experienced local driver',
      features: ['Local driver/guide', 'Fuel included', 'Insurance covered', 'Sunrise tour included'],
      pros: ['Authentic experience', 'Great for groups', 'All-terrain capability'],
      cons: ['Can be bumpy', 'Open to elements', 'Limited luggage space']
    },
    {
      id: 'motorbike',
      name: 'Trail Bike Adventure',
      icon: 'Bike',
      capacity: '1-2 people',
      price: 200000,
      duration: 'Half day',
      description: 'Self-guided or guided motorcycle adventure',
      features: ['Helmet provided', 'Basic insurance', 'Route map', 'Emergency contact'],
      pros: ['Freedom to explore', 'Thrilling experience', 'Cost effective'],
      cons: ['Requires license', 'Weather dependent', 'Physical demanding']
    },
    {
      id: 'hiking',
      name: 'Guided Hiking',
      icon: 'MapPin',
      capacity: '1-15 people',
      price: 150000,
      duration: '6-8 hours',
      description: 'Trekking with certified mountain guide',
      features: ['Certified guide', 'Safety equipment', 'First aid kit', 'Trail permits'],
      pros: ['Eco-friendly', 'Great exercise', 'Intimate experience'],
      cons: ['Physically demanding', 'Weather dependent', 'Longer duration']
    },
    {
      id: 'private-car',
      name: 'Private Car + Jeep',
      icon: 'Car',
      capacity: '4-6 people',
      price: 800000,
      duration: 'Full day',
      description: 'Comfortable car to base + jeep for crater access',
      features: ['AC vehicle', 'Professional driver', 'Jeep transfer', 'Flexible timing'],
      pros: ['Most comfortable', 'Flexible schedule', 'Good for families'],
      cons: ['Most expensive', 'Less authentic', 'Still need jeep for crater']
    }
  ];

  const routeOptions = routes?.map(route => ({
    value: route?.id,
    label: `${route?.name} (${route?.distance}, ${route?.duration})`
  }));

  const transportModeOptions = transportOptions?.map(option => ({
    value: option?.id,
    label: `${option?.name} - ${formatCurrency(option?.price)}`
  }));

  const currentRoute = routes?.find(route => route?.id === selectedRoute);
  const currentTransport = transportOptions?.find(option => option?.id === transportMode);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const calculateTotalCost = () => {
    if (!currentTransport) return 0;
    
    let baseCost = currentTransport?.price;
    
    // Adjust for group size
    if (currentTransport?.id === 'motorbike' || currentTransport?.id === 'hiking') {
      baseCost *= groupSize;
    }
    
    // Add route-based surcharges
    const routeSurcharges = {
      'malang-bromo': 0,
      'surabaya-bromo': 100000,
      'yogyakarta-bromo': 300000,
      'jakarta-bromo': 500000
    };
    
    baseCost += routeSurcharges?.[selectedRoute] || 0;
    
    return baseCost;
  };

  const getRouteStops = (routeId) => {
    const stops = {
      'malang-bromo': [
        { name: 'Malang City', time: '00:00', description: 'Starting point - hotel pickup' },
        { name: 'Tumpang', time: '00:30', description: 'Last fuel station and supplies' },
        { name: 'Gubukklakah', time: '01:00', description: 'Village entrance to Bromo area' },
        { name: 'Cemoro Lawang', time: '01:30', description: 'Base village - accommodation area' }
      ],
      'surabaya-bromo': [
        { name: 'Surabaya', time: '00:00', description: 'Starting point - airport/hotel pickup' },
        { name: 'Pasuruan', time: '01:00', description: 'Rest stop and refreshments' },
        { name: 'Tosari', time: '02:00', description: 'Mountain village entrance' },
        { name: 'Cemoro Lawang', time: '02:30', description: 'Base village arrival' }
      ],
      'yogyakarta-bromo': [
        { name: 'Yogyakarta', time: '00:00', description: 'Starting point - early morning departure' },
        { name: 'Madiun', time: '02:30', description: 'Lunch break and fuel stop' },
        { name: 'Malang', time: '04:30', description: 'Rest and preparation stop' },
        { name: 'Cemoro Lawang', time: '06:00', description: 'Final destination arrival' }
      ],
      'jakarta-bromo': [
        { name: 'Jakarta', time: '00:00', description: 'Overnight departure - sleeper bus' },
        { name: 'Semarang', time: '04:00', description: 'Rest stop and breakfast' },
        { name: 'Surabaya', time: '08:00', description: 'Transfer point to local transport' },
        { name: 'Cemoro Lawang', time: '12:00', description: 'Arrival at Bromo base' }
      ]
    };
    
    return stops?.[routeId] || [];
  };

  return (
    <div className="bg-card rounded-xl p-6 volcanic-glow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <Icon name="Route" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Transportation Planner</h3>
          <p className="text-text-secondary text-sm">Plan your route and transportation to Bromo</p>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Route & Transport Selection */}
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-text-primary mb-4">Route Selection</h4>
            <Select
              label="Choose your starting point"
              options={routeOptions}
              value={selectedRoute}
              onChange={setSelectedRoute}
            />
            
            {currentRoute && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Icon name="MapPin" size={16} color="var(--color-primary)" />
                  <span className="font-medium text-text-primary">{currentRoute?.name}</span>
                </div>
                <p className="text-sm text-text-secondary mb-2">{currentRoute?.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Distance:</span>
                    <span className="ml-2 font-medium text-text-primary">{currentRoute?.distance}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Duration:</span>
                    <span className="ml-2 font-medium text-text-primary">{currentRoute?.duration}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-medium text-text-primary mb-4">Transportation Mode</h4>
            <Select
              label="Choose transportation"
              options={transportModeOptions}
              value={transportMode}
              onChange={setTransportMode}
            />
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-text-primary mb-2">Group Size</label>
              <input
                type="number"
                min="1"
                max="20"
                value={groupSize}
                onChange={(e) => setGroupSize(parseInt(e?.target?.value) || 1)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Cost Summary */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20">
            <h5 className="font-medium text-text-primary mb-3">Cost Estimate</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Base transport cost:</span>
                <span className="font-medium text-text-primary">{formatCurrency(currentTransport?.price || 0)}</span>
              </div>
              {(transportMode === 'motorbike' || transportMode === 'hiking') && groupSize > 1 && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">× {groupSize} people:</span>
                  <span className="font-medium text-text-primary">{formatCurrency((currentTransport?.price || 0) * groupSize)}</span>
                </div>
              )}
              <div className="border-t border-border pt-2">
                <div className="flex justify-between">
                  <span className="font-medium text-text-primary">Total Cost:</span>
                  <span className="text-lg font-bold text-primary">{formatCurrency(calculateTotalCost())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transport Details & Route Map */}
        <div className="space-y-6">
          {/* Transport Details */}
          {currentTransport && (
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name={currentTransport?.icon} size={24} color="var(--color-primary)" />
                <div>
                  <h5 className="font-medium text-text-primary">{currentTransport?.name}</h5>
                  <p className="text-sm text-text-secondary">{currentTransport?.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-text-secondary">Capacity:</span>
                  <span className="ml-2 font-medium text-text-primary">{currentTransport?.capacity}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Duration:</span>
                  <span className="ml-2 font-medium text-text-primary">{currentTransport?.duration}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h6 className="text-sm font-medium text-text-primary mb-2">Features Included:</h6>
                  <ul className="space-y-1">
                    {currentTransport?.features?.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="Check" size={12} color="green" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h6 className="text-sm font-medium text-green-700 mb-2">Pros:</h6>
                    <ul className="space-y-1">
                      {currentTransport?.pros?.map((pro, index) => (
                        <li key={index} className="flex items-center space-x-2 text-xs text-green-600">
                          <Icon name="Plus" size={10} />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-orange-700 mb-2">Cons:</h6>
                    <ul className="space-y-1">
                      {currentTransport?.cons?.map((con, index) => (
                        <li key={index} className="flex items-center space-x-2 text-xs text-orange-600">
                          <Icon name="Minus" size={10} />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Route Timeline */}
          <div className="bg-background border border-border rounded-lg p-4">
            <h5 className="font-medium text-text-primary mb-4">Route Timeline</h5>
            <div className="space-y-4">
              {getRouteStops(selectedRoute)?.map((stop, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h6 className="font-medium text-text-primary text-sm">{stop?.name}</h6>
                      <span className="text-xs text-text-secondary bg-muted px-2 py-0.5 rounded-full">
                        {stop?.time}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">{stop?.description}</p>
                  </div>
                  {index < getRouteStops(selectedRoute)?.length - 1 && (
                    <div className="absolute left-4 mt-8 w-0.5 h-4 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <Icon name="Map" size={48} className="mx-auto mb-2 text-text-secondary" />
            <p className="text-sm text-text-secondary mb-2">Interactive Route Map</p>
            <Button
              size="sm"
              variant="outline"
              iconName="ExternalLink"
              iconPosition="left"
            >
              View in Google Maps
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              fullWidth
              iconName="Download"
              iconPosition="left"
            >
              Save Route
            </Button>
            <Button
              variant="default"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              className="volcanic-glow"
            >
              Book Transport
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportationPlanner;