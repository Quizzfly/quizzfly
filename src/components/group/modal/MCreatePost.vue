<script lang="ts" setup>
import BaseModal from '@/components/base/BaseModal.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import Button from '@/components/ui/button/Button.vue'
import Card from '@/components/ui/card/Card.vue'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import sanitizeHtml from 'sanitize-html'
import { type ICreatePost } from '@/types/group'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'
import { usePostStore } from '@/stores/group/post'
import ImagePicker from '@/components/base/ImagePicker.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'

const quizzflyStore = useQuizzflyStore()
const postStore = usePostStore()
const route = useRoute()
const idQuizzfly = ref('')

const idGroup = route.params.groupId as string

const quizzflyShared = computed(() => {
  return quizzflyStore.getQuizzflyShared
})

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'created'): void
  (e: 'openQuizzflys'): void
}>()

const isLoading = ref(false)

const closeModal = () => {
  handleRemoveQuizzfly()
  emits('close')
}

const content = ref('')
const type = ref('')
const files = ref([])
const onSubmit = async () => {
  isLoading.value = true
  if (quizzflyShared.value.id) {
    type.value = 'SHARE'
    idQuizzfly.value = quizzflyShared.value.id
  } else {
    type.value = 'POST'
    idQuizzfly.value = ''
  }
  const data: ICreatePost = {
    type: type.value,
    content: sanitizeHtml(content.value),
    quizzfly_id: quizzflyShared.value?.id,
    files: files.value,
  }
  console.log(data, 'check data')
  postStore.createPost(idGroup, data)
  isLoading.value = false
  emits('created')
  closeModal()
}

const handleRemoveQuizzfly = () => {
  const data = {}
  quizzflyStore.setQuizzflyShared(data)
}
</script>

<template>
  <BaseModal @click="closeModal()">
    <form
      class="post-container bg-white w-[700px] mx-auto my-11 rounded-3xl shadow-lg p-6 flex flex-col gap-6"
      @submit="onSubmit"
      @click.stop
    >
      <div class="flex items-center justify-between">
        <div
          class="cursor-pointer -ml-2"
          @click="closeModal()"
        >
          <span class="i-material-symbols-light-close-small-outline-rounded w-8 h-8"></span>
        </div>
        <div class="cursor-pointer w-8 h-8 rounded-xl flex items-center justify-center border">
          <span class="i-solar-menu-dots-bold rotate-90"></span>
        </div>
      </div>
      <ScrollArea>
        <div class="flex flex-col gap-8 overflow-y-auto overflow-hidden">
          <div class="flex flex-col h-52">
            <div class="form-data h-52">
              <QuillEditor
                v-model:content="content"
                content-type="html"
                theme="snow"
                toolbar="full"
              />
            </div>
          </div>
          <div class="form-data pt-14 flex flex-auto justify-center h-44">
            <ImagePicker v-model="files[0]" />
          </div>
          <div
            :class="{ 'h-auto rounded-lg px-4 py-3': quizzflyShared?.id }"
            class="hover:bg-slate-100 flex h-11 items-center justify-center cursor-pointer rounded-full border border-primary"
            @click="emits('openQuizzflys')"
          >
            <div
              v-if="quizzflyShared?.id"
              class="w-full"
            >
              <Card>
                <div class="flex w-full h-98 cursor-pointer">
                  <!-- left -->
                  <div>
                    <img
                      v-image
                      class="w-[148px] h-[98px] object-cover rounded-s-md"
                      :src="quizzflyShared.cover_image || ''"
                      alt=""
                    />
                  </div>
                  <div class="flex justify-between items-center w-full">
                    <div class="flex flex-col w-full justify-between p-3 h-full">
                      <div class="flex items-center justify-between">
                        <div class="flex item-center gap-1">
                          <span
                            class="i-material-symbols-light-grid-view-outline-rounded h-6 w-6"
                          ></span>
                          <h2 class="title text-base font-medium">
                            {{ quizzflyShared.title || 'Untitled' }}
                          </h2>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <div class="flex gap-1 items-center">
                          <Avatar class="h-7 w-7">
                            <AvatarImage :src="quizzflyShared.avatar" />
                            <AvatarFallback>{{
                              quizzflyShared.username.charAt(0).toUpperCase()
                            }}</AvatarFallback>
                          </Avatar>
                          <div class="text-sm text-gray-500">@{{ quizzflyShared.username }}</div>
                        </div>
                        <div class="flex gap-1 items-center">
                          <span class="i-material-symbols-light-person h-5 w-5"></span>
                          <p class="text-sm text-gray-500">private</p>
                        </div>
                      </div>
                    </div>
                    <div class="mr-3">
                      <Button
                        variant="secondary"
                        class="h-8"
                        @click.prevent.stop="handleRemoveQuizzfly"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <p
              v-else
              class="text-primary"
            >
              Click to choose the quizzfly you want to share
            </p>
          </div>
        </div>
      </ScrollArea>

      <div class="flex justify-end">
        <Button
          :disabled="isLoading"
          type="submit"
          class="h-10 bg-primary flex gap-1 text-sm px-6"
        >
          <span
            v-if="isLoading"
            class="i-svg-spinners-ring-resize"
          ></span>
          Post
          <span class="i-material-symbols-light-send-rounded -mr-1 w-6 h-7 text-white"></span>
        </Button>
      </div>
    </form>
  </BaseModal>
</template>

<style scoped lang="scss">
.post-container {
  max-height: calc(100vh - 40px);
}

.form-data {
  &:deep() {
    .ql-toolbar.ql-snow {
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }

    .ql-container.ql-snow {
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
    }

    ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    ::-webkit-scrollbar-track {
      background: #f0f0f0;
      border-radius: 6px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 6px;
      border: 2px solid #f0f0f0;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }

    .scrollable-element {
      scrollbar-width: thin;
      scrollbar-color: #888 #f0f0f0;
    }
  }
}
</style>
