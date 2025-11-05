import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedExperiences = () => {
  const [activeTab, setActiveTab] = useState('packages');

  const featuredPackages = [
  {
    id: 1,
    title: "Classic Sunrise Adventure",
    description: "Experience the iconic Bromo sunrise with jeep transport, local guide, and breakfast at viewpoint.",
    image: "https://images.unsplash.com/photo-1546455776-f21a87fc638e",
    imageAlt: "Jeep driving through volcanic sand sea at dawn with Mount Bromo crater visible in misty background",
    price: 450000,
    originalPrice: 550000,
    duration: "12 hours",
    groupSize: "2-6 people",
    rating: 4.9,
    reviewCount: 234,
    availability: "Available",
    badge: "Most Popular",
    includes: ["Jeep transport", "Local guide", "Breakfast", "Park entrance"],
    highlights: ["Penanjakan viewpoint", "Bromo crater rim", "Whispering sands"]
  },
  {
    id: 2,
    title: "Photography Expedition",
    description: "Perfect for photographers with extended golden hour access and exclusive viewpoints.",
    image: "https://images.unsplash.com/photo-1547380109-a2fffd5b9036",
    imageAlt: "Professional photographer capturing Mount Bromo sunrise with dramatic volcanic landscape and golden light",
    price: 750000,
    originalPrice: 850000,
    duration: "16 hours",
    groupSize: "1-4 people",
    rating: 4.8,
    reviewCount: 89,
    availability: "3 spots left",
    badge: "Pro Choice",
    includes: ["Photography guide", "Premium locations", "Equipment tips", "Editing session"],
    highlights: ["Secret viewpoints", "Extended access", "Pro techniques"]
  },
  {
    id: 3,
    title: "Adventure Trekking Package",
    description: "Combine sunrise viewing with challenging trek to Bromo crater rim and surrounding peaks.",
    image: "https://images.unsplash.com/photo-1579376426879-30fb3b5949cb",
    imageAlt: "Group of trekkers hiking up volcanic slopes with Mount Bromo crater and surrounding peaks in background",
    price: 650000,
    originalPrice: 750000,
    duration: "2 days",
    groupSize: "4-8 people",
    rating: 4.7,
    reviewCount: 156,
    availability: "Available",
    badge: "Adventure",
    includes: ["Camping gear", "Meals", "Trekking guide", "Safety equipment"],
    highlights: ["Crater rim trek", "Camping experience", "Multiple viewpoints"]
  }];


  const quickBookingOptions = [
  {
    id: 1,
    title: "Jeep Only",
    description: "Transport to sunrise viewpoint",
    price: 200000,
    duration: "4 hours",
    icon: "Car",
    available: true
  },
  {
    id: 2,
    title: "Guide Service",
    description: "Local expert guide",
    price: 150000,
    duration: "Full day",
    icon: "User",
    available: true
  },
  {
    id: 3,
    title: "Equipment Rental",
    description: "Warm clothing & gear",
    price: 75000,
    duration: "24 hours",
    icon: "Package",
    available: true
  }];


  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Most Popular':return 'bg-primary text-primary-foreground';
      case 'Pro Choice':return 'bg-purple-600 text-white';
      case 'Adventure':return 'bg-green-600 text-white';
      default:return 'bg-gray-600 text-white';
    }
  };

  const getAvailabilityColor = (availability) => {
    if (availability === 'Available') return 'text-green-600 bg-green-50';
    if (availability?.includes('spots left')) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-primary text-sm font-medium mb-4">
            <Icon name="Star" size={16} />
            <span>Featured Experiences</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Curated Bromo Adventures
          </h2>
          
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Handpicked experiences by local experts with real-time availability and instant booking
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted rounded-lg p-1 inline-flex">
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'packages' ? 'bg-primary text-primary-foreground volcanic-glow' : 'text-text-secondary hover:text-text-primary'}`
              }>

              Complete Packages
            </button>
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'individual' ? 'bg-primary text-primary-foreground volcanic-glow' : 'text-text-secondary hover:text-text-primary'}`
              }>

              Individual Services
            </button>
          </div>
        </div>

        {/* Featured Packages */}
        {activeTab === 'packages' &&
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredPackages?.map((pkg) =>
          <div key={pkg?.id} className="card-volcanic group hover:scale-105 transition-transform duration-300">
                {/* Image */}
                <div className="relative overflow-hidden rounded-t-lg mb-4">
                  <Image
                src={pkg?.image}
                alt={pkg?.imageAlt}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />

                  
                  {/* Badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(pkg?.badge)}`}>
                    {pkg?.badge}
                  </div>
                  
                  {/* Availability */}
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(pkg?.availability)}`}>
                    {pkg?.availability}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">{pkg?.title}</h3>
                    <p className="text-text-secondary text-sm">{pkg?.description}</p>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {pkg?.highlights?.map((highlight, index) =>
                <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {highlight}
                      </span>
                )}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Icon name="Clock" size={16} />
                      <span>{pkg?.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Icon name="Users" size={16} />
                      <span>{pkg?.groupSize}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                      <span className="font-semibold text-text-primary">{pkg?.rating}</span>
                    </div>
                    <span className="text-text-secondary text-sm">({pkg?.reviewCount} reviews)</span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-text-primary">{formatPrice(pkg?.price)}</span>
                        {pkg?.originalPrice &&
                    <span className="text-sm text-text-secondary line-through">{formatPrice(pkg?.originalPrice)}</span>
                    }
                      </div>
                      <span className="text-xs text-text-secondary">per person</span>
                    </div>
                    
                    <Link to="/experience-booking">
                      <Button
                    variant="default"
                    size="sm"
                    className="volcanic-glow seismic-hover"
                    iconName="ArrowRight"
                    iconPosition="right">

                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
          )}
          </div>
        }

        {/* Individual Services */}
        {activeTab === 'individual' &&
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {quickBookingOptions?.map((option) =>
          <div key={option?.id} className="card-volcanic text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={option?.icon} size={32} className="text-primary" />
                </div>
                
                <h3 className="text-lg font-semibold text-text-primary mb-2">{option?.title}</h3>
                <p className="text-text-secondary text-sm mb-4">{option?.description}</p>
                
                <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary mb-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{option?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="CheckCircle" size={14} className="text-green-500" />
                    <span>Available</span>
                  </div>
                </div>
                
                <div className="text-xl font-bold text-text-primary mb-4">
                  {formatPrice(option?.price)}
                </div>
                
                <Link to="/experience-booking">
                  <Button
                variant="outline"
                size="sm"
                fullWidth
                className="seismic-hover"
                iconName="Plus"
                iconPosition="left">

                    Add to Booking
                  </Button>
                </Link>
              </div>
          )}
          </div>
        }

        {/* View All CTA */}
        <div className="text-center">
          <Link to="/experience-booking">
            <Button
              variant="outline"
              size="lg"
              className="seismic-hover"
              iconName="ArrowRight"
              iconPosition="right">

              View All Experiences
            </Button>
          </Link>
        </div>
      </div>
    </section>);

};

export default FeaturedExperiences;