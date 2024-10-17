<script setup lang="ts">
import { Button } from '../ui/button'
import { Input } from '@/components/ui/input'
import ErrorMessage from '../base/ErrorMessage.vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth'
import { UpdateInfoApi } from '@/services/user'
import { uploadFileApi } from '@/services/file'

import { apiError } from '@/utils/exceptionHandler'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { showToast } from '@/utils/toast'

const authStore = useAuthStore()

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required('Email is required'),
    name: yup.string().required('Name is required'),
    username: yup.string().required('Username is required'),
  }),
})

const [email] = defineField('email')
const [username] = defineField('username')
const [name, nameAttrs] = defineField('name')
const avatar = ref('')
const isLoading = ref(false)

onMounted(() => {
  setData(authStore.getUser)
})

const setData = (data: any) => {
  email.value = data.email
  name.value = data.user_info.name
  username.value = data.user_info.username
  avatar.value = data.user_info.avatar

  console.log(data, 'check setdata')
}

const onSubmit = handleSubmit(async () => {
  isLoading.value = true
  if (logoUpload.value) {
    const formData = new FormData()

    formData.append('file', logoUpload.value)

    await uploadFileApi(formData).then((res: any) => {
      avatar.value = res.data.url
    })
  }
  const data = {
    email: email.value,
    name: name.value,
    username: username.value,
    avatar: avatar.value,
  }
  try {
    const { data: res } = await UpdateInfoApi(data)
    console.log(res, 'check res')
    setData(res)
    authStore.setUser(res)
    isLoading.value = false
    showToast({
      title: 'Update success',
      description: 'This is a simple toast message',
      variant: 'default',
    })
  } catch (error) {
    showToast({
      title: 'Update failed',
      description: `${apiError(error).message}`,
      variant: 'destructive',
    })
  }
})

const refInput = ref()
const showChooseImg = () => {
  refInput.value.click()
}

const logoUpload = ref('')
const onChangeImg = (e: Event) => {
  const element = e.currentTarget as HTMLInputElement
  const fileList: FileList | null = element.files
  if (!fileList) return
  const data = fileList[0] as any

  if (data) {
    logoUpload.value = data
    avatar.value = URL.createObjectURL(data)
  }
}
</script>

<template>
  <Toaster />
  <div class="w-full flex items-start gap-8 max-lg:flex-col">
    <div class="w-2/4 p-4 rounded-md shadow flex flex-col gap-10 max-lg:w-full bg-white">
      <div class="header flex items-center justify-between">
        <h3 class="text-lg font-semibold">User information</h3>
        <Button
          class="h-10 flex items-center gap-2 bg-slate-100 w-24"
          variant="secondary"
          :disabled="isLoading"
          @click="onSubmit"
        >
          <span
            v-if="isLoading"
            class="i-svg-spinners-ring-resize"
          ></span>
          Save
        </Button>
      </div>
      <div class="body flex items-start gap-8">
        <div class="img relative w-32 h-32 cursor-pointer rounded">
          <div
            class="image w-32 h-32"
            @click="showChooseImg()"
          >
            <img
              v-if="avatar"
              class="w-full h-full rounded object-cover"
              :src="avatar"
            />
            <img
              v-else
              class="w-full"
              src="@/assets/img/avatar.jpg"
              alt=""
            />
            <input
              ref="refInput"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              class="hidden"
              @change="onChangeImg"
            />
            <div
              class="absolute bg-slate-50 w-6 h-6 flex items-center justify-center rounded-full -right-3 -bottom-2 shadow"
            >
              <Icon icon="hugeicons:edit-02" />
            </div>
          </div>
        </div>
        <div class="form flex items-center gap-4 flex-col w-full">
          <div class="form-data w-full">
            <label
              for="username"
              class="font-medium text-sm"
              >Username</label
            >
            <Input
              v-model="username"
              disabled
              placeholder="Enter name..."
              :invalid="errors.username"
              type="username"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="form-data w-full">
            <label
              for="name"
              class="font-medium text-sm"
              >Name</label
            >
            <Input
              v-model="name"
              placeholder="Enter name..."
              v-bind="nameAttrs"
              :invalid="errors.name"
              type="name"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage :error="errors.name" />
          </div>
          <div class="form-data w-full">
            <label
              for="email"
              class="font-medium text-sm"
              >Email</label
            >
            <Input
              v-model="email"
              disabled
              placeholder="Enter email..."
              :invalid="errors.email"
              type="email"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
        </div>
      </div>
      <div class="footer flex flex-col gap-2">
        <h2 class="text-lg font-semibold">Verified profile</h2>
        <div class="flex gap-2">
          <div class="w-28">
            <img
              src="@/assets/img/avatar.jpg"
              alt=""
              class="rounded-full w-full"
            />
          </div>
          <p class="text-sm">
            Apply for your verified profile today to offer your learning resources for free or for
            sale on the marketplace and join a global community.
            <span class="font-semibold cursor-pointer">Go to application</span>
          </p>
        </div>
      </div>
    </div>
    <div class="w-2/4 flex flex-col gap-10 max-lg:w-full bg-white">
      <div class="shadow rounded-md p-4 flex flex-col gap-8">
        <div class="header">
          <h3 class="text-lg font-semibold">Account details</h3>
        </div>
        <div class="w-full">
          <div class="form-data flex flex-col gap-2">
            <label
              for="name"
              class="font-medium text-sm"
              >Language</label
            >
            <Select>
              <SelectTrigger class="w-[280px]">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <Selectlabel>Languages</Selectlabel>
                  <SelectItem value="en"> English </SelectItem>
                  <SelectItem value="vi"> Tiếng việt </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <ErrorMessage :error="errors.name" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-base font-semibold underline underline-offset-2 cursor-pointer">
          Delete account
        </p>
        <p class="text-sm">
          If you delete your account, you'll lose access to all the quizzfly you created
        </p>
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

.body {
  .img {
    border-radius: 12px;
    border: 3px solid #fff;
    background: #eef2f6;
    box-shadow:
      0px 4px 8px -2px rgba(16, 24, 40, 0.1),
      0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  }
}
</style>
