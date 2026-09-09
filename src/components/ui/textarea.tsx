import { cn } from '@/utilities/ui'
import * as React from 'react'

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-line-2 placeholder:text-ink-400 aria-invalid:border-destructive aria-invalid:ring-destructive/20 flex field-sizing-content min-h-16 w-full rounded-control border bg-card px-3 py-2 font-sans text-[15px] text-foreground shadow-1 transition-[color,border-color,box-shadow] duration-[140ms] ease-standard focus-visible:border-ink-900 focus-visible:ring-[3px] focus-visible:ring-ember-100 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
