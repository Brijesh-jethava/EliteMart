module.exports = {
	content: [
	  "./src/**/*.{js,jsx,ts,tsx}", // Specify your files for Tailwind CSS
	  "./public/index.html",
	  "*"
	],
	theme: {
	  extend: {
		colors: {
			muted: '#f3f4f6',         // Example muted color
			foreground: '#1f2937',   // Example foreground color
			"muted-foreground": '#4b5563', // Example muted-foreground text color
			
		  },
	  },
	},
	plugins: [],
  };
  