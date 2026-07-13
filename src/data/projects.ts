export interface WebProject {
  id: string;
  title: string;
  description: string;
  domain: string;
  previewUrl: string;
  tags: string[];
  metrics: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  gallery?: string[];
}

export interface MobileProject {
  id: string;
  title: string;
  description: string;
  previewUrl: string;
  screens: string[];
  tags: string[];
  metrics: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  testFlightUrl?: string;
  webUrl?: string;
}

export interface CustomSoftwareProject {
  id: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  details: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  gallery?: string[];
  video?: string;
}


export const WEB_PROJECTS: WebProject[] = [
  {
    id: 'liver-detection',
    title: 'Liver Tumor Detection Model',
    description: 'An AI-powered liver tumor detection system that uses deep learning techniques to analyze CT scan images and assist in identifying potential liver tumors. The system combines a PyTorch-based deep learning model, a FastAPI backend, and a Next.js frontend to provide an end-to-end medical AI application.',
    domain: 'liver-detection.ai',
    previewUrl: '/images/Web/liver/liver main.png',
    tags: ['PyTorch', 'FastAPI', 'Next.js', 'Deep Learning', 'Medical AI'],
    metrics: '94% Detection Accuracy',
    image: '/images/Web/liver/liver main.png',
    githubUrl: 'https://github.com/Zynox-Tech/LiverDetectionModel',
    gallery: [
      '/images/Web/liver/liver 2.png',
      '/images/Web/liver/liver 3.png',
      '/images/Web/liver/liver 4.png'
    ]
  },
  {
    id: 'portfolio-next',
    title: 'Hashim Portfolio',
    description: 'A modern, responsive, and high-performance portfolio website built with Next.js, TypeScript, and Tailwind CSS. Designed to showcase professional experience, technical skills, projects, and contact information with a clean and scalable architecture.',
    domain: 'hashim-khan.dev',
    previewUrl: '/images/Web/portfolio-next.js-Website/P (1).png',
    liveUrl: 'https://hashim-khan.dev/',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    metrics: '100/100 Lighthouse Score',
    image: '/images/Web/portfolio-next.js-Website/P (1).png',
    githubUrl: 'https://github.com/Zynox-Tech/portfolio-next.js-Website',
    gallery: [
      '/images/Web/portfolio-next.js-Website/P (2).png',
      '/images/Web/portfolio-next.js-Website/P (3).png',
      '/images/Web/portfolio-next.js-Website/P (4).png',
      '/images/Web/portfolio-next.js-Website/P (5).png',
      '/images/Web/portfolio-next.js-Website/P (6).png',
      '/images/Web/portfolio-next.js-Website/P (7).png',
      '/images/Web/portfolio-next.js-Website/P (8).png',
      '/images/Web/portfolio-next.js-Website/P (9).png',
      '/images/Web/portfolio-next.js-Website/P (10).png'
    ]
  },
  {
    id: 'last-hammer',
    title: 'Last Hammer Mining Co.',
    description: 'A futuristic, single-page mining company website built for Last Hammer Mining Co., Abbottabad, Khyber Pakhtunkhwa. Developed using Next.js 14 with a modern UI, animations, responsive design, and optimized performance.',
    domain: 'lasthammer.com',
    previewUrl: '/images/Web/last-hammer-web/1.png',
    liveUrl: 'https://lasthammer.com',
    tags: ['Next.js 14', 'Framer Motion', 'Tailwind CSS', 'Responsive UI'],
    metrics: '99.9% Uptime Tracked',
    image: '/images/Web/last-hammer-web/1.png',
    githubUrl: 'https://github.com/Zynox-Tech/Last-Hammer-Mining-Co.-Website',
    gallery: [
      '/images/Web/last-hammer-web/2.png',
      '/images/Web/last-hammer-web/3.png',
      '/images/Web/last-hammer-web/4.png',
      '/images/Web/last-hammer-web/5.png',
      '/images/Web/last-hammer-web/6.png',
      '/images/Web/last-hammer-web/7.png',
      '/images/Web/last-hammer-web/8.png'
    ]
  },
  {
    id: 'beanery',
    title: 'Beanery — Coffee Experience',
    description: 'A modern and responsive coffee-themed website built with Next.js. Beanery provides a premium digital experience with a clean user interface, optimized performance, and a scalable architecture. The project is designed to showcase a modern brand presence with smooth interactions.',
    domain: 'beanery.coffee',
    previewUrl: '/images/Web/beanery/1.jpg',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'UX/UI Design'],
    metrics: '2.4s Average Load Time',
    image: '/images/Web/beanery/1.jpg',
    githubUrl: 'https://github.com/Zynox-Tech/Beanry',
    gallery: [
      '/images/Web/beanery/2.jpg',
      '/images/Web/beanery/3.jpg',
      '/images/Web/beanery/4.jpg',
      '/images/Web/beanery/5.jpg'
    ]
  },
  {
    id: 'shapeshift',
    title: 'ShapeShift — Modern Experience',
    description: 'A modern, responsive, and high-performance web application built with Next.js. ShapeShift delivers a clean user interface, smooth user experience, and scalable frontend architecture using modern web development practices. Focuses on responsiveness and a polished digital experience across all devices.',
    domain: 'shapeshift.dev',
    previewUrl: '/images/Web/shapeshift/1.jpg',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    metrics: '98/100 Performance Score',
    image: '/images/Web/shapeshift/1.jpg',
    githubUrl: 'https://github.com/Zynox-Tech/Shapeshift',
    gallery: [
      '/images/Web/shapeshift/2.jpg',
      '/images/Web/shapeshift/3.jpg',
      '/images/Web/shapeshift/4.jpg',
      '/images/Web/shapeshift/5.jpg'
    ]
  },
  {
    id: 'flavorcraft',
    title: 'FlavorCraft AI Recipes',
    description: 'A modern AI-powered recipe discovery platform built with Next.js that helps users discover creative recipes and cooking ideas based on ingredients, preferences, and food inspiration. FlavorCraft delivers a smooth and interactive cooking experience with a clean interface.',
    domain: 'flavorcraft.ai',
    previewUrl: '/images/Web/flavorcraft/1.jpg',
    tags: ['Next.js', 'AI Integration', 'React', 'Tailwind CSS'],
    metrics: 'AI Recipe Recommendation',
    image: '/images/Web/flavorcraft/1.jpg',
    githubUrl: 'https://github.com/Zynox-Tech/FlavourCraft',
    gallery: [
      '/images/Web/flavorcraft/2.jpg',
      '/images/Web/flavorcraft/3.jpg',
      '/images/Web/flavorcraft/4.jpg',
      '/images/Web/flavorcraft/5.jpg'
    ]
  },
  {
    id: 'knightstemplar',
    title: 'Knightstemplar Web App',
    description: 'A modern, responsive, and high-performance web application built with Next.js. Knightstemplar delivers a visually engaging user experience with a clean interface, optimized performance, and scalable frontend architecture. The project focuses on providing a fast and maintainable digital experience.',
    domain: 'knightstemplar.org',
    previewUrl: '/images/Web/knightstemplar/1.jpg',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Responsive design'],
    metrics: 'Optimized CDN Caching',
    image: '/images/Web/knightstemplar/1.jpg',
    githubUrl: 'https://github.com/Zynox-Tech/KnightsTemplar',
    gallery: [
      '/images/Web/knightstemplar/2.jpg',
      '/images/Web/knightstemplar/3.jpg',
      '/images/Web/knightstemplar/4.jpg',
      '/images/Web/knightstemplar/5.jpg'
    ]
  },
  {
    id: 'crowndial',
    title: 'Crowndial Diagnostics',
    description: 'A modern, responsive, and high-performance web application built with Next.js. Crowndial provides a clean digital experience with a focus on usability, performance, and scalable frontend architecture. Built using modern web technologies to deliver a fast and user-friendly experience across devices.',
    domain: 'crowndial.com',
    previewUrl: '/images/Web/crowndial/1.jpg',
    tags: ['Next.js', 'Healthcare UI', 'Tailwind CSS', 'Scheduling Engines'],
    metrics: '85% Automations Rate',
    image: '/images/Web/crowndial/1.jpg',
    githubUrl: 'https://github.com/Zynox-Tech/CrownDial',
    gallery: [
      '/images/Web/crowndial/2.jpg',
      '/images/Web/crowndial/3.jpg',
      '/images/Web/crowndial/4.jpg',
      '/images/Web/crowndial/5.jpg'
    ]
  },
  {
    id: 'lung-tumor-detector',
    title: 'Lung Tumor AI Detector',
    description: 'An advanced medical AI application for lung cancer detection using Deep Learning, ResNet50 CNN architecture, FastAPI backend, and React frontend. The system analyzes medical images using artificial intelligence to assist in lung cancer screening and provides confidence-based predictions.',
    domain: 'lung-detection.ai',
    previewUrl: '/images/Web/lung/lung 1.png',
    tags: ['ResNet50', 'Deep Learning', 'FastAPI', 'React', 'Medical Imaging'],
    metrics: '96.5% Inference Precision',
    image: '/images/Web/lung/lung 1.png',
    githubUrl: 'https://github.com/Zynox-Tech/LungTumorDetector',
    gallery: [
      '/images/Web/lung/lung 2.png',
      '/images/Web/lung/lung login.png'
    ]
  },
  {
    id: 'watchesbyfahad',
    title: 'WatchesByFahad Store',
    description: 'A modern eCommerce website built for selling premium watches in Pakistan. WatchesByFahad provides customers with a smooth online shopping experience including product browsing, variant selection, Cash on Delivery ordering, and order management through an admin dashboard.',
    domain: 'watchesbyfahad.pk',
    previewUrl: '/images/Web/watchesbyfahad/1.png',
    tags: ['Next.js', 'Tailwind CSS', 'eCommerce Storefront', 'Admin Dashboard'],
    metrics: 'Cash on Delivery Pipeline',
    image: '/images/Web/watchesbyfahad/1.png',
    githubUrl: 'https://github.com/Zynox-Tech/watchesbyfahad',
    gallery: [
      '/images/Web/watchesbyfahad/2.png',
      '/images/Web/watchesbyfahad/3.png',
      '/images/Web/watchesbyfahad/4.png'
    ]
  },
  {
    id: 'ecommerce-website',
    title: 'Modern eCommerce Storefront',
    description: 'A modern and responsive e-commerce website designed to provide a clean and user-friendly online shopping experience. Built using HTML, CSS, and JavaScript, the website includes product browsing, detailed product pages, shopping cart functionality, customer accounts, and responsive navigation.',
    domain: 'ecommerce-store.net',
    previewUrl: '/images/Web/E-Commerce Website/1.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'],
    metrics: 'Native JS Shopping Cart',
    image: '/images/Web/E-Commerce Website/1.png',
    githubUrl: 'https://github.com/Zynox-Tech/EcommerceWebsite',
    gallery: [
      '/images/Web/E-Commerce Website/2.png',
      '/images/Web/E-Commerce Website/3.png',
      '/images/Web/E-Commerce Website/4.png'
    ]
  }
];

