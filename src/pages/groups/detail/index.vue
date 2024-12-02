<script lang="ts" setup>
import { useGroupStore } from '@/stores/group/group'
import { usePostStore } from '@/stores/group/post'

const groupStore = useGroupStore()
const postStore = usePostStore()
const route = useRoute()

const groupId = route.params.groupId as string

onBeforeMount(() => {
  if (groupId) {
    groupStore.listMemberGroups(groupId)
    groupStore.getDetailGroup(groupId)
    postStore.fetchPosts(1, groupId)
  }
})

onBeforeUnmount(() => {
  groupStore.$reset()
  postStore.$reset()
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>
