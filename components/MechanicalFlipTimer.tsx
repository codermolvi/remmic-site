'use client'

import React, { useState, useEffect } from 'react'

interface FlipDigitProps {
  current: number
  label: string
}

const MechanicalFlipTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const targetDate = new Date('2025-12-31T23:59:59').getTime()

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      }
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [])

  const FlipDigit: React.FC<FlipDigitProps> = ({ current, label }) => {
    const [displayValue, setDisplayValue] = useState(current)
    const [nextValue, setNextValue] = useState(current)
    const [isFlipping, setIsFlipping] = useState(false)

    useEffect(() => {
      if (current !== displayValue) {
        setNextValue(current)
        setIsFlipping(true)
        
        // After 400ms (when top card is fully flipped), update the display value
        setTimeout(() => {
          setDisplayValue(current)
        }, 400)
        
        // Reset flip state after animation completes
        setTimeout(() => {
          setIsFlipping(false)
        }, 800)
      }
    }, [current, displayValue])

    const currentStr = displayValue.toString().padStart(2, '0')
    const nextStr = nextValue.toString().padStart(2, '0')

    return (
      <div className="flex flex-col items-center space-y-3">
        <div className="relative w-16 h-24 md:w-20 md:h-28 lg:w-24 lg:h-32 perspective-1000">
          
          {/* Background shadow base */}
          <div className="absolute inset-0 bg-black/20 rounded-lg transform translate-y-1 translate-x-1"></div>
          
          {/* Main card container */}
          <div className="relative w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl border border-gray-600">
            
            {/* Center hinge line - very realistic */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-950 z-50 transform -translate-y-0.5 shadow-inner"></div>
            <div className="absolute top-1/2 left-2 right-2 h-px bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 z-50 transform -translate-y-0.5"></div>
            
            {/* Top half - static when not flipping */}
            <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden rounded-t-lg">
              <div className={`w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-700 via-gray-750 to-gray-800 text-[#C9A74D] font-mono text-xl md:text-2xl lg:text-3xl font-bold transition-all duration-200 ${isFlipping ? 'brightness-90' : 'brightness-100'}`}>
                <span className="relative drop-shadow-lg">
                  {currentStr}
                  {/* Realistic highlight on top */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none"></div>
                </span>
              </div>
            </div>

            {/* Bottom half - static */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden rounded-b-lg">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-800 via-gray-850 to-gray-900 text-[#C9A74D] font-mono text-xl md:text-2xl lg:text-3xl font-bold">
                <span className="relative transform -translate-y-full drop-shadow-lg">
                  {currentStr}
                  {/* Shadow effect on bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
                </span>
              </div>
            </div>

            {/* Flipping top card */}
            {isFlipping && (
              <div 
                className="absolute top-0 left-0 w-full h-1/2 overflow-hidden rounded-t-lg origin-bottom z-30"
                style={{
                  animation: 'realFlipTop 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              >
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-700 via-gray-750 to-gray-800 text-[#C9A74D] font-mono text-xl md:text-2xl lg:text-3xl font-bold">
                  <span className="relative drop-shadow-lg">
                    {currentStr}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none"></div>
                  </span>
                </div>
              </div>
            )}

            {/* New bottom card that flips up */}
            {isFlipping && (
              <div 
                className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden rounded-b-lg origin-top z-20"
                style={{
                  animation: 'realFlipBottom 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                  animationDelay: '0.4s',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              >
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-800 via-gray-850 to-gray-900 text-[#C9A74D] font-mono text-xl md:text-2xl lg:text-3xl font-bold">
                  <span className="relative transform -translate-y-full drop-shadow-lg">
                    {nextStr}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
                  </span>
                </div>
              </div>
            )}

            {/* Realistic shadow during flip */}
            {isFlipping && (
              <div 
                className="absolute inset-0 pointer-events-none z-40 rounded-lg"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 70%, transparent 100%)',
                  animation: 'shadowFlicker 0.8s ease-in-out'
                }}
              ></div>
            )}

          </div>
        </div>
        
        <span className="text-[#C9A74D] text-xs md:text-sm lg:text-base font-medium tracking-widest uppercase opacity-90">
          {label}
        </span>
      </div>
    )
  }

  return (
    <>
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes realFlipTop {
          0% { 
            transform: rotateX(0deg);
            filter: brightness(1);
            box-shadow: 0 0 0 rgba(0,0,0,0);
          }
          25% {
            filter: brightness(0.8);
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
          }
          50% { 
            transform: rotateX(-45deg);
            filter: brightness(0.6);
            box-shadow: 0 15px 30px rgba(0,0,0,0.5);
          }
          75% {
            transform: rotateX(-75deg);
            filter: brightness(0.4);
            box-shadow: 0 20px 40px rgba(0,0,0,0.6);
          }
          100% { 
            transform: rotateX(-90deg);
            filter: brightness(0.2);
            box-shadow: 0 25px 50px rgba(0,0,0,0.7);
          }
        }
        
        @keyframes realFlipBottom {
          0% { 
            transform: rotateX(90deg);
            filter: brightness(0.2);
            box-shadow: 0 -25px 50px rgba(0,0,0,0.7);
          }
          25% {
            transform: rotateX(75deg);
            filter: brightness(0.4);
            box-shadow: 0 -20px 40px rgba(0,0,0,0.6);
          }
          50% { 
            transform: rotateX(45deg);
            filter: brightness(0.6);
            box-shadow: 0 -15px 30px rgba(0,0,0,0.5);
          }
          75% {
            filter: brightness(0.8);
            box-shadow: 0 -10px 20px rgba(0,0,0,0.3);
          }
          100% { 
            transform: rotateX(0deg);
            filter: brightness(1);
            box-shadow: 0 0 0 rgba(0,0,0,0);
          }
        }
        
        @keyframes shadowFlicker {
          0%, 100% { opacity: 0; }
          25%, 75% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
      
      <div className="flex justify-center items-center space-x-6 md:space-x-8 lg:space-x-10">
        <FlipDigit current={timeLeft.days} label="days" />
        <div className="text-[#C9A74D] text-2xl md:text-3xl lg:text-4xl font-light opacity-70 animate-pulse">:</div>
        <FlipDigit current={timeLeft.hours} label="hours" />
        <div className="text-[#C9A74D] text-2xl md:text-3xl lg:text-4xl font-light opacity-70 animate-pulse">:</div>
        <FlipDigit current={timeLeft.minutes} label="minutes" />
        <div className="text-[#C9A74D] text-2xl md:text-3xl lg:text-4xl font-light opacity-70 animate-pulse">:</div>
        <FlipDigit current={timeLeft.seconds} label="seconds" />
      </div>
    </>
  )
}

export default MechanicalFlipTimer