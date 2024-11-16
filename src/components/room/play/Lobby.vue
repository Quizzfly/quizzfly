<script setup lang="ts">
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const isLoading = ref(false)
const router = useRouter()

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    pinCode: yup.string().required('pinCode is required'),
  }),
})

const onSubmit = handleSubmit((values) => {
  isLoading.value = true
  router.push({
    name: 'play-lobby-code',
    params: { code: values.pinCode },
  })
  isLoading.value = false
})
</script>

<template>
  <form
    class="bg-white w-80 rounded-xl p-6 flex flex-col shadow"
    @submit="onSubmit"
  >
    <InputValidation
      type="number"
      pattern="[0-9]*"
      inputmode="numeric"
      name="pinCode"
      placeholder="Enter code..."
      class="h-12 font-medium text-base bg-slate-50 border-slate-200 outline-none"
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
      Enter
    </Button>
  </form>
  <div class="absolute bottom-4 mr-auto ml-auto">
    <div class="text-sm font-nomal text-white">
      Create your own quizzfly for FREE at <span class="font-semibold">quizzfly.site</span>
    </div>
    <div class="text-white font-semibold flex items-center justify-center text-xs">
      Terms
      <span class="mx-1">|</span>
      Privacy
      <span class="mx-1">|</span>
      Cookie notice
    </div>
  </div>
</template>
<style scoped>
.shadow {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
