/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Theme Palette
        'theme-dark': '#0A0A0A',      // Deep luxury black primary background
        'theme-gold': '#D4AF37',      // Classic gold primary accent
        'theme-lavender': '#E6E6FA',  // Light lavender for text/highlights
        'theme-forest': '#041004',    // Deep forest green for depth
        'theme-white': '#F8F9FA',     // White metallic for premium text
        
        // Extended Gold Palette
        'gold': {
          50: '#FFF9E6',
          100: '#FFEC99',
          200: '#FFDF4D',
          300: '#FFD700',   // Bright gold
          400: '#F4C430',   // Medium gold
          500: '#D4AF37',   // Primary gold
          600: '#B8860B',   // Dark goldenrod
          700: '#996F00',   // Darker gold
          800: '#7A5900',   // Deep gold
          900: '#5C4300',   // Darkest gold
        },
        
        // Extended Grey Palette
        'theme-grey': {
          50: '#F8F9FA',
          100: '#E6E6FA',  // Lavender
          200: '#D1D5DB',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#4B5563',
          600: '#374151',
          700: '#0A0A0A',  // Primary dark
          800: '#1F2937',
          900: '#041004',  // Forest green-black
        },
        
        // Extended Forest/Green Palette
        'forest': {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#041004',  // Primary forest
        },
        
        // Legacy premium colors for compatibility
        premium: {
          gold: '#D4AF37',
          'gold-light': '#FFD700',
          'gold-dark': '#B8860B',
          charcoal: '#0A0A0A',
          'charcoal-light': '#041004',
          'charcoal-dark': '#041004',
          gray: {
            50: '#F9F9F9',
            100: '#F0F0F0',
            200: '#E0E0E0',
            300: '#E6E6FA',
            400: '#E6E6FA',
            500: '#808080',
            600: '#606060',
            700: '#404040',
            800: '#303030',
            900: '#202020'
          }
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Cinzel', 'Georgia', 'serif'],
        'gretta': ['Gretta', 'Great Vibes', 'cursive'],
        'luxury': ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        'dm-serif': ['DM Serif Display', 'Georgia', 'serif'],
        'archivo-black': ['Archivo Black', 'Arial Black', 'sans-serif']
      },
      animation: {
        'flip': 'flip 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(-90deg)' },
          '100%': { transform: 'rotateX(0deg)' }
        },
        glow: {
          'from': { boxShadow: '0 0 10px #D4AF37, 0 0 20px #D4AF37' },
          'to': { boxShadow: '0 0 20px #D4AF37, 0 0 30px #D4AF37' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' }
        }
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #041004 50%, #0A0A0A 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
      }
    },
  },
  plugins: [],
}