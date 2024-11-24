export interface IGroup {
  role: string
  group: IDetailGroup
}

export interface IDetailGroup {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  name: string
  description: string
  background: string
}

export interface IGroupCreate {
  name: string
  description: string
  background: string
}

export interface IMemberGroup {
  id: string
  name: string
  username: string
  email: string
  avatar: string
  role_in_group: string
}

export interface IPost {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  member_id: string
  type: string
  content: string
  quizzfly_id: string
  files: Array<string>
}

export interface ICreatePost {
  type: string
  content: string
  quizzfly_id: string
  files: Array<string>
}
