import { NextResponse } from "next/server";
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request) {
    return await updateSession(request);
}

export async function updateSession(request) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req: request, res });

    // IMPORTANT: Avoid writing any logic between createMiddlewareClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (
        !user &&
        !request.nextUrl.pathname.startsWith('/login') &&
        !request.nextUrl.pathname.startsWith('/auth')
    ) {
        // no user, potentially respond by redirecting the user to the login page
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/login';
        return NextResponse.redirect(redirectUrl);
    }

    // IMPORTANT: You must return the response as is.
    // Modifying it could cause issues with session management.

    return res;
}

// Matcher configuration remains the same
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|login|sign_up).*)"
    ],
};