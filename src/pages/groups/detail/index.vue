<script lang="ts" setup>
import { useGroupStore } from '@/stores/group/group'
import { usePostStore } from '@/stores/group/post'

const groupStore = useGroupStore()
const postStore = usePostStore()
const route = useRoute()

const groupId = computed(() => route.params.groupId)

watchEffect(() => {
  if (groupId.value && typeof groupId.value === 'string') {
    groupStore.listMemberGroups(groupId.value)
    groupStore.getDetailGroup(groupId.value)
    postStore.fetchPosts(1, groupId.value)
  }
})

onBeforeUnmount(() => {
  groupStore.$reset()
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>
