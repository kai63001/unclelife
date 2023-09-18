import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'
import {supabase as supabaseBypass} from "@/lib/supabase";
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    const supabase = createRouteHandlerClient({cookies})
    const {searchParams} = new URL(req.url)
    const code = searchParams.get('code')

    if (code) {
        try {
            const coder = await supabase.auth.exchangeCodeForSession(code)
            const token = coder.data.session?.provider_token as string;
            const user = coder.data.user?.id;

            //insert token to database profile
            await supabaseBypass.from('profiles').update({
                provider_token: token
            }).eq('id', user)

            // const {data: profile, error} = await supabaseBypass
            //     .from('decrypted_profiles').select('*')
            // console.log(profile)


            //save code to local storage
            cookies().set('tokenCode', token)
        } catch (e) {
            console.log(e)
            return NextResponse.redirect(new URL('/auth/login', process.env.NEXT_PUBLIC_FRONT_END_URL))
        }
    }

    return NextResponse.redirect(new URL('/home', process.env.NEXT_PUBLIC_FRONT_END_URL))
}
