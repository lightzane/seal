interface ISealedMetadata {
  /** Version of the sealing mechanism */
  version: number

  /**
   * Encoding used for the sealed message
   * Currently only 'emoji' is supported
   */
  encoding: 'emoji'
}
