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
  const res = await fetch(`${API_URL}api/profile`);
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

export async function getEducation(): Promise<Education[]> {
  const res = await fetch(`${API_URL}api/education`);
  if (!res.ok) throw new Error('Failed to fetch education');
  return res.json();
}

export async function getExperience(): Promise<Experience[]> {
  const res = await fetch(`${API_URL}api/experience`);
  if (!res.ok) throw new Error('Failed to fetch experience');
  return res.json();
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}api/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}api/projects?featured=true`);
  if (!res.ok) throw new Error('Failed to fetch featured projects');
  return res.json();
}

export async function getOrganizations(): Promise<Organization[]> {
  const res = await fetch(`${API_URL}api/organizations`);
  if (!res.ok) throw new Error('Failed to fetch organizations');
  return res.json();
}

export async function getFeaturedOrganizations(): Promise<Organization[]> {
  const res = await fetch(`${API_URL}api/organizations?featured=true`);
  if (!res.ok) throw new Error('Failed to fetch featured organizations');
  return res.json();
}

export async function getCertificates(): Promise<Certificate[]> {
  const res = await fetch(`${API_URL}api/certificates`);
  if (!res.ok) throw new Error('Failed to fetch certificates');
  return res.json();
}

export async function submitFeedback(feedbackData: Omit<Feedback, '_id'>): Promise<Feedback> {
  const res = await fetch(`${API_URL}api/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(feedbackData)
  });
  if (!res.ok) throw new Error('Failed to submit feedback');
  return res.json();
}
