import {
  Profile,
  Education,
  Experience,
  Project,
  Organization,
  Certificate,
  Feedback
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProfile(): Promise<Profile> {
  const res = await fetch(`${API_URL}/profile`);
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

export async function getEducation(): Promise<Education[]> {
  const res = await fetch(`${API_URL}/education`);
  if (!res.ok) throw new Error('Failed to fetch education');
  return res.json();
}

export async function getExperience(): Promise<Experience[]> {
  const res = await fetch(`${API_URL}/experience`);
  if (!res.ok) throw new Error('Failed to fetch experience');
  return res.json();
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects?featured=true`);
  if (!res.ok) throw new Error('Failed to fetch featured projects');
  return res.json();
}

export async function getOrganizations(): Promise<Organization[]> {
  const res = await fetch(`${API_URL}/organizations`);
  if (!res.ok) throw new Error('Failed to fetch organizations');
  return res.json();
}

export async function getFeaturedOrganizations(): Promise<Organization[]> {
  const res = await fetch(`${API_URL}/organizations?featured=true`);
  if (!res.ok) throw new Error('Failed to fetch featured organizations');
  return res.json();
}

export async function getCertificates(): Promise<Certificate[]> {
  const res = await fetch(`${API_URL}/certificates`);
  if (!res.ok) throw new Error('Failed to fetch certificates');
  return res.json();
}

export async function submitFeedback(feedbackData: Omit<Feedback, '_id'>): Promise<Feedback> {
  const res = await fetch(`${API_URL}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(feedbackData)
  });
  if (!res.ok) throw new Error('Failed to submit feedback');
  return res.json();
}
