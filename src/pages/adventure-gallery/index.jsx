import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import GalleryHeader from './components/GalleryHeader';
import FeaturedSection from './components/FeaturedSection';
import PhotoGrid from './components/PhotoGrid';
import PhotoModal from './components/PhotoModal';
import SocialFeed from './components/SocialFeed';
import PhotoContest from './components/PhotoContest';

const AdventureGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  // Mock data for gallery photos
  const galleryPhotos = [
  {
    id: 1,
    title: "Golden Sunrise Over Mount Bromo",
    description: `Captured during the magical blue hour, this image showcases the ethereal beauty of Mount Bromo as the first rays of sunlight pierce through the volcanic mist.\n\nThe perfect alignment of clouds and light created this once-in-a-lifetime shot that took three days of waiting for the right conditions.`,
    image: "https://images.unsplash.com/photo-1610114048194-998bbb62dc55",
    alt: "Dramatic golden sunrise illuminating Mount Bromo volcano with misty clouds and silhouetted peaks in East Java Indonesia",
    category: "Sunrise Views",
    location: "Penanjakan Viewpoint",
    photographer: {
      name: "Andi Wijaya",
      avatar: "https://images.unsplash.com/photo-1597113113991-74221fab863e",
      avatarAlt: "Professional headshot of Indonesian man with short black hair wearing casual shirt",
      location: "Malang, Indonesia",
      title: "Landscape Photographer"
    },
    likes: 2847,
    views: 15420,
    comments: 89,
    uploadedAt: new Date(Date.now() - 86400000 * 2),
    camera: "Canon EOS R5, 24-70mm f/2.8",
    tags: ["sunrise", "volcano", "landscape", "indonesia", "bromo"],
    isVerified: true,
    commentsList: [
    {
      author: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
      avatarAlt: "Asian woman with long black hair smiling at camera",
      text: "Absolutely breathtaking! The colors are incredible. What time did you start hiking?",
      timeAgo: "2 hours ago"
    },
    {
      author: "Marco Silva",
      avatar: "https://images.unsplash.com/photo-1629851034481-91421b0b7fbe",
      avatarAlt: "Hispanic man with beard wearing blue shirt",
      text: "This is why Bromo is on my bucket list. Amazing capture!",
      timeAgo: "5 hours ago"
    }]

  },
  {
    id: 2,
    title: "Jeep Adventure Through Tengger Desert",
    description: `An exhilarating ride through the Sea of Sand, where our jeep kicks up volcanic dust as we race toward the base of Mount Bromo.\n\nThis shot captures the raw adventure spirit that makes Bromo exploration so thrilling.`,
    image: "https://images.unsplash.com/photo-1610900743647-f218b493558f",
    alt: "Off-road jeep driving through dusty volcanic desert terrain with Mount Bromo in background",
    category: "Adventure Activities",
    location: "Tengger Desert",
    photographer: {
      name: "Rizki Pratama",
      avatar: "https://images.unsplash.com/photo-1680104072294-e9e15e26c5cc",
      avatarAlt: "Young Indonesian man with short hair wearing adventure gear",
      location: "Probolinggo, Indonesia",
      title: "Adventure Guide"
    },
    likes: 1923,
    views: 8765,
    comments: 45,
    uploadedAt: new Date(Date.now() - 86400000 * 5),
    camera: "Sony A7III, 16-35mm f/2.8",
    tags: ["jeep", "adventure", "desert", "offroad", "tengger"],
    isVerified: false,
    commentsList: [
    {
      author: "David Kim",
      avatar: "https://images.unsplash.com/photo-1591713484558-f5ee050aeb26",
      avatarAlt: "Korean man with glasses wearing casual jacket",
      text: "The dust clouds make this shot so dynamic! Great timing.",
      timeAgo: "1 day ago"
    }]

  },
  {
    id: 3,
    title: "Traditional Tenggerese Ceremony",
    description: `Witnessing the sacred Kasada ceremony where the Tenggerese people offer prayers and gifts to the volcano spirits.\n\nThis cultural moment represents the deep spiritual connection between the local community and Mount Bromo.`,
    image: "https://images.unsplash.com/photo-1715588837119-e46060071342",
    alt: "Traditional Indonesian ceremony with people in colorful traditional clothing gathered around Mount Bromo",
    category: "Cultural Moments",
    location: "Bromo Crater Rim",
    photographer: {
      name: "Sari Indrawati",
      avatar: "https://images.unsplash.com/photo-1720873708731-596ff0523d4f",
      avatarAlt: "Indonesian woman with traditional headscarf smiling warmly",
      location: "Cemoro Lawang, Indonesia",
      title: "Cultural Photographer"
    },
    likes: 3156,
    views: 12890,
    comments: 67,
    uploadedAt: new Date(Date.now() - 86400000 * 7),
    camera: "Nikon D850, 85mm f/1.4",
    tags: ["culture", "ceremony", "tenggerese", "tradition", "spiritual"],
    isVerified: true,
    commentsList: [
    {
      author: "Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1490720611507-c764a9e53fe3",
      avatarAlt: "Hispanic woman with curly hair wearing colorful scarf",
      text: "Such a beautiful cultural moment captured perfectly!",
      timeAgo: "3 hours ago"
    }]

  },
  {
    id: 4,
    title: "Volcanic Steam and Sulfur Vents",
    description: `The raw power of Mount Bromo revealed through billowing steam and sulfur deposits that paint the crater walls in vibrant yellows and oranges.\n\nThis close-up perspective shows the active volcanic nature that makes Bromo so fascinating.`,
    image: "https://images.unsplash.com/photo-1662974115092-6b27d8e15d22",
    alt: "Close-up view of Mount Bromo crater with steam vents and colorful sulfur deposits",
    category: "Volcanic Landscapes",
    location: "Bromo Crater",
    photographer: {
      name: "Ahmad Fauzi",
      avatar: "https://images.unsplash.com/photo-1563362027-e2bf8ce09558",
      avatarAlt: "Indonesian man with beard wearing hiking gear and cap",
      location: "Surabaya, Indonesia",
      title: "Geological Photographer"
    },
    likes: 2234,
    views: 9876,
    comments: 34,
    uploadedAt: new Date(Date.now() - 86400000 * 3),
    camera: "Fujifilm X-T4, 100-400mm f/4.5-5.6",
    tags: ["volcano", "crater", "steam", "sulfur", "geology"],
    isVerified: true,
    commentsList: []
  },
  {
    id: 5,
    title: "Horseback Riding at Dawn",
    description: `Traditional horseback riding across the Tengger caldera as the morning mist creates an otherworldly atmosphere.\n\nThis ancient mode of transport connects visitors with centuries of local tradition.`,
    image: "https://images.unsplash.com/photo-1559659087-87e2b49a769e",
    alt: "Silhouette of person riding horse across misty volcanic landscape at dawn",
    category: "Adventure Activities",
    location: "Tengger Caldera",
    photographer: {
      name: "Made Sutrisna",
      avatar: "https://images.unsplash.com/photo-1703648591233-95367f1acb24",
      avatarAlt: "Balinese man with traditional headband smiling outdoors",
      location: "Bali, Indonesia",
      title: "Travel Photographer"
    },
    likes: 1876,
    views: 7543,
    comments: 28,
    uploadedAt: new Date(Date.now() - 86400000 * 4),
    camera: "Canon EOS R6, 70-200mm f/2.8",
    tags: ["horse", "riding", "dawn", "mist", "tradition"],
    isVerified: false,
    commentsList: []
  },
  {
    id: 6,
    title: "Milky Way Over Bromo",
    description: `A spectacular night sky reveals the Milky Way galaxy stretching across the volcanic landscape of Mount Bromo.\n\nThis long exposure captures both the earthly drama and cosmic beauty that make Bromo a photographer's paradise.`,
    image: "https://images.unsplash.com/photo-1564930075627-5dee9d2ab3e6",
    alt: "Night sky with Milky Way galaxy visible above Mount Bromo volcano silhouette",
    category: "Volcanic Landscapes",
    location: "Penanjakan Viewpoint",
    photographer: {
      name: "Budi Santoso",
      avatar: "https://images.unsplash.com/photo-1588497233902-496f1c625804",
      avatarAlt: "Indonesian man with glasses wearing dark jacket outdoors",
      location: "Jakarta, Indonesia",
      title: "Astrophotographer"
    },
    likes: 4521,
    views: 18765,
    comments: 112,
    uploadedAt: new Date(Date.now() - 86400000 * 1),
    camera: "Sony A7S III, 14mm f/1.8",
    tags: ["milkyway", "astrophotography", "night", "stars", "longexposure"],
    isVerified: true,
    commentsList: [
    {
      author: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1636227209758-3f1b683f9eee",
      avatarAlt: "Caucasian man with gray hair wearing outdoor jacket",
      text: "Incredible astrophotography! How long was the exposure?",
      timeAgo: "30 minutes ago"
    }]

  }];


  // Mock data for featured photos
  const featuredPhotos = [
  {
    id: 'featured-1',
    title: "Epic Sunrise Panorama",
    description: `A breathtaking 180-degree panoramic view capturing the complete majesty of Mount Bromo at sunrise.\n\nThis award-winning photograph required a 4-day expedition to capture the perfect atmospheric conditions.`,
    image: "https://images.unsplash.com/photo-1716561291910-4b003ed41fad",
    alt: "Panoramic view of Mount Bromo at sunrise with golden light illuminating volcanic peaks and misty valleys",
    photographer: {
      name: "Indra Kusuma",
      avatar: "https://images.unsplash.com/photo-1654653078779-e5168ce889e1",
      avatarAlt: "Professional Indonesian photographer with camera equipment",
      title: "Award-winning Landscape Photographer"
    },
    likes: 8934,
    views: 45678
  },
  {
    id: 'featured-2',
    title: "Volcanic Lightning Storm",
    description: "Rare volcanic lightning captured during an active eruption phase.",
    image: "https://images.unsplash.com/photo-1554109784-99db2e47a4af",
    alt: "Dramatic lightning bolts illuminating volcanic ash clouds above Mount Bromo",
    photographer: {
      name: "Dewi Lestari",
      avatar: "https://images.unsplash.com/photo-1654653078779-e5168ce889e1",
      avatarAlt: "Indonesian woman photographer with professional camera gear",
      title: "Storm Chaser"
    },
    likes: 6721,
    views: 23456
  },
  {
    id: 'featured-3',
    title: "Cultural Heritage Portrait",
    description: "Portrait of elderly Tenggerese elder sharing traditional stories.",
    image: "https://images.unsplash.com/photo-1573249704489-154ca9320806",
    alt: "Portrait of elderly Indonesian man in traditional Tenggerese clothing with Mount Bromo background",
    photographer: {
      name: "Rini Handayani",
      avatar: "https://images.unsplash.com/photo-1667382137349-0f5cb5818a7c",
      avatarAlt: "Indonesian woman with traditional batik clothing smiling",
      title: "Cultural Documentarian"
    },
    likes: 4567,
    views: 18923
  }];


  // Mock data for social media posts
  const socialPosts = [
  {
    id: 'social-1',
    platform: 'instagram',
    type: 'photo',
    media: "https://images.unsplash.com/photo-1612834858108-d1e496c4626f",
    mediaAlt: "Instagram post showing Mount Bromo sunrise with colorful sky",
    author: {
      username: "wanderlust_indo",
      avatar: "https://images.unsplash.com/photo-1708725879473-7323116b73fe",
      avatarAlt: "Young woman with backpack smiling at camera"
    },
    caption: "Woke up at 3 AM for this view and it was SO worth it! Mount Bromo never fails to amaze me 🌋✨ The colors this morning were absolutely incredible!",
    likes: 15420,
    timeAgo: "2 hours ago",
    hashtags: ["bromo", "sunrise", "indonesia", "volcano", "adventure", "travel"]
  },
  {
    id: 'social-2',
    platform: 'tiktok',
    type: 'video',
    media: "https://images.unsplash.com/photo-1659689332665-9d1b81f6dbb5",
    mediaAlt: "TikTok video thumbnail showing jeep adventure in volcanic desert",
    author: {
      username: "adventure_seeker",
      avatar: "https://images.unsplash.com/photo-1710974455936-00eff210f3cc",
      avatarAlt: "Young man wearing adventure gear and sunglasses"
    },
    caption: "POV: You\'re racing through the Sea of Sand to catch the sunrise at Mount Bromo! This jeep ride was INSANE! 🚗💨",
    likes: 89340,
    views: 234567,
    timeAgo: "5 hours ago",
    hashtags: ["bromo", "jeep", "adventure", "indonesia", "viral", "travel"]
  },
  {
    id: 'social-3',
    platform: 'youtube',
    type: 'video',
    media: "https://images.unsplash.com/photo-1623991619299-472ca0f95ef3",
    mediaAlt: "YouTube video thumbnail of Mount Bromo documentary with traditional ceremony",
    author: {
      username: "IndonesiaExplorer",
      avatar: "https://images.unsplash.com/photo-1587684372778-58a6fe604ce6",
      avatarAlt: "Content creator with professional camera equipment"
    },
    caption: "Complete guide to visiting Mount Bromo - everything you need to know about timing, costs, and the best viewpoints!",
    likes: 12450,
    views: 456789,
    timeAgo: "1 day ago",
    hashtags: ["bromo", "guide", "indonesia", "travel", "volcano"]
  },
  {
    id: 'social-4',
    platform: 'instagram',
    type: 'photo',
    media: "https://images.unsplash.com/photo-1725921966620-06ab128b5008",
    mediaAlt: "Instagram post showing night sky with stars over Mount Bromo",
    author: {
      username: "astrophoto_id",
      avatar: "https://images.unsplash.com/photo-1657878336843-cb3be38a9428",
      avatarAlt: "Photographer with telescope equipment under starry sky"
    },
    caption: "The Milky Way over Mount Bromo is absolutely magical! Spent 6 hours in freezing temperatures but captured this beauty 🌌📸",
    likes: 8765,
    timeAgo: "3 days ago",
    hashtags: ["astrophotography", "milkyway", "bromo", "stars", "nightsky"]
  }];


  // Mock data for photo contest
  const contestData = {
    current: {
      title: "Bromo Adventure 2024",
      description: "Capture the spirit of adventure and natural beauty of Mount Bromo. Show us your most inspiring moments from this volcanic wonderland.",
      deadline: "December 31, 2024",
      prizePool: "IDR 50,000,000",
      participants: "1,247",
      themes: [
      {
        name: "Golden Hour Magic",
        description: "Sunrise and sunset photography showcasing Bromo\'s dramatic lighting",
        icon: "Sunrise",
        submissions: 342,
        prize: "IDR 15,000,000"
      },
      {
        name: "Adventure Spirit",
        description: "Action shots of jeep rides, hiking, and exploration activities",
        icon: "Zap",
        submissions: 198,
        prize: "IDR 10,000,000"
      },
      {
        name: "Cultural Heritage",
        description: "Tenggerese traditions, ceremonies, and local community life",
        icon: "Users",
        submissions: 156,
        prize: "IDR 8,000,000"
      }],

      recentSubmissions: [
      {
        image: "https://images.unsplash.com/photo-1729455901528-acbfced78b79",
        alt: "Contest submission showing dramatic Mount Bromo landscape",
        title: "Volcanic Dawn",
        author: "Andi S."
      },
      {
        image: "https://images.unsplash.com/photo-1563310201-3bc2f3a3d0de",
        alt: "Contest submission showing jeep adventure scene",
        title: "Desert Rush",
        author: "Maya K."
      },
      {
        image: "https://images.unsplash.com/photo-1587980019545-2f65537d6575",
        alt: "Contest submission showing traditional ceremony",
        title: "Sacred Ritual",
        author: "Budi P."
      },
      {
        image: "https://images.unsplash.com/photo-1542261777448-23d2a287091c",
        alt: "Contest submission showing night sky photography",
        title: "Cosmic View",
        author: "Sari D."
      },
      {
        image: "https://images.unsplash.com/photo-1609782761386-a65ec2005d03",
        alt: "Contest submission showing horseback riding",
        title: "Traditional Journey",
        author: "Rizki M."
      },
      {
        image: "https://images.unsplash.com/photo-1665135355696-abc247663851",
        alt: "Contest submission showing volcanic crater detail",
        title: "Earth\'s Power",
        author: "Indra L."
      }]

    },
    pastWinners: [
    {
      title: "Bromo Majesty 2023",
      date: "January 2024",
      winners: [
      {
        image: "https://images.unsplash.com/photo-1518807820877-136b57b62bdc",
        alt: "First place winner photo showing spectacular Mount Bromo sunrise",
        title: "Divine Sunrise",
        photographer: "Andi Wijaya",
        likes: 12450,
        views: 67890
      },
      {
        image: "https://images.unsplash.com/photo-1578258867837-8ca4f08e8e59",
        alt: "Second place winner photo showing adventure activity",
        title: "Adrenaline Rush",
        photographer: "Sari Indrawati",
        likes: 8765,
        views: 45623
      },
      {
        image: "https://images.unsplash.com/photo-1623991611322-b52b91aff8d7",
        alt: "Third place winner photo showing cultural moment",
        title: "Heritage Keeper",
        photographer: "Made Sutrisna",
        likes: 6543,
        views: 34567
      }]

    }],

    rules: [
    {
      title: "Submission Guidelines",
      icon: "Upload",
      items: [
      "Photos must be taken at Mount Bromo or surrounding Tengger region",
      "Original, unedited photos only (basic adjustments allowed)",
      "High resolution minimum 2000x2000 pixels",
      "Submit up to 3 photos per category",
      "Include location and story behind the photo"]

    },
    {
      title: "Eligibility Requirements",
      icon: "Users",
      items: [
      "Open to photographers of all skill levels worldwide",
      "Must be 18 years or older to participate",
      "Photos taken within the last 2 years",
      "No professional commercial use of submitted photos",
      "Respect local customs and environmental guidelines"]

    },
    {
      title: "Judging Criteria",
      icon: "Award",
      items: [
      "Technical excellence and composition",
      "Creativity and unique perspective",
      "Emotional impact and storytelling",
      "Adherence to theme requirements",
      "Respect for local culture and environment"]

    }]

  };

  // Filter photos based on active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredPhotos(galleryPhotos);
    } else {
      const filtered = galleryPhotos?.filter((photo) =>
      photo?.category?.toLowerCase()?.includes(activeFilter?.toLowerCase()) ||
      activeFilter === 'sunrise' && photo?.category === 'Sunrise Views' ||
      activeFilter === 'volcanic' && photo?.category === 'Volcanic Landscapes' ||
      activeFilter === 'adventure' && photo?.category === 'Adventure Activities' ||
      activeFilter === 'cultural' && photo?.category === 'Cultural Moments' ||
      activeFilter === 'wildlife' && photo?.tags?.some((tag) =>
      ['wildlife', 'nature', 'animals']?.includes(tag?.toLowerCase())
      )
      );
      setFilteredPhotos(filtered);
    }
  }, [activeFilter]);

  const handlePhotoClick = (photo) => {
    const photoIndex = filteredPhotos?.findIndex((p) => p?.id === photo?.id);
    setCurrentPhotoIndex(photoIndex);
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleNextPhoto = () => {
    const nextIndex = (currentPhotoIndex + 1) % filteredPhotos?.length;
    setCurrentPhotoIndex(nextIndex);
    setSelectedPhoto(filteredPhotos?.[nextIndex]);
  };

  const handlePrevPhoto = () => {
    const prevIndex = currentPhotoIndex === 0 ? filteredPhotos?.length - 1 : currentPhotoIndex - 1;
    setCurrentPhotoIndex(prevIndex);
    setSelectedPhoto(filteredPhotos?.[prevIndex]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const handleUploadClick = () => {
    // Mock upload functionality
    alert('Photo upload feature coming soon! Join our community to be notified when it\'s available.');
  };

  return (
    <>
      <Helmet>
        <title>Adventure Gallery - Bromo Adventure Hub</title>
        <meta name="description" content="Explore stunning photography and videos from Mount Bromo adventures. Share your own moments and discover the volcanic beauty of Indonesia through the eyes of fellow explorers." />
        <meta name="keywords" content="Mount Bromo photography, Indonesia volcano photos, adventure gallery, travel photography, Bromo sunrise, volcanic landscapes" />
        <meta property="og:title" content="Adventure Gallery - Bromo Adventure Hub" />
        <meta property="og:description" content="Discover breathtaking Mount Bromo photography and share your own adventure moments" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <GalleryHeader
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onUploadClick={handleUploadClick} />

          
          <FeaturedSection
            featuredPhotos={featuredPhotos}
            onPhotoClick={handlePhotoClick} />

          
          <PhotoGrid
            photos={filteredPhotos}
            onPhotoClick={handlePhotoClick} />

          
          <SocialFeed socialPosts={socialPosts} />
          
          <PhotoContest contestData={contestData} />
        </main>

        <PhotoModal
          photo={selectedPhoto}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onNext={handleNextPhoto}
          onPrev={handlePrevPhoto} />

      </div>
    </>);

};

export default AdventureGallery;