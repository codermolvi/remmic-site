'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const RealEstateBackground: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: string; delay: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      delay: Math.random() * 5
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #C9A74D 1px, transparent 1px),
              linear-gradient(to bottom, #C9A74D 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'slideGrid 20s linear infinite'
          }}
        />
      </div>

      {/* Floating Building Silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-10">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`building-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${i * 12.5}%`,
              width: `${Math.random() * 30 + 20}px`,
              height: `${Math.random() * 120 + 60}px`,
              background: `linear-gradient(180deg, rgba(201, 167, 77, 0.${Math.floor(Math.random() * 3 + 2)}) 0%, rgba(201, 167, 77, 0.1) 100%)`
            }}
            initial={{ scaleY: 0 }}
            animate={{ 
              scaleY: [0, 1, 1],
              opacity: [0, 0.3, 0.1]
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 10,
              ease: 'easeOut'
            }}
            whileHover={{ opacity: 0.3 }}
          />
        ))}
      </div>

      {/* Floating Property Cards */}
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={`card-${i}`}
          className="absolute opacity-5"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + Math.sin(i) * 20}%`,
            width: '60px',
            height: '40px',
            border: '1px solid rgba(201, 167, 77, 0.3)',
            borderRadius: '4px',
            background: 'rgba(201, 167, 77, 0.05)'
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [-5, 5, -5],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5
          }}
        >
          <div className="absolute top-1 left-1 w-2 h-2 bg-premium-gold/20 rounded-full" />
          <div className="absolute bottom-1 right-1 w-full h-0.5 bg-premium-gold/10" />
        </motion.div>
      ))}

      {/* Blueprint Lines Animation */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <defs>
          <pattern id="blueprintPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100" height="100" fill="none" stroke="#C9A74D" strokeWidth="0.5" opacity="0.3" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#C9A74D" strokeWidth="0.25" opacity="0.2" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="#C9A74D" strokeWidth="0.25" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprintPattern)" />
        
        {/* Animated Connection Lines */}
        {Array.from({ length: 3 }, (_, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${20 + i * 30}%`}
            y1="20%"
            x2={`${30 + i * 25}%`}
            y2="80%"
            stroke="#C9A74D"
            strokeWidth="0.5"
            strokeDasharray="5 10"
            opacity="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear'
            }}
          />
        ))}
      </svg>

      {/* Floating Golden Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-premium-gold rounded-full"
            style={{
              left: particle.x,
              bottom: '-10px'
            }}
            animate={{
              y: [-10, -window.innerHeight - 50],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Architectural Compass Rose */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 opacity-5"
        animate={{ rotate: 360 }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#C9A74D" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#C9A74D" strokeWidth="0.25" />
          <line x1="50" y1="2" x2="50" y2="98" stroke="#C9A74D" strokeWidth="0.5" />
          <line x1="2" y1="50" x2="98" y2="50" stroke="#C9A74D" strokeWidth="0.5" />
          <line x1="15" y1="15" x2="85" y2="85" stroke="#C9A74D" strokeWidth="0.25" />
          <line x1="85" y1="15" x2="15" y2="85" stroke="#C9A74D" strokeWidth="0.25" />
          <text x="50" y="12" textAnchor="middle" fill="#C9A74D" fontSize="8" opacity="0.6">N</text>
        </svg>
      </motion.div>

      {/* Floor Plan Outline Animation */}
      <motion.div
        className="absolute bottom-20 left-20 opacity-5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1, 0], opacity: [0, 0.2, 0.2, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          times: [0, 0.2, 0.8, 1]
        }}
      >
        <svg width="150" height="100" viewBox="0 0 150 100">
          <rect x="10" y="10" width="130" height="80" fill="none" stroke="#C9A74D" strokeWidth="1" />
          <rect x="10" y="10" width="40" height="30" fill="none" stroke="#C9A74D" strokeWidth="0.5" />
          <rect x="50" y="10" width="40" height="30" fill="none" stroke="#C9A74D" strokeWidth="0.5" />
          <rect x="90" y="10" width="50" height="30" fill="none" stroke="#C9A74D" strokeWidth="0.5" />
          <rect x="10" y="40" width="60" height="50" fill="none" stroke="#C9A74D" strokeWidth="0.5" />
          <rect x="70" y="40" width="70" height="50" fill="none" stroke="#C9A74D" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-premium-charcoal/50 via-transparent to-premium-charcoal/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-premium-charcoal/20 via-transparent to-premium-charcoal/20" />

      <style jsx>{`
        @keyframes slideGrid {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </div>
  )
}

export default RealEstateBackground