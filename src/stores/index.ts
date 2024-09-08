import { useAuthStore } from "./auth";
import { useSocketStore } from "./socket";

export const initAuthStore = async () => {
    const authStore = useAuthStore();
    await authStore.setupAuth();
    // if (authStore.getIsLoggedIn) {
    //     await Promise.all([workspaceStore.setupWorkspace()]);
    // }
};

export const initMasterStore = async () => {
    try {
        // const masterStore = useMasterStore();
        // await Promise.all([masterStore.setMasterData(), masterStore.setEmojis()]);
    } catch (error) {
        notify.error("Xảy ra lỗi khi lấy dữ liệu");
    }
};

export const initWebSocketStore = async () => {
    const socketStore = useSocketStore();
    socketStore.setupSocketStore();
};
