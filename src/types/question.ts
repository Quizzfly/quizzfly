export type Question = Slide | Quiz

export interface Slide {
  id: string
  content: string
  files: File[]
  background_color: string
  prev_element_id: string
  created_at: string
}

export interface Quiz {
  id: string
  created_at: string
  updated_at: string
  deleted_at: any
  content: string
  time_limit: number
  point_multiplier: number
  quiz_type: QuizType
  files: File[]
  prev_element_id: string
  quizzfly_id: string
  theme: string
}

export type QuizType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SLIDER' | 'TYPING_ANSWER'

export interface File {
  public_id: string
  original_filename: string
  format: string
  resource_type: string
  url: string
  bytes: number
}
