'use client';

import { motion } from 'framer-motion';

export default function MinecraftLoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
      <motion.div
        className="relative w-20 h-20"
        animate={{ rotateY: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full bg-amber-600 minecraft-border minecraft-shadow wood-block relative">
          <div className="absolute inset-1 border-2 border-white border-opacity-20" />
          <div className="absolute top-1 left-1 w-2 h-2 bg-white bg-opacity-40" />
          <div className="absolute bottom-1 right-1 w-2 h-2 bg-black bg-opacity-40" />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="minecraft-text text-white minecraft-text-shadow text-sm mb-2">
          Loading HackCraft Events...
        </div>
        
        <div className="w-64 h-4 bg-stone-700 minecraft-border relative overflow-hidden">
          <motion.div
            className="h-full bg-green-500 minecraft-border"
            animate={{ 
              width: ["0%", "100%"],
              background: ["#22c55e", "#65a30d", "#22c55e"]
            }}
            transition={{ 
              width: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              background: { duration: 1, repeat: Infinity }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
        </div>
        
        <div className="mt-4 flex space-x-2 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 minecraft-border"
              animate={{ 
                backgroundColor: ["#7f7f7f", "#a3a3a3", "#7f7f7f"],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-stone-400 minecraft-border opacity-60"
            animate={{
              y: [0, -100, 0],
              x: [0, (i * 15 - 30), 0],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="minecraft-text text-xs text-gray-400"
      >
        *mining sounds*
      </motion.div>
    </div>
  );
}