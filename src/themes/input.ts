import { cn } from '~/utils'

export const inputPrimary = cn(
  // base
  'block w-full rounded-md border-0 bg-white px-3 py-1.5 text-base ring-0 outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 dark:bg-white/5',
  'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200 dark:disabled:bg-white/10 dark:disabled:text-gray-500 dark:disabled:outline-white/5',
  'cursor-pointer py-2 focus:cursor-text', // custom out of official templates

  // variants - primary color
  'focus:outline-primary-600 dark:focus:outline-primary-500 text-gray-900 outline-gray-300 placeholder:text-gray-400 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500'
)
