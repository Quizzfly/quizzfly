<script setup lang="ts">
import QuestionList from '@/components/quizzfly/create/QuestionList.vue'
import SlideMain from '@/components/quizzfly/create/SlideMain.vue'
import QuizMain from '@/components/quizzfly/create/QuizMain.vue'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'
import { useLoadingStore } from '@/stores/loading'
import { useQuestionsStore } from '@/stores/quizzfly/question'
import { useConfirmDialog } from '@/stores/modal'
import { Button } from '@/components/ui/button'
import type { QuizType } from '@/types/question'

const route = useRoute()
const router = useRouter()
const quizzflyStore = useQuizzflyStore()
const loadingStore = useLoadingStore()
const questionsStore = useQuestionsStore()
const confirmDialog = useConfirmDialog()

onBeforeUnmount(() => {
  questionsStore.$reset()
  quizzflyStore.$reset()
})

onBeforeMount(async () => {
  loadingStore.setLoading(true)
  try {
    await quizzflyStore.getQuizzflyDetail(route.params.quizzflyId as string)
    await questionsStore.fetchQuestions()
    questionsStore.setCurrentQuestion(questionsStore.getSlides[0])
  } catch (error) {
    console.error(error)
    loadingStore.setLoading(false)
    await confirmDialog.open({
      title: 'Error',
      question: 'Have an error when fetching data!',
      onlyConfirm: true,
      error: true,
    })
    router.push({ name: 'quizzfly' })
  } finally {
    setTimeout(() => {
      loadingStore.setLoading(false)
    }, 500)
  }
})

const currentQuestion = computed<any>({
  get: () => questionsStore.getCurrentQuestion,
  set: (value) => {
    questionsStore.setCurrentQuestion(value)
  },
})

const handleAddSlide = (type: 'quiz' | 'slide', quizType?: QuizType) => {
  if (type === 'quiz') {
    questionsStore.addQuestion(type, {
      quiz_type: quizType,
    })
  } else {
    questionsStore.addQuestion(type)
  }

  questionsStore.setCurrentQuestion(questionsStore.getSlides[questionsStore.getSlides.length - 1])
  nextTick(() => {
    document.getElementById(`question-${questionsStore.currentQuestion.id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  })
}
</script>
<template>
  <div class="max-md:flex-col-reverse flex w-full items-stretch p-5 pl-0 gap-0">
    <Teleport to="body">
      <div
        class="md:hidden z-50 flex flex-col fixed top-0 left-0 w-full h-full bg-slate-100 gap-10 justify-center items-center"
      >
        <img
          class="w-1/2"
          src="/assets/images/work-at-home.png"
          alt=""
        />
        <p class="text-center font-medium">Please use a larger screen to create a quiz</p>
        <RouterLink :to="{ name: 'quizzfly' }">
          <Button>Back to home</Button>
        </RouterLink>
      </div>
    </Teleport>

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
    <QuizMain
      v-if="currentQuestion && currentQuestion.type === 'QUIZ'"
      :key="currentQuestion.id"
    />
    <SlideMain
      v-if="currentQuestion && currentQuestion.type === 'SLIDE'"
      :key="currentQuestion.id"
    />
  </div>
</template>
