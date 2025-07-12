import { getDictionary } from './dictionaries'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: 'en' | 'es' }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <main style={{ padding: 20 }}>
      <h1>{dict.greeting}</h1>
      <button>{dict.products.cart}</button>
    </main>
  )
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}
