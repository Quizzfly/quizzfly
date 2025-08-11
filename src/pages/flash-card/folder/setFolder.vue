<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from "lucide-vue-next"
import { Input } from "@/components/ui/input"

import MListCard from '@/components/flash-card/folder/MListCard.vue'

const isShowModal = ref<boolean>(false)

const openModal = () => {
  isShowModal.value = true
}

const closeModal = () => {
  isShowModal.value = false
}
</script>

<template>
  <div class="p-8">
    <div class="flex items-center justify-between">
      <div class="title text-2xl font-medium">Title</div>
      <div class="flex items-center gap-4">
        <Button
          class="max-md:hidden h-10 bg-primary flex items-center"
          @click="openModal"
        >
          <span
            class="i-material-symbols-light-menu-book-outline-rounded text-lg text-white mr-2"
          ></span>
          Study
        </Button>
        <div
          class="flex hover:bg-black/5 items-center justify-center w-10 h-10 border-2 rounded-full cursor-pointer border-[#d9dde8]"
        >
          <span
            class="text-3xl i-material-symbols-light-more-horiz font-bold text-[#586380]"
          ></span>
        </div>
      </div>
    </div>

    <div class="flex items-center mt-20 justify-between">
      <div class="w-40">
        <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="recent">
              Recent
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectItem value="lastest">
              Lastest
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      </div>

      <div class="flex items-center gap-4 w-1/2">
        <Button
          variant="outline"
          class="max-md:hidden h-10 flex items-center text-slate-700"
          @click="openModal"
        >
          <span
            class="i-material-symbols-light-add text-2xl mr-1"
          ></span>
          Materials
        </Button>

        <div class="relative items-center w-full">
          <Input id="search" type="text" placeholder="Search..." class="pl-10 h-10" />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
      </div>
    </div>

    <MListCard
      v-show="isShowModal"
      @close="closeModal"
    />
  </div>
</template>
