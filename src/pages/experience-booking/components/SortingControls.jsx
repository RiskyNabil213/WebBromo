import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortingControls = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange, 
  resultsCount,
  isLoading 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviews' },
    { value: 'newest', label: 'Newest First' },
    { value: 'availability', label: 'Available First' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      {/* Results Info */}
      <div className="flex items-center space-x-4">
        <p className="text-sm text-text-secondary">
          {isLoading ? (
            <span className="flex items-center space-x-2">
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span>Searching...</span>
            </span>
          ) : (
            `${resultsCount} experiences found`
          )}
        </p>
        
        {/* Live Availability Indicator */}
        <div className="flex items-center space-x-1 text-xs text-success">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span>Live availability</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Sort Dropdown */}
        <div className="min-w-48">
          <Select
            placeholder="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-muted rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="seismic-hover"
          >
            <Icon name="Grid3X3" size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="seismic-hover"
          >
            <Icon name="List" size={16} />
          </Button>
        </div>

        {/* Map Toggle */}
        <Button
          variant="outline"
          size="sm"
          className="seismic-hover"
          iconName="Map"
          iconPosition="left"
        >
          Map View
        </Button>
      </div>
    </div>
  );
};

export default SortingControls;