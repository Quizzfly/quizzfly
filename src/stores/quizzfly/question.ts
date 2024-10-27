import type { Question, Quiz } from '@/types/question'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { changeQuestionPositionApi, getQuizzflyQuestionsApi } from '@/services/quizzfly'
import { useQuizzflyStore } from './quizzfly'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import {
  createSlideApi,
  deleteSlideApi,
  duplicateSlideApi,
  updateSlideApi,
} from '@/services/slides'
import { slideLayouts } from '@/modules/slide/layout'
import { createQuizApi, deleteQuizApi, duplicateQuizApi, updateQuizApi } from '@/services/quizzes'

export const useQuestionsStore = defineStore({
  id: 'question',
  state: () => ({
    currentQuestion: {} as Question,
    questions: [] as Question[],
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

    async deleteQuestion(question: Question) {
      // Delete a question by ID
      const quizzflyStore = useQuizzflyStore()
      try {
        if ((question as Quiz).quiz_type) {
          await deleteQuizApi(quizzflyStore.getQuizzflyInfo.id, question.id)
        } else {
          await deleteSlideApi(quizzflyStore.getQuizzflyInfo.id, question.id)
        }
        this.questions = this.questions.filter((q) => q.id !== question.id)
        showToast({
          description: 'Question deleted successfully',
          variant: 'default',
        })
        this.currentQuestion = this.questions[0] || {}
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
    },

    async duplicateQuestion(question: Question) {
      // Duplicate a question by ID
      const quizzflyStore = useQuizzflyStore()
      try {
        if ((question as Quiz).quiz_type) {
          const { data } = await duplicateQuizApi(quizzflyStore.getQuizzflyInfo.id, question.id)
          this.questions.push(data)
        } else {
          // Duplicate a slide
          const { data } = await duplicateSlideApi(quizzflyStore.getQuizzflyInfo.id, question.id)
          this.questions.push(data)
        }
        showToast({
          description: 'Question duplicated successfully',
          variant: 'default',
        })
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
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

    async addQuestion(questionType: 'quiz' | 'slide', question?: Partial<Question>) {
      if (questionType === 'quiz') {
        // Create a quiz
        try {
          const { data } = await createQuizApi(useQuizzflyStore().getQuizzflyInfo.id, {
            quiz_type: (question as Quiz).quiz_type,
          })
          data.type = 'QUIZ'
          this.questions.push(data)
          this.setCurrentQuestion(data)
        } catch (error) {
          console.error(error)
          showToast({
            description: apiError(error).message,
            variant: 'destructive',
          })
        }
        return
      }

      try {
        const { data } = await createSlideApi(useQuizzflyStore().getQuizzflyInfo.id, {
          ...question,
          content: JSON.stringify(slideLayouts[0]),
        })
        data.type = 'SLIDE'
        this.questions.push(data)
        this.setCurrentQuestion(data)
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

    async changePosition(data: any) {
      const quizzflyStore = useQuizzflyStore()
      try {
        quizzflyStore.setIsUpdating(true)
        await changeQuestionPositionApi(useQuizzflyStore().getQuizzflyInfo.id, data)
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      } finally {
        quizzflyStore.setIsUpdating(false)
      }
    },

    async updateCurrentQuestion(questionType: 'quiz' | 'slide', question: Partial<Question>) {
      const quizzflyStore = useQuizzflyStore()
      quizzflyStore.setIsUpdating(true)
      // Merge partial data into the current question and update the question list
      const quizzflyStoreId = quizzflyStore.getQuizzflyInfo.id
      if (questionType === 'quiz') {
        await updateQuizApi(quizzflyStoreId, this.currentQuestion.id || '', question)
      } else {
        const { data } = await updateSlideApi(
          quizzflyStoreId,
          this.currentQuestion.id || '',
          question,
        )
        console.log(data)
      }
      console.log(question)
      this.currentQuestion = { ...this.currentQuestion, ...question }
      this.updateQuestionInList(this.currentQuestion)
      setTimeout(() => {
        quizzflyStore.setIsUpdating(false)
      }, 100)
    },

    updateQuestionInList(question: Question) {
      // Update the question in the list by finding it by ID
      const index = this.findQuestionIndexById(question.id || '')
      if (index !== -1) this.questions[index] = { ...this.questions[index], ...question }
    },

    updateCurrentQuestionAnswers(answers: any[]) {
      console.log(answers)
      // Update the current question's answers and sync with the main list
      // this.currentQuestion.answers = answers
      // this.updateQuestionInList(this.currentQuestion)
    },

    updateCurrentQuestionAnswer(answer: any) {
      console.log(answer)
      // Update a specific answer in the current question
      // const index = this.findAnswerIndexById(answer.id)
      // if (index !== -1 && this.currentQuestion.answers) {
      //   this.currentQuestion.answers[index] = answer
      //   this.updateCurrentQuestionAnswers(this.currentQuestion.answers)
      // }
    },

    findQuestionIndexById(id: string) {
      // Find the index of a question by its ID
      return this.questions.findIndex((question) => question.id === id)
    },

    // findAnswerIndexById(id: string) {
    // Find the index of an answer in the current question by its ID
    // return this.currentQuestion.answers?.findIndex((answer) => answer.id === id) ?? -1
    // },
  },
  getters: {
    getSlideById: (state) => (id: string) => {
      // Retrieve a question by its ID
      return state.questions.find((question) => question.id === id)
    },
    getSlides: (state) => state.questions,
    getCurrentQuestion: (state) => state.currentQuestion,
    getCurrentQuestionAnswers: () => [] as any,
  },
})
