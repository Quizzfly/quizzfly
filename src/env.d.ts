/// <reference types="vite/client" />
declare module 'vue-awesome-paginate'
declare module 'vue-cal'
import sanitizeHTML from 'sanitize-html'

declare module 'vue' {
  interface ComponentCustomProperties {
    $sanitize: typeof sanitizeHTML
  }
}
