export interface Question {
  id?: string
  title: string
  content: string
  image: string
  link: string
  theme: string
  type: 'quiz' | 'slide'
  quizType?: string
  answers?: any[]
}
