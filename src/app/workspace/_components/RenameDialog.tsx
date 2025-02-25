"use client";

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Id } from '../../../../convex/_generated/dataModel';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

interface RenameDialogProps {
    id: Id<"documents">,
    title: string
    children: React.ReactNode
}

function RenameDialog({children, id, title}: RenameDialogProps) {

    const updateDocument = useMutation(api.documents.updateDocument);

    const [name, setName] = useState(title);
    const [isOpen, setIsOpen] = useState(false);

    const [isSaving, setIsSaving] = useState(false);

    const { toast } = useToast();

    async function onSubmitHandler(e: React.FormEvent){
        e.preventDefault();
        setIsSaving(true);

        try {
            await updateDocument({id, title: name});
            toast({
                title: "Success!",
                description: "File has been renamed successfully."
            })
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with renaming your file.",
            })
        } finally {
            setName("");
            setIsOpen(false);
            setIsSaving(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <form onSubmit={onSubmitHandler}>
                    <DialogHeader>
                        <DialogTitle>Rename document</DialogTitle>
                        <DialogDescription>
                            Enter a new name for this document
                        </DialogDescription>
                    </DialogHeader>
                    <div className='my-4'>
                        <Input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Document name'
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type='button'
                            variant="ghost"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            className='disabled:bg-opacity-50 disabled:pointer-events-none'
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className='size-4 animate-spin'/>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    Save
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default RenameDialog