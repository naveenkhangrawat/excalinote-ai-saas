
import React from 'react'
import dynamic from "next/dynamic";


const ExcalidrawWrapper = dynamic(
  async () => (await import("../_components/ExcalidrawWrapper")).default,
  {
    ssr: false,
  },
);

function Canvas() {
    return (
        <div className='w-full h-[630px]'>
            <ExcalidrawWrapper />
        </div>
    )
}

export default Canvas