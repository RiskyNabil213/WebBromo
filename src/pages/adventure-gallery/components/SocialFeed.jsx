import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialFeed = ({ socialPosts }) => {
  const [activeTab, setActiveTab] = useState('instagram');

  const socialTabs = [
    { id: 'instagram', label: 'Instagram', icon: 'Instagram', color: 'text-pink-500' },
    { id: 'tiktok', label: 'TikTok', icon: 'Video', color: 'text-black' },
    { id: 'youtube', label: 'YouTube', icon: 'Youtube', color: 'text-red-500' }
  ];

  const filteredPosts = socialPosts?.filter(post => post?.platform === activeTab);

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000)?.toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000)?.toFixed(1)}K`;
    return num?.toString();
  };

  return (
    <div className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Social Media Highlights
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Follow the adventure across social platforms and see what fellow explorers are sharing from their Bromo experiences
          </p>
        </div>

        {/* Social Platform Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted rounded-xl p-1 flex space-x-1">
            {socialTabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-background text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={tab?.icon} size={18} className={activeTab === tab?.id ? tab?.color : ''} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Social Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPosts?.map((post) => (
            <div
              key={post?.id}
              className="group bg-card rounded-xl overflow-hidden volcanic-glow hover:shadow-lg transition-all duration-300"
            >
              {/* Post Media */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={post?.media}
                  alt={post?.mediaAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Platform Badge */}
                <div className="absolute top-3 left-3">
                  <div className={`bg-black/70 backdrop-blur-sm rounded-full p-2 ${
                    socialTabs?.find(tab => tab?.id === post?.platform)?.color
                  }`}>
                    <Icon 
                      name={socialTabs?.find(tab => tab?.id === post?.platform)?.icon} 
                      size={16} 
                      className="text-white"
                    />
                  </div>
                </div>

                {/* Video Play Button */}
                {post?.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="Play" size={24} className="text-white" />
                    </div>
                  </div>
                )}

                {/* Engagement Stats */}
                <div className="absolute bottom-3 right-3 flex space-x-2">
                  <div className="bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                    <Icon name="Heart" size={12} className="text-white" />
                    <span className="text-white text-xs font-medium">
                      {formatNumber(post?.likes)}
                    </span>
                  </div>
                  {post?.platform === 'youtube' && (
                    <div className="bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                      <Icon name="Eye" size={12} className="text-white" />
                      <span className="text-white text-xs font-medium">
                        {formatNumber(post?.views)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Image
                    src={post?.author?.avatar}
                    alt={post?.author?.avatarAlt}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary text-sm">
                      @{post?.author?.username}
                    </h4>
                    <p className="text-xs text-text-secondary">
                      {post?.timeAgo}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" iconName="ExternalLink">
                    View
                  </Button>
                </div>

                <p className="text-sm text-text-secondary line-clamp-3 mb-3">
                  {post?.caption}
                </p>

                {/* Hashtags */}
                {post?.hashtags && (
                  <div className="flex flex-wrap gap-1">
                    {post?.hashtags?.slice(0, 3)?.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-primary hover:text-accent cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post?.hashtags?.length > 3 && (
                      <span className="text-xs text-text-secondary">
                        +{post?.hashtags?.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Share Your Bromo Adventure
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Tag us in your posts and use #BromoAdventure to be featured in our gallery. 
              Your story could inspire the next adventurer!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                iconName="Instagram"
                iconPosition="left"
                className="volcanic-glow"
              >
                Follow on Instagram
              </Button>
              <Button
                variant="outline"
                iconName="Hash"
                iconPosition="left"
                className="seismic-hover"
              >
                Use #BromoAdventure
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialFeed;