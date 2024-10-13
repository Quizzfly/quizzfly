<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import BasicInformation from './SettingsTab/BasicInformation.vue'
import { useQuizzflyStore } from '@/stores/quizzfly'

const quizzflyStore = useQuizzflyStore()

interface Tab {
  title: string
  value: string
}

const tabs: Tab[] = [
  { title: 'Basic information', value: 'basic' },
  { title: 'Playing', value: 'playing' },
]
const currentTab = ref<Tab>(tabs[0])

export interface Settings {
  title: string
  description: string
  is_public: boolean
}

const settings = ref<Settings>({
  title: '',
  description: '',
  is_public: false,
})

const handleSaveSettings = () => {
  console.log('save settings')
  quizzflyStore.updateQuizzflySettings(quizzflyStore.getQuizzflyInfo.id, settings.value)
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"> Settings </Button>
    </DialogTrigger>
    <DialogContent class="w-[80vw] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle> Quizzfly settings </DialogTitle>
        <DialogDescription>
          Settings for your Quizzfly. You can change your Quizzfly settings here.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4 px-6 h-[80vh]">
        <div class="flex overflow-hidden">
          <!-- left -->
          <div class="flex flex-col gap-2 min-w-[200px] border-r pr-5">
            <div
              v-for="tab in tabs"
              :key="tab.value"
              :class="{ 'bg-slate-100 border border-gray-200': tab.value === currentTab.value }"
              class="flex items-center justify-between py-1 px-4 rounded-full border border-transparent cursor-pointer hover:bg-slate-100"
              @click="currentTab = tab"
            >
              <h3 class="text-sm">
                {{ tab.title }}
              </h3>
            </div>
          </div>
          <!-- right -->
          <div class="px-5 flex-auto overflow-y-auto">
            <!-- <div></div> -->
            <div v-if="currentTab.value === 'basic'">
              <BasicInformation v-model="settings" />
            </div>
          </div>
        </div>
      </div>
      <DialogFooter class="p-6 pt-0">
        <Button
          type="submit"
          :disabled="quizzflyStore.getIsUpdating"
          @click="handleSaveSettings"
        >
          <span
            v-if="quizzflyStore.getIsUpdating"
            class="i-svg-spinners-180-ring-with-bg mr-1"
          ></span>
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
