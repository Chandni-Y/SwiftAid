import { Incident } from '../components/AuthorityMapInterface';

// Use a custom event to notify components within the same window
export const INCIDENTS_CHANGE_EVENT = 'incidentsChange';

export function getStoredIncidents(): Incident[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('swiftAidIncidents');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse incidents', e);
      return [];
    }
  }
  return [];
}

export function saveIncident(incident: Omit<Incident, 'id' | 'timeReported'>) {
  if (typeof window === 'undefined') return;
  
  const incidents = getStoredIncidents();
  
  const newIncident: Incident = {
    ...incident,
    id: `inc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timeReported: 'Just now', // Simple temporary label
  };
  
  const updatedIncidents = [...incidents, newIncident];
  localStorage.setItem('swiftAidIncidents', JSON.stringify(updatedIncidents));
  
  // Dispatch custom event for same-window updates
  window.dispatchEvent(new Event(INCIDENTS_CHANGE_EVENT));
}

export function initializeMockIncidents(initialIncidents: Incident[]) {
  if (typeof window === 'undefined') return;
  const stored = localStorage.getItem('swiftAidIncidents');
  if (!stored) {
    localStorage.setItem('swiftAidIncidents', JSON.stringify(initialIncidents));
  }
}
