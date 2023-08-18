import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";
import {supabase} from "@/lib/supabase";

export async function POST(req: NextRequest) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15',
    });

    const body = await req.json();
    const {email, id} = body;

    const customer = await stripe.customers.create({
        email: email,
    });

    await supabase.from('profiles').update({
        stripe_customer: customer.id
    }).eq('id', id).then((res) => {
        console.log(res)
    })

    return NextResponse.json({
        'message': 'success'
    });

}
