import sveltevietnam from '@sveltevietnam/ui/css/tailwind';
import definePlugin from 'tailwindcss/plugin.js';

/** @type {import("tailwindcss").Config } */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,md}', 'svelte.config.js'],
	presets: [...sveltevietnam],
	plugins: [
		definePlugin(
			({ addUtilities, matchComponents }) => {
				addUtilities({
					'.bg-gradient-brand': {
						'@apply bg-gradient-to-r from-[#ef4623] to-[#42b883]': {},
					},
					'.text-gradient-brand': {
						'@apply w-fit bg-gradient-brand bg-clip-text text-transparent': {},
					},
				});
				const tableCols = Object.fromEntries(
					new Array(10).fill(0).map((v, i) => [v + i + 1, v + i + 1]),
				);
				matchComponents(
					{
						'c-gtable': (col) => ({
							'@apply grid rounded overflow-auto bg-grayscale-50 dark:bg-grayscale-950': {},
							'grid-template-columns': `repeat(${col}, auto)`,
							'& > *': {
								'@apply border-b border-l border-outline h-full p-2': {},
							},
							// first row
							[`& > *:nth-child(-n+${col})`]: {
								'@apply border-t-0 font-bold bg-grayscale-100 dark:bg-grayscale-900': {},
							},
							// last row
							[`& > *:nth-last-child(-n+${col})`]: {
								'@apply border-b-0': {},
							},
							// first col
							[`& > *:nth-child(${col}n+1)`]: {
								'@apply border-l-0': {},
							},
							// last col
							[`& > *:nth-child(${col}n+${col})`]: {
								'@apply border-r-0': {},
							},
						}),
					},
					{
						values: tableCols,
						supportsNegativeValues: false,
					},
				);
			},
			{
				theme: {
					lineHeight: {
						unset: 'unset',
					},
					extend: {
						fontFamily: {
							fingerpaint: ['Finger Paint', 'sans-serif'],
						},
						spacing: {
							sidebar: 'var(--sidebar-width)',
						},
						screens: {
							'upto-lg': {
								max: '1023px',
							},
							'upto-xl': {
								max: '1279px',
							},
						},
					},
				},
			},
		),
	],
};

