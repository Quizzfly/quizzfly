<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
<style lang="scss" scoped>
.modal__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  // background-color: rgb(213 222 225 / 69%);

  .modal__main {
    background-color: #fff;
    border-radius: 20px;
    width: 400px;
    padding: 30px 20px;
    position: relative;

    .ic-close {
      position: absolute;
      top: 25px;
      right: 20px;
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      border-radius: 50%;
      cursor: pointer;

      &:hover {
      }
    }
    &--title {
      display: block;
      padding: 28px;
      padding-top: 10px;
      display: flex;
      justify-content: center;
      width: 100%;
      @include text(24px, 700, #00693b, auto);
    }
    &--question {
      text-align: center;
    }

    .modal__action {
      display: flex;
      margin-top: 30px;
      gap: 20px;
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
