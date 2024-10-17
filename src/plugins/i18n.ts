import { $fetch } from 'ofetch'
import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'en',
  messages: {},
})

async function loadLocaleMessages() {
  let locales = {} as any
  try {
    const vi = await $fetch('/locales/vi.json')
    const en = await $fetch('/locales/en.json')
    locales = { vi, en }
  } catch (error) {
    console.error(error)
  }
  return locales
}

export async function setupI18n(app: App) {
  const messages = await loadLocaleMessages()
  i18n.global.setLocaleMessage('vi', messages.vi)
  i18n.global.setLocaleMessage('en', messages.en)
  app.use(i18n)
}
