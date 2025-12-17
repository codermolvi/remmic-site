'use client'

import React, { useState, useEffect, useRef } from 'react'

interface FlipUnitProps {
  current: string
  previous: string
}

const FlipDigit: React.FC<FlipUnitProps> = ({ current, previous }) => {
  const [isFlipping, setIsFlipping] = useState(false)
  const [topValue, setTopValue] = useState(current)
  const [bottomValue, setBottomValue] = useState(current)
  const [newValue, setNewValue] = useState(current)

  useEffect(() => {
    if (current !== topValue) {
      // Start flip animation
      setNewValue(current)
      setIsFlipping(true)
      
      // At 50% of animation (when top card is fully down), change both top and bottom values
      setTimeout(() => {
        setTopValue(current)
        setBottomValue(current)
      }, 300)
      
      // Animation complete - reset flip state
      setTimeout(() => {
        setIsFlipping(false)
      }, 600)
    }
  }, [current, topValue])

  return (
    <div className="flip-digit">
      <div className="digit-container">
        {/* Static upper half */}
        <div className="digit-upper">
          <span>{topValue}</span>
        </div>
        
        {/* Static lower half */}
        <div className="digit-lower">
          <span>{bottomValue}</span>
        </div>

        {/* Flip animation wrapper */}
        <div className={`flip-card ${isFlipping ? 'flipping' : ''}`}>
          {/* Upper card that flips */}
          <div className="flip-card-upper">
            <span>{topValue}</span>
          </div>
          {/* Lower card that appears */}
          <div className="flip-card-lower">
            <span>{newValue}</span>
          </div>
        </div>
        
        {/* Center hinge with pins */}
        <div className="center-hinge">
          <div className="pin pin-left"></div>
          <div className="pin pin-right"></div>
        </div>
      </div>

      <style jsx>{`
        .flip-digit {
          position: relative;
          display: inline-block;
          width: clamp(35px, 8vw, 70px);
          height: clamp(45px, 10vw, 90px);
          margin: 0 1px;
          font-size: clamp(24px, 6vw, 54px);
          font-weight: bold;
          font-family: 'Courier New', monospace;
          transform-style: preserve-3d;
          transform: translateZ(10px);
        }

        .digit-container {
          position: relative;
          width: 100%;
          height: 100%;
          color: #f8fafc;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          perspective: 300px;
        }

        /* Static background halves */
        .digit-upper,
        .digit-lower {
          position: absolute;
          width: 100%;
          height: 50%;
          overflow: hidden;
          background: radial-gradient(ellipse at center, #1A1A1A 0%, #0A0A0A 70%, #000000 100%) !important;
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.8),
            inset 0 1px 0 rgba(212, 175, 55, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.6),
            inset 1px 0 0 rgba(255, 255, 255, 0.05),
            inset -1px 0 0 rgba(0, 0, 0, 0.3),
            0 0 20px rgba(212, 175, 55, 0.1);
          transform-style: preserve-3d;
        }

        .digit-upper {
          top: 0;
          background: linear-gradient(to bottom, #2A2A2A 0%, #1A1A1A 30%, #0A0A0A 100%) !important;
          border-radius: 4px 4px 0 0;
          border-bottom: 2px solid #000000;
          transform: translateZ(2px);
          box-shadow: 
            inset 0 1px 2px rgba(255, 255, 255, 0.1),
            inset 0 -1px 1px rgba(0, 0, 0, 0.8),
            0 1px 3px rgba(212, 175, 55, 0.2),
            0 0 10px rgba(212, 175, 55, 0.1);
        }

        .digit-lower {
          bottom: 0;
          background: linear-gradient(to bottom, #0A0A0A 0%, #000000 70%, #000000 100%) !important;
          border-radius: 0 0 4px 4px;
          border-top: 1px solid #1A1A1A;
          transform: translateZ(1px);
          box-shadow: 
            inset 0 1px 1px rgba(0, 0, 0, 0.8),
            inset 0 -1px 2px rgba(255, 255, 255, 0.05),
            0 -1px 3px rgba(212, 175, 55, 0.15),
            0 0 8px rgba(212, 175, 55, 0.08);
        }

        .digit-upper span,
        .digit-lower span {
          position: absolute;
          left: 0;
          right: 0;
          text-align: center;
          height: 200%;
          line-height: clamp(45px, 10vw, 90px);
        }

        .digit-upper span {
          top: 0;
        }

        .digit-lower span {
          top: -100%;
        }

        /* Flip animation cards */
        .flip-card {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .flip-card-upper,
        .flip-card-lower {
          position: absolute;
          width: 100%;
          height: 50%;
          overflow: hidden;
          backface-visibility: hidden;
        }

        .flip-card-upper {
          top: 0;
          background: linear-gradient(to bottom, #2A2A2A 0%, #1A1A1A 30%, #0A0A0A 100%) !important;
          box-shadow: 
            inset 0 1px 2px rgba(255, 255, 255, 0.1),
            inset 0 -1px 1px rgba(0, 0, 0, 0.8),
            0 1px 3px rgba(212, 175, 55, 0.2);
          border-radius: 4px 4px 0 0;
          border-bottom: 1px solid #000000;
          transform-origin: 50% 100%;
          z-index: 2;
        }

        .flip-card-lower {
          bottom: 0;
          background: linear-gradient(to bottom, #0A0A0A 0%, #000000 70%, #000000 100%) !important;
          box-shadow: 
            inset 0 1px 1px rgba(0, 0, 0, 0.8),
            inset 0 -1px 2px rgba(255, 255, 255, 0.05),
            0 -1px 3px rgba(212, 175, 55, 0.15);
          border-radius: 0 0 4px 4px;
          transform-origin: 50% 0%;
          z-index: 1;
        }

        .flip-card-upper span,
        .flip-card-lower span {
          position: absolute;
          left: 0;
          right: 0;
          text-align: center;
          color: #f8fafc;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          height: 200%;
          line-height: clamp(45px, 10vw, 90px);
        }

        .flip-card-upper span {
          top: 0;
        }

        .flip-card-lower span {
          top: -100%;
        }

        /* Flip animation states */
        .flip-card:not(.flipping) .flip-card-upper,
        .flip-card:not(.flipping) .flip-card-lower {
          display: none;
        }

        .flip-card.flipping .flip-card-upper {
          animation: flip-top 0.6s ease-in-out;
          animation-fill-mode: both;
          box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.6);
        }

        .flip-card.flipping .flip-card-lower {
          animation: flip-bottom 0.6s ease-in-out;
          animation-fill-mode: both;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
        }

        /* Metallic shine animation */
        @keyframes metallicShine {
          0% { background-position: -100% 0; }
          50% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .digit:hover .digit-upper,
        .digit:hover .digit-lower {
          position: relative;
        }
        .digit:hover .digit-upper::after,
        .digit:hover .digit-lower::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(212, 175, 55, 0.3) 40%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(212, 175, 55, 0.3) 60%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: metallicShine 2s ease-in-out;
          pointer-events: none;
          border-radius: inherit;
        }
        /* Center hinge and pins */
        .center-hinge {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 0;
          transform: translateY(-50%);
          z-index: 10;
        }

        .pin {
          position: absolute;
          top: 50%;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #2A2A2A 0%, #1A1A1A 50%, #0A0A0A 100%);
          border-radius: 50%;
          transform: translateY(-50%);
          z-index: 11;
          box-shadow: 
            0 1px 2px rgba(0, 0, 0, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .pin-left {
          left: 8px;
        }

        .pin-right {
          right: 8px;
        }

        @keyframes flip-top {
          0% {
            transform: rotateX(0deg);
          }
          50% {
            transform: rotateX(-90deg);
          }
          100% {
            transform: rotateX(-90deg);
          }
        }

        @keyframes flip-bottom {
          0% {
            transform: rotateX(90deg);
          }
          50% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }

        /* Responsive margins for flip digits */
        @media (max-width: 320px) {
          .flip-digit {
            margin: 0 0.5px;
          }
        }

        @media (min-width: 321px) and (max-width: 480px) {
          .flip-digit {
            margin: 0 1px;
          }
        }

        @media (min-width: 481px) and (max-width: 767px) {
          .flip-digit {
            margin: 0 1.5px;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .flip-digit {
            margin: 0 2px;
          }
        }

        @media (min-width: 1024px) {
          .flip-digit {
            margin: 0 3px;
          }
        }
      `}</style>
    </div>
  )
}

