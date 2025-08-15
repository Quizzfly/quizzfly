import { $fetch } from 'ofetch'
import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  messages: {},
})

async function loadLocaleMessages() {
  let locales = {} as any
  try {
    const VN = await $fetch('/locales/VN.json')
    const US = await $fetch('/locales/US.json')
    locales = { VN, US }
  } catch (error) {
    console.error(error)
  }
  return locales
}

export async function setupI18n(app: App) {
  const messages = await loadLocaleMessages()
  const { countryCode } = await $fetch('https://ip.quizzfly.site')
  i18n.global.setLocaleMessage('VN', messages.VN)
  i18n.global.setLocaleMessage('US', messages.US)
  i18n.global.locale.value = countryCode || 'US'
  app.use(i18n)
}
