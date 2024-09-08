<script setup lang="ts">
interface Prop {
  placeholder?: string
  invalid?: boolean | string
  type?: string
}

withDefaults(defineProps<Prop>(), {
  placeholder: 'Enter input...',
  invalid: false,
  type: 'text',
})

const data = defineModel<string>({ required: true, default: '' })
defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
<template>
  <input
    v-model="data"
    :type="type"
    :placeholder="placeholder"
    :class="{ '!border-rose-900': invalid }"
    class="w-full h-10 border-border-primary border py-[10px] px-[14px] rounded-[8px] focus:border-primary text-sm"
  />
</template>
