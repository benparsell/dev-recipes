import { cn } from '@/utilities/ui'
import * as React from 'react'

const TOAST_TONES = {
  default: 'bg-ink-900',
  success: 'bg-basil-600',
  danger: 'bg-chili-500',
} as const

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  message: React.ReactNode
  /** Uppercase mono action label, e.g. "Undo". */
  action?: string
  onAction?: () => void
  tone?: keyof typeof TOAST_TONES
  icon?: React.ReactNode
}

const Toast: React.FC<ToastProps> = ({
  message,
  action,
  onAction,
  tone = 'default',
  icon,
  className,
  ...props
}) => (
  <div
    role="status"
    data-slot="toast"
    className={cn(
      'inline-flex items-center gap-3 rounded-[10px] py-[11px] pr-3 pl-4 font-sans text-sm font-medium text-paper-1 shadow-4',
      TOAST_TONES[tone],
      className,
    )}
    {...props}
  >
    {icon}
    <span>{message}</span>
    {action && (
      <button
        onClick={onAction}
        className="rounded-badge border border-white/28 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.09em] text-paper-1 uppercase"
      >
        {action}
      </button>
    )}
  </div>
)

export { Toast }
