<script lang="ts" setup>
import { useConfirmDialog } from '@/stores/modal'
import { joinGroupApi } from '@/services/group'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'

const confirmDialog = useConfirmDialog()
const route = useRoute()
const router = useRouter()

const idGroup = route.query.idGroup as string

onBeforeMount(() => {
  openConfirm()
})

const openConfirm = async () => {
  const { isConfirmed } = await confirmDialog.open({
    title: 'Confirm',
    question: 'Do you really want to join this group?',
    error: true,
  })

  if (isConfirmed) {
    handleJoinGroup()
  }
}

const handleJoinGroup = async () => {
  try {
    await joinGroupApi(idGroup)
    showToast({
      title: 'Success',
      description: 'Join group success',
      variant: 'default',
    })
    router.push({ name: 'group-detail', params: { groupId: idGroup } })
  } catch (error) {
    console.error(error)
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
    router.push({ name: 'groups' })
  }
}
</script>

<template>
  <div class=""></div>
</template>

<style lang="scss" scoped></style>
