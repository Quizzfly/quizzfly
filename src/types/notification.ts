export interface INotification {
  id: string
  created_at: string
  object_id: string
  content: string
  notification_type: string
  is_read: boolean
  target_id: string
  target_type: string
  description: string
  agent: {
    id: string
    username: string
    avatar: string
    name: string
  }
}
