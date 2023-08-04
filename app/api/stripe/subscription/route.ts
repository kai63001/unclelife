import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";
import {supabase as supabaseBypass} from "@/lib/supabase";
import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export async function POST(req: NextRequest) {


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

    const {data: {stripe_customer,trail_end}}: any = await supabase.from('profiles').select('stripe_customer,trail_end').eq('id', session.user.id).single();
    console.log(stripe_customer)
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15',
    });
    let newStripe_customer = stripe_customer;
    if (!newStripe_customer) {
        const customer = await stripe.customers.create({
            email: session.user.email,
        });
        newStripe_customer = customer.id;
        await supabaseBypass.from('profiles').update({
            stripe_customer: customer.id
        }).eq('id', session.user.id).then((res) => {
            console.log(res)
        })
    }

    const body = await req.json();
    const {priceId} = body;
    if (!priceId) {
        return NextResponse.json(
            {
                'message': 'no price id'
            }
        )
    }

    const listItems = [
        {
            price: priceId,
            quantity: 1
        }
    ]

    let subscriptionData = {}
    if (trail_end == null) {
        subscriptionData = {
            trial_period_days: 14,
        }
    }

    const sessionStripe = await stripe.checkout.sessions.create({
        customer: newStripe_customer,
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: listItems,
        success_url: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/cancel`,
        subscription_data: subscriptionData
    });


    return NextResponse.json({
        id: sessionStripe.id
    });

}
