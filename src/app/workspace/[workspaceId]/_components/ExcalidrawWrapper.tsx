"use client";

import { useSaveDocument } from "@/hooks/use-save-document";
import { saveOnDelay } from "@/lib/helpers";
import { useEditorStore } from "@/store/useEditorStore";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";

import React from 'react'

function ExcalidrawWrapper() {

    const saveDocument = useSaveDocument();

    const { setCanvas, documentInfo, setIsSavingOnDelay } = useEditorStore();

    const content = documentInfo?.canvasContent ? JSON.parse(documentInfo.canvasContent) : null;
    if(content){
        content.appState.collaborators = new Map();
    }

    return (
        <>
            <Excalidraw
                initialData={content}
                isCollaborating={false}
                excalidrawAPI={(api) => setCanvas(api)}
                onPointerDown={() => {
                    saveOnDelay(async () => {
                        setIsSavingOnDelay(true);
                        try {
                            await saveDocument();
                        } catch (error) {
                            console.log(error);
                        } finally {
                            setIsSavingOnDelay(false);
                        }
                        console.log('canvas saved');
                    }, 20000)
                }}
                
            >
                <MainMenu>
                    <MainMenu.DefaultItems.SaveAsImage />
                    <MainMenu.DefaultItems.ToggleTheme />
                    <MainMenu.DefaultItems.ClearCanvas />
                    <MainMenu.DefaultItems.ChangeCanvasBackground />
                </MainMenu>

                <WelcomeScreen>
                    <WelcomeScreen.Hints.ToolbarHint />
                    <WelcomeScreen.Hints.MenuHint />
                    <WelcomeScreen.Hints.HelpHint />
                </WelcomeScreen>
            </Excalidraw>
        </>
    )
}

export default ExcalidrawWrapper