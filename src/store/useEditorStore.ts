import { create } from "zustand";
import { type Editor } from "@tiptap/react";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { DocumentInfo } from "@/lib/types";


type State = {
    editor: Editor | null,
    canvas: ExcalidrawImperativeAPI | null,
    documentInfo: DocumentInfo | null,
    isSavingOnDelay: boolean
}

type Action = {
    setEditor: (editor: Editor | null) => void,
    setCanvas: (canvas: ExcalidrawImperativeAPI | null) => void,
    setDocumentInfo: (documentInfo: DocumentInfo) => void,
    setIsSavingOnDelay: (value: boolean) => void
}

export const useEditorStore = create<State & Action>()((set) => ({
    editor: null,
    canvas: null,
    documentInfo: null,
    isSavingOnDelay: false,
    setEditor: (editor) => set(() => ({editor})),
    setCanvas: (canvas) => set({canvas}),
    setDocumentInfo: (documentInfo) => set({documentInfo}),
    setIsSavingOnDelay: (value) => set({isSavingOnDelay: value})
}))