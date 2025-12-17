import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import RealisticFlipTimer from '@/components/RealisticFlipTimer'
import SubscribeForm from '@/components/SubscribeForm'
import Footer from '@/components/Footer'

interface CursorTrail {
  id: number
  x: number
  y: number
  opacity: number
}

const CursorTrailEffect: React.FC = () => {
  const [trails, setTrails] = useState<CursorTrail[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let trailId = 0

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      const newTrail: CursorTrail = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY,
        opacity: 1
      }

      setTrails(prev => [...prev.slice(-8), newTrail])
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => 
        prev.map(trail => ({
          ...trail,
          opacity: trail.opacity - 0.1
        })).filter(trail => trail.opacity > 0)
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="cursor-trail-effect fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="absolute"
          style={{
            left: trail.x - 6,
            top: trail.y - 6,
            width: 12,
            height: 12,
          }}
          initial={{ scale: 1, opacity: trail.opacity }}
          animate={{ 
            scale: 0.3,
            opacity: 0
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(212, 175, 55, ${trail.opacity * 0.7}) 0%, rgba(230, 230, 250, ${trail.opacity * 0.3}) 50%, transparent 100%)`,
              boxShadow: `0 0 ${8 * trail.opacity}px rgba(212, 175, 55, ${trail.opacity * 0.6})`
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

const PremiumParticles: React.FC = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${(i * 5) + 2.5}%`,
    delay: `${i * 0.7}s`
  }))

  return (
    <div className="premium-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            animationDelay: particle.delay
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Pattern Layer */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/pattern (1).svg')",
          backgroundSize: '300px 300px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          opacity: 0.05,
          filter: 'grayscale(80%) contrast(0.3)'
        }}
      />
      
      
      <CursorTrailEffect />
      <PremiumParticles />
      <Header />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col min-h-screen"
      >
        <main className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
          <Hero />
          
          <motion.div
            id="countdown"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-2 sm:mb-4"
          >
            <RealisticFlipTimer />
          </motion.div>
          
          
          <SubscribeForm />
        </main>
        
        <Footer />
      </motion.div>

      {/* Premium accent elements */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      
      <motion.div
        className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
      />

      {/* Corner accents - responsive */}
      <div className="fixed top-2 sm:top-4 left-2 sm:left-4 w-8 sm:w-12 h-8 sm:h-12 border-t-2 border-l-2 border-gold-500/40 rounded-tl-lg shadow-lg shadow-theme-lavender/10" />
      <div className="fixed top-2 sm:top-4 right-2 sm:right-4 w-8 sm:w-12 h-8 sm:h-12 border-t-2 border-r-2 border-gold-600/40 rounded-tr-lg shadow-lg shadow-theme-lavender/10" />
      <div className="fixed bottom-2 sm:bottom-4 left-2 sm:left-4 w-8 sm:w-12 h-8 sm:h-12 border-b-2 border-l-2 border-gold-700/40 rounded-bl-lg shadow-lg shadow-theme-forest/20" />
      <div className="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 w-8 sm:w-12 h-8 sm:h-12 border-b-2 border-r-2 border-gold-800/40 rounded-br-lg shadow-lg shadow-theme-forest/20" />
    </div>
  )
}