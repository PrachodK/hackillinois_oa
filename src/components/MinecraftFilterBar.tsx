'use client';

import { motion } from 'framer-motion';
import { EventFilter } from '@/types/event';

interface MinecraftFilterBarProps {
  currentFilter: EventFilter;
  onFilterChange: (filter: EventFilter) => void;
}

const minecraftFilters = [
  { id: 'all' as EventFilter, label: 'All Blocks', icon: '/assets/minecraft/cursors/grassblock.png', color: 'bg-gray-400' },
  { id: 'workshop' as EventFilter, label: 'Workshop Blocks', icon: '/assets/minecraft/cursors/enchanted_iron_sword.gif', color: 'bg-amber-600' },
  { id: 'meal' as EventFilter, label: 'Food Blocks', icon: '/assets/minecraft/cursors/steak.png', color: 'bg-green-500' },
  { id: 'speaker' as EventFilter, label: 'Speaker Blocks', icon: '/assets/minecraft/cursors/gap.png', color: 'bg-gray-500' },
  { id: 'other' as EventFilter, label: 'Other Blocks', icon: '/assets/minecraft/cursors/diamond.png', color: 'bg-red-500' },
];

export default function MinecraftFilterBar({ currentFilter, onFilterChange }: MinecraftFilterBarProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-amber-900 minecraft-border p-2 minecraft-shadow"
      >
        <div className="flex justify-center items-center gap-2">
          {minecraftFilters.map((filter, index) => {
            const isActive = currentFilter === filter.id;
            
            return (
              <motion.button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`relative minecraft-button minecraft-text px-3 py-2 transition-all duration-200 ${
                  isActive
                    ? `${filter.color} text-white minecraft-text-shadow scale-110`
                    : 'bg-stone-600 text-gray-300 hover:bg-stone-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4">
                    <img
                      src={filter.icon}
                      alt={filter.label}
                      className="w-full h-full pixel-art"
                    />
                  </div>
                  <div className="text-center leading-none" style={{fontSize: '10px'}}>
                    {filter.id === 'all' ? 'All' :
                     filter.id === 'workshop' ? 'Work' :
                     filter.id === 'meal' ? 'Food' :
                     filter.id === 'speaker' ? 'Talk' : 'Other'}
                  </div>
                </div>
                
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-yellow-400 opacity-20 minecraft-border"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}

                {isActive && (
                  <div className="absolute inset-0 opacity-20">
                    <div className={`w-full h-full ${
                      filter.id === 'workshop' ? 'wood-block' :
                      filter.id === 'meal' ? 'grass-block' :
                      filter.id === 'speaker' ? 'stone-block' :
                      ''
                    }`} />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

      </motion.div>
    </div>
  );
}
