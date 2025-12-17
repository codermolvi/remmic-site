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
        <div className="flex items-center justify-center h-16 sm:h-20 py-2">
          {/* Logo and Brand Name */}
          <div 
            className="flex items-center"
          >
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
              <img
                src="/REMMIC ONLY LOGO.svg"
                alt="Remmic Logo"
                width="48"
                height="48"
                className="object-contain"
                style={{ 
                  maxWidth: '100%',
                  height: 'auto'
                }}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = '/REMMIC ONLY LOGO.svg';
                }}
                loading="eager"
              />
              <div className="absolute inset-0 bg-premium-gold/10 blur-2xl rounded-full" />
            </div>
            <div className="ml-3">
              <h1 className="font-display text-2xl sm:text-3xl text-gradient-gold tracking-wider">REMMIC</h1>
              <p className="text-xs sm:text-sm text-gradient-gold tracking-widest uppercase hidden sm:block opacity-70">Real Estate Blockchain</p>
            </div>
          </div>

        </div>
      </div>
    </motion.header>
  )
}

export default Header