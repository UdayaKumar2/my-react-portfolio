import portrait3dImg from '../assets/images/udayakumar_3d_portrait_1794631182260.jpg';

export interface LanguageProficiency {
  language: string;
  proficiency: string;
}

export interface ProfileData {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  portraitUrl: string;
  headline: string;
  heroSubheadline: string;
  summary: string;
  experienceSpan: string;
  aboutPillars: {
    id: string;
    title: string;
    focus: string;
    detail: string;
    technologies: string[];
  }[];
  languages: LanguageProficiency[];
  interests: string[];
}

export const PROFILE_DATA: ProfileData = {
  name: 'Udayakumar P',
  role: 'Software Engineer | Full Stack Developer',
  location: 'Chennai, India',
  email: 'Udayakumarp.sw@gmail.com',
  phone: '+91 7305550158',
  linkedin: 'https://linkedin.com/in/udayakumar-p-80750928a',
  portraitUrl: portrait3dImg,
  headline: 'Engineering Scalable Applications. Building Intelligent Digital Solutions.',
  heroSubheadline:
    'Building scalable software systems through modern web technologies, backend engineering and intelligent automation.',
  summary:
    'Full Stack Software Developer with 2.6 years of professional experience specializing in React and ASP.NET development. Experienced in building web applications, REST APIs, Windows desktop applications, real-time monitoring systems and automation solutions.',
  experienceSpan: '2.6 Years',
  aboutPillars: [
    {
      id: 'frontend',
      title: 'Frontend Engineering',
      focus: 'Modern React & TypeScript Architectures',
      detail:
        'Crafting responsive, component-driven web interfaces with predictable state management using React.js, TypeScript, Redux, Zustand, and TanStack Query.',
      technologies: ['React.js', 'TypeScript', 'Redux', 'Zustand', 'Tailwind CSS'],
    },
    {
      id: 'backend',
      title: 'Backend APIs & Real-Time Systems',
      focus: 'ASP.NET Core & SignalR Services',
      detail:
        'Designing structured REST APIs, real-time telemetry channels, and business logic layers with ASP.NET Core, Web API, C#, and SignalR.',
      technologies: ['ASP.NET Core', 'Web API', 'C#', 'SignalR', 'REST APIs'],
    },
    {
      id: 'desktop',
      title: 'Desktop & Automation Software',
      focus: 'WPF & Windows Workflow Applications',
      detail:
        'Building rich Windows desktop software and visual automation tools utilizing WPF, Windows Forms, WCF, and MVVM architectural patterns.',
      technologies: ['WPF', 'Windows Forms', 'WCF', 'MVVM', 'Material Design'],
    },
    {
      id: 'database',
      title: 'Database & Deployment',
      focus: 'Relational Data & Hosting Infrastructure',
      detail:
        'Implementing reliable database schemas, stored procedures, and ORM integrations across SQL Server, MySQL, and SQLite with Azure DevOps and IIS deployment.',
      technologies: ['SQL Server', 'Entity Framework Core', 'ADO.NET', 'Azure DevOps', 'IIS'],
    },
  ],
  languages: [
    {
      language: 'English',
      proficiency: 'Native or bilingual proficiency',
    },
    {
      language: 'Tamil',
      proficiency: 'Native or bilingual proficiency',
    },
  ],
  interests: [
    'Innovative full-stack projects',
    'Emerging web technologies',
    'Software design and architecture',
  ],
};
