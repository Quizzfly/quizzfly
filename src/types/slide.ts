export interface Slide {
  id?: string
  title: string
  content: string
  image: string
  link: string
  type: 'quiz' | 'slide'
  quizType?: string
  answers?: any[]
}
