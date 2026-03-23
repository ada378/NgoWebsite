export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A0A0A',
          50: '#F5F5F5', 100: '#E5E5E5', 200: '#CCCCCC', 300: '#999999',
          400: '#666666', 500: '#333333', 600: '#1A1A1A', 700: '#0A0A0A',
          800: '#050505', 900: '#000000'
        },
        secondary: {
          DEFAULT: '#D4A84B',
          50: '#FFF8E1', 100: '#FFECB3', 200: '#FFE082', 300: '#FFD54F',
          400: '#FFCA28', 500: '#D4A84B', 600: '#C4900D', 700: '#A66D00',
          800: '#875400', 900: '#6B3C00'
        },
        accent: '#E74C3C',
        background: '#050505',
        card: '#0A0A0A',
        success: '#10B981',
        gold: '#D4A84B'
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-down': 'fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 4s ease-in-out infinite',
        'gradient': 'gradient 4s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeInDown: { '0%': { opacity: '0', transform: 'translateY(-30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-15px)' } },
        gradient: { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        'pulse-glow': { '0%, 100%': { boxShadow: '0 0 20px rgba(212,168,75,0.3)' }, '50%': { boxShadow: '0 0 40px rgba(212,168,75,0.5)' } },
        shimmer: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
      },
      boxShadow: {
        'glow': '0 0 30px rgba(212,168,75,0.3)',
        'glow-lg': '0 0 60px rgba(212,168,75,0.4)',
        'glow-sm': '0 0 15px rgba(212,168,75,0.2)',
        'inner-glow': 'inset 0 0 30px rgba(212,168,75,0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
