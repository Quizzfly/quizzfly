import type { Quiz, QuizType } from '@/types/question'
import type { BaseResponse } from '@/types/api'

export const createQuizApi = async (
  quizzflyId: string,
  data: {
    quiz_type: QuizType
  },
): Promise<BaseResponse<Quiz>> => {
  return $api(`/quizzfly/${quizzflyId}/quizzes`, {
    method: 'POST',
    body: data,
  })
}

export const deleteQuizApi = async (
  quizzflyId: string,
  quizId: string,
): Promise<BaseResponse<Quiz>> => {
  return $api(`/quizzfly/${quizzflyId}/quizzes/${quizId}`, {
    method: 'DELETE',
  })
}

export const updateQuizApi = async (
  quizzflyId: string,
  quizId: string,
  data: Partial<Quiz>,
): Promise<BaseResponse<Quiz>> => {
  return $api(`/quizzfly/${quizzflyId}/quizzes/${quizId}`, {
    method: 'PUT',
    body: data,
  })
}

export const duplicateQuizApi = async (
  quizzflyId: string,
  quizId: string,
): Promise<BaseResponse<Quiz>> => {
  return $api(`/quizzfly/${quizzflyId}/quizzes/${quizId}/duplicate`, {
    method: 'POST',
  })
}
