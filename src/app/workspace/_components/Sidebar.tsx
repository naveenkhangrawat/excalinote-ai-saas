"use client";

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Archive, Flag, Github, LayoutGrid, Upload } from 'lucide-react';
import UploadDialog from './UploadDialog';
import Upgrade from './Upgrade';
import { useSearchParam } from '@/hooks/use-search-param';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';



function Sidebar() {

    const { userId } = useAuth();
    
    const user = useQuery(api.users.getUser, {userId: userId || ""})
    const documents = useQuery(api.documents.getAllDocuments, {userId: userId || ""})

    const [, setSearch] = useSearchParam();
    
    const list = [
        {id: 1, label: "Getting Started", icon: Flag, path: ''},
        {id: 2, label: "Github", icon: Github, path: ""},
        {id: 3, label: "Archive", icon: Archive, path: ""}
    ]

    if(documents === undefined || !user){
        return;
    }

    return (
        <div className='fixed left-0 top-0 bottom-0 h-screen flex flex-col justify-between items-center w-[250px] border-r border-gray-400/20 px-5'>
            <Link href={'/'} className='flex gap-3 items-center shrink-0 pr-6 mt-8'>
                <Image src={'./logo.svg'} alt='Logo' width={36} height={36} />
                <h3 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800'>Excalinote</h3>
            </Link>

            <div className='w-full'>
                <Button
                    variant="outline"
                    className='w-full bg-gray-100/80 font-semibold flex justify-start gap-x-2 hover:bg-gray-200/60'
                    onClick={() => setSearch("")}
                >
                    <LayoutGrid className='size-4'/>
                    All Files
                </Button>
            </div>
            
            <Upgrade user={user} documents={documents}/>

            <div className='w-full flex flex-col gap-y-2 mb-10'>
                <div className='flex flex-col'>
                    {list.map(({id, label, path, icon:Icon}) => (
                        <Link
                            key={id}
                            href={path}
                            className='w-full flex gap-x-2 items-center justify-start px-4 py-1 hover:bg-gray-100 rounded-md'
                        >
                            <Icon className='size-4'/>
                            <span className='text-sm'>{label}</span>
                            
                        </Link>
                    ))}
                </div>

                <UploadDialog>
                    <Button
                        className='w-full flex gap-x-2 justify-start items-center'
                        disabled={!user.isProMember && documents.length >= 5}
                    >
                        <Upload />
                        Upload PDF
                    </Button>
                </UploadDialog>
            </div>

        </div>
    )
}

export default Sidebar