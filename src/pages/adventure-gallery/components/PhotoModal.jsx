import React, { useState, useEffect } from 'react';
import Image from '../../../components/appImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PhotoModal = ({ photo, isOpen, onClose, onNext, onPrev }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(photo?.likes || 0);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e?.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(date);
  };

  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="flex h-full">
        {/* Main Image Area */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={photo?.image}
              alt={photo?.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-200"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-200"
            >
              <Icon name="ChevronRight" size={24} />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-background border-l border-border flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-text-primary">Photo Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Photo Info */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-4 space-y-4">
              {/* Title */}
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {photo?.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {photo?.description}
                </p>
              </div>

              {/* Photographer */}
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <Image
                  src={photo?.photographer?.avatar}
                  alt={photo?.photographer?.avatarAlt}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary">
                    {photo?.photographer?.name}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {photo?.photographer?.location}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex space-x-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-1 transition-colors duration-200 ${
                      isLiked ? 'text-red-500' : 'text-text-secondary hover:text-red-500'
                    }`}
                  >
                    <Icon name={isLiked ? "Heart" : "Heart"} size={18} fill={isLiked ? "currentColor" : "none"} />
                    <span className="text-sm font-medium">{likesCount}</span>
                  </button>
                  <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    <Icon name="MessageCircle" size={18} />
                    <span className="text-sm font-medium">{photo?.comments}</span>
                  </button>
                  <div className="flex items-center space-x-1 text-text-secondary">
                    <Icon name="Eye" size={18} />
                    <span className="text-sm font-medium">{photo?.views}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" iconName="Share2">
                  Share
                </Button>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="MapPin" size={16} className="text-text-secondary" />
                  <span className="text-text-primary font-medium">{photo?.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Calendar" size={16} className="text-text-secondary" />
                  <span className="text-text-secondary">{formatDate(photo?.uploadedAt)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Camera" size={16} className="text-text-secondary" />
                  <span className="text-text-secondary">{photo?.camera || 'Camera info not available'}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Tag" size={16} className="text-text-secondary" />
                  <span className="text-primary font-medium">{photo?.category}</span>
                </div>
              </div>

              {/* Tags */}
              {photo?.tags && (
                <div>
                  <h5 className="text-sm font-semibold text-text-primary mb-2">Tags</h5>
                  <div className="flex flex-wrap gap-2">
                    {photo?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              {showComments && (
                <div className="border-t border-border pt-4">
                  <h5 className="text-sm font-semibold text-text-primary mb-3">Comments</h5>
                  <div className="space-y-3">
                    {photo?.commentsList?.slice(0, 3)?.map((comment, index) => (
                      <div key={index} className="flex space-x-3">
                        <Image
                          src={comment?.avatar}
                          alt={comment?.avatarAlt}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="bg-muted rounded-lg p-3">
                            <h6 className="text-sm font-medium text-text-primary">
                              {comment?.author}
                            </h6>
                            <p className="text-sm text-text-secondary mt-1">
                              {comment?.text}
                            </p>
                          </div>
                          <span className="text-xs text-text-secondary mt-1">
                            {comment?.timeAgo}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Button variant="outline" fullWidth iconName="Download">
                Download
              </Button>
              <Button variant="default" fullWidth iconName="BookOpen">
                Book Tour
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;