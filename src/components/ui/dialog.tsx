'use client'

import { cn } from '@/utilities/ui'
import * as React from 'react'

export interface DialogProps {
  open?: boolean
  title: React.ReactNode
  description?: string
  children?: React.ReactNode
  /** Right-aligned action row. */
  footer?: React.ReactNode
  onClose?: () => void
  /** @default 460 */
  width?: number
  className?: string
}

const Dialog: React.FC<DialogProps> = ({
  open = true,
  title,
  description,
  children,
  footer,
  onClose,
  width = 460,
  className,
}) => {
  const dialogRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[rgba(20,17,9,.38)] p-4 backdrop-blur-[14px] backdrop-saturate-150"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{ width, maxWidth: '92%' }}
        className={cn(
          'flex flex-col gap-3.5 rounded-sheet border border-line-1 bg-card p-6 shadow-4 outline-none',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h3 id="dialog-title" className="font-serif text-2xl leading-tight tracking-[-0.02em] text-foreground">
              {title}
            </h3>
            {description && <p className="m-0 text-sm leading-relaxed text-muted-foreground">{description}</p>}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close"
              className="font-mono text-lg leading-none text-muted-foreground"
            >
              ×
            </button>
          )}
        </div>
        {children}
        {footer && <div className="flex justify-end gap-2 pt-1">{footer}</div>}
      </div>
    </div>
  )
}

export { Dialog }
