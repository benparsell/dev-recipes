'use client'

import { cn } from '@/utilities/ui'
import * as React from 'react'

export interface TabItem {
  value: string
  label: string
  icon?: React.ReactNode
  count?: number
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

const Tabs: React.FC<TabsProps> = ({ items, value, defaultValue, onChange, className, ...props }) => {
  const [inner, setInner] = React.useState(defaultValue ?? items[0]?.value)
  const active = value !== undefined ? value : inner

  const pick = (v: string) => {
    if (value === undefined) setInner(v)
    onChange?.(v)
  }

  return (
    <div
      role="tablist"
      data-slot="tabs"
      className={cn('flex gap-1 border-b border-line-1', className)}
      {...props}
    >
      {items.map((item) => {
        const isActive = item.value === active
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => pick(item.value)}
            className={cn(
              'inline-flex items-center gap-[7px] px-3 pt-2.5 pb-3 font-sans text-sm transition-colors duration-[140ms] ease-standard',
              isActive
                ? 'font-semibold text-foreground shadow-[inset_0_-2px_0_var(--ember-600)]'
                : 'font-medium text-muted-foreground',
            )}
          >
            {item.icon}
            {item.label}
            {item.count !== undefined && (
              <span className="font-mono text-[11px] text-ink-400">{item.count}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export { Tabs }
