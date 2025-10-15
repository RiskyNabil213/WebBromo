import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ParkStatusCard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const parkStatus = {
    overall: "Open",
    alertLevel: "Normal",
    lastUpdate: lastUpdated,
    conditions: {
      weather: "Clear",
      visibility: "Excellent",
      temperature: "8-18°C",
      windSpeed: "12 km/h"
    },
    areas: [
      {
        name: "Penanjakan Viewpoint",
        status: "Open",
        capacity: "85%",
        accessibility: "Full Access",
        notes: "Peak sunrise viewing hours: 5:30-6:30 AM"
      },
      {
        name: "Bromo Crater",
        status: "Open",
        capacity: "60%",
        accessibility: "Restricted Access",
        notes: "Climbing permitted with guide only"
      },
      {
        name: "Sea of Sand",
        status: "Open",
        capacity: "40%",
        accessibility: "Full Access",
        notes: "Horse riding and jeep tours available"
      },
      {
        name: "Savanna Hill",
        status: "Open",
        capacity: "25%",
        accessibility: "Full Access",
        notes: "Perfect for photography and peaceful walks"
      },
      {
        name: "Whispering Sand",
        status: "Open",
        capacity: "15%",
        accessibility: "Full Access",
        notes: "Cultural site - respect local customs"
      }
    ],
    permits: {
      required: true,
      price: "30,000 IDR per person",
      validity: "24 hours",
      purchaseLocation: "Park entrance or online"
    },
    emergencyContacts: [
      {
        service: "Park Rangers",
        number: "+62 335 541 821",
        available: "24/7"
      },
      {
        service: "Medical Emergency",
        number: "+62 335 596 048",
        available: "24/7"
      },
      {
        service: "Tourist Police",
        number: "+62 335 541 976",
        available: "24/7"
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'text-green-600 bg-green-100';
      case 'restricted': return 'text-yellow-600 bg-yellow-100';
      case 'closed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'advisory': return 'text-yellow-600 bg-yellow-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'danger': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCapacityColor = (capacity) => {
    const percent = parseInt(capacity);
    if (percent >= 80) return 'text-red-600 bg-red-100';
    if (percent >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="bg-card rounded-xl p-6 volcanic-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Icon name="Shield" size={24} className="text-primary" />
          Park Status & Safety
        </h3>
        <div className="text-sm text-text-secondary">
          Last updated: {formatTime(lastUpdated)}
        </div>
      </div>
      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-secondary">Park Status</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(parkStatus?.overall)}`}>
              {parkStatus?.overall}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">All main areas accessible</span>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-secondary">Alert Level</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAlertLevelColor(parkStatus?.alertLevel)}`}>
              {parkStatus?.alertLevel}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Activity" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Volcanic activity stable</span>
          </div>
        </div>
      </div>
      {/* Current Conditions */}
      <div className="mb-6">
        <h4 className="font-semibold text-text-primary mb-3">Current Conditions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Icon name="Sun" size={24} className="text-yellow-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-text-primary">{parkStatus?.conditions?.weather}</div>
            <div className="text-xs text-text-secondary">Weather</div>
          </div>
          <div className="text-center">
            <Icon name="Eye" size={24} className="text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-text-primary">{parkStatus?.conditions?.visibility}</div>
            <div className="text-xs text-text-secondary">Visibility</div>
          </div>
          <div className="text-center">
            <Icon name="Thermometer" size={24} className="text-red-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-text-primary">{parkStatus?.conditions?.temperature}</div>
            <div className="text-xs text-text-secondary">Temperature</div>
          </div>
          <div className="text-center">
            <Icon name="Wind" size={24} className="text-gray-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-text-primary">{parkStatus?.conditions?.windSpeed}</div>
            <div className="text-xs text-text-secondary">Wind Speed</div>
          </div>
        </div>
      </div>
      {/* Area Status */}
      <div className="mb-6">
        <h4 className="font-semibold text-text-primary mb-3">Area Status & Capacity</h4>
        <div className="space-y-3">
          {parkStatus?.areas?.map((area, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-text-primary">{area?.name}</h5>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(area?.status)}`}>
                    {area?.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCapacityColor(area?.capacity)}`}>
                    {area?.capacity} Full
                  </span>
                </div>
              </div>
              <div className="text-sm text-text-secondary mb-2">
                <strong>Access:</strong> {area?.accessibility}
              </div>
              <div className="text-sm text-text-secondary">
                {area?.notes}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Permits & Pricing */}
      <div className="mb-6">
        <h4 className="font-semibold text-text-primary mb-3">Entry Permits</h4>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Ticket" size={16} className="text-blue-600" />
                <span className="font-medium text-blue-800">Entry Fee</span>
              </div>
              <div className="text-sm text-blue-700">
                <strong>{parkStatus?.permits?.price}</strong> (Valid for {parkStatus?.permits?.validity})
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="MapPin" size={16} className="text-blue-600" />
                <span className="font-medium text-blue-800">Purchase Location</span>
              </div>
              <div className="text-sm text-blue-700">
                {parkStatus?.permits?.purchaseLocation}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Emergency Contacts */}
      <div>
        <h4 className="font-semibold text-text-primary mb-3">Emergency Contacts</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {parkStatus?.emergencyContacts?.map((contact, index) => (
            <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Phone" size={16} className="text-red-600" />
                <span className="font-medium text-red-800">{contact?.service}</span>
              </div>
              <div className="text-sm text-red-700 mb-1">
                <strong>{contact?.number}</strong>
              </div>
              <div className="text-xs text-red-600">
                Available: {contact?.available}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
        <Button variant="default" size="sm" iconName="RefreshCw">
          Refresh Status
        </Button>
        <Button variant="outline" size="sm" iconName="Bell">
          Set Alerts
        </Button>
        <Button variant="outline" size="sm" iconName="Download">
          Safety Guide
        </Button>
        <Button variant="outline" size="sm" iconName="MessageCircle">
          Contact Rangers
        </Button>
      </div>
    </div>
  );
};

export default ParkStatusCard;