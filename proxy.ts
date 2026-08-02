import {NextResponse,type NextRequest} from 'next/server';
export function proxy(request:NextRequest){if(request.nextUrl.pathname.startsWith('/admin')&&request.nextUrl.pathname!=='/admin/login'){const hasSession=request.cookies.get('sb-access-token')||request.cookies.get('supabase-auth-token');if(!hasSession&&process.env.NEXT_PUBLIC_SUPABASE_URL)return NextResponse.redirect(new URL('/admin/login',request.url))}return NextResponse.next()}
export const config={matcher:['/admin/:path*']};
