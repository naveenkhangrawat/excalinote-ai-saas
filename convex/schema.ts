import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

    users: defineTable({
        userId: v.string(),
        fullName: v.string(),
        email: v.string(),
        isProMember: v.boolean(),
    }).index("by_userId", ["userId"]),

    documents: defineTable({
        userId: v.string(),
        documentId: v.string(),
        documentUrl: v.string(),
        title: v.string(),
        lastEdited: v.number(),
        storageId: v.id("_storage"),
        editorContent: v.string(),
        canvasContent: v.string(),
    }).index("by_userId", ["userId"])
    .index("by_userId_lastEdited", ["userId", "lastEdited"])
    .searchIndex("search_title", {
        searchField: "title",
        filterFields: ["userId"]
    }),

    embeddings: defineTable({
        embedding: v.array(v.number()),
        text: v.string(),
        metadata: v.any(),
    }).vectorIndex("byEmbedding", {
        vectorField: "embedding",
        dimensions: 768,
        filterFields: ["metadata"]
    }),

    subscriptions: defineTable({
        userId: v.string(),
        stripePriceId: v.string(),
        stripeProductId: v.string(),
        stripeCustomerId: v.string(),
        stripeSubscriptionId: v.string(),
        stripeCurrentPeriodEnd: v.number(),
    }).index("by_stripeSubscriptionId", ["stripeSubscriptionId"])
})
