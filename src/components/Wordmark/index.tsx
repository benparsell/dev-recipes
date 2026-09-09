import { cn } from '@/utilities/ui'
import * as React from 'react'

export interface WordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Cap size of the serif word in px; everything else scales from it. @default 26 */
  size?: number
  /** ink = on paper, inverse = on ink/photography, mono = inherits currentColor. @default "ink" */
  tone?: 'ink' | 'inverse' | 'mono'
  /** lockup = one line, stacked = two lines, monogram = square DR tile. @default "lockup" */
  variant?: 'lockup' | 'stacked' | 'monogram'
}

const TONES: Record<NonNullable<WordmarkProps['tone']>, { dev: string; slash: string; word: string }> = {
  ink: { dev: 'var(--ember-600)', slash: 'var(--ink-300)', word: 'var(--ink-900)' },
  inverse: { dev: 'var(--ember-300)', slash: 'rgba(253,251,247,.4)', word: 'var(--paper-1)' },
  mono: { dev: 'currentColor', slash: 'currentColor', word: 'currentColor' },
}

export const Wordmark: React.FC<WordmarkProps> = ({
  size = 26,
  tone = 'ink',
  variant = 'lockup',
  className,
  ...props
}) => {
  const t = TONES[tone]

  if (variant === 'monogram') {
    return (
      <span
        className={cn('inline-grid place-items-center rounded-[6px] font-mono font-bold', className)}
        style={{
          width: size,
          height: size,
          background: tone === 'inverse' ? 'var(--paper-1)' : 'var(--ember-600)',
          color: tone === 'inverse' ? 'var(--ember-700)' : '#fff6ef',
          fontSize: Math.round(size * 0.42),
          lineHeight: 1,
          letterSpacing: '.02em',
        }}
        {...props}
      >
        DR
      </span>
    )
  }

  const dev = (
    <span
      className="font-mono font-bold uppercase"
      style={{ fontSize: Math.round(size * 0.44), lineHeight: 1, letterSpacing: '.16em', color: t.dev }}
    >
      dev
    </span>
  )
  const slash = (
    <span
      className="font-mono"
      style={{ fontSize: Math.round(size * 0.62), lineHeight: 1, color: t.slash }}
    >
      /
    </span>
  )
  const word = (
    <span
      className="font-serif"
      style={{ fontSize: size, lineHeight: 1, letterSpacing: '-.03em', color: t.word }}
    >
      Recipes
    </span>
  )

  if (variant === 'stacked') {
    return (
      <span
        className={cn('inline-flex flex-col leading-none', className)}
        style={{ gap: Math.round(size * 0.12) }}
        {...props}
      >
        <span className="inline-flex items-center" style={{ gap: Math.round(size * 0.14) }}>
          {dev}
          {slash}
        </span>
        {word}
      </span>
    )
  }

  return (
    <span
      className={cn('inline-flex items-baseline leading-none', className)}
      style={{ gap: Math.round(size * 0.13) }}
      {...props}
    >
      {dev}
      {slash}
      {word}
    </span>
  )
}
