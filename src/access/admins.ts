import type { User } from '@/payload-types'

type isAdmin = (args: { req: { user: User | null } }) => boolean

export const admins: isAdmin = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'))
}
