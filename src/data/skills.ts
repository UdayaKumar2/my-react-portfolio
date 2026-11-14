export type SkillCategoryId =
  | 'frontend'
  | 'backend'
  | 'desktop'
  | 'database'
  | 'architecture'
  | 'tools';

export interface SkillItem {
  name: string;
  role: string;
}

export interface SkillCategory {
  id: SkillCategoryId;
  label: string;
  domain: string;
  summary: string;
  items: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    domain: 'Client Interfaces & State',
    summary:
      'Type-safe React applications, predictable client state, asynchronous server caching, and utility-driven design systems.',
    items: [
      { name: 'React.js', role: 'Component UI Architecture' },
      { name: 'TypeScript', role: 'Static Type Safety' },
      { name: 'Redux', role: 'Predictable State Container' },
      { name: 'Zustand', role: 'Lightweight Store Management' },
      { name: 'TanStack Query', role: 'Async Data Synchronization' },
      { name: 'React Router', role: 'Client-Side Routing' },
      { name: 'Hooks', role: 'Reusable Stateful Logic' },
      { name: 'Tailwind CSS', role: 'Design Token Styling' },
      { name: 'Shadcn/UI', role: 'Accessible UI Primitives' },
      { name: 'Material UI', role: 'Enterprise Component Suite' },
      { name: 'Bootstrap', role: 'Responsive Grid Framework' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    domain: 'APIs & Application Logic',
    summary:
      'High-reliability .NET web services, RESTful endpoints, object-oriented domain modeling, and data access pipelines.',
    items: [
      { name: 'ASP.NET Core', role: 'Cross-Platform Web Runtime' },
      { name: 'Web API', role: 'HTTP Service Endpoints' },
      { name: 'ASP.NET MVC', role: 'Server-Rendered Web Apps' },
      { name: 'C#', role: 'Core Language Engineering' },
      { name: 'Advanced C#', role: 'Async, LINQ & Generics' },
      { name: 'ADO.NET', role: 'Direct Data Access Layer' },
      { name: 'Entity Framework Core', role: 'Object-Relational Mapping' },
      { name: 'REST APIs', role: 'Stateless Service Contracts' },
    ],
  },
  {
    id: 'desktop',
    label: 'Desktop',
    domain: 'Windows Client Engineering',
    summary:
      'Native Windows desktop software with structured data binding, service communication, and modern desktop theming.',
    items: [
      { name: 'WPF', role: 'XAML Desktop Interfaces' },
      { name: 'Windows Forms', role: 'Native Win32 Client Apps' },
      { name: 'Material Design', role: 'Desktop UI Styling' },
      { name: 'WCF', role: 'Service-Oriented Messaging' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    domain: 'Relational Persistence',
    summary:
      'Structured relational database design, query optimization, stored routines, and embedded local persistence.',
    items: [
      { name: 'Microsoft SQL Server', role: 'Enterprise RDBMS' },
      { name: 'MySQL', role: 'Relational Web Storage' },
      { name: 'SQLite', role: 'Embedded Local Database' },
      { name: 'Stored Procedures', role: 'Precompiled SQL Logic' },
      { name: 'Inline Queries', role: 'Parameterized SQL Execution' },
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture',
    domain: 'Software Design Patterns',
    summary:
      'Maintainable separation of concerns across web, desktop, and persistence layers.',
    items: [
      { name: 'MVC', role: 'Model-View-Controller' },
      { name: 'MVVM', role: 'Model-View-ViewModel' },
      { name: 'Repository Pattern', role: 'Abstracted Data Access' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    domain: 'Version Control & Delivery',
    summary:
      'Containerized workflows, source control, team DevOps pipelines, and production Windows/web hosting environments.',
    items: [
      { name: 'Docker', role: 'Containerized Environments' },
      { name: 'Git', role: 'Distributed Version Control' },
      { name: 'Azure DevOps', role: 'Repos & Delivery Pipelines' },
      { name: 'IIS', role: 'Windows Web Server Hosting' },
      { name: 'Plesk', role: 'Server & Domain Control' },
      { name: 'Hosting and Deployment', role: 'Production Release Ops' },
    ],
  },
];
