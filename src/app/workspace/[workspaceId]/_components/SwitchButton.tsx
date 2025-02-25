"use client";

import { Button } from '@/components/ui/button'
import React from 'react'
import { TABS } from '@/lib/types';
import { useTabStore } from '@/store/useTabStore';


function SwitchButton() {

    const {tab, setTab} = useTabStore();

    return (
        <div className='flex h-[30px] border border-gray-300'>
            <Button
                variant="ghost"
                className={`rounded-none h-full ${tab === "document" && "bg-[#ea580c]/20 hover:bg-[#ea580c]/20"}`}
                onClick={() => setTab(TABS.DOCUMENT)}
            >
                Document
            </Button>
            <Button
                variant="ghost"
                className={`rounded-none h-full ${tab === "canvas" && "bg-[#ea580c]/20 hover:bg-[#ea580c]/20"}`}
                onClick={() => setTab(TABS.CANVAS)}
            >
                Canvas
            </Button>
        </div>
    )
}

export default SwitchButton