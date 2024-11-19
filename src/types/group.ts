export interface IGroup {
  role: string
  group: {
    id: string
    created_at: string
    updated_at: string
    deleted_at: string
    name: string
    description: string
    background: string
  }
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
