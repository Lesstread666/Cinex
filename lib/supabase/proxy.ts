import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
                }
            }
        }
    )
    const { data: { user }, error } = await supabase.auth.getUser()

    const protectedRoutes: RegExp[] = [
        /^\/create$/,
        /^\/[^\/]+\edit$/
    ]

    if (!user && protectedRoutes.some(route => route.test(request.nextUrl.pathname)))
        return NextResponse.redirect(new URL('/auth/signup', request.url))

    console.log("G-day from middleware")
    return supabaseResponse
}