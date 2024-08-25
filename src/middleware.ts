import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/' || path === '/login' || path === '/signup' ||
    path === '/resetpassword'

  const token = request.cookies.get('token')?.value || ''

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }

  if (!isPublicPath && !token && path !== '/verifyemail') {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

}


// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
    '/resetpassword'
  ]
}