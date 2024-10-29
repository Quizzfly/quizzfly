export interface SettingRoom {
  is_show_question: boolean
  is_auto_play: boolean
  lobby_music: string
}

export interface QuestionSetting {
  time_limit: number
  point_multiplier: number
  quiz_type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SLIDER' | 'TYPING_ANSWER'
}
