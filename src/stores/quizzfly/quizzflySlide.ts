import type { Question } from '@/types'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useQuestionsStore = defineStore({
  id: 'slide',
  state: () => ({
    currentQuestion: {} as Question,
    questions: [
      {
        id: uuidv4(),
        title: 'Question 1',
        type: 'quiz',
        quizType: 'multiple_choice',
        content: 'This is a quiz slide',
        image: 'https://picsum.photos/200/300',
        link: 'https://picsum.photos/200/300',
        answers: [],
      },
    ] as Question[],
  }),
  actions: {
    async fetchSlides() {
      // fetch questions from an API
      // const questions = await fetch('/api/questions')
      // this.questions = await questions.json()
    },
    updateQuestion(questions: Question[]) {
      this.questions = questions
    },
    addSlide(slide: Question) {
      this.questions.push(slide)
    },
    setCurrentQuestion(slide: Question) {
      this.currentQuestion = slide
    },
    updateCurrentQuestion(slide: Partial<Question>) {
      this.currentQuestion = { ...this.currentQuestion, ...slide }
      this.updateSlide(this.currentQuestion)
    },
    updateSlide(slide: Question) {
      const index = this.questions.findIndex((s) => s.id === slide.id)
      this.questions[index] = slide
    },
    updateCurrentQuestionAnswers(answers: any[]) {
      this.currentQuestion.answers = answers
      const index = this.questions.findIndex((s) => s.id === this.currentQuestion.id)
      this.questions[index].answers = answers
    },
  },
  getters: {
    getSlideById: (state) => (id: string) => {
      return state.questions.find((s) => s.id === id)
    },
    getSlides: (state) => state.questions,
    getCurrentQuestion: (state) => state.currentQuestion,
    getCurrentQuestionAnswers: (state) => state.currentQuestion.answers,
  },
})
