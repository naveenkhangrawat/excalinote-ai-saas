import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const createDocument = mutation({
    args: {
        title: v.string(),
        storageId: v.id("_storage"),
        documentId: v.string(),
    },
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();

        if(!userIdentity){
            throw new ConvexError("User not authenticated");
        }

        const documentUrl = await ctx.storage.getUrl(args.storageId);

        const id = await ctx.db.insert("documents", {
            userId: userIdentity.subject,
            title: args.title,
            documentId: args.documentId,
            documentUrl: documentUrl || "",
            storageId: args.storageId,
            lastEdited: Date.now(),
            editorContent: "",
            canvasContent: "",
        })

        return {documentUrl, id};
    }
})

export const getAllDocuments = query({
    args: {userId: v.string()},
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity){
            return []
        }

        return await ctx.db.query("documents")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .collect();
    }
})

export const getPaginatedDocuments = query({
    args: {
        paginationOpts: paginationOptsValidator, 
        userId: v.string(),
        searchQuery: v.optional(v.string()),
    },
    handler: async(ctx, {paginationOpts, userId, searchQuery}) => {

        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity){
            throw new ConvexError("User not authenticated");
        }

        if(searchQuery){
            return await ctx.db.query("documents")
            .withSearchIndex("search_title", (q) => q.search("title", searchQuery).eq("userId", userId))
            .paginate(paginationOpts)
        }

        return await ctx.db.query("documents")
        .withIndex("by_userId_lastEdited", (q) => q.eq("userId", userId))
        .order("desc")
        .paginate(paginationOpts);
    }
})

export const getDocument = query({
    args: {documentId: v.string()},
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity){
            return;
        }
        const document =  await ctx.db.query("documents")
        .withIndex("by_userId", (q) => q.eq("userId", userIdentity.subject))
        .filter((q) => q.eq(q.field("documentId"), args.documentId))
        .unique();

        if(document === null){
            throw new ConvexError("Document not found");
        }

        return document;
    }
})

export const deleteDocument = mutation({
    args: {
        id: v.id("documents"),
        storageId: v.id("_storage")
    },
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity){
            throw new ConvexError("User not authenticated");
        }

        const document = await ctx.db.get(args.id);
        if(!document){
            throw new ConvexError("Document not found");
        }

        const isOwner = document.userId === userIdentity.subject;
        if(!isOwner){
            throw new ConvexError("Unauthorized to delete the document");
        }

        const embeddedDocuments = await ctx.db.query("embeddings")
        .filter((q) => q.eq(q.field("metadata"), document._id))
        .collect();

        await ctx.db.delete(document._id);

        await Promise.all(embeddedDocuments.map((doc) => ctx.db.delete(doc._id)));

        return await ctx.storage.delete(args.storageId);
    }
})

export const updateDocument = mutation({
    args: {
        id: v.id("documents"),
        title: v.string()
    },
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity){
            throw new ConvexError("User not authenticated");
        }

        const document = await ctx.db.get(args.id);
        if(!document){
            throw new ConvexError("Document not found");
        }

        const isOwner = document.userId === userIdentity.subject;
        if(!isOwner){
            throw new ConvexError("Unauthorized to delete the document");
        }

        return await ctx.db.patch(args.id, {
            title: args.title
        })
    }
})

export const saveDocument = mutation({
    args: {
        id: v.id("documents"),
        editorContent: v.string(),
        canvasContent: v.string(),
    },
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity){
            throw new ConvexError("User not authenticated");
        }

        const document = await ctx.db.get(args.id);
        if(!document){
            throw new ConvexError("Document not found");
        }

        const isOwner = document.userId === userIdentity.subject;
        if(!isOwner){
            throw new ConvexError("Unauthorized to save the document");
        }

        return await ctx.db.patch(args.id, {
            editorContent: args.editorContent,
            canvasContent: args.canvasContent,
            lastEdited: Date.now(),
        })
    }
})