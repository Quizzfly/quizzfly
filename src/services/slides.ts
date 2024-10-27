import type { Slide } from '@/types/question'
import type { BaseResponse } from '@/types/api'

export const createSlideApi = async (
  quizzflyId: string,
  data: any,
): Promise<BaseResponse<Slide>> => {
  return $api(`/quizzfly/${quizzflyId}/slides`, {
    method: 'POST',
    body: data,
  })
}

export const updateSlideApi = async (
  quizzflyId: string,
  slideId: string,
  data: Partial<Slide>,
): Promise<BaseResponse<Slide>> => {
  return $api(`/quizzfly/${quizzflyId}/slides/${slideId}`, {
    method: 'PUT',
    body: data,
  })
}

export const deleteSlideApi = async (
  quizzflyId: string,
  slideId: string,
): Promise<BaseResponse<Slide>> => {
  return $api(`/quizzfly/${quizzflyId}/slides/${slideId}`, {
    method: 'DELETE',
  })
}

export const duplicateSlideApi = async (
  quizzflyId: string,
  slideId: string,
): Promise<BaseResponse<Slide>> => {
  return $api(`/quizzfly/${quizzflyId}/slides/${slideId}/duplicate`, {
    method: 'POST',
  })
}
