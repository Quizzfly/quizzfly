<script setup lang="ts">
import Answers from '../common/Answers.vue'
import type {
  SocketLeaderboard,
  SocketQuizStarted,
  SocketSummaryAnswer,
  SocketUserAnswerQuestion,
} from '@/types/socket'
import { useSocketStore } from '@/stores/socket'
import type { Quiz } from '@/types/question'
const socketStore = useSocketStore()
import AnswerStatistic from './AnswerStatistic.vue'
import { useRoomStore } from '@/stores/room'
// const socketData = ref({
//   room_pin: '738995',
//   start_time: 1731299260380,
//   question: {
//     content: 'dsd\nfđsd\nf\nsdf\nsdfd',
//     point_multiplier: 2,
//     background_url:
//       'https://res.cloudinary.com/dtpqh6cau/image/upload/f_auto,q_auto/jlegiesnp43uixqaknwc',
//     id: 'fdefe26e-f7d6-4bbc-972f-2319af5567f6',
//     time_limit: 20,
//     quiz_type: 'MULTIPLE_CHOICE',
//     files: [
//       {
//         url: 'https://res.cloudinary.com/dx5omabv0/image/upload/v1730190365/txrz8fopsjyeveh81aax.png',
//         bytes: 555505,
//         format: 'png',
//         public_id: 'txrz8fopsjyeveh81aax',
//         resource_type: 'image',
//         original_filename: 'file',
//       },
//     ],
//     prev_element_id: null,
//     quizzfly_id: 'd8188e44-407e-46b9-b64b-eaba59ec3725',
//     created_at: '2024-10-27T16:14:15.716Z',
//     updated_at: '2024-11-10T07:55:24.246Z',
//     deleted_at: null,
//     answers: [
//       {
//         id: 'f3dabb2d-b90b-4150-b5a3-9ae47a460bbb',
//         content: 'True',
//         is_correct: false,
//         files: [],
//         quiz_id: 'fdefe26e-f7d6-4bbc-972f-2319af5567f6',
//         created_at: '2024-10-29T08:11:34.114Z',
//         updated_at: '2024-10-29T08:11:34.114Z',
//         deleted_at: null,
//       },
//       {
//         id: 'f3dabb2d-b90b-4150-b5a3-9ae47a460bbb',
//         content: 'True',
//         is_correct: false,
//         files: [],
//         quiz_id: 'fdefe26e-f7d6-4bbc-972f-2319af5567f6',
//         created_at: '2024-10-29T08:11:34.114Z',
//         updated_at: '2024-10-29T08:11:34.114Z',
//         deleted_at: null,
//       },
//       {
//         id: 'f3dabb2d-b90b-4150-b5a3-9ae47a460bbb',
//         content: 'True',
//         is_correct: false,
//         files: [],
//         quiz_id: 'fdefe26e-f7d6-4bbc-972f-2319af5567f6',
//         created_at: '2024-10-29T08:11:34.114Z',
//         updated_at: '2024-10-29T08:11:34.114Z',
//         deleted_at: null,
//       },
//       {
//         id: '602c0830-6dde-4340-89ce-c1311a15c98e',
//         content: 'False',
//         is_correct: true,
//         files: [],
//         quiz_id: 'fdefe26e-f7d6-4bbc-972f-2319af5567f6',
//         created_at: '2024-10-29T08:11:34.093Z',
//         updated_at: '2024-10-29T08:35:54.488Z',
//         deleted_at: null,
//       },
//     ],
//     type: 'QUIZ',
//     start_time: 1731299260380,
//     choices: {
//       'f3dabb2d-b90b-4150-b5a3-9ae47a460bbb': 0,
//       '602c0830-6dde-4340-89ce-c1311a15c98e': 0,
//     },
//     correct_answer_id: '602c0830-6dde-4340-89ce-c1311a15c98e',
//   },
//   questions: [
//     {
//       content: 'dsd\nfđsd\nf\nsdf\nsdfd',
//       point_multiplier: 2,
//       background_url:
//         'https://res.cloudinary.com/dtpqh6cau/image/upload/f_auto,q_auto/jlegiesnp43uixqaknwc',
//       id: 'fdefe26e-f7d6-4bbc-972f-2319af5567f6',
//       time_limit: 20,
//       quiz_type: 'TRUE_FALSE',
//       files: [
//         {
//           url: 'https://res.cloudinary.com/dx5omabv0/image/upload/v1730190365/txrz8fopsjyeveh81aax.png',
//           bytes: 555505,
//           format: 'png',
//           public_id: 'txrz8fopsjyeveh81aax',
//           resource_type: 'image',
//           original_filename: 'file',
//         },
//       ],
//       prev_element_id: null,
//       quizzfly_id: 'd8188e44-407e-46b9-b64b-eaba59ec3725',
//       created_at: '2024-10-27T16:14:15.716Z',
//       updated_at: '2024-11-10T07:55:24.246Z',
//       deleted_at: null,
//       answers: [
//         {
//           id: 'f3dabb2d-b90b-4150-b5a3-9ae47a460bbb',
//           content: 'True',
//           is_correct: false,
//           files: [],
//           quiz_id: 'fdefe26e-f7d6-4bbc-972f-2319af5567f6',
//           created_at: '2024-10-29T08:11:34.114Z',
//           updated_at: '2024-10-29T08:11:34.114Z',
//           deleted_at: null,
//         },
//         {
//           id: '602c0830-6dde-4340-89ce-c1311a15c98e',
//           content: 'False',
//           is_correct: true,
//           files: [],
//           quiz_id: 'fdefe26e-f7d6-4bbc-972f-2319af5567f6',
//           created_at: '2024-10-29T08:11:34.093Z',
//           updated_at: '2024-10-29T08:35:54.488Z',
//           deleted_at: null,
//         },
//       ],
//       type: 'QUIZ',
//       start_time: 1731299260380,
//       choices: {
//         'f3dabb2d-b90b-4150-b5a3-9ae47a460bbb': 0,
//         '602c0830-6dde-4340-89ce-c1311a15c98e': 0,
//       },
//       correct_answer_id: '602c0830-6dde-4340-89ce-c1311a15c98e',
//     },
//     {
//       content: 'dsd\nfsd\nf\nsdf\nsdfd',
//       point_multiplier: 2,
//       background_url:
//         'https://res.cloudinary.com/dtpqh6cau/image/upload/f_auto,q_auto/jlegiesnp43uixqaknwc',
//       id: '0af624a5-2a30-4953-9bdc-293ed4347c03',
//       time_limit: 20,
//       quiz_type: 'MULTIPLE_CHOICE',
//       files: [
//         {
//           url: 'https://res.cloudinary.com/dx5omabv0/image/upload/v1730190365/txrz8fopsjyeveh81aax.png',
//           bytes: 555505,
//           format: 'png',
//           public_id: 'txrz8fopsjyeveh81aax',
//           resource_type: 'image',
//           original_filename: 'file',
//         },
//       ],
//       prev_element_id: 'fdefe26e-f7d6-4bbc-972f-2319af5567f6',
//       quizzfly_id: 'd8188e44-407e-46b9-b64b-eaba59ec3725',
//       created_at: '2024-11-01T03:37:44.140Z',
//       updated_at: '2024-11-10T07:48:30.721Z',
//       deleted_at: null,
//       answers: [
//         {
//           id: '81662cd2-18af-41b3-8f83-753a5afa7c71',
//           content: 'Trueedededed',
//           is_correct: false,
//           files: [],
//           quiz_id: '0af624a5-2a30-4953-9bdc-293ed4347c03',
//           created_at: '2024-11-10T07:46:30.416Z',
//           updated_at: '2024-11-10T07:48:37.578Z',
//           deleted_at: null,
//         },
//         {
//           id: '69d59ce0-d99f-43d1-b412-89e9e9e39c34',
//           content: 'Falseededede',
//           is_correct: true,
//           files: [],
//           quiz_id: '0af624a5-2a30-4953-9bdc-293ed4347c03',
//           created_at: '2024-11-10T07:46:30.423Z',
//           updated_at: '2024-11-10T07:48:38.423Z',
//           deleted_at: null,
//         },
//         {
//           id: 'fb55e469-c3a1-4f10-870f-8b39562e7add',
//           content: 'dêdededed',
//           is_correct: false,
//           files: [],
//           quiz_id: '0af624a5-2a30-4953-9bdc-293ed4347c03',
//           created_at: '2024-11-10T07:48:34.093Z',
//           updated_at: '2024-11-10T07:48:40.645Z',
//           deleted_at: null,
//         },
//       ],
//       type: 'QUIZ',
//     },
//     {
//       content: '1',
//       point_multiplier: 1,
//       background_url:
//         'https://res.cloudinary.com/dtpqh6cau/image/upload/f_auto,q_auto/zatbxz9cleryd3bwldmx',
//       id: '01c2f986-0de3-46f5-9781-13a14065fbd5',
//       time_limit: 20,
//       quiz_type: 'TRUE_FALSE',
//       files: [],
//       prev_element_id: '0af624a5-2a30-4953-9bdc-293ed4347c03',
//       quizzfly_id: 'd8188e44-407e-46b9-b64b-eaba59ec3725',
//       created_at: '2024-10-29T08:15:37.152Z',
//       updated_at: '2024-11-01T03:37:44.173Z',
//       deleted_at: null,
//       answers: [
//         {
//           id: 'fe88a135-c509-4964-aa08-e041df168a24',
//           content: 'False',
//           is_correct: false,
//           files: [],
//           quiz_id: '01c2f986-0de3-46f5-9781-13a14065fbd5',
//           created_at: '2024-10-29T08:18:40.466Z',
//           updated_at: '2024-10-29T08:18:40.466Z',
//           deleted_at: null,
//         },
//         {
//           id: '83de080d-d6fa-4bd1-9b1d-b3d61cf9c52d',
//           content: 'True',
//           is_correct: true,
//           files: [],
//           quiz_id: '01c2f986-0de3-46f5-9781-13a14065fbd5',
//           created_at: '2024-10-29T08:18:40.444Z',
//           updated_at: '2024-10-29T08:21:24.564Z',
//           deleted_at: null,
//         },
//       ],
//       type: 'QUIZ',
//     },
//     {
//       content: '1',
//       point_multiplier: 1,
//       background_url:
//         'https://res.cloudinary.com/dtpqh6cau/image/upload/f_auto,q_auto/zatbxz9cleryd3bwldmx',
//       id: 'd56f8d6a-bd3c-4e14-99ef-c9dd866331b6',
//       time_limit: 20,
//       quiz_type: 'TRUE_FALSE',
//       files: [],
//       prev_element_id: '01c2f986-0de3-46f5-9781-13a14065fbd5',
//       quizzfly_id: 'd8188e44-407e-46b9-b64b-eaba59ec3725',
//       created_at: '2024-10-29T08:11:36.677Z',
//       updated_at: '2024-10-29T08:26:36.035Z',
//       deleted_at: null,
//       answers: [
//         {
//           id: '2768934f-c41d-44ba-bab0-98a17db52854',
//           content: 'True',
//           is_correct: false,
//           files: [],
//           quiz_id: 'd56f8d6a-bd3c-4e14-99ef-c9dd866331b6',
//           created_at: '2024-10-29T08:14:12.060Z',
//           updated_at: '2024-10-29T08:14:12.060Z',
//           deleted_at: null,
//         },
//         {
//           id: 'e0c80d2f-7929-4152-8316-df2cf23bae7a',
//           content: 'False',
//           is_correct: false,
//           files: [],
//           quiz_id: 'd56f8d6a-bd3c-4e14-99ef-c9dd866331b6',
//           created_at: '2024-10-29T08:14:12.086Z',
//           updated_at: '2024-10-29T08:14:12.086Z',
//           deleted_at: null,
//         },
//       ],
//       type: 'QUIZ',
//     },
//     {
//       content: '1',
//       point_multiplier: 1,
//       background_url:
//         'https://res.cloudinary.com/dtpqh6cau/image/upload/f_auto,q_auto/xeup3wn9zau4z3kuwz8s',
//       id: 'a800fae4-a132-4097-888e-476982dc486f',
//       time_limit: 20,
//       quiz_type: 'TRUE_FALSE',
//       files: [],
//       prev_element_id: 'd56f8d6a-bd3c-4e14-99ef-c9dd866331b6',
//       quizzfly_id: 'd8188e44-407e-46b9-b64b-eaba59ec3725',
//       created_at: '2024-10-29T08:14:13.813Z',
//       updated_at: '2024-10-29T08:26:38.397Z',
//       deleted_at: null,
//       answers: [
//         {
//           id: 'f6441a49-a572-4c3a-9f2d-ed4e9d01f45f',
//           content: 'True',
//           is_correct: false,
//           files: [],
//           quiz_id: 'a800fae4-a132-4097-888e-476982dc486f',
//           created_at: '2024-10-29T08:26:37.065Z',
//           updated_at: '2024-10-29T08:26:37.065Z',
//           deleted_at: null,
//         },
//         {
//           id: 'ae700ce1-f459-4c71-a963-dfd7bf543ea9',
//           content: 'False',
//           is_correct: false,
//           files: [],
//           quiz_id: 'a800fae4-a132-4097-888e-476982dc486f',
//           created_at: '2024-10-29T08:26:37.090Z',
//           updated_at: '2024-10-29T08:26:37.090Z',
//           deleted_at: null,
//         },
//       ],
//       type: 'QUIZ',
//     },
//     {
//       content: '1',
//       point_multiplier: 1,
//       background_url:
//         'https://res.cloudinary.com/dtpqh6cau/image/upload/f_auto,q_auto/pmxmjfuvgioxy39g980v',
//       id: '38b6f17c-9f11-4f6e-af37-29a6b8e7be9f',
//       time_limit: 25,
//       quiz_type: 'MULTIPLE_CHOICE',
//       files: [],
//       prev_element_id: 'a800fae4-a132-4097-888e-476982dc486f',
//       quizzfly_id: 'd8188e44-407e-46b9-b64b-eaba59ec3725',
//       created_at: '2024-10-29T08:11:06.258Z',
//       updated_at: '2024-10-29T08:29:40.561Z',
//       deleted_at: null,
//       answers: [],
//       type: 'QUIZ',
//     },
//     {
//       content: null,
//       point_multiplier: 1,
//       background_url: null,
//       id: '926d186d-ba71-4672-af38-31009dfded76',
//       time_limit: 20,
//       quiz_type: 'MULTIPLE_CHOICE',
//       files: [
//         {
//           url: 'https://res.cloudinary.com/dx5omabv0/image/upload/v1730121866/nsb5eaed2ysv1gvezw7a.jpg',
//           bytes: 427074,
//           format: 'jpg',
//           public_id: 'nsb5eaed2ysv1gvezw7a',
//           resource_type: 'image',
//           original_filename: 'file',
//         },
//       ],
//       prev_element_id: '38b6f17c-9f11-4f6e-af37-29a6b8e7be9f',
//       quizzfly_id: 'd8188e44-407e-46b9-b64b-eaba59ec3725',
//       created_at: '2024-10-27T16:25:57.052Z',
//       updated_at: '2024-10-29T08:11:06.273Z',
//       deleted_at: null,
//       answers: [
//         {
//           id: '99bde567-33dc-4936-9466-8c13120fb604',
//           content: ' ',
//           is_correct: false,
//           files: [],
//           quiz_id: '926d186d-ba71-4672-af38-31009dfded76',
//           created_at: '2024-10-29T08:21:34.536Z',
//           updated_at: '2024-10-29T08:21:34.536Z',
//           deleted_at: null,
//         },
//         {
//           id: '6e866b5b-87d3-4f8a-81bf-ecdf14ee3791',
//           content: ' ',
//           is_correct: false,
//           files: [],
//           quiz_id: '926d186d-ba71-4672-af38-31009dfded76',
//           created_at: '2024-10-29T08:36:29.206Z',
//           updated_at: '2024-10-29T08:36:29.206Z',
//           deleted_at: null,
//         },
//         {
//           id: '7046a780-5e37-4c42-9836-fd1f38ee9a77',
//           content: ' ',
//           is_correct: false,
//           files: [],
//           quiz_id: '926d186d-ba71-4672-af38-31009dfded76',
//           created_at: '2024-10-29T08:36:35.608Z',
//           updated_at: '2024-10-29T08:36:35.608Z',
//           deleted_at: null,
//         },
//         {
//           id: '71b378e7-57d7-472f-9751-23989fc96063',
//           content: ' ',
//           is_correct: false,
//           files: [],
//           quiz_id: '926d186d-ba71-4672-af38-31009dfded76',
//           created_at: '2024-10-29T08:36:37.282Z',
//           updated_at: '2024-10-29T08:36:37.282Z',
//           deleted_at: null,
//         },
//       ],
//       type: 'QUIZ',
//     },
//     {
//       content: '5',
//       point_multiplier: 1,
//       background_url: null,
//       id: '551c0998-ebb1-4d33-8a86-ae68c26a1474',
//       time_limit: 20,
//       quiz_type: 'MULTIPLE_CHOICE',
//       files: [],
//       prev_element_id: '926d186d-ba71-4672-af38-31009dfded76',
//       quizzfly_id: 'd8188e44-407e-46b9-b64b-eaba59ec3725',
//       created_at: '2024-10-27T16:21:38.929Z',
//       updated_at: '2024-10-29T07:01:56.511Z',
//       deleted_at: null,
//       answers: [],
//       type: 'QUIZ',
//     },
//     {
//       id: 'b94a31d1-6b84-4e3b-adf0-62b99bf3fc1a',
//       content:
//         '{"type":"big-title","columns":[[{"id":0,"element":"input","value":"","props":{"label":"Title","placeholder":"Title"}},{"id":1,"element":"input","value":"","props":{"label":"Title","placeholder":"Title"}},{"id":2,"element":"textarea","value":"","props":{"label":"Description","placeholder":"Description"}}],[{"id":3,"element":"image","value":"","props":{"label":"Image"}}]]}',
//       files: null,
//       background_url:
//         'https://res.cloudinary.com/dtpqh6cau/image/upload/f_auto,q_auto/zatbxz9cleryd3bwldmx',
//       prev_element_id: '551c0998-ebb1-4d33-8a86-ae68c26a1474',
//       quizzfly_id: 'd8188e44-407e-46b9-b64b-eaba59ec3725',
//       created_at: '2024-10-29T08:27:14.904Z',
//       updated_at: '2024-10-29T08:48:20.507Z',
//       deleted_at: null,
//       type: 'SLIDE',
//     },
//   ],
// })

