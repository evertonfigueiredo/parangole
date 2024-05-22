import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/get-url'
import { getToken } from 'next-auth/jwt'

export default async function middleware(request: NextRequest) {
  const secureCookie = process.env.NODE_ENV === 'production'
  const name = secureCookie
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token'

  const jwt = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET!,
    secureCookie,
    salt: name,
  })

  const pathname = request.nextUrl.pathname

  if (jwt) {
    const nivelAcessoId = jwt.nivelAcessoId as number

    if (!nivelAcessoId) {
      throw new Error('Nível de acesso negado!')
    }

    const userAccessPaths: Record<number, string> = {
      1: '/app/master',
      2: '/app/representante',
      4: '/app/administrador',
      5: '/app/cliente',
      3: '/app/visitante',
    }

    // Redirect to specific path if user tries to access the auth page while logged in
    if (pathname === '/auth') {
      return NextResponse.redirect(
        new URL(getUrl(userAccessPaths[nivelAcessoId])),
      )
    }

    // Check if the user is trying to access a path they are not allowed to
    const allowedPath = userAccessPaths[nivelAcessoId]
    if (!pathname.startsWith(allowedPath)) {
      return NextResponse.redirect(new URL(getUrl(allowedPath)))
    }
  } else {
    // If user is not logged in and tries to access /app, redirect to /auth
    if (pathname.includes('/app')) {
      return NextResponse.redirect(new URL(getUrl('/auth')))
    }
  }

  // Allow the request to proceed if none of the conditions matched
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
