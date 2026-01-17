import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { ENDPOINT, ROUTES_CLIENT } from './constant/http'
import { logger } from './lib/logger'

export async function middleware(req: NextRequest) {
  const healthCheck = await ServerHealthMiddleware(req)
  if (healthCheck) return healthCheck

  const authCheck = await AuthMiddleware(req)
  if (authCheck) return authCheck

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/auth/signin', '/auth/register'],
}


const SESSION_COOKIE_NAME = 'connect.sid'

const privateRoutes = Object.values(ROUTES_CLIENT.PRIVATE)
const publicRoutes = Object.values(ROUTES_CLIENT.PUBLIC)

export async function AuthMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const cookies = parseCookies(req.headers.get('cookie'))

  const isAuthenticated = !!cookies[SESSION_COOKIE_NAME]

  if (privateRoutes.includes(url.pathname) && !isAuthenticated) {
    url.pathname = ROUTES_CLIENT.PUBLIC.SIGNIN
    return NextResponse.redirect(url)
  }

  if (publicRoutes.includes(url.pathname) && isAuthenticated) {
    url.pathname = ROUTES_CLIENT.PRIVATE.HOME
    return NextResponse.redirect(url)
  }

  return null
}

function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {}
  return Object.fromEntries(
    cookieHeader.split(';').map(cookie => {
      const [name, ...rest] = cookie.trim().split('=')
      return [name, decodeURIComponent(rest.join('='))]
    })
  )
}

export async function ServerHealthMiddleware(req: NextRequest) {
  const redirect = '/sleeping'
  const url = req.nextUrl.clone()

  if (url.pathname === redirect) {
    return null
  }

  const isDown = await isServerDown()
  if (isDown) {
    url.pathname = redirect
    return NextResponse.redirect(url)
  }

  return null
}

async function isServerDown(): Promise<boolean> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 2000)

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/server`, {
      cache: 'no-store',
      signal: controller.signal,
    })

    clearTimeout(timeout)
    return !res.ok
  } catch {
    return true
  }
}
