export interface IQuizzflyInfo {
  id: string
  title: string
  cover_image: null | string
  theme: null | string
  is_public: boolean
  quizzfly_status: string
  description: string
  user_id: string
  created_at: string
  updated_at: string
  deleted_at: null
  username: string
  avatar: string
}

export interface IQuizzflyShared {
  id: string
  created_at: string
  title: string
  cover_image: string
  description: string
  is_public: boolean
  quizzfly_status: string
  user_id: string
  username: string
  avatar: string
}
