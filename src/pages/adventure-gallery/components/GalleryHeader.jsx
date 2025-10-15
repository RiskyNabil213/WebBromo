import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GalleryHeader = ({ activeFilter, onFilterChange, onUploadClick }) => {
  const filters = [
    { id: 'all', label: 'All Photos', icon: 'Grid3X3' },
    { id: 'sunrise', label: 'Sunrise Views', icon: 'Sunrise' },
    { id: 'volcanic', label: 'Volcanic Landscapes', icon: 'Mountain' },
    { id: 'adventure', label: 'Adventure Activities', icon: 'Zap' },
    { id: 'cultural', label: 'Cultural Moments', icon: 'Users' },
    { id: 'wildlife', label: 'Wildlife & Nature', icon: 'TreePine' }
  ];

  return (
    <div className="bg-background border-b border-border  top-16 z-40 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Content */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-volcanic mb-2">
              Adventure Gallery
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl">
              Discover the breathtaking beauty of Mount Bromo through the eyes of fellow adventurers. 
              Share your own moments and inspire others to explore Indonesia's volcanic wonderland.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              iconName="Upload"
              iconPosition="left"
              onClick={onUploadClick}
              className="seismic-hover"
            >
              Share Your Photo
            </Button>
            <Button
              variant="default"
              iconName="Trophy"
              iconPosition="left"
              className="volcanic-glow"
            >
              Photo Contest
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8">
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {filters?.map((filter) => (
              <button
                key={filter?.id}
                onClick={() => onFilterChange(filter?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 seismic-hover ${
                  activeFilter === filter?.id
                    ? 'bg-primary text-primary-foreground volcanic-glow'
                    : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <Icon name={filter?.icon} size={16} />
                <span>{filter?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryHeader;