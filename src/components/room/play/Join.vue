<script setup lang="ts">
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRoomStore } from '@/stores/room'

const roomStore = useRoomStore()

const isLoading = ref(false)
const currentName = localStorage.getItem('name')
const router = useRouter()
const route = useRoute()

const pinCode = route.params.code as string

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('name is required'),
  }),
})

const onSubmit = handleSubmit((values) => {
  isLoading.value = true

  localStorage.setItem('name', values.name)
  if (pinCode) {
    localStorage.setItem('roomPin', pinCode)
    router.push({ name: 'play-instruction' })
  }

  // roomStore.setMemberName(values.name)

  roomStore.setMemberName(values.name)

  isLoading.value = false
})
</script>

<template>
  <form
    class="bg-white w-80 rounded-xl p-6 flex flex-col shadow"
    @submit="onSubmit"
  >
    <InputValidation
      type="string"
      name="name"
      :initial-value="currentName || ''"
      placeholder="Enter nickname..."
      class="h-12 font-medium text-base bg-slate-50 border-slate-200 outline-none"
      @keydown.enter="onSubmit"
    />
    <Button
      type="submit"
      class="h-12 w-full font-medium text-base mt-2"
      :disabled="isLoading"
    >
      <span
        v-if="isLoading"
        class="i-svg-spinners-ring-resize mr-2"
      ></span>
      Ok,let's go
    </Button>
  </form>
</template>
<style scoped>
.shadow {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
