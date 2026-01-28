import BaseTextarea from '~/components/base/base-textarea'
import DialogSeal from '~/components/dialogs/dialog-seal'
import DialogUnseal from '~/components/dialogs/dialog-unseal'
import { btnPrimary, btnSecondary } from '~/themes/button'
import { bytesToEmoji, emojiToBytes } from '~/utils/encodings/emoji'
import { seal, unseal } from '~/utils/seal.min'

export default function Main() {
  /** TextArea ref */
  const messageId = 'message'
  /** Copy button ref */
  const copyId = 'copy'
  /** Seal button ref */
  const sealId = 'seal'
  /** Unseal button ref */
  const unsealId = 'unseal'

  let readonlyMode = false

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById(messageId)?.addEventListener('input', handleMessage)
    document.getElementById(sealId)?.addEventListener('click', handleSeal)
    document.getElementById(unsealId)?.addEventListener('click', handleUnseal)
    document.getElementById('clear')?.addEventListener('click', handleClear)
    document.getElementById(copyId)?.addEventListener('click', handleCopy)
  })

  async function sealTheMessage(sealInput: string) {
    const messageTextarea = document.getElementById(
      messageId
    ) as HTMLTextAreaElement
    const sealDateDiv = document.getElementById('sealDate') as HTMLDivElement

    if (!messageTextarea || !sealDateDiv) {
      return
    }

    const message = messageTextarea.value

    if (!message || message.trim() === '') {
      alert('No message to seal')
      return
    }

    const sealData: ISealedData = {
      m: message.trim(),
      d: Date.now(),
    }

    const sealDataString = JSON.stringify(sealData)
    const sealedMessageRaw = await seal(sealDataString, sealInput).catch(
      (error) => {
        if (import.meta.env.DEV) {
          alert(error)
        }
        return null
      }
    )

    if (!sealedMessageRaw) {
      alert('Failed to seal message')
      return
    }

    const { iv, salt, cipherText } = sealedMessageRaw

    const combined = new Uint8Array(iv.length + salt.length + cipherText.length)
    combined.set(iv, 0)
    combined.set(salt, iv.length)
    combined.set(cipherText, iv.length + salt.length)

    const sealed = bytesToEmoji(combined)

    readonlyMode = true
    messageTextarea.value = sealed
    messageTextarea.readOnly = true
    messageTextarea.dispatchEvent(new Event('input'))

    // Show copy button
    document.getElementById(copyId)!.style.display = 'block'

    // Disable Seal/Unseal button
    document.getElementById(sealId)?.setAttribute('disabled', 'true')
    document.getElementById(unsealId)?.setAttribute('disabled', 'true')
  }

  async function unsealTheMessage(sealInput: string) {
    const messageTextarea = document.getElementById(
      messageId
    ) as HTMLTextAreaElement
    const sealDateDiv = document.getElementById('sealDate') as HTMLDivElement

    if (!messageTextarea || !sealDateDiv) {
      return
    }

    const sealedMessage = messageTextarea.value

    if (!sealedMessage) {
      alert('No sealed message to unseal')
      return
    }

    try {
      const sharedCombined = emojiToBytes(sealedMessage)

      const newIvStart = 0
      const newIvEnd = newIvStart + 12
      const newIv = sharedCombined.slice(newIvStart, newIvEnd)

      const newSaltStart = newIvEnd
      const newSaltEnd = newSaltStart + 16
      const newSalt = sharedCombined.slice(newSaltStart, newSaltEnd)

      const newCipherText = sharedCombined.slice(newSaltEnd)

      const result = await unseal(sealInput, newIv, newSalt, newCipherText)
      const resultJson: ISealedData = JSON.parse(result)

      readonlyMode = true
      messageTextarea.readOnly = true
      messageTextarea.value = resultJson.m
      messageTextarea.dispatchEvent(new Event('input'))
      sealDateDiv.style.display = 'block'
      const sealedDate = new Date(resultJson.d)
      sealDateDiv.innerText = `📅 Sealed on: ${sealedDate.toLocaleString(
        'en-GB',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          weekday: 'short',
        }
      )}`

      // Disable Seal/Unseal button
      document.getElementById(sealId)?.setAttribute('disabled', 'true')
      document.getElementById(unsealId)?.setAttribute('disabled', 'true')
    } catch {
      alert(
        'Failed to unseal message. Please check your password and sealed message.'
      )
    }
  }

  function handleMessage() {
    const sealDateDiv = document.getElementById('sealDate') as HTMLDivElement
    sealDateDiv.style.display = 'none'
    sealDateDiv.innerText = ''
  }

  async function handleSeal() {
    if (readonlyMode) {
      return
    }

    // No message to seal
    const messageTextarea = document.getElementById(
      messageId
    ) as HTMLTextAreaElement

    if (!messageTextarea) {
      return
    }

    const message = messageTextarea.value

    if (!message || message.trim() === '') {
      alert('No message to seal')
      return
    }

    DialogSeal({ onConfirm: sealTheMessage })
  }

  async function handleUnseal() {
    if (readonlyMode) {
      return
    }

    // No message to unseal
    const messageTextarea = document.getElementById(
      messageId
    ) as HTMLTextAreaElement

    if (!messageTextarea) {
      return
    }

    const message = messageTextarea.value

    if (!message || message.trim() === '') {
      alert('No message to unseal')
      return
    }

    DialogUnseal({ onConfirm: unsealTheMessage })
  }

  function handleClear() {
    const messageTextarea = document.getElementById(
      messageId
    ) as HTMLTextAreaElement

    if (!messageTextarea) {
      return
    }

    // Confirm clear
    const confirmClear = window.confirm(
      'Are you sure you want to clear the message?'
    )

    if (!confirmClear) {
      return
    }

    // Enable Seal/Unseal button
    document.getElementById(sealId)?.removeAttribute('disabled')
    document.getElementById(unsealId)?.removeAttribute('disabled')

    messageTextarea.value = ''
    messageTextarea.readOnly = false
    readonlyMode = false

    /* 
        to trigger auto-resize or other listeners
        e.g. triggers 'input', so document.getElementById(...).addEventListener('input', ...) will be called
      */
    messageTextarea.dispatchEvent(new Event('input'))
  }

  function handleCopy() {
    const messageTextarea = document.getElementById(
      messageId
    ) as HTMLTextAreaElement

    if (!messageTextarea) {
      return
    }

    const message = messageTextarea.value

    if (!message || message.trim() === '') {
      alert('No message to copy')
      return
    }

    window.navigator.clipboard
      .writeText(message)
      .then(() => {
        alert('Message copied to clipboard')
      })
      .catch(() => {
        alert('Failed to copy message to clipboard')
      })
  }

  return /* html */ `<main>
    <div class="flex justify-between">
      <button id="unseal" type="button" class="${btnPrimary}">
        <span>✉️ Unseal</span>
      </button>

      <button id="seal" type="button" class="${btnSecondary}">
        <span>💌 Seal</span>
      </button>
    </div>

    <div class="mt-4">
      <div id="sealDate" class="mb-4 text-sm text-gray-500"></div>

      <div class="grid grid-cols-1">
        ${BaseTextarea({ id: messageId, maxRows: 15 })}
      </div>

      <div class="mt-4 flex justify-between">
        <button id="clear" type="button" class="${btnSecondary}">Clear</button>
        <button id="copy" type="button" class="${btnSecondary}">Copy</button>
      </div>
    </div>
  </main>`
}
