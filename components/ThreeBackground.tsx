'use client'

import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls, Stars, Line } from '@react-three/drei'
import * as THREE from 'three'

// WebGL Detection Utility
const detectWebGL = (): boolean => {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!(gl && gl instanceof WebGLRenderingContext)
  } catch (e) {
    return false
  }
}

// Building Component
const Building = ({ position, height, color, rotationSpeed }: { 
  position: [number, number, number], 
  height: number, 
  color: string,
  rotationSpeed: number 
}) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, height, 0.5]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.1}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

// Floating Property Card
const PropertyCard = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.2
    }
  })

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <planeGeometry args={[1.2, 0.8]} />
        <meshStandardMaterial 
          color="#C9A74D" 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1, 0.6]} />
        <meshStandardMaterial 
          color="#1A1A1A" 
          transparent 
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Blockchain Network Lines
const NetworkLine = ({ start, end }: { start: [number, number, number], end: [number, number, number] }) => {
  const ref = useRef<any>()
  
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2 + (Math.random() - 0.5) * 2,
        (start[1] + end[1]) / 2 + Math.random() * 2,
        (start[2] + end[2]) / 2
      ),
      new THREE.Vector3(...end)
    ])
    return curve.getPoints(50)
  }, [start, end])

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <Line
      ref={ref}
      points={points}
      color="#C9A74D"
      lineWidth={1}
      transparent
      opacity={0.4}
    />
  )
}

// Floating Particles
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null!)
  
  const particles = useMemo(() => {
    const count = 100
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = Math.random() * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.002
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#C9A74D" transparent opacity={0.6} />
    </points>
  )
}

// City Skyline
const CitySkyline = () => {
  const buildings = useMemo(() => {
    const buildingData = []
    for (let i = 0; i < 15; i++) {
      buildingData.push({
        position: [
          (Math.random() - 0.5) * 25,
          Math.random() * 3 + 0.5,
          -8 - Math.random() * 5
        ] as [number, number, number],
        height: Math.random() * 2 + 1,
        color: Math.random() > 0.7 ? '#C9A74D' : '#2C2C2C',
        rotationSpeed: (Math.random() - 0.5) * 0.002
      })
    }
    return buildingData
  }, [])

  return (
    <group>
      {buildings.map((building, index) => (
        <Building key={index} {...building} />
      ))}
    </group>
  )
}

// Property Investment Nodes
const InvestmentNodes = () => {
  const nodes = useMemo(() => [
    { position: [-4, 2, -2] as [number, number, number] },
    { position: [4, 3, -3] as [number, number, number] },
    { position: [-2, 4, 1] as [number, number, number] },
    { position: [3, 1.5, 2] as [number, number, number] },
    { position: [0, 5, -1] as [number, number, number] }
  ], [])

  const connections = useMemo(() => [
    { start: nodes[0].position, end: nodes[1].position },
    { start: nodes[1].position, end: nodes[2].position },
    { start: nodes[2].position, end: nodes[3].position },
    { start: nodes[3].position, end: nodes[4].position },
    { start: nodes[4].position, end: nodes[0].position }
  ], [nodes])

  return (
    <group>
      {nodes.map((node, index) => (
        <PropertyCard key={index} position={node.position} />
      ))}
      {connections.map((connection, index) => (
        <NetworkLine key={index} {...connection} />
      ))}
    </group>
  )
}

// Main Scene Component
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#C9A74D" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#ffffff" />
      
      <Stars 
        radius={300} 
        depth={50} 
        count={1000} 
        factor={2} 
        saturation={0.2}
        fade 
        speed={0.5}
      />
      
      <FloatingParticles />
      <CitySkyline />
      <InvestmentNodes />
      
      <Text
        position={[0, -6, -5]}
        fontSize={0.8}
        color="#C9A74D"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
      >
        BLOCKCHAIN REAL ESTATE
        <meshStandardMaterial attach="material" transparent opacity={0.4} />
      </Text>
    </>
  )
}

// Fallback Component for when WebGL is not available
const FallbackBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-premium-gold/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-premium-gold/30 text-center">
        <div className="text-6xl font-display">REMMIC</div>
        <div className="text-sm tracking-widest mt-2">BLOCKCHAIN REAL ESTATE</div>
      </div>
    </div>
  )
}

// Main Component with WebGL Detection
const ThreeBackground: React.FC = () => {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null)
  const [renderError, setRenderError] = useState(false)

  useEffect(() => {
    // Check WebGL support on client side only
    const supported = detectWebGL()
    setWebGLSupported(supported)
  }, [])

  // Handle Canvas errors
  const handleCanvasError = (error: any) => {
    console.warn('WebGL Canvas Error:', error)
    setRenderError(true)
  }

  // Show fallback while checking or if WebGL not supported
  if (webGLSupported === null || !webGLSupported || renderError) {
    return <FallbackBackground />
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ 
          position: [0, 0, 8], 
          fov: 60,
          near: 0.1,
          far: 1000 
        }}
        style={{ 
          background: 'transparent',
          pointerEvents: 'none'
        }}
        onCreated={(state) => {
          // Suppress Three.js warnings
          state.gl.debug.checkShaderErrors = false
        }}
        onError={handleCanvasError}
        fallback={<FallbackBackground />}
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false
        }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default ThreeBackground