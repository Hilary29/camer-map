import 'server-only'

export type Locale = 'en' | 'fr'

const dictionaries = {
  en: () => import('../app/[lang]/dictionaries/en.json').then((mod) => mod.default),
  fr: () => import('../app/[lang]/dictionaries/fr.json').then((mod) => mod.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]()
}
