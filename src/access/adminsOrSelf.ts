import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAdminOrSelf = (args: AccessArgs<User>) => boolean | { id: { equals: number } }

export const adminsOrSelf: isAdminOrSelf = ({ req: { user } }) => {
  if (!user) {
    return false
  }

  if (user.roles?.includes('admin')) {
    return true
  }

  return {
    id: {
      equals: user.id,
    },
  }
}
