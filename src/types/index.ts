export * from './user'
export * from './question'
export * from './exception'

export interface IPaging {
  current_page: number
  total_count: number
  total_pages: number
  next_page: number | null
  prev_page: number | null
}
