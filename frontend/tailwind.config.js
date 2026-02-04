/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        'apex-primary': '#0A0F2D', // Deep navy - main background
        'apex-secondary': '#00D4FF', // Bright cyan - accents, CTAs
        'apex-accent': '#8A2BE2', // Vibrant purple - highlights
        
        // Extended palette
        'apex-dark': '#050714', // Darker than primary for contrast
        'apex-light': '#1A1F3D', // Lighter variant of primary
        
        // Gradient colors
        'apex-gradient-start': '#00D4FF',
        'apex-gradient-middle': '#8A2BE2',
        'apex-gradient-end': '#FF0080',
        
        // UI Colors
        'apex-success': '#00FF88',
        'apex-warning': '#FFB800',
        'apex-danger': '#FF3860',
        'apex-info': '#00B0FF',
        
        // Text colors
        'apex-text': '#F8FAFC',
        'apex-text-light': '#CBD5E1',
        'apex-text-muted': '#94A3B8',
        
        // Surface colors
        'apex-surface': '#111827',
        'apex-surface-light': '#1F2937',
        'apex-surface-dark': '#030712',
        
        // Border colors
        'apex-border': '#2D3748',
        'apex-border-light': '#4B5563',
        
        // Modern alternatives (choose one set)
        'apex-neon': {
          blue: '#00F7FF',
          purple: '#AD00FF',
          pink: '#FF00E5',
          cyan: '#00FFB2',
        },
        
        // Muted professional set
        'apex-muted': {
          navy: '#1E293B',
          slate: '#334155',
          gray: '#475569',
          light: '#64748B',
        }
      },
      backgroundImage: {
        'apex-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'apex-gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'apex-gradient-horizontal': 'linear-gradient(90deg, #00D4FF 0%, #8A2BE2 50%, #FF0080 100%)',
        'apex-gradient-vertical': 'linear-gradient(180deg, #00D4FF 0%, #8A2BE2 100%)',
        'apex-gradient-diagonal': 'linear-gradient(45deg, #00D4FF, #8A2BE2)',
      },
      boxShadow: {
        'apex-glow': '0 0 20px rgba(0, 212, 255, 0.5)',
        'apex-glow-purple': '0 0 20px rgba(138, 43, 226, 0.5)',
        'apex-glow-pink': '0 0 20px rgba(255, 0, 128, 0.5)',
        'apex-glow-cyan': '0 0 30px rgba(0, 212, 255, 0.7)',
        'apex-inner-glow': 'inset 0 0 20px rgba(0, 212, 255, 0.3)',
      },
      animation: {
        'apex-pulse': 'apex-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'apex-glow': 'apex-glow 2s ease-in-out infinite alternate',
        'apex-shimmer': 'apex-shimmer 2s linear infinite',
      },
      keyframes: {
        'apex-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'apex-glow': {
          'from': { 'box-shadow': '0 0 10px #00D4FF' },
          'to': { 'box-shadow': '0 0 30px #00D4FF, 0 0 40px #8A2BE2' },
        },
        'apex-shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}