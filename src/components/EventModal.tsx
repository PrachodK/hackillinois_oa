'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Event } from '@/types/event';
import { formatEventTime, formatEventDate } from '@/utils/api';
import { useEffect } from 'react';

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventModal({ event, isOpen, onClose }: EventModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!event) return null;

  const getEventBlockType = (eventType: string) => {
    const type = eventType.toLowerCase();
    if (type.includes('workshop')) return { bg: '#d97706', texture: 'wood-block', icon: '⚒️' };
    if (type.includes('meal')) return { bg: '#22c55e', texture: 'grass-block', icon: '🍞' };
    if (type.includes('speaker')) return { bg: '#6b7280', texture: 'stone-block', icon: '💎' };
    if (type.includes('minievent')) return { bg: '#ef4444', texture: '', icon: '⚡' };
    return { bg: '#3b82f6', texture: 'water-block', icon: '🔷' };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 50
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <div
              style={{
                backgroundColor: '#44403c',
                maxWidth: '500px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                position: 'relative'
              }}
              className="minecraft-border minecraft-shadow"
              onClick={(e) => e.stopPropagation()}>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    backgroundColor: getEventBlockType(event.eventType).bg,
                    padding: '24px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  className={`${getEventBlockType(event.eventType).texture} minecraft-border`}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)'
                  }} />
                  <div style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '24px' }}>{getEventBlockType(event.eventType).icon}</span>
                        <span
                          style={{
                            color: 'white',
                            fontSize: '12px',
                            padding: '4px 8px',
                            backgroundColor: 'rgba(0, 0, 0, 0.3)'
                          }}
                          className="minecraft-text minecraft-text-shadow minecraft-border"
                        >
                          {event.eventType}
                        </span>
                      </div>

                      <button
                        onClick={onClose}
                        style={{
                          backgroundColor: '#dc2626',
                          color: 'white',
                          fontSize: '12px',
                          padding: '8px 12px'
                        }}
                        className="minecraft-button minecraft-text"
                      >
                        ✕
                      </button>
                    </div>

                    <h2
                      style={{
                        color: 'white',
                        fontSize: '14px',
                        lineHeight: '1.6'
                      }}
                      className="minecraft-text minecraft-text-shadow"
                    >
                      {event.name}
                    </h2>
                  </div>
                </div>
              </div>

              <div style={{
                padding: '24px',
                backgroundColor: '#57534e'
              }}>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div
                    style={{
                      backgroundColor: '#2563eb',
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                    className="minecraft-border minecraft-text-shadow"
                  >
                    <img src="/assets/minecraft/cursors/grassblock.png" alt="grassblock" className="w-5 h-5 pixel-art" />
                    <span
                      style={{ color: 'white', fontSize: '12px' }}
                      className="minecraft-text"
                    >
                      {formatEventDate(event.startTime)}
                    </span>
                  </div>

                  <div
                    style={{
                      backgroundColor: '#16a34a',
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                    className="minecraft-border minecraft-text-shadow"
                  >
                    <span style={{ fontSize: '18px' }}>🕐</span>
                    <span
                      style={{ color: 'white', fontSize: '12px' }}
                      className="minecraft-text"
                    >
                      {formatEventTime(event.startTime, event.endTime)}
                    </span>
                  </div>

                  {event.locations && event.locations.length > 0 && (
                    <div
                      style={{
                        backgroundColor: '#9333ea',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                      className="minecraft-border minecraft-text-shadow"
                    >
                      <span style={{ fontSize: '18px' }}>📍</span>
                      <span
                        style={{ color: 'white', fontSize: '12px' }}
                        className="minecraft-text"
                      >
                        {event.locations[0].description}
                      </span>
                    </div>
                  )}

                  {event.points && (
                    <div
                      style={{
                        backgroundColor: '#ca8a04',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                      className="minecraft-border minecraft-text-shadow"
                    >
                      <span style={{ fontSize: '18px' }}>💰</span>
                      <span
                        style={{ color: 'white', fontSize: '12px' }}
                        className="minecraft-text"
                      >
                        {event.points} points
                      </span>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    backgroundColor: '#78716c',
                    padding: '16px',
                    marginTop: '16px'
                  }}
                  className="minecraft-border"
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    <span style={{ fontSize: '18px' }}>📖</span>
                    <h3
                      style={{
                        color: 'white',
                        fontSize: '12px'
                      }}
                      className="minecraft-text minecraft-text-shadow"
                    >
                      DESCRIPTION
                    </h3>
                  </div>
                  <p
                    style={{
                      color: '#d1d5db',
                      fontSize: '12px',
                      lineHeight: '1.6'
                    }}
                    className="minecraft-text minecraft-text-shadow"
                  >
                    {event.description}
                  </p>
                </div>

                {event.locations && event.locations.length > 1 && (
                  <div
                    style={{
                      backgroundColor: '#78716c',
                      padding: '16px',
                      marginTop: '16px'
                    }}
                    className="minecraft-border"
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px'
                    }}>
                      <span style={{ fontSize: '18px' }}>🗺️</span>
                      <h3
                        style={{
                          color: 'white',
                          fontSize: '12px'
                        }}
                        className="minecraft-text minecraft-text-shadow"
                      >
                        ALL LOCATIONS
                      </h3>
                    </div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      {event.locations.map((location, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: '#9333ea',
                            padding: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                          className="minecraft-border"
                        >
                          <span style={{ fontSize: '14px' }}>📍</span>
                          <span
                            style={{
                              color: 'white',
                              fontSize: '12px'
                            }}
                            className="minecraft-text"
                          >
                            {location.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {event.sponsor && (
                  <div
                    style={{
                      backgroundColor: '#ec4899',
                      padding: '16px',
                      marginTop: '16px'
                    }}
                    className="minecraft-border"
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <span style={{ fontSize: '18px' }}>👥</span>
                      <h3
                        style={{
                          color: 'white',
                          fontSize: '12px'
                        }}
                        className="minecraft-text minecraft-text-shadow"
                      >
                        SPONSOR
                      </h3>
                    </div>
                    <span
                      style={{
                        color: 'white',
                        fontSize: '12px'
                      }}
                      className="minecraft-text minecraft-text-shadow"
                    >
                      {event.sponsor}
                    </span>
                  </div>
                )}

                {event.isAsync && (
                  <div
                    style={{
                      backgroundColor: '#16a34a',
                      padding: '16px',
                      marginTop: '16px'
                    }}
                    className="minecraft-border pixel-glow"
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <span style={{ fontSize: '18px' }}>🌐</span>
                      <span
                        style={{
                          color: 'white',
                          fontSize: '12px'
                        }}
                        className="minecraft-text minecraft-text-shadow"
                      >
                        ASYNC EVENT
                      </span>
                    </div>
                    <p
                      style={{
                        color: '#bbf7d0',
                        fontSize: '12px',
                        lineHeight: '1.6'
                      }}
                      className="minecraft-text minecraft-text-shadow"
                    >
                      Can be completed at your own pace
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}