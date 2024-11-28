<script lang="ts" setup>
import Avatar from '@/components/ui/avatar/Avatar.vue'
import Input from '@/components/ui/input/Input.vue'

const props = defineProps<{
  member: any
}>()
</script>
<template>
  <div class="flex items-center justify-between p-6 gap-12 w-full">
    <div class="flex items-center gap-2 w-full">
      <Avatar>
        <AvatarImage :src="props.member.avatar" />
        <AvatarFallback>{{ props.member.name.charAt(0).toUpperCase() }}</AvatarFallback>
      </Avatar>
      <Input
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
  </div>
</template>

<style lang="scss" scoped></style>
