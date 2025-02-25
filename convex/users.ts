import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";


export const createUser = internalMutation({
    args: {
        userId: v.string(),
        fullName: v.string(),
        email: v.string()
    },
    handler: async (ctx, args) => {

        const isUserExisted = await ctx.db.query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .first();

        if(isUserExisted) return;

        await ctx.db.insert("users", {
            userId: args.userId,
            fullName: args.fullName,
            email: args.email,
            isProMember: false
        })
    }
})

export const updateUser = internalMutation({
    args: {
        userId: v.string(),
        fullName: v.string(),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .first();

        if(!user){
            throw new ConvexError(`Can't update user, there is none for Clerk user ID: ${args.userId}`);
        }

        await ctx.db.patch(user._id, {
            fullName: args.fullName,
            email: args.email || user.email
        })
    }
})

export const deleteUser = internalMutation({
    args: {userId: v.string()},
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .first();

        if(user !== null){
            await ctx.db.delete(user._id)
        } else {
            console.warn(`Can't delete user, there is none for Clerk user ID: ${args.userId}`);
        }
    }
})

export const getUser = query({
    args: {userId: v.string()},
    handler: async (ctx, args) => {

        const user = await ctx.db.query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .unique();

        if(!user){
            return null;
        } else {
            return user;
        }
    }
})