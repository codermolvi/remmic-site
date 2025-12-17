'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react'

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/remmic.official?igsh=dnFhYmd1N2JnaDZl', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/remmic-admin?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/share/1HDPjhifLw/', label: 'Facebook' },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="mt-auto pt-20 pb-8 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-premium-gold/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-center md:text-left"
            >
              <h3 className="font-display text-2xl text-gradient-gold mb-2">REMMIC</h3>
              <p className="text-gradient-white text-sm opacity-80">
                Revolutionizing Real Estate Investment
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="flex gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                  className="w-10 h-10 rounded-full bg-premium-charcoal-light/50 
                           border border-premium-gold/30 
                           flex items-center justify-center
                           text-premium-gold hover:bg-premium-gold hover:text-premium-charcoal
                           transition-all duration-300
                           hover:shadow-lg hover:shadow-premium-gold/20"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-center md:text-right"
            >
              <p className="text-gradient-gold text-sm mb-1 opacity-70">
                © 2024 REMMIC. All rights reserved.
              </p>
              <div className="flex gap-4 text-gray-400 text-xs justify-center md:justify-end">
                <a href="#" className="text-gradient-gold opacity-60 hover:opacity-100 transition-opacity">
                  Privacy Policy
                </a>
                <span className="text-premium-gold/30">|</span>
                <a href="#" className="text-gradient-gold opacity-60 hover:opacity-100 transition-opacity">
                  Terms of Service
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-premium-gold/30 to-transparent"
        />
      </div>
    </motion.footer>
  )
}

export default Footer