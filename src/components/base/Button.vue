<script setup lang="ts">
interface Prop {
    label: string;
}

defineProps<Prop>();
</script>
<template>
    <button
        v-bind="$attrs"
        class="h-10 w-full text-white font-semibold bg-primary rounded-md"
    >
        {{ label }}
    </button>
</template>
