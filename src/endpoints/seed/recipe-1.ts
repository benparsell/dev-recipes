import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export type RecipeArgs = {
  heroImage: Media
  blockImage: Media
  author: User
}

const textNode = (text: string, format = 0) => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

const paragraph = (children: unknown[]) => ({
  type: 'paragraph',
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

const heading = (text: string, tag: 'h2' | 'h3' | 'h4' = 'h2') => ({
  type: 'heading',
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  version: 1,
})

export const recipe1: (args: RecipeArgs) => RequiredDataFromCollectionSlug<'recipes'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'classic-margherita-pizza',
    _status: 'published',
    authors: [author],
    servings: 4,
    prepTime: 20,
    cookTime: 15,
    content: {
      root: {
        type: 'root',
        children: [
          heading(
            'A blistered, chewy crust topped with sweet tomato sauce, fresh mozzarella, and basil. This is the pizza that started it all.',
          ),
          {
            type: 'block',
            fields: {
              blockName: 'Disclaimer',
              blockType: 'banner',
              content: {
                root: {
                  type: 'root',
                  children: [
                    paragraph([
                      textNode('Disclaimer:', 1),
                      textNode(' This content is fabricated and for demonstration purposes only. To edit this recipe, '),
                      {
                        type: 'link',
                        children: [textNode('navigate to the admin dashboard')],
                        direction: 'ltr',
                        fields: {
                          linkType: 'custom',
                          newTab: true,
                          url: '/admin',
                        },
                        format: '',
                        indent: 0,
                        version: 3,
                      },
                      textNode('.'),
                    ]),
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
              style: 'info',
            },
            format: '',
            version: 2,
          },
          {
            type: 'block',
            fields: {
              blockName: '',
              blockType: 'mediaBlock',
              media: blockImage.id,
            },
            format: '',
            version: 2,
          },
          {
            type: 'block',
            fields: {
              blockName: "Chef's Tip",
              blockType: 'banner',
              content: {
                root: {
                  type: 'root',
                  children: [
                    paragraph([
                      textNode(
                        "Chef's tip: Resist the urge to overload the pizza with toppings — a thin, even layer of sauce and cheese is what lets the crust crisp up properly in a home oven.",
                      ),
                    ]),
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
              style: 'info',
            },
            format: '',
            version: 2,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    ingredients: [
      { amount: '1', unit: 'ball', item: 'pizza dough (about 1 lb / 450g), room temperature' },
      { amount: '1/2', unit: 'cup', item: 'crushed San Marzano tomatoes' },
      { amount: '8', unit: 'oz', item: 'fresh mozzarella, torn into pieces' },
      { amount: '2', unit: 'tbsp', item: 'extra-virgin olive oil, plus more for drizzling' },
      { amount: '', unit: '', item: 'A handful of fresh basil leaves' },
      { amount: '', unit: '', item: 'Flaky salt, to taste' },
    ],
    instructions: [
      {
        step: 'Place a pizza stone or upside-down baking sheet in the oven and preheat to 500°F (260°C) for at least 30 minutes.',
      },
      {
        step: 'On a floured surface, stretch the dough into a 12-inch round, leaving a slightly thicker border for the crust.',
      },
      {
        step: 'Spread the crushed tomatoes evenly over the dough, leaving a 1-inch border uncovered.',
      },
      { step: 'Scatter the torn mozzarella over the sauce and drizzle with olive oil.' },
      {
        step: 'Slide the pizza onto the hot stone and bake for 8-10 minutes, until the crust is blistered and the cheese is bubbling and golden.',
      },
      {
        step: 'Remove from the oven, top with fresh basil, a drizzle of olive oil, and a pinch of flaky salt. Slice and serve immediately.',
      },
    ],
    heroImage: heroImage.id,
    meta: {
      description:
        'A blistered, chewy crust topped with sweet tomato sauce, fresh mozzarella, and basil. This is the pizza that started it all.',
      image: heroImage.id,
      title: 'Classic Margherita Pizza',
    },
    relatedRecipes: [], // this is populated by the seed script
    title: 'Classic Margherita Pizza',
  }
}
