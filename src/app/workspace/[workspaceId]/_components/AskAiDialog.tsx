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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"  
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/store/useEditorStore';
import { useAction, useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { AIModels } from '@/lib/constants';
import { AI_MODELS } from '@/lib/types';
import { getGeminiResponse, getOtherModelResponse } from '@/lib/helpers';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useAuth } from '@clerk/nextjs';




function AskAiDialog({children}: {children: React.ReactNode}) {

    const {userId} = useAuth();

    const getRelevantContext = useAction(api.myActions.search);
    const user = useQuery(api.users.getUser, {
        userId: userId || ""
    })

    const {editor, documentInfo} = useEditorStore();

    const [isOpen, setIsOpen] = useState(false);
    const [modelName, setModelName] = useState<AI_MODELS>("gemini");
    const [isGenerating, setIsGenerating] = useState(false);

    const {toast} = useToast();

    async function getAnswerFromAI(){
        if(documentInfo){
            setIsGenerating(true);
            try {
                const selectedText = editor?.state.doc.textBetween(
                    editor.state.selection.from,
                    editor.state.selection.to,
                    ' '
                )
                console.log(selectedText);
                
                const context = await getRelevantContext({
                    query: selectedText || "", 
                    id: documentInfo._id
                })

                console.log(context);
    
                if(modelName === "gemini"){
                    const response: string = await getGeminiResponse({
                        context,
                        prompt: selectedText || "",
                        documentUrl: documentInfo.documentUrl
                    })
                    console.log(response);
                    if(editor){
                        const editorContent = editor.getHTML();
                        const geminiResponse = `<p>
                        <b>Answer:</b>
                        ${response.replaceAll("```", "").replaceAll("html", "")}
                        </p>`
                        editor.commands.setContent(editorContent + geminiResponse);
                    }
                }
    
                if(modelName === "llama" || modelName === "deepseek"){
                    const response = await getOtherModelResponse({
                        context,
                        prompt: selectedText || "",
                        modelName
                    })
                    console.log(response);
                    if(editor){
                        const editorContent = editor.getHTML();
                        const otherModelResponse = `<p>
                        <b>Answer:</b>
                        ${response.replaceAll("```", "").replaceAll("html", "")}
                        </p>`
                        editor.commands.setContent(editorContent + otherModelResponse);
                    }
                }
                
            } catch (error) {
                console.log(error);
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Try using other AI models",
                })
            } finally {
                setIsGenerating(false);
                setIsOpen(false);
                setModelName("gemini");
            }
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                    <DialogTitle>Ask AI anything</DialogTitle>
                    <DialogDescription>
                        Select the text you want to ask about the document
                    </DialogDescription>
                </DialogHeader>

                <Select onValueChange={(value: AI_MODELS) => setModelName(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select an AI model"/>
                    </SelectTrigger>
                    <SelectContent>
                        {AIModels.map((model) => {
                            const isLocked = !Boolean(user?.isProMember) && model.pro
                            return (
                                <SelectItem 
                                    key={model.value} 
                                    value={model.value} 
                                    className='hover:bg-gray-200/60 cursor-pointer'
                                    disabled={isLocked}
                                >
                                    <div className='flex gap-x-5'>
                                        <div className='flex gap-x-2'>
                                            <Image src={model.path} alt='gemini logo' width={16} height={16} />
                                            {model.title}
                                        </div>
                                        {isLocked && (
                                            <div className='flex items-center justify-center ring-1 ring-primary px-2 rounded-full text-xs'>
                                                Pro
                                            </div>
                                        )}
                                    </div>
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>

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
                        onClick={getAnswerFromAI}
                        disabled={isGenerating}
                        className='disabled:bg-opacity-50 disabled:pointer-events-none'
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className='size-4 animate-spin'/>
                                Generating...
                            </>
                        ) : (
                            "Ask AI"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AskAiDialog