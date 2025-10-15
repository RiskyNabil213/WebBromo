import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuickBookingWidget = () => {
  const [bookingData, setBookingData] = useState({
    date: '',
    guests: '2',
    experience: 'sunrise-package'
  });

  const experienceOptions = [
    { value: 'sunrise-package', label: 'Classic Sunrise Package' },
    { value: 'photography-tour', label: 'Photography Expedition' },
    { value: 'trekking-adventure', label: 'Adventure Trekking' },
    { value: 'jeep-only', label: 'Jeep Transport Only' },
    { value: 'custom', label: 'Custom Experience' }
  ];

  const guestOptions = [
    { value: '1', label: '1 Guest' },
    { value: '2', label: '2 Guests' },
    { value: '3', label: '3 Guests' },
    { value: '4', label: '4 Guests' },
    { value: '5', label: '5 Guests' },
    { value: '6+', label: '6+ Guests' }
  ];

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuickBook = () => {
    // Navigate to booking page with pre-filled data
    const params = new URLSearchParams(bookingData);
    window.location.href = `/experience-booking?${params?.toString()}`;
  };

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow?.setDate(tomorrow?.getDate() + 1);
  const minDate = tomorrow?.toISOString()?.split('T')?.[0];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-primary text-sm font-medium mb-4">
              <Icon name="Zap" size={16} />
              <span>Quick Booking</span>
            </div>
            
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Book Your Adventure in Seconds
            </h2>
            
            <p className="text-lg text-text-secondary">
              Skip the hassle - instant confirmation with real-time availability
            </p>
          </div>

          {/* Quick Booking Form */}
          <div className="card-volcanic p-8">
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              {/* Experience Selection */}
              <div className="md:col-span-2">
                <Select
                  label="Choose Experience"
                  options={experienceOptions}
                  value={bookingData?.experience}
                  onChange={(value) => handleInputChange('experience', value)}
                  className="w-full"
                />
              </div>

              {/* Date Selection */}
              <div>
                <Input
                  label="Select Date"
                  type="date"
                  value={bookingData?.date}
                  onChange={(e) => handleInputChange('date', e?.target?.value)}
                  min={minDate}
                  required
                />
              </div>

              {/* Guest Count */}
              <div>
                <Select
                  label="Guests"
                  options={guestOptions}
                  value={bookingData?.guests}
                  onChange={(value) => handleInputChange('guests', value)}
                />
              </div>
            </div>

            {/* Availability Status */}
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="font-medium text-green-800">Great availability!</div>
                  <div className="text-sm text-green-600">
                    Multiple time slots available for your selected date
                  </div>
                </div>
                <div className="ml-auto">
                  <Icon name="CheckCircle" size={24} className="text-green-500" />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.9★</div>
                <div className="text-xs text-text-secondary">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2,500+</div>
                <div className="text-xs text-text-secondary">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-xs text-text-secondary">Support</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={handleQuickBook}
                className="btn-volcanic flex-1"
                iconName="Calendar"
                iconPosition="left"
                disabled={!bookingData?.date}
              >
                Book Now - Instant Confirmation
              </Button>
              
              <Link to="/experience-booking" className="flex-1">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="seismic-hover"
                  iconName="Settings"
                  iconPosition="left"
                >
                  Customize Experience
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-green-500" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="RefreshCw" size={16} className="text-blue-500" />
                  <span>Free Cancellation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={16} className="text-purple-500" />
                  <span>Instant Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={16} className="text-yellow-500" />
                  <span>Best Price Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-red-700">
              <Icon name="Phone" size={16} />
              <span className="text-sm">
                Emergency Support: <strong>+62 812-3456-7890</strong> (24/7)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickBookingWidget;