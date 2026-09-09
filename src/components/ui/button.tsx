'use client'

import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-sans text-sm font-semibold tracking-[-0.01em] transition-[color,background-color,border-color,box-shadow,transform] duration-[140ms] ease-standard active:translate-y-px disabled:pointer-events-none disabled:opacity-45 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-900",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground border border-ember-700 shadow-1 hover:bg-ember-700',
        destructive:
          'bg-destructive text-destructive-foreground border border-chili-700 shadow-1 hover:bg-chili-700',
        outline:
          'border border-line-2 bg-card text-foreground shadow-1 hover:bg-paper-2 hover:border-line-3',
        secondary: 'bg-secondary text-secondary-foreground border border-transparent hover:bg-paper-3',
        ghost: 'border border-transparent text-ink-700 hover:bg-paper-2',
        link: 'text-ember-700 underline-offset-4 hover:underline hover:text-ember-500',
      },
      size: {
        clear: '',
        default: 'h-10 px-4 has-[>svg]:px-3',
        sm: 'h-8 rounded-control px-3 text-[13px] has-[>svg]:px-2.5',
        lg: 'h-[50px] rounded-control px-[22px] text-base has-[>svg]:px-4',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button: React.FC<ButtonProps> = ({ asChild = false, className, size, variant, ...props }) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
