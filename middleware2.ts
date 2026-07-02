import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// List your public routes here
const isPublicRoute = createRouteMatcher([
  '/sign-in',
  '/sign-up',
  '/api/webhooks/clerk',
  '/sign-in/(.*)',
  '/sign-up/(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  console.log('Request to:', req.nextUrl.pathname)

  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    /**
     * Match all routes EXCEPT:
     * - _next (Next.js internals)
     * - static files (images, fonts, etc.)
     * - favicon
     */
    '/((?!_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|css|js|woff2?|ttf)).*)',
  ],
}
