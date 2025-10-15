import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SearchBar = ({ onSearch, onFilterToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilters, setQuickFilters] = useState({
    date: '',
    guests: '',
    category: ''
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'jeep-tour', label: 'Jeep Tours' },
    { value: 'trail-bike', label: 'Trail Bikes' },
    { value: 'equipment-rental', label: 'Equipment Rental' },
    { value: 'complete-package', label: 'Complete Packages' },
    { value: 'guide-service', label: 'Guide Services' }
  ];

  const guestOptions = [
    { value: '', label: 'Any Size' },
    { value: '1', label: '1 Guest' },
    { value: '2', label: '2 Guests' },
    { value: '3-5', label: '3-5 Guests' },
    { value: '6-10', label: '6-10 Guests' },
    { value: '10+', label: '10+ Guests' }
  ];

  const handleSearch = () => {
    onSearch({
      query: searchQuery,
      ...quickFilters
    });
  };

  const handleQuickFilterChange = (key, value) => {
    const updatedFilters = { ...quickFilters, [key]: value };
    setQuickFilters(updatedFilters);
    onSearch({
      query: searchQuery,
      ...updatedFilters
    });
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6 volcanic-glow">
      {/* Main Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <Input
              type="text"
              placeholder="Search experiences, locations, or activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
          </div>
        </div>
        
        <Button
          variant="default"
          onClick={handleSearch}
          className="volcanic-glow seismic-hover"
          iconName="Search"
          iconPosition="left"
        >
          Search
        </Button>
      </div>
      {/* Quick Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Input
          label="Date"
          type="date"
          value={quickFilters?.date}
          onChange={(e) => handleQuickFilterChange('date', e?.target?.value)}
          min={new Date()?.toISOString()?.split('T')?.[0]}
        />

        <Select
          label="Guests"
          placeholder="Any Size"
          options={guestOptions}
          value={quickFilters?.guests}
          onChange={(value) => handleQuickFilterChange('guests', value)}
          clearable
        />

        <Select
          label="Category"
          placeholder="All Categories"
          options={categories}
          value={quickFilters?.category}
          onChange={(value) => handleQuickFilterChange('category', value)}
          clearable
        />

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={onFilterToggle}
            className="w-full seismic-hover"
            iconName="SlidersHorizontal"
            iconPosition="left"
          >
            More Filters
          </Button>
        </div>
      </div>
      {/* Popular Searches */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-text-secondary mb-2">Popular searches:</p>
        <div className="flex flex-wrap gap-2">
          {[
            'Sunrise Jeep Tour',
            'Photography Package',
            'Camping Experience',
            'Trail Bike Adventure',
            'Equipment Rental',
            'Local Guide Service'
          ]?.map((term) => (
            <button
              key={term}
              onClick={() => {
                setSearchQuery(term);
                onSearch({ query: term, ...quickFilters });
              }}
              className="px-3 py-1 text-xs bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-colors duration-200 seismic-hover"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;