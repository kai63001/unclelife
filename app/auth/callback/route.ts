import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
    //save code to local storage
    cookies().set('code', code, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_FRONT_END_URL))
}