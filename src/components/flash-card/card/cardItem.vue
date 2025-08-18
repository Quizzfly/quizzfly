<script lang="ts" setup>
import Textarea from '@/components/ui/textarea/Textarea.vue'
import { Card } from '@/components/ui/card'

const props = defineProps<{
  number: number
  term: string
  description: string
  image?: string
  lengthData: number
}>()

const emit = defineEmits<{
  (e: 'update:term', value: string): void
  (e: 'update:description', value: string): void
  (e: 'update:image', value: string): void
  (e: 'remove'): void
}>()

const refImage = ref<HTMLInputElement>()

const showChooseImage = () => {
  refImage.value?.click()
}

const onChangeImage = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target?.files?.[0]
  if (file) {
    const url = URL.createObjectURL(file)
    emit('update:image', url)
  }
}

const removeImage = () => {
  emit('update:image', '')
}
</script>

<template>
  <Card class="border border-[#edeff4] bg-white rounded-xl">
    <div class="flex items-center justify-between p-5">
      <p class="font-bold text-xl text-slate-500">{{ number }}</p>
      <div
        v-if="props.lengthData > 1"
        class="group flex items-center rounded-full hover:border-red-400 justify-center w-8 h-8 border border-[#edeff4] cursor-pointer"
        @click="emit('remove')"
      >
        <span
          class="i-material-symbols-light-delete-outline cursor-pointer text-xl text-slate-500 group-hover:text-red-500"
        ></span>
      </div>
    </div>
    <div class="line w-full border border-[#f6f7fb]"></div>
    <div class="flex items-start justify-between gap-5 px-5 py-8">
      <!-- term -->
      <div class="grid w-full gap-1.5">
        <Textarea
          :model-value="term"
          placeholder="Enter your term"
          @update:model-value="(val) => emit('update:term', String(val))"
        />
        <Label class="text-[12px]">TERM</Label>
      </div>

      <!-- description -->
      <div class="grid w-full gap-1.5">
        <Textarea
          :model-value="description"
          placeholder="Enter your description"
          @update:model-value="(val) => emit('update:description', String(val))"
        />
        <Label class="text-[12px]">DESCRIPTION</Label>
      </div>

      <!-- upload -->
      <div class="flex flex-col items-center">
        <div
          v-if="props.image"
          class="relative w-[100px] h-[100px] border rounded-lg"
        >
          <div class="w-[100px] h-[100px] overflow-hidden rounded-lg">
            <img
              :src="props.image"
              class="object-cover w-full h-full"
            />
          </div>
          <button
            class="absolute -top-2 -right-2 bg-white p-1 border rounded-full w-4 h-4 flex items-center justify-center text-xs shadow"
            @click="removeImage"
          >
            ✕
          </button>
        </div>
        <div
          v-else
          class="cursor-pointer group items-center justify-center flex p-3 rounded-lg border-dashed border-[#d9dde8] border-2 w-[100px] h-[100px] hover:border-primary"
          @click="showChooseImage"
        >
          <span
            class="i-material-symbols-light-add-a-photo-sharp cursor-pointer text-xl text-slate-500 group-hover:text-primary"
          ></span>
        </div>

        <input
          ref="refImage"
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          class="hidden"
          @change="onChangeImage"
        />
      </div>
    </div>
  </Card>
</template>
