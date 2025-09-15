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
			primary: '#09366D',
			secondary: '#00A6DB',
			no: '#E15E60',
			yes: '#009933',
			fav: '#F3CC0B',
			muted: '#F3F4F4',
			background: '#FFFFFF',
			foreground: '#000000',
		  }
	  }
	},
	plugins: [import("tailwindcss-animate")],
  }