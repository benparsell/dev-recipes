import RichText from '@/components/RichText'
import React from 'react'

import { Width } from '../Width'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Locale } from '@/utilities/i18n'

export const Message: React.FC<{ locale: Locale; message: DefaultTypedEditorState }> = ({
  locale,
  message,
}) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText data={message} locale={locale} />}
    </Width>
  )
}
