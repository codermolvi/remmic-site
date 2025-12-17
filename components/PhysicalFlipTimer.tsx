'use client'

import React, { useState, useEffect, useRef } from 'react'

interface FlipDigitProps {
  value: number
  label: string
}

interface FlipState {
  topHalf: number
  bottomHalf: number
  nextValue: number
  isFlipping: boolean
}

const PhysicalFlipTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Flip states for each digit
  const [flipStates, setFlipStates] = useState<{[key: string]: FlipState}>({
    days: { topHalf: 0, bottomHalf: 0, nextValue: 0, isFlipping: false },
    hours: { topHalf: 0, bottomHalf: 0, nextValue: 0, isFlipping: false },
    minutes: { topHalf: 0, bottomHalf: 0, nextValue: 0, isFlipping: false },
    seconds: { topHalf: 0, bottomHalf: 0, nextValue: 0, isFlipping: false }
  })

  const targetDate = new Date('2025-12-31T23:59:59').getTime()

  // Initialize the timer immediately
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        return { days, hours, minutes, seconds }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const initialTime = calculateTime()
    setTimeLeft(initialTime)
    
    // Initialize flip states with current values
    setFlipStates({
      days: { topHalf: initialTime.days, bottomHalf: initialTime.days, nextValue: initialTime.days, isFlipping: false },
      hours: { topHalf: initialTime.hours, bottomHalf: initialTime.hours, nextValue: initialTime.hours, isFlipping: false },
      minutes: { topHalf: initialTime.minutes, bottomHalf: initialTime.minutes, nextValue: initialTime.minutes, isFlipping: false },
      seconds: { topHalf: initialTime.seconds, bottomHalf: initialTime.seconds, nextValue: initialTime.seconds, isFlipping: false }
    })
  }, [])

  const updateFlipState = (key: string, newValue: number) => {
    setFlipStates(prev => {
      const current = prev[key]
      if (current.topHalf !== newValue && !current.isFlipping) {
        return {
          ...prev,
          [key]: {
            topHalf: current.topHalf,
            bottomHalf: current.topHalf,
            nextValue: newValue,
            isFlipping: true
          }
        }
      }
      return prev
    })

    // Complete the flip after animation
    setTimeout(() => {
      setFlipStates(prev => ({
        ...prev,
        [key]: {
          topHalf: newValue,
          bottomHalf: newValue,
          nextValue: newValue,
          isFlipping: false
        }
      }))
    }, 600)
  }

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        return { days, hours, minutes, seconds }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const timer = setInterval(() => {
      const newTime = calculateTime()
      
      setTimeLeft(prevTime => {
        // Check each value and trigger flip if changed
        Object.keys(newTime).forEach(key => {
          const newValue = newTime[key as keyof typeof newTime]
          const prevValue = prevTime[key as keyof typeof prevTime]
          if (prevValue !== newValue) {
            updateFlipState(key, newValue)
          }
        })

        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const FlipDigit: React.FC<FlipDigitProps> = ({ value, label }) => {
    const flipState = flipStates[label]
    const displayValue = value.toString().padStart(2, '0')
    const topValue = flipState.topHalf.toString().padStart(2, '0')
    const bottomValue = flipState.bottomHalf.toString().padStart(2, '0')
    const nextValue = flipState.nextValue.toString().padStart(2, '0')

    return (
      <div className="flex flex-col items-center space-y-2">
        <div className="relative w-20 h-28 md:w-24 md:h-32 lg:w-28 lg:h-36">
          {/* Static background */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl border border-gray-700"></div>
          
          {/* Top static half */}
          <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden rounded-t-lg">
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-gray-700 to-gray-800 text-[#C9A74D] font-mono text-2xl md:text-3xl lg:text-4xl font-bold border-b border-gray-600">
              <span className="relative">
                {topValue}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-10"></div>
              </span>
            </div>
          </div>

          {/* Bottom static half */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden rounded-b-lg">
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 text-[#C9A74D] font-mono text-2xl md:text-3xl lg:text-4xl font-bold border-t border-gray-600">
              <span className="relative -translate-y-full">
                {bottomValue}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black opacity-10"></div>
              </span>
            </div>
          </div>

          {/* Flipping top half */}
          {flipState.isFlipping && (
            <div 
              className="absolute top-0 left-0 w-full h-1/2 overflow-hidden rounded-t-lg origin-bottom z-20"
              style={{
                animation: 'flipTop 0.6s ease-in-out forwards',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-gray-700 to-gray-800 text-[#C9A74D] font-mono text-2xl md:text-3xl lg:text-4xl font-bold border-b border-gray-600">
                <span className="relative">
                  {topValue}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-10"></div>
                </span>
              </div>
            </div>
          )}

          {/* Flipping bottom half */}
          {flipState.isFlipping && (
            <div 
              className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden rounded-b-lg origin-top z-10"
              style={{
                animation: 'flipBottom 0.6s ease-in-out forwards',
                animationDelay: '0.3s',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 text-[#C9A74D] font-mono text-2xl md:text-3xl lg:text-4xl font-bold border-t border-gray-600">
                <span className="relative -translate-y-full">
                  {nextValue}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black opacity-10"></div>
                </span>
              </div>
            </div>
          )}

          {/* Center line/hinge */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-900 z-30 transform -translate-y-0.5 shadow-lg"></div>
          
          {/* Realistic shadows during flip */}
          {flipState.isFlipping && (
            <>
              <div 
                className="absolute inset-0 pointer-events-none z-40"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.4) 55%, transparent 100%)',
                  animation: 'shadowPulse 0.6s ease-in-out'
                }}
              ></div>
              <div 
                className="absolute inset-0 pointer-events-none z-30"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                  animation: 'shadowPulse 0.6s ease-in-out'
                }}
              ></div>
            </>
          )}
        </div>
        
        <span className="text-[#C9A74D] text-sm md:text-base lg:text-lg font-medium tracking-wider uppercase">
          {label}
        </span>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center space-x-4 md:space-x-6 lg:space-x-8">
      <style jsx>{`
        @keyframes flipTop {
          0% { 
            transform: rotateX(0deg);
            z-index: 20;
          }
          50% { 
            transform: rotateX(-90deg);
            z-index: 20;
          }
          100% { 
            transform: rotateX(-90deg);
            z-index: 5;
          }
        }
        
        @keyframes flipBottom {
          0% { 
            transform: rotateX(90deg);
            z-index: 5;
          }
          50% { 
            transform: rotateX(90deg);
            z-index: 10;
          }
          100% { 
            transform: rotateX(0deg);
            z-index: 10;
          }
        }
        
        @keyframes shadowPulse {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
      
      <FlipDigit value={timeLeft.days} label="days" />
      <div className="text-[#C9A74D] text-4xl md:text-5xl lg:text-6xl font-bold animate-pulse">:</div>
      <FlipDigit value={timeLeft.hours} label="hours" />
      <div className="text-[#C9A74D] text-4xl md:text-5xl lg:text-6xl font-bold animate-pulse">:</div>
      <FlipDigit value={timeLeft.minutes} label="minutes" />
      <div className="text-[#C9A74D] text-4xl md:text-5xl lg:text-6xl font-bold animate-pulse">:</div>
      <FlipDigit value={timeLeft.seconds} label="seconds" />
    </div>
  )
}

export default PhysicalFlipTimer