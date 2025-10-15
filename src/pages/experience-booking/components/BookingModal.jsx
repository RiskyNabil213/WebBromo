import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/appImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingModal = ({ experience, isOpen, onClose, onConfirmBooking }) => {
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    guests: 1,
    addOns: [],
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      nationality: ''
    },
    paymentMethod: '',
    specialRequests: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !experience) return null;

  const timeSlots = [
    { value: '03:00', label: '03:00 AM - Sunrise Tour' },
    { value: '06:00', label: '06:00 AM - Morning Tour' },
    { value: '09:00', label: '09:00 AM - Day Tour' },
    { value: '15:00', label: '03:00 PM - Afternoon Tour' },
    { value: '18:00', label: '06:00 PM - Sunset Tour' }
  ];

  const paymentMethods = [
    { value: 'gopay', label: 'GoPay' },
    { value: 'ovo', label: 'OVO' },
    { value: 'dana', label: 'DANA' },
    { value: 'bank-transfer', label: 'Bank Transfer' },
    { value: 'credit-card', label: 'Credit/Debit Card' }
  ];

  const addOnOptions = [
    { id: 'breakfast', name: 'Traditional Breakfast', price: 50000, description: 'Local Indonesian breakfast' },
    { id: 'photography', name: 'Professional Photography', price: 200000, description: 'Professional photos of your adventure' },
    { id: 'transport', name: 'Hotel Pickup', price: 100000, description: 'Pickup from your hotel in Malang/Probolinggo' },
    { id: 'equipment', name: 'Premium Equipment', price: 75000, description: 'High-quality hiking gear and warm clothing' }
  ];

  const handleInputChange = (field, value, nested = null) => {
    if (nested) {
      setBookingData(prev => ({
        ...prev,
        [nested]: {
          ...prev?.[nested],
          [field]: value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleAddOnToggle = (addOnId) => {
    setBookingData(prev => ({
      ...prev,
      addOns: prev?.addOns?.includes(addOnId)
        ? prev?.addOns?.filter(id => id !== addOnId)
        : [...prev?.addOns, addOnId]
    }));
  };

  const calculateTotal = () => {
    const basePrice = experience?.price * bookingData?.guests;
    const addOnTotal = bookingData?.addOns?.reduce((total, addOnId) => {
      const addOn = addOnOptions?.find(option => option?.id === addOnId);
      return total + (addOn ? addOn?.price : 0);
    }, 0);
    return basePrice + addOnTotal;
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmBooking = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const bookingConfirmation = {
        bookingId: `BRO${Date.now()}`,
        experience,
        bookingData,
        total: calculateTotal(),
        status: 'confirmed'
      };
      
      onConfirmBooking(bookingConfirmation);
      setIsProcessing(false);
      onClose();
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Select Date & Time</h3>
            <Input
              label="Date"
              type="date"
              value={bookingData?.date}
              onChange={(e) => handleInputChange('date', e?.target?.value)}
              min={new Date()?.toISOString()?.split('T')?.[0]}
              required
            />
            <Select
              label="Time Slot"
              placeholder="Choose your preferred time"
              options={timeSlots}
              value={bookingData?.time}
              onChange={(value) => handleInputChange('time', value)}
              required
            />
            <Input
              label="Number of Guests"
              type="number"
              min="1"
              max="20"
              value={bookingData?.guests}
              onChange={(e) => handleInputChange('guests', parseInt(e?.target?.value))}
              required
            />
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Add-ons (Optional)
              </label>
              <div className="space-y-3">
                {addOnOptions?.map((addOn) => (
                  <div key={addOn?.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                    <Checkbox
                      checked={bookingData?.addOns?.includes(addOn?.id)}
                      onChange={() => handleAddOnToggle(addOn?.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-text-primary">{addOn?.name}</h4>
                        <span className="font-semibold text-primary">
                          +IDR {addOn?.price?.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mt-1">{addOn?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Customer Information</h3>
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={bookingData?.customerInfo?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value, 'customerInfo')}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={bookingData?.customerInfo?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value, 'customerInfo')}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+62 812 3456 7890"
              value={bookingData?.customerInfo?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value, 'customerInfo')}
              required
            />
            <Input
              label="Nationality"
              type="text"
              placeholder="e.g., Indonesian, American, etc."
              value={bookingData?.customerInfo?.nationality}
              onChange={(e) => handleInputChange('nationality', e?.target?.value, 'customerInfo')}
              required
            />
            <Input
              label="Special Requests (Optional)"
              type="text"
              placeholder="Any dietary restrictions, accessibility needs, etc."
              value={bookingData?.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e?.target?.value)}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Payment & Confirmation</h3>
            <Select
              label="Payment Method"
              placeholder="Choose payment method"
              options={paymentMethods}
              value={bookingData?.paymentMethod}
              onChange={(value) => handleInputChange('paymentMethod', value)}
              required
            />
            {/* Booking Summary */}
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-semibold text-text-primary mb-3">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Experience:</span>
                  <span className="font-medium">{experience?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span>{bookingData?.date} at {bookingData?.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span>{bookingData?.guests} person(s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>IDR {(experience?.price * bookingData?.guests)?.toLocaleString('id-ID')}</span>
                </div>
                {bookingData?.addOns?.length > 0 && (
                  <div className="border-t border-border pt-2 mt-2">
                    {bookingData?.addOns?.map(addOnId => {
                      const addOn = addOnOptions?.find(option => option?.id === addOnId);
                      return (
                        <div key={addOnId} className="flex justify-between">
                          <span>{addOn?.name}:</span>
                          <span>IDR {addOn?.price?.toLocaleString('id-ID')}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold text-base">
                  <span>Total:</span>
                  <span className="text-primary">IDR {calculateTotal()?.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} color="#EA580C" />
                <div className="text-sm">
                  <p className="font-medium text-warning">Important Notes:</p>
                  <ul className="mt-1 space-y-1 text-text-secondary">
                    <li>• Please arrive 30 minutes before departure time</li>
                    <li>• Bring warm clothing for early morning tours</li>
                    <li>• Cancellation allowed up to 24 hours before tour</li>
                    <li>• Weather conditions may affect tour availability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <Image
              src={experience?.image}
              alt={experience?.imageAlt}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{experience?.title}</h2>
              <p className="text-sm text-text-secondary">{experience?.provider?.name}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            {[1, 2, 3]?.map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-text-secondary'
                }`}>
                  {step}
                </div>
                <span className={`ml-2 text-sm ${
                  step <= currentStep ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {step === 1 ? 'Details' : step === 2 ? 'Information' : 'Payment'}
                </span>
                {step < 3 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar max-h-96">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/50">
          <div className="text-sm text-text-secondary">
            Step {currentStep} of 3
          </div>
          
          <div className="flex items-center space-x-3">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevStep}>
                Previous
              </Button>
            )}
            
            {currentStep < 3 ? (
              <Button variant="default" onClick={handleNextStep}>
                Next Step
              </Button>
            ) : (
              <Button 
                variant="default" 
                onClick={handleConfirmBooking}
                loading={isProcessing}
                className="volcanic-glow"
              >
                {isProcessing ? 'Processing...' : `Confirm Booking - IDR ${calculateTotal()?.toLocaleString('id-ID')}`}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;