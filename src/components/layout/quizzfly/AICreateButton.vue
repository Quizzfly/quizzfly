<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import InputValidation from '@/components/base/InputValidation.vue'
import { Checkbox } from '@/components/ui/checkbox'
import { languages } from '@/utils/common'
import BillingAndPlan from '@/components/billing-plan/BillingAndPlan.vue'
import BaseModal from '@/components/base/BaseModal.vue'
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
import { createQuizUseAIApi, getModelList, type Model } from '@/services/ai'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { createMultipleQuizApi } from '@/services/quizzes'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'
import { useI18n } from 'vue-i18n'
// import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const quizzflyStore = useQuizzflyStore()
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    theme: yup.string().required(t('quizzfly.create.ai.theme_required')),
  }),
})

const questionsStore = useQuestionsStore()
interface Option {
  theme: string
  numberOfQuestion: number
  quizTypes: string[]
}

onBeforeMount(async () => {
  const data = await getModelList()
  modelAI.value = data
  model.value = data[0].value
})

const modelAI = ref<Model[]>([])
const language = ref('Vietnamese')
const model = ref()
const option = ref<Option>({
  theme: '',
  numberOfQuestion: 1,
  quizTypes: ['MULTIPLE_CHOICE'],
})
const isShowUpgradeModal = ref(false)

const handleSelectQuizType = (type: string) => {
  if (option.value.quizTypes.includes(type)) {
    option.value.quizTypes = option.value.quizTypes.filter((item: string) => item !== type)
  } else {
    option.value.quizTypes.push(type)
  }
}

const isLoading = ref(false)
// const authStore = useAuthStore()
// const hightestPlanUser = computed(() => authStore.getHighestPlan)
const handleCreateWithAI = handleSubmit(async (value) => {
  popoverState.value = false
  // if (!hightestPlanUser.value || hightestPlanUser.value?.subscription_plan?.price === 0) {
  //   isShowUpgradeModal.value = true
  //   return
  // }
  isLoading.value = true
  try {
    const { data: quizzes } = await createQuizUseAIApi(
      model.value,
      language.value,
      {
        ...option.value,
        theme: value.theme,
      },
      questionsStore.getSlides
        .filter((item) => item.type === 'QUIZ')
        .map((question) => question.content),
    )

    const { data } = await createMultipleQuizApi(quizzflyStore.getQuizzflyInfo.id, quizzes)
    questionsStore.addMultipleQuestions(data)

    // set current question to the last question and scroll to it
    questionsStore.setCurrentQuestion(data[data.length - 1], true)

    showToast({
      title: t('quizzfly.create.ai.create_success_title'),
      description: t('quizzfly.create.ai.create_success_description'),
      variant: 'success',
    })
  } catch (error) {
    console.error(error)
    showToast({
      title: t('quizzfly.create.ai.create_error_title'),
      description: t('quizzfly.create.ai.create_error_description'),
      variant: 'destructive',
    })
  } finally {
    isLoading.value = false
  }
})

const popoverState = ref(false)
</script>
<template>
  <Teleport
    v-if="isShowUpgradeModal"
    to="body"
  >
    <BaseModal>
      <div class="relative">
        <div
          class="w-10 h-10 bg-white rounded-full flex items-center justify-center absolute -top-5 -right-5 cursor-pointer shadow-lg"
          @click="isShowUpgradeModal = false"
        >
          <span class="text-2xl i-material-symbols-light-close"></span>
        </div>
        <BillingAndPlan />
      </div>
    </BaseModal>
  </Teleport>
  <Popover>
    <PopoverTrigger>
      <button
        id="tour-item"
        data-tour="1"
        class="flex items-center gap-2 px-4 h-9 gradient-from-primary text-white font-medium rounded-full shadow-lg hover:bg-indigo-300 transition"
        @click="popoverState = !popoverState"
      >
        {{ $t('quizzfly.create.ai.create_with_ai') }}
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
            {{ $t('quizzfly.create.ai.theme_of_quiz') }}
            <span class="text-red-500">{{ $t('quizzfly.create.ai.required') }}</span>
          </p>
          <InputValidation
            class="w-full"
            name="theme"
            type="text"
            :placeholder="$t('quizzfly.create.ai.theme_placeholder')"
          />
        </div>

        <div class="">
          <p class="mb-2 font-medium">
            {{ $t('quizzfly.create.ai.quiz_type') }}
            <span class="text-red-500">{{ $t('quizzfly.create.ai.required') }}</span>
          </p>
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
                {{ $t('quizzfly.create.ai.choice') }}
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
                {{ $t('quizzfly.create.ai.true_false') }}
              </label>
            </div>
          </div>
        </div>

        <p class="mt-5 mb-1 font-medium">
          {{ $t('quizzfly.create.ai.language') }}
          <span class="text-red-500">{{ $t('quizzfly.create.ai.required') }}</span>
        </p>
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
          <p class="mt-5 mb-1 font-medium">
            {{ $t('quizzfly.create.ai.number_of_quiz') }}
            <span class="text-red-500">{{ $t('quizzfly.create.ai.required') }}</span>
          </p>
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
          {{ $t('quizzfly.create.ai.free_plan_limit') }}
        </p>

        <p class="mt-5 mb-1 font-medium">
          {{ $t('quizzfly.create.ai.model') }}
          <span class="text-red-500">{{ $t('quizzfly.create.ai.required') }}</span>
        </p>
        <Select v-model="model">
          <SelectTrigger>
            <SelectValue :placeholder="$t('quizzfly.create.ai.model_ai_placeholder')" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="(modelItem, index) in modelAI"
                :key="index"
                :value="modelItem.value"
                :disabled="modelItem.premium"
              >
                <div class="flex items-center gap-2">
                  <img
                    class="w-5 h-5 rounded-sm object-cover"
                    :src="modelItem.logo"
                    alt=""
                  />
                  {{ modelItem.name }}
                  <span v-if="modelItem.premium">👑</span>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div class="mt-5 flex justify-end gap-3">
          <Button
            class="flex gap-2 text-xs w-full rounded-lg"
            :disabled="isLoading"
            @click="handleCreateWithAI"
          >
            {{ $t('quizzfly.create.ai.generate') }}
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
