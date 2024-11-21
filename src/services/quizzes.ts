import type { Answer, FileMeta, Question, Quiz } from '@/types/question'
import type { BaseResponse } from '@/types/api'
import type { QuestionSetting } from '@/types/setting'

export const createQuizApi = async (
  quizzflyId: string,
  data: Partial<Quiz>,
): Promise<BaseResponse<Quiz>> => {
  return $api(`/quizzfly/${quizzflyId}/quizzes`, {
    method: 'POST',
    body: data,
  })
}

export const createMultipleQuizApi = async (
  quizzflyId: string,
  data: Partial<Quiz>[],
): Promise<BaseResponse<Question[]>> => {
  return $api(`/quizzfly/${quizzflyId}/quizzes/batch`, {
    method: 'POST',
    body: {
      quizzes: data,
    },
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

export const updateQuizSettingsApi = async (
  quizzflyId: string,
  quizId: string,
  data: Partial<QuestionSetting>,
): Promise<BaseResponse<Quiz>> => {
  return $api(`/quizzfly/${quizzflyId}/quizzes/${quizId}/settings`, {
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

interface CreateAnswerPayload {
  content: string
  files?: FileMeta[]
}

export const createAnswerApi = async (
  quizId: string,
  data: CreateAnswerPayload,
): Promise<BaseResponse<Answer>> => {
  return $api(`/quizzes/${quizId}/answers`, {
    method: 'POST',
    body: data,
  })
}

export const updateAnswerApi = async (
  answerId: string,
  data: Partial<Answer>,
): Promise<BaseResponse<Answer>> => {
  return $api(`/quizzes/answers/${answerId}`, {
    method: 'PUT',
    body: data,
  })
}

export const deleteAnswerApi = async (answerId: string): Promise<BaseResponse<Answer>> => {
  return $api(`/quizzes/answers/${answerId}`, {
    method: 'DELETE',
  })
}
