import { cn } from '~/utils'
import { version as APP_VERSION } from './../../package.json'

export default function Footer() {
  return /* html */ `
  <footer class="py-4">
    <p class="${cn(
      'mt-4 text-center text-xs text-gray-400 select-none',
      'flex items-center justify-center gap-x-2'
    )}">
      <a class="github-logo sm:opacity-50 sm:hover:opacity-100" href="https://github.com/lightzane/seal" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository"></a>
      v${APP_VERSION} &copy; 2026 Lightzane. All rights reserved.
    </p>
  </footer>`
}
