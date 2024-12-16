<script lang="ts" setup>
import Input from '@/components/ui/input/Input.vue'
import { usePostStore } from '@/stores/group/post'
import { uploadMultiFileApi } from '@/services/file'
import { showToast } from '@/utils/toast'
import { type ICommentCreate } from '@/types/group'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/auth'

const postStore = usePostStore()
const authStore = useAuthStore()

const getUserInfor = computed(() => {
  return authStore.getUser
})

const isLoading = ref(false)
const content = ref('')
const ImageUpload = ref<File[]>([])
const parentCommentId = ref<string | null>('')

const resetData = () => {
  content.value = ''
  parentCommentId.value = ''
}

const props = defineProps<{
  focusOnMount?: boolean
  postId: string
  member: any
  parentId?: string
}>()

const onSubmit = async () => {
  isLoading.value = true
  const listImageUpload = [] as any

  if (ImageUpload.value.length > 0) {
    const formData = new FormData()

    for (let i = 0; i < ImageUpload.value.length; i++) {
      formData.append('files', ImageUpload.value[i])
    }

    try {
      await uploadMultiFileApi(formData).then((res) => {
        listImageUpload.push(...res.data)
      })
    } catch (error) {
      showToast({
        description: 'Upload files failed',
        variant: 'destructive',
      })
    }
  }

  if (props.parentId) {
    parentCommentId.value = props.parentId
  } else {
    parentCommentId.value = null
  }

  const data: ICommentCreate = {
    parent_comment_id: parentCommentId.value,
    content: content.value,
    files: listImageUpload,
  }

  await postStore.createCommentPost(props.postId, data)
  resetData()
  // postStore.fetchComments(props.postId)
  isLoading.value = false
}

const inputRef = ref()

onMounted(() => {
  if (props.focusOnMount === true) {
    inputRef.value.$el.focus()
  }
})
</script>
<template>
  <form
    class="flex items-center justify-between p-6 gap-12 w-full"
    @submit.prevent="onSubmit"
  >
    <div class="flex items-center gap-2 w-full">
      <Avatar>
        <AvatarImage
          v-if="getUserInfor?.user_info.avatar"
          :src="getUserInfor?.user_info.avatar"
        />
        <AvatarFallback v-if="getUserInfor?.user_info.name">{{
          getUserInfor?.user_info.name.charAt(0).toUpperCase()
        }}</AvatarFallback>
      </Avatar>
      <Input
        ref="inputRef"
        v-model="content"
        placeholder="Write your comment..."
        class="outline-none items-center h-11 border rounded-full px-6 py-3 text-sm font-normal text-gray-600"
      />
    </div>
    <div class="flex items-center gap-2">
      <div class="flex items-center justify-center rounded-full w-10 h-10 border cursor-pointer">
        <span class="i-material-symbols-light-attach-file w-6 h-6"></span>
      </div>
      <div
        class="flex items-center justify-center border-primary rounded-full w-10 h-10 border cursor-pointer"
      >
        <span class="i-material-symbols-light-send-rounded w-7 h-7 text-primary"></span>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
