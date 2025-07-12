import { NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'es']
const defaultLocale = 'en'

function getLocale(request: Request) {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => {
        negotiatorHeaders[key] = value
    })
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
    return match(languages, locales, defaultLocale)
}

export function middleware(request: Request) {
    const pathname = new URL(request.url).pathname

    // Si ya tiene idioma en la URL, dejamos pasar
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )
    if (pathnameHasLocale) {
        return NextResponse.next()
    }

    // Si no tiene idioma, redirigimos según idioma navegador
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
}

export const config = {
    matcher: ['/((?!_next|favicon.ico).*)'],
}
