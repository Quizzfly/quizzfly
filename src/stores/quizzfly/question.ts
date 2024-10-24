import { uploadFileApi } from '@/services/file'
import type { Question } from '@/types'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { useLoadingStore } from '../loading'
import { getQuizzflyQuestionsApi } from '@/services/quizzfly'
import { useQuizzflyStore } from './quizzfly'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import { createSlideApi } from '@/services/slides'
import { slideLayouts } from '@/modules/slide/layout'

export const useQuestionsStore = defineStore({
  id: 'question',
  state: () => ({
    currentQuestion: {} as Question,
    questions: [
      {
        id: uuidv4(),
        title: 'Question 1',
        type: 'quiz',
        quizType: 'multiple_choice',
        content: 'This is a quiz question',
        image: '',
        theme: '',
        link: 'https://picsum.photos/200/300',
        answers: [],
      },
    ] as Question[],
  }),
  actions: {
    async fetchQuestions() {
      const quizzflyStore = useQuizzflyStore()
      try {
        const { data } = await getQuizzflyQuestionsApi(quizzflyStore.getQuizzflyInfo.id)
        this.updateQuestions(data)
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
    },

    initAnswers(quizType: string) {
      // Initialize answer options based on quiz type
      const answers = this.generateAnswersByQuizType(quizType)
      this.updateCurrentQuestionAnswers(answers)
    },

    generateAnswersByQuizType(quizType: string) {
      // Generate answers based on quiz type
      switch (quizType) {
        case 'multiple_choice':
          return Array(4)
            .fill(null)
            .map(() => ({ id: uuidv4(), text: '', isCorrect: false }))
        case 'true_false':
          return [
            { id: uuidv4(), text: 'True', isCorrect: false },
            { id: uuidv4(), text: 'False', isCorrect: false },
          ]
        default:
          return []
      }
    },

    updateQuestions(questions: Question[]) {
      // Replace current questions with provided list
      this.questions = questions
    },

    async addSlide(question: Question) {
      // Add a new question to the store
      try {
        await createSlideApi(useQuizzflyStore().getQuizzflyInfo.id, {
          ...question,
          content: JSON.stringify(slideLayouts[0]),
        })
        this.questions.push(question)
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
    },

    setCurrentQuestion(question: Question) {
      // Set the current question
      this.currentQuestion = question
    },

    async setCurrentQuestionImage(file: File) {
      // Upload an image and set it as the current question's image
      const loadingStore = useLoadingStore()
      loadingStore.setLoading(true)
      try {
        const formData = new FormData()
        formData.append('file', file)
        const { data } = await uploadFileApi(formData)
        this.currentQuestion.image = data.url
      } catch (error) {
        console.error(error)
      }
      loadingStore.setLoading(false)
    },

    updateCurrentQuestion(question: Partial<Question>) {
      // Merge partial data into the current question and update the question list
      this.currentQuestion = { ...this.currentQuestion, ...question }
      this.updateQuestionInList(this.currentQuestion)
    },

    updateQuestionInList(question: Question) {
      // Update the question in the list by finding it by ID
      const index = this.findQuestionIndexById(question.id || '')
      if (index !== -1) this.questions[index] = { ...this.questions[index], ...question }
    },

    updateCurrentQuestionAnswers(answers: any[]) {
      // Update the current question's answers and sync with the main list
      this.currentQuestion.answers = answers
      this.updateQuestionInList(this.currentQuestion)
    },

    updateCurrentQuestionAnswer(answer: any) {
      // Update a specific answer in the current question
      const index = this.findAnswerIndexById(answer.id)
      if (index !== -1 && this.currentQuestion.answers) {
        this.currentQuestion.answers[index] = answer
        this.updateCurrentQuestionAnswers(this.currentQuestion.answers)
      }
    },

    findQuestionIndexById(id: string) {
      // Find the index of a question by its ID
      return this.questions.findIndex((question) => question.id === id)
    },

    findAnswerIndexById(id: string) {
      // Find the index of an answer in the current question by its ID
      return this.currentQuestion.answers?.findIndex((answer) => answer.id === id) ?? -1
    },
  },
  getters: {
    getSlideById: (state) => (id: string) => {
      // Retrieve a question by its ID
      return state.questions.find((question) => question.id === id)
    },
    getSlides: (state) => state.questions,
    getCurrentQuestion: (state) => state.currentQuestion,
    getCurrentQuestionAnswers: (state) => state.currentQuestion.answers,
  },
})
