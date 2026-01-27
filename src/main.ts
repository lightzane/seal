import '~/styles/main.css'
import { cn } from '~/utils'

import Footer from '~/components/footer'
import Main from '~/components/main'

import { example_withoutMetadata } from '~/examples/without-medata'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /* html */ `
  <div class="${cn(
    `m-auto max-w-5xl px-2 pt-2 md:px-4 lg:px-8`,
    `flex min-h-svh flex-col justify-between`
  )}">
    ${Main()}
    ${Footer()}
  </div>
`

if (import.meta.env.DEV) {
  example_withoutMetadata()
}
