import type { CollectionConfig } from 'payload'

import { admins } from '../../access/admins'
import { adminsOrSelf } from '../../access/adminsOrSelf'
import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: admins,
    delete: admins,
    read: authenticated,
    update: adminsOrSelf,
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Merchandising', value: 'merchandising' },
      ],
      defaultValue: ['merchandising'],
      required: true,
      saveToJWT: true,
      access: {
        update: admins,
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
