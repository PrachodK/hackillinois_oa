'use client';

import { motion } from 'framer-motion';
import { Event } from '@/types/event';
import { formatEventTime } from '@/utils/api';

interface MinecraftEventCardProps {
  event: Event;
  index: number;
  onEventClick?: (event: Event) => void;
}

export default function MinecraftEventCard({ event, index, onEventClick }: MinecraftEventCardProps) {
  const getEventBlockType = (eventType: string) => {
    const type = eventType.toLowerCase();
    if (type.includes('workshop')) return { bg: 'bg-amber-600', texture: 'wood-block', icon: '⚒️' };
    if (type.includes('meal')) return { bg: 'bg-green-500', texture: 'grass-block', icon: '🍞' };
    if (type.includes('speaker')) return { bg: 'bg-gray-500', texture: 'stone-block', icon: '💎' };
    if (type.includes('minievent')) return { bg: 'bg-red-500', texture: '', icon: '⚡' };
    return { bg: 'bg-blue-500', texture: 'water-block', icon: '🔷' };
  };

  const blockStyle = getEventBlockType(event.eventType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 20px rgba(255,255,0,0.5)",
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onEventClick?.(event)}
      className="cursor-pointer group"
    >
      <div className={`${blockStyle.bg} minecraft-border minecraft-shadow p-4 h-full relative overflow-hidden`}>
        <div className={`absolute inset-0 ${blockStyle.texture} opacity-30`} />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-2">
              <div className="text-lg">{blockStyle.icon}</div>
              <span className="minecraft-text text-xs text-white minecraft-text-shadow bg-black bg-opacity-50 px-2 py-1">
                {event.eventType}
              </span>
            </div>
            
            {event.points && event.points > 0 && (
              <motion.div 
                className="bg-yellow-400 text-black px-2 py-1 minecraft-border text-xs minecraft-text pixel-glow flex items-center space-x-1"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <span>💰</span>
                <span>{event.points}</span>
              </motion.div>
            )}
          </div>

          <h3 className="minecraft-text text-sm text-white minecraft-text-shadow mb-3 leading-relaxed group-hover:text-yellow-300 transition-colors">
            {event.name}
          </h3>

          <div className="space-y-2 mb-3">
            <div className="flex items-center space-x-2 text-white minecraft-text-shadow">
              <span className="text-xs">🕐</span>
              <span className="minecraft-text text-xs">
                {formatEventTime(event.startTime, event.endTime)}
              </span>
            </div>

            {event.locations && event.locations.length > 0 && (
              <div className="flex items-center space-x-2 text-white minecraft-text-shadow">
                <span className="text-xs">📍</span>
                <span className="minecraft-text text-xs">
                  {event.locations[0].description}
                </span>
              </div>
            )}
          </div>

          <p className="minecraft-text text-xs text-gray-200 minecraft-text-shadow leading-relaxed line-clamp-3">
            {event.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {event.sponsor && (
              <div className="bg-purple-600 text-white px-2 py-1 minecraft-border text-xs minecraft-text">
                👥 {event.sponsor}
              </div>
            )}

            {event.isAsync && (
              <div className="bg-green-600 text-white px-2 py-1 minecraft-border text-xs minecraft-text pixel-bob">
                🌐 ASYNC
              </div>
            )}
          </div>
        </div>

        <div className="absolute inset-0 bg-yellow-400 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 pointer-events-none" />
        
        <div className="absolute top-1 right-1 w-3 h-3 bg-white bg-opacity-20 minecraft-border" />
        <div className="absolute bottom-1 left-1 w-3 h-3 bg-black bg-opacity-20 minecraft-border" />
      </div>
    </motion.div>
  );
}