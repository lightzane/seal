// Create a Map for quick lookup of emoji to its byte value (emoji -> byte value )
export const EMOJI_MAP = new Map<string, number>() // will be populated in getEmojis()

// Create an array of 256 unique emojis
export const EMOJI_ARRAY = get256Emojis()

/**
 * Generates an array of 256 unique emojis by iterating through specified Unicode code point ranges.
 * Also populates the `EMOJI_MAP` for quick lookup of emoji to its byte value.
 *
 * ! DANGER
 * # DANGER
 * * Changing the order or the emojis in this array will break backward compatibility with previously sealed messages.
 *
 * @returns An array containing 256 unique emojis.
 */
function get256Emojis(): string[] {
  const startIndex = [
    127799, 127870, 127908, 127941, 128132, 128139, 128150, 128170, 128187,
    128189, 128512, 128640, 129315, 129321, 129325, 129351, 129360, 129381,
    129408, 129412, 129424, 129434, 129436,
  ]

  const endIndex = [
    127857, 127882, 127931, 127942, 128133, 128142, 128158, 128171, 128187,
    128192, 128586, 128640, 129316, 129322, 129325, 129353, 129374, 129399,
    129409, 129420, 129427, 129434, 129437,
  ]

  let index = 0

  const emojis: string[] = []

  startIndex.forEach((start, i) => {
    const end = endIndex[i]

    for (let j = start; j <= end; j++) {
      emojis[index] = String.fromCodePoint(j)
      EMOJI_MAP.set(String.fromCodePoint(j), index)

      index++
    }
  })

  return emojis
}

if (import.meta.env.DEV) {
  console.log(
    EMOJI_ARRAY.length === 256
      ? '✅ Emoji alphabet is valid (256 emojis)'
      : `❌ Emoji alphabet is invalid (${EMOJI_ARRAY.length} emojis)`
  )

  if (EMOJI_ARRAY.length !== 256) {
    console.log(EMOJI_ARRAY)
  }
}
