import type { ApiError } from '@/types/exception'

export const apiExceptionHandler = (e: any) => {
  const error: ApiError = {
    code: '',
    message: 'Internal server error',
  }

  console.log(e)
  if (e?.data) {
    error.message = e?.data?.message ?? ''
  } else if (e.code && e.message) {
    error.code = e?.code
    error.message = e?.message
  }
  console.log(error)
  return error
}
