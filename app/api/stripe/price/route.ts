import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";

export async function GET() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15',
    });

    const {data:prices} = await stripe.prices.list();

    const plans = await Promise.all(
        prices.map(async (price) => {
            const product = await stripe.products.retrieve(price.product as string);
            return {
                id: price.id,
                name: product.name,
                price: price.unit_amount,
                interval: price.recurring?.interval,
                currency: price.currency
            }
        }
    ))


    return NextResponse.json({
        'plans': plans
    });

}
