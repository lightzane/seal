import { version as APP_VERSION } from './../../package.json'

export default function Footer() {
  return /* html */ `
  <footer class="py-4">
    <p class="text-xs text-gray-400 mt-4 text-center">
      v${APP_VERSION} &copy; 2026 Lightzane. All rights reserved.
    </p>
  </footer>`
}
