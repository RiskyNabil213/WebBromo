import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFiltersChange, onClearFilters, isOpen, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const experienceTypes = [
    { value: 'jeep-tour', label: 'Jeep Tours' },
    { value: 'trail-bike', label: 'Trail Bikes' },
    { value: 'equipment-rental', label: 'Equipment Rental' },
    { value: 'complete-package', label: 'Complete Packages' },
    { value: 'guide-service', label: 'Guide Services' }
  ];

  const durations = [
    { value: '2-4', label: '2-4 Hours' },
    { value: '4-8', label: '4-8 Hours' },
    { value: '8-12', label: '8-12 Hours' },
    { value: '1-day', label: '1 Day' },
    { value: '2-days', label: '2 Days' },
    { value: '3-days', label: '3+ Days' }
  ];

  const groupSizes = [
    { value: '1-2', label: '1-2 People' },
    { value: '3-5', label: '3-5 People' },
    { value: '6-10', label: '6-10 People' },
    { value: '10+', label: '10+ People' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handlePriceRangeChange = (type, value) => {
    const priceRange = { ...localFilters?.priceRange, [type]: value };
    handleFilterChange('priceRange', priceRange);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      experienceType: '',
      priceRange: { min: '', max: '' },
      duration: '',
      groupSize: '',
      availability: false,
      instantBooking: false,
      freeEquipment: false,
      englishGuide: false
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 lg:w-full
        bg-background border-r lg:border-r-0 lg:border border-border
        transform transition-transform duration-300 z-50 lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto custom-scrollbar
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-text-secondary hover:text-primary"
              >
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Experience Type */}
            <div>
              <Select
                label="Experience Type"
                placeholder="All Types"
                options={experienceTypes}
                value={localFilters?.experienceType}
                onChange={(value) => handleFilterChange('experienceType', value)}
                clearable
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Price Range (IDR)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Min"
                  value={localFilters?.priceRange?.min || ''}
                  onChange={(e) => handlePriceRangeChange('min', e?.target?.value)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={localFilters?.priceRange?.max || ''}
                  onChange={(e) => handlePriceRangeChange('max', e?.target?.value)}
                />
              </div>
              <div className="mt-2 text-xs text-text-secondary">
                Popular range: 500,000 - 2,000,000
              </div>
            </div>

            {/* Duration */}
            <div>
              <Select
                label="Duration"
                placeholder="Any Duration"
                options={durations}
                value={localFilters?.duration}
                onChange={(value) => handleFilterChange('duration', value)}
                clearable
              />
            </div>

            {/* Group Size */}
            <div>
              <Select
                label="Group Size"
                placeholder="Any Size"
                options={groupSizes}
                value={localFilters?.groupSize}
                onChange={(value) => handleFilterChange('groupSize', value)}
                clearable
              />
            </div>

            {/* Quick Filters */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Quick Filters
              </label>
              <div className="space-y-3">
                <Checkbox
                  label="Available Today"
                  description="Show only experiences available today"
                  checked={localFilters?.availability}
                  onChange={(e) => handleFilterChange('availability', e?.target?.checked)}
                />
                <Checkbox
                  label="Instant Booking"
                  description="Book immediately without confirmation"
                  checked={localFilters?.instantBooking}
                  onChange={(e) => handleFilterChange('instantBooking', e?.target?.checked)}
                />
                <Checkbox
                  label="Free Equipment"
                  description="Includes equipment at no extra cost"
                  checked={localFilters?.freeEquipment}
                  onChange={(e) => handleFilterChange('freeEquipment', e?.target?.checked)}
                />
                <Checkbox
                  label="English Guide"
                  description="Guide speaks English fluently"
                  checked={localFilters?.englishGuide}
                  onChange={(e) => handleFilterChange('englishGuide', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Popular Filters */}
            <div className="pt-4 border-t border-border">
              <label className="block text-sm font-medium text-text-primary mb-3">
                Popular This Week
              </label>
              <div className="flex flex-wrap gap-2">
                {['Sunrise Tour', 'Photography', 'Camping', 'Local Guide']?.map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 text-xs bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-colors duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;