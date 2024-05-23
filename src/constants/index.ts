import type { StatusForValidName } from '@/types'

export const STYLES_FOR_INPUT_VALID_NAME: Record<StatusForValidName, string[]> = {
  UNVALIDATE: [],
  VALID: ['border-green-500', 'focus-visible:ring-green-500'],
  INVALID: ['border-red-500', 'focus-visible:ring-red-500']
}
