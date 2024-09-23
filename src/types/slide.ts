export interface Slide {
  id: number
  title: string
  content: string
  image: string
  link: string
  type: 'quiz' | 'slide'
}
