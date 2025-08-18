<script lang="ts" setup>
import { useConfirmDialog } from '@/stores/modal'
import { joinGroupApi } from '@/services/group'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const confirmDialog = useConfirmDialog()
const route = useRoute()
const router = useRouter()

const groupId = route.query.idGroup as string

onBeforeMount(() => {
  openConfirm()
})

const openConfirm = async () => {
  const { isConfirmed } = await confirmDialog.open({
    title: t('groups.confirm'),
    question: t('groups.join_group_confirm'),
    warning: true,
  })

  if (isConfirmed) {
    handleJoinGroup()
  }
}

const handleJoinGroup = async () => {
  try {
    await joinGroupApi(groupId)
    showToast({
      title: t('groups.success'),
      description: t('groups.group_joined_success'),
      variant: 'default',
    })
    router.push({ name: 'group-detail', params: { groupId: groupId } })
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
