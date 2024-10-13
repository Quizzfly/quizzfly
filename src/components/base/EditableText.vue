<script setup lang="ts">
import { Input } from '../ui/input'
const props = defineProps<{
  value: string // initial value
  clickCallback?: () => void
}>()

const emits = defineEmits<{
  (e: 'save', payload: string, isModified?: boolean): void
}>()

const isEditing = ref(false)

const startEditing = () => {
  isEditing.value = true
  if (props.clickCallback && typeof props.clickCallback === 'function') {
    props.clickCallback()
  }
  nextTick(() => {
    inputRef.value?.$el.focus()
  })
}

const finishEditing = () => {
  if (!data.value.trim()) {
    data.value = 'Untitled'
  }
  isEditing.value = false
  emits('save', data.value, data.value !== props.value)
}

const data = ref(props.value)

watch(
  () => props.value,
  (value) => {
    data.value = value
  },
)

const inputRef = ref<InstanceType<typeof Input>>()
</script>

<template>
  <div>
    <slot
      v-if="isEditing"
      name="input"
      :finish-editing="finishEditing"
    >
      <Input
        ref="inputRef"
        v-model="data"
        :style="{ width: `${data.length + 3}ch !important`, maxWidth: '300px', minWidth: '50px' }"
        class="inputText"
        @blur="finishEditing"
      />
    </slot>
    <div
      v-else
      @click="startEditing"
    >
      <slot
        :data="data"
        :is-editing="isEditing"
      >
        <span class="border-transparent px-1 hover:border-slate-500">
          {{ data }}
        </span>
      </slot>
    </div>
  </div>
</template>
