/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		maxWidth: {
			'1248': '1248px',
		},
		fontFamily: {
		  sans: ['Roboto', 'sans-serif']
		},
		colors: {
		  primary: '#00A676',
		  secondary: '#1D8439',
		  accent: '#952E0D',
		  muted: '#F5F5F5',
		  background: '#FFFFFF',
		  foreground: '#000000',
		  like: '#ED1C24',
		  
		}
	  }
	},
	plugins: [import("tailwindcss-animate")],
  }