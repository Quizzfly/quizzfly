<script setup lang="ts">
import { getRoomQuestionsApi } from '@/services/room'
import type { RoomQuestion } from '@/types'
import QuestionsListView from './QuestionsListView.vue'
import QuestionsExpandView from './QuestionsExpandView.vue'
import { Input } from '../ui/input'
const route = useRoute()
const roomId = route.params.id

const questions = ref<RoomQuestion[]>([])
const view = ref<'list' | 'expand'>('expand')
const fetchQuestions = async () => {
  if (!roomId || typeof roomId !== 'string') return
  const { data } = await getRoomQuestionsApi(roomId)
  questions.value = data
}

onBeforeMount(() => {
  fetchQuestions()
})

const search = ref('')

const filteredQuestions = computed(() => {
  return questions.value.filter(
    (question) =>
      question.type === 'QUIZ' &&
      question.content &&
      (question.content as string).toLowerCase().includes(search.value.toLowerCase()),
  )
})
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between">
      <Input
        v-model="search"
        placeholder="Search question"
        class="w-60 p-2"
      />

      <!-- view switch -->
      <div class="flex gap-3">
        <div
          :class="{ 'bg-slate-100': view === 'expand' }"
          class="flex hover:bg-slate-100 p-1 rounded-md px-3 items-center gap-2 cursor-pointer"
          @click="view = 'expand'"
        >
          <span class="i-material-symbols-light-grid-view-outline-rounded text-2xl"></span>
          <p>Expand view</p>
        </div>

        <div
          :class="{ 'bg-slate-100': view !== 'expand' }"
          class="flex hover:bg-slate-100 p-1 rounded-md px-3 items-center gap-2 cursor-pointer"
          @click="view = 'list'"
        >
          <span class="i-material-symbols-light-format-list-bulleted-rounded text-2xl"></span>
          <p>List view</p>
        </div>
      </div>
    </div>

    <!-- questions -->
    <div class="mt-5">
      <QuestionsListView
        v-if="view === 'list'"
        :questions="filteredQuestions"
      />
      <QuestionsExpandView
        v-else
        :questions="filteredQuestions"
      />
    </div>
  </div>
</template>
