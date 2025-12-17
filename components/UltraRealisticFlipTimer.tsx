'use client'

import React, { useState, useEffect, useRef } from 'react'

interface FlipUnitProps {
  current: string
  previous: string
}

const FlipDigit: React.FC<FlipUnitProps> = ({ current, previous }) => {
  const [flip, setFlip] = useState(false)
  const [currentValue, setCurrentValue] = useState(current)
  const [previousValue, setPreviousValue] = useState(previous)
  
  useEffect(() => {
    if (current !== previousValue) {
      setPreviousValue(currentValue)
      setCurrentValue(current)
      setFlip(true)
      
      setTimeout(() => {
        setFlip(false)
      }, 800)
    }
  }, [current, currentValue, previousValue])

  return (
    <div className="flip-clock-wrapper">
      <ul className={`flip ${flip ? 'play' : ''}`}>
        <li className="flip-clock-before">
          <a href="#">
            <div className="up">
              <div className="shadow"></div>
              <div className="inn">{previousValue}</div>
            </div>
            <div className="down">
              <div className="shadow"></div>
              <div className="inn">{previousValue}</div>
            </div>
          </a>
        </li>
        <li className="flip-clock-active">
          <a href="#">
            <div className="up">
              <div className="shadow"></div>
              <div className="inn">{currentValue}</div>
            </div>
            <div className="down">
              <div className="shadow"></div>
              <div className="inn">{currentValue}</div>
            </div>
          </a>
        </li>
      </ul>

      <style jsx>{`
        .flip-clock-wrapper {
          display: inline-block;
          margin: 0 2px;
        }

        .flip {
          position: relative;
          width: 60px;
          height: 90px;
          margin: 0;
          font-size: 65px;
          font-weight: bold;
          line-height: 87px;
          text-align: center;
          list-style: none;
          perspective: 200px;
        }

        .flip a {
          display: block;
          height: 100%;
          color: #ccc;
          text-decoration: none;
        }

        .flip li {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .flip .up,
        .flip .down {
          position: absolute;
          left: 0;
          width: 100%;
          height: 50%;
          overflow: hidden;
        }

        .flip .up {
          top: 0;
          transform-origin: 50% 100%;
          background: #333;
          background: linear-gradient(to bottom, #444 0%, #333 100%);
          border-radius: 8px 8px 0 0;
        }

        .flip .up:after {
          content: "";
          position: absolute;
          top: 44px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 10;
        }

        .flip .down {
          bottom: 0;
          transform-origin: 50% 0%;
          background: #333;
          background: linear-gradient(to bottom, #333 0%, #222 100%);
          border-radius: 0 0 8px 8px;
        }

        .flip .up .shadow,
        .flip .down .shadow {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        .flip .up .inn,
        .flip .down .inn {
          position: absolute;
          left: 0;
          width: 100%;
          height: 200%;
          color: #C9A74D;
          text-shadow: 0 1px 2px #000;
          text-align: center;
          background-color: #333;
          font-family: "Helvetica Neue", Helvetica, sans-serif;
        }

        .flip .up .inn {
          top: 0;
        }

        .flip .down .inn {
          bottom: 0;
        }

        /* PLAY ANIMATION */
        .flip.play .flip-clock-before {
          z-index: 3;
        }

        .flip.play .flip-clock-active {
          z-index: 2;
          animation: flipActiveBottom 0.8s ease-out both;
        }

        .flip.play .flip-clock-before .up {
          z-index: 2;
          animation: flipBeforeUp 0.8s ease-in-out both;
        }

        .flip.play .flip-clock-before .up .shadow {
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 1) 100%);
          animation: flipBeforeUpShadow 0.8s ease-in-out both;
        }

        .flip.play .flip-clock-before .down {
          z-index: 1;
        }

        .flip.play .flip-clock-active .down {
          z-index: 2;
          animation: flipActiveDown 0.8s ease-out 0.4s both;
        }

        .flip.play .flip-clock-active .down:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          animation: flipActiveDownBefore 0.8s ease-out 0.4s both;
        }

        @keyframes flipBeforeUp {
          0% {
            transform: rotateX(0deg);
          }
          30% {
            transform: rotateX(10deg);
          }
          100% {
            transform: rotateX(-90deg);
          }
        }

        @keyframes flipBeforeUpShadow {
          0% {
            opacity: 0;
          }
          30% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes flipActiveBottom {
          0% {
            z-index: 2;
          }
          50% {
            z-index: 4;
          }
        }

        @keyframes flipActiveDown {
          0% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }

        @keyframes flipActiveDownBefore {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        /* SIZE VARIATIONS */
        @media (max-width: 768px) {
          .flip {
            width: 45px;
            height: 70px;
            font-size: 50px;
            line-height: 68px;
          }

          .flip .up:after {
            top: 34px;
            height: 2px;
          }
        }

        @media (min-width: 1024px) {
          .flip {
            width: 70px;
            height: 100px;
            font-size: 75px;
            line-height: 98px;
          }

          .flip .up:after {
            top: 49px;
            height: 3px;
          }
        }
      `}</style>
    </div>
  )
}