export const MOBILE_PROJECTS: MobileProject[] = [
  {
    id: 'gdriving',
    title: 'GDrive',
    description: 'A cross-platform driving companion app delivering real-time route intelligence, vehicle diagnostics, and fleet-level trip analytics. Built for both iOS and Android with native performance and seamless OBD-II hardware integration.',
    previewUrl: '/demo/mobile-health',
    screens: [
      '/images/Mobile/GDriving/1.jpg',
      '/images/Mobile/GDriving/2.jpg',
      '/images/Mobile/GDriving/3.jpg',
      '/images/Mobile/GDriving/4.jpg',
      '/images/Mobile/GDriving/5.jpg',
      '/images/Mobile/GDriving/6.jpg',
      '/images/Mobile/GDriving/7.jpg',
      '/images/Mobile/GDriving/8.jpg',
      '/images/Mobile/GDriving/9.jpg'
    ],
    tags: ['Flutter', 'Dart', 'OBD-II', 'Firebase', 'Google Maps'],
    metrics: 'Live on App Store & Play Store',
    image: '/images/Mobile/GDriving/1.jpg',
    appStoreUrl: 'https://apps.apple.com/us/app/gdriving/id6738422766',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.firstideasolutions.gdriving'
  },
  {
    id: 'flaty-pk',
    title: 'Flaty.PK',
    description: 'A full-featured real estate platform connecting buyers, sellers, and renters across Pakistan. Delivers verified property listings, advanced geo-search filters, and in-app agent communication on both Android and the web.',
    previewUrl: '/demo/mobile-health',
    screens: [
      '/images/Mobile/Flaty/1.jpg',
      '/images/Mobile/Flaty/2.jpg',
      '/images/Mobile/Flaty/3.jpg',
      '/images/Mobile/Flaty/4.jpg',
      '/images/Mobile/Flaty/5.jpg',
      '/images/Mobile/Flaty/6.jpg'
    ],
    tags: ['Flutter', 'Firebase', 'Google Maps SDK', 'REST API'],
    metrics: 'Live on Play Store & Web',
    image: '/images/Mobile/Flaty/1.jpg',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.hifah.flatypk',
    webUrl: 'https://flaty.pk/'
  },
  {
    id: 'guided-by-culture',
    title: 'Guided By Culture',
    description: 'A mentorship platform bridging cultural communities through structured one-on-one guidance sessions, mentor matching algorithms, and milestone tracking. Designed to empower underrepresented professionals through culturally aware coaching.',
    previewUrl: '/demo/mobile-chat',
    screens: [
      '/images/Mobile/Testflight/1.jpg',
      '/images/Mobile/Testflight/2.jpg',
      '/images/Mobile/Testflight/3.jpg',
      '/images/Mobile/Testflight/4.jpg',
      '/images/Mobile/Testflight/5.jpg'
    ],
    tags: ['Flutter', 'Firebase', 'Mentor Matching', 'Push Notifications'],
    metrics: 'Beta on TestFlight',
    image: '/images/Mobile/Testflight/1.jpg',
    testFlightUrl: 'https://testflight.apple.com/join/ec8BrwXD'
  },
  {
    id: 'ripple',
    title: 'Ripple',
    description: 'A modern Flutter-based mobile application built with a focus on performance, clean design, and a smooth user experience.',
    previewUrl: '/demo/mobile-health',
    screens: [
      '/images/Mobile/Ripple/Screenshot_20260713_151207.jpg',
      '/images/Mobile/Ripple/Screenshot_20260713_151227.jpg',
      '/images/Mobile/Ripple/Screenshot_20260713_151229.jpg',
      '/images/Mobile/Ripple/Screenshot_20260713_151339.jpg',
      '/images/Mobile/Ripple/Screenshot_20260713_151347.jpg',
      '/images/Mobile/Ripple/Screenshot_20260713_151413.jpg',
      '/images/Mobile/Ripple/Screenshot_20260713_151419.jpg',
      '/images/Mobile/Ripple/Screenshot_20260713_151429.jpg',
      '/images/Mobile/Ripple/Screenshot_20260713_151436.jpg',
      '/images/Mobile/Ripple/Screenshot_20260713_151448.jpg'
    ],
    tags: ['Flutter', 'Dart', 'Mobile UI', 'Performance-First'],
    metrics: 'High Performance Core',
    image: '/images/Mobile/Ripple/Screenshot_20260713_151207.jpg',
    githubUrl: 'https://github.com/Zynox-Tech/Ripple'
  },
  {
    id: 'vehicle-inventory-app',
    title: 'Vehicle Inventory App',
    description: 'A modern Flutter and Firebase-based vehicle parts management application designed to digitize inventory operations, billing, customer management, and delivery tracking.',
    previewUrl: '/demo/mobile-health',
    screens: [
      '/images/Mobile/Vehicle_Inventory_App/V (1).jpg',
      '/images/Mobile/Vehicle_Inventory_App/V (2).jpg',
      '/images/Mobile/Vehicle_Inventory_App/V (3).jpg',
      '/images/Mobile/Vehicle_Inventory_App/V (4).jpg',
      '/images/Mobile/Vehicle_Inventory_App/V (5).jpg',
      '/images/Mobile/Vehicle_Inventory_App/V (6).jpg'
    ],
    tags: ['Flutter', 'Firebase', 'QR Billing', 'Delivery Tracking'],
    metrics: 'QR-Based Billing Engine',
    image: '/images/Mobile/Vehicle_Inventory_App/V (1).jpg',
    githubUrl: 'https://github.com/Zynox-Tech/Vehicle_Inventory_App'
  },
  {
    id: 'tracksitepro-manager',
    title: 'TrackSitePro',
    description: 'A professional mobile-based project management application designed for managing contractor operations, site activities, project tracking, and workflow management.',
    previewUrl: '/demo/mobile-chat',
    screens: [],
    tags: ['Flutter', 'Project Management', 'Workflow Tracker'],
    metrics: 'SNGPL Contractor Tool',
    image: '/images/projects/generic-mobile.png',
    githubUrl: 'https://github.com/Zynox-Tech/TrackSitePro-sngpl-contractor-project-manager'
  },
  {
    id: 'ielts-preparation-app',
    title: 'IELTS Preparation App',
    description: 'A comprehensive AI-powered IELTS preparation platform designed to help students improve their English language skills through interactive practice, intelligent assessment, and progress tracking.',
    previewUrl: '/demo/mobile-health',
    screens: [
      '/images/Mobile/Ielts/Screenshot_20260713_153629.jpg',
      '/images/Mobile/Ielts/Screenshot_20260713_153632.jpg',
      '/images/Mobile/Ielts/Screenshot_20260713_153636.jpg',
      '/images/Mobile/Ielts/Screenshot_20260713_153649.jpg',
      '/images/Mobile/Ielts/Screenshot_20260713_153720.jpg',
      '/images/Mobile/Ielts/Screenshot_20260713_153730.jpg',
      '/images/Mobile/Ielts/Screenshot_20260713_153739.jpg',
      '/images/Mobile/Ielts/Screenshot_20260713_153813.jpg'
    ],
    tags: ['Flutter', 'Dart', 'AI Assessment', 'IELTS Practice'],
    metrics: 'AI-Powered Assessments',
    image: '/images/Mobile/Ielts/Screenshot_20260713_153629.jpg',
    githubUrl: 'https://github.com/Zynox-Tech/Ielts-Prepration-App'
  },
  {
    id: 'astromatrix',
    title: 'Astromatrix',
    description: 'A rich astrology and horoscope application delivering daily personalised readings, birth chart generation, planetary transit alerts, and compatibility reports. Features beautifully crafted celestial UI and offline-capable chart calculations.',
    previewUrl: '/demo/mobile-health',
    screens: [
      '/images/Mobile/Astromatirx/Screenshot_20260711_154538_Google Play Store.jpg',
      '/images/Mobile/Astromatirx/Screenshot_20260711_154543_Google Play Store.jpg',
      '/images/Mobile/Astromatirx/Screenshot_20260711_154547_Google Play Store.jpg',
      '/images/Mobile/Astromatirx/Screenshot_20260711_154549_Google Play Store.jpg',
      '/images/Mobile/Astromatirx/Screenshot_20260711_154552_Google Play Store.jpg',
      '/images/Mobile/Astromatirx/Screenshot_20260711_154555_Google Play Store.jpg',
      '/images/Mobile/Astromatirx/Screenshot_20260711_154557_Google Play Store.jpg'
    ],
    tags: ['Flutter', 'Dart', 'Astronomy API', 'Firebase'],
    metrics: 'Live on Play Store',
    image: '/images/Mobile/Astromatirx/Screenshot_20260711_154538_Google Play Store.jpg',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=io.cordova.astromatrix'
  }
];

