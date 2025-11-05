import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PhotoContest = ({ contestData }) => {
  const [selectedCategory, setSelectedCategory] = useState('current');

  const categories = [
    { id: 'current', label: 'Current Contest', icon: 'Trophy' },
    { id: 'winners', label: 'Past Winners', icon: 'Award' },
    { id: 'rules', label: 'Contest Rules', icon: 'FileText' }
  ];

  const renderCurrentContest = () => (
    <div className="space-y-8">
      {/* Contest Header */}
      <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Icon name="Trophy" size={32} className="text-primary" />
          <h3 className="text-3xl font-bold text-text-primary">
            {contestData?.current?.title}
          </h3>
        </div>
        <p className="text-text-secondary text-lg mb-6 max-w-2xl mx-auto">
          {contestData?.current?.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
              <Icon name="Calendar" size={24} className="text-primary" />
            </div>
            <h4 className="font-semibold text-text-primary">Deadline</h4>
            <p className="text-text-secondary">{contestData?.current?.deadline}</p>
          </div>
          <div className="text-center">
            <div className="bg-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
              <Icon name="Gift" size={24} className="text-accent" />
            </div>
            <h4 className="font-semibold text-text-primary">Prize Pool</h4>
            <p className="text-text-secondary">{contestData?.current?.prizePool}</p>
          </div>
          <div className="text-center">
            <div className="bg-secondary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
              <Icon name="Users" size={24} className="text-secondary" />
            </div>
            <h4 className="font-semibold text-text-primary">Participants</h4>
            <p className="text-text-secondary">{contestData?.current?.participants}</p>
          </div>
        </div>

        <Button
          variant="default"
          size="lg"
          iconName="Upload"
          iconPosition="left"
          className="volcanic-glow seismic-hover"
        >
          Submit Your Entry
        </Button>
      </div>

      {/* Contest Themes */}
      <div>
        <h4 className="text-xl font-bold text-text-primary mb-6">Contest Themes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contestData?.current?.themes?.map((theme, index) => (
            <div key={index} className="bg-card rounded-xl p-6 volcanic-glow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary/20 rounded-full p-3">
                  <Icon name={theme?.icon} size={24} className="text-primary" />
                </div>
                <h5 className="font-semibold text-text-primary">{theme?.name}</h5>
              </div>
              <p className="text-text-secondary text-sm mb-4">{theme?.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary font-medium">
                  {theme?.submissions} submissions
                </span>
                <span className="text-xs text-accent font-medium">
                  Prize: {theme?.prize}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Submissions */}
      <div>
        <h4 className="text-xl font-bold text-text-primary mb-6">Recent Submissions</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {contestData?.current?.recentSubmissions?.map((submission, index) => (
            <div key={index} className="group relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={submission?.image}
                alt={submission?.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs font-medium truncate">
                  {submission?.title}
                </p>
                <p className="text-white/80 text-xs">
                  by {submission?.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPastWinners = () => (
    <div className="space-y-8">
      {contestData?.pastWinners?.map((contest, contestIndex) => (
        <div key={contestIndex} className="bg-card rounded-2xl p-6 volcanic-glow">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-text-primary">{contest?.title}</h4>
            <span className="text-sm text-text-secondary">{contest?.date}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {contest?.winners?.map((winner, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4">
                  <Image
                    src={winner?.image}
                    alt={winner?.alt}
                    className="w-full aspect-square object-cover rounded-xl"
                  />
                  <div className="absolute -top-2 -right-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                    }`}>
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                  </div>
                </div>
                <h5 className="font-semibold text-text-primary mb-1">{winner?.title}</h5>
                <p className="text-text-secondary text-sm mb-2">by {winner?.photographer}</p>
                <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={14} />
                    <span>{winner?.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} />
                    <span>{winner?.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderRules = () => (
    <div className="bg-card rounded-2xl p-8 volcanic-glow">
      <h4 className="text-2xl font-bold text-text-primary mb-6">Contest Rules & Guidelines</h4>
      
      <div className="space-y-6">
        {contestData?.rules?.map((section, index) => (
          <div key={index}>
            <h5 className="text-lg font-semibold text-text-primary mb-3 flex items-center space-x-2">
              <Icon name={section?.icon} size={20} className="text-primary" />
              <span>{section?.title}</span>
            </h5>
            <ul className="space-y-2 ml-7">
              {section?.items?.map((item, itemIndex) => (
                <li key={itemIndex} className="text-text-secondary flex items-start space-x-2">
                  <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-primary/10 rounded-xl">
        <h6 className="font-semibold text-text-primary mb-2">Need Help?</h6>
        <p className="text-text-secondary text-sm mb-4">
          Have questions about the contest? Our team is here to help you submit your best work.
        </p>
        <Button variant="outline" iconName="MessageCircle" iconPosition="left">
          Contact Support
        </Button>
      </div>
    </div>
  );

  return (
    <div className="bg-muted/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Photography Contest
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Showcase your Bromo adventures and compete with photographers from around the world
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-background rounded-xl p-1 flex space-x-1 shadow-sm">
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => setSelectedCategory(category?.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category?.id
                    ? 'bg-primary text-primary-foreground volcanic-glow'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={category?.icon} size={18} />
                <span>{category?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {selectedCategory === 'current' && renderCurrentContest()}
        {selectedCategory === 'winners' && renderPastWinners()}
        {selectedCategory === 'rules' && renderRules()}
      </div>
    </div>
  );
};

export default PhotoContest;