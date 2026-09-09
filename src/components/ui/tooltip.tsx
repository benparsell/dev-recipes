'use client'

import { cn } from '@/utilities/ui'
import * as React from 'react'

export interface TooltipProps {
  label: string
  children: React.ReactNode
  placement?: 'top' | 'bottom'
  className?: string
}

const Tooltip: React.FC<TooltipProps> = ({ label, children, placement = 'top', className }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className={cn(
            'pointer-events-none absolute left-1/2 z-40 -translate-x-1/2 rounded-badge bg-ink-900 px-2 py-[5px] font-sans text-xs font-medium whitespace-nowrap text-paper-1 shadow-3',
            placement === 'bottom' ? 'top-[calc(100%+6px)]' : 'bottom-[calc(100%+6px)]',
          )}
        >
          {label}
        </span>
      )}
    </span>
  )
}

export { Tooltip }
