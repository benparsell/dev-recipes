import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { defaultLocale, locales, localizePath, type Locale } from '@/utilities/i18n'

const getRecipesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const dateFallback = new Date().toISOString()

    const docsByLocale = await Promise.all(
      locales.map((locale) =>
        payload
          .find({
            collection: 'recipes',
            overrideAccess: false,
            draft: false,
            depth: 0,
            limit: 1000,
            locale,
            pagination: false,
            where: {
              _status: {
                equals: 'published',
              },
            },
            select: {
              slug: true,
              updatedAt: true,
            },
          })
          .then((result) => ({ locale, docs: result.docs })),
      ),
    )

    const pathFor = (locale: Locale, slug: string) =>
      `${SITE_URL}${localizePath(locale, `/recipes/${slug}`)}`

    // Slugs can differ per locale, so track each doc's slug per locale
    // (falling back to the default locale's slug via Payload's own
    // localization fallback) rather than reusing one slug for every locale.
    const slugsById = new Map<string, { updatedAt?: string } & Partial<Record<Locale, string>>>()
    for (const { locale, docs } of docsByLocale) {
      for (const doc of docs) {
        if (!doc.slug) continue
        const id = String(doc.id)
        const entry = slugsById.get(id) || {}
        entry[locale] = doc.slug
        entry.updatedAt = entry.updatedAt || doc.updatedAt
        slugsById.set(id, entry)
      }
    }

    const sitemap = Array.from(slugsById.values())
      .filter((entry) => entry[defaultLocale])
      .map((entry) => {
        const defaultSlug = entry[defaultLocale]!

        return {
          loc: pathFor(defaultLocale, defaultSlug),
          lastmod: entry.updatedAt || dateFallback,
          alternateRefs: locales.map((locale) => ({
            href: pathFor(locale, entry[locale] || defaultSlug),
            hreflang: locale,
          })),
        }
      })

    return sitemap
  },
  ['recipes-sitemap'],
  {
    tags: ['recipes-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getRecipesSitemap()

  return getServerSideSitemap(sitemap)
}
