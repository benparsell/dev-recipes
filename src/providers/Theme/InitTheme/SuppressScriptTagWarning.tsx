'use client'

/* This just ignores a silly dev-only error message that pops up around switching locales */
const IGNORED_MESSAGE = 'Encountered a script tag while rendering React component'

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalConsoleError = console.error
  console.error = (...args: Parameters<typeof console.error>) => {
    if (typeof args[0] === 'string' && args[0].includes(IGNORED_MESSAGE)) {
      return
    }
    originalConsoleError(...args)
  }
}

export const SuppressScriptTagDevWarning: React.FC = () => null
