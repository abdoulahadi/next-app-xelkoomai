import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isLoginPage = req.nextUrl.pathname === '/admin/login'

    // Si on est sur une route admin (sauf login) et pas de token, rediriger vers login
    if (isAdminRoute && !isLoginPage && !token) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    // Si on est sur login et qu'on a déjà un token, rediriger vers dashboard
    if (isLoginPage && token) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    // Vérifier le rôle pour les routes admin
    if (isAdminRoute && !isLoginPage && token) {
      const role = token.role as string
      if (role !== 'ADMIN' && role !== 'EDITOR') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
        const isLoginPage = req.nextUrl.pathname === '/admin/login'

        // Autoriser l'accès à la page de login sans token
        if (isLoginPage) {
          return true
        }

        // Pour les autres routes admin, nécessite un token
        if (isAdminRoute) {
          return !!token
        }

        // Autoriser toutes les autres routes
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}
