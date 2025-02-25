import FeatureSection from '@/components/aceternity/feature-section'
import { IconBolt } from '@tabler/icons-react'
import React from 'react'


function Features() {
    return (
        <div className='mt-16 sm:mt-24 w-full'>
            <div id='features' className='px-4 sm:p-6 flex justify-center items-center flex-col gap-6 relative scroll-mt-20'>

                <div className='w-[30%] md:blur-[120px] blur-[70px] rounded-full h-32 absolute bg-primary/50 z-0 sm:top-22 top-10' />

                <div className='relative rounded-full p-[1px] text-sm'>
                    <div className='rounded-full px-3 py-1 bg-primary/[0.1] backdrop-blur-2xl ring-1 ring-gray-700/30 shadow-inner shadow-gray-400 flex gap-x-1 items-center justify-center'>
                        <IconBolt stroke={1.5} className='size-5'/>
                        Features
                    </div>
                </div>

                <h1 className={`text-4xl sm:text-5xl sm:max-w-[900px] text-center font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-700 to-slate-700 bg-opacity-50 py-2`}>
                    <div>
                        Features that will ease your paper reading
                    </div>
                </h1>

                <p className='text-gray-500 font-medium sm:max-w-[550px] text-center'>
                    Our platform is packed with innovative features to help you get the most out of your experience.  
                </p>

                <div className='md:mt-3 md:w-full'>
                    <FeatureSection />
                </div>

            </div>
        </div>
    )
}

export default Features