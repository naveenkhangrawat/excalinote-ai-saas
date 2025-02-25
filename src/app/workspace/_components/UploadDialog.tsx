"use client"

import React, { FormEvent, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAction, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import uuid4 from "uuid4"
import axios from "axios";
import { Id } from '../../../../convex/_generated/dataModel'



interface UploadDialogProps {
    children: React.ReactNode
}

function UploadDialog({children}: UploadDialogProps) {
    
    const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
    const createDocument = useMutation(api.documents.createDocument);
    const embedData = useAction(api.myActions.ingest);


    const [name, setName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const {toast} = useToast();

    async function createEmbeddings({documentUrl, id}: {documentUrl: string, id: Id<"documents">}){
        try {
            const res = await axios.get(`/api/pdf-loader?documentUrl=${documentUrl}`);
            await embedData({
                textChunks: res.data.data,
                id 
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function onUpload(event: FormEvent){
        event.preventDefault();
        setUploading(true);

        try {
            const postUrl = await generateUploadUrl();
            const res = await fetch(postUrl, {
                method: "POST",
                headers: {"Content-Type": file!.type},
                body: file
            })
            const { storageId } = await res.json();
            
            const documentId = uuid4();
            const {documentUrl, id} = await createDocument({
                title: name,
                storageId,
                documentId
            })

            if(documentUrl){
                await createEmbeddings({documentUrl, id});
            }


            toast({
                title: "Success!",
                description: "File has been uploaded successfully",
            })

        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your file upload",
            })

        } finally {
            setUploading(false);
            setName("");
            setIsOpen(false);
            setFile(null);
        }
    }


    return (

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <form onSubmit={onUpload}>
                    <DialogHeader>
                        <DialogTitle>
                            Upload File
                        </DialogTitle>
                        <DialogDescription>
                            Add a file and start making notes using the power of AI
                        </DialogDescription>
                    </DialogHeader>

                    <div className='my-4 grid gap-4 py-4'>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                File Name
                            </Label>
                            <Input 
                                id="name" 
                                value={name}
                                className="col-span-3"
                                placeholder='Enter your file name'
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="file" className="text-right">
                                File
                            </Label>
                            <Input
                                id='file'
                                type='file'
                                accept='.pdf'
                                className='cursor-pointer col-span-3'
                                onChange={(e) => setFile(e.target.files![0])}
                                required
                            />
                        </div>

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
                            variant="default"
                            disabled={uploading}
                            className={`${uploading && "bg-opacity-50 pointer-events-none"}`}
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin"/>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    Upload
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
  )
}

export default UploadDialog