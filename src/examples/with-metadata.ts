import { bytesToEmoji, emojiToBytes } from '~/utils/encodings/emoji'
import { seal, unseal } from '~/utils/seal.min'

export function example_withMetadata() {
  const wax = 'the seal mechanism'
  const message = 'Hello, Lightzane!'
  seal(message, wax).then(({ iv, salt, cipherText }) => {
    const metadata: ISealedMetadata = {
      version: 1,
      encoding: 'emoji',
    }
    const metadataString = JSON.stringify(metadata)
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
    const metadataBytes = encoder.encode(metadataString)
    const metedataLength = metadataBytes.length

    /** Allocate 2-bytes to describe the metadata size for up to ~65KB */
    const allocatedBytes = 2 // Should be permanent throughout different versions (otherwise backward compatibility breaks - e.g. if in v2 we decide to use 4 bytes, old sealed messages with 2 bytes will not be readable)
    // How 2-bytes can describe the length for up to 65KB?
    // Each byte can store values from 0 to 255 (2^8 - 1)
    // Therefore, 2 bytes can store values from 0 to (2^8 - 1) * (2^8)^1 = 2^16 - 1 = 65,535
    // 1KB = 1024 bytes, so 65,535 bytes is approximately 64KB
    const lengthBytes = new Uint8Array(allocatedBytes)

    // * Store the length of the metadata in big-endian format
    // * So that we can read it back later when decoding
    // * and know the size of the metadata
    lengthBytes[0] = (metedataLength >>> 8) & 0xff // big-endian (Why 8? Because each byte has 8 bits)
    lengthBytes[1] = metedataLength & 0xff // big-endian (So if allocatedBytes = 3, we would have to shift by 16 and 8 for the first two bytes)
    /* Explanation:
    
    We can extract this later by reading the first 2 bytes (allocatedBytes) and combining them:
    `const metadataLength = (combined[0] << 8) | combined[1]`

    If it were 3 bytes, we would do:
    `const metadataLength = (combined[0] << 16) | (combined[1] << 8) | combined[2]`

    Why 0xff?
    0xff is 255 in decimal, which is the maximum value for a single byte.
    By performing a bitwise AND operation with 0xff, we ensure that we only keep the last 8 bits of the number,
    effectively isolating the byte we want to store.

    Example length = 300
    300 in binary is 00000001 00101100
    - First byte: (300 >>> 8) & 0xff
      - 300 >>> 8 shifts the bits to the right by 8 positions, resulting in 00000000 00000001
      - AND with 0xff gives us 00000001, which is 1 in decimal.
    - Second byte: 300 & 0xff
      - AND with 0xff gives us 00101100, which is 44 in decimal.

    So, for a length of 300, we would store:
    lengthBytes[0] = 1
    lengthBytes[1] = 44

    Example length = 35
    35 in binary is 00000000 00100011
    - First byte: (35 >>> 8) & 0xff
      - 35 >>> 8 shifts the bits to the right by 8 positions, resulting in 00000000 00000000
      - AND with 0xff gives us 00000000, which is 0 in decimal.
    - Second byte: 35 & 0xff
      - AND with 0xff gives us 00100011, which is 35 in decimal.

    So, for a length of 35, we would store:
    lengthBytes[0] = 0
    lengthBytes[1] = 35
  */

    const combined = new Uint8Array(
      allocatedBytes +
        metadataBytes.length +
        iv.length +
        salt.length +
        cipherText.length
    )
    combined.set(lengthBytes, 0)
    combined.set(metadataBytes, allocatedBytes)
    combined.set(iv, allocatedBytes + metadataBytes.length)
    combined.set(salt, allocatedBytes + metadataBytes.length + iv.length)
    combined.set(
      cipherText,
      allocatedBytes + metadataBytes.length + iv.length + salt.length
    )

    const sealed = bytesToEmoji(combined)
    console.log('Sealed:', sealed)

    // Decoding
    const sharedCombined = emojiToBytes(sealed)
    const metadataLength = (sharedCombined[0] << 8) | sharedCombined[1]

    const newMetadataBytes = sharedCombined.slice(
      allocatedBytes,
      allocatedBytes + metadataLength
    )
    const newMetadataJson = decoder.decode(newMetadataBytes)
    const newMetadata = JSON.parse(newMetadataJson)

    console.log('Decoded Metadata:', newMetadata)
    console.log('Metadata size (bytes):', metadataLength)

    const newIvStart = allocatedBytes + metadataLength
    const newIvEnd = newIvStart + 12
    const newIv = sharedCombined.slice(newIvStart, newIvEnd)

    const newSaltStart = newIvEnd
    const newSaltEnd = newSaltStart + 16
    const newSalt = sharedCombined.slice(newSaltStart, newSaltEnd)

    const newCipherText = sharedCombined.slice(newSaltEnd)

    unseal(wax, newIv, newSalt, newCipherText).then(console.log)
  })
}
