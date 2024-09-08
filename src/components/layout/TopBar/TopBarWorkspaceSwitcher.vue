<template>
    <div class="card flex justify-center relative">
        <div class="flex items-center gap-5">
            <Icon
                class="w-5 h-5 fill-white cursor-pointer"
                icon="menu-burger"
                @click="toggle"
            />
        </div>

        <div
            v-show="isShowPopover"
            v-on-click-outside="onClosePopover"
            class="w-[300px] absolute left-0 bg-white z-1 top-full shadow-default rounded-md border border-slate-200"
        >
            <div>
                <div class="p-2">
                    <InputText
                        id="username"
                        v-model="name"
                        size="small"
                        class="w-full"
                        placeholder="Search your workspace"
                    />
                </div>
                <div class="max-h-[300px] overflow-y-auto">
                    <div
                        v-for="workspace in workspacesComputed"
                        :key="workspace.id"
                        class="flex gap-2 p-2 hover:bg-secondary hover:text-white cursor-pointer"
                        @click="handleChangeWorkspace(workspace)"
                    >
                        <div
                            class="w-10 h-10 flex justify-center items-center rounded-md"
                            :style="{ backgroundColor: workspace.color }"
                        >
                            <p class="text-white font-semibold">{{ workspace.name.charAt(0) }}</p>
                        </div>
                        <div>
                            <p class="text-sm font-semibold">{{ workspace.name }}</p>
                            <p class="text-xs">{{ workspace.owner.first_name }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <RouterLink
                to="/"
                class="h-12 flex items-center justify-center cursor-pointer"
            >
                <p>View all workspaces</p>
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import { useWorkspaceStore } from "@/stores/workspace";
import { vOnClickOutside } from "@vueuse/components";
import type { IWorkspace } from "@/types/workspaces";
import { getColorAndInitial } from "@/utils/randomColor";

const name = ref("");

const isShowPopover = ref(false);

function onClosePopover() {
    isShowPopover.value = false;
}

const workspacesComputed = computed(() => {
    return workspaceStore.getWorkspaces.map((w) => ({
        ...w,
        color: getColorAndInitial(w.name).color,
    }));
});

const workspaceStore = useWorkspaceStore();

const toggle = () => {
    isShowPopover.value = true;
};

const router = useRouter();

function handleChangeWorkspace(workspace: IWorkspace) {
    workspaceStore.setCurrentWorkspace(workspace);
    router.push(`/w/${workspace.id}/chats`);
    isShowPopover.value = false;
}
</script>
