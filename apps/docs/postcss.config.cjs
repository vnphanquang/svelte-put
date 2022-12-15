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
        /**
         * @example
         *
         * default (selector is html)
         *
         * ```css
         * @mixin dark {
         *   something
         * }
         * ```
         *
         * with custom selector (appended as children to html)
         *
         * ```css
         * @mixin dark .selector {
         *   something
         * }
         * ```
         *
         * In context of svelte style tag, add second param `global`
         *
         * ```css
         * @mixin dark .selector, global {
         *   something
         * }
         * ```
         */
        dark: function (mixin, selector, global) {
          function createSelector(base, selector, global) {
            selector = selector ? ` ${selector}` : '';
            if (global) {
              return `:global(${base})${selector}`;
            }
            return `${base}${selector}`;
          }
          const plainRule = postcss.rule({
            selector: createSelector('html[data-color-scheme="dark"]', selector, global),
            nodes: mixin.nodes,
          });
          const mediaRule = postcss.atRule({
            name: 'media',
            params: '(prefers-color-scheme: dark)',
            nodes: [
              postcss.rule({
                selector: createSelector('html:not([data-color-scheme="light"])', selector, global),
                nodes: mixin.nodes,
              }),
            ],
          });
          mixin.replaceWith([plainRule, mediaRule]);
        },
      },
    },
    'tailwindcss/nesting': 'postcss-nesting',
    autoprefixer: {},
    tailwindcss: {},
    cssnano: {},
  },
};
