'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface MinecraftSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function MinecraftSearchBar({ onSearch, placeholder = "Search events..." }: MinecraftSearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative max-w-md mx-auto mb-6"
    >
      <div className="relative bg-stone-600 minecraft-border p-2">

        
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 bg-black bg-opacity-50 text-white minecraft-text text-xs placeholder-gray-400 minecraft-border focus:bg-opacity-70 transition-all duration-300"
        />
        
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-300 transition-colors text-sm minecraft-button bg-red-600 px-1"
          >
            ❌
          </motion.button>
        )}

        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -inset-1 bg-yellow-400 opacity-30 minecraft-shadow -z-10"
          />
        )}
      </div>

      {query && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 left-0 right-0 text-center"
        >
          <span className="minecraft-text text-xs text-green-400 flex items-center space-x-1">
            <img src="/assets/minecraft/cursors/diamond.png" alt="diamond" className="w-3 h-3 pixel-art" />
            <span>Mining events...</span>
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}