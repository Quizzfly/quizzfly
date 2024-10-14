import type { BaseResponse } from '@/types/api'

export const uploadFileApi = async (data: any): Promise<BaseResponse<any>> => {
  return $api('/files', {
    method: 'POST',
    body: data,
  })
}

export const uploadMultiFileApi = async (data: any): Promise<BaseResponse<any>> => {
  return $api('/files/multiple', {
    method: 'POST',
    body: data,
  })
}
