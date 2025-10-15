import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onChatSupport, onEmergencyContact }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActionItems = [
    {
      id: 'chat',
      icon: 'MessageCircle',
      label: 'Live Chat',
      description: 'Get instant help',
      color: 'bg-primary',
      action: onChatSupport
    },
    {
      id: 'whatsapp',
      icon: 'Phone',
      label: 'WhatsApp',
      description: 'Quick support',
      color: 'bg-success',
      action: () => window.open('https://wa.me/6281234567890', '_blank')
    },
    {
      id: 'emergency',
      icon: 'AlertTriangle',
      label: 'Emergency',
      description: '24/7 assistance',
      color: 'bg-error',
      action: onEmergencyContact
    },
    {
      id: 'favorites',
      icon: 'Heart',
      label: 'Favorites',
      description: 'View saved items',
      color: 'bg-accent',
      action: () => console.log('Show favorites')
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="mb-4 space-y-3">
          {quickActionItems?.map((item) => (
            <div
              key={item?.id}
              className="flex items-center justify-end animate-float"
              style={{ animationDelay: `${quickActionItems?.indexOf(item) * 0.1}s` }}
            >
              <div className="bg-background border border-border rounded-lg px-3 py-2 mr-3 shadow-volcanic">
                <p className="text-sm font-medium text-text-primary">{item?.label}</p>
                <p className="text-xs text-text-secondary">{item?.description}</p>
              </div>
              
              <button
                onClick={item?.action}
                className={`w-12 h-12 ${item?.color} text-white rounded-full flex items-center justify-center shadow-volcanic hover:scale-110 transition-transform duration-200 seismic-hover`}
              >
                <Icon name={item?.icon} size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-volcanic hover:scale-110 transition-all duration-300 volcanic-glow ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
      >
        <Icon name={isExpanded ? "X" : "Plus"} size={24} />
      </button>
      {/* Floating Notification Badge */}
      <div className="absolute -top-2 -left-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center text-xs font-bold animate-pulse-glow">
        3
      </div>
    </div>
  );
};

export default QuickActions;