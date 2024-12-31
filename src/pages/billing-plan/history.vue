<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

const authStore = useAuthStore()

const userPaymentsHistory = computed(() => authStore.getPlans)
</script>
<template>
  <div class="w-full h-full gap-6 flex flex-col overflow-hidden p-5">
    <div>
      <p class="text-xl font-medium">Payment history</p>
      <p>All your history payment here</p>
    </div>
    <div class="h-full w-full flex overflow-hidden border rounded-xl">
      <Table class="w-full h-full overflow-y-auto">
        <TableCaption v-if="userPaymentsHistory.length === 0"> No pay! </TableCaption>
        <TableHeader>
          <TableRow class="bg-slate-200 sticky top-0">
            <TableHead class="text-center"> Code </TableHead>
            <TableHead class="text-center">Amount</TableHead>
            <TableHead>Plan name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead> Created At </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="pay in userPaymentsHistory"
            :key="pay.id"
          >
            <TableCell class="font-medium text-center h-[54px]">
              {{ pay.code }}
            </TableCell>
            <TableCell class="text-center">{{
              pay.amount
                ?.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })
                .replace('VND', 'đ')
            }}</TableCell>
            <TableCell>{{ pay.subscription_plan?.name }}</TableCell>
            <TableCell>
              <div
                class="flex items-center gap-2 font-medium text-yellow-600"
                :class="{ '!text-green-700': pay.user_plan_status === 'SUCCESS' }"
              >
                <div
                  :class="{ '!bg-green-700': pay.user_plan_status === 'SUCCESS' }"
                  class="bg-yellow-600 w-1 h-1 rounded-full"
                ></div>
                <p>
                  {{ pay.user_plan_status }}
                </p>
              </div>
            </TableCell>
            <TableCell>
              {{
                new Date(pay.created_at)
                  .toISOString()
                  .replace('T', ' ')
                  .replace('Z', '')
                  .slice(0, 19)
              }}
            </TableCell>
            <TableCell>
              <RouterLink
                v-if="pay.subscription_plan && pay.user_plan_status === 'WAITING'"
                :to="{
                  name: 'billing-plan-pay',
                  query: { subscription_id: pay.subscription_plan.id, code: pay.code },
                }"
              >
                <Button
                  variant="secondary"
                  class="text-xs"
                  >Pay now</Button
                >
              </RouterLink>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