const RealisticFlipTimer: React.FC = () => {
  const [time, setTime] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  const [prevTime, setPrevTime] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  const [scrollScale, setScrollScale] = useState(1)
  const targetDate = useRef<Date | null>(null)

  useEffect(() => {
    if (!targetDate.current) {
      // Check if we have a stored start date, if not use December 10, 2025
      const storedStartDate = localStorage.getItem('countdownStartDate')
      let startDate: Date
      
      if (storedStartDate) {
        startDate = new Date(storedStartDate)
      } else {
        // First time: Set start date to December 10, 2025 at 12:00 AM
        startDate = new Date('2025-12-10T00:00:00')
        localStorage.setItem('countdownStartDate', startDate.toISOString())
      }
      
      // Target date: 30 days from start date
      targetDate.current = new Date(startDate.getTime() + (30 * 24 * 60 * 60 * 1000))
    }

    const updateTimer = () => {
      const now = new Date()
      const difference = targetDate.current!.getTime() - now.getTime()

      if (difference > 0) {
        const newTime = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        }
        
        setPrevTime(time)
        setTime(newTime)
      }
    }

    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [time])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const scrollProgress = Math.min(scrollY / windowHeight, 1)
      
      // Scale from 1 to 1.3 based on scroll progress
      const newScale = 1 + (scrollProgress * 0.3)
      setScrollScale(newScale)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formatNumber = (num: number): string[] => {
    return num.toString().padStart(2, '0').split('')
  }

  return (
    <div className="flip-timer-wrapper">
      <div className="countdown-header">
        <h2 className="countdown-title">Countdown Started</h2>
        <p className="countdown-subtitle text-gradient-white opacity-90">Launch in</p>
      </div>
      
      <div 
        className="flip-timer"
        style={{ 
          transform: `rotateX(8deg) rotateY(-2deg) scale(${scrollScale})`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Days */}
        <div className="time-unit">
          <div className="digits-group">
            {formatNumber(time.days).map((digit, index) => (
              <FlipDigit
                key={`day-${index}`}
                current={digit}
                previous={formatNumber(prevTime.days)[index]}
              />
            ))}
          </div>
          <div className="time-label">DAYS</div>
        </div>

        <div className="separator">:</div>

        {/* Hours */}
        <div className="time-unit">
          <div className="digits-group">
            {formatNumber(time.hours).map((digit, index) => (
              <FlipDigit
                key={`hour-${index}`}
                current={digit}
                previous={formatNumber(prevTime.hours)[index]}
              />
            ))}
          </div>
          <div className="time-label">HOURS</div>
        </div>

        <div className="separator">:</div>

        {/* Minutes */}
        <div className="time-unit">
          <div className="digits-group">
            {formatNumber(time.minutes).map((digit, index) => (
              <FlipDigit
                key={`minute-${index}`}
                current={digit}
                previous={formatNumber(prevTime.minutes)[index]}
              />
            ))}
          </div>
          <div className="time-label">MINUTES</div>
        </div>

        <div className="separator">:</div>

        {/* Seconds */}
        <div className="time-unit">
          <div className="digits-group">
            {formatNumber(time.seconds).map((digit, index) => (
              <FlipDigit
                key={`second-${index}`}
                current={digit}
                previous={formatNumber(prevTime.seconds)[index]}
              />
            ))}
          </div>
          <div className="time-label">SECONDS</div>
        </div>
      </div>

      <style jsx>{`
        .flip-timer-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: clamp(15px, 3vw, 30px) clamp(10px, 2vw, 20px);
          background: radial-gradient(ellipse at center, rgba(201, 167, 77, 0.03) 0%, transparent 70%);
          perspective: 1200px;
        }

        .countdown-header {
          text-align: center;
          margin-bottom: clamp(20px, 4vw, 40px);
        }

        .countdown-title {
          font-size: clamp(20px, 4vw, 32px);
          font-weight: 700;
          background: linear-gradient(135deg, #D4AF37, #FFD700, #D4AF37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: goldShine 3s ease-in-out infinite;
          margin-bottom: clamp(8px, 2vw, 16px);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: clamp(0.5px, 0.2vw, 2px);
          text-transform: uppercase;
        }

        .countdown-subtitle {
          font-size: clamp(14px, 2.5vw, 18px);
          font-weight: 400;
          background: linear-gradient(135deg, #E6E6FA, #D4AF37, #E6E6FA);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: goldShine 4s ease-in-out infinite;
          opacity: 0.9;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          letter-spacing: clamp(0.3px, 0.1vw, 1px);
        }


        .flip-timer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 3vw, 20px);
          padding: clamp(12px, 3vw, 25px);
          background: 
            linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(44, 44, 44, 0.95) 50%, rgba(26, 26, 26, 0.95) 100%),
            linear-gradient(45deg, rgba(201, 167, 77, 0.05) 0%, transparent 30%, rgba(201, 167, 77, 0.05) 100%);
          border-radius: clamp(12px, 3vw, 20px);
          box-shadow: 
            0 15px 60px rgba(0, 0, 0, 0.8),
            0 8px 25px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          width: 100%;
          max-width: min(90vw, 800px);
          position: relative;
          transform-style: preserve-3d;
        }

        @keyframes gentle3DFloat {
          0%, 100% {
            animation-transform: translateY(0px) translateZ(0px);
          }
          33% {
            animation-transform: translateY(-3px) translateZ(5px);
          }
          66% {
            animation-transform: translateY(-1px) translateZ(3px);
          }
        }



        .time-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(8px, 2.5vw, 15px);
          flex: 1;
          min-width: 0;
        }

        .digits-group {
          display: flex;
          gap: clamp(1px, 0.5vw, 4px);
          justify-content: center;
        }

        .time-label {
          font-size: clamp(8px, 2vw, 12px);
          font-weight: 600;
          letter-spacing: clamp(0.5px, 0.3vw, 2px);
          background: linear-gradient(135deg, #D4AF37, #FFD700, #D4AF37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: goldShine 3s ease-in-out infinite;
          text-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.8),
            0 0 8px rgba(212, 175, 55, 0.3);
          opacity: 0.9;
          white-space: nowrap;
          text-align: center;
          transform: translateZ(15px);
        }

        .separator {
          font-size: clamp(24px, 6vw, 48px);
          font-weight: 700;
          color: #f8fafc;
          text-shadow: 
            0 3px 6px rgba(0, 0, 0, 0.6),
            0 0 12px rgba(201, 167, 77, 0.4);
          opacity: 0.5;
          margin: 0 clamp(-5px, -1vw, -10px);
          margin-bottom: clamp(15px, 4vw, 30px);
          animation: pulse3D 3s ease-in-out infinite;
          flex-shrink: 0;
          transform: translateZ(20px);
        }

        @keyframes pulse3D {
          0%, 100% {
            opacity: 0.5;
            transform: translateZ(20px) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateZ(25px) scale(1.05);
          }
        }


        /* Ultra small screens */
        @media (max-width: 320px) {
          .flip-timer {
            gap: 6px;
            padding: 12px 8px;
            border-radius: 12px;
          }
          
          .time-unit {
            gap: 6px;
          }
          
          .separator {
            margin: 0 -3px;
            margin-bottom: 12px;
          }
        }
        
        /* Small phones */
        @media (max-width: 480px) {
          .flip-timer {
            gap: 8px;
            padding: 15px 10px;
          }
          
          .separator {
            margin-bottom: 15px;
          }
        }
        
        /* Medium phones and small tablets */
        @media (min-width: 481px) and (max-width: 768px) {
          .flip-timer {
            gap: 12px;
            padding: 20px 15px;
          }
          
          .separator {
            margin-bottom: 20px;
          }
        }
        
        /* Tablets */
        @media (min-width: 769px) and (max-width: 1023px) {
          .flip-timer {
            gap: 16px;
            padding: 25px 20px;
          }
          
          .separator {
            margin-bottom: 25px;
          }
        }
        
        /* Desktop */
        @media (min-width: 1024px) {
          .flip-timer {
            gap: 20px;
            padding: 30px;
          }
          
          .separator {
            margin-bottom: 30px;
          }
        }
        
        /* Large desktop */
        @media (min-width: 1200px) {
          .flip-timer {
            gap: 25px;
            padding: 35px;
          }
          
          .separator {
            margin-bottom: 35px;
          }
        }
      `}</style>
    </div>
  )
}

export default RealisticFlipTimer