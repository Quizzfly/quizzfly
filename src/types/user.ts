export interface IUser {
  id: string
  email: string
  role: string
  created_at: string
  updated_at: string
  user_info: Userinfo
}

export interface Userinfo {
  id: string
  username: string
  name: string
  avatar: null
  created_at: string
  updated_at: string
}
