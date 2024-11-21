import type { Answer, Question, Quiz, QuizType } from '@/types/question'
import { defineStore } from 'pinia'
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
import {
  createAnswerApi,
  createQuizApi,
  deleteAnswerApi,
  deleteQuizApi,
  duplicateQuizApi,
  updateAnswerApi,
  updateQuizApi,
  updateQuizSettingsApi,
} from '@/services/quizzes'
import type { QuestionSetting } from '@/types/setting'
import { useLoadingStore } from '../loading'
import { uploadFileApi } from '@/services/file'

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
        throw error
      }
    },

    async initAnswers(quizType: QuizType) {
      // Initialize answer options based on quiz type
      const answers = await this.generateAnswersByQuizType(quizType)
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
        let duplicatedQuestion: Question

        if ((question as Quiz).quiz_type) {
          // Duplicate a quiz question
          const { data } = await duplicateQuizApi(quizzflyStore.getQuizzflyInfo.id, question.id)
          duplicatedQuestion = data
          // ;(duplicatedQuestion as Quiz).answers = []
          duplicatedQuestion.type = 'QUIZ'
        } else {
          // Duplicate a slide question
          const { data } = await duplicateSlideApi(quizzflyStore.getQuizzflyInfo.id, question.id)
          duplicatedQuestion = data
          duplicatedQuestion.type = 'SLIDE'
        }

        // Find the original question index and insert the duplicated question right after
        const originalIndex = this.findQuestionIndexById(question.id)
        if (originalIndex !== -1) {
          this.questions.splice(originalIndex + 1, 0, duplicatedQuestion)
        } else {
          this.questions.push(duplicatedQuestion)
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

    async generateAnswersByQuizType(quizType: QuizType) {
      if (quizType === 'TRUE_FALSE') {
        try {
          const answers = await Promise.all(
            [
              { content: 'True', is_correct: false },
              { content: 'False', is_correct: false },
            ].map(async (answer) => {
              const { data } = await createAnswerApi(this.currentQuestion.id || '', answer)
              return data
            }),
          )

          return answers
        } catch (error) {
          showToast({
            description: apiError(error).message,
            variant: 'destructive',
          })
        }
        return []
      } else {
        return (this.currentQuestion as Quiz).answers || []
      }
    },

    updateQuestions(questions: Question[]) {
      // Replace current questions with provided list
      this.questions = questions
    },

    async addMultipleQuestions(questions: Question[]) {
      // Add multiple questions to the list
      this.questions.push(...questions)
    },

    async addQuestion(questionType: 'quiz' | 'slide', question?: Partial<Question>) {
      if (questionType === 'quiz') {
        // Create a quiz
        try {
          const { data } = await createQuizApi(useQuizzflyStore().getQuizzflyInfo.id, {
            ...question,
          })
          data.type = 'QUIZ'
          data.time_limit = 20
          data.point_multiplier = 1
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

    setCurrentQuestion(question: Question, forceScroll = false) {
      // Set the current question
      this.currentQuestion = question

      if (forceScroll) {
        nextTick(() => {
          document.getElementById(`question-${question.id}`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        })
      }
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
      try {
        if (questionType === 'quiz') {
          await updateQuizApi(quizzflyStoreId, this.currentQuestion.id || '', question)
        } else {
          await updateSlideApi(quizzflyStoreId, this.currentQuestion.id || '', question)
        }
        this.currentQuestion = { ...this.currentQuestion, ...question }
        this.updateQuestionInList(this.currentQuestion)
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
      setTimeout(() => {
        quizzflyStore.setIsUpdating(false)
      }, 200)
    },

    updateQuestionInList(question: Question) {
      // Update the question in the list by finding it by ID
      const index = this.findQuestionIndexById(question.id || '')
      if (index !== -1) this.questions[index] = { ...this.questions[index], ...question }
    },

    updateCurrentQuestionAnswers(answers: Answer[]) {
      // Update the current question's answers and sync with the main list
      ;(this.currentQuestion as Quiz).answers = answers
      this.updateQuestionInList(this.currentQuestion)
    },

    async updateCurrentQuestionAnswer(answer: Answer) {
      const quizzflyStore = useQuizzflyStore()
      quizzflyStore.setIsUpdating(true)
      // Update a specific answer in the current question
      try {
        // reset all answers to false if the answer is correct
        if (answer.is_correct) {
          ;(this.currentQuestion as Quiz).answers = (this.currentQuestion as Quiz).answers?.map(
            (a) => ({
              ...a,
              is_correct: false,
            }),
          )
        }

        const index = this.findAnswerIndexById(answer.id)
        if (index !== -1 && (this.currentQuestion as Quiz).answers) {
          const { data } = await updateAnswerApi(answer.id || '', answer)
          ;(this.currentQuestion as Quiz).answers[index] = data
          this.updateCurrentQuestionAnswers((this.currentQuestion as Quiz).answers)
        }
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
      setTimeout(() => {
        quizzflyStore.setIsUpdating(false)
      }, 200)
    },

    findQuestionIndexById(id: string) {
      // Find the index of a question by its ID
      return this.questions.findIndex((question) => question.id === id)
    },

    findAnswerIndexById(id: string) {
      // Find the index of an answer in the current question by its ID
      return (this.currentQuestion as Quiz).answers?.findIndex((answer) => answer.id === id) ?? -1
    },

    async updateQuestionSettings(data: Partial<QuestionSetting>) {
      const quizzflyStore = useQuizzflyStore()
      try {
        quizzflyStore.setIsUpdating(true)
        await updateQuizSettingsApi(
          quizzflyStore.getQuizzflyInfo.id,
          this.currentQuestion.id || '',
          data,
        )
        this.currentQuestion = { ...this.currentQuestion, ...data }
        this.updateQuestionInList(this.currentQuestion)
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

    async updateQuestionFile(questionType: 'quiz' | 'slide', file: File) {
      const loadingStore = useLoadingStore()
      // const target = event.target as HTMLInputElement
      // const file = target.files?.[0]

      if (file) {
        loadingStore.setLoading(true)
        const formData = new FormData()
        formData.append('file', file)
        try {
          const { data } = await uploadFileApi(formData)
          this.updateCurrentQuestion(questionType, { files: [data] })
        } catch (error) {
          showToast({
            title: 'Error',
            description: 'Error uploading image',
            variant: 'destructive',
          })
        } finally {
          loadingStore.setLoading(false)
        }
      }
    },

    async clearAllAnswers() {
      // Clear all answers in the current question
      try {
        await Promise.all(
          (this.currentQuestion as Quiz).answers?.map((answer) => deleteAnswerApi(answer.id)),
        )
        this.updateCurrentQuestionAnswers([])
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
        throw error
      }
    },
  },
  getters: {
    getSlideById: (state) => (id: string) => {
      // Retrieve a question by its ID
      return state.questions.find((question) => question.id === id)
    },
    getSlides: (state) => state.questions,
    getCurrentQuestion: (state) => state.currentQuestion,
  },
})
