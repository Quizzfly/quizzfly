import type { BaseResponse } from '@/types/api'
import type {
  PaySubscription,
  Subscription,
  SubscriptionDetail,
  UserPricing,
} from '@/types/pricing'

export const getUserPlansApi = async (): Promise<BaseResponse<UserPricing[]>> => {
  return $api(`/user-plans`, {
    method: 'GET',
    query: {
      limit: 100000,
    },
  })
}

export const getSubscriptionsApi = async (): Promise<BaseResponse<Subscription[]>> => {
  return $api(`/subscriptions`, {
    method: 'GET',
  })
}

export const getSubscriptionDetailApi = async (
  id: string,
): Promise<BaseResponse<SubscriptionDetail>> => {
  return $api(`/subscriptions/${id}`, {
    method: 'GET',
  })
}

export const paySubscriptionApi = async (id: string): Promise<BaseResponse<PaySubscription>> => {
  return $api(`/subscription/${id}/payment`, {
    method: 'POST',
  })
}
