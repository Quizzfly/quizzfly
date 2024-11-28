import type { BaseResponse } from '@/types/api'
import type { IGroup, IPost, ICreatePost, IComment } from '@/types/group'

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

//post
export const createPostApi = async (
  idGroup: string,
  data: ICreatePost,
): Promise<BaseResponse<IPost>> => {
  return $api(`/groups/${idGroup}/posts`, {
    method: 'POST',
    body: data,
  })
}

export const getPostsApi = async (page = 1, idGroup: string): Promise<BaseResponse<IPost[]>> => {
  return $api(`/groups/${idGroup}/posts`, {
    method: 'GET',
    params: { page },
  })
}

export const getPostDetailApi = async (
  idGroup: string,
  idPost: string,
): Promise<BaseResponse<IPost>> => {
  return $api(`/groups/${idGroup}/posts/${idPost}`, {
    method: 'GET',
  })
}

export const deletePostApi = async (idPost: string): Promise<BaseResponse<IPost>> => {
  return $api(`/posts/${idPost}`, {
    method: 'DELETE',
  })
}

export const reactPostApi = async (idPost: string): Promise<BaseResponse<IPost>> => {
  return $api(`/posts/${idPost}/reacts`, {
    method: 'POST',
  })
}

export const commentPostApi = async (
  idPost: string,
  data: any,
): Promise<BaseResponse<IComment>> => {
  return $api(`/posts/${idPost}/comments`, {
    method: 'POST',
    body: data,
  })
}

export const getCommentPostApi = async (idPost: string): Promise<BaseResponse<IComment[]>> => {
  return $api(`/posts/${idPost}/comments`, {
    method: 'GET',
  })
}
