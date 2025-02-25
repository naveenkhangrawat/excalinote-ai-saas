"use client";

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast';
import { SignedIn, UserButton } from '@clerk/nextjs'
import { Loader2, Save } from 'lucide-react'
import React, { useState } from 'react'
import { useSaveDocument } from '@/hooks/use-save-document';

function SaveButton() {

    const saveDocument = useSaveDocument();

    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    async function saveButtonHandler(){
        setIsSaving(true);

        try {
            await saveDocument();
            toast({
                title: "Success!",
                description: "Document has been saved successfully."
            })
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with saving your document.",
            })
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className='w-full flex items-center justify-end gap-x-3 pr-3'>
            <Button
                className='flex items-center justify-center gap-x-2'
                onClick={saveButtonHandler}
                disabled={isSaving}
            >
                {isSaving ? (
                    <>
                        <Loader2 className='size-4 animate-spin'/>
                        Saving...
                    </>
                ) : (
                    <>
                        <Save className='size-4' />
                        Save
                    </>
                )}
            </Button>

            <Separator orientation='vertical' className='h-8'/>

            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}

export default SaveButton