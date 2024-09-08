// refactor user store
import { defineStore } from "pinia";
import type { IUser } from "@/types";
import { getInfoApi, getUserApi } from "@/services/user";
import type { BaseResponse } from "@/types/api";

interface callbackCache {
    id: string;
    callback: Promise<BaseResponse<IUser[]>>;
}
export const useUserStore = defineStore({
    id: "users",
    state: () => ({
        users: [] as IUser[],
        fetchCache: [] as callbackCache[],
    }),
    actions: {
        async getUser(sub_id: string) {
            const user = this.users.find((u) => u.sub_id === sub_id);
            if (user) {
                return user;
            }

            const cache = this.fetchCache.find((item) => item.id === sub_id);

            if (cache) {
                const res = await cache.callback.then((u) => {
                    console.log(u);
                    return u.data[0];
                });

                return res;
            } else {
                const fetchUserCallback = getUserApi(sub_id).then((resp) => {
                    this.users.push(resp.data[0]);
                    this.fetchCache = this.fetchCache.filter((f) => f.id !== sub_id);
                    return resp;
                });

                this.fetchCache.push({
                    id: sub_id,
                    callback: fetchUserCallback,
                });

                return (await fetchUserCallback).data[0];
            }
        },
    },
});
