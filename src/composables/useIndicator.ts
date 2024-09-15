import { useNProgress } from '@vueuse/integrations/useNProgress'

export const useIndicator = (init = 0.3) => {
  const { isLoading, progress } = useNProgress(init)

  return {
    isLoading,
    progress,
  }
}
