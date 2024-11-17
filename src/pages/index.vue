<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
const authStore = useAuthStore()
const quizzflyStore = useQuizzflyStore()
const quizzflys = computed(() => quizzflyStore.getQuizzflys)

const handleClickCreateQuiz = async () => {
  await quizzflyStore.initQuizzflyDraft()
}

const handleCreateWithAI = async () => {
  await quizzflyStore.initQuizzflyDraft()
}

const allowCreateWithAI = ref(false)

onBeforeMount(() => {
  quizzflyStore.fetchQuizzflys()
})
</script>
<template>
  <div class="p-8">
    <!-- header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-medium text-black">
          Hello, <span class="text-black/90">{{ authStore.getUser?.user_info.name }} 👋</span>
        </h1>
        <p class="mt-2 text-base text-gradient">How can I help you today?</p>
      </div>
      <div class="flex items-center gap-5">
        <Popover>
          <PopoverTrigger>
            <button
              class="px-4 py-2 gradient-from-primary text-white font-medium rounded-full shadow-lg hover:bg-indigo-300 transition"
            >
              ✨ Create with AI
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <!-- prompt -->
            <div class="p-5 w-[400px]">
              <p class="font-medium">Create with AI ✨</p>

              <textarea
                class="w-full h-24 mt-3 p-3 border rounded-lg"
                placeholder="Type your prompt here"
              ></textarea>
              <div class="mt-5 flex justify-end gap-3">
                <Button
                  class="text-xs w-full rounded-lg"
                  :disabled="!allowCreateWithAI"
                  @click="handleCreateWithAI"
                >
                  Upgrade your plan to use AI 🚀
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <div
          class="w-10 h-10 hover:bg-slate-200 flex justify-center items-center rounded-full cursor-pointer"
        >
          <span class="i-solar-magnifer-linear text-lg"></span>
        </div>
        <div
          class="w-10 h-10 hover:bg-slate-200 flex justify-center items-center rounded-full cursor-pointer"
        >
          <span class="i-solar-bell-line-duotone text-lg"></span>
        </div>
      </div>
    </div>

    <!-- body -->
    <div class="flex max-md:flex-col mt-10 gap-5">
      <div class="flex-[2] p-6 border bg-white rounded-xl shadow-sm">
        <p>Projects</p>

        <!-- grid 4 item -->
        <div class="grid grid-cols-2 gap-6 mt-5">
          <div
            class="max-md:flex-col max-md:items-center hover:bg-slate-50 cursor-pointer p-3 rounded-2xl flex items-center gap-4"
            @click="handleClickCreateQuiz"
          >
            <div
              class="w-10 h-10 rounded-lg border-2 flex justify-center items-center border-dashed border-primary"
            >
              <span class="text-primary text-xl i-material-symbols-light-add-2-rounded"></span>
            </div>
            <p>Create new quizzfly</p>
          </div>

          <div
            class="max-md:flex-col max-md:items-center hover:bg-slate-50 cursor-pointer p-3 rounded-2xl flex items-center gap-4"
          >
            <div class="bg-[#f7e4ff] w-10 h-10 rounded-lg flex justify-center items-center">
              <span class="text-[#9521c8] text-xl i-material-symbols-light-groups-2"></span>
            </div>
            <div>
              <p>Your groups</p>
              <p class="text-xs text-gray-500">Create a new group</p>
            </div>
          </div>

          <div
            class="max-md:flex-col max-md:items-center hover:bg-slate-50 cursor-pointer p-3 rounded-2xl flex items-center gap-4"
          >
            <div class="bg-[#ebe6fd] w-10 h-10 rounded-lg flex justify-center items-center">
              <span class="text-[#232ac9] text-xl i-material-symbols-light-payments-sharp"></span>
            </div>
            <div>
              <p>Upgrade plans</p>
              <p class="text-xs text-gray-500">Upgrade your plan for more features</p>
            </div>
          </div>

          <div
            class="max-md:flex-col max-md:items-center hover:bg-slate-50 cursor-pointer p-3 rounded-2xl flex items-center gap-4"
          >
            <div class="bg-[#e5effb] w-10 h-10 rounded-lg flex justify-center items-center">
              <span class="text-[#00b9c4] text-xl i-material-symbols-light-attach-money"> </span>
            </div>
            <div>
              <p>Payment history</p>
              <p class="text-xs text-gray-500">View your payment history</p>
            </div>
          </div>
        </div>
      </div>

      <!-- quizzfly -->
      <div class="flex-1 p-6 border bg-white rounded-xl shadow-sm"></div>
    </div>

    <!-- recent -->
    <div class="mt-10">
      <p class="text-lg font-medium mb-4">Recent activities</p>
      <div class="flex flex-wrap gap-5">
        <RouterLink
          v-for="quizzfly in quizzflys"
          :key="quizzfly.id"
          :to="{ name: 'quizzfly-create', params: { quizzflyId: quizzfly.id } }"
          class="block w-[250px]"
        >
          <div
            class="border rounded-lg shadow-sm bg-white cursor-pointer hover:shadow-lg transition-all duration-500"
          >
            <img
              class="w-full h-[100px] object-cover rounded-t-lg"
              :src="quizzfly.cover_image || ''"
              alt=""
            />
            <div class="p-5">
              <p class="font-medium">{{ quizzfly.title || 'Untitled' }}</p>
              <p class="text-xs text-gray-600">
                {{ new Date(quizzfly.created_at).toLocaleString() }}
              </p>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<style scoped>
.text-gradient {
  background: linear-gradient(90deg, #37d2c0, #7286ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-from-primary {
  background: linear-gradient(90deg, #37d2c0, #7286ff);
}
</style>
