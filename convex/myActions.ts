"use node";

import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
    args: {
        textChunks: v.array(v.string()),
        id: v.id("documents"),
    },
    handler: async (ctx, args) => {
        await ConvexVectorStore.fromTexts(
            args.textChunks,
            args.id,
            new GoogleGenerativeAIEmbeddings({
                apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
                model: "text-embedding-004",
                taskType: TaskType.RETRIEVAL_DOCUMENT,
                title: "Document title",
            }),
            {ctx, table: "embeddings"}
        )        
    }
})

export const search = action({
    args: {
        query: v.string(),
        id: v.id("documents"),
    },
    handler: async (ctx, args) => {

        const vectorstore = new ConvexVectorStore(
            new GoogleGenerativeAIEmbeddings({
                apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
                model: "text-embedding-004",
                taskType: TaskType.RETRIEVAL_DOCUMENT,
                title: "Document title",
            }),
            {ctx, table: "embeddings"}
        );

        const results = await vectorstore.similaritySearchWithScore(args.query, 4, {
            filter: (q) => q.eq("metadata", args.id)
        });

        const filteredResults = results.filter((result) => result[1] >= 0.65);

        const relevantContent = filteredResults.map((result) => result[0].pageContent);
        
        return relevantContent.join("\n").substring(0, 3000);

    }
})