const plugin = require('tailwindcss/plugin');

const sveltePut = plugin(
  ({ addComponents, addUtilities, addBase }) => {
    addBase({
      'h1,h2,h3,h4,h5,h6': {
        '@apply relative': {},
        '& .heading-anchor': {
          '@apply text-primary absolute top-0 bottom-0 right-full opacity-0 transition-opacity duration-150 mr-1':
            {},
          'text-decoration': 'none',
          'font-weight': 'inherit',
        },
        '&:hover .heading-anchor': {
          '@apply opacity-100': {},
        },
      },
    });

    addUtilities({
      '.bg-gradient-brand': {
        '@apply bg-gradient-to-r from-svelte to-[#42b883]': {},
      },
      '.text-gradient-brand': {
        '@apply bg-gradient-brand bg-clip-text text-transparent': {},
      },
      '.inset-center': {
        '@apply top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2': {},
      },
    });
    addComponents({
      '.c-badge': {
        '@apply rounded-lg text-white px-1.5 py-px': {},
      },
      '.c-badge-primary': {
        '@apply c-badge bg-primary': {},
      },
      '.c-badge-secondary': {
        '@apply c-badge bg-secondary': {},
      },
      '.c-badge-gray': {
        '@apply c-badge bg-gray-500': {},
      },
      '.c-badge-red': {
        '@apply c-badge bg-red-500': {},
      },
      '.c-badge-blue': {
        '@apply c-badge bg-blue-500': {},
      },
      '.c-container': {
        '@apply mx-auto w-full px-3 md:px-5 lg:px-8 max-w-[1440px]': {},
      },
      '.c-link': {
        '@apply text-fg hover:text-primary data-current:text-primary': {},
      },
      '.c-link-bg': {
        '@apply data-current:text-primary data-current:hover:text-white hover:bg-primary hover:text-white':
          {},
      },
    });
  },
  {
    theme: {
      extend: {
        typography: ({ theme }) => ({
          DEFAULT: {
            css: {
              h1: {
                'font-size': '2rem',
              },
              'h1,h2,h3,h4,h5,h6': {
                'scroll-margin-top': theme('spacing.header'),
              },
              a: {
                'text-decoration': 'none',
                'font-weight': 'inherit',
                color: theme('colors.primary'),
                '&:hover': {
                  'text-decoration': 'underline',
                },
              },
              code: {
                color: theme('colors.primary'),
                'background-color': theme('colors.bg.accent'),
                'font-weight': 'inherit',
                display: 'inline-block',
                padding: `0 ${theme('spacing.2')}`,
                'border-radius': theme('borderRadius.DEFAULT'),
              },
            },
          },
        }),
        fontFamily: {
          fira: ['Fira Code', 'monospace'],
          inter: ['Inter VF', 'Inter', 'sans-serif'],
        },
        spacing: {
          header: 'var(--header-height)',
          sidebar: 'var(--sidebar-width)',
        },
        data: {
          current: 'current="true"',
        },
        backgroundImage: {
          paper: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        },
        colors: {
          fg: '#3c3836',
          bg: {
            DEFAULT: '#fbf1c7',
            accent: '#ebdbb2',
          },
          border: '#d5c4a1',
          primary: '#d65d03',
          svelte: '#ef4623',
          secondary: '#98971a',
          code: {
            fg: '#e5e7eb',
            bg: '#46433e',
          },
        },
        keyframes: {
          'fade-in-up': {
            '0%': {
              opacity: '0',
              transform: 'translateY(100px)',
            },
            '100%': {
              opacity: '1',
              transform: 'translateY(0)',
            },
          },
        },
        animation: {
          'fade-in-up': 'fade-in-up 500ms ease-out',
        },
        zIndex: {
          // modal: '80', // a modal/dialog
          header: '90', // top-fixed navbar
          // float: '100', // floating buttons and such
          // tooltip: '120', // tooltip
          // overlay: '150', // a full screen overlay
          // command: '200', // command palette
          // notification: '300', // notification
        },
      },
    },
  },
);

/** @type {import("tailwindcss").Config } */
const config = {
  content: ['./src/**/*.{html,js,svelte,ts,md}', 'svelte.config.js'],
  plugins: [sveltePut, require('@tailwindcss/typography')],
};

module.exports = config;
