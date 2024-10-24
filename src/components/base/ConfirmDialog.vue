<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogContent, AlertDialogFooter } from '@/components/ui/alert-dialog'

import { useConfirmDialog } from '@/stores/modal'

const confirmDialog = useConfirmDialog()
const isShow = ref(true)

watch(
  () => confirmDialog.getQuestion,
  (val) => {
    isShow.value = val !== null
  },
  { immediate: true },
)
</script>
<template>
  <AlertDialog v-model:open="isShow">
    <AlertDialogContent class="md:w-[400px]">
      <!-- <AlertDialogHeader>
        <AlertDialogTitle> {{ confirmDialog.getQuestion?.title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ confirmDialog.getQuestion?.question }}
        </AlertDialogDescription>
      </AlertDialogHeader> -->
      <div class="flex flex-col gap-3 items-center">
        <div
          v-if="confirmDialog.getQuestion?.success"
          class="w-[48px] h-[48px] bg-[#dcfce7] text-[#16a34a] flex justify-center items-center rounded-full"
        >
          <span class="i-material-symbols-light-check-rounded text-3xl"></span>
        </div>
        <div
          v-if="confirmDialog.getQuestion?.error"
          class="w-[48px] h-[48px] bg-[#fde7e7] text-[#e3342f] flex justify-center items-center rounded-full"
        >
          <span class="i-material-symbols-light-error-rounded text-3xl"></span>
        </div>
        <h2 class="text-lg font-medium">{{ confirmDialog.getQuestion?.title }}</h2>
        <p class="text-center text-sm text-gray-500">{{ confirmDialog.getQuestion?.question }}</p>
      </div>
      <AlertDialogFooter
        v-if="confirmDialog.data && !confirmDialog.data?.onlyConfirm"
        class="flex mt-3"
      >
        <Button
          class="w-full rounded-md py-5 font-medium"
          variant="secondary"
          @click="confirmDialog.confirm(false)"
          >Cancel</Button
        >
        <Button
          class="w-full rounded-md py-5 font-medium"
          @click="confirmDialog.confirm(true)"
          >Confirm</Button
        >
      </AlertDialogFooter>

      <AlertDialogFooter
        v-if="confirmDialog.data && confirmDialog.data?.onlyConfirm"
        class="mt-3"
      >
        <Button
          class="w-full rounded-md py-5 font-medium"
          @click="confirmDialog.confirm(true)"
          >OK</Button
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
