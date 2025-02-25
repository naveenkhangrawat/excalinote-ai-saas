"use client";

import React, { useState } from 'react'
import { useEditorStore } from '@/store/useEditorStore';
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, CodeIcon, DownloadIcon, FileTextIcon, GlobeIcon, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MinusIcon, PlusIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SparklesIcon, SpellCheckIcon, Table, UnderlineIcon, Undo2Icon, UploadIcon } from 'lucide-react'
import { IconFileTypePdf, IconHighlightOff } from '@tabler/icons-react';
import {
    DropdownMenu,
    DropdownMenuContent,    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"

import { Separator } from '@/components/ui/separator';
import { type Level } from '@tiptap/extension-heading';
import { SketchPicker, type ColorResult } from 'react-color';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AskAiDialog from './AskAiDialog';



interface ToolbarButtonProps {
    onClick?: () => void,
    isActive?: boolean,
    icon: LucideIcon
}

type SectionsType = {
    label: string,
    icon: LucideIcon,
    onClick: () => void,
    isActive?: boolean
}[][]


function DownloadButton(){

    const {editor} = useEditorStore();

    function onDownload(blob: Blob, filename: string){
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
    }

    function onSaveHTML(){
        if(!editor) return;

        const content = editor.getHTML();
        const blob = new Blob([content], {
            type: "text/html"
        })

        onDownload(blob, 'document.html');
    }

    function onSaveText(){
        if(!editor) return;

        const content = editor.getText();
        const blob = new Blob([content], {
            type: "text/plain"
        })

        onDownload(blob, 'document.txt');
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={`h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm`}
                >
                    <DownloadIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1 print:hidden'>
                <DropdownMenuItem onClick={() => window.print()}>
                    <IconFileTypePdf className='size-4 mr-1'/>
                    PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onSaveText}>
                    <FileTextIcon className='size-4 mr-1'/>
                    Text
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onSaveHTML}>
                    <GlobeIcon className='size-4 mr-1'/>
                    HTML
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


function TableButton(){

    const {editor} = useEditorStore();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [rowInput, setRowInput] = useState("");
    const [colInput, setColInput] = useState("");


    function insertTable({rows,cols}: {rows: number, cols: number}){
        editor?.chain().focus().insertTable({ rows: rows+1, cols, withHeaderRow: true }).run();
    }


    function insertCustomTable(){
        const rows = parseInt(rowInput);
        const cols = parseInt(colInput);
        if(rows > 0 && cols > 0){
            insertTable({rows, cols});
            setRowInput("");
            setColInput("");
            setIsDialogOpen(false);
        }
    }

    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={`h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm ${editor?.isActive('highlight') && 'bg-neutral-200/80'}`}
                >
                    <Table className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                <DropdownMenuItem onClick={() => insertTable({rows: 1, cols: 2})}>
                    1 x 2
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertTable({rows: 2, cols: 2})}>
                    2 x 2
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertTable({rows: 3, cols: 3})}>
                    3 x 3
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                    Custom
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Custom Table</DialogTitle>
                    </DialogHeader>
                    <div className='flex gap-x-2'>
                        <div className='flex gap-x-2 items-center'>
                            <Label htmlFor='row' className='font-semibold'>Rows</Label>
                            <Input
                                id='row'
                                min={1}
                                type='number'
                                placeholder='Rows'
                                value={rowInput}
                                onChange={(e) => setRowInput(e.target.value)}
                            />
                        </div>

                        <div className='flex gap-x-2 items-center'>
                            <Label htmlFor='column' className='font-semibold'>Columns</Label>
                            <Input
                                id='column'
                                type='number'
                                min={1}
                                placeholder='Columns'
                                value={colInput}
                                onChange={(e) => setColInput(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={insertCustomTable}>
                            Insert
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}


function FontSizeButton(){
    const {editor} = useEditorStore();

    const currentFontSize = editor?.getAttributes('textStyle').fontSize ? editor.getAttributes('textStyle').fontSize.replace("px", "") : "16";

    const [fontSize, setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(fontSize);
    const [isEditing, setIsEditing] = useState(false);


    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize);
        if(!isNaN(size) && size > 0){
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFontSize(newSize);
            setInputValue(newSize);
            setIsEditing(false);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleInputBlur = () => {
        updateFontSize(inputValue);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands.focus();
        }
    }

    const increment = () => {
        const newSize = parseInt(fontSize) + 1;
        console.log(newSize)
        updateFontSize(newSize.toString());
    }

    const decrement = () => {
        const newSize = parseInt(fontSize) - 1;
        if(newSize > 0){
            updateFontSize(newSize.toString());
        }
    }

    return (
        <div className='flex items-center gap-x-0.5'>
            <button
                className={`h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80`}
                onClick={decrement}
            >
                <MinusIcon className='size-4'/>
            </button>

            {isEditing ? (
                <input 
                    type='text'
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className={`h-7 w-10 text-sm text-center border border-neutral-400  rounded-sm bg-transparent focus:outline-none focus:ring-0`}
                />
            ) : (
                <button
                    onClick={() => {
                        setIsEditing(true);
                        setFontSize(currentFontSize)
                    }}
                    className={`h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent cursor-text`}
                >
                    {currentFontSize}
                </button>
            )}
            <button
                className={`h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80`}
                onClick={increment}
            >
                <PlusIcon className='size-4'/>
            </button>
        </div>
    )
}

function ListButton(){
    const {editor} = useEditorStore();

    const lists = [
        {
            label: "Bullet List", 
            icon: ListIcon, 
            isActive: () => editor?.isActive("bulletList"),
            onClick: () => editor?.chain().focus().toggleBulletList().run()
        },
        {
            label: "Ordered List",  
            icon: ListOrderedIcon,
            isActive: () => editor?.isActive("orderedList"),
            onClick: () => editor?.chain().focus().toggleOrderedList().run()
        }     
    ]

    return (
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={`h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm ${editor?.isActive('highlight') && 'bg-neutral-200/80'}`}
                >
                    <ListIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {lists.map(({label, isActive, onClick, icon:Icon}) => (
                    <button
                        key={label}
                        onClick={onClick}
                        className={`flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 ${isActive() && 'bg-neutral-200/80'}`}
                    >
                        <Icon className='size-4'/>
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
        
    )
}


function AlignButton(){
    const {editor} = useEditorStore();

    const alignments = [
        {label: "Align Left", value: "left", icon: AlignLeftIcon},
        {label: "Align Center", value: "center", icon: AlignCenterIcon},
        {label: "Align Right", value: "right", icon: AlignRightIcon},
        {label: "Align Justify", value: "justify", icon: AlignJustifyIcon}
    ]

    return (
        <div className='flex'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className={`h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm ${editor?.isActive('highlight') && 'bg-neutral-200/80'}`}
                    >
                        <AlignLeftIcon className='size-4'/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                    {alignments.map(({label, value, icon:Icon}) => (
                        <button
                            key={value}
                            onClick={() => {
                                editor?.chain().focus().setTextAlign(value).run();
                            }}
                            className={`flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 ${editor?.isActive({textAlign: value}) && 'bg-neutral-200/80'}`}
                        >
                            <Icon className='size-4'/>
                            <span className='text-sm'>{label}</span>
                        </button>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}


function ImageButton(){
    const {editor} = useEditorStore();
    const [imageUrl, setImageUrl] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function onChange(src: string){
        editor?.chain().focus().setImage({src}).run();
    };

    function onUpload(){
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement ).files?.[0];
            if(file){
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl);
            }
        }

        input.click()
    }

    function handleImageUrlSubmit(){
        if(imageUrl){
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className={`h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm ${editor?.isActive('highlight') && 'bg-neutral-200/80'}`}
                    >
                        <ImageIcon className='size-4'/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className='size-4 mr-2'/>
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className='size-4 mr-2'/>
                        Paste Image URL
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert Image URL</DialogTitle>
                    </DialogHeader>
                    <Input 
                        placeholder='Insert Image URL'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                handleImageUrlSubmit();
                            }
                        }}
                    />
                    <DialogFooter>
                        <Button variant="default" onClick={handleImageUrlSubmit}>
                            Insert
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            
        </>
    )
}

function LinkButton(){
    const {editor} = useEditorStore();
    const [value, setValue] = useState("");

    function onChange(href: string){
        editor?.chain().focus().extendMarkRange("link").setLink({href}).run();
        setValue("");
    }

    return (
        <DropdownMenu onOpenChange={(open) => {
            if(open){
                setValue(editor?.getAttributes("link").href || "")
            }}}>
            <DropdownMenuTrigger asChild>
                <button
                    className={`h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm ${editor?.isActive('highlight') && 'bg-neutral-200/80'}`}
                >
                    <Link2Icon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
                <Input 
                    placeholder='https://example.com'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button 
                    onClick={() => onChange(value)}
                >
                    Apply
                </Button >
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


function HighlightButton(){
    const {editor} = useEditorStore();

    const value = editor?.getAttributes("highlight").color || "#ffffff"

    function onChange(color: ColorResult){
        editor?.chain().focus().setHighlight({color: color.hex}).run();
    }

    return (
        <div className='flex'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className={`h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm ${editor?.isActive('highlight') && 'bg-neutral-200/80'}`}
                    >
                        <HighlighterIcon className='size-4'/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='border p-0'>
                    <SketchPicker 
                        color={value}
                        onChange={onChange}
                        disableAlpha={false}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
            <button
                className={`h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm`}
                onClick={() => {
                    editor?.chain().focus().unsetHighlight().run()
                }}
            >
                <IconHighlightOff className='size-4'/>
            </button>
        </div>
    )
}


function TextColorButton(){
    const {editor} = useEditorStore();

    const value = editor?.getAttributes("textStyle").color || "#000000"

    function onChange(color: ColorResult){
        editor?.chain().focus().setColor(color.hex).run();
    }

    return (
        <div className='flex'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className={`h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm ${editor?.getAttributes("textStyle").color && 'bg-neutral-200/80'}`}
                    >
                        <span className='text-xs'>A</span>
                        <div className='h-0.5 w-full' style={{backgroundColor: value}}/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='border p-0'>
                    <SketchPicker 
                        color={value}
                        onChange={onChange}
                    />
                </DropdownMenuContent>
            </DropdownMenu>

            <button
                className={`h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm`}
                onClick={() => {
                    editor?.chain().focus().unsetColor().run()
                }}
            >
                <IconHighlightOff className='size-4'/>
            </button>
        </div>
    )
}

function HeadingLevelButton(){
    const {editor} = useEditorStore();

    const headings = [
        {label: "Normal", value: 0, fontSize: "16px"},
        {label: "Heading 1", value: 1, fontSize: "32px"},
        {label: "Heading 2", value: 2, fontSize: "24px"},
        {label: "Heading 3", value: 3, fontSize: "20px"},
        {label: "Heading 4", value: 4, fontSize: "18px"},
        {label: "Heading 5", value: 5, fontSize: "16px"},
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={`h-7 w-[100px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm`}
                >
                    <span className='truncate'>
                        {editor?.getAttributes("heading").level ? `Heading ${editor?.getAttributes("heading").level}` : "Normal"}
                    </span>
                    <ChevronDownIcon className='ml-2 size-4 shrink-0'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {headings.map(({label, value, fontSize}) => (
                    <button
                        key={value}
                        style={{fontSize}}
                        className={`flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 ${editor?.getAttributes("heading").level === value && 'bg-neutral-200/80'}`}
                        onClick={() => {
                            if(value === 0){
                                editor?.chain().focus().setParagraph().run()
                            } else {
                                editor?.chain().focus().toggleHeading({level: value as Level}).run()
                            }
                        }}
                    >
                        {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
    
}

function FontFamilyButton(){
    const {editor} = useEditorStore();

    const fonts = [
        {label: "Arial", value: "Arial"},
        {label: "Times New Roman", value: "Times New Roman"},
        {label: "Courier New", value: "Courier New"},
        {label: "Georgia", value: "Georgia"},
        {label: "Verdana", value: "Verdana"},
        {label: "Inter", value: "Inter"},
        {label: "Serif", value: "serif"},
        {label: "Monospace", value: "monospace"},
        {label: "Cursive", value: "cursive"}
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={`h-7 w-[90px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm`}
                >
                    <span className='truncate'>
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className='ml-2 size-4 shrink-0'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {fonts.map(({label, value}) => (
                    <button
                        key={value}
                        className={`flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 ${editor?.getAttributes("textStyle").fontFamily === value && 'bg-neutral-200/80'}`}
                        style={{fontFamily: value}}
                        onClick={() => {
                            editor?.chain().focus().setFontFamily(value).run()
                        }}
                    >
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function ToolbarButton({onClick, isActive, icon:Icon} : ToolbarButtonProps){
    return (
        <button
            className={`text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 ${isActive && 'bg-neutral-200/80'}`}
            onClick={onClick}
        >
            <Icon className='size-4'/>
        </button>
    )
}


function Toolbar() {

    const { editor } = useEditorStore();

    const sections : SectionsType = [
        [
            {
                label: "Undo",
                icon: Undo2Icon,
                onClick: () => editor?.chain().focus().undo().run()
            },
            {
                label: "Redo",
                icon: Redo2Icon,
                onClick: () => editor?.chain().focus().redo().run()
            },
            {
                label: "Spell Check",
                icon: SpellCheckIcon,
                onClick: () => {
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
                }

            }
        ],
        [
            {
                label: "Bold",
                icon: BoldIcon,
                onClick: () => editor?.chain().focus().toggleBold().run(),
                isActive: editor?.isActive('bold')
            },
            {
                label: "Italic",
                icon: ItalicIcon,
                onClick: () => editor?.chain().focus().toggleItalic().run(),
                isActive: editor?.isActive('italic')
            },
            {
                label: "Underline",
                icon: UnderlineIcon,
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
                isActive: editor?.isActive('underline')
            },
            {
                label: "Code",
                icon: CodeIcon,
                onClick: () => editor?.chain().focus().toggleCode().run(),
                isActive: editor?.isActive('code')
            }
        ],
        [
            {
                label: "List Todo",
                icon: ListTodoIcon,
                onClick: () => editor?.chain().focus().toggleTaskList().run(),
                isActive: editor?.isActive('taskList')
            },
            {
                label: "Remove Formatting",
                icon: RemoveFormattingIcon,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
            }
        ]
    ]

    return (
        <div className='py-1 rounded-md min-h-[40px] w-full flex flex-wrap items-center justify-start gap-y-2 gap-x-0.5'>
            {/* <div className='flex gap-x-0.5 items-center justify-center'> */}
                {sections[0].map((item) => (
                    <ToolbarButton 
                        key={item.label}
                        {...item}
                    />
                ))}

                <Separator orientation='vertical' className='h-6 bg-neutral-300'/>

                <FontFamilyButton />

                <Separator orientation='vertical' className='h-6 bg-neutral-300'/>

                <HeadingLevelButton />

                <Separator orientation='vertical' className='h-6 bg-neutral-300'/>

                <FontSizeButton />

                <Separator orientation='vertical' className='h-6 bg-neutral-300'/>

                {sections[1].map((item) => (
                    <ToolbarButton 
                        key={item.label}
                        {...item}
                    />
                ))}

                <Separator orientation='vertical' className='h-6 bg-neutral-300'/>

                <TextColorButton />

                <Separator orientation='vertical' className='h-6 bg-neutral-300'/>

                <HighlightButton />

                <Separator orientation='vertical' className='h-6 bg-neutral-300'/>

                <LinkButton />
                <ImageButton />

                <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
            {/* </div> */}

            {/* <Separator orientation='horizontal' className='bg-neutral-300' /> */}

            {/* <div className='flex gap-x-0.5 items-center justify-center'> */}

                <AlignButton />

                <ListButton />

                {sections[2].map((item) => (
                    <ToolbarButton 
                        key={item.label}
                        {...item}
                    />
                ))}

                <Separator orientation='vertical' className='h-6 bg-neutral-300'/>

                <TableButton />

                <Separator orientation='vertical' className='h-6 bg-neutral-300'/>

                <DownloadButton />

                <Separator orientation='vertical' className='h-6 bg-neutral-300'/>

                <AskAiDialog>
                    <button
                        className='flex gap-x-2 items-center justify-center ring-1 ring-slate-700 px-2 py-0.5 rounded-md ml-2'
                    >
                        <SparklesIcon className='size-4'/>
                        <span className='text-sm'>Ask AI</span>
                    </button>
                </AskAiDialog>

            {/* </div> */}
        </div>
    )
}

export default Toolbar