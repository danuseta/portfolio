import {
  Profile,
  Education,
  Experience,
  Project,
  Organization,
  Certificate,
  Feedback
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const getApiUrl = (endpoint) => {
  if (!endpoint) {
    console.error('Endpoint tidak valid (null/undefined)');
    return `${API_URL}/api`;
  }
  
  const baseUrl = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  
  const fullUrl = `${baseUrl}${cleanEndpoint}`;
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`API URL: ${fullUrl} (endpoint: ${endpoint})`);
  }
  
  return fullUrl;
};

export async function getProfile(): Promise<Profile> {
  try {
    const res = await fetch(getApiUrl('api/profile'));
    if (!res.ok) throw new Error(`Failed to fetch profile: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    const res = await fetch(getApiUrl('api/education'));
    if (!res.ok) throw new Error(`Failed to fetch education: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error('Error fetching education:', error);
    throw error;
  }
}

export async function getExperience(): Promise<Experience[]> {
  try {
    const res = await fetch(getApiUrl('api/experience'));
    if (!res.ok) throw new Error(`Failed to fetch experience: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error('Error fetching experience:', error);
    throw error;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(getApiUrl('api/projects'));
    if (!res.ok) throw new Error(`Failed to fetch projects: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const res = await fetch(getApiUrl('api/projects?featured=true'));
    if (!res.ok) throw new Error(`Failed to fetch featured projects: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    throw error;
  }
}

export async function getOrganizations(): Promise<Organization[]> {
  try {
    const res = await fetch(getApiUrl('api/organizations'));
    if (!res.ok) throw new Error(`Failed to fetch organizations: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw error;
  }
}

export async function getFeaturedOrganizations(): Promise<Organization[]> {
  try {
    const res = await fetch(getApiUrl('api/organizations?featured=true'));
    if (!res.ok) throw new Error(`Failed to fetch featured organizations: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error('Error fetching featured organizations:', error);
    throw error;
  }
}

export async function getCertificates(): Promise<Certificate[]> {
  try {
    const res = await fetch(getApiUrl('api/certificates'));
    if (!res.ok) throw new Error(`Failed to fetch certificates: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error('Error fetching certificates:', error);
    throw error;
  }
}

export async function submitFeedback(feedbackData: Omit<Feedback, '_id'>): Promise<Feedback> {
  try {
    const url = getApiUrl('api/feedback');
    console.log('Submitting feedback to:', url);
    
    console.log('Feedback data:', {
      name: feedbackData.name,
      email: feedbackData.email,
      messageLength: feedbackData.message?.length || 0
    });
    
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: feedbackData.name,
        email: feedbackData.email,
        message: feedbackData.message
      }),
      credentials: 'include',
      mode: 'cors'
    });
    
    let responseData;
    let responseText = '';
    
    try {
      responseText = await res.text();
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      throw new Error('Invalid response format from server');
    }
    
    console.log('Response status:', res.status);
    
    if (!res.ok) {
      throw new Error(responseData?.message || `Failed to submit feedback: ${res.statusText || 'Unknown error'}`);
    }
    
    return responseData.feedback || responseData;
    
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
}