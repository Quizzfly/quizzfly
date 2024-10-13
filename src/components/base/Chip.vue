<script setup lang="ts">
interface Props {
  name: string
  color: string
  isShowDelete?: boolean
  chipId?: string
}
const prop = withDefaults(defineProps<Props>(), {
  color: '#FF0000',
  chipId: '',
})

defineEmits<{
  (e: 'delete', id: string): void
}>()

function hexToRgbA(hex: string, opacity = 1) {
  let c: any
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${opacity})`
  }
  return ''
}

const colorComputed = computed(() => {
  return {
    backgroundColor: hexToRgbA(prop.color, 0.1),
    color: prop.color,
  }
})
</script>
<template>
  <div
    class="min-w-[20px] inline-flex items-center gap-1 px-3 py-[1px] rounded-md"
    :style="{ backgroundColor: colorComputed.backgroundColor, color: colorComputed.color }"
  >
    <p>
      {{ name }}
    </p>
    <div
      v-if="isShowDelete"
      class="cursor-pointer"
      @click="$emit('delete', chipId)"
    >
      <Icon icon="hugeicons:cancel-01" />
    </div>
  </div>
</template>
