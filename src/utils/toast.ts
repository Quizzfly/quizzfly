// toastUtils.ts
import { h } from 'vue'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

export function showToast({
  title = 'Notification',
  description = '',
  variant = 'default' as 'default' | 'destructive',
  actionText = '',
  onActionClick = () => {},
}) {
  toast({
    title,
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
