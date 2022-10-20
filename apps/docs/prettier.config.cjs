module.exports = {
  ...require('@vnphanquang/prettierrc'),
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.cjs',
};
