<script setup lang="ts">
import { getRoomParticipantsApi, getRoomSummaryApi } from '@/services/room'
import type { Participant, RoomSummary } from '@/types'
import ReportSummary from '@/components/report/ReportSummary.vue'
import ReportQuestion from '@/components/report/ReportQuestion.vue'
const menu = ref([
  {
    title: 'Summary',
    to: { name: 'dashboard' },
  },
  {
    title: 'Questions',
    to: { name: 'settings' },
    items: 0,
  },
])

const route = useRoute()
const currentMenu = ref(menu.value[0])
const roomId = route.params.id
const roomSummary = ref<RoomSummary>()
const participants = ref<Participant[]>([])

const fetchRoomSummary = async () => {
  if (!roomId || typeof roomId !== 'string') return
  const { data } = await getRoomSummaryApi(roomId)
  roomSummary.value = data
  menu.value[1].items = roomSummary.value.question_count
}

const fetchParticipants = async () => {
  if (!roomId || typeof roomId !== 'string') return
  const { data } = await getRoomParticipantsApi(roomId)
  participants.value = data
}
onMounted(() => {
  fetchRoomSummary()
  fetchParticipants()
})
</script>
<template>
  <div class="h-full flex flex-col pb-5">
    <div class="p-5 pb-0">
      <RouterLink
        class="flex items-center gap-2"
        :to="{ name: 'reports' }"
      >
        <span class="i-material-symbols-light-arrow-left-alt-rounded text-2xl"></span>
        Back to reports
      </RouterLink>

      <p class="mt-5 text-2xl font-semibold">Report</p>
      <!-- menu -->
      <div class="mt-8 flex justify-between">
        <div class="flex items-center gap-5">
          <div
            v-for="item in menu"
            :key="item.title"
            class="flex items-center gap-2 px-2 font-medium cursor-pointer pb-2 border-b-2 border-transparent"
            :class="{ 'text-primary !border-primary': item.title === currentMenu.title }"
            @click="currentMenu = item"
          >
            <span
              >{{ item.title }} <span v-if="item.items">({{ item.items }})</span></span
            >
          </div>
        </div>

        <div>
          <p><span class="font-medium"> Host by </span> {{ roomSummary?.host.name }}</p>
        </div>
      </div>
      <!-- end menu -->
    </div>

    <!-- blocks -->
    <div class="flex flex-col gap-4 w-full h-full bg-white p-6 border-t">
      <ReportSummary
        v-if="roomSummary && currentMenu.title === 'Summary'"
        :room-summary="roomSummary"
        :participants="participants"
      />

      <ReportQuestion v-show="currentMenu.title === 'Questions'" />
    </div>
  </div>
</template>
