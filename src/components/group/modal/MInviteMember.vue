<script lang="ts" setup>
import BaseModal from '@/components/base/BaseModal.vue'
import { Button } from '@/components/ui/button'
import { inviteGroupApi } from '@/services/group'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'

const route = useRoute()

const emits = defineEmits<{
  (e: 'close'): void
}>()
const groupId = route.params.groupId as string

const isLoading = ref(false)
const listEmails = ref([])

const onSubmit = async () => {
  isLoading.value = false
  try {
    await inviteGroupApi(groupId, listEmails.value)
    showToast({
      title: 'Success',
      description: 'Invite members success',
      variant: 'default',
    })
  } catch (error) {
    console.error(error)
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
  isLoading.value = true
  emits('close')
}
</script>

<template>
  <BaseModal @click="emits('close')">
    <div
      class="bg-white w-[600px] mx-auto rounded-3xl shadow-lg p-12 relative"
      @click.stop
    >
      <div class="text-4xl w-full text-center font-semibold">Invite Member</div>
      <form
        class="mt-6 flex flex-col gap-10"
        @submit.prevent="onSubmit"
      >
        <div class="flex flex-col">
          <div class="form-data">
            <label for="name">Emails</label>
            <TagsInput
              v-model="listEmails"
              :add-on-blur="true"
              class="h-full min-h-11"
            >
              <TagsInputItem
                v-for="item in listEmails"
                :key="item"
                :value="item"
              >
                <TagsInputItemText />
                <TagsInputItemDelete />
              </TagsInputItem>

              <TagsInputInput placeholder="Emails..." />
            </TagsInput>
          </div>
        </div>
        <div class="flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            class="w-full h-11 flex gap-2 items-center"
            @click="emits('close')"
          >
            Cancel
          </Button>
          <Button
            :disabled="isLoading"
            class="w-full h-11 bg-primary flex gap-2 items-center"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize"
            ></span>
            Invite
          </Button>
        </div>
      </form>
    </div>
  </BaseModal>
</template>