export const CUSTOM_SOFTWARE_PROJECTS: CustomSoftwareProject[] = [
  {
    id: 'restaurant-management',
    title: 'Restaurant Management System',
    description: 'A complete desktop application developed to automate restaurant workflows and simplify daily operations.',
    metric: 'Desktop App',
    metricLabel: 'Workflow automation',
    tags: ['PHP', 'MySQL', 'Desktop App', 'Billing Engine', 'Order Tracking'],
    details: 'Separate admin/staff logins, customer record auditing, and automated loyalty reward processing.',
    image: '/images/Custom Software/Restaurent management system/R (1).png',
    githubUrl: 'https://github.com/Zynox-Tech/Restaurant-management-system',
    gallery: [
      '/images/Custom Software/Restaurent management system/R (1).png',
      '/images/Custom Software/Restaurent management system/R (2).png',
      '/images/Custom Software/Restaurent management system/R (3).png',
      '/images/Custom Software/Restaurent management system/R (4).png'
    ],
    video: '/images/Custom Software/Restaurent management system/Restaurant managemnt system.mp4'
  },
  {
    id: 'inventory-management',
    title: 'Inventory Management System',
    description: 'A modern, dark-themed desktop application built using Python and Tkinter for robust product and billing tracking.',
    metric: 'Python Core',
    metricLabel: 'Modern tracking',
    tags: ['Python', 'Tkinter', 'SQLite', 'Dark Theme', 'Billing Engine'],
    details: 'Category structures, supplier coordination, dynamic stock updates, and invoice checkouts.',
    image: '/images/Custom Software/Inventory Managemnet System/I (1).png',
    githubUrl: 'https://github.com/Zynox-Tech/Inventory-Management-System',
    gallery: [
      '/images/Custom Software/Inventory Managemnet System/I (1).png',
      '/images/Custom Software/Inventory Managemnet System/I (2).png',
      '/images/Custom Software/Inventory Managemnet System/I (3).png',
      '/images/Custom Software/Inventory Managemnet System/I (4).png',
      '/images/Custom Software/Inventory Managemnet System/I (5).png',
      '/images/Custom Software/Inventory Managemnet System/I (6).png'
    ],
    video: '/images/Custom Software/Inventory Managemnet System/Inventory Managemnet System.mp4'
  },
  {
    id: 'lasthammer-expenditure',
    title: 'LastHammer Expense Auditor',
    description: 'A desktop expenditure management platform designed to track, categorize, and report company expenditures for Last Hammer.',
    metric: 'Financial Auditor',
    metricLabel: 'Expense tracker',
    tags: ['C#', 'SQL Server', 'Desktop Client', 'Expense Audits', 'Reporting'],
    details: 'High-performance ledger to record, categorise, and report operational company expenses.',
    image: '/images/Custom Software/Last Hammer/L (1).png',
    githubUrl: 'https://github.com/Zynox-Tech/LastHammer',
    gallery: [
      '/images/Custom Software/Last Hammer/L (1).png',
      '/images/Custom Software/Last Hammer/L (2).png',
      '/images/Custom Software/Last Hammer/L (3).png',
      '/images/Custom Software/Last Hammer/L (4).png',
      '/images/Custom Software/Last Hammer/L (5).png',
      '/images/Custom Software/Last Hammer/L (6).png'
    ]
  },
  {
    id: 'school-management',
    title: 'School Management System',
    description: 'An offline desktop management platform developed to manage secondary school administrative records.',
    metric: 'Offline SMS',
    metricLabel: 'School admin rights',
    tags: ['PHP', 'MySQL', 'Local Server', 'SMS Core', 'Offline Dashboard'],
    details: 'Streamlines student enrollment records, staff scheduling, and academic databases under local hosting environments.',
    image: '/images/Custom Software/School Management system/Screenshot 2026-07-11 153001.png',
    githubUrl: 'https://github.com/Zynox-Tech/school-management-system',
    gallery: [
      '/images/Custom Software/School Management system/Screenshot 2026-07-11 153001.png',
      '/images/Custom Software/School Management system/Screenshot 2026-07-11 153102.png'
    ],
    video: '/images/Custom Software/School Management system/School Managemnt System.mp4'
  },
  {
    id: 'crm-winforms',
    title: 'CRM Desktop Application',
    description: 'A Customer Relationship Management application built following a basic 3-Tier Architecture.',
    metric: '3-Tier C#',
    metricLabel: 'Relation management',
    tags: ['C#', 'Windows Forms', 'SQL Server', '3-Tier Arch', 'Lead Tracker'],
    details: 'Manages client contact registries, communications logs, and lead workflows securely.',
    image: '/images/Custom Software/crm/crm1.png',
    githubUrl: 'https://github.com/Zynox-Tech/CRM-WinForms-App',
    gallery: [
      '/images/Custom Software/crm/crm1.png',
      '/images/Custom Software/crm/crm2.png',
      '/images/Custom Software/crm/crm3.png',
      '/images/Custom Software/crm/crm4.png',
      '/images/Custom Software/crm/crm5.png',
      '/images/Custom Software/crm/crm6.png'
    ]
  }
];

