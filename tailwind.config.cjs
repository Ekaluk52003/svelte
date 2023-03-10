const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#1d4ed8',

					secondary: '#D926A9',

					accent: '#1FB2A6',

					neutral: '#191D24',

					'base-100': '#2A303C',

					info: '#3ABFF8',

					success: '#36D399',

					warning: '#FBBD23',

					error: '#F87272'
				}
			}
		]
	},

	plugins: [require('daisyui')]
};

module.exports = config;
