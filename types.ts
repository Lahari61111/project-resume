
export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface Project {
  id: string;
  name: string;
  link: string;
  description: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  photo: string | null; // Base64 data URL
}

export enum ResumeStyle {
  MODERN = 'Modern',
  CLASSIC = 'Classic',
  MINIMALIST = 'Minimalist',
}

export enum AppStep {
  LANDING = 0,
  JOB_PURPOSE = 1,
  STYLE_SELECTION = 2,
  PERSONAL_INFO = 3,
  EXPERIENCE = 4,
  EDUCATION = 5,
  PROJECTS = 6,
  SKILLS = 7,
  PHOTO_UPLOAD = 8,
  PREVIEW_VERIFICATION = 9,
  DOWNLOAD = 10,
  THANK_YOU = 11,
}
