<script setup lang="ts">
import type { Participant, RoomSummary } from '@/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table'
import { Button } from '../ui/button'
defineProps<{
  roomSummary: RoomSummary
  participants: Participant[]
}>()
</script>
<template>
  <div class="flex gap-5 h-[200px] items-stretch">
    <div class="w-full border rounded-md shadow-sm p-4">
      <p class="text-3xl font-bold">Practice makes perfect!</p>
      <p>
        Play again and let the same group improve their score or see if new players can beat this
        result.
      </p>
      <RouterLink
        v-if="roomSummary && roomSummary.quizzfly"
        class="btn btn-primary mt-5"
        _target="blank"
        :to="{ name: 'host-live', params: { quizzflyId: roomSummary.quizzfly.id } }"
      >
        <Button class="btn btn-primary mt-4">Play again</Button>
      </RouterLink>
    </div>
    <div class="min-w-[300px] border rounded-lg bg-white shadow-sm">
      <div class="border-b p-2 gap-2 px-5 py-4 flex items-center">
        <span class="text-primary i-material-symbols-light-person text-2xl"></span>
        <p class="truncate">Hosted by {{ roomSummary?.host.name }}</p>
        <img
          v-image
          class="w-6 h-6 rounded-full"
          :src="roomSummary?.host.avatar"
          alt=""
        />
      </div>
      <div class="border-b p-2 gap-2 px-5 py-4 flex items-center">
        <span class="text-blue-400 i-solar-alarm-bold text-2xl"></span>
        <p class="truncate">Play at {{ new Date(roomSummary?.created_at).toLocaleString() }}</p>
      </div>
      <div class="border-b p-2 gap-2 px-5 py-4 flex items-center">
        <span class="text-[#28a1a4] i-solar-gamepad-bold text-2xl"></span>
        <p class="truncate">
          Room PIN: <span class="font-bold">{{ roomSummary?.room_pin }}</span>
        </p>
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-2 w-full h-full overflow-hidden">
    <!-- list participant -->
    <p class="font-medium">Participants ({{ roomSummary?.participant_count }})</p>
    <div class="flex overflow-hidden border shadow-sm rounded-lg w-full h-full">
      <Table class="w-full overflow-y-auto">
        <TableCaption v-if="participants.length === 0"> No participant! </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]"> Nick name </TableHead>
            <TableHead class="text-center">Rank</TableHead>
            <TableHead>Correct answer</TableHead>
            <TableHead> Wrong answer </TableHead>
            <TableHead>Not answer</TableHead>
            <TableHead> Total score </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="participant in participants"
            :key="participant.id"
          >
            <TableCell class="font-medium text-center">
              {{ participant.nick_name }}
            </TableCell>
            <TableCell class="text-center">{{ participant.rank }}</TableCell>
            <TableCell>{{ participant.correct_count }}</TableCell>
            <TableCell>
              {{ participant.incorrect_count }}
            </TableCell>
            <TableCell>
              {{ participant.unanswered_count }}
            </TableCell>
            <TableCell>
              {{ participant.total_score }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
