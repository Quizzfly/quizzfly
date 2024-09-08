import { useAuthStore } from "@/stores/auth";
import type { NavigationGuardWithThis } from "vue-router";

export const authGuard: NavigationGuardWithThis<any> = async (to, from, next) => {
    document.title = String(to.meta.title) || "Home";
    const authStore = useAuthStore();
    console.log("authGuard", authStore.getIsLoggedIn, to);

    const isLoggedIn = authStore.getIsLoggedIn;
    const isPublicRoute = to.meta?.public;

    if (isLoggedIn) {
        isPublicRoute ? next("/") : next();
    } else {
        isPublicRoute ? next() : next({ name: "login" });
    }
};

export const workspaceGuard: NavigationGuardWithThis<any> = async (to, from, next) => {
    next("/");
};
