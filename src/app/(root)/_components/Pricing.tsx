"use client";

import { Button } from '@/components/ui/button'
import { PRICING_PLANS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Check, Gem, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import uuid4 from 'uuid4'

function Pricing() {

    const router = useRouter();

    return (
        <div className='mt-16 sm:mt-24 w-full'>
            <div id="pricing" className='mt-16 mb-16 px-4 sm:p-6 relative flex flex-col gap-6 justify-start items-center scroll-mt-20'>
                <div className='w-[30%] md:blur-[120px] blur-[70px] rounded-full h-32 absolute bg-primary/50 z-0 sm:top-22 top-10' />

                <div className='relative rounded-full p-[1px] text-sm'>
                    <div className='rounded-full px-3 py-1 bg-primary/[0.1] backdrop-blur-2xl ring-1 ring-gray-700/30 shadow-inner shadow-gray-400 flex gap-x-1 items-center justify-center'>
                        <Gem className='size-4'/>
                        Pricing
                    </div>
                </div>

                <h1 className={`text-4xl sm:text-5xl sm:max-w-[900px] text-center font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-700 to-slate-700 bg-opacity-50 py-2`}>
                    <div>
                        Unlock AI-Powered Productivity – A Plan for Every User
                    </div>
                </h1>

                <p className='text-gray-500 font-medium sm:max-w-[550px] text-center'>
                    Experience all the benefits of our platform. Select a plan that suits your needs and take your productivity to new heights. 
                </p>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 w-full max-w-[800px]'>
                    {PRICING_PLANS.map((plan) =>(
                        <div 
                            key={uuid4()}
                            className={cn( 
                            "relative rounded-xl backdrop-blur-xl p-8 flex flex-col ring-1 ring-gray-700/30", 
                            plan.popular && "bg-black/[0.01] ring-2 ring-primary",
                            !plan.popular && "bg-black/[0.01]",
                        )}>
                            {plan.popular && (
                                <div className='absolute rounded-full px-4 py-2 -top-[20px] bg-primary text-primary-foreground text-sm left-[50%] translate-x-[-50%]'>
                                    Upgrade now
                                </div>
                            )}
                            <div className='mb-8'>
                                <h3 className="text-3xl font-medium mb-2">{plan.name}</h3>
                            </div>

                            <div className="flex items-baseline gap-2 mb-8">
                                <span className="text-4xl font-medium">$</span>
                                <span className="text-7xl font-medium">
                                    {plan.price.amount}
                                </span>
                                <span className="text-muted-foreground">/month</span>
                            </div>

                            <div className='flex-1'>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={uuid4()} className="flex items-center gap-3">
                                            {feature.included ? (
                                                    <Check className="w-5 h-5 text-primary" />
                                                ) : (
                                                    <X className="w-5 h-5 text-muted-foreground" />
                                                )}
                                                <span className={cn(
                                                    "text-sm",
                                                    feature.included ? "text-foreground" : "text-muted-foreground"
                                                )}>
                                                    {feature.text}
                                                </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button 
                                variant={plan.popular ? "default" : "outline"} className="w-full"
                                onClick={() => {
                                    if(plan.popular){
                                        router.push("/pricing")
                                    } else {
                                        router.push("/workspace");
                                    }
                                }}
                            >
                                Get Started
                            </Button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Pricing