<template>
  <component :is="iconRaw" />
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
})

const iconRaw = defineAsyncComponent(() => import(`@/assets/icons/svg/${props.icon}.svg`))
</script>
