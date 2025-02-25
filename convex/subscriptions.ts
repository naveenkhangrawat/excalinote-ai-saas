import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";


export const createSubscription = internalMutation({
    args: {
        userId: v.string(),
        stripeSubscriptionId: v.string(),
        stripePriceId: v.string(),
        stripeProductId: v.string(),
        stripeCustomerId: v.string(),
        stripeCurrentPeriodEnd: v.number(),
    },
    handler: async (ctx, args) => {

        const user = await ctx.db.query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .unique();
        
        if(!user){
            throw new ConvexError("User not found");
        }

        const isSubscribed = await ctx.db.query("subscriptions")
        .withIndex("by_stripeSubscriptionId", (q) => q.eq("stripeSubscriptionId", args.stripeSubscriptionId)).unique();
        if(isSubscribed){
            throw new ConvexError("User is already subscribed");
        }

        const subscriptionId = await ctx.db.insert("subscriptions", {
            userId: args.userId,
            stripePriceId: args.stripePriceId,
            stripeCustomerId: args.stripeCustomerId,
            stripeProductId: args.stripeProductId,
            stripeSubscriptionId: args.stripeSubscriptionId,
            stripeCurrentPeriodEnd: args.stripeCurrentPeriodEnd
        })

        if(!subscriptionId){
            throw new ConvexError("Error while subscribing");
        }

        await ctx.db.patch(user._id, {
            isProMember: true
        })

    }
})


export const updateSubscription = internalMutation({
    args: {
        stripeSubscriptionId: v.string(),
        stripeCurrentPeriodEnd: v.number(),
        stripePriceId: v.string(), 
    },
    handler: async (ctx, args) => {

        const subscription = await ctx.db.query("subscriptions")
        .withIndex("by_stripeSubscriptionId", (q) => q.eq("stripeSubscriptionId", args.stripeSubscriptionId)).unique();
        
        if(!subscription) return;

        return await ctx.db.patch(subscription._id, {
            stripeCurrentPeriodEnd: args.stripeCurrentPeriodEnd,
            stripePriceId: args.stripePriceId
        })
    }
})

export const getSubscription = query({
    args: {userId: v.string()},
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity){
            return {
                isSubscribed: false,
                stripeCurrentPeriodEnd: null
            }
        }

        const user = await ctx.db.query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .unique();
        
        if(!user){
            return {
                isSubscribed: false,
                stripeCurrentPeriodEnd: null,
                stripePriceId: null,
                stripeProductId: null,
                stripeCustomerId: null,
                stripeSubscriptionId: null,
            };
        }

        const subscription = await ctx.db.query("subscriptions")
        .filter((q) => q.eq(q.field("userId"), user.userId))
        .unique();
        
        if(!subscription){
            return {
                isSubscribed: false,
                stripeCurrentPeriodEnd: null,
                stripePriceId: null,
                stripeProductId: null,
                stripeCustomerId: null,
                stripeSubscriptionId: null,
            }
        }

        const isSubscribed = Boolean(subscription.stripeCurrentPeriodEnd > Date.now());

        return {
            isSubscribed,
            stripeCurrentPeriodEnd: subscription.stripeCurrentPeriodEnd,
            stripePriceId: subscription.stripePriceId,
            stripeProductId: subscription.stripeProductId,
            stripeCustomerId: subscription.stripeCustomerId,
            stripeSubscriptionId: subscription.stripeSubscriptionId,
        }
    }
})

export const deleteSubscription = internalMutation({
    args: {stripeSubscriptionId: v.string()},
    handler: async (ctx, args) => {

        
        const subscription = await ctx.db.query("subscriptions")
        .withIndex("by_stripeSubscriptionId", (q) => q.eq("stripeSubscriptionId", args.stripeSubscriptionId)).unique();
        
        if(!subscription) return;
        
        const user = await ctx.db.query("users")
        .withIndex("by_userId", (q) => q.eq("userId", subscription.userId))
        .unique();
        
        if(!user){
            throw new ConvexError("User not found");
        }

        await ctx.db.delete(subscription._id)

        await ctx.db.patch(user._id, {
            isProMember: false
        })
    }
})