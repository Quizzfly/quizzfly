<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { RoomQuestion } from '@/types'

defineProps<{
  questions: RoomQuestion[]
}>()
</script>
<template>
  <div class="border rounded-lg">
    <Table class="w-full overflow-y-auto">
      <TableHeader>
        <TableRow>
          <TableHead class="w-[400px]"> Quiz </TableHead>
          <TableHead class="text-center">Quiz type</TableHead>
          <TableHead class="text-center">Correct answer</TableHead>
          <TableHead class="text-center"> Wrong answer </TableHead>
          <TableHead class="text-center"> Total answered </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="question in questions"
          :key="question.id"
        >
          <TableCell class="font-medium text-center">
            {{ question.content }}
          </TableCell>
          <TableCell class="text-center">{{ question.quiz_type.replace('_', ' ') }}</TableCell>
          <TableCell class="text-center">{{ question.correct_count }}</TableCell>
          <TableCell class="text-center">
            {{ question.incorrect_count }}
          </TableCell>
          <TableCell class="text-center">
            {{ question.participant_answered_count }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
