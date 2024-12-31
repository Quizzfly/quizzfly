import { useAuthStore } from './auth'
import { useRoomSocketStore } from './socket/room'
import { useGroupSocketStore } from './socket/group'
import { useNotificationSocketStore } from './socket/notification'
import { showToast } from '@/utils/toast'

export const initAuthStore = async () => {
  const authStore = useAuthStore()
  await authStore.setupAuth()
  // if (authStore.getIsLoggedIn) {
  //     await Promise.all([workspaceStore.setupWorkspace()]);
  // }
}

export const initMasterStore = async () => {
  try {
    // const masterStore = useMasterStore();
    // await Promise.all([masterStore.setMasterData(), masterStore.setEmojis()]);
  } catch (error) {
    showToast({
      title: 'Forgot password failed',
      description: 'Xảy ra lỗi khi lấy dữ liệu',
      variant: 'destructive',
    })
  }
}

export const initWebSocketStore = async () => {
  const roomSocketStore = useRoomSocketStore()
  const notificationSocketStore = useNotificationSocketStore()
  const groupSocketStore = useGroupSocketStore()
  if (useAuthStore().getUser?.id) {
    await groupSocketStore.setupGroupSocketStore()
    await notificationSocketStore.setupNotificationSocketStore()
  }

  await roomSocketStore.setupRoomSocketStore()
}

export { useUserStore } from './user'
