declare module '~/utils/seal.min' {
  export declare function seal(
    message: string,
    wax: string
  ): Promise<{
    iv: Uint8Array<ArrayBuffer>
    salt: Uint8Array<ArrayBuffer>
    cipherText: Uint8Array<ArrayBuffer>
  }>
  export declare function unseal(
    wax: string,
    iv: Uint8Array<ArrayBuffer>,
    salt: Uint8Array<ArrayBuffer>,
    cipherText: Uint8Array<ArrayBuffer>
  ): Promise<string>
}
