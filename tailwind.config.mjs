/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--ink-800)',
              '--tw-prose-headings': 'var(--ink-900)',
              '--tw-prose-lead': 'var(--ink-500)',
              '--tw-prose-links': 'var(--ember-700)',
              '--tw-prose-bold': 'var(--ink-900)',
              '--tw-prose-counters': 'var(--ink-500)',
              '--tw-prose-bullets': 'var(--line-3)',
              '--tw-prose-hr': 'var(--line-1)',
              '--tw-prose-quotes': 'var(--ink-800)',
              '--tw-prose-quote-borders': 'var(--ember-300)',
              '--tw-prose-captions': 'var(--ink-500)',
              '--tw-prose-code': 'var(--ink-900)',
              '--tw-prose-pre-code': 'var(--paper-1)',
              '--tw-prose-pre-bg': 'var(--ink-900)',
              '--tw-prose-th-borders': 'var(--line-2)',
              '--tw-prose-td-borders': 'var(--line-1)',
              maxWidth: '66ch',
              fontFamily: 'var(--font-sans)',
              a: {
                fontWeight: 500,
                textDecoration: 'none',
                borderBottom: '1px solid color-mix(in oklab, var(--ember-700) 35%, transparent)',
              },
              'h1, h2, h3, h4': {
                fontFamily: 'var(--font-serif)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              },
              h1: {
                marginBottom: '0.25em',
              },
              code: {
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 400,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      },
    },
  },
}

export default config
