<script lang="ts" setup>
import Card from '../ui/card/Card.vue'
import Avatar from '../ui/avatar/Avatar.vue'
import Input from '../ui/input/Input.vue'
import Button from '../ui/button/Button.vue'
import MCreateGroup from '@/components/group/modal/MCreateGroup.vue'

const isShowModal = ref(false)

const openModal = () => {
  isShowModal.value = true
}

const closeModal = () => {
  isShowModal.value = false
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <Card>
      <div class="flex items-center justify-between p-4 gap-16 w-full">
        <div class="flex items-center gap-2 w-full">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          <Input
            id="search"
            type="text"
            placeholder="Search..."
          />
        </div>
        <Button
          class="h-10 bg-primary flex items-center"
          @click="openModal"
        >
          Post
        </Button>
      </div>
    </Card>
    <Card>
      <div class="flex flex-col p-4 gap-6 w-full">
        <div class="flex items-center gap-2 w-full justify-between">
          <div class="flex items-center gap-2">
            <Avatar class="w-8 h-8">
              <AvatarImage src="" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <h4 class="text-base font-semibold">Trung dong</h4>
            <p class="text-x font-normal text-slate-600">posted a message</p>
          </div>
          <p class="text-x font-normal text-slate-600">Septemper 20/03/2024</p>
        </div>
        <div class="text-x font-medium">Chào các bạn đã đến với lớp học vinahouse</div>
      </div>
    </Card>
    <MCreateGroup
      v-if="isShowModal"
      @close="closeModal"
    />
  </div>
</template>

<style scoped lang="scss"></style>
