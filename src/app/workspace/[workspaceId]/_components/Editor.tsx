'use client';

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image';
import Toolbar from './Toolbar';
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { FontSize } from '@/extensions/font-size';
import Code from '@tiptap/extension-code'
import { useEditorStore } from '@/store/useEditorStore';
import { saveOnDelay } from '@/lib/helpers';
import { useSaveDocument } from '@/hooks/use-save-document';

function Editor() {

    const { setEditor, documentInfo, setIsSavingOnDelay} = useEditorStore();

    const saveDocument = useSaveDocument();


    const tipTapEditor = useEditor({
        immediatelyRender: false,
        content: documentInfo?.editorContent ? JSON.parse(documentInfo.editorContent) : undefined,
        onCreate(props) {
            setEditor(props.editor)
        },
        onDestroy() {
            setEditor(null)
        },
        onUpdate(props) {
            setEditor(props.editor);

            saveOnDelay(async () => {
                setIsSavingOnDelay(true)
                try {
                    await saveDocument();
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsSavingOnDelay(false);
                }
                console.log("Document saved");
            }, 10000);
        },
        onSelectionUpdate(props){
            setEditor(props.editor)
        },
        onTransaction(props) {
            setEditor(props.editor)
        },
        onFocus(props) {
            setEditor(props.editor)
        },
        onBlur(props) {
            setEditor(props.editor)
        },
        onContentError(props) {
            setEditor(props.editor)
        },
        extensions: [
            StarterKit, 
            Code,
            FontSize,
            TaskItem.configure({
                nested: true
            }), 
            TaskList,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Image,
            ImageResize,
            Underline,
            FontFamily,
            TextStyle,
            Highlight.configure({
                multicolor: true
            }),
            Color,
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: "https",
                protocols: ['http', 'https'],
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            
        ],
        editorProps: {
            attributes: {
                style: "padding-left: 30px; padding-right: 56px",
                class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col w-full min-h-[540px] pt-5 pr-14 pb-10 cursor-text shadow-md"
            }
        }
    })


    return (
        <>
            <div className='size-full bg-[#F9FBFD] pl-4 flex flex-col items-center print:p-0 print:bg-white print:overflow-visible'>
                <div className='w-full flex justify-center print:hidden'>
                    <Toolbar />
                </div>
                <div className='w-full mt-2 print:py-0 mx-auto overflow-y-auto print:w-screen print:min-w-0 '>
                    <EditorContent editor={tipTapEditor} />
                </div>
            </div>
        </>
    )
}

export default Editor