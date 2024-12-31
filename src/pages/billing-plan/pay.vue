<script setup lang="ts">
import { getSubscriptionDetailApi, paySubscriptionApi } from '@/services/pricing'
import type { PaySubscription, SubscriptionDetail } from '@/types/pricing'
import { showToast } from '@/utils/toast'

const url = computed(() => {
  return `https://img.vietqr.io/image/TIMO-9021307147503-compact2.jpg?amount=${subscription.value?.price}&addInfo=${paymentDetail.value?.code}`
})
const subscription = ref<SubscriptionDetail>()
const paymentDetail = ref<PaySubscription>()
const router = useRouter()
const route = useRoute()
const subscriptionID = route.query.subscription_id as string

const codeQuery = computed(() => route.query.code)

const fetchPaymentDetail = async () => {
  try {
    const { data } = await paySubscriptionApi(subscriptionID)
    if (codeQuery.value && typeof codeQuery.value === 'string') {
      paymentDetail.value = {
        code: codeQuery.value,
      } as any
      return
    }

    if (data.user_plan_status === 'SUCCESS') {
      showToast({
        title: 'Your payment has been success!',
        description: 'You will be redirected to homepage in seconds',
        variant: 'success',
      })
      setTimeout(() => {
        router.push({ name: 'billing-plan' })
      }, 1000)
      return
    }
    paymentDetail.value = data
    router.replace({ query: { code: paymentDetail.value.code, subscription_id: subscriptionID } })
  } catch (error) {
    console.error(error)
    showToast({
      title: 'Error!',
      description: 'Failed to fetch payment detail.',
      variant: 'destructive',
    })
  }
}

const fetchSubscription = async () => {
  try {
    const { data } = await getSubscriptionDetailApi(subscriptionID)
    subscription.value = data
  } catch (error) {
    showToast({
      title: 'Error!',
      description: 'Failed to fetch subscription.',
      variant: 'destructive',
    })
  }
}

onBeforeMount(() => {
  fetchSubscription()
  fetchPaymentDetail()
})

const handleCopy = (type: 'amount' | 'desc' | 'acc') => {
  const text =
    type === 'amount'
      ? paymentDetail.value?.amount?.toString()
      : type === 'desc'
        ? paymentDetail.value?.code
        : '9021307147503'
  try {
    navigator.clipboard.writeText(text as string)

    showToast({
      title: 'Copied!',
      description: `${type} has been copied to clipboard.`,
      variant: 'success',
    })
  } catch (error) {
    showToast({
      title: 'Error!',
      description: 'Failed to copy to clipboard.',
      variant: 'destructive',
    })
  }
}
</script>
<template>
  <div
    class="max-md:items-start w-full h-full flex justify-center items-center bg-[#f4f6fa] overflow-y-auto"
  >
    <div
      v-if="subscription"
      class="w-full p-5 max-w-[600px] border rounded-3xl bg-white shadow-sm"
    >
      <!-- header -->
      <div class="flex justify-between border-b pb-5">
        <div>
          <p class="text-[30px] font-medium">Payment</p>
          <p>
            You have selected the <strong>{{ subscription.name }}</strong> plan.
          </p>
        </div>
        <div class="flex">
          <img
            v-image
            class="h-[60px]"
            src="/assets/images/bank-logo.jpg"
            alt=""
          />
          <img
            v-image
            class="h-[70px]"
            src="/assets/images/bank-logo-2.jpg"
            alt=""
          />
        </div>
      </div>

      <!-- bank -->
      <div class="mt-5 flex flex-col items-center">
        <p class="mb-4">Notice: Your payment will be processed in 15 seconds.</p>
        <div class="flex items-center gap-2 mb-4">
          <span class="i-svg-spinners-bars-rotate-fade"></span>
          <span> Checking your payment status... </span>
        </div>
        <img
          :src="url"
          alt="VietQR Payment Image"
          class="w-full max-h-[300px] object-contain"
        />
        <table class="w-full">
          <tbody>
            <tr class="border-b">
              <td class="py-2 text-right pr-3">Amount:</td>
              <td class="py-2 flex items-center gap-2">
                {{
                  subscription.price
                    .toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    })
                    .replace('VND', 'đ')
                }}
                <span
                  class="i-material-symbols-light-content-copy-outline text-2xl cursor-pointer"
                  @click="handleCopy('amount')"
                ></span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="py-2 text-right pr-3">Description:</td>
              <td class="max-w-[250px] py-2 flex items-center gap-2">
                {{ paymentDetail?.code }}
                <span
                  class="i-material-symbols-light-content-copy-outline text-2xl cursor-pointer"
                  @click="handleCopy('desc')"
                ></span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="py-2 text-right pr-3">Bank Account:</td>
              <td class="py-2 flex items-center gap-2">
                <p class="text-green-500 font-medium">Viet Capital Bank</p>
                <img
                  v-image
                  class="h-[50px]"
                  src="/assets/images/bank-logo.jpg"
                  alt=""
                />
                <img
                  v-image
                  class="h-[70px]"
                  src="/assets/images/bank-logo-2.jpg"
                  alt=""
                />
              </td>
            </tr>

            <tr class="border-b">
              <td class="py-2 text-right pr-3">Account Number:</td>
              <td class="py-2 flex items-center gap-2 text-green-500">
                9021307147503
                <span
                  class="i-material-symbols-light-content-copy-outline text-2xl cursor-pointer"
                  @click="handleCopy('acc')"
                ></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
