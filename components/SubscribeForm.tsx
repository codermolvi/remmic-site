'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

const SubscribeForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Thank you for subscribing! We\'ll keep you updated.')
        setEmail('')
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 5000)
      } else {
        setStatus('error')
        setMessage(data.message || 'Something went wrong. Please try again.')
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 3000)
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    }
  }

  return (
    <motion.div
      id="subscribe-form" data-subscribe
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="w-full max-w-md mx-auto mt-8 px-4"
    >
      <h3 className="text-gradient-gold text-center text-lg md:text-xl mb-6 font-display tracking-wider">
        BE THE FIRST TO KNOW
      </h3>

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-6 py-4 bg-premium-charcoal-light/50 backdrop-blur-sm 
                     text-white placeholder-gray-400 
                     border border-premium-gold/30 rounded-lg
                     focus:outline-none focus:border-premium-gold
                     transition-all duration-300
                     group-hover:border-premium-gold/50"
            disabled={status === 'loading'}
          />
          
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`absolute right-2 top-1/2 -translate-y-1/2 
                     px-6 py-2 rounded-md
                     bg-gradient-to-r from-premium-gold to-premium-gold-dark
                     hover:from-premium-gold-dark hover:to-premium-gold
                     text-premium-charcoal font-semibold
                     transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-lg hover:shadow-premium-gold/20`}
          >
            {status === 'loading' ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-premium-charcoal border-t-transparent rounded-full"
              />
            ) : (
              <Send size={20} />
            )}
          </motion.button>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
              status === 'success' 
                ? 'bg-green-900/30 text-green-400 border border-green-400/30'
                : 'bg-red-900/30 text-red-400 border border-red-400/30'
            }`}
          >
            {status === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span className="text-sm">{message}</span>
          </motion.div>
        )}
      </form>

      <p className="text-center text-gradient-white text-sm mt-4 opacity-60">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </motion.div>
  )
}

export default SubscribeForm