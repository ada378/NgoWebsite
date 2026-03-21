export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A1A1A',
          50: '#F5F5F5', 100: '#E5E5E5', 200: '#CCCCCC', 300: '#999999',
          400: '#666666', 500: '#333333', 600: '#1A1A1A', 700: '#000000',
          800: '#000000', 900: '#000000'
        },
        secondary: {
          DEFAULT: '#D4A84B',
          50: '#FFF8E1', 100: '#FFECB3', 200: '#FFE082', 300: '#FFD54F',
          400: '#FFCA28', 500: '#D4A84B', 600: '#C4900D', 700: '#A66D00',
          800: '#875400', 900: '#6B3C00'
        },
        accent: '#E74C3C',
        background: '#0A0A0A',
        card: '#141414',
        success: '#10B981'
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeInDown: { '0%': { opacity: '0', transform: 'translateY(-20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        gradient: { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
      },
    },
  },
  plugins: [],
}
