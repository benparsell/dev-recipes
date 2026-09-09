import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'
import { locales } from '@/utilities/i18n'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    // A change may have been made in either locale, so revalidate both —
    // an English edit can also affect the Spanish fallback render.
    locales.forEach((locale) => revalidateTag(`global_footer_${locale}`, 'max'))
  }

  return doc
}
