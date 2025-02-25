"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MAX_FILE_UPLOADS } from '@/lib/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Id } from '../../../../convex/_generated/dataModel';

interface UpgradeProps {
    user: {
        _id: Id<"users">;
        _creationTime: number;
        userId: string;
        fullName: string;
        email: string;
        isProMember: boolean;
    },
    documents: {
        _id: Id<"documents">;
        _creationTime: number;
        userId: string;
        documentId: string;
        documentUrl: string;
        title: string;
        lastEdited: number;
        storageId: Id<"_storage">;
        editorContent: string;
        canvasContent: string;
    }[]
}


function Upgrade({ user, documents}: UpgradeProps) {

    const router = useRouter();

    return (
        <div className='w-full rounded-md backdrop-blur-xl bg-gray-100/80 px-5 py-6 ring-1 ring-gray-700/20'>
            {!user.isProMember ? (
                <div className='flex flex-col gap-y-5'>
                    <h5 className='text-sm font-semibold'>Excalinote Free Trial</h5>
                    <div className='flex flex-col gap-y-1'>
                        <Progress value={(documents.length/MAX_FILE_UPLOADS)*100}/>
                        <p className='text-[12px] font-semibold'>{documents.length} of {MAX_FILE_UPLOADS} files</p>
                    </div>
                    <p className='text-[11px] text-gray-600'>Upgrade your plan for unlimited files & more features</p>
                    <Button onClick={() => router.push("/pricing")}>
                        Upgrade
                    </Button>
                </div>
            ) : (
                <div className='flex flex-col gap-y-5'>
                    <h5 className='text-sm font-semibold'>Excalinote Pro Plan</h5>
                    <div className='flex flex-col gap-y-1 justify-center items-center'>
                        <Image src={'./check.svg'} alt='Check' width={28} height={28}/>
                        <p className='font-semibold text-[14px]'>You are a Pro Member</p>
                        <p className='text-[11px] text-gray-600'>You now have access to all the premium features</p>
                    </div>
                    <p className='text-[12px] font-semibold'>{documents.length} of unlimited files</p>
                    <Button onClick={() => router.push("/workspace/billing")}>
                        Manage Subscription
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Upgrade