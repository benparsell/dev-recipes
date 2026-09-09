import type { Block } from 'payload'

export const ShoppingList: Block = {
  slug: 'shoppingList',
  interfaceName: 'ShoppingListBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      localized: true,
    },
  ],
  labels: {
    plural: 'Shopping Lists',
    singular: 'Shopping List',
  },
}