const roomStore = useRoomStore()
const isAutoPlay = computed(() => roomStore.getCurrentSetting.is_auto_play)

const socketMessage = computed(() => {
  return socketStore.getMessage
})

const emits = defineEmits<{
  (e: 'showRanking', val: boolean, data?: SocketLeaderboard): void
  (e: 'showFinalRanking', val: boolean, data?: SocketLeaderboard): void
}>()

const socketData = ref<SocketQuizStarted | null>(null)
const isShowRightAnswer = ref(false)
const timeCountdown = ref(0)
const summaryAnswer = ref<SocketSummaryAnswer | null>(null)
const usersAnswerCount = ref(0)

let countdownInterval: ReturnType<typeof setInterval> | null = null

const handleShowRightAnswer = async (time: number) => {
  isShowRightAnswer.value = true
  await new Promise((resolve) => setTimeout(resolve, time))
  isShowRightAnswer.value = false
}

const handleShowRanking = async (time: number, val: SocketLeaderboard) => {
  if (lastQuestionId.value === socketData.value?.question?.id) {
    emits('showFinalRanking', true, val)
    return
  }
  emits('showRanking', true, val)
  await new Promise((resolve) => setTimeout(resolve, time))

  if (isAutoPlay.value) {
    handleNextQuestion()
  }
}

