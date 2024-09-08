<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { useConfirmDialog } from '@/stores/modal'

const confirmDialog = useConfirmDialog()
const isShow = ref(true)

watchEffect(() => {
  isShow.value = confirmDialog.getQuestion !== null
})
</script>
<template>
  <AlertDialog v-model:open="isShow">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle> {{ confirmDialog.getQuestion?.title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ confirmDialog.getQuestion?.question }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Button
          variant="secondary"
          @click="confirmDialog.confirm(false)"
          >Cancel</Button
        >
        <Button @click="confirmDialog.confirm(true)">Confirm</Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
