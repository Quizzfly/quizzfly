import type { BaseResponse } from '@/types/api'
import type { IQuizzflyInfo } from '@/types/quizzfly'

export const createSlideApi = async (
  quizzflyId: string,
  data: any,
): Promise<BaseResponse<IQuizzflyInfo>> => {
  return $api(`/quizzflies/${quizzflyId}/slides`, {
    method: 'POST',
    body: data,
  })
}
