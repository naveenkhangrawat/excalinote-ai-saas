import { NextRequest } from "next/server";
import Stripe from "stripe";

export const GET = async (req: NextRequest) => {

    const searchParams = req.nextUrl.searchParams;
    const isSubscribed = searchParams.get("isSubscribed");
    const stripeSubscriptionId = searchParams.get("stripeSubscriptionId");

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
        apiVersion: "2025-01-27.acacia"
    })

    let isCanceled = false;
    if(isSubscribed && stripeSubscriptionId){
        const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
        isCanceled = subscription.cancel_at_period_end
    }
    
    return Response.json({data: isCanceled});
}