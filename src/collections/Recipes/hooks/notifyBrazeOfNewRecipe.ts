import type { CollectionAfterChangeHook } from 'payload'

import type { Recipe } from '../../../payload-types'
import { notifyBrazeOfNewRecipe as sendBrazeAnnouncement } from '@/utilities/braze'

/**
 * Announces a recipe to Braze the moment it first becomes published, so
 * Braze can push a "new recipe" notification to subscribed users. Gated on
 * the publish transition rather than `operation === 'create'` alone, since
 * a recipe is often created as a draft first (via autosave) and published
 * later through a separate update — that's the point users should actually
 * be notified, not the initial draft save.
 */
export const notifyBrazeOfNewRecipe: CollectionAfterChangeHook<Recipe> = async ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  const isNewlyPublished = doc._status === 'published' && previousDoc._status !== 'published'

  if (isNewlyPublished) {
    try {
      const result = await sendBrazeAnnouncement({
        id: doc.id,
        slug: doc.slug,
        title: doc.title,
      })

      payload.logger.info(
        `Notified Braze of new recipe "${doc.title}" (dispatch: ${result.dispatchId})`,
      )
    } catch (err) {
      payload.logger.error(`Failed to notify Braze of new recipe "${doc.title}": ${err}`)
    }
  }

  return doc
}
