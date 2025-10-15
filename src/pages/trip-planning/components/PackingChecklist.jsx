import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PackingChecklist = () => {
  const [selectedActivities, setSelectedActivities] = useState(['sunrise-tour', 'crater-exploration']);
  const [checkedItems, setCheckedItems] = useState({});
  const [customItems, setCustomItems] = useState([]);
  const [newCustomItem, setNewCustomItem] = useState('');

  const activities = [
    { id: 'sunrise-tour', name: 'Sunrise Tour', icon: 'Sunrise' },
    { id: 'crater-exploration', name: 'Crater Exploration', icon: 'Mountain' },
    { id: 'photography', name: 'Photography Workshop', icon: 'Camera' },
    { id: 'hiking', name: 'Hiking/Trekking', icon: 'MapPin' },
    { id: 'camping', name: 'Overnight Camping', icon: 'Tent' },
    { id: 'cultural', name: 'Cultural Village Visit', icon: 'Users' },
    { id: 'motorbike', name: 'Trail Bike Adventure', icon: 'Bike' }
  ];

  const packingCategories = {
    clothing: {
      name: 'Clothing & Footwear',
      icon: 'Shirt',
      items: [
        { id: 'warm-jacket', name: 'Warm jacket or fleece', essential: true, activities: ['sunrise-tour', 'camping', 'hiking'] },
        { id: 'hiking-boots', name: 'Sturdy hiking boots', essential: true, activities: ['crater-exploration', 'hiking'] },
        { id: 'long-pants', name: 'Long pants (2-3 pairs)', essential: true, activities: ['all'] },
        { id: 'thermal-underwear', name: 'Thermal underwear', essential: false, activities: ['sunrise-tour', 'camping'] },
        { id: 'rain-jacket', name: 'Waterproof rain jacket', essential: true, activities: ['all'] },
        { id: 'comfortable-shoes', name: 'Comfortable walking shoes', essential: true, activities: ['cultural', 'photography'] },
        { id: 'hat-cap', name: 'Hat or cap', essential: true, activities: ['all'] },
        { id: 'gloves', name: 'Warm gloves', essential: false, activities: ['sunrise-tour', 'camping'] },
        { id: 'scarf', name: 'Scarf or neck warmer', essential: false, activities: ['sunrise-tour', 'camping'] }
      ]
    },
    equipment: {
      name: 'Equipment & Gear',
      icon: 'Backpack',
      items: [
        { id: 'headlamp', name: 'Headlamp or flashlight', essential: true, activities: ['sunrise-tour', 'camping'] },
        { id: 'backpack', name: 'Day backpack', essential: true, activities: ['all'] },
        { id: 'water-bottle', name: 'Water bottle (1-2L)', essential: true, activities: ['all'] },
        { id: 'camera', name: 'Camera with extra batteries', essential: false, activities: ['photography', 'sunrise-tour'] },
        { id: 'tripod', name: 'Camera tripod', essential: false, activities: ['photography', 'sunrise-tour'] },
        { id: 'binoculars', name: 'Binoculars', essential: false, activities: ['sunrise-tour', 'hiking'] },
        { id: 'power-bank', name: 'Portable power bank', essential: true, activities: ['all'] },
        { id: 'dust-mask', name: 'Dust mask or bandana', essential: true, activities: ['crater-exploration', 'motorbike'] }
      ]
    },
    health: {
      name: 'Health & Safety',
      icon: 'Heart',
      items: [
        { id: 'sunscreen', name: 'Sunscreen (SPF 30+)', essential: true, activities: ['all'] },
        { id: 'first-aid', name: 'Basic first aid kit', essential: true, activities: ['hiking', 'camping'] },
        { id: 'medications', name: 'Personal medications', essential: true, activities: ['all'] },
        { id: 'insect-repellent', name: 'Insect repellent', essential: true, activities: ['camping', 'cultural'] },
        { id: 'lip-balm', name: 'Lip balm with SPF', essential: false, activities: ['all'] },
        { id: 'hand-sanitizer', name: 'Hand sanitizer', essential: true, activities: ['all'] },
        { id: 'altitude-sickness', name: 'Altitude sickness medication', essential: false, activities: ['hiking', 'crater-exploration'] }
      ]
    },
    documents: {
      name: 'Documents & Money',
      icon: 'FileText',
      items: [
        { id: 'id-passport', name: 'ID card or passport', essential: true, activities: ['all'] },
        { id: 'travel-insurance', name: 'Travel insurance documents', essential: true, activities: ['all'] },
        { id: 'booking-confirmations', name: 'Booking confirmations', essential: true, activities: ['all'] },
        { id: 'emergency-contacts', name: 'Emergency contact list', essential: true, activities: ['all'] },
        { id: 'cash', name: 'Indonesian Rupiah (cash)', essential: true, activities: ['all'] },
        { id: 'credit-cards', name: 'Credit/debit cards', essential: true, activities: ['all'] },
        { id: 'permits', name: 'Park entry permits', essential: true, activities: ['crater-exploration', 'hiking'] }
      ]
    },
    comfort: {
      name: 'Comfort & Convenience',
      icon: 'Coffee',
      items: [
        { id: 'snacks', name: 'Energy bars/snacks', essential: false, activities: ['hiking', 'sunrise-tour'] },
        { id: 'thermos', name: 'Thermos for hot drinks', essential: false, activities: ['sunrise-tour', 'camping'] },
        { id: 'wet-wipes', name: 'Wet wipes', essential: true, activities: ['all'] },
        { id: 'toilet-paper', name: 'Toilet paper', essential: true, activities: ['camping', 'hiking'] },
        { id: 'plastic-bags', name: 'Plastic bags (waterproof)', essential: true, activities: ['all'] },
        { id: 'duct-tape', name: 'Small roll of duct tape', essential: false, activities: ['camping', 'hiking'] },
        { id: 'entertainment', name: 'Book/e-reader/games', essential: false, activities: ['camping'] }
      ]
    }
  };

  const getRelevantItems = () => {
    const relevantItems = {};
    
    Object.entries(packingCategories)?.forEach(([categoryId, category]) => {
      relevantItems[categoryId] = {
        ...category,
        items: category?.items?.filter(item => 
          item?.activities?.includes('all') || 
          item?.activities?.some(activity => selectedActivities?.includes(activity))
        )
      };
    });
    
    return relevantItems;
  };

  const toggleActivity = (activityId) => {
    setSelectedActivities(prev => 
      prev?.includes(activityId)
        ? prev?.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const toggleItem = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev?.[itemId]
    }));
  };

  const addCustomItem = () => {
    if (newCustomItem?.trim()) {
      const customItem = {
        id: `custom-${Date.now()}`,
        name: newCustomItem?.trim(),
        essential: false,
        custom: true
      };
      setCustomItems(prev => [...prev, customItem]);
      setNewCustomItem('');
    }
  };

  const removeCustomItem = (itemId) => {
    setCustomItems(prev => prev?.filter(item => item?.id !== itemId));
    setCheckedItems(prev => {
      const updated = { ...prev };
      delete updated?.[itemId];
      return updated;
    });
  };

  const getProgress = () => {
    const relevantItems = getRelevantItems();
    const allItems = [
      ...Object.values(relevantItems)?.flatMap(category => category?.items),
      ...customItems
    ];
    const checkedCount = allItems?.filter(item => checkedItems?.[item?.id])?.length;
    return { total: allItems?.length, checked: checkedCount };
  };

  const progress = getProgress();
  const progressPercentage = progress?.total > 0 ? (progress?.checked / progress?.total) * 100 : 0;

  return (
    <div className="bg-card rounded-xl p-6 volcanic-glow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
          <Icon name="CheckSquare" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Packing Checklist</h3>
          <p className="text-text-secondary text-sm">Customized based on your selected activities</p>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Packing Progress</span>
          <span className="text-sm text-text-secondary">{progress?.checked}/{progress?.total} items</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-text-secondary mt-1">
          {Math.round(progressPercentage)}% complete
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Activity Selection */}
        <div className="xl:col-span-1">
          <h4 className="font-medium text-text-primary mb-4">Select Your Activities</h4>
          <div className="space-y-3 mb-6">
            {activities?.map((activity) => (
              <label key={activity?.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                <Checkbox
                  checked={selectedActivities?.includes(activity?.id)}
                  onChange={() => toggleActivity(activity?.id)}
                />
                <Icon name={activity?.icon} size={16} color="var(--color-primary)" />
                <span className="text-sm font-medium text-text-primary">{activity?.name}</span>
              </label>
            ))}
          </div>

          {/* Add Custom Item */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h5 className="text-sm font-medium text-text-primary mb-3">Add Custom Item</h5>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter custom item..."
                value={newCustomItem}
                onChange={(e) => setNewCustomItem(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && addCustomItem()}
                className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button
                size="sm"
                variant="outline"
                iconName="Plus"
                onClick={addCustomItem}
              />
            </div>
          </div>
        </div>

        {/* Packing Lists */}
        <div className="xl:col-span-2">
          <div className="space-y-6">
            {Object.entries(getRelevantItems())?.map(([categoryId, category]) => (
              category?.items?.length > 0 && (
                <div key={categoryId} className="bg-background border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Icon name={category?.icon} size={20} color="var(--color-primary)" />
                    <h5 className="font-medium text-text-primary">{category?.name}</h5>
                    <span className="text-xs text-text-secondary">
                      ({category?.items?.filter(item => checkedItems?.[item?.id])?.length}/{category?.items?.length})
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {category?.items?.map((item) => (
                      <label key={item?.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                        <Checkbox
                          checked={checkedItems?.[item?.id] || false}
                          onChange={() => toggleItem(item?.id)}
                          className="mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm ${checkedItems?.[item?.id] ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                              {item?.name}
                            </span>
                            {item?.essential && (
                              <span className="px-1.5 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                Essential
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )
            ))}

            {/* Custom Items */}
            {customItems?.length > 0 && (
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="Plus" size={20} color="var(--color-primary)" />
                  <h5 className="font-medium text-text-primary">Custom Items</h5>
                  <span className="text-xs text-text-secondary">
                    ({customItems?.filter(item => checkedItems?.[item?.id])?.length}/{customItems?.length})
                  </span>
                </div>
                
                <div className="space-y-2">
                  {customItems?.map((item) => (
                    <div key={item?.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                      <Checkbox
                        checked={checkedItems?.[item?.id] || false}
                        onChange={() => toggleItem(item?.id)}
                      />
                      <span className={`flex-1 text-sm ${checkedItems?.[item?.id] ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                        {item?.name}
                      </span>
                      <Button
                        size="xs"
                        variant="ghost"
                        iconName="X"
                        onClick={() => removeCustomItem(item?.id)}
                        className="text-red-500 hover:text-red-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              variant="outline"
              fullWidth
              iconName="Download"
              iconPosition="left"
            >
              Export Checklist
            </Button>
            <Button
              variant="outline"
              fullWidth
              iconName="Share"
              iconPosition="left"
            >
              Share with Group
            </Button>
            <Button
              variant="default"
              fullWidth
              iconName="ShoppingCart"
              iconPosition="left"
              className="volcanic-glow"
            >
              Shop Missing Items
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackingChecklist;