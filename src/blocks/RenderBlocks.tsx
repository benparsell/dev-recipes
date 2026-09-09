import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MealPlanBlock } from '@/blocks/MealPlan/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ShoppingListBlock } from '@/blocks/ShoppingList/Component'
import { getRequestLocale } from '@/utilities/getRequestLocale'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mealPlan: MealPlanBlock,
  mediaBlock: MediaBlock,
  shoppingList: ShoppingListBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = async (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    const locale = await getRequestLocale()

    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer locale={locale} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
