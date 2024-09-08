import { createI18n } from 'vue-i18n'
import vi from '@/locales/vi.json'
import en from '@/locales/en.json'
export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'vi',
  messages: { vi, en },
})
