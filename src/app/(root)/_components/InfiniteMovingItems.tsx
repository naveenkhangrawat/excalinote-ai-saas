import React from 'react'
import Images from './Images'
import AnimationContainer from './AnimationContainer'
import Marquee from '@/components/ui/marquee'

function InfiniteMovingItems() {

    const companies = [
        Images.comp1, 
        Images.comp2, 
        Images.comp3,
        Images.comp4,
        Images.comp5,
        Images.comp6,
    ]

    return (
        <div className='mt-16 sm:mt-28 w-full'>
            <AnimationContainer animation="fadeUp" delay={1}>
                <div className='flex flex-col items-center gap-4 py-4'>
                    <p className="text-sm md:text-lg text-muted-foreground">
                        Companies that trust us
                    </p>
                    <div className='w-full relative flex max-w-screen'>
                        <Marquee className="[--duration:40s] select-none [--gap:4rem]">
                            {[...Array(10)].map((_, index) => (
                                <div key={index} className="flex items-center justify-center text-muted-foreground h-16">
                                    {companies[index % companies.length]({ className: "w-auto h-8" })}
                                </div>
                            ))}
                        </Marquee>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#f4f4f5] z-40"></div>
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#f4f4f5] z-40"></div>
                    </div>
                </div>
            </AnimationContainer>
        </div>
    )
}

export default InfiniteMovingItems