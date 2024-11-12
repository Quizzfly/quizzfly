export * from './user'
export * from './exception'
export * from './room'
export * from './setting'

export interface IPaging {
  has_next_page: boolean
  has_previous_page: boolean
  limit: number
  current_page: number
  total_pages: number
  total_records: number
}
