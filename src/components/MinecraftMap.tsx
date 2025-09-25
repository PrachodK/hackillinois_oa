'use client';

import { motion } from 'framer-motion';
import { Event } from '@/types/event';
import { useState, useMemo, useRef, useEffect } from 'react';
import { formatEventTime } from '@/utils/api';

interface MinecraftMapProps {
  onEventClick: (event: Event) => void;
  events: Event[];
}

export default function MinecraftMap({ onEventClick, events }: MinecraftMapProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isMining, setIsMining] = useState<'left' | 'right' | null>(null);
  const [miningParticles, setMiningParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const particleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const particleIdRef = useRef(0);

  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
      if (particleIntervalRef.current) {
        clearInterval(particleIntervalRef.current);
      }
    };
  }, []);

  const getEventBlockType = (eventType: string) => {
    const type = eventType.toLowerCase();
    if (type.includes('workshop')) return { bg: 'bg-amber-600', texture: 'wood-block', icon: '/assets/minecraft/cursors/enchanted_iron_sword.gif' };
    if (type.includes('meal')) return { bg: 'bg-green-500', texture: 'grass-block', icon: '/assets/minecraft/cursors/steak.png' };
    if (type.includes('speaker')) return { bg: 'bg-gray-500', texture: 'stone-block', icon: '/assets/minecraft/cursors/gap.png' };
    if (type.includes('minievent')) return { bg: 'bg-red-500', texture: '', icon: '/assets/minecraft/cursors/diamond.png' };
    return { bg: 'bg-blue-500', texture: 'water-block', icon: '/assets/minecraft/cursors/diamond.png' };
  };

  const startMining = (direction: 'left' | 'right') => {
    setIsMining(direction);

    const createParticles = () => {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: particleIdRef.current++,
        x: direction === 'left' ? 5 + Math.random() * 25 : 80 + Math.random() * 25,
        y: 45 + Math.random() * 35,
      }));
      setMiningParticles(prev => [...prev, ...newParticles]);

      setTimeout(() => {
        setMiningParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
      }, 1200);
    };

    createParticles();

    particleIntervalRef.current = setInterval(createParticles, 300);

    scrollIntervalRef.current = setInterval(() => {
      setScrollOffset(prev => {
        const newOffset = direction === 'left' ? prev + 2 : prev - 2;
        const maxOffset = Math.max(0, (events.length - 12) * 7);
        return Math.max(-maxOffset, Math.min(0, newOffset));
      });
    }, 50);
  };

  const stopMining = () => {
    setIsMining(null);
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    if (particleIntervalRef.current) {
      clearInterval(particleIntervalRef.current);
      particleIntervalRef.current = null;
    }
  };

  const sortedEvents = useMemo(() => {
    return events
      .sort((a, b) => a.startTime - b.startTime)
      .map((event, index) => ({
        ...event,
        x: 5 + (index * 7) + scrollOffset, 
        y: 55 + (Math.sin(index * 0.8) * 10), 
      }));
  }, [events, scrollOffset]);

  return (
    <div className="relative bg-gradient-to-b from-sky-300 to-green-300 border-4 border-amber-800 minecraft-border p-8 rounded-none h-96 overflow-hidden">
      <div
        className="absolute left-0 top-0 w-16 h-full z-20 flex items-center justify-center"
        style={{
          cursor: 'url(/assets/minecraft/cursors/pickaxe.png), pointer',
          background: isMining === 'left' ? 'rgba(139, 69, 19, 0.3)' : 'transparent',
        }}
        onMouseEnter={() => startMining('left')}
        onMouseLeave={() => stopMining()}
      >
        {isMining === 'left' && (
          <motion.div
            animate={{ rotate: [0, -15, 0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 0.2 }}
            className="w-12 h-12"
            style={{
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
              cursor: 'url(/assets/minecraft/cursors/pickaxe.png), pointer'
            }}
          >
            <img
              src="/assets/minecraft/cursors/pickaxe.png"
              alt="pickaxe"
              className="w-full h-full pixel-art"
            />
          </motion.div>
        )}
      </div>

      <div
        className="absolute right-0 top-0 w-16 h-full z-20 flex items-center justify-center"
        style={{
          cursor: 'url(/assets/minecraft/cursors/pickaxe.png), pointer',
          background: isMining === 'right' ? 'rgba(139, 69, 19, 0.3)' : 'transparent',
        }}
        onMouseEnter={() => startMining('right')}
        onMouseLeave={() => stopMining()}
      >
        {isMining === 'right' && (
          <motion.div
            animate={{ rotate: [0, 15, 0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 0.2 }}
            className="w-12 h-12"
            style={{
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
              cursor: 'url(/assets/minecraft/cursors/pickaxe.png), pointer'
            }}
          >
            <img
              src="/assets/minecraft/cursors/pickaxe.png"
              alt="pickaxe"
              className="w-full h-full pixel-art"
            />
          </motion.div>
        )}
      </div>

      {miningParticles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute text-xs z-10"
          style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: [1, 0.8, 0],
            scale: [1, 0.8, 0.3],
            y: [0, -30, -50],
            x: [0, (Math.random() - 0.5) * 40],
            rotate: [0, Math.random() * 360]
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {Math.random() > 0.5 ? '🟫' : '🔶'}
        </motion.div>
      ))}

      <div className="absolute top-2 left-20 bg-amber-900 text-white px-3 py-1 minecraft-border text-xs minecraft-text flex items-center space-x-1">
        <img src="/assets/minecraft/cursors/grassblock.png" alt="grassblock" className="w-3 h-3 pixel-art" />
        <span>Event Timeline</span>
      </div>

      <div className="absolute top-2 right-7 bg-black bg-opacity-70 text-green-400 px-3 py-1 text-xs minecraft-text flex items-center space-x-1">
        <span>Hover edges to mine!</span>
        <img src="/assets/minecraft/cursors/diamond.png" alt="diamond" className="w-3 h-3 pixel-art" />
      </div>

      {sortedEvents.map((event, index) => {
        const blockStyle = getEventBlockType(event.eventType);
        const isSelected = selectedEvent?.eventId === event.eventId;

        return (
          <motion.div
            key={event.eventId}
            className={`absolute cursor-pointer ${blockStyle.bg} minecraft-border minecraft-shadow`}
            style={{
              left: `${event.x}%`,
              top: `${event.y}%`,
              width: '28px',
              height: '28px',
            }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            animate={isSelected ? { scale: 1.3, zIndex: 15 } : {}}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setSelectedEvent(event);
              onEventClick(event);
            }}
          >
            <div className={`w-full h-full ${blockStyle.texture} minecraft-border opacity-80`} />

            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={blockStyle.icon}
                alt="event type"
                className="w-4 h-4 pixel-art"
              />
            </div>

            <motion.div
              className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs w-4 h-4 flex items-center justify-center minecraft-border font-bold"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: index * 0.1 }}
              style={{ fontSize: '8px' }}
            >
              {index + 1}
            </motion.div>

            {index < sortedEvents.length - 1 && (
              <div
                className="absolute bg-amber-700 opacity-50"
                style={{
                  left: '100%',
                  top: '50%',
                  width: `${sortedEvents[index + 1].x - event.x}%`,
                  height: '2px',
                  transform: 'translateY(-50%)',
                  zIndex: -1,
                }}
              />
            )}
          </motion.div>
        );
      })}

      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 bg-amber-900 text-white p-2 minecraft-border max-w-sm"
        >
          <div className="minecraft-text text-xs leading-tight">
            <div className="text-yellow-300 mb-1">
              {selectedEvent.name.length > 20
                ? selectedEvent.name.substring(0, 20) + '...'
                : selectedEvent.name}
            </div>
            <div className="text-green-400 mb-1">
              🕐 {formatEventTime(selectedEvent.startTime, selectedEvent.endTime)}
            </div>
            {selectedEvent.locations && selectedEvent.locations.length > 0 && (
              <div className="text-blue-300">
                📍 {selectedEvent.locations[0].description.length > 15
                    ? selectedEvent.locations[0].description.substring(0, 15) + '...'
                    : selectedEvent.locations[0].description}
              </div>
            )}
          </div>
        </motion.div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-800 to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-sky-200 to-transparent"></div>
      
      <motion.div 
        className="absolute top-4 bg-white rounded-full w-16 h-8 opacity-70"
        animate={{ x: [-50, 400] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-8 bg-white rounded-full w-12 h-6 opacity-50"
        animate={{ x: [-30, 400] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
      />
    </div>
  );
}