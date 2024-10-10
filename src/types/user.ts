export interface IUser {
  id: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
  user_info: {
    id: string
    username: string
    name: string
    avatar: string
    createdAt: string
    updateAt: string
  }
}

export interface Member {
  member: IUser
  permission: 'OWNER' | 'MEMBER'
}
