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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const quizzflyStore = useQuizzflyStore()
const loadingStore = useLoadingStore()
const questionsStore = useQuestionsStore()
const confirmDialog = useConfirmDialog()

onBeforeUnmount(() => {
  questionsStore.$reset()
  quizzflyStore.$reset()
  window.onbeforeunload = null
})

onBeforeMount(async () => {
  window.onbeforeunload = function (e) {
    e = e || window.event

    // For IE and Firefox prior to version 4
    if (e) {
      e.returnValue = t('quizzfly.create.unsaved_changes')
    }

    // For Safari
    return t('quizzfly.create.unsaved_changes')
  }
  loadingStore.setLoading(true)
  try {
    await quizzflyStore.getQuizzflyDetail(route.params.quizzflyId as string)
    await questionsStore.fetchQuestions()
    questionsStore.setCurrentQuestion(questionsStore.getSlides[0])
  } catch (error) {
    console.error(error)
    loadingStore.setLoading(false)
    await confirmDialog.open({
      title: t('quizzfly.create.error'),
      question: t('quizzfly.create.error_fetching_data'),
      onlyConfirm: true,
      warning: true,
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
          title: t('quizzfly.create.tour.create_quiz_with_ai'),
          description: t('quizzfly.create.tour.create_quiz_with_ai_desc'),
          side: 'left',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="2"]',
        popover: {
          title: t('quizzfly.create.tour.add_new_quiz_or_slide'),
          description: t('quizzfly.create.tour.add_new_quiz_or_slide_desc'),
          side: 'bottom',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="3"]',
        popover: {
          title: t('quizzfly.create.tour.all_questions_here'),
          description: t('quizzfly.create.tour.all_questions_here_desc'),
          side: 'bottom',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="4"]',
        popover: {
          title: t('quizzfly.create.tour.add_question_content'),
          description: t('quizzfly.create.tour.add_question_content_desc'),
          side: 'left',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="5"]',
        popover: {
          title: t('quizzfly.create.tour.add_question_answer'),
          description: t('quizzfly.create.tour.add_question_answer_desc'),
          side: 'top',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="6"]',
        popover: {
          title: t('quizzfly.create.tour.quiz_settings'),
          description: t('quizzfly.create.tour.quiz_settings_desc'),
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
        <p class="text-center font-medium">{{ $t('quizzfly.create.please_use_larger_screen') }}</p>
        <RouterLink :to="{ name: 'quizzfly' }">
          <Button>{{ $t('quizzfly.create.back_to_home') }}</Button>
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
