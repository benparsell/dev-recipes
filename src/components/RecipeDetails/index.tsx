import React from 'react'

import type { Recipe } from '@/payload-types'

import { Checkbox } from '@/components/ui/checkbox'

type Ingredient = NonNullable<Recipe['ingredients']>[number]
type Instruction = NonNullable<Recipe['instructions']>[number]

export const RecipeDetails: React.FC<{
  className?: string
  ingredients?: Ingredient[] | null
  instructions?: Instruction[] | null
}> = ({ className, ingredients, instructions }) => {
  const hasIngredients = ingredients && ingredients.length > 0
  const hasInstructions = instructions && instructions.length > 0

  if (!hasIngredients && !hasInstructions) return null

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        {hasIngredients && (
          <div className="lg:col-span-1">
            <div className="rounded-card border border-line-1 bg-card p-5 shadow-2 lg:sticky lg:top-[88px]">
              <h2 className="mb-4 font-serif text-xl tracking-[-0.02em] text-foreground">
                Ingredients
              </h2>
              <ul className="flex flex-col gap-3">
                {ingredients.map((ingredient, index) => {
                  const { amount, unit, item } = ingredient
                  const measurement = [amount, unit].filter(Boolean).join(' ')

                  return (
                    <li className="flex items-start gap-2.5" key={index}>
                      <Checkbox aria-label={`Mark ${item} as done`} className="mt-0.5 shrink-0" />
                      <span className="font-sans text-sm leading-snug text-ink-800">
                        {measurement && (
                          <span className="font-mono text-[13px] font-medium">{measurement} </span>
                        )}
                        {item}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )}

        {hasInstructions && (
          <div className={hasIngredients ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <h2 className="mb-4 font-serif text-xl tracking-[-0.02em] text-foreground">
              Instructions
            </h2>
            <ol className="flex flex-col gap-6">
              {instructions.map((instruction, index) => (
                <li className="flex gap-4" key={index}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-semibold text-accent-foreground">
                    {index + 1}
                  </span>
                  <p className="pt-1 font-sans text-[15px] leading-relaxed text-ink-800">
                    {instruction.step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
