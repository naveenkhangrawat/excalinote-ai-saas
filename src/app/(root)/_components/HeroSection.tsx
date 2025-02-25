import React from 'react'
import Wrapper from './Wrapper'
import { Button } from '@/components/ui/button'
import { TypewriterEffectSmooth } from '@/components/aceternity/typewriter-effect'
import { AnimatedTooltip, people } from '@/components/aceternity/animated-tooltip'
import Link from 'next/link'



function HeroSection() {

    const words = [ 
        {
            text: "power",
            className: "text-primary text-4xl sm:text-6xl"
        },
        {
            text: "of",
            className: "text-primary text-4xl sm:text-6xl"
        },
        {
            text: "AI",
            className: "text-primary text-4xl sm:text-6xl"
        }
    ]

    return (
        <Wrapper className="pt-24 lg:pt-44 relative min-h-screen w-full h-full flex-1">
            <div className='flex flex-col gap-6 justify-center items-center'>

                <div className='relative rounded-full p-[1px] text-sm'>
                    <div className='rounded-full px-3 py-1 bg-primary/[0.1] backdrop-blur-2xl ring-1 ring-gray-700/30 shadow-inner shadow-gray-400'>
                        Discover our latest AI powered feature
                    </div>
                </div>

                
                <h1 className={`text-4xl sm:text-6xl sm:max-w-[900px] text-center font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-700 to-slate-700 bg-opacity-50 py-2`}>
                    <div>
                        Read papers and make notes on the go with the <TypewriterEffectSmooth words={words} className='inline-flex'/>
                    </div>
                </h1>
                <p className='text-gray-500 font-medium sm:max-w-[550px] text-center'>
                    Elevate your paper reading and note-taking with AI-powered features.
                    Excalinote is a powerful tool that lets you make notes, sketch diagrams and use AI to answer any question from your PDF  
                </p>
                <div className='flex gap-x-5'>
                    <Link href={"/workspace"}>
                        <Button className='py-6 px-10'>
                            Start for free
                        </Button>
                    </Link>
                    <Button className='py-6 px-10'>
                        How it works
                    </Button>
                </div>

                <div className='flex flex-col gap-y-2 items-center justify-center w-[300px]'>
                    <div className='flex items-center justify-center w-full'>
                        <AnimatedTooltip items={people}/>
                    </div>
                    <p className='text-gray-500 text-sm'>Trusted by developers</p>
                </div>

            </div>
        </Wrapper>
    )
}

export default HeroSection