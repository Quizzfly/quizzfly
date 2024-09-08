import type { App, DirectiveBinding } from 'vue'

const handleImage = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding): void {
    // Thêm sự kiện onload vào hình ảnh
    const srcDefault =
      binding.arg === 'avatar' ? '/assets/images/avatar.jpg' : '/assets/images/default.webp'

    let img = new Image() as HTMLImageElement | null
    if (!img) return
    img.style.objectFit = 'cover'
    img.src = binding.value ?? srcDefault
    img.onload = () => {
      // Khi ảnh được tải lên thành công, gán đường dẫn vào src
      // el.src = binding.value
      // console.log('loaded')
      el.src = img!.src
      img = null
    }

    // Thiết lập src của hình ảnh là đường dẫn của ảnh mặc định
    el.src = srcDefault
  },
}

export default {
  install: (app: App): void => {
    app.directive('image', handleImage)
  },
}
