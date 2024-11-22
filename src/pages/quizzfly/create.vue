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
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

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

onMounted(() => {
  if (localStorage.getItem('quizzfly-tour')) {
    return
  }
  const driverObj = driver({
    onDestroyStarted: async () => {
      if (!driverObj.hasNextStep()) {
        localStorage.setItem('quizzfly-tour', 'true')
        driverObj.destroy()
      }
    },
    onCloseClick: () => {
      localStorage.setItem('quizzfly-tour', 'true')
      driverObj.destroy()
    },
    showProgress: true,
    steps: [
      {
        element: '#tour-item[data-tour="1"]',
        popover: {
          title: 'Create quiz with AI',
          description: 'You can create a quiz with AI by clicking this button.',
          side: 'left',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="2"]',
        popover: {
          title: 'Add new Quiz or Slide',
          description: 'You can add a new quiz or slide by clicking these buttons.',
          side: 'bottom',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="3"]',
        popover: {
          title: 'All your questions here',
          description: 'You can see all your questions here and click on the question to edit it.',
          side: 'bottom',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="4"]',
        popover: {
          title: 'Add question content',
          description: 'You can add question content here.',
          side: 'left',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="5"]',
        popover: {
          title: 'Add question answer',
          description: 'You can add question answer here.',
          side: 'top',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="6"]',
        popover: {
          title: 'Settings for quiz',
          description: 'You can change the settings for the quiz here.',
          side: 'top',
          align: 'start',
        },
      },
    ],
  })

  driverObj.drive()
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

  // set current question to the last question and scroll to it
  questionsStore.setCurrentQuestion(
    questionsStore.getSlides[questionsStore.getSlides.length - 1],
    true,
  )
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
