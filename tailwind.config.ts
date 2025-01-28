import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  prefix: '',
  theme: {
    extend: {
      colors: {
        cream: '#FAF9F5'
      }
    },
    fontFamily: {
      satoshi: ['Satoshi', 'san-serif']
    }
  },
  plugins: []
}
export default config
