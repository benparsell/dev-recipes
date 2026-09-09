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

export const recipe2: (args: RecipeArgs) => RequiredDataFromCollectionSlug<'recipes'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'one-pot-creamy-tuscan-chicken',
    _status: 'published',
    authors: [author],
    servings: 4,
    prepTime: 10,
    cookTime: 25,
    content: {
      root: {
        type: 'root',
        children: [
          heading(
            'Seared chicken thighs simmered in a garlicky sun-dried tomato and spinach cream sauce, all in a single pan.',
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
                        "Chef's tip: Pound the chicken thighs to an even thickness before searing so they cook through at the same rate and stay juicy.",
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
      { amount: '4', unit: '', item: 'boneless, skinless chicken thighs' },
      { amount: '', unit: '', item: 'Salt and black pepper, to taste' },
      { amount: '1', unit: 'tbsp', item: 'olive oil' },
      { amount: '3', unit: 'cloves', item: 'garlic, minced' },
      { amount: '1/2', unit: 'cup', item: 'sun-dried tomatoes, chopped' },
      { amount: '3/4', unit: 'cup', item: 'heavy cream' },
      { amount: '1/2', unit: 'cup', item: 'chicken broth' },
      { amount: '2', unit: 'cups', item: 'baby spinach' },
      { amount: '1/3', unit: 'cup', item: 'grated parmesan' },
    ],
    instructions: [
      { step: 'Season the chicken thighs generously with salt and pepper.' },
      {
        step: 'Heat the olive oil in a large skillet over medium-high heat and sear the chicken for 5-6 minutes per side, until golden brown. Remove and set aside.',
      },
      {
        step: 'Lower the heat to medium, add the garlic and sun-dried tomatoes, and cook for about a minute until fragrant.',
      },
      {
        step: 'Pour in the chicken broth and heavy cream, stirring to combine, then bring to a gentle simmer.',
      },
      { step: 'Stir in the parmesan until melted, then add the spinach and cook until just wilted.' },
      {
        step: 'Return the chicken to the skillet, spoon the sauce over the top, and simmer for 5 more minutes until the chicken is cooked through. Serve warm.',
      },
    ],
    heroImage: heroImage.id,
    meta: {
      description:
        'Seared chicken thighs simmered in a garlicky sun-dried tomato and spinach cream sauce, all in a single pan.',
      image: heroImage.id,
      title: 'One-Pot Creamy Tuscan Chicken',
    },
    relatedRecipes: [], // this is populated by the seed script
    title: 'One-Pot Creamy Tuscan Chicken',
  }
}
