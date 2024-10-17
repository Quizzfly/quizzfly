<script setup lang="ts">
import { Switch } from '../ui/switch'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const emits = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div
    class="fixed flex top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)]"
    @click.prevent.self="emits('close')"
  >
    <div class="bg-white w-[450px] h-full absolute right-0">
      <div class="flex items-center justify-between mb-8 p-4">
        <h2 class="text-3xl font-bold">Setting</h2>
        <span
          class="cursor-pointer i-solar-arrow-right-outline w-12 h-8"
          @click="emits('close')"
        ></span>
      </div>
      <!-- item -->
      <div class="flex items-center gap-4 p-4 hover:bg-slate-100 cursor-pointer rounded border-y">
        <div class="w-24">
          <img
            src="@/assets/img/bg-image-1.jpg"
            alt=""
            class="rounded"
          />
        </div>
        <div class="flex items-center justify-between gap-2">
          <div class="flex flex-col gap-1">
            <h3 class="text-base font-semibold">Show questions and answer</h3>
            <p class="text-sm text-slate-400 font-medium">
              Questions and answer show on players devices.
            </p>
          </div>
          <Switch id="shareKahoot" />
        </div>
      </div>
      <!-- item -->
      <div class="flex flex-col gap-3 p-4 rounded border-b">
        <h3 class="font-lg text-slate-500 font-medium">General</h3>
        <div class="flex gap-2 items-center justify-between">
          <div class="flex items-center gap-1">
            <span class="w-8 h-6 i-material-symbols-light-language"></span>
            <p class="text-lg font-semibold">Language</p>
          </div>
          <Select>
            <SelectTrigger class="w-[200px] h-10">
              <SelectValue
                class="text-base"
                placeholder="Select a language"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                <SelectItem value="en"> English </SelectItem>
                <SelectItem value="vi"> Tiếng việt </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="flex items-center gap-2 justify-between">
          <div class="flex items-center gap-1">
            <span class="w-8 h-6 i-material-symbols-light-library-music"></span>
            <p class="text-lg font-semibold">Music</p>
          </div>
          <Select>
            <SelectTrigger class="w-[200px] h-10">
              <SelectValue
                class="text-base"
                placeholder="Select a song"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                <SelectItem value="en"> English </SelectItem>
                <SelectItem value="vi"> Tiếng việt </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <!-- footer -->
      <div class="absolute bottom-0 p-8 flex flex-col gap-4 justify-center items-center w-full">
        <p class="text-base font-medium text-slate-700">
          Your setting will be saved for next time.
        </p>
        <a class="text-sm cursor-pointer text-primary font-medium underline">Reset to default</a>
      </div>
    </div>
  </div>
</template>
