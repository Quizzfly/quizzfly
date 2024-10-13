import type { ApiError } from '@/types/exception'

export const apiError = (e: any) => {
  const error: ApiError = {
    code: '',
    message: 'Internal server error',
  }

  if (e?.data) {
    error.message = e?.data?.error?.message ?? error.message
  } else if (e.code && e.message) {
    error.code = e?.code
    error.message = e?.message
  }
  return error
}
