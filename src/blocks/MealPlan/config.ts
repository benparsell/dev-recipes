import type { Block } from 'payload'

export const MealPlan: Block = {
  slug: 'mealPlan',
  interfaceName: 'MealPlanBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      localized: true,
    },
  ],
  labels: {
    plural: 'Meal Plans',
    singular: 'Meal Plan',
  },
}
