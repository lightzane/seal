import { cn } from '~/utils'

export const btnPrimary = cn(
  `bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2`,
  `cursor-pointer select-none`,
  `disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500`
)

export const btnSecondary = cn(
  `bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-xs`,
  `cursor-pointer select-none`,
  `disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500`
)
