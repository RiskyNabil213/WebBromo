import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/appImage';
import Button from '../../../components/ui/Button';

const ComparisonModal = ({ experiences, isOpen, onClose, onBookExperience }) => {
  const [selectedExperiences, setSelectedExperiences] = useState(experiences?.slice(0, 3));

  if (!isOpen) return null;

  const comparisonFeatures = [
    { key: 'price', label: 'Price', type: 'price' },
    { key: 'duration', label: 'Duration', type: 'text' },
    { key: 'groupSize', label: 'Max Group Size', type: 'text' },
    { key: 'rating', label: 'Rating', type: 'rating' },
    { key: 'reviewCount', label: 'Reviews', type: 'number' },
    { key: 'instantBooking', label: 'Instant Booking', type: 'boolean' },
    { key: 'freeEquipment', label: 'Free Equipment', type: 'boolean' },
    { key: 'englishGuide', label: 'English Guide', type: 'boolean' },
    { key: 'hotelPickup', label: 'Hotel Pickup', type: 'boolean' },
    { key: 'breakfast', label: 'Breakfast Included', type: 'boolean' },
    { key: 'photography', label: 'Photography Service', type: 'boolean' },
    { key: 'cancellation', label: 'Free Cancellation', type: 'boolean' }
  ];

  const renderFeatureValue = (experience, feature) => {
    const value = experience?.[feature?.key];
    
    switch (feature?.type) {
      case 'price':
        return (
          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              IDR {value?.toLocaleString('id-ID') || 'N/A'}
            </div>
            <div className="text-xs text-text-secondary">per person</div>
          </div>
        );
      
      case 'rating':
        return (
          <div className="flex items-center justify-center space-x-1">
            <Icon name="Star" size={16} color="#F59E0B" className="fill-current" />
            <span className="font-medium">{value || 'N/A'}</span>
          </div>
        );
      
      case 'boolean':
        return (
          <div className="flex justify-center">
            {value ? (
              <Icon name="Check" size={20} color="#16A34A" />
            ) : (
              <Icon name="X" size={20} color="#DC2626" />
            )}
          </div>
        );
      
      case 'number':
        return (
          <div className="text-center font-medium">
            {value?.toLocaleString() || 'N/A'}
          </div>
        );
      
      default:
        return (
          <div className="text-center">
            {value || 'N/A'}
          </div>
        );
    }
  };

  const getBestValue = (feature) => {
    if (feature?.type === 'price') {
      return Math.min(...selectedExperiences?.map(exp => exp?.[feature?.key] || Infinity));
    } else if (feature?.type === 'rating') {
      return Math.max(...selectedExperiences?.map(exp => exp?.[feature?.key] || 0));
    } else if (feature?.type === 'number') {
      return Math.max(...selectedExperiences?.map(exp => exp?.[feature?.key] || 0));
    }
    return null;
  };

  const isBestValue = (experience, feature) => {
    const bestValue = getBestValue(feature);
    if (bestValue === null) return false;
    
    const currentValue = experience?.[feature?.key];
    if (feature?.type === 'price') {
      return currentValue === bestValue;
    } else if (feature?.type === 'rating' || feature?.type === 'number') {
      return currentValue === bestValue;
    }
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Compare Experiences</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <div className="min-w-full">
            {/* Experience Headers */}
            <div className="grid grid-cols-4 gap-4 p-6 border-b border-border bg-muted/50">
              <div className="font-medium text-text-primary">Features</div>
              {selectedExperiences?.map((experience) => (
                <div key={experience?.id} className="text-center">
                  <Image
                    src={experience?.image}
                    alt={experience?.imageAlt}
                    className="w-16 h-16 rounded-lg object-cover mx-auto mb-2"
                  />
                  <h3 className="font-semibold text-sm text-text-primary line-clamp-2 mb-1">
                    {experience?.title}
                  </h3>
                  <p className="text-xs text-text-secondary">{experience?.provider?.name}</p>
                  <div className="mt-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onBookExperience(experience)}
                      className="volcanic-glow"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Comparison Rows */}
            <div className="divide-y divide-border">
              {comparisonFeatures?.map((feature) => (
                <div key={feature?.key} className="grid grid-cols-4 gap-4 p-4 hover:bg-muted/30 transition-colors duration-200">
                  <div className="font-medium text-text-primary flex items-center">
                    {feature?.label}
                  </div>
                  {selectedExperiences?.map((experience) => (
                    <div 
                      key={`${experience?.id}-${feature?.key}`} 
                      className={`flex items-center justify-center py-2 rounded-lg transition-all duration-200 ${
                        isBestValue(experience, feature) 
                          ? 'bg-success/10 border border-success/20 volcanic-glow' :''
                      }`}
                    >
                      {renderFeatureValue(experience, feature)}
                      {isBestValue(experience, feature) && (
                        <div className="absolute -top-1 -right-1">
                          <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
                            <Icon name="Crown" size={10} color="white" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Additional Information */}
            <div className="p-6 bg-muted/50 border-t border-border">
              <div className="grid grid-cols-4 gap-4">
                <div className="font-medium text-text-primary">Highlights</div>
                {selectedExperiences?.map((experience) => (
                  <div key={`highlights-${experience?.id}`} className="text-sm">
                    <ul className="space-y-1">
                      {experience?.highlights?.slice(0, 3)?.map((highlight, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="Check" size={14} color="#16A34A" className="mt-0.5 flex-shrink-0" />
                          <span className="text-text-secondary">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            Compare up to 3 experiences side by side
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close Comparison
            </Button>
            <Button 
              variant="default" 
              className="volcanic-glow"
              iconName="ExternalLink"
              iconPosition="right"
            >
              View All Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;