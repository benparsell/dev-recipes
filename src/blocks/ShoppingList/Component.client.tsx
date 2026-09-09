'use client'

import React, { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/ui'

// Sample data for now — real implementation will be backed by a
// per-user data model rather than Payload-managed content.
const SAMPLE_ITEMS = [
  { id: '1', label: '2 lbs chicken thighs' },
  { id: '2', label: 'Basmati rice' },
  { id: '3', label: 'Coconut milk' },
  { id: '4', label: 'Fresh cilantro' },
  { id: '5', label: 'Limes' },
  { id: '6', label: 'Garlic' },
  { id: '7', label: 'Ginger' },
  { id: '8', label: 'Curry powder' },
]

export const ShoppingListClient: React.FC = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <ul className="flex flex-col gap-3">
      {SAMPLE_ITEMS.map((item) => (
        <li key={item.id} className="flex items-center gap-3">
          <Checkbox
            id={`shopping-list-item-${item.id}`}
            checked={Boolean(checked[item.id])}
            onCheckedChange={() => toggle(item.id)}
          />
          <Label
            htmlFor={`shopping-list-item-${item.id}`}
            className={cn(checked[item.id] && 'line-through text-ink-400')}
          >
            {item.label}
          </Label>
        </li>
      ))}
    </ul>
  )
}
