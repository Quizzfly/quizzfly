<script setup lang="ts">
import SlideList from '@/components/quizzfly/create/SlideList.vue'
import SlideMain from '@/components/quizzfly/create/SlideMain.vue'
import QuizMain from '@/components/quizzfly/create/QuizMain.vue'
import type { Slide } from '@/types/slide'
import { useQuizzflyStore } from '@/stores/quizzfly'
import { useLoadingStore } from '@/stores/loading'
const route = useRoute()
const quizzflyStore = useQuizzflyStore()
const loadingStore = useLoadingStore()

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

const slides = ref<Slide[]>([
  {
    id: 1,
    title: 'Slide 1',
    type: 'quiz',
    content: 'This is a quiz slide',
    image: 'https://picsum.photos/200/300',
    link: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    title: 'Slide 2',
    type: 'slide',
    content: 'This is a quiz slide',
    image: 'https://picsum.photos/200/300',
    link: 'https://picsum.photos/200/300',
  },
  {
    id: 3,
    title: 'Slide 3',
    type: 'slide',
    content: 'This is a quiz slide',
    image: 'https://picsum.photos/200/300',
    link: 'https://picsum.photos/200/300',
  },
  {
    id: 4,
    title: 'Slide 4',
    type: 'quiz',
    content: 'This is a quiz slide',
    image: 'https://picsum.photos/200/300',
    link: 'https://picsum.photos/200/300',
  },
  {
    id: 5,
    title: 'Slide 5',
    type: 'quiz',
    content: 'This is a quiz slide',
    image: 'https://picsum.photos/200/300',
    link: 'https://picsum.photos/200/300',
  },
  {
    id: 6,
    title: 'Slide 5',
    type: 'quiz',
    content: 'This is a quiz slide',
    image: 'https://picsum.photos/200/300',
    link: 'https://picsum.photos/200/300',
  },
])

const currentSlide = ref<Slide>(slides.value[0])

const handleAddSlide = () => {
  slides.value.push({
    id: slides.value.length + 1,
    title: `Slide ${slides.value.length + 1}`,
    type: 'slide',
    content: 'This is a quiz slide',
    image: 'https://picsum.photos/200/300',
    link: 'https://picsum.photos/200/300',
  })
}

const handleAddQuiz = (type: 'quiz' | 'slide') => {
  slides.value.push({
    id: slides.value.length + 1,
    title: `Slide ${slides.value.length + 1}`,
    type: type,
    content: 'This is a quiz slide',
    image: 'https://picsum.photos/200/300',
    link: 'https://picsum.photos/200/300',
  })
}
</script>
<template>
  <div class="flex w-full items-stretch p-5 pl-0 gap-4">
    <SlideList
      v-model="currentSlide"
      :slides="slides"
      @add-slide="handleAddSlide"
      @add-quiz="handleAddQuiz"
    />
    <QuizMain v-if="currentSlide.type === 'quiz'" />
    <SlideMain v-else />
  </div>
</template>