const UltraRealisticFlipTimer: React.FC = () => {
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
  
  const targetDate = useRef<Date | null>(null)

  useEffect(() => {
    if (!targetDate.current) {
      targetDate.current = new Date()
      targetDate.current.setDate(targetDate.current.getDate() + 30)
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

  const formatNumber = (num: number): string[] => {
    return num.toString().padStart(2, '0').split('')
  }

  return (
    <div className="ultra-flip-timer">
      <div className="timer-container">
        {/* Days */}
        <div className="time-section">
          <div className="time-group">
            <div className="time-segment">
              {formatNumber(time.days).map((digit, index) => (
                <FlipDigit
                  key={`day-${index}`}
                  current={digit}
                  previous={formatNumber(prevTime.days)[index]}
                />
              ))}
            </div>
          </div>
          <span className="time-label">DAYS</span>
        </div>

        <span className="time-separator">:</span>

        {/* Hours */}
        <div className="time-section">
          <div className="time-group">
            <div className="time-segment">
              {formatNumber(time.hours).map((digit, index) => (
                <FlipDigit
                  key={`hour-${index}`}
                  current={digit}
                  previous={formatNumber(prevTime.hours)[index]}
                />
              ))}
            </div>
          </div>
          <span className="time-label">HOURS</span>
        </div>

        <span className="time-separator">:</span>

        {/* Minutes */}
        <div className="time-section">
          <div className="time-group">
            <div className="time-segment">
              {formatNumber(time.minutes).map((digit, index) => (
                <FlipDigit
                  key={`minute-${index}`}
                  current={digit}
                  previous={formatNumber(prevTime.minutes)[index]}
                />
              ))}
            </div>
          </div>
          <span className="time-label">MINUTES</span>
        </div>

        <span className="time-separator">:</span>

        {/* Seconds */}
        <div className="time-section">
          <div className="time-group">
            <div className="time-segment">
              {formatNumber(time.seconds).map((digit, index) => (
                <FlipDigit
                  key={`second-${index}`}
                  current={digit}
                  previous={formatNumber(prevTime.seconds)[index]}
                />
              ))}
            </div>
          </div>
          <span className="time-label">SECONDS</span>
        </div>
      </div>

      <style jsx>{`
        .ultra-flip-timer {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
          padding: 40px 20px;
          background: linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(40, 40, 40, 0.9) 100%);
          border-radius: 20px;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.8),
            inset 0 -2px 10px rgba(0, 0, 0, 0.5),
            inset 0 2px 10px rgba(255, 255, 255, 0.05);
        }

        .timer-container {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .time-section {
          text-align: center;
        }

        .time-group {
          margin-bottom: 15px;
        }

        .time-segment {
          display: inline-flex;
          gap: 4px;
        }

        .time-label {
          display: block;
          margin-top: 10px;
          color: #C9A74D;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          opacity: 0.7;
          text-transform: uppercase;
        }

        .time-separator {
          font-size: 60px;
          line-height: 90px;
          color: #C9A74D;
          opacity: 0.6;
          font-weight: 300;
          margin: 0 -5px;
          animation: blink 2s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.2;
          }
        }

        @media (max-width: 768px) {
          .timer-container {
            gap: 8px;
          }

          .time-separator {
            font-size: 40px;
            line-height: 70px;
          }

          .time-label {
            font-size: 9px;
            margin-top: 8px;
          }
        }

        @media (min-width: 1024px) {
          .timer-container {
            gap: 20px;
          }

          .time-separator {
            font-size: 70px;
            line-height: 100px;
          }

          .time-label {
            font-size: 12px;
            margin-top: 12px;
          }
        }
      `}</style>
    </div>
  )
}

export default UltraRealisticFlipTimer