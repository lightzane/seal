/**
 * # Danger
 * It only returns the input string as is.
 *
 * This function is used so that Tailwind CSS class names can be recognized by Prettier's Tailwind CSS plugin
 * without installing additional dependencies.
 */
export function cn(...classes: string[]) {
  return classes.join(' ')
}
/* 
    For actual function, install these packages first:
    
        pnpm add -D tailwind-merge clsx

    Then uncomment the code below and delete the above function.
*/

// import clsx, { type ClassValue } from 'clsx';
// import { twMerge } from 'tailwind-merge';

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// };
