'use client'

import React from 'react'
import { motion } from 'framer-motion'

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-premium-charcoal/30 border-b border-premium-gold/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20 sm:h-24 py-2">
          {/* Logo and Brand Name */}
          <div 
            className="flex items-center"
          >
            <div className="relative w-48 h-48 sm:w-72 sm:h-72 flex items-center justify-center">
              <img
                src="/REMMIC LOGO SVG (1).svg"
                alt="Remmic Logo"
                width="192"
                height="192"
                className="object-contain"
                style={{ 
                  maxWidth: '100%',
                  height: 'auto'
                }}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = '/REMMIC LOGO SVG (1).svg';
                }}
                loading="eager"
              />
              <div className="absolute inset-0 bg-premium-gold/10 blur-2xl rounded-full" />
            </div>
          </div>

        </div>
      </div>
    </motion.header>
  )
}

export default Header