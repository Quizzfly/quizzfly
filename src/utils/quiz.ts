import type { QuizType } from '@/types/question'

interface QuizOption {
  type: QuizType
  name: string
  icon: string
}
export const quizOptions: QuizOption[] = [
  {
    type: 'MULTIPLE_CHOICE',
    name: 'Choice',
    icon: '/assets/icons/multiple-choice.svg',
  },
  {
    type: 'TRUE_FALSE',
    name: 'True or False',
    icon: '/assets/icons/true-false.svg',
  },
  // {
  //   type: 'SLIDER',
  //   name: 'Slider',
  //   icon: '/assets/icons/slider-answer.svg',
  // },
  // {
  //   type: 'TYPING_ANSWER',
  //   name: 'Typing answer',
  //   icon: '/assets/icons/typing-answer.svg',
  // },
]
