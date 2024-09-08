export interface IUser {
  id: string
  first_name: ''
  last_name: ''
  user_id?: string
  sub_id: string
  name: string
  email: string
  role: string
  property_id: string
  avatar: string
  setting_language_id: string
  working_language_id: string
  is_company: boolean
  confirm_is_company: boolean
  enabled: boolean
}

export interface Member {
  member: IUser
  permission: 'OWNER' | 'MEMBER'
}
