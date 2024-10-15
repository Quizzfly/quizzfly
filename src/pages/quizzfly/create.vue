<script setup lang="ts">
import QuestionList from '@/components/quizzfly/create/QuestionList.vue'
import SlideMain from '@/components/quizzfly/create/SlideMain.vue'
import QuizMain from '@/components/quizzfly/create/QuizMain.vue'
import { v4 as uuidv4 } from 'uuid'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'
import { useLoadingStore } from '@/stores/loading'
import { useQuestionsStore } from '@/stores/quizzfly/question'

const route = useRoute()
const quizzflyStore = useQuizzflyStore()
const loadingStore = useLoadingStore()
const questionsStore = useQuestionsStore()

onBeforeMount(() => {
  loadingStore.setLoading(true)
  try {
    quizzflyStore.getQuizzflyDetail(route.params.quizzflyId as string)
  } catch (error) {
    console.error(error)
  }
  setTimeout(() => {
    loadingStore.setLoading(false)
  }, 500)
})

onBeforeMount(() => {
  questionsStore.setCurrentQuestion(questionsStore.getSlides[0])
})

const currentQuestion = computed<any>({
  get: () => questionsStore.getCurrentQuestion,
  set: (value) => {
    questionsStore.setCurrentQuestion(value)
  },
})

const handleAddSlide = (type: 'quiz' | 'slide', quizType: string) => {
  questionsStore.addSlide({
    id: uuidv4(),
    title: '',
    type: type,
    quizType: quizType,
    content: 'This is a quiz slide',
    image: 'https://picsum.photos/200/300',
    link: 'https://picsum.photos/200/300',
    answers: [],
  })
}
</script>
<template>
  <div class="flex w-full items-stretch p-5 pl-0 gap-4">
    <QuestionList
      v-model="currentQuestion"
      v-motion
      :slides="questionsStore.getSlides"
      :initial="{ opacity: 0, x: -100 }"
      :enter="{ opacity: 1, x: 0, scale: 1 }"
      :delay="300"
      :duration="300"
      @add-slide="handleAddSlide"
    />
    <QuizMain v-if="currentQuestion.type === 'quiz'" />
    <SlideMain v-else />
  </div>
</template>
