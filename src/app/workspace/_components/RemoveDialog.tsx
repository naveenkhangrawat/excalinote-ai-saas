"use client";

import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Id } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface RemoveDialogProps {
    id: Id<"documents">,
    storageId: Id<"_storage">,
    children: React.ReactNode
}


function RemoveDialog({children, id, storageId}: RemoveDialogProps) {

    const deleteDocument = useMutation(api.documents.deleteDocument);
    const [isDeleting, setIsDeleting] = useState(false);

    const { toast } = useToast();

    async function handleDelete(e: React.MouseEvent<HTMLButtonElement>){
        e.stopPropagation();
        setIsDeleting(true);
        try {
            await deleteDocument({id, storageId});
            toast({
                title: "Success!",
                description: "File has been deleted successfully."
            })
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with deleting your file.",
            })
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild >
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => {
                e.stopPropagation();
            }}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your document
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} asChild>
                        <Button
                            disabled={isDeleting}
                            className='disabled:bg-opacity-50'
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className='size-4 animate-spin'/>
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    Delete
                                </>
                            )}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default RemoveDialog