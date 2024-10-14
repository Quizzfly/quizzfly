<script setup lang="ts">
import EditableText from '@/components/base/EditableText.vue'
import { Button } from '@/components/ui/button'
import { useQuizzflyStore } from '@/stores/quizzfly'
import QuizzflySettings from './QuizzflySettings.vue'

const router = useRouter()
const route = useRoute()
const quizzflyStore = useQuizzflyStore()

const handleSaveTitle = (value: string, isModified?: boolean) => {
  if (!isModified) return
  quizzflyStore.updateQuizzflySettings(route.params.quizzflyId as string, { title: value })
}

const handleSaveSettings = () => {
  quizzflyStore.updateQuizzflySettings(
    route.params.quizzflyId as string,
    quizzflyStore.getQuizzflyInfo,
  )
}

const handleClickCancel = () => {
  router.push({ name: 'dashboard' })
}
</script>
<template>
  <div class="flex justify-between items-center border-b py-2 px-5 h-[60px]">
    <div class="flex items-center gap-5">
      <RouterLink to="/">
        <span class="i-solar-arrow-left-linear text-xl cursor-pointer"></span>
      </RouterLink>
      <div>
        <EditableText
          v-slot="{ data }"
          class="text-lg font-medium"
          :value="quizzflyStore.getQuizzflyInfo.title || 'Untitled'"
          @save="handleSaveTitle"
        >
          <div class="flex flex-col">
            <span class="border-transparent hover:border-slate-500 text-base">
              {{ data }}
            </span>
            <span class="text-xs text-gray-500"> Click to edit </span>
          </div>
        </EditableText>
      </div>

      <!-- settings -->
      <QuizzflySettings />

      <div
        v-if="quizzflyStore.getIsUpdating"
        class="flex items-center gap-2"
      >
        <span class="i-svg-spinners-tadpole"></span>
        <span>saving...</span>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <Button
        variant="secondary"
        class="px-2"
      >
        <span class="i-solar-eye-linear text-xl"></span>
      </Button>
      <div class="h-6 border-r"></div>
      <Button
        variant="secondary"
        @click="handleClickCancel"
      >
        Cancel
      </Button>
      <Button @click="handleSaveSettings"> Save </Button>
    </div>
  </div>
</template>
