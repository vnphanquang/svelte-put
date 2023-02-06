module.exports = {
  ...require('@vnphanquang/prettierrc'),
  plugins: [require('prettier-plugin-svelte'), require('prettier-plugin-tailwindcss')],
  pluginSearchDirs: false,
  tailwindConfig: './tailwind.config.cjs',
};
