import techwikiImg from '../assets/images/project_techwiki_1794630473761.jpg';
import realtimeMonitorImg from '../assets/images/project_realtime_monitor_1794630473696.jpg';
import rpaStudioImg from '../assets/images/project_rpa_studio_1794630473771.jpg';

export type ProjectFilterGroup = 'all' | 'engineering' | 'web' | 'desktop';

export type ProjectIconType =
  | 'wiki'
  | 'telemetry'
  | 'automation'
  | 'logistics'
  | 'restaurant'
  | 'education'
  | 'community'
  | 'location'
  | 'inventory';

export interface ProjectPricing {
  current: string;
  original: string;
  savings: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  filterGroup: Exclude<ProjectFilterGroup, 'all'>;
  technologies: string[];
  description: string;
  highlights?: string[];
  imageUrl?: string;
  imageAlt?: string;
  iconType: ProjectIconType;
  pricing?: ProjectPricing;
  popular?: boolean;
  demoUrl?: string;
  purchaseUrl?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'techwiki',
    index: '01',
    title: 'TechWiki',
    category: 'Web Application',
    filterGroup: 'engineering',
    technologies: ['React', 'Redux', 'Zustand', 'React Router'],
    description:
      'Developed a modern wiki-style application for managing technology articles with CRUD operations and state management.',
    highlights: [
      'Structured client-side routing across documentation views via React Router',
      'Full article create, read, update, and delete workflows',
      'Coordinated application state management using Redux and Zustand',
    ],
    imageUrl: techwikiImg,
    imageAlt: 'TechWiki dark-mode technical documentation web application interface',
    iconType: 'wiki',
  },
  {
    id: 'real-time-monitoring',
    index: '02',
    title: 'Real-Time Monitoring',
    category: 'Backend & Telemetry',
    filterGroup: 'engineering',
    technologies: ['ASP.NET Core Web API', 'SignalR', 'ADO.NET', 'Entity Framework Core'],
    description:
      'Developed a real-time monitoring system using SignalR and database operations.',
    highlights: [
      'Live bidirectional telemetry streaming powered by SignalR hubs',
      'RESTful backend endpoints engineered with ASP.NET Core Web API',
      'Relational data persistence and querying via ADO.NET and Entity Framework Core',
    ],
    imageUrl: realtimeMonitorImg,
    imageAlt: 'Real-Time Monitoring dark-mode SignalR telemetry dashboard interface',
    iconType: 'telemetry',
  },
  {
    id: 'rpa-studio',
    index: '03',
    title: 'RPA Studio – AI Automation',
    category: 'Windows Desktop',
    filterGroup: 'engineering',
    technologies: ['WPF', 'C#'],
    description:
      'Contributed to a Windows desktop application that enables users to create automation robots using different categories and activities.',
    highlights: [
      'Desktop workflow environment built with Windows Presentation Foundation (WPF)',
      'Modular activity and category architecture engineered in C#',
      'Supports designing and assembling structured automation robot sequences',
    ],
    imageUrl: rpaStudioImg,
    imageAlt: 'RPA Studio Windows WPF desktop automation workflow interface',
    iconType: 'automation',
  },
  {
    id: 'carrier-hub-desktop',
    index: '04',
    title: 'Carrier Hub v1.0.0',
    category: 'Desktop App',
    filterGroup: 'desktop',
    technologies: ['Desktop App', 'C# .NET'],
    description:
      'Desktop-based carrier and logistics management system built with C# .NET.',
    iconType: 'logistics',
    pricing: {
      current: '₹5000',
      original: '₹6000',
      savings: 'Save ₹1000',
    },
    demoUrl: 'https://www.youtube.com/embed/Vw6uBzYdBWA',
    purchaseUrl:
      'https://wa.me/917305550158?text=Hello!%20I%E2%80%99m%20interested%20in%20discussing%20your%20project%20Carrier%20Hub%20v1.0.0%20%E2%80%94%20a%20Paid%20Enterprise%20application%20built%20using%20Desktop%20App%2C%20C%23%20.NET.%20I%E2%80%99d%20like%20to%20know%20more%20about%20its%20features%2C%20pricing%2C%20and%20possible%20customization%20options.',
  },
  {
    id: 'book-rest-desktop',
    index: '05',
    title: 'Book Rest v1.0.0',
    category: 'Desktop App',
    filterGroup: 'desktop',
    technologies: ['Desktop App', 'C# .NET'],
    description:
      'Restaurant management desktop application for billing and order handling.',
    iconType: 'restaurant',
    pricing: {
      current: '₹5000',
      original: '₹6000',
      savings: 'Save ₹1000',
    },
    demoUrl: 'https://www.youtube.com/embed/Vw6uBzYdBWA',
    purchaseUrl:
      'https://wa.me/917305550158?text=Hello!%20I%E2%80%99m%20interested%20in%20discussing%20your%20project%20Book%20Rest%20v1.0.0%20%E2%80%94%20a%20Paid%20Retail%20application%20built%20using%20Desktop%20App%2C%20C%23%20.NET.%20I%E2%80%99d%20like%20to%20know%20more%20about%20its%20features%2C%20pricing%2C%20and%20possible%20customization%20options.',
  },
  {
    id: 'study-sync-desktop',
    index: '06',
    title: 'Study Sync v1.0.0',
    category: 'Desktop App',
    filterGroup: 'desktop',
    technologies: ['Desktop App', 'C# .NET'],
    description:
      'Education-focused desktop application for managing academic workflows.',
    iconType: 'education',
    pricing: {
      current: '₹5500',
      original: '₹6500',
      savings: 'Save ₹1000',
    },
    demoUrl: 'https://www.youtube.com/embed/rMluaaoksNk',
    purchaseUrl:
      'https://wa.me/917305550158?text=Hello!%20I%E2%80%99m%20interested%20in%20discussing%20your%20project%20Study%20Sync%20v1.0.0%20%E2%80%94%20a%20Paid%20Education%20application%20built%20using%20Desktop%20App%2C%20C%23%20.NET.%20I%E2%80%99d%20like%20to%20know%20more%20about%20its%20features%2C%20pricing%2C%20and%20possible%20customization%20options.',
  },
  {
    id: 'book-rest-web',
    index: '07',
    title: 'Book Rest v1.0.0 (Web)',
    category: 'Web App',
    filterGroup: 'web',
    technologies: ['Web App', 'ASP.NET MVC'],
    description:
      'Web-based restaurant management system developed using ASP.NET MVC.',
    iconType: 'restaurant',
    pricing: {
      current: '₹6000',
      original: '₹7000',
      savings: 'Save ₹1000',
    },
    demoUrl: 'https://www.youtube.com/embed/Mo8ag4RF6xQ',
    purchaseUrl:
      'https://wa.me/917305550158?text=Hello!%20I%E2%80%99m%20interested%20in%20discussing%20your%20project%20Book%20Rest%20v1.0.0%20(Web)%20%E2%80%94%20a%20Paid%20Retail%20application%20built%20using%20Web%20App%2C%20ASP.NET%20MVC.%20I%E2%80%99d%20like%20to%20know%20more%20about%20its%20features%2C%20pricing%2C%20and%20possible%20customization%20options.',
  },
  {
    id: 'carrier-hub-web',
    index: '08',
    title: 'Carrier Hub v1.0.0 (Web)',
    category: 'Web App',
    filterGroup: 'web',
    technologies: ['Web App', 'ASP.NET MVC'],
    description:
      'Web application for carrier and transport operations built on ASP.NET MVC.',
    iconType: 'logistics',
    pricing: {
      current: '₹6000',
      original: '₹7000',
      savings: 'Save ₹1000',
    },
    demoUrl: 'https://www.youtube.com/embed/B34tsh5bpzY',
    purchaseUrl:
      'https://wa.me/917305550158?text=Hello!%20I%E2%80%99m%20interested%20in%20discussing%20your%20project%20Carrier%20Hub%20v1.0.0%20(Web)%20%E2%80%94%20a%20Paid%20Enterprise%20application%20built%20using%20Web%20App%2C%20ASP.NET%20MVC.%20I%E2%80%99d%20like%20to%20know%20more%20about%20its%20features%2C%20pricing%2C%20and%20possible%20customization%20options.',
  },
  {
    id: 'shg-self-help-group',
    index: '09',
    title: 'SHG Self Help Group v1.0.0 (Web)',
    category: 'Web App',
    filterGroup: 'web',
    technologies: ['Web App', 'ASP.NET MVC'],
    description:
      'Application for SHG members to communicate and share resources.',
    iconType: 'community',
    popular: true,
    pricing: {
      current: '₹20000',
      original: '₹25000',
      savings: 'Save ₹5000',
    },
    demoUrl: 'https://www.youtube.com/embed/TnP9VokYzFo?si=BvzQRbdeVN2EhaT9',
    purchaseUrl:
      'https://wa.me/917305550158?text=Hello!%20I%E2%80%99m%20interested%20in%20discussing%20your%20project%20SHG%20Self%20Help%20Group%20v1.0.0%20(Web)%20%E2%80%94%20a%20Paid%20Enterprise%20application%20built%20using%20Web%20App%2C%20ASP.NET%20MVC.%20I%E2%80%99d%20like%20to%20know%20more%20about%20its%20features%2C%20pricing%2C%20and%20possible%20customization%20options.',
  },
  {
    id: 'near-my-way',
    index: '10',
    title: 'Near My Way v1.0.0 (Web)',
    category: 'Web App',
    filterGroup: 'web',
    technologies: ['Web App', 'ASP.NET MVC'],
    description:
      'Helps people communicate with others in nearby locations.',
    iconType: 'location',
    popular: true,
    pricing: {
      current: '₹20000',
      original: '₹25000',
      savings: 'Save ₹5000',
    },
    demoUrl: 'https://www.youtube.com/embed/B34tsh5bpzY',
    purchaseUrl:
      'https://wa.me/917305550158?text=Hello!%20I%E2%80%99m%20interested%20in%20discussing%20your%20project%20Near%20My%20Way%20v1.0.0%20(Web)%20%E2%80%94%20a%20Paid%20Enterprise%20application%20built%20using%20Web%20App%2C%20ASP.NET%20MVC.%20I%E2%80%99d%20like%20to%20know%20more%20about%20its%20features%2C%20pricing%2C%20and%20possible%20customization%20options.',
  },
  {
    id: 'inventory-billing-system',
    index: '11',
    title: 'Inventory Billing System v1.0.0 (Web)',
    category: 'Web App',
    filterGroup: 'web',
    technologies: ['Web App', 'ASP.NET MVC'],
    description:
      'Complete inventory and billing management system.',
    iconType: 'inventory',
    popular: true,
    pricing: {
      current: '₹25000',
      original: '₹30000',
      savings: 'Save ₹5000',
    },
    demoUrl: 'https://www.youtube.com/embed/B34tsh5bpzY',
    purchaseUrl:
      'https://wa.me/917305550158?text=Hello!%20I%E2%80%99m%20interested%20in%20discussing%20your%20project%20Inventory%20Billing%20System%20v1.0.0%20(Web)%20%E2%80%94%20a%20Paid%20Enterprise%20application%20built%20using%20Web%20App%2C%20ASP.NET%20MVC.%20I%E2%80%99d%20like%20to%20know%20more%20about%20its%20features%2C%20pricing%2C%20and%20possible%20customization%20options.',
  },
];
