interface SocialLink {
  _id?: string;
  platform: string;
  url: string;
  isActive: boolean;
}

interface ImageData {
  url: string;
  publicId: string;
}

export interface Profile {
  _id: string;
  fullName: string;
  role: string;
  location: string;
  email: string;
  phone?: string;
  shortBio: string;
  cvLink?: string;
  socialLinks: SocialLink[];
  heroImage1?: ImageData;
  heroImage2?: ImageData;
  aboutImage?: ImageData;
}

export interface Education {
  _id: string;
  school: string;
  degree: string;
  year: string;
  description: string;
  location: string;
}

export interface Experience {
  _id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  period: string;
  image: {
    url: string;
    publicId: string;
  };
  technologies: string[];
  link?: string;
  github?: string;
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Organization {
  _id: string;
  name: string;
  role: string;
  period: string;
  city: string;
  highlights: string[];
  link?: string;
  featured: boolean;
}

export interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  certificateFile: {
    url: string;
    publicId: string;
  };
  featured: boolean;
  createdAt: Date;
}

export interface Feedback {
  _id?: string;
  name: string;
  email: string;
  message: string;
  status?: 'pending' | 'responded';
  replies?: Array<{
    message: string;
    sentAt: Date;
  }>;
  createdAt?: Date;
}
