'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface ThreeDHeroTextProps {
  text: string
  position: [number, number, number]
  fontSize?: number
  color?: string
  isSubtext?: boolean
  typing?: boolean
  typingSpeed?: number
}

const ThreeDHeroText: React.FC<ThreeDHeroTextProps> = ({ 
  text, 
  position, 
  fontSize = 0.5, 
  color = '#FFFFFF',
  isSubtext = false,
  typing = false,
  typingSpeed = 100
}) => {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [displayedText, setDisplayedText] = useState(typing ? '' : text)
  
  const { viewport } = useThree()
  const responsiveFontSize = Math.max(Math.min(fontSize * (viewport.width / 6), fontSize * 3), fontSize * 1.5)

  useEffect(() => {
    if (typing) {
      let index = 0
      setDisplayedText('')
      const timer = setInterval(() => {
        setDisplayedText(text.substring(0, index + 1))
        index++
        if (index >= text.length) {
          clearInterval(timer)
        }
      }, typingSpeed)
      return () => clearInterval(timer)
    }
  }, [text, typing, typingSpeed])

  useFrame((state) => {
    if (ref.current) {
      const targetZ = hovered ? position[2] + 0.5 : position[2]
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, 0.1)

      const targetY = hovered ? position[1] + 0.2 : position[1]
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.1)
    }
  })

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={responsiveFontSize}
      color={color}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {displayedText}
    </Text>
  )
}

export default ThreeDHeroText;