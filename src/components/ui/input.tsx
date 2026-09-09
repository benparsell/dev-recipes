import { cn } from '@/utilities/ui'
import * as React from 'react'

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  type,
  ...props
}) => {
  return (
    <input
      data-slot="input"
      className={cn(
        'border-line-2 file:text-foreground placeholder:text-ink-400 selection:bg-primary selection:text-primary-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 flex h-[42px] w-full min-w-0 rounded-control border bg-card px-3 py-1 font-sans text-[15px] text-foreground shadow-1 transition-[color,border-color,box-shadow] duration-[140ms] ease-standard file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:border-ink-900 focus-visible:ring-[3px] focus-visible:ring-ember-100 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 aria-invalid:focus-visible:ring-destructive/30 md:text-sm',
        className,
      )}
      type={type}
      {...props}
    />
  )
}

export { Input }
