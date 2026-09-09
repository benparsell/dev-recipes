'use client'

import { cn } from '@/utilities/ui'
import * as React from 'react'

export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  selected?: boolean
  onClick?: () => void
  /** Renders a × affordance that calls this handler. */
  onRemove?: () => void
}

const Tag: React.FC<TagProps> = ({
  children,
  className,
  selected = false,
  onClick,
  onRemove,
  ...props
}) => {
  const interactive = !!onClick

  return (
    <span
      data-slot="tag"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-[7px] rounded-chip border px-3 py-[6px] font-sans text-[13px] font-medium transition-[color,background-color,border-color] duration-[140ms] ease-standard',
        selected
          ? 'border-ink-900 bg-ink-900 text-paper-1'
          : 'border-line-2 bg-card text-ink-700',
        interactive && !selected && 'cursor-pointer hover:bg-paper-2',
        interactive && 'cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <span
          role="button"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="cursor-pointer font-mono text-[13px] opacity-60"
        >
          ×
        </span>
      )}
    </span>
  )
}

export { Tag }
