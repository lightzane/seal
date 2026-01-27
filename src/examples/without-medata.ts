import { bytesToEmoji, emojiToBytes } from '~/utils/encodings/emoji'
import { seal, unseal } from '~/utils/seal.min'

export function example_withoutMetadata() {
  const wax = 'the seal mechanism'
  const message = 'Hello, Lightzane!'
  seal(message, wax).then(({ iv, salt, cipherText }) => {
    const combined = new Uint8Array(iv.length + salt.length + cipherText.length)
    combined.set(iv, 0)
    combined.set(salt, iv.length)
    combined.set(cipherText, iv.length + salt.length)

    const sealed = bytesToEmoji(combined)
    console.log('Sealed:', sealed)

    // Decoding
    const sharedCombined = emojiToBytes(sealed)

    const newIvStart = 0
    const newIvEnd = newIvStart + 12
    const newIv = sharedCombined.slice(newIvStart, newIvEnd)

    const newSaltStart = newIvEnd
    const newSaltEnd = newSaltStart + 16
    const newSalt = sharedCombined.slice(newSaltStart, newSaltEnd)

    const newCipherText = sharedCombined.slice(newSaltEnd)

    unseal(wax, newIv, newSalt, newCipherText).then(console.log)
  })
}
