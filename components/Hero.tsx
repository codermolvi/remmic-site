'use client'

import React, { Suspense, useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import ThreeDHeroText from './ThreeDHeroText'

const RealEstateBackground = () => <div className="absolute inset-0 bg-gradient-to-b from-gold-500/10 via-theme-forest/5 to-transparent" />;

const detectWebGL = (): boolean => {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!(gl && gl instanceof WebGLRenderingContext)
  } catch (e) {
    return false
  }
}

// Line Art Background Component
const LineArtBackground = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid Pattern */}
      <svg 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isHovered ? 0.15 : 0.1 }}
      >
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path 
              d="M 50 0 L 0 0 0 50" 
              fill="none" 
              stroke="#D4AF37" 
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Diagonal Lines */}
      <svg 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isHovered ? 0.1 : 0.05 }}
      >
        <defs>
          <pattern id="diagonal" width="100" height="100" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="100" y2="100" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
            <line x1="100" y1="0" x2="0" y2="100" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonal)" />
      </svg>

      {/* Hexagon Pattern */}
      <svg 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.05 }}
      >
        <defs>
          <pattern id="hexagon" width="60" height="52" patternUnits="userSpaceOnUse">
            <polygon 
              points="30,0 60,15 60,37 30,52 0,37 0,15"
              fill="none" 
              stroke="#D4AF37" 
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagon)" />
      </svg>

      {/* Animated Vertical Lines */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: isHovered ? [0.05, 0.1, 0.05] : 0.03
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent"
            style={{ left: `${i * 10}%` }}
            animate={{
              scaleY: isHovered ? [1, 0.8, 1] : [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 3,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Animated Horizontal Lines */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: isHovered ? [0.05, 0.1, 0.05] : 0.03
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"
            style={{ top: `${i * 10}%` }}
            animate={{
              scaleX: isHovered ? [1, 0.8, 1] : [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 3,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Corner Frames */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#D4AF37]/30" />
      <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-[#D4AF37]/30" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-[#D4AF37]/30" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#D4AF37]/30" />

      {/* Geometric Shapes */}
      <motion.svg
        className="absolute top-1/4 left-1/4 w-32 h-32"
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.05 }}
      >
        <rect 
          x="10" y="10" 
          width="112" height="112" 
          fill="none" 
          stroke="#D4AF37" 
          strokeWidth="1"
          transform="rotate(45 66 66)"
        />
      </motion.svg>

      <motion.svg
        className="absolute bottom-1/4 right-1/4 w-24 h-24"
        animate={{ rotate: isHovered ? -360 : 0 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.05 }}
      >
        <circle 
          cx="48" cy="48" r="40" 
          fill="none" 
          stroke="#D4AF37" 
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </motion.svg>

      {/* Floating Dots */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37]/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: isHovered ? [0.3, 0.6, 0.3] : [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}

const Hero: React.FC = () => {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [typedText, setTypedText] = useState('')
  
  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring animations for smooth movement
  const springConfig = { damping: 25, stiffness: 300 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)
  
  // Scale and transform values
  const scale = useSpring(1, springConfig)
  const translateY = useSpring(0, springConfig)
  const translateZ = useSpring(0, springConfig)

  useEffect(() => {
    setWebGLSupported(detectWebGL())
  }, [])

  useEffect(() => {
    const text = "Coming Soon"
    let index = 0
    setTypedText('')
    const timer = setInterval(() => {
      setTypedText(text.substring(0, index + 1))
      index++
      if (index > text.length) {
        clearInterval(timer)
      }
    }, 150)
    return () => clearInterval(timer)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isHovered) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const x = (e.clientX - rect.left) / width - 0.5
    const y = (e.clientY - rect.top) / height - 0.5
    
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    scale.set(1.01)
    translateY.set(-10)
    translateZ.set(25)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
    scale.set(1)
    translateY.set(0)
    translateZ.set(0)
  }

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative text-center mb-0 px-2 mt-20 sm:mt-24 md:mt-28 overflow-hidden"
      style={{
        perspective: 2000,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Line Art Background Layer */}
      <div className="absolute inset-0 -z-20">
        <LineArtBackground isHovered={isHovered} />
      </div>

      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          y: translateY,
          z: translateZ,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
        animate={{
          boxShadow: isHovered 
            ? '0 50px 100px -20px rgba(212, 175, 55, 0.3), 0 30px 60px -30px rgba(4, 16, 4, 0.3)'
            : '0 10px 30px -10px rgba(4, 16, 4, 0.15)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Background with 3D depth */}
        <motion.div
          className="absolute inset-0 -z-10 overflow-hidden rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{
            transform: 'translateZ(-50px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <RealEstateBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-[#041004]/5 to-transparent" />
          
          {/* Glass effect overlay on hover */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm"
            />
          )}
        </motion.div>

        {/* Main content */}
        <div className="relative p-2 md:p-3 rounded-2xl">
          {webGLSupported ? (
            <motion.div 
              className="relative w-full h-48 md:h-64 lg:h-80"
              animate={{
                z: isHovered ? 30 : 0,
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="animate-pulse text-[#E6E6FA]">Loading 3D Scene...</div>
                </div>
              }>
                <Canvas
                  camera={{ position: [0, 0, 5], fov: 45 }}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                >
                  <ambientLight intensity={isHovered ? 0.7 : 0.5} />
                  <pointLight position={[10, 10, 10]} intensity={isHovered ? 1.2 : 1} />
                  <ThreeDHeroText text="Premium Real Estate" position={[0, 1.0, 0]} color="#F8F9FA" fontSize={0.5} />
                  <ThreeDHeroText text="Reimagined for Tomorrow" position={[0, 0.0, 0]} color="#D4AF37" fontSize={0.28} isSubtext />
                  <ThreeDHeroText 
                    text="Coming Soon" 
                    position={[0, -1.2, 0]} 
                    color="#F8F9FA"
                    fontSize={0.15}
                    isSubtext
                    typing={true}
                    typingSpeed={150}
                  />
                </Canvas>
              </Suspense>
            </motion.div>
          ) : (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: isHovered ? 1.02 : 1,
                  z: isHovered ? 20 : 0
                }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gradient-gold mb-6 md:mb-8 tracking-wide leading-tight font-bold transform-gpu"
                style={{
                  transformStyle: 'preserve-3d',
                  textShadow: isHovered 
                    ? '0 20px 40px rgba(212, 175, 55, 0.4), 0 10px 20px rgba(4, 16, 4, 0.3)'
                    : '0 4px 6px rgba(4, 16, 4, 0.2)',
                }}
              >
                <span className="block leading-tight text-gradient-white text-5xl md:text-6xl lg:text-7xl font-luxury">Premium Real Estate</span>
                <span className="block mt-6 md:mt-8 lg:mt-10 text-gradient-gold text-2xl md:text-3xl lg:text-4xl leading-tight font-gretta">Reimagined for Tomorrow</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  z: isHovered ? 10 : 0
                }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-serif text-base md:text-lg lg:text-xl text-gradient-gold max-w-2xl mx-auto leading-relaxed mb-0 px-2 md:px-4 font-medium transform-gpu"
                style={{
                  transformStyle: 'preserve-3d',
                  textShadow: isHovered 
                    ? '0 10px 20px rgba(0, 0, 0, 0.2)'
                    : '0 2px 4px rgba(0, 0, 0, 0.05)',
                }}
              >
                {typedText}
              </motion.p>
            </>
          )}

        </div>

        {/* Floating orbs with enhanced 3D effect */}
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-[#D4AF37]/15 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: isHovered ? 1.2 : 1,
            z: isHovered ? 100 : 0,
          }}
          transition={{
            x: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 0.3 },
            z: { duration: 0.3 }
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        />
        
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#041004]/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: isHovered ? 1.3 : 1,
            z: isHovered ? 80 : 0,
          }}
          transition={{
            x: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 0.3 },
            z: { duration: 0.3 }
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        />

        {/* Glow effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
              transform: 'translateZ(60px)',
              transformStyle: 'preserve-3d',
            }}
          />
        )}
      </motion.div>
    </motion.section>
  )
}

export default Hero