import { Id } from "../../convex/_generated/dataModel";

export enum TABS {
    CANVAS='canvas',
    DOCUMENT='document'
}

export type AI_MODELS = "gemini" | "llama" | "deepseek"

export interface DocumentInfo {
    _id: Id<"documents">;
    _creationTime: number;
    canvasContent: string;
    editorContent: string;
    userId: string;
    documentId: string;
    documentUrl: string;
    title: string;
    lastEdited: number;
    storageId: Id<"_storage">
}

export type AIModelsList = {
    title: string,
    model: string,
    value: AI_MODELS,
    path: string,
    pro: boolean
}[]