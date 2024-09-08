<script setup lang="ts">
import MembersGroup from "@/components/workspace/MembersPopup/MembersGroup.vue";

const isShowPopup = ref(false);
</script>
<template>
    <div>
        <span
            class="i-material-symbols-light-supervisor-account-rounded text-3xl text-white block cursor-pointer"
            @click="isShowPopup = true"
        ></span>
        <Teleport
            v-if="isShowPopup"
            to="body"
        >
            <MembersGroup @close="isShowPopup = false" />
        </Teleport>
    </div>
</template>
