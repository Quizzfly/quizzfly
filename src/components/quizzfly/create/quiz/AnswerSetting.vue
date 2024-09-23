<script setup lang="ts">
import Choice from '@/components/quizzfly/create/answer/Choice.vue'

const answer = ref([
  { id: 1, text: 'This is abcd', isCorrect: false },
  {
    id: 2,
    text: 'This is abcd erewf wf wef wef wef we fwe fwef wef we wef wef wef  wefwef wef we f',
    isCorrect: false,
  },
  { id: 3, text: 'This is abcdew we wefef', isCorrect: false },
  { id: 4, text: 'This eqfwefweg', isCorrect: false },
])
</script>
<template>
  <div class="">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-lg font-semibold">Answer Setting</h3>
      <!-- <button class="text-primary">Add Answer</button> -->
    </div>
    <div class="grid grid-cols-2 gap-2 grid-rows-2">
      <Choice
        v-for="(item, index) in answer"
        :key="item.id"
        v-model="answer[index]"
        :index="index"
      />
    </div>
  </div>
</template>
