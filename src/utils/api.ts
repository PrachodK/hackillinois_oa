import { Event, ApiResponse } from '@/types/event';

const API_BASE_URL = 'https://adonix.hackillinois.org';

export async function fetchEvents(): Promise<Event[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/event/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    
    return data.events.sort((a, b) => a.startTime - b.startTime);
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
}

export function formatEventTime(startTime: number, endTime: number): string {
  const start = new Date(startTime * 1000);
  const end = new Date(endTime * 1000);
  
  const startStr = start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  const endStr = end.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${startStr} - ${endStr}`;
}

export function formatEventDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function groupEventsByDate(events: Event[]): Record<string, Event[]> {
  return events.reduce((groups, event) => {
    const date = formatEventDate(event.startTime);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, Event[]>);
}