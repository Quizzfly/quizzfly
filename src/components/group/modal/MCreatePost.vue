<script lang="ts" setup>
import BaseModal from '@/components/base/BaseModal.vue'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import InputValidation from '@/components/base/InputValidation.vue'
import ImagePicker from '@/components/base/ImagePicker.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useGroupStore } from '@/stores/group'

const emits = defineEmits(['close', 'handleCreated'])
const groupStore = useGroupStore()

const isLoading = ref(false)
const background = ref('')
const description = ref('')

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Name is required'),
    description: yup.string(),
  }),
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  const data = {
    name: values.name,
    description: description.value,
    background: background.value,
  }
  await groupStore.initGroup(data)
  isLoading.value = false
  emits('close')
  emits('handleCreated')
})
</script>

<template>
  <BaseModal
    :title="'Create group'"
    @click.prevent.self="emits('close')"
  >
    <form
      class="mt-6 flex flex-col gap-10"
      @submit="onSubmit"
    >
      <div class="flex flex-col">
        <div class="form-data">
          <label for="name">Name</label>
          <InputValidation
            id="name"
            placeholder="Enter name..."
            type="name"
            name="name"
            class="h-12 mt-1 bg-slate-50 border-slate-200 outline-none"
          />
        </div>
        <div class="form-data">
          <label for="description">Description</label>
          <Textarea
            id="description"
            v-model="description"
            placeholder="Enter description..."
            class="h-28 mt-1 bg-slate-50 border-slate-200 outline-none"
          />
        </div>
        <div class="form-data mt-8 flex flex-auto justify-center h-32">
          <ImagePicker v-model="background" />
        </div>
      </div>
      <div class="flex items-center justify-center gap-2">
        <Button
          variant="secondary"
          class="w-full h-11 flex gap-2 items-center"
          @click="emits('close')"
        >
          Cancel
        </Button>
        <Button
          :disabled="isLoading"
          class="w-full h-11 bg-primary flex gap-2 items-center"
          @click="onSubmit"
        >
          <span
            v-if="isLoading"
            class="i-svg-spinners-ring-resize"
          ></span>
          Create
        </Button>
      </div>
    </form>
  </BaseModal>
</template>
