import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ItineraryBuilder = () => {
  const [itinerary, setItinerary] = useState([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [tripDuration, setTripDuration] = useState(3);

  const availableActivities = [
    {
      id: 'sunrise-tour',
      name: 'Sunrise Tour at Penanjakan',
      duration: 4,
      startTime: '03:30',
      endTime: '07:30',
      category: 'tour',
      icon: 'Sunrise',
      description: 'Witness the spectacular sunrise over Mount Bromo from the famous Penanjakan viewpoint',
      price: 400000,
      groupActivity: true
    },
    {
      id: 'crater-exploration',
      name: 'Bromo Crater Exploration',
      duration: 3,
      startTime: '08:00',
      endTime: '11:00',
      category: 'adventure',
      icon: 'Mountain',
      description: 'Hike to the rim of Mount Bromo crater and experience the volcanic activity up close',
      price: 200000,
      groupActivity: false
    },
    {
      id: 'jeep-adventure',
      name: '4WD Jeep Adventure',
      duration: 6,
      startTime: '14:00',
      endTime: '20:00',
      category: 'transport',
      icon: 'Truck',
      description: 'Explore the volcanic landscape and sand sea in a traditional 4WD jeep',
      price: 500000,
      groupActivity: true
    },
    {
      id: 'photography-workshop',
      name: 'Photography Workshop',
      duration: 4,
      startTime: '15:00',
      endTime: '19:00',
      category: 'workshop',
      icon: 'Camera',
      description: 'Learn professional photography techniques with Bromo\'s dramatic landscapes',
      price: 300000,
      groupActivity: false
    },
    {
      id: 'cultural-village',
      name: 'Tengger Village Visit',
      duration: 3,
      startTime: '10:00',
      endTime: '13:00',
      category: 'cultural',
      icon: 'Users',
      description: 'Experience local Tengger culture and traditional way of life',
      price: 150000,
      groupActivity: false
    },
    {
      id: 'camping',
      name: 'Overnight Camping',
      duration: 12,
      startTime: '18:00',
      endTime: '06:00',
      category: 'accommodation',
      icon: 'Tent',
      description: 'Sleep under the stars with views of the volcanic landscape',
      price: 250000,
      groupActivity: false
    },
    {
      id: 'trail-bike',
      name: 'Trail Bike Adventure',
      duration: 4,
      startTime: '09:00',
      endTime: '13:00',
      category: 'adventure',
      icon: 'Bike',
      description: 'Navigate volcanic terrain on a guided trail bike expedition',
      price: 350000,
      groupActivity: false
    },
    {
      id: 'hot-springs',
      name: 'Natural Hot Springs',
      duration: 2,
      startTime: '16:00',
      endTime: '18:00',
      category: 'relaxation',
      icon: 'Waves',
      description: 'Relax in natural hot springs after a day of adventure',
      price: 75000,
      groupActivity: false
    }
  ];

  const timeSlots = [
    '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30',
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  const addActivity = (activity, customTime = null) => {
    const newActivity = {
      ...activity,
      id: `${activity?.id}-${Date.now()}`,
      day: selectedDay,
      startTime: customTime || activity?.startTime,
      endTime: customTime ? addHours(customTime, activity?.duration) : activity?.endTime
    };

    setItinerary(prev => [...prev, newActivity]?.sort((a, b) => {
      if (a?.day !== b?.day) return a?.day - b?.day;
      return a?.startTime?.localeCompare(b?.startTime);
    }));
  };

  const removeActivity = (activityId) => {
    setItinerary(prev => prev?.filter(item => item?.id !== activityId));
  };

  const addHours = (time, hours) => {
    const [h, m] = time?.split(':')?.map(Number);
    const totalMinutes = h * 60 + m + hours * 60;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    return `${newHours?.toString()?.padStart(2, '0')}:${newMinutes?.toString()?.padStart(2, '0')}`;
  };

  const getDayActivities = (day) => {
    return itinerary?.filter(item => item?.day === day);
  };

  const getTotalCost = () => {
    return itinerary?.reduce((sum, item) => sum + item?.price, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const getCategoryColor = (category) => {
    const colors = {
      tour: 'bg-blue-100 text-blue-800',
      adventure: 'bg-red-100 text-red-800',
      transport: 'bg-green-100 text-green-800',
      workshop: 'bg-purple-100 text-purple-800',
      cultural: 'bg-yellow-100 text-yellow-800',
      accommodation: 'bg-indigo-100 text-indigo-800',
      relaxation: 'bg-pink-100 text-pink-800'
    };
    return colors?.[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-card rounded-xl p-6 volcanic-glow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
          <Icon name="Calendar" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Itinerary Builder</h3>
          <p className="text-text-secondary text-sm">Drag and drop activities to create your perfect schedule</p>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Trip Settings */}
        <div className="xl:col-span-1">
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-text-primary mb-4">Trip Settings</h4>
            <div className="space-y-4">
              <Input
                label="Trip Duration (Days)"
                type="number"
                min="1"
                max="14"
                value={tripDuration}
                onChange={(e) => setTripDuration(parseInt(e?.target?.value) || 1)}
              />
              <Select
                label="Current Day"
                options={Array.from({ length: tripDuration }, (_, i) => ({
                  value: i + 1,
                  label: `Day ${i + 1}`
                }))}
                value={selectedDay}
                onChange={(value) => setSelectedDay(value)}
              />
            </div>
          </div>

          {/* Available Activities */}
          <div>
            <h4 className="font-medium text-text-primary mb-4">Available Activities</h4>
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {availableActivities?.map((activity) => (
                <div key={activity?.id} className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Icon name={activity?.icon} size={20} color="var(--color-primary)" />
                      <div>
                        <h5 className="font-medium text-text-primary text-sm">{activity?.name}</h5>
                        <p className="text-xs text-text-secondary">{activity?.duration}h • {activity?.startTime}-{activity?.endTime}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity?.category)}`}>
                      {activity?.category}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mb-3">{activity?.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">{formatCurrency(activity?.price)}</span>
                    <Button
                      size="xs"
                      variant="outline"
                      iconName="Plus"
                      iconPosition="left"
                      onClick={() => addActivity(activity)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Itinerary Timeline */}
        <div className="xl:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-medium text-text-primary">Your Itinerary</h4>
            <div className="text-sm text-text-secondary">
              Total Cost: <span className="font-semibold text-primary">{formatCurrency(getTotalCost())}</span>
            </div>
          </div>

          <div className="space-y-6">
            {Array.from({ length: tripDuration }, (_, i) => i + 1)?.map((day) => (
              <div key={day} className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-medium text-text-primary">Day {day}</h5>
                  <Button
                    size="xs"
                    variant={selectedDay === day ? "default" : "ghost"}
                    onClick={() => setSelectedDay(day)}
                  >
                    {selectedDay === day ? "Selected" : "Select"}
                  </Button>
                </div>

                <div className="space-y-3">
                  {getDayActivities(day)?.length === 0 ? (
                    <div className="text-center py-8 text-text-secondary">
                      <Icon name="Calendar" size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No activities planned for this day</p>
                      <p className="text-xs">Select activities from the left panel to add them</p>
                    </div>
                  ) : (
                    getDayActivities(day)?.map((activity) => (
                      <div key={activity?.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                        <div className="flex-shrink-0">
                          <Icon name={activity?.icon} size={20} color="var(--color-primary)" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h6 className="font-medium text-text-primary text-sm truncate">{activity?.name}</h6>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(activity?.category)}`}>
                              {activity?.category}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-text-secondary">
                            <span className="flex items-center space-x-1">
                              <Icon name="Clock" size={12} />
                              <span>{activity?.startTime} - {activity?.endTime}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Icon name="DollarSign" size={12} />
                              <span>{formatCurrency(activity?.price)}</span>
                            </span>
                          </div>
                        </div>
                        <Button
                          size="xs"
                          variant="ghost"
                          iconName="X"
                          onClick={() => removeActivity(activity?.id)}
                          className="text-red-500 hover:text-red-700"
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              fullWidth
              iconName="Download"
              iconPosition="left"
            >
              Export Itinerary
            </Button>
            <Button
              variant="default"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              className="volcanic-glow"
            >
              Book This Itinerary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder;