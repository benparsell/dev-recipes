'use client'

import { cn } from '@/utilities/ui'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import * as React from 'react'

const Checkbox: React.FC<React.ComponentProps<typeof CheckboxPrimitive.Root>> = ({
  className,
  ...props
}) => (
  <CheckboxPrimitive.Root
    data-slot="checkbox"
    className={cn(
      'peer border-line-3 data-[state=checked]:bg-ember-600 data-[state=checked]:text-control-primary-fg data-[state=checked]:border-ember-700 size-[18px] shrink-0 rounded-badge border bg-card shadow-1 transition-[color,background-color,border-color] duration-[140ms] ease-standard focus-visible:border-ink-900 focus-visible:ring-[3px] focus-visible:ring-ember-100 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="flex items-center justify-center text-current"
    >
      <Check className="size-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)

export { Checkbox }
