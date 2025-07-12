import 'server-only'

const dictionaries = {
  en: () => import('./en.json').then((mod) => mod.default),
  es: () => import('./es.json').then((mod) => mod.default),
}

export const getDictionary = async (locale: 'en' | 'es') => {
  return dictionaries[locale]()
}
