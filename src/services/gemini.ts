import type { Quiz } from '@/types/question'

interface Option {
  numberOfQuestion?: number
  theme: string
  quizTypes: Array<string>
}

export const createQuizUseAIApi = async (language: string, option: Option): Promise<Quiz[]> => {
  return $api(`https://hinam.nuxt.dev/api/gemini/quizzes`, {
    method: 'POST',
    body: {
      language,
      option,
    },
  })
}
