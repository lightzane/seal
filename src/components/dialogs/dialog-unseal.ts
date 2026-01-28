import { btnPrimary, btnSecondary } from '~/themes/button'
import { cn } from '~/utils'

interface Props {
  onConfirm: (password: string) => void
  onCancel?: () => void
}

export default function DialogUnseal(props: Props) {
  const dialog = document.createElement('dialog')
  document.body.appendChild(dialog)
  dialog.showModal()

  dialog.className = cn(
    'w-full max-w-xs rounded-lg bg-white/70 backdrop-blur-md sm:max-w-sm',

    /* The "Magic" centering formula */
    'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',

    /* Shadow */
    'shadow-lg shadow-black/5'
  )

  dialog.innerHTML = /*html*/ `
    <form class="p-4 space-y-6" method="dialog">
      <div>
        <label for="wax1" class="block text-sm/6 font-medium text-gray-900">✉️ Enter password to unseal</label>
        <div class="mt-2">
          <input type="password" id="wax1" name="wax1" placeholder="Password" aria-describedby="password" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button class="${cn(btnSecondary, 'flex-1')}" value="cancel" formnovalidate>Cancel</button>
        <button class="${cn(btnPrimary, 'flex-1')}" value="confirm">OK</button>
      </div>
    </form>
  `

  dialog.addEventListener('close', () => {
    if (dialog.returnValue === 'confirm') {
      const wax1 = (document.getElementById('wax1') as HTMLInputElement).value
      props.onConfirm(wax1)
    } else {
      props.onCancel?.()
    }
    document.body.removeChild(dialog)
  })

  setTimeout(() => {
    const wax1 = document.getElementById('wax1') as HTMLInputElement
    wax1.focus()
  }, 100)
}
