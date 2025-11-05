import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContactFAB = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const emergencyContacts = [
    {
      id: 1,
      label: "Emergency Hotline",
      number: "+62 812-3456-7890",
      icon: "Phone",
      color: "bg-red-500 hover:bg-red-600",
      description: "24/7 Emergency Support"
    },
    {
      id: 2,
      label: "WhatsApp Support",
      number: "+62 813-4567-8901",
      icon: "MessageCircle",
      color: "bg-green-500 hover:bg-green-600",
      description: "Instant Chat Support"
    },
    {
      id: 3,
      label: "Medical Emergency",
      number: "119",
      icon: "Heart",
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Indonesian Emergency Services"
    }
  ];

  const handleCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleWhatsApp = (number) => {
    const message = encodeURIComponent("Hello! I need assistance with my Bromo adventure booking.");
    window.open(`https://wa.me/${number?.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
      {/* FAB Container */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Emergency Contacts Menu */}
        <div className={`mb-4 space-y-3 transition-all duration-300 ${
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          {emergencyContacts?.map((contact, index) => (
            <div
              key={contact?.id}
              className={`transform transition-all duration-300 delay-${index * 100}`}
              style={{
                transitionDelay: isExpanded ? `${index * 100}ms` : '0ms'
              }}
            >
              <div className="flex items-center space-x-3 bg-white rounded-lg shadow-volcanic p-3 min-w-64">
                <button
                  onClick={() => {
                    if (contact?.icon === 'MessageCircle') {
                      handleWhatsApp(contact?.number);
                    } else {
                      handleCall(contact?.number);
                    }
                  }}
                  className={`w-12 h-12 rounded-full ${contact?.color} flex items-center justify-center text-white transition-transform duration-200 hover:scale-110 seismic-hover`}
                >
                  <Icon name={contact?.icon} size={20} />
                </button>
                
                <div className="flex-1">
                  <div className="font-semibold text-text-primary text-sm">
                    {contact?.label}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {contact?.description}
                  </div>
                  <div className="text-sm font-mono text-primary">
                    {contact?.number}
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    if (contact?.icon === 'MessageCircle') {
                      handleWhatsApp(contact?.number);
                    } else {
                      handleCall(contact?.number);
                    }
                  }}
                  className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
                >
                  <Icon name="ExternalLink" size={16} className="text-text-secondary" />
                </button>
              </div>
            </div>
          ))}
          
          {/* Safety Tips */}
          <div className="bg-white rounded-lg shadow-volcanic p-3 min-w-64">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-text-primary text-sm mb-1">
                  Safety First
                </div>
                <div className="text-xs text-text-secondary">
                  Always inform your guide about any health conditions or concerns before starting your adventure.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main FAB Button */}
        <button
          onClick={toggleExpanded}
          className={`w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full shadow-volcanic flex items-center justify-center text-white transition-all duration-300 seismic-hover ${
            isExpanded ? 'rotate-45' : 'rotate-0'
          }`}
          aria-label="Emergency contacts"
        >
          <Icon 
            name={isExpanded ? "X" : "Phone"} 
            size={24} 
            className="transition-transform duration-300"
          />
        </button>

        {/* Pulse Animation */}
        {!isExpanded && (
          <div className="absolute inset-0 w-16 h-16 bg-red-500 rounded-full animate-ping opacity-20"></div>
        )}
      </div>
      {/* Emergency Banner (Mobile) */}
      <div className="fixed top-20 left-4 right-4 z-40 lg:hidden">
        <div className={`bg-red-50 border border-red-200 rounded-lg p-3 transition-all duration-300 ${
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="flex items-center space-x-2 text-red-700">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm font-medium">
              Emergency contacts available below
            </span>
          </div>
        </div>
      </div>
      {/* Desktop Emergency Strip */}
      <div className="hidden lg:block fixed top-20 right-6 z-40">
        <div className="bg-white border border-border rounded-lg shadow-volcanic p-4 max-w-xs">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Shield" size={20} className="text-red-500" />
            <span className="font-semibold text-text-primary">Emergency Support</span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">24/7 Hotline:</span>
              <button
                onClick={() => handleCall("+62 812-3456-7890")}
                className="text-primary hover:underline font-medium"
              >
                +62 812-3456-7890
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">WhatsApp:</span>
              <button
                onClick={() => handleWhatsApp("+62 813-4567-8901")}
                className="text-green-600 hover:underline font-medium"
              >
                Chat Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmergencyContactFAB;