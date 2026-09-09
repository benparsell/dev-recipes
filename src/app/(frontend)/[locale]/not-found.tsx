import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { getRequestLocale } from '@/utilities/getRequestLocale'
import { localizePath } from '@/utilities/i18n'

export default async function NotFound() {
  const locale = await getRequestLocale()

  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>
      <Button asChild variant="default">
        <Link href={localizePath(locale, '/')}>Go home</Link>
      </Button>
    </div>
  )
}
