import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const badgeVariants = cva(
  'inline-flex items-center gap-[5px] rounded-badge border px-2 py-[3px] font-mono text-[11px] font-semibold leading-[1.35] tracking-[0.09em]',
  {
    variants: {
      tone: {
        neutral: 'bg-paper-2 text-ink-700 border-line-2',
        accent: 'bg-ember-50 text-ember-700 border-ember-200',
        success: 'bg-basil-50 text-basil-700 border-basil-100',
        warning: 'bg-saffron-100 text-saffron-700 border-saffron-100',
        danger: 'bg-chili-100 text-chili-700 border-chili-100',
        info: 'bg-stock-100 text-stock-700 border-stock-100',
        inverse: 'bg-ink-900 text-paper-1 border-ink-900',
      },
      uppercase: {
        true: 'uppercase',
        false: '',
      },
    },
    defaultVariants: {
      tone: 'neutral',
      uppercase: true,
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
}

const Badge: React.FC<BadgeProps> = ({ children, className, icon, tone, uppercase, ...props }) => (
  <span data-slot="badge" className={cn(badgeVariants({ tone, uppercase }), className)} {...props}>
    {icon}
    {children}
  </span>
)

export { Badge, badgeVariants }
