'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Shield, Users, TrendingUp, Lock, Globe } from 'lucide-react'

const Features: React.FC = () => {
  const features = [
    {
      icon: Building2,
      title: 'Premium Properties',
      description: 'Exclusive access to Premium real estate investments',
      gradient: 'from-premium-gold to-premium-gold-dark'
    },
    {
      icon: Shield,
      title: 'Blockchain Technology',
      description: 'Secure, transparent, and innovative investment platform',
      gradient: 'from-premium-gold-dark to-premium-gold'
    },
    {
      icon: Users,
      title: 'Fractional Ownership',
      description: 'Own shares in premium properties with flexible investment',
      gradient: 'from-premium-gold to-premium-gold-light'
    }
  ]


  return (
    <section id="features" className="py-20 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-6"
          >
            Experience the Future of
            <span className="block text-premium-gold mt-2">Premium Real Estate Investment</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-premium-gray-400 text-lg md:text-xl max-w-3xl mx-auto"
          >
            Our revolutionary platform combines premium properties with cutting-edge blockchain 
            technology to deliver unprecedented opportunities.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="bg-premium-charcoal-light/30 backdrop-blur-sm border border-premium-gold/20 
                          rounded-xl p-8 h-full transition-all duration-300
                          hover:border-premium-gold/40 hover:bg-premium-charcoal-light/50">
                
                {/* Icon */}
                <div className="mb-6 relative">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${feature.gradient} 
                                 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-premium-charcoal" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 rounded-lg bg-premium-gold/20 blur-xl 
                                group-hover:bg-premium-gold/30 transition-all duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-premium-gray-400 leading-relaxed">{feature.description}</p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-premium-gold/0 to-premium-gold/5 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>


        {/* Additional Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex items-start gap-4"
          >
            <Lock className="w-6 h-6 text-premium-gold mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-white font-semibold mb-2">Bank-Grade Security</h4>
              <p className="text-premium-gray-400 text-sm">
                Multi-signature wallets and institutional-grade custody solutions protect your investments
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex items-start gap-4"
          >
            <TrendingUp className="w-6 h-6 text-premium-gold mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-white font-semibold mb-2">Proven Returns</h4>
              <p className="text-premium-gray-400 text-sm">
                Historical average returns of 12-18% annually on premium real estate investments
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex items-start gap-4"
          >
            <Globe className="w-6 h-6 text-premium-gold mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-white font-semibold mb-2">Global Opportunities</h4>
              <p className="text-premium-gray-400 text-sm">
                Access premium properties in major cities worldwide from a single platform
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="flex items-start gap-4"
          >
            <Users className="w-6 h-6 text-premium-gold mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-white font-semibold mb-2">Community Driven</h4>
              <p className="text-premium-gray-400 text-sm">
                Join an exclusive network of sophisticated investors and industry experts
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Features