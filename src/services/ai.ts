import type { Quiz } from '@/types/question'

interface Option {
  numberOfQuestion?: number
  theme: string
  quizTypes: Array<string>
}

export const createQuizUseAIApi = async (
  model: string,
  language: string,
  option: Option,
  quizzes: string[],
): Promise<Quiz[]> => {
  return $api('/quizzfly/quizzes/generate-by-ai', {
    method: 'POST',
    body: {
      model,
      language,
      option,
      quizzes,
    },
  })
}

export interface Model {
  name: string
  value: string
  logo: string
  premium: boolean
}

export const getModelList = async (): Promise<Model[]> => {
  return $api(`https://hinam.nuxt.dev/api/ai/models`, {
    method: 'GET',
  })
}
