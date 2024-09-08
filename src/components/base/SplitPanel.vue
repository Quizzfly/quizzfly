<template>
  <div
    ref="el"
    class="split-pane"
    :class="{ 'is-dragging': dragging }"
    @mousemove="dragMove"
    @mouseup="dragEnd"
    @mouseleave="dragEnd"
  >
    <div
      class="split-pane-item"
      :style="{ width: splitLeft }"
    >
      <slot name="left" />
    </div>
    <div
      class="split-pane-gutter"
      @mousedown="dragStart"
    ></div>
    <div
      class="split-pane-item"
      :style="{ width: splitRight }"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
const gutter = ref(11)
const split = ref(50)
const dragging = ref(false)
const startX = ref(0)
const startSplit = ref(0)
const el = ref()

const splitLeft = computed(() => {
  return `calc(${split.value}% - ${gutter.value}px)`
})
const splitRight = computed(() => {
  return `calc(${100 - split.value}% - ${gutter.value}px)`
})
function dragStart(e) {
  dragging.value = true
  startX.value = e.pageX
  startSplit.value = split.value
}
function dragMove(e) {
  if (dragging.value) {
    const dx = e.pageX - startX.value
    const totalWidth = el.value.offsetWidth
    split.value = startSplit.value + ~~((dx / totalWidth) * 100)
  }
}
function dragEnd() {
  dragging.value = false
}
</script>

<style scoped>
.split-pane {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.split-pane-item,
.split-pane-gutter {
  height: 100%;
}

.split-pane-gutter {
  background: #000;
  opacity: 0.2;
  z-index: 1;
  box-sizing: border-box;
  background-clip: padding-box;
  width: 11px;
  margin: 0 -5px;
  border-left: 5px solid rgba(255, 255, 255, 0);
  border-right: 5px solid rgba(255, 255, 255, 0);
  cursor: col-resize;
}

.split-pane-gutter:hover,
.split-pane-gutter:focus {
  border-left: 5px solid rgba(0, 0, 0, 0.5);
  border-right: 5px solid rgba(0, 0, 0, 0.5);
  transition: all 2s ease;
}

.is-dragging {
  cursor: col-resize;
}
</style>
