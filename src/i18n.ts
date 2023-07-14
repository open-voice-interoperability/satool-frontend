import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationEN from './locale/en/translation.json'
import translationES from './locale/es/translation.json'

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
}

const options = {
  order: ['querystring', 'navigator'],
  lookupQuerystring: 'lng',
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: options,
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    resources,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n

export const getLanguage = () => i18n.language || window.localStorage.i18nextLng
