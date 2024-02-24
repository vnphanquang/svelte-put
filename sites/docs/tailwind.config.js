import sveltevietnam from '@sveltevietnam/ui/css/tailwind';

/** @type {import("tailwindcss").Config } */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,md}', 'svelte.config.js'],
	presets: [...sveltevietnam],
};
