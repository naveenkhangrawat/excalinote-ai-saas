

import React from 'react'


interface PdfViewerProps {
    documentUrl: string
}

function PdfViewer({documentUrl}: PdfViewerProps) {

    return (
        // <iframe 
        //     src={`https://docs.google.com/viewer?url=${documentUrl}&embedded=true`}
        //     className='w-full h-full' 
        // />
        <iframe src={documentUrl} className='pdfViewer w-full h-full' />

    )
}

export default PdfViewer