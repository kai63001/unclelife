import {NextResponse} from "next/server";
import Stripe from "stripe";
import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export async function GET() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15',
    });
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

    const {data: {stripe_customer}}: any = await supabase.from('profiles').select('stripe_customer').eq('id', session.user.id).single();
    if (!stripe_customer) {
        return NextResponse.json(
            {
                'message': 'no stripe customer'
            }
        )
    }

    const dataSession = await stripe.billingPortal.sessions.create({
        customer: stripe_customer,
        return_url: `https://unclelife.co`,
    });



    return NextResponse.json({
        data: dataSession
    });

}
