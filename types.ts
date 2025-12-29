import React from 'react';

export interface NavItem {
  label: string;
  path: string;
  isMegaMenu?: boolean;
}

export interface BootcampCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  authorImage?: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  isFeatured?: boolean;
}