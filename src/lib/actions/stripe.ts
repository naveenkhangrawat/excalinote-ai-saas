"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { PRICING_PLANS } from "../constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    apiVersion: "2025-01-27.acacia"
})


export const createCheckoutSession = async () => {
    const {userId} = await auth();
    if(!userId){
        throw new Error("Unauthorized");
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "amazon_pay"],
        line_items: [
            {
                price: PRICING_PLANS.find((plan) => plan.name === "Pro")?.price.priceIds?.test as string,
                quantity: 1
            }
        ],
        mode: "subscription",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/workspace/billing`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/workspace/billing`,
        client_reference_id: userId,
        metadata: {
            userId
        }
    });

    redirect(session.url!);
}


export const createBillingPortalSession = async ({customerId}: {customerId: string}) => {
    const {userId} = await auth();
    if(!userId){
        throw new Error("Unauthorized");
    }

    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/workspace/billing`
    })

    redirect(session.url);
}

