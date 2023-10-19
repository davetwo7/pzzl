import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'ranade-variable': ['Ranade-Variable', 'sans'],
        'ranade-variable-italic': ['Ranade-VariableItalic', 'sans'],
        'ranade-thin': ['Ranade-Thin', 'sans'],
        'ranade-thin-italic': ['Ranade-ThinItalic', 'sans'],
        'ranade-light': ['Ranade-Light', 'sans'],
        'ranade-light-italic': ['Ranade-LightItalic', 'sans'],
        'ranade-regular': ['Ranade-Regular', 'sans'],
        'ranade-italic': ['Ranade-Italic', 'sans'],
        'ranade-medium': ['Ranade-Medium', 'sans'],
        'ranade-medium-italic': ['Ranade-MediumItalic', 'sans'],
        'ranade-bold': ['Ranade-Bold', 'sans'],
        'ranade-bold-italic': ['Ranade-BoldItalic', 'sans'],
      }
    },
  },
  plugins: [],
}
export default config
