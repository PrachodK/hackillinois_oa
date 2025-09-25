'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useEvents } from '@/hooks/useEvents';
import MinecraftFilterBar from '@/components/MinecraftFilterBar';
import MinecraftScheduleGrid from '@/components/MinecraftScheduleGrid';
import MinecraftLoadingSpinner from '@/components/MinecraftLoadingSpinner';
import MinecraftSearchBar from '@/components/MinecraftSearchBar';
import MinecraftMap from '@/components/MinecraftMap';
import EventModal from '@/components/EventModal';
import { Event } from '@/types/event';

export default function MinecraftSchedulePage() {
  const { events, loading, error, filter, setFilter, setSearchQuery, refetch } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleMapEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-sky-300 via-green-300 to-green-500 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-8 h-8 minecraft-border opacity-20 ${
              i % 4 === 0 ? 'bg-stone-500' :
              i % 4 === 1 ? 'bg-amber-600' :
              i % 4 === 2 ? 'bg-green-500' : 'bg-blue-500'
            }`}
            animate={{
              y: [-20, -100, -20],
              x: [0, Math.sin(i) * 20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${(i * 13.7 + 15) % 100}%`,
              top: `${(i * 17.3 + 20) % 80}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 max-w-full" style={{height: 'calc(100vh - 32px)'}}>
          <main className="flex-1 px-4 py-4 flex flex-col">
            <motion.header
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-4 px-4 mb-6"
            >
              <div className="inline-block bg-amber-900 minecraft-border minecraft-shadow p-6 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="flex items-center justify-center space-x-3"
                >
                  <div className="w-10 h-10 bg-green-500 minecraft-border grass-block pixel-bob" />
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="minecraft-text text-3xl lg:text-4xl text-yellow-300 minecraft-text-shadow"
                  >
                    HackCraft 2025
                  </motion.h1>
                  <div className="w-10 h-10 bg-red-500 minecraft-border pixel-bob" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-3 minecraft-text text-white text-sm minecraft-text-shadow"
                >
                  Adventure Awaits in the World of Code
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="minecraft-text text-sm text-white minecraft-text-shadow max-w-2xl mx-auto leading-relaxed"
              >
                Explore workshops, feast at food stations, listen to legendary speakers, and join epic mini-events in this pixelated hackathon world!
              </motion.p>
            </motion.header>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-4 mb-4">
              <MinecraftSearchBar onSearch={setSearchQuery} />
              <MinecraftFilterBar currentFilter={filter} onFilterChange={setFilter} />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="bg-red-600 minecraft-border minecraft-shadow p-6 max-w-md mx-auto">
                  <div className="text-4xl mb-4 pixel-bob">💀</div>
                  <h3 className="minecraft-text text-lg text-white minecraft-text-shadow mb-2">
                    Connection Lost!
                  </h3>
                  <p className="minecraft-text text-xs text-red-200 mb-4 leading-relaxed">{error}</p>
                  <button
                    onClick={refetch}
                    className="minecraft-button bg-green-600 text-white minecraft-text text-xs px-4 py-2 hover:bg-green-500"
                  >
                    Respawn
                  </button>
                </div>
              </motion.div>
            )}

            {loading && <MinecraftLoadingSpinner />}

            {!loading && !error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 flex flex-col justify-center"
              >
                <MinecraftMap onEventClick={handleMapEventClick} events={events} />
              </motion.div>
            )}

          </main>

          {!loading && !error && (
            <div className="w-full lg:w-144 xl:w-160 px-4" style={{height: 'calc(100vh - 32px)'}}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="minecraft-border bg-stone-600 flex flex-col mt-8 mb-4"
                  style={{height: 'calc(100% - 32px)'}}
                >
                <div className="bg-amber-900 minecraft-border minecraft-text-shadow p-3 sticky top-0 z-10">
                  <div className="minecraft-text text-yellow-300 text-sm text-center flex items-center justify-center space-x-2">
                    <img src="/assets/minecraft/cursors/grassblock.png" alt="grassblock" className="w-4 h-4 pixel-art" />
                    <span>Event Schedule</span>
                  </div>
                  <div className="minecraft-text text-center text-xs text-green-400 mt-1">
                    {events.length} Events Available
                  </div>
                </div>

                <div className="overflow-y-auto minecraft-scroll p-4 flex-1">
                  <MinecraftScheduleGrid events={events} onEventClick={handleEventClick} />
                </div>
              </motion.div>
            </div>
          )}
        </div>

        <EventModal 
          event={selectedEvent} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      </div>
    </div>
  );
}
