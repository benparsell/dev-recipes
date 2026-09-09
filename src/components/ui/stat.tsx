import { cn } from '@/utilities/ui'
import * as React from 'react'

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: React.ReactNode
  unit?: string
  icon?: React.ReactNode
  align?: 'left' | 'center'
}

const Stat: React.FC<StatProps> = ({
  label,
  value,
  unit,
  icon,
  align = 'left',
  className,
  ...props
}) => (
  <div
    data-slot="stat"
    className={cn(
      'flex flex-col gap-1',
      align === 'center' ? 'items-center' : 'items-start',
      className,
    )}
    {...props}
  >
    <span className="kicker inline-flex items-center gap-1.5">
      {icon}
      {label}
    </span>
    <span className="font-serif text-[28px] leading-[1.05] tracking-[-0.02em] text-foreground">
      {value}
      {unit && <span className="ml-1 font-mono text-[13px] font-medium text-muted-foreground">{unit}</span>}
    </span>
  </div>
)

export { Stat }
