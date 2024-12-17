// src/middleware.ts
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'

const defaultLocale = 'fr'
const locales = ['en', 'fr'] // Déclarez uniquement les langues disponibles

// Fonction pour détecter la langue de l'utilisateur
function getLocale(request: NextRequest) {
  const acceptedLanguages = request.headers.get('accept-language') ?? undefined
  const headers = { 'accept-language': acceptedLanguages }
  const languages = new Negotiator({ headers }).languages()

  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Vérifiez si l'URL contient déjà une langue
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirigez si aucune langue n'est définie dans le chemin
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))
  }
}

export const config = {
  matcher: [
    // Ignorez les chemins internes (_next, API, etc.)
    '/((?!api|_next|.*\\..*|assets).*)',
  ],
}
