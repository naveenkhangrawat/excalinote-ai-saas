"use client";

import { useTabStore } from '@/store/useTabStore'
import React, { useEffect } from 'react'
import Editor from './Editor';
import Canvas from './Canvas';
import { TABS } from '@/lib/types';

function LeftPanel() {

    const {tab, setTab} = useTabStore();

    useEffect(() => {
        return () => {
            setTab(TABS.DOCUMENT);
        }
    },[])

    return (
        <div className='w-full h-full'>
            
            <div className={`w-full h-full ${tab === "document" ? "block" : "hidden"}`}>
                <Editor />
            </div>
            <div className={`w-full h-full ${tab === "canvas" ? "block" : "hidden"}`}>
                <Canvas />
            </div>
            {/* {tab === "document" ? (
                <Editor />
            ) : (tab === "canvas") && (
                <Canvas />
            )} */}
        </div>

        
    )
}

export default LeftPanel