const handleNextQuestion = () => {
  socketStore.handleNextQuestion()
}

const handleFinishQuestion = () => {
  if (!socketData.value?.question) return
  socketStore.handleFinishQuestion(socketData.value?.question.id)
}

const handleNewQuestion = (data: SocketQuizStarted) => {
  socketData.value = data
  if (
    socketData.value &&
    socketData.value.start_time &&
    (socketData.value.question as Quiz)?.time_limit
  ) {
    const timeStart = socketData.value.start_time // timestamp in milliseconds
    const endTime = timeStart + (socketData.value.question as Quiz).time_limit * 1000 // ví dụ đếm ngược 60 giây từ `startTime`

    if (countdownInterval) clearInterval(countdownInterval)

    countdownInterval = setInterval(async () => {
      const timeRemaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000))
      timeCountdown.value = timeRemaining

      if (timeRemaining <= 0 && countdownInterval) {
        clearInterval(countdownInterval)
        countdownInterval = null

        handleFinishQuestion()

        await handleShowRightAnswer(10000)

        // request get leaderboard
        if (!socketData.value?.question) return
        socketStore.handleRequestLeaderboard(socketData.value?.question.id)
      }
    }, 1000)
  }
}

const handleSummaryAnswer = (val: SocketSummaryAnswer) => {
  summaryAnswer.value = val
}

