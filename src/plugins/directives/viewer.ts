import type { App } from 'vue'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
/* document: https://github.com/fengyuanchen/viewerjs
  bind v-viewer directive to an image element for one image preview
  usage: <img v-viewer src="image.jpg" alt="image" />

  bind v-viewer directive to an div container for multiple images preview
  usage: <div v-viewer>
          <img src="image1.jpg" alt="image1" />
          <img src="image2.jpg" alt="image2" />
        </div>
*/

const viewerStateful = () => {
  const viewerWeakmap = new WeakMap()
  return {
    mounted(el: HTMLImageElement): void {
      const viewer = new Viewer(el, {
        inline: false,
        toolbar: false,
        title: false,
      })
      viewerWeakmap.set(el, viewer)
    },
    beforeUnmount(el: HTMLImageElement): void {
      const viewer = viewerWeakmap.get(el)
      if (viewer) {
        viewer.destroy()
      }
    },
  }
}

export default {
  install: (app: App): void => {
    app.directive('viewer', viewerStateful())
  },
}
