const path = require('path');

const postcss = require('postcss');

module.exports = {
  plugins: {
    'postcss-import': {
      resolve(id, basedir) {
        if (id.startsWith('$')) {
          return path.resolve(__dirname, 'src/lib/ui/styles/', id.slice(1));
        }
        return path.resolve(basedir, id);
      },
    },
    'postcss-mixins': {
      mixins: {
        dark: function (mixin, selector) {
          const rule = postcss.rule({ selector: `:global(.dark) ${selector}` });
          rule.append(mixin.nodes);
          mixin.replaceWith(rule);
        },
      },
    },
    'tailwindcss/nesting': 'postcss-nesting',
    autoprefixer: {},
    tailwindcss: {},
    cssnano: {},
  },
};
