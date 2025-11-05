import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ExperienceCard = ({ experience, onBookNow, onViewDetails }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available': return 'text-success bg-success/10';
      case 'limited': return 'text-warning bg-warning/10';
      case 'unavailable': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available': return 'Available';
      case 'limited': return 'Limited Spots';
      case 'unavailable': return 'Fully Booked';
      default: return 'Check Availability';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-volcanic transition-all duration-300 group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={experience?.image}
          alt={experience?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 seismic-hover"
        >
          <Icon 
            name={isWishlisted ? "Heart" : "Heart"} 
            size={16} 
            color={isWishlisted ? "#DC2626" : "#78716C"}
            className={isWishlisted ? "fill-current" : ""}
          />
        </button>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
            {experience?.category}
          </span>
        </div>

        {/* Availability Status */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(experience?.availability)}`}>
            {getAvailabilityText(experience?.availability)}
          </span>
        </div>

        {/* Instant Booking Badge */}
        {experience?.instantBooking && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-1 bg-success text-success-foreground text-xs font-medium rounded-full flex items-center space-x-1">
              <Icon name="Zap" size={12} />
              <span>Instant</span>
            </span>
          </div>
        )}
      </div>
      {/* Content Section */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="mb-2">
          <h3 className="font-semibold text-text-primary mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {experience?.title}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} color="#F59E0B" className="fill-current" />
              <span className="text-sm font-medium text-text-primary">{experience?.rating}</span>
            </div>
            <span className="text-sm text-text-secondary">({experience?.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {experience?.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-3">
          {experience?.features?.slice(0, 3)?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-1 text-xs text-text-secondary">
              <Icon name={feature?.icon} size={12} />
              <span>{feature?.text}</span>
            </div>
          ))}
          {experience?.features?.length > 3 && (
            <span className="text-xs text-text-secondary">+{experience?.features?.length - 3} more</span>
          )}
        </div>

        {/* Provider Info */}
        <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-border">
          <Image
            src={experience?.provider?.avatar}
            alt={experience?.provider?.avatarAlt}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-text-secondary">{experience?.provider?.name}</span>
          {experience?.provider?.verified && (
            <Icon name="BadgeCheck" size={14} color="#16A34A" className="fill-current" />
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-bold text-text-primary">
                IDR {experience?.price?.toLocaleString('id-ID')}
              </span>
              <span className="text-sm text-text-secondary">/{experience?.priceUnit}</span>
            </div>
            {experience?.originalPrice && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary line-through">
                  IDR {experience?.originalPrice?.toLocaleString('id-ID')}
                </span>
                <span className="text-xs bg-success/10 text-success px-1 py-0.5 rounded">
                  Save {Math.round((1 - experience?.price / experience?.originalPrice) * 100)}%
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(experience)}
              className="seismic-hover"
            >
              Details
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onBookNow(experience)}
              disabled={experience?.availability === 'unavailable'}
              className="volcanic-glow seismic-hover"
            >
              {experience?.availability === 'unavailable' ? 'Sold Out' : 'Book Now'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;