import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";
import {headers} from "next/headers"
import {supabase as supabaseBypass} from "@/lib/supabase";

export async function POST(req: NextRequest) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15',
    });

    // Check if we have a session
    const signingSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
    const signature = headers().get('stripe-signature') as string;
    const body = await req.text()
    let event:any;

    try {
       event = stripe.webhooks.constructEvent(body, signature, signingSecret);
    } catch (err) {
        console.log(err)
        return NextResponse.json({
            'error': 'webhook'
        })
    }

    switch (event.type) {
        case "customer.subscription.created":
            // console.log('customer.subscription.created')
            await supabaseBypass.from('profiles').update({
                is_subscribed: true,
                interval: event.data.object.items.data[0].plan.interval,
                plan: event.data.object.items.data[0].plan.product,
                trail_end: event.data.object.trial_end * 1000,
                plan_end: event.data.object.current_period_end * 1000
            }).eq('stripe_customer', event.data.object.customer)
            break;
        case "customer.subscription.updated":
            // console.log('customer.subscription.updated')
            await supabaseBypass.from('profiles').update({
                is_subscribed: true,
                interval: event.data.object.items.data[0].plan.interval,
                plan: event.data.object.items.data[0].plan.product,
                plan_end: event.data.object.current_period_end * 1000
            }).eq('stripe_customer', event.data.object.customer)
            break;
        case "customer.subscription.deleted":
            // console.log('customer.subscription.deleted')
            await supabaseBypass.from('profiles').update({
                is_subscribed: false,
                interval: null,
                plan: null,
                plan_end: null,
            }).eq('stripe_customer', event.data.object.customer)
            break;
        case "invoice.payment_failed":
            // console.log('invoice.payment_failed')
            await supabaseBypass.from('profiles').update({
                is_subscribed: false,
                interval: null,
                plan: null,
                plan_end: null,
            }).eq('stripe_customer', event.data.object.customer)
            break;
    }

    return NextResponse.json({
        'plans': 'test'
    });

}
