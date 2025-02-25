import Image from 'next/image'
import React from 'react'


function ApplicationBanner() {

    return (
        <div className='md:mt-16 sm:w-full w-[700px] flex justify-center items-center relative sm:ml-0 ml-[-80px]'>
            <div className='w-[75%] md:blur-[100px] blur-[80px] rounded-full h-32 absolute bg-primary z-0 top-[30px]' />
            <div className="w-full max-w-[1250px] sm:w-[95%] rounded-xl p-4 ring-1 ring-gray-700/30 backdrop-blur-xl bg-black/5">
                <div className='rounded-xl overflow-hidden'>
                    <Image src={'/application-banner.jpeg'} alt='Application banner' width={1250} height={600} className='w-full h-full object-cover' />
                </div>
            </div>
        </div>
    )
}

export default ApplicationBanner