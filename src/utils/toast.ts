// toastUtils.ts
import { h } from 'vue'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

interface ToastOptions {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
  actionText?: string
  onActionClick?: () => void
}

export function showToast({
  title = '',
  description = '',
  variant = 'default' as 'default' | 'destructive',
  actionText = '',
  onActionClick = () => {},
}: ToastOptions) {
  console.log('showToast', title)
  toast({
    title: title || (variant === 'destructive' ? 'Error' : 'Success'),
    description,
    variant: variant,
    action: actionText
      ? h(
          ToastAction,
          {
            altText: actionText,
            onClick: onActionClick,
          },
          {
            default: () => actionText,
          },
        )
      : undefined,
  })
}
