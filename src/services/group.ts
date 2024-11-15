import type { BaseResponse } from '@/types/api'
import type { IGroup } from '@/types/group'

interface GroupInfo {
  name: string
  description: string
  background: string
}

export const getGroupsApi = async ({ page = 1, keyword = '' }): Promise<BaseResponse<IGroup[]>> => {
  return $api('/groups', {
    method: 'GET',
    params: {
      page,
      keyword,
    },
  })
}

export const createGroupApi = async (payload: GroupInfo): Promise<BaseResponse<IGroup>> => {
  return $api('/groups', {
    method: 'POST',
    body: payload,
  })
}