const lastQuestionId = ref<string | null>(null)
watch(
  () => socketMessage.value,
  async (newVal) => {
    if (newVal.event === 'summaryAnswer') {
      handleSummaryAnswer(newVal.data as SocketSummaryAnswer)
    }

    if (newVal.event === 'nextQuestion' || newVal.event === 'quizStarted') {
      emits('showRanking', false)
      if (newVal.event === 'quizStarted') {
        const numberOfQuestions = (newVal.data as SocketQuizStarted).questions.length
        lastQuestionId.value = (newVal.data as SocketQuizStarted).questions[
          numberOfQuestions - 1
        ].id
      }

      handleNewQuestion(newVal.data as SocketQuizStarted)
    }

    if (newVal.event === 'updateLeaderboard') {
      console.log('updateLeaderboard', newVal.data)
      await handleShowRanking(10000, newVal.data as SocketLeaderboard)
    }

    if (newVal.event === 'answerQuestion') {
      console.log('answerQuestion', newVal.data)
      usersAnswerCount.value = (newVal.data as SocketUserAnswerQuestion).noPlayerAnswered
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval)
})
</script>

<template>
  <div class="h-full w-full">
    <div
      v-if="isShowRightAnswer"
      v-motion-fade
      class="bg-overlay"
    ></div>
    <div class="relative top-0 flex flex-col gap-16 justify-between pb-10 h-full w-full">
      <div class="flex items-center justify-center gap-8 mr-32 w-auto">
        <div class="rounded bg-white p-4">
          <p class="font-black text-2xl text-center">
            {{ socketData?.question?.content }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-between w-full h-full">
        <div class="flex justify-center p-4 rounded-full bg-primary w-[68px] h-[68px]">
          <p class="font-black text-white text-3xl tracking-wider">{{ timeCountdown }}</p>
        </div>

        <div class="flex items-center justify-center rounded-sm h-full flex-auto">
          <AnswerStatistic
            v-if="isShowRightAnswer && summaryAnswer && socketData?.question"
            :key="socketData?.question?.id"
            :summary-answer="summaryAnswer"
            :current-question="socketData?.question"
          />
          <img
            v-else-if="
              socketData?.question.type === 'QUIZ' && (socketData?.question as Quiz).files[0]?.url
            "
            :src="(socketData?.question as Quiz).files[0]?.url"
            class="max-w-[80%] h-full object-contain rounded-sm"
            alt=""
          />
        </div>

        <div class="flex flex-col gap-3 justify-center items-center">
          <div class="p-4 rounded-full bg-primary w-[68px] h-[68px] text-center">
            <p class="font-black text-white text-3xl tracking-wider">{{ usersAnswerCount }}</p>
          </div>
          <div class="px-4 py-2 bg-primary rounded-full">
            <p class="flex items-center justify-center text-white font-semibold text-base">
              Answers
            </p>
          </div>
        </div>
      </div>
      <div class="">
        <Answers
          v-if="socketData?.question"
          :current-question="socketData?.question"
          :is-show-right-answer="isShowRightAnswer"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background-color: rgba(50, 50, 50, 0.3);
}
</style>
