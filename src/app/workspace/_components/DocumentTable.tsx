"use client";

import { usePaginatedQuery } from 'convex/react';
import React from 'react'

import { useAuth } from '@clerk/nextjs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Loader2, LoaderIcon } from 'lucide-react';
import DocumentMenu from './DocumentMenu';
import { format, formatDistance } from 'date-fns'
import { useRouter } from 'next/navigation';
import { api } from '../../../../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { useSearchParam } from '@/hooks/use-search-param';

function DocumentTable() {

    const {userId} = useAuth();

    const [search] = useSearchParam();

    const {results, status, loadMore, isLoading} = usePaginatedQuery(api.documents.getPaginatedDocuments, {
        userId: userId || "",
        searchQuery: search || undefined,
    }, {initialNumItems: 5})

    const router = useRouter();

    return (
        <>
        {isLoading && !(status === "LoadingMore") ? (
            <div className='flex items-center justify-center h-24'>
                <LoaderIcon className='size-5 animate-spin text-muted-foreground'/>
            </div>
        ) : (
            <Table>
                <TableHeader>
                    <TableRow className='hover:bg-transparent border-none'>
                        <TableHead className='md:w-[60%]'>Name</TableHead>
                        {/* <TableHead className='border border-black'>&nbsp;</TableHead>
                        <TableHead>&nbsp;</TableHead> */}
                        <TableHead className='hidden md:table-cell'>Created At</TableHead>
                        <TableHead className='hidden md:table-cell'>Edited</TableHead>
                    </TableRow>
                </TableHeader>
                {results.length === 0 ? (
                    <TableBody>
                        <TableRow className='hover:bg-transparent'>
                            <TableCell colSpan={3} className='h-24 text-center text-muted-foreground'>
                                No documents found
                            </TableCell>
                        </TableRow>
                    </TableBody> 
                ) : (
                    <TableBody>
                        {results.map((document) => (
                            <TableRow
                                key={document._id}
                                className='h-[50px] cursor-pointer hover:bg-gray-100/80 transition-all'
                                onClick={() => {
                                    router.push(`/workspace/${document.documentId}`)
                                }}
                            >
                                <TableCell>
                                    <div className='font-semibold line-clamp-1'>
                                        {document.title}
                                    </div>
                                </TableCell>
                                <TableCell className='text-muted-foreground text-[12px] text-nowrap hidden md:table-cell'>
                                    {format(new Date(document._creationTime), "MMM dd, yyyy")} 
                                </TableCell>
                                <TableCell className='text-muted-foreground text-[12px] text-nowrap hidden md:table-cell'>
                                    {formatDistance(new Date(document.lastEdited), new Date(Date.now()), {
                                        addSuffix: true
                                    })}
                                </TableCell>
                                <TableCell className='flex justify-end'>
                                    <DocumentMenu 
                                        id={document._id} 
                                        title={document.title} 
                                        storageId={document.storageId}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                )}
            </Table>
        )}

        {results.length !== 0 && (
            <div className='flex items-center justify-center mt-10'>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => loadMore(5)}
                    disabled={status !== "CanLoadMore"}
                >
                    {status === "CanLoadMore" ? "Load more" : status === "LoadingMore" ? (
                        <>
                            <Loader2 className='size-4 animate-spin'/>
                            Loading...
                        </>
                    ) : "End of results"}
                </Button>
            </div>
        )}
        </>
    )
}

export default DocumentTable
