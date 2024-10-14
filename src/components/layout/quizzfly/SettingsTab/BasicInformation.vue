<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useQuizzflyStore } from '@/stores/quizzfly'
import type { Settings } from '../QuizzflySettings.vue'

const quizzflyStore = useQuizzflyStore()
const settingsData = defineModel<Settings>({ required: true })
const imageRaw = defineModel<File>('imageRaw')

onBeforeMount(() => {
  settingsData.value.title = quizzflyStore.getQuizzflyInfo.title
  settingsData.value.description = quizzflyStore.getQuizzflyInfo.description
  settingsData.value.is_public = quizzflyStore.getQuizzflyInfo.is_public
  settingsData.value.cover_image = quizzflyStore.getQuizzflyInfo.cover_image || ''
})

const inputRef = ref<HTMLInputElement>()
const imagePreview = ref<string>()

function handleUpload() {
  inputRef.value?.click()
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    imageRaw.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}
</script>
<template>
  <div class="grid gap-4 pb-2">
    <Card class="w-full p-4">
      <h2 class="text-lg font-medium">Cover image</h2>
      <p class="text-sm text-gray-500">
        Upload a cover image for your quiz. This image will be displayed on the quiz page.
      </p>
      <div
        class="w-full h-[200px] border-2 border-dashed rounded-md mt-5 overflow-hidden"
        :style="{ backgroundImage: `url(${imagePreview})` }"
      >
        <input
          id=""
          ref="inputRef"
          type="file"
          name=""
          class="hidden"
          @change="handleFileChange"
        />
        <div class="flex justify-center items-center h-full">
          <Button
            class=""
            @click="handleUpload"
          >
            <span class="i-material-symbols-light-add text-2xl"></span>
            {{ imagePreview ? 'Change' : 'Upload' }} image
          </Button>
        </div>
      </div>
    </Card>

    <!-- text, description -->
    <div class="grid grid-cols-3 gap-4">
      <Card class="w-full p-4 col-span-2">
        <h2 class="text-lg font-medium">Title</h2>
        <p class="text-sm text-gray-500">
          Title of your quizzfly. This will be displayed on the quiz page.
        </p>
        <Input
          v-model="settingsData.title"
          class="mt-3"
          placeholder="Enter title"
        />
        <h2 class="text-lg font-medium mt-5">Description</h2>
        <p class="text-sm text-gray-500">
          Description of your quizzfly. This will be displayed on the quiz page.
        </p>
        <Textarea
          v-model="settingsData.description"
          class="mt-3"
          placeholder="Enter description"
        />
      </Card>

      <!-- visibility -->
      <Card class="w-full p-4">
        <h2 class="text-lg font-medium">
          Visibility <span class="text-xs text-gray-500">(optional)</span>
        </h2>
        <p class="text-sm text-gray-500">Choose who can view your quizzfly.</p>
        <RadioGroup
          default-value="public"
          class="mt-4"
        >
          <Card class="p-4 flex items-center gap-2">
            <RadioGroupItem
              id="public"
              value="public"
            />
            <Label for="public">Public</Label>
          </Card>
          <Card class="p-4 flex items-center gap-2">
            <RadioGroupItem
              id="private"
              value="private"
            />
            <Label for="private">Private</Label>
          </Card>
        </RadioGroup>
      </Card>
    </div>
  </div>
</template>
