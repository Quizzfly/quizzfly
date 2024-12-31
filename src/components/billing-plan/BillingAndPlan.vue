<script setup lang="ts">
import { getSubscriptionsApi } from '@/services/pricing'
import { useAuthStore } from '@/stores/auth'
import { useConfirmDialog } from '@/stores/modal'
import type { Subscription } from '@/types/pricing'

const pricings = ref<Subscription[]>([])
const confirmDialog = useConfirmDialog()
const router = useRouter()
const authStore = useAuthStore()
const activePlans = computed(() => authStore.getActivePlans)

const fetchSubscriptions = async () => {
  try {
    const { data } = await getSubscriptionsApi()
    console.log(data)
    pricings.value = data
  } catch (error) {
    console.error(error)
  }
}

onBeforeMount(() => {
  fetchSubscriptions()
})

const handleSelectPlan = async (price: (typeof plansComputed.value)[0]) => {
  if (price.isCurrent) return
  const { isConfirmed } = await confirmDialog.open({
    title: 'Upgrade plan',
    question: 'Are you sure you want to upgrade your plan?',
    warning: true,
  })

  if (isConfirmed) {
    router.push({ name: 'billing-plan-pay', query: { subscription_id: price.id } })
  }
}

const plansComputed = computed(() => {
  return pricings.value.map((p) => ({
    ...p,
    isCurrent: Boolean(activePlans.value.find((plan) => p.id === plan.subscription_plan.id)),
  }))
})
</script>
<template>
  <div class="flex flex-col items-center py-10 px-10 rounded-3xl bg-white border shadow-lg">
    <h1 class="text-[30px] font-medium">Simple, transparent pricing</h1>
    <h2 class="text-sm text-gray-500 text-center mt-3">
      No contracts, no hidden fees. Choose a plan that fits your needs.
    </h2>
    <div class="flex-wrap flex max-md:flex-col gap-5 mt-10 min-h-[300px]">
      <div
        v-for="(pricing, index) in plansComputed"
        :key="pricing.name"
        :class="{ 'shadow-lg': index === 1 }"
        class="min-w-[300px] flex h-[400px] border rounded-3xl flex-col items-center"
      >
        <div class="w-full rounded-2xl p-5 flex flex-col justify-between h-full">
          <div>
            <div class="flex items-start justify-between">
              <p class="text-base font-medium">{{ pricing.name }}</p>
              <!-- popular chip -->
              <div
                v-if="index === 1"
                class="bg-[#eef9f4] text-[#0caa7c] text-xs px-2 py-1 rounded-full"
              >
                Popular
              </div>
            </div>
            <p class="text-[40px] font-medium">
              {{
                pricing.price
                  .toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })
                  .replace('VND', 'đ')
              }}/
              <span class="text-base font-normal">mo</span>
            </p>
            <div class="border-t pt-4 mt-4 flex flex-col gap-3">
              <div
                v-for="feature in pricing.description.split(',')"
                :key="feature"
                class="text-center text-sm font-normal flex items-center pl-5"
              >
                {{ feature }}
              </div>
            </div>
          </div>
          <button
            :class="{
              'bg-[#17b8a7] text-white': index === 1,
              'opacity-75 bg-gray-400': pricing.isCurrent,
            }"
            class="border w-full max-w-[400px] shadow-sm py-3 mt-4 rounded-full"
            :disabled="pricing.isCurrent"
            @click="handleSelectPlan(pricing)"
          >
            {{ pricing.isCurrent ? 'Your current plan' : 'Upgrade' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
