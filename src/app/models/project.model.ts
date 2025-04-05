export interface Project {
    id: number;
    title: string;
    company: string;
    period: string;
    description: string;
    highlights: string[];
    technologies: string[];
    awards?: string[];
  }