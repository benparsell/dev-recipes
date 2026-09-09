import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardRecipeData } from '@/components/Card'
import type { Locale } from '@/utilities/i18n'

export type Props = {
  locale: Locale
  recipes: CardRecipeData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { locale, recipes } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recipes?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <Card
                  className="h-full"
                  doc={result}
                  key={index}
                  locale={locale}
                  relationTo="recipes"
                  showCategories
                />
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
