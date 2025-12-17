'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SimpleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    x: string; 
    y: string; 
    delay: string;
    size: string;
  }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      size: `${Math.random() * 3 + 1}px`
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Building Silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
        <div className="flex items-end justify-center h-full">
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={i}
              className="bg-premium-gold"
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 80 + 20}px`,
                marginRight: '2px'
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ 
                delay: i * 0.1,
                duration: 1,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Property Cards */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`card-${i}`}
          className="absolute w-16 h-10 bg-premium-gold/10 border border-premium-gold/30 rounded"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 60 + 20}%`
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [-2, 2, -2]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5
          }}
        />
      ))}

      {/* Blockchain Connection Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A74D" stopOpacity="0" />
            <stop offset="50%" stopColor="#C9A74D" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C9A74D" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 4 }, (_, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#goldGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: i * 0.5
            }}
          />
        ))}
      </svg>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-premium-gold rounded-full opacity-60"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
            delay: parseFloat(particle.delay)
          }}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-premium-charcoal/60 via-transparent to-premium-charcoal/20" />
    </div>
  )
}

export default SimpleBackground