import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { useEditorStore } from "@/store/useEditorStore";


export const useSaveDocument = () => {

    const saveDocument = useMutation(api.documents.saveDocument);

    const {editor, canvas, documentInfo} = useEditorStore();

    const setDocument = async () => {
        
        if(documentInfo){
            const editorContent = editor ? JSON.stringify(editor.getJSON()) : ""
            const canvasContent = canvas ? JSON.stringify({
                elements: canvas.getSceneElements(),
                appState: canvas.getAppState(),
                files: canvas.getFiles(),
            }) : "";
            await saveDocument({
                id: documentInfo._id,
                editorContent,
                canvasContent
            })
        }
    }

    return setDocument;
}