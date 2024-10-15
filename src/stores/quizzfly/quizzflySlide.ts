import type { Slide } from '@/types'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useSlidesStore = defineStore({
  id: 'slide',
  state: () => ({
    currentSlide: {} as Slide,
    slides: [
      {
        id: uuidv4(),
        title: 'Slide 1',
        type: 'quiz',
        quizType: 'multiple_choice',
        content: 'This is a quiz slide',
        image: 'https://picsum.photos/200/300',
        link: 'https://picsum.photos/200/300',
        answers: [],
      },
    ] as Slide[],
  }),
  actions: {
    async fetchSlides() {
      // fetch slides from an API
      // const slides = await fetch('/api/slides')
      // this.slides = await slides.json()
    },
    addSlide(slide: Slide) {
      this.slides.push(slide)
    },
    setCurrentSlide(slide: Slide) {
      this.currentSlide = slide
    },
    updateCurrentSlide(slide: Partial<Slide>) {
      this.currentSlide = { ...this.currentSlide, ...slide }
      this.updateSlide(this.currentSlide)
    },
    updateSlide(slide: Slide) {
      const index = this.slides.findIndex((s) => s.id === slide.id)
      this.slides[index] = slide
    },
    updateCurrentSlideAnswers(answers: any[]) {
      this.currentSlide.answers = answers
      const index = this.slides.findIndex((s) => s.id === this.currentSlide.id)
      this.slides[index].answers = answers
    },
  },
  getters: {
    getSlideById: (state) => (id: string) => {
      return state.slides.find((s) => s.id === id)
    },
    getSlides: (state) => state.slides,
    getCurrentSlide: (state) => state.currentSlide,
    getCurrentSlideAnswers: (state) => state.currentSlide.answers,
  },
})
