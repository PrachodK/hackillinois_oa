'use client';

import { useState, useEffect } from 'react';
import { Event, EventFilter } from '@/types/event';
import { fetchEvents } from '@/utils/api';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<EventFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        const eventData = await fetchEvents();
        setEvents(eventData);
        setFilteredEvents(eventData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  useEffect(() => {
    let filtered = events;
    
    if (filter !== 'all') {
      filtered = events.filter(event => {
        const eventType = event.eventType.toLowerCase();
        switch (filter) {
          case 'workshop':
            return eventType.includes('workshop') || eventType.includes('tech talk');
          case 'meal':
            return eventType.includes('meal') || eventType.includes('food');
          case 'speaker':
            return eventType.includes('speaker') || eventType.includes('keynote');
          default:
            return !['workshop', 'meal', 'speaker'].some(type => 
              eventType.includes(type) || 
              (type === 'meal' && eventType.includes('food')) ||
              (type === 'speaker' && eventType.includes('keynote')) ||
              (type === 'workshop' && eventType.includes('tech talk'))
            );
        }
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.eventType.toLowerCase().includes(query) ||
        (event.sponsor && event.sponsor.toLowerCase().includes(query)) ||
        event.locations.some(location => 
          location.description.toLowerCase().includes(query)
        )
      );
    }

    setFilteredEvents(filtered);
  }, [events, filter, searchQuery]);

  return {
    events: filteredEvents,
    loading,
    error,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    refetch: () => {
      setLoading(true);
      fetchEvents().then(setEvents).catch(setError).finally(() => setLoading(false));
    }
  };
}