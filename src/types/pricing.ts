export interface UserPricing {
  id: string
  created_at: string
  updated_at: string
  deleted_at: null
  amount: number
  description: string
  code: string
  user_plan_status: 'SUCCESS' | 'WAITING'
  paymented_at: string
  subscription_expired_at: string
  subscription_plan: Subscription
}

export interface Subscription {
  id: string
  created_at: string
  updated_at: string
  deleted_at: null
  name: string
  description: string
  duration: number
  price: number
}

export interface SubscriptionDetail {
  id: string
  name: string
  description: string
  duration: number
  price: number
  created_at: string
  updated_at: string
  deleted_at: null
  resource_limits: ResourceLimit[]
}

interface ResourceLimit {
  id: string
  name: string
  limit: number
  resource_type: string
  subscription_plan_id: string
  created_at: string
  updated_at: string
  deleted_at: null
}

export interface PaySubscription {
  id: string
  created_at: string
  updated_at: string
  deleted_at: null
  amount: number
  description: string
  code: string
  user_plan_status: 'SUCCESS' | 'WAITING'
  paymented_at: string
  subscription_expired_at: string
}
