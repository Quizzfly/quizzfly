<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import InputValidation from '@/components/base/InputValidation.vue'
import { Checkbox } from '@/components/ui/checkbox'
import { languages } from '@/utils/common'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useQuestionsStore } from '@/stores/quizzfly/question'
import { showToast } from '@/utils/toast'
import { createQuizUseAIApi } from '@/services/gemini'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { createMultipleQuizApi } from '@/services/quizzes'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'

const quizzflyStore = useQuizzflyStore()
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    theme: yup.string().required('Theme is required'),
  }),
})

const questionsStore = useQuestionsStore()
interface Option {
  theme: string
  numberOfQuestion: number
  quizTypes: string[]
}

const language = ref('Vietnamese')
const option = ref<Option>({
  theme: '',
  numberOfQuestion: 1,
  quizTypes: ['MULTIPLE_CHOICE'],
})

const handleSelectQuizType = (type: string) => {
  if (option.value.quizTypes.includes(type)) {
    option.value.quizTypes = option.value.quizTypes.filter((item: string) => item !== type)
  } else {
    option.value.quizTypes.push(type)
  }
}

const isLoading = ref(false)
const handleCreateWithAI = handleSubmit(async (value) => {
  isLoading.value = true
  try {
    const quizzes = await createQuizUseAIApi(language.value, {
      ...option.value,
      theme: value.theme,
    })

    const { data } = await createMultipleQuizApi(quizzflyStore.getQuizzflyInfo.id, quizzes)
    questionsStore.addMultipleQuestions(data)

    // set current question to the last question and scroll to it
    questionsStore.setCurrentQuestion(data[data.length - 1], true)

    showToast({
      title: '✨Create with AI successfully',
      description: 'Your quiz has been created successfully',
      variant: 'success',
    })
  } catch (error) {
    console.error(error)
    showToast({
      title: 'Error',
      description: 'Failed to create quiz with AI 🥲, please try again',
      variant: 'destructive',
    })
  } finally {
    isLoading.value = false
  }
})
</script>
<template>
  <Popover>
    <PopoverTrigger>
      <button
        id="tour-item"
        data-tour="1"
        class="flex items-center gap-2 px-4 h-9 gradient-from-primary text-white font-medium rounded-full shadow-lg hover:bg-indigo-300 transition"
      >
        ✨ Create with AI
        <span
          v-if="isLoading"
          class="i-svg-spinners-90-ring-with-bg text-xl"
        ></span>
      </button>
    </PopoverTrigger>
    <PopoverContent>
      <!-- prompt -->
      <form
        class="p-5 w-[400px] max-md:w-full"
        @submit.prevent
      >
        <div>
          <p class="mb-1 font-medium">
            Theme of your quiz
            <span class="text-red-500">*</span>
          </p>
          <InputValidation
            class="w-full"
            name="theme"
            type="text"
            placeholder="Ex: History, Science, etc."
          />
        </div>

        <div class="">
          <p class="mb-2 font-medium">Quiz type <span class="text-red-500">*</span></p>
          <div class="flex gap-5 px-2">
            <div class="flex items-center gap-1">
              <Checkbox
                id="choices"
                :checked="option.quizTypes.includes('MULTIPLE_CHOICE')"
                @update:checked="handleSelectQuizType('MULTIPLE_CHOICE')"
              />
              <label
                for="terms"
                class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Choice
              </label>
            </div>
            <div class="flex items-center gap-1">
              <Checkbox
                id="true_false"
                :checked="option.quizTypes.includes('TRUE_FALSE')"
                @update:checked="handleSelectQuizType('TRUE_FALSE')"
              />
              <label
                for="terms"
                class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                True/False
              </label>
            </div>
          </div>
        </div>

        <p class="mt-5 mb-1 font-medium">Language <span class="text-red-500">*</span></p>
        <Select v-model="language">
          <SelectTrigger>
            <SelectValue placeholder="Time limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="(lang, index) in languages"
                :key="index"
                :value="lang.name"
              >
                {{ lang.name }}
                <span v-if="lang.premium">👑</span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <NumberField
          v-model="option.numberOfQuestion"
          :max="5"
        >
          <p class="mt-5 mb-1 font-medium">Number of quiz <span class="text-red-500">*</span></p>
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
        <p
          v-if="option.numberOfQuestion === 5"
          class="mt-1 text-xs text-gray-500"
        >
          Free plan only supports creating 5 quiz at a time
        </p>

        <div class="mt-5 flex justify-end gap-3">
          <Button
            class="flex gap-2 text-xs w-full rounded-lg"
            :disabled="isLoading"
            @click="handleCreateWithAI"
          >
            Generate 🚀
            <span
              v-if="isLoading"
              class="i-svg-spinners-90-ring-with-bg text-xl"
            ></span>
          </Button>
        </div>
      </form>
    </PopoverContent>
  </Popover>
</template>
