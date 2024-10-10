import type { BaseResponse } from '@/types/api'

export const uploadFile = async (data: any): Promise<BaseResponse<any>> => {
  return $api('/files', {
    method: 'POST',
    body: data,
  })
}

export const uploadMultiFile = async (data: any): Promise<BaseResponse<any>> => {
  return $api('/files/multiple', {
    method: 'POST',
    body: data,
  })
}
