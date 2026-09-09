import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const iconButtonVariants = cva(
  'inline-grid shrink-0 place-items-center rounded-control transition-[color,background-color,border-color,transform] duration-[140ms] ease-standard active:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-900',
  {
    variants: {
      variant: {
        ghost: 'border border-transparent text-ink-700 hover:bg-paper-2',
        outline: 'border border-line-2 bg-card text-ink-700 hover:bg-paper-2',
        solid:
          'border border-ember-700 bg-primary text-primary-foreground hover:bg-ember-700',
      },
      size: {
        sm: 'size-7',
        md: 'size-9',
        lg: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'md',
    },
  },
)

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode
  /** Accessible name — required, since there is no visible label. */
  label: string
  /** Toggle state, e.g. a saved recipe. */
  pressed?: boolean
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  variant,
  size,
  pressed = false,
  className,
  ...props
}) => (
  <button
    type="button"
    aria-label={label}
    aria-pressed={pressed}
    data-slot="icon-button"
    className={cn(
      iconButtonVariants({ variant, size }),
      pressed && variant !== 'solid' && 'bg-paper-3',
      className,
    )}
    {...props}
  >
    {icon}
  </button>
)

export { IconButton, iconButtonVariants }
