import type { BaseResponse } from '@/types/api'
import type { Question } from '@/types/question'
import type { IQuizzflyInfo } from '@/types/quizzfly'

export const getQuizzflysApi = async ({
  page = 1,
  keyword = '',
}): Promise<BaseResponse<IQuizzflyInfo[]>> => {
  return $api('/quizzfly', {
    method: 'GET',
    params: {
      page,
      keyword,
    },
  })
}

export const getQuizzflyApi = async (id: string): Promise<BaseResponse<IQuizzflyInfo>> => {
  return $api(`/quizzfly/${id}`, {
    method: 'GET',
  })
}

export const getQuizzflyQuestionsApi = async (id: string): Promise<BaseResponse<Question[]>> => {
  return $api(`/quizzfly/${id}/questions`, {
    method: 'GET',
  })
}

export const createQuizzflyApi = async (
  data: IQuizzflyInfo,
): Promise<BaseResponse<IQuizzflyInfo>> => {
  return $api('/quizzfly', {
    method: 'POST',
    body: data,
  })
}

export const createQuizzflyDraftApi = async (
  data: IQuizzflyInfo,
): Promise<BaseResponse<IQuizzflyInfo>> => {
  return $api('/quizzfly/drafts', {
    method: 'POST',
    body: data,
  })
}

export const updateQuizzflySettingsApi = async (
  id: string,
  data: Partial<IQuizzflyInfo>,
): Promise<BaseResponse<IQuizzflyInfo>> => {
  return $api(`/quizzfly/${id}/settings`, {
    method: 'PUT',
    body: data,
  })
}

interface ChangePositionPayload {
  first_question_id: string
  first_question_type: string
  second_question_id: string
  second_question_type: string
}
export const changeQuestionPositionApi = async (
  quizzflyId: string,
  data: ChangePositionPayload,
): Promise<BaseResponse<Question[]>> => {
  return $api(`/quizzfly/${quizzflyId}/questions/position`, {
    method: 'PUT',
    body: data,
  })
}
