export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Veg' | 'Non-Veg' | 'Tandoor' | 'Breads' | 'Rice' | 'Desserts' | 'Drinks';
  image: string;
  vegetarian: boolean;
  spicy: boolean;
  available: boolean;
  featured?: boolean;
}

export interface GalleryItemType {
  id: string;
  title: string;
  category: 'food' | 'tandoor' | 'interior' | 'dining' | 'chai' | 'naan' | 'thali' | 'ambience';
  image: string;
  aspectRatio: string;
}

export interface TestimonialType {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar: string;
}

export const siteConfig = {
  siteName: "Pind Da Dhaba",
  tagline: "Punjab, Served With Soul.",
  secondaryTagline: "Authentic flavours. Rustic warmth. Modern hospitality.",
  description: "A contemporary tribute to Punjab's roadside heritage. Charcoal-fired clay tandoors, slow-simmered gravies, and the timeless generosity of rural hospitality.",
  demoDisclaimer: "DEMO CONCEPT — FICTIONAL RESTAURANT SHOWCASE",
  
  contact: {
    address: {
      line1: "SCO 42-43, Sector 17-C",
      city: "Chandigarh",
      state: "Punjab",
      pincode: "160017",
      country: "India",
      display: "Pind Da Dhaba, Chandigarh, India — Demo Location",
      mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Sector+17,+Chandigarh,+India",
    },
    phone: "+91 98765 43210",
    phoneClean: "+919876543210",
    whatsapp: "+91 98765 43210",
    whatsappClean: "919876543210",
    email: "hello@pinddadha.ba",
    hours: {
      weekday: "Monday – Thursday: 11:00 AM – 11:00 PM",
      weekend: "Friday – Sunday: 11:00 AM – 12:00 AM",
    }
  },

  socialLinks: {
    instagram: "https://instagram.com/pinddadhabademo",
    facebook: "https://facebook.com/pinddadhabademo",
    twitter: "https://twitter.com/pinddadhabademo",
  },

  hero: {
    eyebrow: "FROM THE HEART OF PUNJAB",
    headline: "PUNJAB,\nSERVED WITH SOUL.",
    description: "Bold flavours, smoky tandoors and the warmth of a true Punjabi table.",
    primaryCTA: "Explore Our Menu",
    secondaryCTA: "Book a Table",
    scrollText: "SCROLL TO EXPLORE",
    bgImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1920&q=85",
  },

  brandStatement: {
    label: "THE PIND EXPERIENCE",
    heading: "Where every plate carries a little piece of Punjab.",
    description: "Pind Da Dhaba is a fictional modern interpretation of a traditional Punjabi dhaba. Born from the mustard fields of Amritsar and the bustling highways of the Grand Trunk Road, we bring together time-honored slow-cooking traditions with modern culinary finesse.",
    stats: [
      { label: "Signature Spices", value: "36+" },
      { label: "Slow-Cook Hours", value: "18 hrs" },
      { label: "Clay Tandoors", value: "4 Custom" },
      { label: "Guest Smiles", value: "10,000+" },
    ]
  },

  experiences: [
    {
      title: "THE TANDOOR",
      tagline: "Smoky. Charred. Unforgettable.",
      description: "Fired with seasoned charcoal and sheesham wood, our handcrafted clay tandoors lock in smoky aromatics and unmatched juiciness.",
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "THE THALI",
      tagline: "Generous plates made for sharing.",
      description: "Overflowing with ghee-brushed breads, slow-cooked lentils, and heritage curries, reflecting the boundless hospitality of Punjab.",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "THE PIND",
      tagline: "Come hungry. Leave with stories.",
      description: "Warm brass accents, rustic terracotta, woven charpais, and the vibrant music of rural harvest celebrations.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
    }
  ],

  marqueePhrases: [
    "AUTHENTIC PUNJABI FLAVOURS",
    "FRESH FROM THE TANDOOR",
    "MADE FOR SHARING",
    "PUNJAB, SERVED WITH SOUL",
    "SLOW-SIMMERED DAL MAKHANI",
    "HAND-ROLLED AMRITSARI KULCHAS"
  ],

  menuCategories: [
    'All',
    'Veg',
    'Non-Veg',
    'Tandoor',
    'Breads',
    'Rice',
    'Desserts',
    'Drinks'
  ] as const,

  signatureDishes: [
    {
      id: "sig-1",
      name: "Amritsari Kulcha",
      description: "Crisp multi-layered flatbread stuffed with spiced potatoes and crushed pomegranate seeds, served with chole and churned white butter.",
      price: 249,
      category: "Breads",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      vegetarian: true,
      spicy: true,
      available: true,
      featured: true,
    },
    {
      id: "sig-2",
      name: "Tandoori Chicken",
      description: "Tender spring chicken steeped in hung curd, Kashmiri deggi mirch, and mustard oil, charred over smoking coal embers.",
      price: 449,
      category: "Tandoor",
      image: "/dishes/tandoori_chicken.jpg",
      vegetarian: false,
      spicy: true,
      available: true,
      featured: true,
    },
    {
      id: "sig-3",
      name: "Dal Makhani",
      description: "Black lentils and kidney beans simmered overnight for 18 hours with vine-ripened tomatoes, finished with churned butter and sweet cream.",
      price: 299,
      category: "Veg",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      vegetarian: true,
      spicy: false,
      available: true,
      featured: true,
    },
    {
      id: "sig-4",
      name: "Butter Chicken",
      description: "Succulent charcoal-grilled chicken tikka bathed in an unctuous, silky gravy of roasted tomatoes, cashews, and dried fenugreek.",
      price: 399,
      category: "Non-Veg",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
      vegetarian: false,
      spicy: false,
      available: true,
      featured: true,
    }
  ] as MenuItemType[],

  initialMenuItems: [
    {
      id: "menu-1",
      name: "Amritsari Kulcha",
      description: "Crisp multi-layered flatbread stuffed with spiced potatoes and crushed pomegranate seeds, served with chole and churned white butter.",
      price: 249,
      category: "Breads",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      vegetarian: true,
      spicy: true,
      available: true,
      featured: true,
    },
    {
      id: "menu-2",
      name: "Tandoori Chicken",
      description: "Tender spring chicken steeped in hung curd, Kashmiri deggi mirch, and mustard oil, charred over smoking coal embers.",
      price: 449,
      category: "Tandoor",
      image: "/dishes/tandoori_chicken.jpg",
      vegetarian: false,
      spicy: true,
      available: true,
      featured: true,
    },
    {
      id: "menu-3",
      name: "Dal Makhani",
      description: "Black lentils and kidney beans simmered overnight for 18 hours with vine-ripened tomatoes, finished with churned butter and sweet cream.",
      price: 299,
      category: "Veg",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      vegetarian: true,
      spicy: false,
      available: true,
      featured: true,
    },
    {
      id: "menu-4",
      name: "Butter Chicken",
      description: "Succulent charcoal-grilled chicken tikka bathed in an unctuous, silky gravy of roasted tomatoes, cashews, and dried fenugreek.",
      price: 399,
      category: "Non-Veg",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
      vegetarian: false,
      spicy: false,
      available: true,
      featured: true,
    },
    {
      id: "menu-5",
      name: "Paneer Tikka Angare",
      description: "Thick cubes of fresh malai paneer marinated in yellow chilli paste, ajwain, and hung curd, blistered in the clay tandoor.",
      price: 329,
      category: "Tandoor",
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
      vegetarian: true,
      spicy: true,
      available: true,
    },
    {
      id: "menu-6",
      name: "Sarson Ka Saag & Makki Roti",
      description: "Hand-crushed winter mustard greens cooked with radish and ginger, crowned with homemade makhan and cornflour flatbreads.",
      price: 349,
      category: "Veg",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
      vegetarian: true,
      spicy: false,
      available: true,
    },
    {
      id: "menu-7",
      name: "Rara Gosht",
      description: "Slow-braised mutton chunks infused with coarse spiced minced lamb, brown onions, cloves, and whole black cardamom.",
      price: 529,
      category: "Non-Veg",
      image: "https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=800&q=80",
      vegetarian: false,
      spicy: true,
      available: true,
    },
    {
      id: "menu-8",
      name: "Garlic Butter Naan",
      description: "Leavened dough hand-stretched, slapped onto tandoor walls, and slathered with toasted garlic butter and fresh coriander.",
      price: 89,
      category: "Breads",
      image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",
      vegetarian: true,
      spicy: false,
      available: true,
    },
    {
      id: "menu-9",
      name: "Subz Dum Biryani",
      description: "Fragrant aged Basmati rice layered with garden vegetables, saffron milk, and aromatic mint, sealed and steamed in earthen handi.",
      price: 319,
      category: "Rice",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      vegetarian: true,
      spicy: false,
      available: true,
    },
    {
      id: "menu-10",
      name: "Kesari Phirni",
      description: "Traditional stone-ground rice pudding infused with saffron threads and cardamom, set in chilled clay earthen sakoras.",
      price: 189,
      category: "Desserts",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
      vegetarian: true,
      spicy: false,
      available: true,
    },
    {
      id: "menu-11",
      name: "Gulab Jamun with Rabri",
      description: "Golden fried khoya dumplings soaked in rose cardamom syrup, served atop a bed of slow-reduced sweetened malai rabri.",
      price: 219,
      category: "Desserts",
      image: "https://images.unsplash.com/photo-1593798603546-b489679ec97b?auto=format&fit=crop&w=800&q=80",
      vegetarian: true,
      spicy: false,
      available: true,
    },
    {
      id: "menu-12",
      name: "Kulhad Patiala Lassi",
      description: "Thick churned sweet yogurt topped with a layer of clotted cream (malai), chopped pistachios, and saffron dew.",
      price: 149,
      category: "Drinks",
      image: "https://images.unsplash.com/photo-1571006687081-397554904084?auto=format&fit=crop&w=800&q=80",
      vegetarian: true,
      spicy: false,
      available: true,
    }
  ] as MenuItemType[],

  galleryItems: [
    {
      id: "gal-1",
      title: "Charcoal Clay Tandoor",
      category: "tandoor",
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=900&q=80",
      aspectRatio: "aspect-[4/5]"
    },
    {
      id: "gal-2",
      title: "Grand Dhaba Thali",
      category: "thali",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=900&q=80",
      aspectRatio: "aspect-square"
    },
    {
      id: "gal-3",
      title: "Handcrafted Kulcha Platter",
      category: "food",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
      aspectRatio: "aspect-[4/3]"
    },
    {
      id: "gal-4",
      title: "Rustic Brass Dining Ambience",
      category: "interior",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      aspectRatio: "aspect-[4/5]"
    },
    {
      id: "gal-5",
      title: "Evening Lantern Courtyard",
      category: "ambience",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
      aspectRatio: "aspect-[16/9]"
    },
    {
      id: "gal-6",
      title: "Tandoor Flame Sear",
      category: "tandoor",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
      aspectRatio: "aspect-square"
    },
    {
      id: "gal-7",
      title: "Smoky Handi Biryani",
      category: "food",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80",
      aspectRatio: "aspect-[4/5]"
    },
    {
      id: "gal-8",
      title: "Steaming Kulhad Masala Chai",
      category: "chai",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80",
      aspectRatio: "aspect-square"
    },
    {
      id: "gal-9",
      title: "Butter Dripping Garlic Naan",
      category: "naan",
      image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=900&q=80",
      aspectRatio: "aspect-[4/3]"
    },
    {
      id: "gal-10",
      title: "Traditional Charpai Dining Experience",
      category: "dining",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=80",
      aspectRatio: "aspect-[16/9]"
    }
  ] as GalleryItemType[],

  testimonials: [
    {
      id: "test-1",
      name: "Gurpreet Singh Dhillon",
      role: "Fictional Food Critic, Chandigarh Digest",
      review: "The Dal Makhani possesses an earthy depth that only hours of charcoal simmering can yield. The Amritsari Kulcha took me straight back to the lanes near the Golden Temple.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "test-2",
      name: "Simran Kaur",
      role: "Architecture & Dining Reviewer",
      review: "A masterclass in contemporary Indian hospitality. The contrast of terracotta warmth against sleek modern dining creates an unforgettable setting for celebratory dinners.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "test-3",
      name: "Vikramaditya Roy",
      role: "Culinary Enthusiast",
      review: "The smoky char on the Tandoori Chicken is unmatched in the Tricity. Crisp on the edges yet astonishingly juicy inside. Outstanding presentation and gracious service.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "test-4",
      name: "Harleen Sandhu",
      role: "Weekend Guest",
      review: "The Kulhad Patiala Lassi alone is worth the reservation. Generous portions, authentic ghee aromas, and soul-stirring Punjabi hospitality at its finest.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "test-5",
      name: "Kabir Malhotra",
      role: "Gastronomy Blogger",
      review: "It's rare to find a place that honors rural dhaba authenticity while delivering the comfort and visual splendor of modern luxury dining. An absolute triumph.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    }
  ] as TestimonialType[],

  experience: {
    dayNightEnabled: true,
    timeAwareGreeting: true,
    tandoorModeEnabled: true,
    diyaEnabled: true,
    cinematicIntroEnabled: true,
    luxuryCursorEnabled: true,
  }
};
