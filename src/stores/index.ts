import { useAuthStore } from './auth'
import { useRoomSocketStore } from './socket/room'
import { useGroupSocketStore } from './socket/group'
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
  const socketStore = useRoomSocketStore()
  socketStore.setupRoomSocketStore()
  if (useAuthStore().getUser?.id) {
    useGroupSocketStore().setupGroupSocketStore()
  }
}

export { useUserStore } from './user'
