<script setup lang="ts">
import { Input } from '../ui/input'
import { useField } from 'vee-validate'
import ErrorMessage from './ErrorMessage.vue'
const props = defineProps<{
  name: string
  type: string
  placeholder: string
  required?: boolean
  initialValue?: string
}>()

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name) as any as {
  value: Ref<string>
  errorMessage: string
}

onBeforeMount(() => {
  if (props.initialValue) {
    value.value = props.initialValue
  }
})
</script>
<template>
  <Input
    v-bind="{ ...$props, ...$attrs }"
    v-model="value"
    :invalid="errorMessage"
  />
  <ErrorMessage
    :error="errorMessage"
    class="mt-1 text-xs"
  />
</template>
