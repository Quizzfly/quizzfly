<script setup lang="ts">
import { uploadFileApi } from '@/services/file'
import { useLoadingStore } from '@/stores/loading'
import { useDropZone } from '@vueuse/core'

const loadingStore = useLoadingStore()

defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'updated'): void
}>()

const dropZoneRef = ref<HTMLDivElement>()

function onDrop(files: File[] | null) {
  if (files) {
    handleUploadFile(files[0])
  }
}

useDropZone(dropZoneRef, {
  onDrop,
  // specify the types of data to be received.
  dataTypes: ['image/jpeg', 'image/png', 'image/gif'],
  // control multi-file drop
  multiple: true,
  // whether to prevent default behavior for unhandled events
  preventDefaultForUnhandled: false,
})

const handleInputFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    handleUploadFile(files[0])
  }
}

const handleUploadFile = async (file: File) => {
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
      ref="dropZoneRef"
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
          @change="handleInputFileChange"
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
