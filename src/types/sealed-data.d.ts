/**
 * Dev Note: Maintain field names as short as possible
 * since this data will be stringified
 */
interface ISealedData {
  /** The main content or message */
  m: string
  /** Date created / sealed (timestamp) */
  d: number
}
