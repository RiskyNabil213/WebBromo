import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BudgetCalculator = () => {
  const [budget, setBudget] = useState({
    groupSize: 2,
    duration: 2,
    accommodation: 'standard',
    transport: 'jeep',
    activities: [],
    meals: 'included'
  });

  const [totalCost, setTotalCost] = useState(0);
  const [breakdown, setBreakdown] = useState({});

  const accommodationOptions = [
    { value: 'budget', label: 'Budget Homestay (Rp 150,000/night)' },
    { value: 'standard', label: 'Standard Hotel (Rp 300,000/night)' },
    { value: 'premium', label: 'Premium Resort (Rp 600,000/night)' }
  ];

  const transportOptions = [
    { value: 'jeep', label: 'Jeep Tour (Rp 400,000/group)' },
    { value: 'motorbike', label: 'Trail Bike (Rp 200,000/person)' },
    { value: 'hiking', label: 'Hiking Guide (Rp 150,000/group)' }
  ];

  const activityOptions = [
    { value: 'sunrise', label: 'Sunrise Tour', price: 100000 },
    { value: 'crater', label: 'Crater Exploration', price: 150000 },
    { value: 'photography', label: 'Photography Workshop', price: 200000 },
    { value: 'cultural', label: 'Cultural Village Visit', price: 75000 },
    { value: 'camping', label: 'Overnight Camping', price: 250000 }
  ];

  const mealOptions = [
    { value: 'included', label: 'Meals Included (Rp 100,000/day/person)' },
    { value: 'partial', label: 'Breakfast Only (Rp 50,000/day/person)' },
    { value: 'self', label: 'Self-Catered (Rp 0)' }
  ];

  const calculateCost = () => {
    let costs = {
      accommodation: 0,
      transport: 0,
      activities: 0,
      meals: 0,
      parkFee: 0
    };

    // Accommodation
    const accommodationPrices = { budget: 150000, standard: 300000, premium: 600000 };
    costs.accommodation = accommodationPrices?.[budget?.accommodation] * budget?.duration;

    // Transport
    const transportPrices = { jeep: 400000, motorbike: 200000 * budget?.groupSize, hiking: 150000 };
    costs.transport = transportPrices?.[budget?.transport];

    // Activities
    costs.activities = budget?.activities?.reduce((sum, activityId) => {
      const activity = activityOptions?.find(a => a?.value === activityId);
      return sum + (activity ? activity?.price * budget?.groupSize : 0);
    }, 0);

    // Meals
    const mealPrices = { included: 100000, partial: 50000, self: 0 };
    costs.meals = mealPrices?.[budget?.meals] * budget?.duration * budget?.groupSize;

    // Park entrance fee
    costs.parkFee = 30000 * budget?.groupSize;

    const total = Object.values(costs)?.reduce((sum, cost) => sum + cost, 0);
    
    setBreakdown(costs);
    setTotalCost(total);
  };

  useEffect(() => {
    calculateCost();
  }, [budget]);

  const handleActivityToggle = (activityId) => {
    setBudget(prev => ({
      ...prev,
      activities: prev?.activities?.includes(activityId)
        ? prev?.activities?.filter(id => id !== activityId)
        : [...prev?.activities, activityId]
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-xl p-6 volcanic-glow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Calculator" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Budget Calculator</h3>
          <p className="text-text-secondary text-sm">Estimate your total adventure costs</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Group Size"
              type="number"
              min="1"
              max="20"
              value={budget?.groupSize}
              onChange={(e) => setBudget(prev => ({ ...prev, groupSize: parseInt(e?.target?.value) || 1 }))}
            />
            <Input
              label="Duration (Days)"
              type="number"
              min="1"
              max="14"
              value={budget?.duration}
              onChange={(e) => setBudget(prev => ({ ...prev, duration: parseInt(e?.target?.value) || 1 }))}
            />
          </div>

          <Select
            label="Accommodation Type"
            options={accommodationOptions}
            value={budget?.accommodation}
            onChange={(value) => setBudget(prev => ({ ...prev, accommodation: value }))}
          />

          <Select
            label="Transportation"
            options={transportOptions}
            value={budget?.transport}
            onChange={(value) => setBudget(prev => ({ ...prev, transport: value }))}
          />

          <Select
            label="Meal Plan"
            options={mealOptions}
            value={budget?.meals}
            onChange={(value) => setBudget(prev => ({ ...prev, meals: value }))}
          />

          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Additional Activities
            </label>
            <div className="space-y-2">
              {activityOptions?.map((activity) => (
                <label key={activity?.value} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={budget?.activities?.includes(activity?.value)}
                    onChange={() => handleActivityToggle(activity?.value)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-text-primary">{activity?.label}</span>
                    <span className="text-xs text-text-secondary ml-2">
                      {formatCurrency(activity?.price)}/person
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
            <h4 className="text-lg font-semibold text-text-primary mb-4">Cost Breakdown</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Accommodation ({budget?.duration} nights)</span>
                <span className="font-medium text-text-primary">{formatCurrency(breakdown?.accommodation)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Transportation</span>
                <span className="font-medium text-text-primary">{formatCurrency(breakdown?.transport)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Activities</span>
                <span className="font-medium text-text-primary">{formatCurrency(breakdown?.activities)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Meals</span>
                <span className="font-medium text-text-primary">{formatCurrency(breakdown?.meals)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Park Entrance Fee</span>
                <span className="font-medium text-text-primary">{formatCurrency(breakdown?.parkFee)}</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-text-primary">Total Cost</span>
                  <span className="text-2xl font-bold text-primary">{formatCurrency(totalCost)}</span>
                </div>
                <p className="text-sm text-text-secondary mt-1">
                  {formatCurrency(Math.round(totalCost / budget?.groupSize))} per person
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
              <div className="text-sm text-text-secondary">
                <p className="font-medium text-text-primary mb-1">Cost Estimate Notes:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Prices are estimates and may vary by season</li>
                  <li>• Additional equipment rental not included</li>
                  <li>• Travel insurance recommended (Rp 50,000/person)</li>
                  <li>• Tips for guides typically 10-15% of service cost</li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            variant="default"
            fullWidth
            iconName="Calendar"
            iconPosition="left"
            className="volcanic-glow"
          >
            Book This Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;