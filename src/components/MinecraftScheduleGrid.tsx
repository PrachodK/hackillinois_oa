'use client';

import { motion } from 'framer-motion';
import { Event } from '@/types/event';
import { groupEventsByDate } from '@/utils/api';
import MinecraftEventCard from './MinecraftEventCard';

interface MinecraftScheduleGridProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
}

export default function MinecraftScheduleGrid({ events, onEventClick }: MinecraftScheduleGridProps) {
  const groupedEvents = groupEventsByDate(events);
  const dates = Object.keys(groupedEvents);

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-stone-600 minecraft-border minecraft-shadow p-8 max-w-md mx-auto"
        >
          <div className="mb-4 pixel-bob flex justify-center">
            <img src="/assets/minecraft/cursors/diamond.png" alt="diamond" className="w-16 h-16 pixel-art" />
          </div>
          <h3 className="minecraft-text text-lg text-white minecraft-text-shadow mb-4">
            No Blocks Found
          </h3>
          <p className="minecraft-text text-xs text-gray-300 leading-relaxed">
            Try crafting different filters to discover more events in the world!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {dates.map((date, dateIndex) => (
        <motion.div
          key={date}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: dateIndex * 0.2 }}
          className="space-y-6"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: dateIndex * 0.1 }}
              className="inline-block bg-amber-900 minecraft-border minecraft-shadow p-4 mb-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-yellow-400 minecraft-border flex items-center justify-center pixel-glow">
                  <img src="/assets/minecraft/cursors/grassblock.png" alt="grassblock" className="w-5 h-5 pixel-art" />
                </div>
                <h2 className="minecraft-text text-2xl text-yellow-300 minecraft-text-shadow">
                  {date}
                </h2>
                <div className="w-8 h-8 bg-yellow-400 minecraft-border flex items-center justify-center pixel-glow">
                  <img src="/assets/minecraft/cursors/grassblock.png" alt="grassblock" className="w-5 h-5 pixel-art" />
                </div>
              </div>
              
              <div className="mt-2 flex justify-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-4 h-2 bg-yellow-600 minecraft-border" />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="text-center mb-4">
            <div className="inline-flex items-center space-x-2 bg-green-600 minecraft-border px-4 py-2">
              <span className="minecraft-text text-xs text-white flex items-center space-x-1">
                <img src="/assets/minecraft/cursors/diamond.png" alt="diamond" className="w-3 h-3 pixel-art" />
                <span>{groupedEvents[date].length} Events Available</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {groupedEvents[date].map((event, eventIndex) => (
              <MinecraftEventCard
                key={event.eventId}
                event={event}
                index={eventIndex}
                onEventClick={onEventClick}
              />
            ))}
          </div>

          {dateIndex < dates.length - 1 && (
            <div className="flex justify-center items-center space-x-2 py-8">
              {Array.from({ length: 7 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 bg-stone-500 minecraft-border"
                  animate={{ 
                    backgroundColor: ["#7f7f7f", "#a3a3a3", "#7f7f7f"],
                    y: [0, -4, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}