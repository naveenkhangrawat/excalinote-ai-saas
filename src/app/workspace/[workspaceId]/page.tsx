"use client";

import React, { use, useEffect, useState } from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import Header from './_components/Header';
import LeftPanel from './_components/LeftPanel';
import PdfViewer from './_components/PdfViewer';
import FullScreenLoader from '@/components/fullscreen-loader';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useEditorStore } from '@/store/useEditorStore';


interface WorkspaceIdPageProps {
    params: Promise<{workspaceId: string}>
}

function WorkspaceIdPage({params}: WorkspaceIdPageProps) {
    const {workspaceId} = use(params);

    const document = useQuery(api.documents.getDocument, {
        documentId: workspaceId
    })

    const [isMounted, setIsMounted] = useState(false);

    const {setDocumentInfo} = useEditorStore();

    useEffect(() => {
        if(document){
            setDocumentInfo(document);
            setIsMounted(true);
        }
    }, [document])


    if(document === undefined){
        return <FullScreenLoader label='Document loading...'/>
    }

    return (
        <>
        {(isMounted && document) && (
            <div className='h-screen min-h-screen flex flex-col'>
                <Header title={document.title} />
                <ResizablePanelGroup
                    direction='horizontal'
                    className='grid grid-cols-2 gap-1'
                >
                    <ResizablePanel defaultSize={55} minSize={55}>
                        <LeftPanel />
                    </ResizablePanel>

                    <ResizableHandle withHandle className='print:hidden'/>

                    <ResizablePanel className='print:hidden' defaultSize={45} maxSize={45} minSize={30}>
                        <PdfViewer documentUrl={document.documentUrl}/>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        )}
        </>
    )
}

export default WorkspaceIdPage;