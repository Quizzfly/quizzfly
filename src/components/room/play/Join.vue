<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue'
import Button from '@/components/ui/button/Button.vue'

const isLoading = ref(false)
const name = ref('')
</script>

<template>
  <div class="bg-white w-80 rounded-xl p-6 flex flex-col gap-6 shadow">
    <Input
      v-model="name"
      placeholder="Enter nickname..."
      class="h-12 font-medium text-base bg-slate-50 border-slate-200 outline-none"
    />
    <Button
      class="h-12 w-full font-medium text-base"
      :disabled="isLoading"
    >
      <span
        v-if="isLoading"
        class="i-svg-spinners-ring-resize mr-2"
      ></span>
      Ok,let's go
    </Button>
  </div>
</template>
<style scoped>
.shadow {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
