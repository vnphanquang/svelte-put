import sveltevietnam from '@sveltevietnam/ui/css/tailwind';
import definePlugin from 'tailwindcss/plugin.js';

/** @type {import("tailwindcss").Config } */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,md}', 'svelte.config.js'],
	presets: [...sveltevietnam],
	plugins: [
		definePlugin(({ addUtilities }) => {
			addUtilities({
				'.bg-gradient-brand': {
					'@apply bg-gradient-to-r from-[#ef4623] to-[#42b883]': {},
				},
				'.text-gradient-brand': {
					'@apply w-fit bg-gradient-brand bg-clip-text text-transparent': {},
				},
			})
		}, {
			theme: {
				extend: {
					fontFamily: {
						fingerpaint: ['Finger Paint', 'sans-serif'],
					},
				},
			},
		}),
	]
};
