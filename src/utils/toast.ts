// toastUtils.ts
import { h } from 'vue'
import { ToastAction } from '@/components/ui/toast'
import { useToast, type StringOrVNode } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

interface ToastOptions {
  title?: string
  description?: StringOrVNode
  variant?: 'default' | 'destructive' | 'success'
  actionText?: string
  onActionClick?: () => void
}

export function showToast({
  title = '',
  description = '',
  variant = 'default' as 'default' | 'destructive' | 'success',
  actionText = '',
  onActionClick = () => {},
}: ToastOptions) {
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
