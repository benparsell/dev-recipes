import React from 'react'

import type { ShoppingListBlock as ShoppingListBlockProps } from '@/payload-types'

import { ShoppingListClient } from './Component.client'

export const ShoppingListBlock: React.FC<ShoppingListBlockProps> = ({ heading }) => {
  return (
    <div className="container">
      <div className="bg-card rounded border-border border p-4 max-w-[44rem]">
        {heading && <h2 className="text-lg font-semibold mb-4">{heading}</h2>}
        <ShoppingListClient />
      </div>
    </div>
  )
}
