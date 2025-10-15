import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/appImage';
import Button from '../../../components/ui/Button';

const SocialProofSection = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const recentReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Australia",
    avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    avatarAlt: "Professional headshot of blonde woman in blue blazer smiling at camera",
    rating: 5,
    date: "2025-10-12",
    experience: "Classic Sunrise Package",
    review: `Absolutely breathtaking experience! Our guide Made was incredible - so knowledgeable about the area and made sure we got the perfect sunrise shots. The jeep ride through the sand sea was an adventure in itself. Worth every rupiah!`,
    images: [
    {
      url: "https://images.unsplash.com/photo-1551197933-8fdac28d53f6",
      alt: "Stunning Mount Bromo sunrise with golden light illuminating volcanic crater and surrounding peaks"
    }],

    verified: true
  },
  {
    id: 2,
    name: "Marcus Chen",
    location: "Singapore",
    avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
    avatarAlt: "Professional headshot of Asian man with short black hair in navy suit",
    rating: 5,
    date: "2025-10-10",
    experience: "Photography Expedition",
    review: `As a professional photographer, I was blown away by the access we got to exclusive viewpoints. The guide understood exactly what shots I was looking for and helped me capture some of my best work. Highly recommend for serious photographers!`,
    images: [
    {
      url: "https://images.unsplash.com/photo-1564623271509-7ca70bf9836e",
      alt: "Professional photographer capturing Mount Bromo landscape with dramatic volcanic terrain and misty atmosphere"
    }],

    verified: true
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Spain",
    avatar: "https://images.unsplash.com/photo-1719515862094-c6e9354ee7f8",
    avatarAlt: "Professional headshot of Hispanic woman with long dark hair in white blouse",
    rating: 5,
    date: "2025-10-08",
    experience: "Adventure Trekking",
    review: `The two-day trekking experience was challenging but absolutely rewarding. Camping under the stars near an active volcano is something I'll never forget. The team took great care of safety while ensuring we had an authentic adventure.`,
    images: [
    {
      url: "https://images.unsplash.com/photo-1579376426879-30fb3b5949cb",
      alt: "Group of trekkers hiking up volcanic slopes with camping equipment and Mount Bromo crater in background"
    }],

    verified: true
  }];


  const userGeneratedContent = [
  {
    id: 1,
    platform: "Instagram",
    username: "@wanderlust_sarah",
    image: "https://images.unsplash.com/photo-1585357214259-f977cc7d73a4",
    imageAlt: "Instagram post showing Mount Bromo sunrise with golden light and volcanic landscape",
    likes: 2847,
    caption: "No words can describe this moment... #BromoSunrise #Indonesia"
  },
  {
    id: 2,
    platform: "TikTok",
    username: "@adventure_marcus",
    image: "https://images.unsplash.com/photo-1546455776-f21a87fc638e",
    imageAlt: "TikTok video thumbnail of jeep driving through Mount Bromo sand sea with volcanic peaks",
    likes: 15600,
    caption: "POV: You\'re driving through a volcanic desert 🌋"
  },
  {
    id: 3,
    platform: "Instagram",
    username: "@emma_explores",
    image: "https://images.unsplash.com/photo-1662217134539-f6d2e4fb14a5",
    imageAlt: "Instagram story showing camping setup with Mount Bromo crater glowing in background at night",
    likes: 892,
    caption: "Camping next to an active volcano ⛺🌋 #BucketList"
  },
  {
    id: 4,
    platform: "YouTube",
    username: "Travel Diaries",
    image: "https://images.unsplash.com/photo-1550169485-de64490e5164",
    imageAlt: "YouTube video thumbnail of Mount Bromo sunrise timelapse with dramatic volcanic landscape",
    likes: 8934,
    caption: "EPIC Bromo Sunrise Timelapse | Indonesia Travel Vlog"
  }];


  const trustMetrics = [
  { label: "Happy Travelers", value: "2,500+", icon: "Users" },
  { label: "5-Star Reviews", value: "94%", icon: "Star" },
  { label: "Years Experience", value: "8+", icon: "Award" },
  { label: "Local Partners", value: "50+", icon: "Handshake" }];


  // Auto-rotate reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % recentReviews?.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [recentReviews?.length]);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Instagram':return 'Instagram';
      case 'TikTok':return 'Video';
      case 'YouTube':return 'Play';
      default:return 'Share';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Instagram':return 'text-pink-600';
      case 'TikTok':return 'text-black';
      case 'YouTube':return 'text-red-600';
      default:return 'text-blue-600';
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-primary text-sm font-medium mb-4">
            <Icon name="Heart" size={16} />
            <span>Loved by Travelers</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Real Stories, Real Adventures
          </h2>
          
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Join thousands of adventurers who've experienced the magic of Mount Bromo with us
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustMetrics?.map((metric, index) =>
          <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={metric?.icon} size={32} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-text-primary mb-1">{metric?.value}</div>
              <div className="text-sm text-text-secondary">{metric?.label}</div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Featured Review */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-text-primary">Recent Reviews</h3>
            
            <div className="card-volcanic p-6 space-y-4">
              {/* Review Header */}
              <div className="flex items-start space-x-4">
                <Image
                  src={recentReviews?.[currentReviewIndex]?.avatar}
                  alt={recentReviews?.[currentReviewIndex]?.avatarAlt}
                  className="w-12 h-12 rounded-full object-cover" />

                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-text-primary">
                      {recentReviews?.[currentReviewIndex]?.name}
                    </h4>
                    {recentReviews?.[currentReviewIndex]?.verified &&
                    <Icon name="CheckCircle" size={16} className="text-blue-500" />
                    }
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
                    <Icon name="MapPin" size={14} />
                    <span>{recentReviews?.[currentReviewIndex]?.location}</span>
                    <span>•</span>
                    <span>{formatDate(recentReviews?.[currentReviewIndex]?.date)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(recentReviews?.[currentReviewIndex]?.rating)]?.map((_, i) =>
                      <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                      )}
                    </div>
                    <span className="text-sm text-text-secondary">
                      {recentReviews?.[currentReviewIndex]?.experience}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <p className="text-text-primary leading-relaxed">
                {recentReviews?.[currentReviewIndex]?.review}
              </p>

              {/* Review Images */}
              {recentReviews?.[currentReviewIndex]?.images &&
              <div className="grid grid-cols-2 gap-2">
                  {recentReviews?.[currentReviewIndex]?.images?.map((img, index) =>
                <div key={index} className="relative overflow-hidden rounded-lg">
                      <Image
                    src={img?.url}
                    alt={img?.alt}
                    className="w-full h-32 object-cover hover:scale-110 transition-transform duration-300" />

                    </div>
                )}
                </div>
              }
            </div>

            {/* Review Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {recentReviews?.map((_, index) =>
                <button
                  key={index}
                  onClick={() => setCurrentReviewIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentReviewIndex ? 'bg-primary' : 'bg-border'}`
                  } />

                )}
              </div>
              
              <Link to="/adventure-gallery">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right">

                  View All Reviews
                </Button>
              </Link>
            </div>
          </div>

          {/* User Generated Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-text-primary">Social Media Buzz</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {userGeneratedContent?.map((content) =>
              <div key={content?.id} className="card-volcanic p-4 group hover:scale-105 transition-transform duration-300">
                  {/* Platform Header */}
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon
                    name={getPlatformIcon(content?.platform)}
                    size={16}
                    className={getPlatformColor(content?.platform)} />

                    <span className="text-sm font-medium text-text-primary">
                      {content?.username}
                    </span>
                  </div>

                  {/* Content Image */}
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <Image
                    src={content?.image}
                    alt={content?.imageAlt}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500" />

                    
                    {/* Play button for videos */}
                    {(content?.platform === 'TikTok' || content?.platform === 'YouTube') &&
                  <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center">
                          <Icon name="Play" size={20} className="text-white ml-1" />
                        </div>
                      </div>
                  }
                  </div>

                  {/* Content Info */}
                  <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                    {content?.caption}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <Icon name="Heart" size={12} className="text-red-500" />
                    <span>{content?.likes?.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Social CTA */}
            <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2">Share Your Adventure</h4>
              <p className="text-sm text-text-secondary mb-4">
                Tag us @bromoadventurehub for a chance to be featured!
              </p>
              <div className="flex justify-center space-x-3">
                <Button variant="ghost" size="sm" iconName="Instagram">
                  Instagram
                </Button>
                <Button variant="ghost" size="sm" iconName="Video">
                  TikTok
                </Button>
                <Button variant="ghost" size="sm" iconName="Play">
                  YouTube
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default SocialProofSection;