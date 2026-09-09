'use client'

import { cn } from '@/utilities/ui'
import * as React from 'react'

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'> {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (next: boolean) => void
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  disabled,
  className,
  ...props
}) => {
  const [inner, setInner] = React.useState(defaultChecked)
  const isOn = checked !== undefined ? checked : inner

  const toggle = () => {
    if (disabled) return
    if (checked === undefined) setInner(!isOn)
    onChange?.(!isOn)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      data-slot="switch"
      disabled={disabled}
      onClick={toggle}
      className={cn(
        'inline-flex h-[23px] w-10 shrink-0 items-center rounded-chip border p-0.5 transition-colors duration-[140ms] ease-standard disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-900',
        isOn ? 'border-ember-700 bg-primary' : 'border-line-3 bg-paper-3',
        className,
      )}
      {...props}
    >
      <span
        data-slot="switch-thumb"
        className={cn(
          'block size-[17px] rounded-full bg-paper-0 shadow-1 transition-transform duration-[140ms] ease-standard',
          isOn ? 'translate-x-[17px]' : 'translate-x-0',
        )}
      />
    </button>
  )
}

export { Switch }
