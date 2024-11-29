import type { App, DirectiveBinding } from 'vue'

const handleImage = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding): void {
    const srcDefault =
      binding.arg === 'avatar' ? '/assets/images/avatar.jpg' : '/assets/images/default.png'

    let img = new Image() as HTMLImageElement | null
    if (!img) return
    img.style.objectFit = 'cover'
    if (el.tagName === 'DIV') {
      img.src = el.style.backgroundImage?.replace(/url\((['"])?(.*?)\1\)/gi, '$2') ?? srcDefault
    } else {
      img.src = el.src ?? srcDefault
    }

    img.onload = () => {
      if (!img) return
      console.log('loaded', el.src)
      if (el.tagName === 'DIV') {
        el.style.backgroundImage = `url(${img.src})`
      } else {
        el.src = img.src
      }
      img = null
    }

    if (el.tagName === 'DIV') {
      el.style.backgroundImage = `url(${srcDefault})`
    } else {
      el.src = srcDefault
    }
  },
}

export default {
  install: (app: App): void => {
    app.directive('image', handleImage)
  },
}
