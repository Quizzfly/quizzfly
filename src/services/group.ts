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

export const inviteGroupApi = async (
  id: string,
  emails: Array<string>,
): Promise<BaseResponse<IGroup>> => {
  return $api(`/groups/${id}/members`, {
    method: 'POST',
    body: { emails: emails },
  })
}

export const joinGroupApi = async (id: string): Promise<BaseResponse<IGroup>> => {
  return $api(`/groups/${id}/members/joins`, {
    method: 'POST',
  })
}

export const getMemberGroupApi = async (id: string): Promise<BaseResponse<IGroup>> => {
  return $api(`/groups/${id}/members`, {
    method: 'GET',
  })
}

export const getGroupDetailApi = async (id: string): Promise<BaseResponse<IGroup>> => {
  return $api(`/groups/${id}`, {
    method: 'GET',
  })
}

export const deleteGroupApi = async (id: string): Promise<BaseResponse<IGroup>> => {
  return $api(`/groups/${id}`, {
    method: 'DELETE',
  })
}
