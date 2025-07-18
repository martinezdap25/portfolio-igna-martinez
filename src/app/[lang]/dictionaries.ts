import 'server-only';
import { Dictionary } from '@/types/directory';

const dictionaries = {
  en: () => import('./en.json').then(mod => mod.default),
  es: () => import('./es.json').then(mod => mod.default),
};

export const getDictionary = async (locale: 'en' | 'es'): Promise<Dictionary> => {
  return dictionaries[locale]();
};
