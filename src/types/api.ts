import type { IPaging } from '.'

export type BaseResponse<T> = {
  data: T
  meta?: IPaging
  message: string
}
