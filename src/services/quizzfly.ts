import type { BaseResponse } from '@/types/api'
import type { IQuizzflyInfo } from '@/types/quizzfly'

export const getQuizzflysApi = async (): Promise<BaseResponse<IQuizzflyInfo[]>> => {
  return $api('/quizzfly', {
    method: 'GET',
  })
}

export const getQuizzflyApi = async (id: string): Promise<BaseResponse<IQuizzflyInfo>> => {
  return $api(`/quizzfly/${id}`, {
    method: 'GET',
  })
}

export const getQuizzflyQuestionsApi = async (id: string): Promise<BaseResponse<IQuizzflyInfo>> => {
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
