'use client'

import React, { useState, useEffect } from 'react'

interface FlipDigitProps {
  value: number
  label: string
}

const PhysicalFlipCalendar: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const targetDate = new Date('2025-12-31T23:59:59').getTime()

  useEffect(() => {
    const updateCountdown = () => {
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

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const FlipDigit: React.FC<FlipDigitProps> = ({ value, label }) => {
    const [currentValue, setCurrentValue] = useState(value)
    const [previousValue, setPreviousValue] = useState(value)
    const [isFlipping, setIsFlipping] = useState(false)

    useEffect(() => {
      if (value !== currentValue) {
        setPreviousValue(currentValue)
        setIsFlipping(true)
        
        // Change the number at the exact moment the top card is perpendicular
        setTimeout(() => {
          setCurrentValue(value)
        }, 300)
        
        // End the flip animation
        setTimeout(() => {
          setIsFlipping(false)
        }, 600)
      }
    }, [value, currentValue])

    const currentStr = currentValue.toString().padStart(2, '0')
    const previousStr = previousValue.toString().padStart(2, '0')

    return (
      <div className="flex flex-col items-center space-y-2">
        <div className="flip-container">
          {/* Background card (always visible) */}
          <div className="flip-card-static">
            <div className="flip-half flip-half-top">
              <span className="flip-number">{currentStr}</span>
            </div>
            <div className="flip-half flip-half-bottom">
              <span className="flip-number flip-number-bottom">{currentStr}</span>
            </div>
            <div className="flip-hinge"></div>
          </div>

          {/* Animated cards (only during flip) */}
          {isFlipping && (
            <>
              {/* Top card that flips down */}
              <div className={`flip-card-animated flip-card-top ${isFlipping ? 'flipping-top' : ''}`}>
                <div className="flip-half flip-half-top">
                  <span className="flip-number">{previousStr}</span>
                </div>
              </div>

              {/* Bottom card that reveals */}
              <div className={`flip-card-animated flip-card-bottom ${isFlipping ? 'flipping-bottom' : ''}`}>
                <div className="flip-half flip-half-bottom">
                  <span className="flip-number flip-number-bottom">{currentStr}</span>
                </div>
              </div>
            </>
          )}
        </div>
        
        <span className="flip-label">{label}</span>
      </div>
    )
  }

  return (
    <>
      <style jsx>{`
        .flip-container {
          position: relative;
          width: 80px;
          height: 100px;
          perspective: 300px;
          margin: 0 8px;
        }

        .flip-card-static,
        .flip-card-animated {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 8px;
          background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%);
          box-shadow: 
            0 8px 16px rgba(0, 0, 0, 0.7),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5);
          border: 1px solid #333;
        }

        .flip-half {
          position: absolute;
          width: 100%;
          height: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
        }

        .flip-half-top {
          top: 0;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
        }

        .flip-half-bottom {
          bottom: 0;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
        }

        .flip-number {
          font-family: 'Monaco', 'Consolas', monospace;
          font-size: 32px;
          font-weight: bold;
          color: #f8fafc;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          text-rendering: optimizeLegibility;
        }

        .flip-number-bottom {
          transform: translateY(-100%);
        }

        .flip-hinge {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #333, #666, #333);
          transform: translateY(-50%);
          z-index: 5;
          box-shadow: 
            0 1px 2px rgba(0, 0, 0, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        /* Top card animation */
        .flip-card-top {
          z-index: 3;
          transform-origin: center bottom;
          background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
        }

        .flipping-top {
          animation: flipTop 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards;
        }

        /* Bottom card animation */
        .flip-card-bottom {
          z-index: 1;
          transform-origin: center top;
          background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
        }

        .flipping-bottom {
          animation: flipBottom 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards;
        }

        @keyframes flipTop {
          0% {
            transform: rotateX(0deg);
            z-index: 3;
          }
          50% {
            transform: rotateX(-90deg);
            z-index: 3;
          }
          100% {
            transform: rotateX(-180deg);
            z-index: 1;
            visibility: hidden;
          }
        }

        @keyframes flipBottom {
          0% {
            transform: rotateX(90deg);
            z-index: 1;
          }
          50% {
            transform: rotateX(0deg);
            z-index: 2;
          }
          100% {
            transform: rotateX(0deg);
            z-index: 2;
          }
        }

        .flip-label {
          color: #f8fafc;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          opacity: 0.8;
        }

        /* Responsive sizing */
        @media (max-width: 768px) {
          .flip-container {
            width: 60px;
            height: 80px;
          }
          .flip-number {
            font-size: 24px;
          }
          .flip-label {
            font-size: 12px;
          }
        }

        @media (min-width: 1024px) {
          .flip-container {
            width: 100px;
            height: 120px;
          }
          .flip-number {
            font-size: 40px;
          }
          .flip-label {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-8">
        <FlipDigit value={timeLeft.days} label="days" />
        <div className="text-[#C9A74D] text-3xl md:text-4xl lg:text-5xl font-light opacity-70">:</div>
        <FlipDigit value={timeLeft.hours} label="hours" />
        <div className="text-[#C9A74D] text-3xl md:text-4xl lg:text-5xl font-light opacity-70">:</div>
        <FlipDigit value={timeLeft.minutes} label="minutes" />
        <div className="text-[#C9A74D] text-3xl md:text-4xl lg:text-5xl font-light opacity-70">:</div>
        <FlipDigit value={timeLeft.seconds} label="seconds" />
      </div>
    </>
  )
}

export default PhysicalFlipCalendar