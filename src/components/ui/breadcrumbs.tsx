import { cn } from '@/utilities/ui'
import Link from 'next/link'
import * as React from 'react'

export interface Crumb {
  label: string
  href?: string
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: Crumb[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className, ...props }) => (
  <nav
    aria-label="Breadcrumb"
    data-slot="breadcrumbs"
    className={cn('flex flex-wrap items-center gap-2', className)}
    {...props}
  >
    {items.map((item, i) => {
      const isLast = i === items.length - 1
      return (
        <span key={i} className="inline-flex items-center gap-2">
          {i > 0 && <span className="font-mono text-[11px] text-ink-400">/</span>}
          <Link
            href={item.href || '#'}
            className={cn(
              'font-mono text-[11px] font-semibold tracking-[0.09em] uppercase no-underline',
              isLast ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {item.label}
          </Link>
        </span>
      )
    })}
  </nav>
)

export { Breadcrumbs }
