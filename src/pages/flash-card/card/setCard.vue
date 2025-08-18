<script lang="ts" setup>
import cardItem from '@/components/flash-card/card/cardItem.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import InputValidation from '@/components/base/InputValidation.vue'
import { Button } from '@/components/ui/button'

interface ICard {
  term: string
  description: string
  image: string
}

const description = ref('')
const listCards = ref<ICard[]>([
  { term: '', description: '', image: '' },
  { term: '', description: '', image: '' },
])

const handleAddCard = () => {
  listCards.value.push({
    term: '',
    description: '',
    image: '',
  })
}

const handleRemoveCard = (index: number) => {
  listCards.value.splice(index, 1)
}
</script>

<template>
  <div class="px-5 pt-5 pb-16 flex flex-col gap-10">
    <div class="flex flex-col gap-6">
      <h1 class="text-2xl font-semibold">Create a new flashcard set</h1>
      <div class="flex flex-col gap-1">
        <div class="form-data">
          <label for="tittle">Title</label>
          <InputValidation
            id="tittle"
            placeholder="Enter a title for your flashcard"
            type="text"
            name="tittle"
            class="h-12 mt-1 bg-slate-50 border-slate-200 outline-none"
          />
        </div>
        <div class="grid w-full gap-1.5">
          <Textarea
            v-model="description"
            class="min-h-[150px]"
            placeholder="Add a description..."
          />
        </div>
      </div>
    </div>

    <!-- list card -->
    <div class="flex flex-col gap-6">
      <card-item
        v-for="(card, index) in listCards"
        :key="index"
        :number="index + 1"
        :term="card.term"
        :description="card.description"
        :image="card.image"
        :length-data="listCards.length"
        @update:term="(val: string) => (card.term = val)"
        @update:description="(val: string) => (card.description = val)"
        @update:image="(val: string) => (card.image = val)"
        @remove="handleRemoveCard(index)"
      />
    </div>

    <Button
      class="self-start bg-primary text-white h-10 mx-auto"
      @click="handleAddCard"
    >
      <span
        class="i-material-symbols-light-add-circle-outline-rounded text-lg text-white mr-1 font-bold"
      ></span>
      Add Card
    </Button>
  </div>
</template>
