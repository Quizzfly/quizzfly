import type { BaseResponse } from '@/types/api'
import type { IGroup, IPost } from '@/types/group'

interface GroupInfo {
  name: string
  description: string
  background: string
}

export const getCardsApi = async ({ page = 1, keyword = '' }): Promise<BaseResponse<IGroup[]>> => {
  return $api('/cards', {
    method: 'GET',
    params: {
      page,
      keywords: keyword,
    },
  })
}

export const createCardApi = async (payload: GroupInfo): Promise<BaseResponse<IGroup>> => {
  return $api('/cards', {
    method: 'POST',
    body: payload,
  })
}

export const getCardDetailApi = async (idGroup: string): Promise<BaseResponse<IPost>> => {
  return $api(`/groups/${idGroup}/posts`, {
    method: 'GET',
  })
}

export const deleteCardApi = async (id: string): Promise<BaseResponse<IGroup>> => {
  return $api(`/cards/${id}`, {
    method: 'DELETE',
  })
}

//folder

export const getFoldersApi = async (page = 1, idGroup: string): Promise<BaseResponse<IPost[]>> => {
  return $api(`/groups/${idGroup}/posts`, {
    method: 'GET',
    params: { page, order: 'DESC' },
  })
}

export const getFolderDetailApi = async (
  idGroup: string,
  idPost: string,
): Promise<BaseResponse<IPost>> => {
  return $api(`/groups/${idGroup}/posts/${idPost}`, {
    method: 'GET',
  })
}

export const deleteFolderApi = async (idPost: string): Promise<BaseResponse<IPost>> => {
  return $api(`/posts/${idPost}`, {
    method: 'DELETE',
  })
}
