module.exports = {
  ...require('@svelte-put/prettierrc'),
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.cjs',
};
