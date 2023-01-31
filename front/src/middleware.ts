import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {

    const jwt = request.cookies.get("myTokenName");
    //   if(request.nextUrl.pathname.includes("/dashboard")){
    //     if (!jwt) return NextResponse.redirect(new URL("/", request.url));
    //   }

    if (!jwt) return NextResponse.redirect(new URL("/", request.url));
    // if (!jwt) return NextResponse.redirect(new URL("/api/auth/login", request.url));

    //   this condition avoid to show the login page if the user is logged in 
    if (jwt) {
        // console.log(request.nextUrl.pathname)
        if (request.nextUrl.href.includes("/login")) {
            try {
                await jwtVerify(jwt, new TextEncoder().encode("secret"));
                return NextResponse.redirect(new URL("/dashboard", request.url));
            } catch (error) {
                return NextResponse.next();
            } 
        }
    }

    try {
        const { payload } = await jwtVerify(
            jwt,
            new TextEncoder().encode("secret")
        );
        if (payload.rol) {
            return NextResponse.next();
        }
        console.log({ payload });
        return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};