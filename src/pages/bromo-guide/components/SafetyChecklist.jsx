import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SafetyChecklist = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [activeCategory, setActiveCategory] = useState('preparation');

  const safetyCategories = [
    {
      id: 'preparation',
      name: 'Pre-Trip Preparation',
      icon: 'CheckSquare',
      color: 'blue'
    },
    {
      id: 'equipment',
      name: 'Essential Equipment',
      icon: 'Package',
      color: 'green'
    },
    {
      id: 'onsite',
      name: 'On-Site Safety',
      icon: 'Shield',
      color: 'orange'
    },
    {
      id: 'emergency',
      name: 'Emergency Procedures',
      icon: 'AlertTriangle',
      color: 'red'
    }
  ];

  const safetyItems = {
    preparation: [
      {
        id: 'weather-check',
        title: 'Check weather forecast',
        description: 'Verify weather conditions for your visit date',
        priority: 'high',
        tips: 'Avoid visiting during heavy rain or strong winds'
      },
      {
        id: 'physical-fitness',
        title: 'Assess physical fitness level',
        description: 'Ensure you can handle moderate hiking and altitude',
        priority: 'high',
        tips: 'Bromo is at 2,329m elevation - acclimatize gradually'
      },
      {
        id: 'permits',
        title: 'Obtain necessary permits',
        description: 'Purchase park entry tickets and any special permits',
        priority: 'high',
        tips: 'Buy tickets at park entrance or authorized online platforms'
      },
      {
        id: 'accommodation',
        title: 'Book accommodation in advance',
        description: 'Secure lodging near the park for early morning access',
        priority: 'medium',
        tips: 'Stay in Cemoro Lawang for closest access to viewpoints'
      },
      {
        id: 'transportation',
        title: 'Arrange reliable transportation',
        description: 'Book jeep tours or confirm vehicle access',
        priority: 'medium',
        tips: 'Jeep tours start as early as 3:00 AM for sunrise viewing'
      },
      {
        id: 'insurance',
        title: 'Verify travel insurance coverage',
        description: 'Ensure your insurance covers adventure activities',
        priority: 'medium',
        tips: 'Check if volcanic activity and high-altitude hiking are covered'
      }
    ],
    equipment: [
      {
        id: 'warm-clothing',
        title: 'Warm clothing layers',
        description: 'Temperatures can drop to 3°C at sunrise',
        priority: 'high',
        tips: 'Bring jacket, long pants, warm hat, and gloves'
      },
      {
        id: 'sturdy-footwear',
        title: 'Sturdy hiking boots',
        description: 'Closed-toe shoes with good grip for sandy/rocky terrain',
        priority: 'high',
        tips: 'Avoid sandals - sand and rocks can cause injury'
      },
      {
        id: 'flashlight',
        title: 'Flashlight or headlamp',
        description: 'Essential for pre-dawn hiking and dark areas',
        priority: 'high',
        tips: 'Bring extra batteries - cold weather drains them faster'
      },
      {
        id: 'water-snacks',
        title: 'Water and energy snacks',
        description: 'Stay hydrated and maintain energy levels',
        priority: 'high',
        tips: 'Bring at least 1L water per person and high-energy snacks'
      },
      {
        id: 'sun-protection',
        title: 'Sun protection',
        description: 'Sunglasses, hat, and sunscreen for high altitude',
        priority: 'medium',
        tips: 'UV rays are stronger at high altitude - use SPF 30+'
      },
      {
        id: 'dust-mask',
        title: 'Dust mask or bandana',
        description: 'Protect from volcanic ash and dust',
        priority: 'medium',
        tips: 'Especially important near active crater areas'
      },
      {
        id: 'camera-protection',
        title: 'Camera/phone protection',
        description: 'Protect electronics from sand and moisture',
        priority: 'low',
        tips: 'Use protective cases or bags for expensive equipment'
      }
    ],
    onsite: [
      {
        id: 'stay-on-trails',
        title: 'Stay on designated trails',
        description: 'Follow marked paths and respect barriers',
        priority: 'high',
        tips: 'Unmarked areas may have unstable ground or dangerous gases'
      },
      {
        id: 'guide-instructions',
        title: 'Follow guide instructions',
        description: 'Listen to local guides and park rangers',
        priority: 'high',
        tips: 'Guides know current conditions and safety protocols'
      },
      {
        id: 'group-together',
        title: 'Stay with your group',
        description: 'Don\'t wander off alone, especially in low visibility',
        priority: 'high',
        tips: 'Use buddy system and maintain visual contact'
      },
      {
        id: 'volcanic-gases',
        title: 'Be aware of volcanic gases',
        description: 'Avoid areas with strong sulfur smell or visible gases',
        priority: 'high',
        tips: 'Move to higher ground if you smell strong sulfur'
      },
      {
        id: 'weather-changes',
        title: 'Monitor weather changes',
        description: 'Be prepared to seek shelter if conditions deteriorate',
        priority: 'medium',
        tips: 'Mountain weather can change rapidly - stay alert'
      },
      {
        id: 'respect-culture',
        title: 'Respect local customs',
        description: 'Follow cultural guidelines and sacred site rules',
        priority: 'medium',
        tips: 'Ask permission before photographing local people'
      }
    ],
    emergency: [
      {
        id: 'emergency-contacts',
        title: 'Save emergency contact numbers',
        description: 'Store park rangers and emergency services numbers',
        priority: 'high',
        tips: 'Park Rangers: +62 335 541 821, Medical: +62 335 596 048'
      },
      {
        id: 'evacuation-routes',
        title: 'Know evacuation routes',
        description: 'Identify nearest exits and safe assembly points',
        priority: 'high',
        tips: 'Ask your guide about evacuation procedures upon arrival'
      },
      {
        id: 'first-aid-kit',
        title: 'Carry basic first aid supplies',
        description: 'Bandages, pain relievers, and personal medications',
        priority: 'medium',
        tips: 'Include altitude sickness medication if you\'re sensitive'
      },
      {
        id: 'communication-device',
        title: 'Ensure communication capability',
        description: 'Check mobile signal or carry satellite communicator',
        priority: 'medium',
        tips: 'Signal can be weak in some areas - inform others of your plans'
      },
      {
        id: 'volcanic-activity',
        title: 'Know volcanic activity signs',
        description: 'Recognize signs of increased volcanic activity',
        priority: 'medium',
        tips: 'Increased gas emissions, ground tremors, or unusual sounds'
      },
      {
        id: 'altitude-sickness',
        title: 'Recognize altitude sickness symptoms',
        description: 'Headache, nausea, dizziness, or difficulty breathing',
        priority: 'low',
        tips: 'Descend immediately if symptoms worsen'
      }
    ]
  };

  const handleItemCheck = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev?.[itemId]
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (color) => {
    switch (color) {
      case 'blue': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'green': return 'text-green-600 bg-green-100 border-green-200';
      case 'orange': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'red': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getCompletionPercentage = (categoryId) => {
    const items = safetyItems?.[categoryId] || [];
    const checkedCount = items?.filter(item => checkedItems?.[item?.id])?.length;
    return items?.length > 0 ? Math.round((checkedCount / items?.length) * 100) : 0;
  };

  const currentItems = safetyItems?.[activeCategory] || [];

  return (
    <div className="bg-card rounded-xl p-6 volcanic-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Icon name="Shield" size={24} className="text-primary" />
          Safety Checklist
        </h3>
        <Button variant="outline" size="sm" iconName="Download">
          Download PDF
        </Button>
      </div>
      {/* Category Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {safetyCategories?.map((category) => {
          const completion = getCompletionPercentage(category?.id);
          return (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                activeCategory === category?.id
                  ? getCategoryColor(category?.color)
                  : 'border-border bg-muted text-text-secondary hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon name={category?.icon} size={20} />
                <span className="font-medium text-sm">{category?.name}</span>
              </div>
              <div className="text-xs opacity-75">
                {completion}% Complete
              </div>
              <div className="w-full bg-white/50 rounded-full h-1.5 mt-2">
                <div 
                  className="bg-current h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${completion}%` }}
                ></div>
              </div>
            </button>
          );
        })}
      </div>
      {/* Checklist Items */}
      <div className="space-y-4">
        {currentItems?.map((item) => (
          <div
            key={item?.id}
            className={`border rounded-lg p-4 transition-all duration-200 ${
              checkedItems?.[item?.id]
                ? 'border-green-200 bg-green-50' :'border-border bg-background hover:border-primary/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <Checkbox
                  checked={checkedItems?.[item?.id] || false}
                  onChange={() => handleItemCheck(item?.id)}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className={`font-medium ${
                    checkedItems?.[item?.id] ? 'text-green-800 line-through' : 'text-text-primary'
                  }`}>
                    {item?.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${getPriorityColor(item?.priority)}`}>
                    {item?.priority?.charAt(0)?.toUpperCase() + item?.priority?.slice(1)}
                  </span>
                </div>
                
                <p className={`text-sm mb-3 ${
                  checkedItems?.[item?.id] ? 'text-green-700' : 'text-text-secondary'
                }`}>
                  {item?.description}
                </p>
                
                <div className={`bg-blue-50 border border-blue-200 rounded-lg p-3 ${
                  checkedItems?.[item?.id] ? 'opacity-75' : ''
                }`}>
                  <div className="flex items-start gap-2">
                    <Icon name="Lightbulb" size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-800 text-sm mb-1">Pro Tip</div>
                      <div className="text-sm text-blue-700">{item?.tips}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Progress Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {safetyCategories?.map((category) => {
            const completion = getCompletionPercentage(category?.id);
            const items = safetyItems?.[category?.id] || [];
            const checkedCount = items?.filter(item => checkedItems?.[item?.id])?.length;
            
            return (
              <div key={category?.id} className="text-center">
                <div className={`w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center ${getCategoryColor(category?.color)}`}>
                  <Icon name={category?.icon} size={24} />
                </div>
                <div className="text-sm font-medium text-text-primary">
                  {checkedCount}/{items?.length}
                </div>
                <div className="text-xs text-text-secondary">
                  {category?.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-6">
        <Button variant="default" size="sm" iconName="CheckCircle">
          Mark All Complete
        </Button>
        <Button variant="outline" size="sm" iconName="RotateCcw">
          Reset Checklist
        </Button>
        <Button variant="outline" size="sm" iconName="Share">
          Share Checklist
        </Button>
      </div>
    </div>
  );
};

export default SafetyChecklist;