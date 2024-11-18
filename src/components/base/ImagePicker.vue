<script setup lang="ts">
import { uploadFileApi } from '@/services/file'
import { useLoadingStore } from '@/stores/loading'
import { useDropZone } from '@vueuse/core'

const loadingStore = useLoadingStore()

interface Props {
  modelValue: string
  allowUpload?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  allowUpload: true,
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | File): void
  (e: 'updated'): void
  (e: 'deleted'): void
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
      if (props.allowUpload) {
        const formData = new FormData()
        formData.append('file', file)
        const { data } = await uploadFileApi(formData)
        emits('update:modelValue', data.url)
        emits('updated')
      } else {
        emits('update:modelValue', file)
        emits('updated')
      }
    } catch (error) {
      console.error(error)
    }
    loadingStore.setLoading(false)
  }
}

const inputRef = ref()
const handleClick = () => {
  inputRef.value.click()
}

const handleDelete = () => {
  emits('update:modelValue', '')
  emits('deleted')
}
</script>
<template>
  <div
    class="relative h-full w-full bg-slate-100 rounded-md"
    @click="handleClick()"
  >
    <!-- remove btn -->
    <div
      v-if="modelValue"
      class="absolute top-2 right-2"
    >
      <button
        class="w-6 h-6 flex justify-center items-center p-1 rounded-full bg-white text-gray-500"
        @click.stop="handleDelete"
      >
        <span class="text-2xl i-material-symbols-light-close-rounded"></span>
      </button>
    </div>
    <div
      ref="dropZoneRef"
      class="h-full flex justify-center items-center bg-slate-100 rounded-lg bg-cover image-area bg-center"
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

        <p class="text-xs text-primary text-center cursor-pointer mt-2 hover:underline">
          Click to upload your image
        </p>
      </div>
    </div>
  </div>
</template>
