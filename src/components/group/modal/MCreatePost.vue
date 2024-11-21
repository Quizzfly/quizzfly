<script lang="ts" setup>
import BaseModal from '@/components/base/BaseModal.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import Button from '@/components/ui/button/Button.vue'

// import { useForm } from 'vee-validate'
// import * as yup from 'yup'
// import { useGroupStore } from '@/stores/group'

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'created'): void
  (e: 'openQuizzflys'): void
}>()
// const groupStore = useGroupStore()

const isLoading = ref(false)
const content = ref('')

// const { handleSubmit } = useForm({
//   validationSchema: yup.object({
//     name: yup.string().required('Name is required'),
//     description: yup.string(),
//   }),
// })

// const onSubmit = handleSubmit(async (values) => {
//   isLoading.value = true
//   const data = {
//     name: values.name,
//     description: description.value,
//     background: background.value,
//   }
//   await groupStore.initGroup(data)
//   isLoading.value = false
//   emits('close')
//   emits('created')
// })

const onSubmit = async () => {
  // const data = {
  //   name: values.name,
  //   description: description.value,
  //   background: background.value,
  // }
  // await groupStore.initGroup(data)
  // isLoading.value = false
  // emits('close')
  // emits('created')
}
</script>

<template>
  <BaseModal @click="emits('close')">
    <div
      class="bg-white w-[700px] mx-auto rounded-lg shadow-lg p-6 flex flex-col gap-6 relative"
      @click.stop
    >
      <div class="flex items-center justify-between">
        <div
          class="cursor-pointer -ml-2"
          @click="emits('close')"
        >
          <span class="i-material-symbols-light-close-small-outline-rounded w-8 h-8"></span>
        </div>
        <div class="cursor-pointer w-8 h-8 rounded-xl flex items-center justify-center border">
          <span class="i-solar-menu-dots-bold rotate-90"></span>
        </div>
      </div>
      <form
        class="flex flex-col gap-8"
        @submit="onSubmit"
      >
        <div class="flex flex-col h-52">
          <div class="form-data h-52">
            <QuillEditor
              v-model:content="content"
              content-type="html"
              theme="snow"
              toolbar="full"
            />
          </div>
        </div>
        <div
          class="flex mt-14 h-11 items-center justify-center cursor-pointer rounded-full border border-primary"
          @click="emits('openQuizzflys')"
        >
          <p class="text-primary">Click to choose the quizzfly you want to share</p>
        </div>
        <div class="flex justify-end">
          <Button
            :disabled="isLoading"
            type="submit"
            class="h-10 bg-primary flex gap-1 text-sm px-6"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize"
            ></span>
            Post
            <span class="i-material-symbols-light-send-rounded -mr-1 w-6 h-7 text-white"></span>
          </Button>
        </div>
      </form>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
.form-data {
  &:deep() {
    .ql-toolbar.ql-snow {
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }

    .ql-container.ql-snow {
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
    }

    ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    ::-webkit-scrollbar-track {
      background: #f0f0f0;
      border-radius: 6px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 6px;
      border: 2px solid #f0f0f0;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }

    .scrollable-element {
      scrollbar-width: thin;
      scrollbar-color: #888 #f0f0f0;
    }
  }
}
</style>
