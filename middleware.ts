import { NextResponse } from 'next/server';
import { withAuth } from "next-auth/middleware"

export default withAuth(

    function middleware() {
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized({ req, token }) {
                const { pathname } = req.nextUrl;
                if (pathname.startsWith("/api/auth") ||
                    pathname === '/login' ||
                    pathname === '/register'
                ) return true;

                if (pathname == '/' || pathname.startsWith("/api/video")) return true

                return !!token

            }
        }
    }
)


export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};