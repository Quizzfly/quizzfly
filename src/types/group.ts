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
