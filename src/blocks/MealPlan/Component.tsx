import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { MealPlanBlock as MealPlanBlockProps } from '@/payload-types'

import { Card, type CardRecipeData } from '@/components/Card'
import type { Locale } from '@/utilities/i18n'

// Sample data drawn from the project's seed recipes — real implementation
// will let a user assign their own recipes to days rather than hardcoding them.
// Images are looked up live from the Media collection via each recipe's own
// heroImage/meta.image so they stay in sync with whatever is actually seeded.
const FALLBACK_RECIPES: Record<string, CardRecipeData> = {
  'classic-margherita-pizza': {
    slug: 'classic-margherita-pizza',
    title: 'Classic Margherita Pizza',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    meta: {
      description:
        'A blistered, chewy crust topped with sweet tomato sauce, fresh mozzarella, and basil.',
    },
  },
  'one-pot-creamy-tuscan-chicken': {
    slug: 'one-pot-creamy-tuscan-chicken',
    title: 'One-Pot Creamy Tuscan Chicken',
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    meta: {
      description:
        'Seared chicken thighs simmered in a garlicky sun-dried tomato and spinach cream sauce, all in a single pan.',
    },
  },
  'fudgy-dark-chocolate-brownies': {
    slug: 'fudgy-dark-chocolate-brownies',
    title: 'Fudgy Dark Chocolate Brownies',
    prepTime: 15,
    cookTime: 25,
    servings: 16,
    meta: {
      description:
        'Rich, glossy-topped brownies with a dense, fudgy center — no mixer required, just one bowl and a whisk.',
    },
  },
}

const RECIPE_SLUGS = Object.keys(FALLBACK_RECIPES)

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const MealPlanBlock: React.FC<MealPlanBlockProps & { locale: Locale }> = async ({
  heading,
  locale,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'recipes',
    depth: 1,
    locale,
    where: {
      slug: { in: RECIPE_SLUGS },
    },
  })

  const recipesBySlug = new Map(docs.map((doc) => [doc.slug, doc]))

  return (
    <div className="container">
      {heading && <h2 className="text-lg font-semibold mb-4">{heading}</h2>}
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {DAYS.map((day, index) => {
          const slug = RECIPE_SLUGS[index % RECIPE_SLUGS.length]
          const recipe = recipesBySlug.get(slug) || FALLBACK_RECIPES[slug]

          return (
            <div key={day} className="flex flex-col gap-2">
              <div className="kicker">{day}</div>
              <Card doc={recipe} locale={locale} relationTo="recipes" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
