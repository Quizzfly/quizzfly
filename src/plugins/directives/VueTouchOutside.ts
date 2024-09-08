import type { App, DirectiveBinding } from 'vue'
const TouchOutSide = {
  mounted(el: any, binding: DirectiveBinding): void {
    el.clickOutsideEvent = function (event: Event): void {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    // prevent first click
    setTimeout(() => {
      document.addEventListener('click', el.clickOutsideEvent)
    }, 0)
  },
  unmounted(el: any): void {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}
export default {
  install: (app: App): void => {
    app.directive('touch-outside', TouchOutSide)
  },
}
