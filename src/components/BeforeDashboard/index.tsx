import { Banner } from '@payloadcms/ui/elements/Banner'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const collectionLabels: { slug: 'pages' | 'recipes' | 'categories' | 'media' | 'users'; label: string }[] = [
  { slug: 'recipes', label: 'Recipes' },
  { slug: 'pages', label: 'Pages' },
  { slug: 'categories', label: 'Categories' },
  { slug: 'media', label: 'Media' },
  { slug: 'users', label: 'Users' },
]

const BeforeDashboard = async () => {
  const payload = await getPayload({ config: configPromise })

  const counts = await Promise.all(
    collectionLabels.map(({ slug }) => payload.count({ collection: slug })),
  )

  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to your dashboard, Ben!</h4>
      </Banner>
      <ul className={`${baseClass}__counts`}>
        {collectionLabels.map(({ label }, index) => (
          <li className={`${baseClass}__count`} key={label}>
            <span className={`${baseClass}__count-number`}>{counts[index].totalDocs}</span>
            <span className={`${baseClass}__count-label`}>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BeforeDashboard
