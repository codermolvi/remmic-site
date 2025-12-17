'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimeUnit {
  value: number
  label: string
}

interface FlipCardProps {
  digit: string
  prevDigit: string
}

const FlipCard: React.FC<FlipCardProps> = ({ digit, prevDigit }) => {
  return (
    <div className="flip-card-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={digit}
          className="flip-card"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: 0 }}
          exit={{ rotateX: -90 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front">{digit}</div>
            <div className="flip-card-back">{prevDigit}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const FlipTimer: React.FC = () => {
  // Calculate initial time remaining
  const calculateTimeRemaining = () => {
    const targetDate = new Date('2025-01-09T00:00:00.000Z')
    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      }
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining())
  const [prevTime, setPrevTime] = useState(calculateTimeRemaining())

  const targetDate = useRef(new Date())

  useEffect(() => {
    // Set target date to January 9, 2025 at 12:00 AM (30 days from December 10, 2025 at 12 AM)
    targetDate.current = new Date('2025-01-09T00:00:00.000Z')

    const timer = setInterval(() => {
      const now = new Date()
      const difference = targetDate.current.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setPrevTime(timeRemaining)
        setTimeRemaining({ days, hours, minutes, seconds })
      } else {
        // Countdown has ended
        setPrevTime(timeRemaining)
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num: number): string[] => {
    return num.toString().padStart(2, '0').split('')
  }

  const timeUnits: TimeUnit[] = [
    { value: timeRemaining.days, label: 'DAYS' },
    { value: timeRemaining.hours, label: 'HOURS' },
    { value: timeRemaining.minutes, label: 'MINUTES' },
    { value: timeRemaining.seconds, label: 'SECONDS' }
  ]

  const prevTimeUnits: TimeUnit[] = [
    { value: prevTime.days, label: 'DAYS' },
    { value: prevTime.hours, label: 'HOURS' },
    { value: prevTime.minutes, label: 'MINUTES' },
    { value: prevTime.seconds, label: 'SECONDS' }
  ]

  return (
    <div className="tick" aria-label="Countdown Timer">
      <style jsx global>{`
        .tick {
          font-size: 1rem;
          white-space: nowrap;
          font-family: 'Inter', arial, sans-serif;
          display: flex;
          justify-content: center;
          gap: 2rem;
          padding: 2rem;
        }

        .tick-flip,
        .tick-text-inline {
          font-size: 2.5em;
        }

        .tick-label {
          margin-top: 1em;
          font-size: 1em;
          color: rgb(90, 93, 99);
          font-weight: 600;
          letter-spacing: 0.1em;
        }

        .tick-char {
          width: 1.5em;
        }

        .tick-text-inline {
          display: inline-block;
          text-align: center;
          min-width: 1em;
          color: rgb(90, 93, 99);
        }

        .tick-text-inline + .tick-text-inline {
          margin-left: -0.325em;
        }

        .tick-group {
          margin: 0 0.5em;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tick-flip-panel {
          color: rgb(255, 255, 255);
          background-color: rgb(59, 61, 59);
        }

        .tick-flip-panel-text-wrapper {
          line-height: 1.45;
        }

        .tick-flip {
          border-radius: 0.12em;
        }

        .flip-card-container {
          position: relative;
          width: 1.5em;
          height: 1.8em;
          display: inline-block;
          margin: 0 0.05em;
          perspective: 1000px;
        }

        .flip-card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgb(59, 61, 59), rgb(45, 47, 45));
          border-radius: 0.12em;
          box-shadow: 
            0 4px 8px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #fff;
          font-size: 1.2em;
          border: 1px solid rgba(201, 167, 77, 0.2);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flip-card-back {
          transform: rotateX(180deg);
        }

        .flip-digits-container {
          display: flex;
          gap: 0.1em;
        }

        @media (max-width: 768px) {
          .tick {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }

          .tick-flip,
          .tick-text-inline {
            font-size: 2em;
          }

          .flip-card-container {
            width: 1.3em;
            height: 1.5em;
          }
        }

        @media (min-width: 1024px) {
          .tick-flip,
          .tick-text-inline {
            font-size: 3em;
          }

          .flip-card-container {
            width: 1.6em;
            height: 2em;
          }
        }
      `}</style>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {timeUnits.map((unit, index) => {
          const digits = formatNumber(unit.value)
          const prevDigits = formatNumber(prevTimeUnits[index].value)
          
          return (
            <div key={unit.label} className="tick-group">
              <div className="tick-flip flip-digits-container">
                {digits.map((digit, digitIndex) => (
                  <FlipCard
                    key={`${unit.label}-${digitIndex}`}
                    digit={digit}
                    prevDigit={prevDigits[digitIndex]}
                  />
                ))}
              </div>
              <span className="tick-label text-premium-gold">{unit.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FlipTimer