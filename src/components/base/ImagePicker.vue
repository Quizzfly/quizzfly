<script setup lang="ts">
import { uploadFileApi } from '@/services/file'
import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()

defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'updated'): void
}>()

const handleFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    loadingStore.setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const { data } = await uploadFileApi(formData)
      emits('update:modelValue', data.url)
      emits('updated')
    } catch (error) {
      console.error(error)
    }
    loadingStore.setLoading(false)
  }
}
</script>
<template>
  <div class="h-full w-full bg-slate-100 rounded-md">
    <div
      class="h-full flex justify-center items-center bg-slate-100 rounded-lg bg-cover image-area"
      :style="{ backgroundImage: `url(${modelValue})` }"
    >
      <div
        class="text-center"
        :class="{ 'hight-light': modelValue }"
      >
        <span class="i-solar-gallery-add-outline text-3xl text-gray-500"></span>
        <p class="text-xs text-gray-500 font-light text-center">Drag and drop or</p>
        <input
          ref="inputRef"
          type="file"
          class="hidden"
          @change="handleFileChange"
        />

        <p
          class="text-xs text-primary text-center cursor-pointer mt-2 hover:underline"
          @click="$refs.inputRef.click()"
        >
          Click to upload your image
        </p>
      </div>
    </div>
  </div>
</template>
