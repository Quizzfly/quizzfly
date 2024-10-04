<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Switch } from '../ui/switch'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
// import { apiExceptionHandler } from '@/utils/exceptionHandler'
// import Toaster from '@/components/ui/toast/Toaster.vue'
// import { showToast } from '@/utils/toast'

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required('Email is required'),
    name: yup.string().required('name is required'),
    username: yup.string().required('Username is required'),
  }),
})
</script>

<template>
  <div class="w-full flex items-start gap-8">
    <div class="w-2/4 p-4 rounded-md shadow flex flex-col gap-10">
      <div class="header flex items-center justify-between">
        <h3 class="text-lg font-semibold">Notifications</h3>
      </div>
    </div>
  </div>
</template>
<style>
.shadow {
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
</style>
