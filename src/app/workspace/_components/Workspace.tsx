"use client";

import React from 'react'
import { Plus } from 'lucide-react'
import UploadDialog from './UploadDialog'
import DocumentTable from './DocumentTable'
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useAuth } from '@clerk/nextjs';

function Workspace() {

    const { userId } = useAuth();

    const user = useQuery(api.users.getUser, {userId: userId || ""})
    const documents = useQuery(api.documents.getAllDocuments, {userId: userId || ""})

    if(documents === undefined || !user){
        return;
    }

    return (
        <div className='w-full h-full flex flex-col gap-y-10'>
            <div className='w-full py-4 pl-14'>
                <UploadDialog>
                    <button 
                        className={`group w-72 h-40 py-4 bg-gray-100/80 ring-1 ring-gray-700/20 rounded-md flex flex-col gap-y-0 items-center hover:bg-gray-200/50 hover:ring-gray-700/50 transition-all disabled:hover:bg-gray-100/80 disabled:ring-gray-700/20 disabled:cursor-not-allowed`}
                        disabled={!user.isProMember && documents.length >= 5}
                    >
                        <Plus 
                            strokeWidth={0.7} 
                            className='size-20 text-gray-400 group-hover:text-[#ea580c] group-disabled:text-gray-400'
                        />
                        <span className='text-gray-500 group-hover:text-[#ea580c] group-disabled:text-gray-400'>
                            Upload a New PDF
                        </span>
                    </button>
                </UploadDialog>
            </div>

            <div className='px-12'>
                <DocumentTable />
            </div>
        </div>
    )
}

export default Workspace