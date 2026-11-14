export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  status: 'Current' | 'Completed';
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution?: string;
  period?: string;
  score: string;
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuer: string;
  period?: string;
  detail: string;
  type: 'Certification' | 'Achievement';
}

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  {
    id: 'msc-technology',
    company: 'MSC Technology',
    role: '.NET Developer',
    period: 'February 2026 – Present',
    status: 'Current',
  },
  {
    id: 'v2e-technologies',
    company: 'V2e Technologies',
    role: 'Software Developer',
    period: 'February 2024 – February 2, 2026',
    status: 'Completed',
  },
  {
    id: 'lcs-controls',
    company: 'LCS Controls Private Limited',
    role: 'Full Stack Developer',
    period: 'April 2023 – November 2023',
    location: 'Chennai',
    status: 'Completed',
  },
];

export const EDUCATION_ENTRIES: EducationEntry[] = [
  {
    id: 'mba-ai-ds',
    degree: 'Artificial Intelligence and Data Science',
    institution: 'SRM institute of Science and Technology',
    period: 'August 2024 – June 2026',
    score: 'CGPA: 9.51',
  },
  {
    id: 'bachelor-cse',
    degree: 'Bachelor of Computer Science Engineering',
    institution: 'Loyola Institute of Technology',
    period: 'August 2019 – June 2023',
    score: 'CGPA: 8.3',
  },
  {
    id: 'hsc-12',
    degree: '12th Standard',
    institution: 'Jai Gopal Garodia Matriculation Higher Secondary School',
    period: '2018 – 2019',
    score: '85%',
  },
  {
    id: 'sslc-10',
    degree: '10th Standard',
    institution: 'St. Moses Matriculation School',
    period: '2016 – 2017',
    score: '93%',
  },
];

export const CERTIFICATIONS_AND_ACHIEVEMENTS: CertificationEntry[] = [
  {
    id: 'csc-training',
    title: 'Training in C, C++, Python and Advanced Python',
    issuer: 'Computer Software College – CSC',
    period: 'May 2022 – November 2022',
    detail:
      'Structured foundational and advanced programming coursework covering procedural C, object-oriented C++, Python, and Advanced Python.',
    type: 'Certification',
  },
  {
    id: 'maths-wizard',
    title: 'Maths Wizard Competition',
    issuer: 'School Level Recognition',
    detail: 'Secured third place at the school level in the Maths Wizard Competition.',
    type: 'Achievement',
  },
];
