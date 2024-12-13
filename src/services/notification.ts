import type { BaseResponse } from '@/types/api'
import type { INotification } from '@/types/notification'

export const getListNotificationApi = async (
  page = 1,
  limit = 4,
): Promise<BaseResponse<INotification[]>> => {
  return $api(`/notifications`, {
    method: 'GET',
    query: {
      page,
      limit,
    },
  })
}

export const getListUnreadNotificationApi = async (): Promise<BaseResponse<INotification[]>> => {
  return $api(`/notifications/unread-count`, {
    method: 'GET',
  })
}

export const markSpecificNotificationApi = async (
  id: string,
): Promise<BaseResponse<INotification>> => {
  return $api(`/notifications/${id}/read`, {
    method: 'PATCH',
  })
}

export const markAllNotificationApi = async (): Promise<BaseResponse<INotification>> => {
  return $api(`/notifications/read-all`, {
    method: 'PATCH',
  })
}
