import { EMOJI_ARRAY, EMOJI_MAP } from '~/constants/emoji-alphabet'

export function bytesToEmoji(bytes: Uint8Array<ArrayBuffer>): string {
  return Array.from(bytes) // Uint8Array to Array<number>
    .map((b) => EMOJI_ARRAY[b])
    .join('')
}

export function emojiToBytes(emojiStr: string): Uint8Array<ArrayBuffer> {
  const emojis = Array.from(emojiStr)

  return Uint8Array.from(
    emojis.map((e) => {
      if (!EMOJI_MAP.has(e)) {
        throw new Error(`Invalid emoji character found: ${e}`)
      }

      return EMOJI_MAP.get(e)
    })
  )
}
