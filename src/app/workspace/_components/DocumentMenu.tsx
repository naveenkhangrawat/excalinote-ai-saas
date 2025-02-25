"use client";

import React from 'react'
import { Button } from '@/components/ui/button'
import { MoreVertical, Pen, Trash2 } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import RemoveDialog from './RemoveDialog';
import RenameDialog from './RenameDialog';
import { Id } from '../../../../convex/_generated/dataModel';

interface DocumentMenuProps {
    title: string,
    id: Id<"documents">,
    storageId: Id<"_storage">
}

function DocumentMenu({title, id, storageId}: DocumentMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className='rounded-full hover:bg-gray-200'>
                    <MoreVertical className='size-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()}>

                <RenameDialog id={id} title={title}>
                    <DropdownMenuItem 
                        className='flex justify-start gap-x-3 cursor-pointer'
                        onSelect={(e) => e.preventDefault()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Pen className='size-4'/>
                        <span className='font-medium text-sm'>Rename</span>
                    </DropdownMenuItem>
                </RenameDialog>

                <RemoveDialog id={id} storageId={storageId}>
                    <DropdownMenuItem 
                        className='flex justify-start gap-x-3 cursor-pointer' 
                        onSelect={(e) => e.preventDefault()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Trash2 className='size-4'/>
                        <span className='font-medium text-sm'>Delete</span>
                    </DropdownMenuItem>
                </RemoveDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DocumentMenu