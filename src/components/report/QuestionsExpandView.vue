<script setup lang="ts">
import type { RoomQuestion } from '@/types'
import { colorsHex } from '@/utils/theme'

defineProps<{
  questions: RoomQuestion[]
}>()
</script>
<template>
  <div class="flex flex-col gap-5">
    <div
      v-for="(question, index) in questions"
      :key="question.id"
      class="bg-slate-50 p-2 rounded-lg"
    >
      <div class="flex justify-between">
        <p class="text-base mb-2">{{ index + 1 }}. {{ question.content }}</p>
        <p class="text-sm text-gray-500">{{ question.quiz_type.replace('_', ' ') }}</p>
      </div>
      <div class="flex w-full gap-5 items-center">
        <img
          v-image
          class="max-lg:w-[300px] w-[350px] border"
          :src="question.background_url || ''"
          alt=""
        />
        <div class="flex-auto flex flex-col gap-4">
          <div
            v-for="(answer, index) in question.answers"
            :key="answer.id"
            class="flex justify-between border-b pb-1"
          >
            <!-- content -->
            <div class="flex items-center gap-2">
              <div
                :style="{ backgroundColor: colorsHex[index].primary }"
                class="w-6 h-6 rounded-sm"
              ></div>
              <p>
                {{ answer.content }}
              </p>
            </div>

            <div class="flex items-center gap-2">
              <span
                v-if="answer.is_correct"
                class="i-material-symbols-light-check text-2xl text-green-700"
              ></span>

              <span
                v-else
                class="i-material-symbols-light-close text-2xl text-red-700"
              ></span>

              {{ answer.answer_count }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
