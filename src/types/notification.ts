export interface INotification {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  content: string
  time_limit: number
  point_multiplier: number
  quiz_type: 'MULTIPLE_CHOICE | SINGLE_SELECT_QUIZ | MULTI_SELECT_QUIZ | TRUE_FALSE | WORD_CLOUD | BRAINSTORMING | OPEN_ENDED | CONTENT | PUZZLE | SINGLE_SELECT_POLL | MULTI_SELECT_POLL | TYPE_ANSWER | SLIDER | DROP_PIN | UNMAPPED'
  files: []
  background_url: string
  prev_element_id: string
  quizzfly_id: string
  avatar: string
  name: string
  is_read: boolean
  notification_type: string
  object_id: string
  answers: [
    {
      id: string
      created_at: string
      updated_at: string
      deleted_at: string | null
      content: string
      is_correct: boolean
      files: [
        {
          public_id: string
          original_filename: string
          format: string
          resource_type: string
          url: string
          bytes: number
        },
      ]
      index: string
      quiz_id: string
    },
  ]
}
