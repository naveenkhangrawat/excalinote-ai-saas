import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import type { WebhookEvent } from "@clerk/backend";
import { Webhook } from "svix";
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    apiVersion: "2025-01-27.acacia"
})

const http = httpRouter();

http.route({
    path: "/stripe-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const body = await request.text();
        const signature = request.headers.get("stripe-signature") as string;
        if(!signature){
            return new Response("Missing stripe-Signature header", { status: 400 });
        }

        const event = await ctx.runAction(internal.stripe.validateStripeWebhook, {
            signature,
            body
        });
        if(!event){
            return new Response("Error verifying signature", {status: 400});
        }

        const session = event.data.object as Stripe.Checkout.Session;
        
        if(event.type === "checkout.session.completed"){
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string, {
                expand: ["items.data.price.product"]
            })

            const userId = session.metadata?.userId;
            if(!userId){
                return new Response("User not found during checkout session", {status: 400});
            }

            const price = subscription.items.data[0].price;
            if(!price){
                return new Response("Error during checkout session", {status: 400});
            }

            const productId = (price.product as Stripe.Product).id;
            if(!productId){
                return new Response("Error during checkout session", {status: 400});
            }

            await ctx.runMutation(internal.subscriptions.createSubscription, {
                userId: userId,
                stripePriceId: price.id,
                stripeProductId: productId,
                stripeCustomerId: subscription.customer as string,
                stripeSubscriptionId: subscription.id,
                stripeCurrentPeriodEnd: subscription.current_period_end * 1000
            })

            return new Response("Webhook processed successfully", { status: 200 })
        }

        if(event.type === "invoice.payment_succeeded"){
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string, {
                expand: ["items.data.price.product"]
            })

            const price = subscription.items.data[0].price;
            if(!price){
                return new Response("Error during checkout session", {status: 400});
            }

            const productId = (price.product as Stripe.Product).id;
            if(!productId){
                return new Response("Error during checkout session", {status: 400});
            }

            await ctx.runMutation(internal.subscriptions.updateSubscription, {
                stripeSubscriptionId: subscription.id,
                stripeCurrentPeriodEnd: subscription.current_period_end * 1000,
                stripePriceId: price.id
            })

            return new Response("Webhook processed successfully", { status: 200 })
        }

        if(event.type === "customer.subscription.deleted"){
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
            const isCanceled = subscription.cancel_at_period_end;
            if(!isCanceled){
                return new Response("Subscription not canceled", {status: 400})
            }

            await ctx.runMutation(internal.subscriptions.deleteSubscription, {
                stripeSubscriptionId: subscription.id,
            })

            return new Response("Webhook processed successfully", { status: 200 })
        }

        return new Response("Webhook processed successfully", { status: 200 });
    })
})

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const event = await validateRequest(request);
        if(!event){
            return new Response("Error occured", {status: 400})
        }

        try {
            if(event.type === "user.created"){
                const fullName = `${event.data.first_name} ${event.data.last_name}`.trim();

                await ctx.runMutation(internal.users.createUser, {
                    userId: event.data.id,
                    fullName: fullName,
                    email: event.data.email_addresses[0]?.email_address
                })

                return new Response("User created successfully", { status: 200 });
            }

            if(event.type === "user.updated"){
                const fullName = `${event.data.first_name} ${event.data.last_name}`.trim();

                await ctx.runMutation(internal.users.updateUser, {
                    userId: event.data.id,
                    fullName: fullName,
                    email: event.data.email_addresses[0]?.email_address
                })

                return new Response("User updated successfully", { status: 200 });
            }

            if(event.type === "user.deleted"){
                await ctx.runMutation(internal.users.deleteUser, {
                    userId: event.data.id!
                });
                
                return new Response("User deleted successfully", { status: 200 });
            }

        } catch (error) {
            return new Response("Error occured while processing the webhook", { status: 500 });
        }

        return new Response("Webhook processed successfully", { status: 200 });
    })
})



async function validateRequest(req: Request): Promise<WebhookEvent | null> {
    const payloadString = await req.text();
    
    const svixHeaders = {
        "svix-id": req.headers.get("svix-id")!,
        "svix-timestamp": req.headers.get("svix-timestamp")!,
        "svix-signature": req.headers.get("svix-signature")!,
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

    try {
        return wh.verify(payloadString, svixHeaders) as unknown as WebhookEvent;
    } catch (error) {
        console.error("Error verifying webhook event", error);
        return null;
    }
}

export default http;