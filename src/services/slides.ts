import type { BaseResponse } from '@/types/api'

export const createSlideApi = async (
  quizzflyId: string,
  data: any,
): Promise<BaseResponse<IQuizzflyInfo>> => {
  return $api(`/quizzflies/${quizzflyId}/slides`, {
    method: 'POST',
    body: data,
  })
}
