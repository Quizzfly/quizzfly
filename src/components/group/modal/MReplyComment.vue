<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue'

const emits = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <BaseModal @click="emits('close')">
    <div
      class="bg-white w-[600px] mx-auto rounded-3xl shadow-lg relative"
      @click.stop
    >
      <div class="text-2xl w-full text-center font-semibold p-6">Reply</div>
      <div class="h-px w-full bg-slate-300"></div>
      <div class="flex flex-col h-44 p-6"></div>
    </div>
  </BaseModal>
</template>

<style lang="css" scoped></style>
