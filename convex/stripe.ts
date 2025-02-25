"use node";

import Stripe from "stripe"
import { internalAction } from "./_generated/server";
import { v } from "convex/values";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia"
})

export const validateStripeWebhook = internalAction({
    args: {signature: v.string(), body: v.string()},
    handler: async (_,args) => {

        const event = stripe.webhooks.constructEvent(args.body, args.signature, process.env.STRIPE_WEBHOOK_SECRET as string);

        if(!event){
            console.error("Error verifying signature");
            return null;
        }

        return event;
    }
})