<script setup lang="ts">
import { useModalConfirm } from '@/stores/modal'
const modalConfirm = useModalConfirm()

const close = () => {
  modalConfirm.clearQuestion()
}

const confirm = () => {
  if (typeof modalConfirm.actionConfirm === 'function') {
    modalConfirm.actionConfirm(modalConfirm.data)
  }
  close()
}

const cancel = () => {
  if (typeof modalConfirm.actionCancel === 'function') {
    modalConfirm.actionCancel(modalConfirm.data)
  }
  close()
}
</script>
<template>
  <div
    v-if="modalConfirm.isShow"
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :duration="200"
    class="modal__wrapper bg-mark-bg"
    @click="close"
  >
    <div
      v-motion
      :initial="{ opacity: 0, scale: 0.5 }"
      :enter="{ opacity: 1, scale: 1 }"
      :duration="200"
      class="modal__main"
      @click.stop
    >
      <p class="modal__main--title">{{ modalConfirm.title }}</p>
      <div
        class="ic-close"
        @click="cancel"
      >
        <Icon icon="carbon:close" />
      </div>
      <p class="modal__main--question text-lg">{{ modalConfirm.question }}</p>
      <div
        v-if="!modalConfirm.onlyConfirm"
        class="modal__action"
      >
        <Button
          style-type="light"
          width="60%"
          title="Cancel"
          @click="cancel"
        />
        <Button
          style-type="solid"
          width="60%"
          title="Ok"
          @click="confirm"
        />
      </div>
      <div
        v-else
        class="mt-5"
      >
        <Button
          style-type="solid"
          width="100%"
          title="Ok"
          @click="confirm"
        />
      </div>
    </div>
  </div>
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
