import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import FilterSidebar from './components/FilterSidebar';
import ExperienceCard from './components/ExperienceCard';
import BookingModal from './components/BookingModal';
import SearchBar from './components/SearchBar';
import SortingControls from './components/SortingControls';
import QuickActions from './components/QuickActions';
import ComparisonModal from './components/ComparisonModal';

const ExperienceBooking = () => {
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [filters, setFilters] = useState({
    experienceType: '',
    priceRange: { min: '', max: '' },
    duration: '',
    groupSize: '',
    availability: false,
    instantBooking: false,
    freeEquipment: false,
    englishGuide: false
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [comparisonList, setComparisonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for experiences
  const mockExperiences = [
  {
    id: 1,
    title: "Sunrise Jeep Tour to Mount Bromo",
    description: "Experience the breathtaking sunrise over Mount Bromo with our comfortable 4WD jeep tour. Includes professional guide, warm blankets, and traditional breakfast.",
    image: "https://images.unsplash.com/photo-1536019650805-3d3c0c0d694d",
    imageAlt: "Orange jeep driving through volcanic landscape with Mount Bromo crater in background during golden sunrise",
    category: "Jeep Tour",
    price: 750000,
    originalPrice: 900000,
    priceUnit: "person",
    rating: 4.8,
    reviewCount: 324,
    availability: "available",
    instantBooking: true,
    duration: "4-6 hours",
    groupSize: "1-8 people",
    freeEquipment: true,
    englishGuide: true,
    hotelPickup: true,
    breakfast: true,
    photography: false,
    cancellation: true,
    provider: {
      name: "Bromo Adventure Tours",
      avatar: "https://images.unsplash.com/photo-1660609389476-c961a2a11d40",
      avatarAlt: "Professional Indonesian tour guide wearing khaki uniform and friendly smile",
      verified: true
    },
    features: [
    { icon: "Clock", text: "4-6 hours" },
    { icon: "Users", text: "Max 8 people" },
    { icon: "Car", text: "4WD Jeep" },
    { icon: "Coffee", text: "Breakfast" }],

    highlights: [
    "Professional English-speaking guide",
    "Comfortable 4WD jeep transportation",
    "Traditional Indonesian breakfast included",
    "Warm blankets and jackets provided",
    "Small group experience (max 8 people)"]

  },
  {
    id: 2,
    title: "Trail Bike Adventure to Bromo Crater",
    description: "Thrilling motorcycle adventure through volcanic terrain to reach Bromo crater rim. Perfect for adventure seekers looking for an adrenaline rush.",
    image: "https://images.unsplash.com/photo-1731234452426-c7b7e67f9889",
    imageAlt: "Adventure motorcyclist in protective gear riding trail bike across rocky volcanic terrain with Mount Bromo smoking crater visible",
    category: "Trail Bike",
    price: 650000,
    priceUnit: "person",
    rating: 4.6,
    reviewCount: 156,
    availability: "limited",
    instantBooking: false,
    duration: "3-4 hours",
    groupSize: "1-6 people",
    freeEquipment: true,
    englishGuide: true,
    hotelPickup: false,
    breakfast: false,
    photography: true,
    cancellation: true,
    provider: {
      name: "Extreme Bromo Adventures",
      avatar: "https://images.unsplash.com/photo-1551105510-b8f7f4c7db55",
      avatarAlt: "Young Indonesian adventure guide with helmet and protective gear smiling confidently",
      verified: true
    },
    features: [
    { icon: "Bike", text: "Trail Bike" },
    { icon: "Shield", text: "Safety Gear" },
    { icon: "Camera", text: "Photo Service" },
    { icon: "Mountain", text: "Crater Access" }],

    highlights: [
    "High-quality trail bikes provided",
    "Professional safety equipment included",
    "Photography service available",
    "Direct crater rim access",
    "Experienced local guides"]

  },
  {
    id: 3,
    title: "Complete Bromo Photography Package",
    description: "Professional photography tour with premium equipment rental, sunrise shooting, and post-processing services. Perfect for content creators and photography enthusiasts.",
    image: "https://images.unsplash.com/photo-1584725686929-eebf97add53e",
    imageAlt: "Professional photographer with DSLR camera capturing Mount Bromo sunrise with tripod setup on volcanic viewpoint",
    category: "Photography",
    price: 1200000,
    priceUnit: "person",
    rating: 4.9,
    reviewCount: 89,
    availability: "available",
    instantBooking: true,
    duration: "6-8 hours",
    groupSize: "1-4 people",
    freeEquipment: false,
    englishGuide: true,
    hotelPickup: true,
    breakfast: true,
    photography: true,
    cancellation: true,
    provider: {
      name: "Bromo Photo Expeditions",
      avatar: "https://images.unsplash.com/photo-1731676472698-f458e85baedf",
      avatarAlt: "Professional female photographer with camera equipment and warm smile in outdoor setting",
      verified: true
    },
    features: [
    { icon: "Camera", text: "Pro Equipment" },
    { icon: "Edit", text: "Post-Processing" },
    { icon: "Sunrise", text: "Golden Hour" },
    { icon: "Award", text: "Expert Guide" }],

    highlights: [
    "Professional photography equipment",
    "Expert photography guidance",
    "Post-processing services included",
    "Multiple shooting locations",
    "Small group for personalized attention"]

  },
  {
    id: 4,
    title: "Equipment Rental - Hiking & Camping Gear",
    description: "Complete hiking and camping equipment rental service. High-quality gear including tents, sleeping bags, hiking boots, and warm clothing for Bromo adventures.",
    image: "https://images.unsplash.com/photo-1596055747042-731a269d208f",
    imageAlt: "Organized display of hiking equipment including backpacks, sleeping bags, tents, and boots laid out on wooden surface",
    category: "Equipment",
    price: 150000,
    priceUnit: "day",
    rating: 4.5,
    reviewCount: 267,
    availability: "available",
    instantBooking: true,
    duration: "1-7 days",
    groupSize: "1-20 people",
    freeEquipment: false,
    englishGuide: false,
    hotelPickup: true,
    breakfast: false,
    photography: false,
    cancellation: true,
    provider: {
      name: "Bromo Gear Rental",
      avatar: "https://images.unsplash.com/photo-1663440232819-fcfd9a22cfa0",
      avatarAlt: "Friendly equipment rental shop owner standing among outdoor gear displays with helpful expression",
      verified: true
    },
    features: [
    { icon: "Backpack", text: "Hiking Gear" },
    { icon: "Tent", text: "Camping Equipment" },
    { icon: "Thermometer", text: "Warm Clothing" },
    { icon: "Truck", text: "Delivery Service" }],

    highlights: [
    "High-quality outdoor equipment",
    "Flexible rental periods",
    "Equipment delivery service",
    "Comprehensive gear packages",
    "Competitive daily rates"]

  },
  {
    id: 5,
    title: "Local Guide Service - Cultural Experience",
    description: "Authentic cultural experience with local Tengger community guide. Learn about traditions, visit local villages, and understand the spiritual significance of Mount Bromo.",
    image: "https://images.unsplash.com/photo-1542897730-eb9fff056519",
    imageAlt: "Traditional Tengger elder in ceremonial dress standing near Mount Bromo with temple offerings and cultural artifacts",
    category: "Guide Service",
    price: 400000,
    priceUnit: "group",
    rating: 4.7,
    reviewCount: 143,
    availability: "available",
    instantBooking: false,
    duration: "4-5 hours",
    groupSize: "1-10 people",
    freeEquipment: false,
    englishGuide: true,
    hotelPickup: false,
    breakfast: true,
    photography: false,
    cancellation: true,
    provider: {
      name: "Tengger Cultural Tours",
      avatar: "https://images.unsplash.com/photo-1720873708731-596ff0523d4f",
      avatarAlt: "Elderly Tengger community leader wearing traditional clothing with warm welcoming smile and cultural knowledge",
      verified: true
    },
    features: [
    { icon: "Users", text: "Cultural Guide" },
    { icon: "Home", text: "Village Visit" },
    { icon: "Heart", text: "Local Stories" },
    { icon: "Coffee", text: "Traditional Food" }],

    highlights: [
    "Authentic Tengger cultural experience",
    "Visit traditional villages",
    "Learn local customs and traditions",
    "Traditional food tasting",
    "Spiritual significance insights"]

  },
  {
    id: 6,
    title: "Luxury Bromo Camping Experience",
    description: "Premium camping experience with luxury tents, gourmet meals, and exclusive sunrise viewing spots. Perfect for couples and luxury travelers seeking comfort in nature.",
    image: "https://images.unsplash.com/photo-1632366965901-6a538b02ba68",
    imageAlt: "Luxury camping setup with spacious tent, comfortable bedding, and Mount Bromo volcanic landscape visible in background during sunset",
    category: "Camping",
    price: 1800000,
    originalPrice: 2200000,
    priceUnit: "person",
    rating: 4.9,
    reviewCount: 67,
    availability: "limited",
    instantBooking: true,
    duration: "2 days",
    groupSize: "2-8 people",
    freeEquipment: true,
    englishGuide: true,
    hotelPickup: true,
    breakfast: true,
    photography: true,
    cancellation: true,
    provider: {
      name: "Bromo Luxury Expeditions",
      avatar: "https://images.unsplash.com/photo-1654470775420-f4b27931753a",
      avatarAlt: "Professional luxury tour coordinator in elegant outdoor attire with confident and welcoming demeanor",
      verified: true
    },
    features: [
    { icon: "Tent", text: "Luxury Camping" },
    { icon: "ChefHat", text: "Gourmet Meals" },
    { icon: "Star", text: "Premium Service" },
    { icon: "Camera", text: "Photography" }],

    highlights: [
    "Luxury camping accommodations",
    "Gourmet meal service",
    "Exclusive sunrise viewing spots",
    "Professional photography service",
    "Premium comfort amenities"]

  }];


  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    setTimeout(() => {
      setExperiences(mockExperiences);
      setFilteredExperiences(mockExperiences);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, sortBy, searchQuery, experiences]);

  const applyFiltersAndSort = () => {
    let filtered = [...experiences];

    // Apply search query
    if (searchQuery) {
      filtered = filtered?.filter((exp) =>
      exp?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      exp?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      exp?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply filters
    if (filters?.experienceType) {
      filtered = filtered?.filter((exp) => exp?.category?.toLowerCase()?.includes(filters?.experienceType));
    }

    if (filters?.priceRange?.min) {
      filtered = filtered?.filter((exp) => exp?.price >= parseInt(filters?.priceRange?.min));
    }

    if (filters?.priceRange?.max) {
      filtered = filtered?.filter((exp) => exp?.price <= parseInt(filters?.priceRange?.max));
    }

    if (filters?.availability) {
      filtered = filtered?.filter((exp) => exp?.availability === 'available');
    }

    if (filters?.instantBooking) {
      filtered = filtered?.filter((exp) => exp?.instantBooking);
    }

    if (filters?.freeEquipment) {
      filtered = filtered?.filter((exp) => exp?.freeEquipment);
    }

    if (filters?.englishGuide) {
      filtered = filtered?.filter((exp) => exp?.englishGuide);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'reviews':
        filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      case 'availability':
        filtered?.sort((a, b) => {
          const availabilityOrder = { 'available': 0, 'limited': 1, 'unavailable': 2 };
          return availabilityOrder?.[a?.availability] - availabilityOrder?.[b?.availability];
        });
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredExperiences(filtered);
  };

  const handleSearch = (searchData) => {
    setSearchQuery(searchData?.query || '');
    // Handle other quick filters if needed
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
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
    setFilters(clearedFilters);
  };

  const handleBookNow = (experience) => {
    setSelectedExperience(experience);
    setIsBookingModalOpen(true);
  };

  const handleViewDetails = (experience) => {
    // In a real app, this would navigate to a detailed view
    console.log('View details for:', experience?.title);
  };

  const handleConfirmBooking = (bookingData) => {
    // In a real app, this would process the booking
    console.log('Booking confirmed:', bookingData);
    alert(`Booking confirmed! Your booking ID is: ${bookingData?.bookingId}`);
  };

  const handleChatSupport = () => {
    // In a real app, this would open chat widget
    alert('Live chat support would open here');
  };

  const handleEmergencyContact = () => {
    // In a real app, this would show emergency contacts
    alert('Emergency contacts:\n24/7 Hotline: +62 812 3456 7890\nWhatsApp: +62 812 3456 7890');
  };

  const handleCompareExperiences = () => {
    if (comparisonList?.length >= 2) {
      setIsComparisonModalOpen(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Experience Booking - Bromo Adventure Hub</title>
        <meta name="description" content="Book authentic Mount Bromo adventures including jeep tours, trail bikes, equipment rentals, and complete packages with real-time availability and secure payment processing." />
        <meta name="keywords" content="Bromo booking, jeep tour, trail bike, equipment rental, adventure packages, Mount Bromo experiences" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="relative h-64 bg-gradient-to-r from-volcanic-deep via-volcanic-brown to-sunrise-orange overflow-hidden">
            <div className="absolute inset-0 volcanic-particles"></div>
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Book Your Bromo Adventure
                </h1>
                <p className="text-xl text-warm-cream mb-6">
                  Discover authentic experiences with trusted local providers. Real-time availability and instant booking.
                </p>
                <div className="flex items-center space-x-4 text-warm-cream">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={20} />
                    <span>Secure Booking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={20} />
                    <span>Instant Confirmation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Star" size={20} />
                    <span>Verified Providers</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Search and Filters */}
          <section className="container mx-auto px-4 py-8">
            <SearchBar
              onSearch={handleSearch}
              onFilterToggle={() => setIsFilterSidebarOpen(true)} />


            <div className="flex gap-8">
              {/* Filter Sidebar */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                  isOpen={false}
                  onClose={() => {}} />

              </div>

              {/* Mobile Filter Sidebar */}
              <FilterSidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                isOpen={isFilterSidebarOpen}
                onClose={() => setIsFilterSidebarOpen(false)} />


              {/* Main Content */}
              <div className="flex-1">
                {/* Sorting Controls */}
                <SortingControls
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  resultsCount={filteredExperiences?.length}
                  isLoading={isLoading} />


                {/* Experience Grid */}
                {isLoading ?
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)]?.map((_, index) =>
                  <div key={index} className="bg-card border border-border rounded-xl p-6 animate-pulse">
                        <div className="h-48 bg-muted rounded-lg mb-4"></div>
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                        <div className="flex justify-between items-center">
                          <div className="h-6 bg-muted rounded w-24"></div>
                          <div className="h-8 bg-muted rounded w-20"></div>
                        </div>
                      </div>
                  )}
                  </div> :
                filteredExperiences?.length > 0 ?
                <div className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`
                }>
                    {filteredExperiences?.map((experience) =>
                  <ExperienceCard
                    key={experience?.id}
                    experience={experience}
                    onBookNow={handleBookNow}
                    onViewDetails={handleViewDetails} />

                  )}
                  </div> :

                <div className="text-center py-12">
                    <Icon name="Search" size={48} className="mx-auto text-text-secondary mb-4" />
                    <h3 className="text-xl font-semibold text-text-primary mb-2">No experiences found</h3>
                    <p className="text-text-secondary mb-6">Try adjusting your filters or search terms</p>
                    <Button variant="outline" onClick={handleClearFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                }

                {/* Load More Button */}
                {filteredExperiences?.length > 0 &&
                <div className="text-center mt-12">
                    <Button variant="outline" size="lg" className="seismic-hover">
                      Load More Experiences
                    </Button>
                  </div>
                }
              </div>
            </div>
          </section>

          {/* Trust Indicators */}
          <section className="bg-muted py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-text-secondary">Happy Travelers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-text-secondary">Verified Partners</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">4.8</div>
                  <div className="text-text-secondary">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-text-secondary">Support Available</div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Modals */}
        <BookingModal
          experience={selectedExperience}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onConfirmBooking={handleConfirmBooking} />


        <ComparisonModal
          experiences={comparisonList}
          isOpen={isComparisonModalOpen}
          onClose={() => setIsComparisonModalOpen(false)}
          onBookExperience={handleBookNow} />


        {/* Quick Actions */}
        <QuickActions
          onChatSupport={handleChatSupport}
          onEmergencyContact={handleEmergencyContact} />

      </div>
    </>);

};

export default ExperienceBooking;