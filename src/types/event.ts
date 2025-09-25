export interface Event {
  eventId: string;
  name: string;
  description: string;
  startTime: number;
  endTime: number;
  eventType: string;
  locations: Location[];
  sponsor?: string;
  points?: number;
  isAsync?: boolean;
}

export interface Location {
  description: string;
  tags: string[];
  latitude?: number;
  longitude?: number;
}

export interface ApiResponse {
  events: Event[];
}

export type EventFilter = 'all' | 'workshop' | 'meal' | 'speaker' | 'other';