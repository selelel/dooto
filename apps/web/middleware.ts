// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTES_CLIENT } from './constant/http'


export function middleware(req: NextRequest) {
  return AuthMiddleWare(req)
}

export const config = {
  matcher: ['/', '/auth/signin', '/auth/register'],
}

const privateRoute = Object.values(ROUTES_CLIENT.PRIVATE)
const publicRoutes = Object.values(ROUTES_CLIENT.PUBLIC)

const SESSION_COOKIE_NAME = 'connect.sid'

function AuthMiddleWare(req: NextRequest) {
  const url = req.nextUrl.clone()
  const cookies = parseCookies(req.headers.get('cookie'))

  const sessionCookie = cookies[SESSION_COOKIE_NAME]

  const isAuthenticated = !!sessionCookie
  if (privateRoute.includes(url.pathname) && !isAuthenticated) {
    url.pathname = ROUTES_CLIENT.PUBLIC.SIGNIN
    return NextResponse.redirect(url)
  }

  if (publicRoutes.includes(url.pathname) && isAuthenticated) {
    url.pathname = ROUTES_CLIENT.PRIVATE.HOME
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {}
  return Object.fromEntries(
    cookieHeader.split(';').map(cookie => {
      const [name, ...rest] = cookie.trim().split('=')
      const value = rest.join('=')
      return [name, decodeURIComponent(value)]
    })
  )
}