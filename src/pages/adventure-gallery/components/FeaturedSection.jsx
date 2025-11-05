import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedSection = ({ featuredPhotos, onPhotoClick }) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Star" size={24} className="text-primary" />
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary">
              Featured Photography
            </h2>
            <Icon name="Star" size={24} className="text-primary" />
          </div>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Exceptional captures that showcase the raw beauty and adventure spirit of Mount Bromo
          </p>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Photo */}
          <div className="lg:col-span-2">
            <div 
              className="group relative bg-card rounded-2xl overflow-hidden volcanic-glow hover:shadow-xl transition-all duration-500 cursor-pointer h-96"
              onClick={() => onPhotoClick(featuredPhotos?.[0])}
            >
              <Image
                src={featuredPhotos?.[0]?.image}
                alt={featuredPhotos?.[0]?.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Featured Badge */}
              <div className="absolute top-6 left-6">
                <div className="bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center space-x-2">
                  <Icon name="Award" size={16} />
                  <span className="text-sm font-semibold">Photo of the Month</span>
                </div>
              </div>

              {/* Photo Info */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {featuredPhotos?.[0]?.title}
                </h3>
                <p className="text-white/90 text-sm mb-4 line-clamp-2">
                  {featuredPhotos?.[0]?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={featuredPhotos?.[0]?.photographer?.avatar}
                      alt={featuredPhotos?.[0]?.photographer?.avatarAlt}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                    />
                    <div>
                      <h4 className="text-white font-semibold text-sm">
                        {featuredPhotos?.[0]?.photographer?.name}
                      </h4>
                      <p className="text-white/70 text-xs">
                        {featuredPhotos?.[0]?.photographer?.title}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-white/90">
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={16} />
                      <span className="text-sm">{featuredPhotos?.[0]?.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={16} />
                      <span className="text-sm">{featuredPhotos?.[0]?.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Featured Photos */}
          <div className="space-y-6">
            {featuredPhotos?.slice(1, 3)?.map((photo, index) => (
              <div
                key={photo?.id}
                className="group relative bg-card rounded-xl overflow-hidden volcanic-glow hover:shadow-lg transition-all duration-300 cursor-pointer h-44"
                onClick={() => onPhotoClick(photo)}
              >
                <Image
                  src={photo?.image}
                  alt={photo?.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-accent/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                    {index === 0 ? 'Editor\'s Choice' : 'Trending'}
                  </span>
                </div>

                {/* Photo Info */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                    {photo?.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={photo?.photographer?.avatar}
                        alt={photo?.photographer?.avatarAlt}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-white/90 text-xs">
                        {photo?.photographer?.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/80">
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={12} />
                        <span className="text-xs">{photo?.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <Button
            variant="default"
            size="lg"
            iconName="Camera"
            iconPosition="left"
            className="volcanic-glow seismic-hover"
          >
            Submit Your Photo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;