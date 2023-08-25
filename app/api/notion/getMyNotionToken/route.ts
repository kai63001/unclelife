import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {supabase as supabaseBypass} from "@/lib/supabase";

export async function GET(req: NextRequest) {
    try {
        const supabase = createRouteHandlerClient({cookies});

        // Check if we have a session
        const {
            data: {session},
        } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json(
                {
                    'message': 'no session'
                }
            )
        }

        const {data: profile, error} = await supabaseBypass
            .from('decrypted_profiles').select('decrypted_provider_token').eq('id', session.user.id).single();

        return NextResponse.json(
            {
                'message': 'success',
                'profile': profile
            }
        );
    } catch (error: any) {
        return NextResponse.json({error: error.message});
    }
}
