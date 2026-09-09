import { RequiredDataFromCollectionSlug } from 'payload'
import type { RecipeArgs } from './recipe-1'

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

export const recipe3: (args: RecipeArgs) => RequiredDataFromCollectionSlug<'recipes'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'fudgy-dark-chocolate-brownies',
    _status: 'published',
    authors: [author],
    servings: 16,
    prepTime: 15,
    cookTime: 25,
    content: {
      root: {
        type: 'root',
        children: [
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
                      textNode('Disclaimer: ', 1),
                      textNode('This content is fabricated and for demonstration purposes only. To edit this recipe, '),
                      {
                        type: 'link',
                        children: [textNode('navigate to the admin dashboard.')],
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
          heading(
            'Rich, glossy-topped brownies with a dense, fudgy center — no mixer required, just one bowl and a whisk.',
          ),
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
                        "Chef's tip: Underbaking slightly is the secret to fudgy brownies — pull them the moment the center stops looking wet, since they'll continue to set as they cool.",
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
      { amount: '1/2', unit: 'cup', item: 'unsalted butter, melted' },
      { amount: '1', unit: 'cup', item: 'granulated sugar' },
      { amount: '2', unit: '', item: 'large eggs' },
      { amount: '1', unit: 'tsp', item: 'vanilla extract' },
      { amount: '1/3', unit: 'cup', item: 'unsweetened cocoa powder' },
      { amount: '1/2', unit: 'cup', item: 'all-purpose flour' },
      { amount: '1/4', unit: 'tsp', item: 'salt' },
      { amount: '1/2', unit: 'cup', item: 'dark chocolate chips' },
    ],
    instructions: [
      {
        step: 'Preheat the oven to 350°F (175°C) and line an 8x8-inch baking pan with parchment paper.',
      },
      { step: 'Whisk the melted butter and sugar together until glossy.' },
      {
        step: 'Add the eggs and vanilla, whisking vigorously for about a minute until the mixture lightens slightly.',
      },
      {
        step: 'Sift in the cocoa powder, flour, and salt, then fold together with a spatula until just combined — do not overmix.',
      },
      { step: 'Fold in the chocolate chips, then spread the batter evenly into the prepared pan.' },
      {
        step: 'Bake for 22-25 minutes, until a toothpick inserted in the center comes out with a few moist crumbs. Cool completely before slicing.',
      },
    ],
    heroImage: heroImage.id,
    meta: {
      description:
        'Rich, glossy-topped brownies with a dense, fudgy center — no mixer required, just one bowl and a whisk.',
      image: heroImage.id,
      title: 'Fudgy Dark Chocolate Brownies',
    },
    relatedRecipes: [], // this is populated by the seed script
    title: 'Fudgy Dark Chocolate Brownies',
  }
}
