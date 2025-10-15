import React, { useState } from 'react';
import Image from '../../../components/appImage';
import Icon from '../../../components/AppIcon';

const PhotoGrid = ({ photos, onPhotoClick }) => {
  const [loadedImages, setLoadedImages] = useState(new Set());

  const handleImageLoad = (photoId) => {
    setLoadedImages(prev => new Set([...prev, photoId]));
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos?.map((photo) => (
          <div
            key={photo?.id}
            className="group relative bg-card rounded-xl overflow-hidden volcanic-glow hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => onPhotoClick(photo)}
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={photo?.image}
                alt={photo?.alt}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  loadedImages?.has(photo?.id) ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(photo?.id)}
              />
              
              {/* Loading Skeleton */}
              {!loadedImages?.has(photo?.id) && (
                <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                  <Icon name="Image" size={32} className="text-text-secondary" />
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Photo Stats */}
              <div className="absolute top-3 right-3 flex space-x-2">
                <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Icon name="Heart" size={14} className="text-white" />
                  <span className="text-white text-xs font-medium">{photo?.likes}</span>
                </div>
                {photo?.isVerified && (
                  <div className="bg-primary/90 backdrop-blur-sm rounded-full p-1">
                    <Icon name="CheckCircle" size={14} className="text-white" />
                  </div>
                )}
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-primary/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                  {photo?.category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200">
                  <Icon name="Share2" size={16} className="text-text-primary" />
                </button>
                <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200">
                  <Icon name="Download" size={16} className="text-text-primary" />
                </button>
              </div>
            </div>

            {/* Photo Info */}
            <div className="p-4">
              <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
                {photo?.title}
              </h3>
              
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center space-x-2">
                  <Image
                    src={photo?.photographer?.avatar}
                    alt={photo?.photographer?.avatarAlt}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-text-secondary font-medium">
                    {photo?.photographer?.name}
                  </span>
                </div>
                <span className="text-xs text-text-secondary">
                  {formatTimeAgo(photo?.uploadedAt)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-text-secondary">
                  <Icon name="MapPin" size={14} />
                  <span className="text-xs">{photo?.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} />
                    <span className="text-xs">{photo?.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MessageCircle" size={14} />
                    <span className="text-xs">{photo?.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGrid;