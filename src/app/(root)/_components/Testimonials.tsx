
import Marquee from '@/components/ui/marquee'
import { TESTIMONIALS } from '@/lib/constants'
import { User, Users } from 'lucide-react'
import React from 'react'
import uuid4 from 'uuid4'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from '@/lib/utils'

type CardProps = React.ComponentProps<typeof Card>
type CustomCardProps =  CardProps & {
    name: string,
    message: string,
}

const CustomCard: React.FC<CustomCardProps> = ({name, message, className, ...props}) => {

    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
                <div className='flex items-start gap-4'>
                    <div className='rounded-full h-10 w-10 ring-1 ring-gray-500/50 flex items-center justify-center'>
                        <User />
                    </div>
                    <div className='flex flex-col'>
                        <CardTitle className='text-foreground'>{name}</CardTitle>
                        <CardDescription>@{name.toLocaleLowerCase()}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='grid gap-4'>
                <p className='text-zinc-500 text-sm'>{message}</p>
            </CardContent>
        </Card>
    )
}


function Testimonials() {

    return (
        <div className='mt-16 sm:mt-24 w-full'>
            <div id='testimonials' className='px-4 sm:p-6 flex justify-center items-center flex-col gap-6 relative scroll-mt-20'>

                <div className='w-[30%] md:blur-[120px] blur-[70px] rounded-full h-32 absolute bg-primary/50 z-0 sm:top-22 top-10' />

                <div className='relative rounded-full p-[1px] text-sm'>
                    <div className='rounded-full px-3 py-1 bg-primary/[0.1] backdrop-blur-2xl ring-1 ring-gray-700/30 shadow-inner shadow-gray-400 flex gap-x-1 items-center justify-center'>
                        <Users className='size-4'/>
                        Testimonials
                    </div>
                </div>

                <h1 className={`text-4xl sm:text-5xl sm:max-w-[900px] text-center font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-700 to-slate-700 bg-opacity-50 py-2`}>
                    <div>
                        Don&apos;t take our word for it. Take theirs
                    </div>
                </h1>

                <p className='text-gray-500 font-medium sm:max-w-[550px] text-center'>
                    We are very proud of the service we provide and stand by every product we carry. Read our testimonials from our happy customers.  
                </p>

                <div className='w-full relative flex max-w-screen mt-10'>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#f4f4f5] z-40" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#f4f4f5] z-40" />

                    <div className='flex flex-col gap-y-4 w-full'>
                        {[...Array(2)].map((_, index) => (
                            <Marquee 
                                key={uuid4()} 
                                pauseOnHover 
                                className="[--gap:1.5rem] [--duration:200s]"
                                reverse={index===1}
                            >
                                {TESTIMONIALS.map((testimonial) => (
                                    <CustomCard 
                                        key={uuid4()} 
                                        name={testimonial.name}
                                        message={testimonial.message}
                                        className='shrink-0 rounded-xl backdrop-blur-lg bg-gradient-to-t from-chart-2/[0.25] to-background'
                                    />
                                ))}
                            </Marquee>
                        ))}
                    </div>
                </div>
                </div>
        </div>
    )
}

export default Testimonials