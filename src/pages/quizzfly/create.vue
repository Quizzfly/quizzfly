<script setup lang="ts">
import SlideList from '@/components/quizzfly/create/SlideList.vue'
import SlideMain from '@/components/quizzfly/create/SlideMain.vue'
import QuizMain from '@/components/quizzfly/create/QuizMain.vue'
import { v4 as uuidv4 } from 'uuid'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'
import { useLoadingStore } from '@/stores/loading'
import { useSlidesStore } from '@/stores/quizzfly/quizzflySlide'

const route = useRoute()
const quizzflyStore = useQuizzflyStore()
const loadingStore = useLoadingStore()
const slidesStore = useSlidesStore()

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
  slidesStore.setCurrentSlide(slidesStore.getSlides[0])
})

const currentSlide = computed<any>({
  get: () => slidesStore.getCurrentSlide,
  set: (value) => {
    slidesStore.setCurrentSlide(value)
  },
})

const handleAddSlide = (type: 'quiz' | 'slide', quizType: string) => {
  slidesStore.addSlide({
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
    <SlideList
      v-model="currentSlide"
      :slides="slidesStore.getSlides"
      @add-slide="handleAddSlide"
    />
    <QuizMain v-if="currentSlide.type === 'quiz'" />
    <SlideMain v-else />
  </div>
</template>
