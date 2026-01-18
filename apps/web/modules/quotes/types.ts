export type GetQuoteParams = {
  categories?: QuoteCategory[]
  exclude_categories?: QuoteCategory[]
  author?: string
  work?: string
  limit?: number
  offset?: number
}

export type QuoteCategory =
  | "wisdom"
  | "philosophy"
  | "life"
  | "truth"
  | "inspirational"
  | "relationships"
  | "love"
  | "faith"
  | "humor"
  | "success"
  | "courage"
  | "happiness"
  | "art"
  | "writing"
  | "fear"
  | "nature"
  | "time"
  | "freedom"
  | "death"
  | "leadership"

export type Quote = {
  quote: string
  author: string
  work: string
  categories: string[]
}