"use client";


import React, { use, useTransition } from 'react'

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PRICING_PLANS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { createBillingPortalSession, createCheckoutSession } from '@/lib/actions/stripe';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { getSubscription } from '../../../../../convex/subscriptions';
import Header from '@/components/Header';


interface BillingCardProps {
    subscriptionPlan: Awaited<ReturnType<typeof getSubscription>>
    isSubscriptionCanceledPromise: Promise<boolean>
}

function BillingCard({subscriptionPlan,isSubscriptionCanceledPromise}: BillingCardProps) {
        
    const isCanceled = use(isSubscriptionCanceledPromise)

    const plan = PRICING_PLANS.find((plan) => plan.price.priceIds?.test === subscriptionPlan?.stripePriceId);

    const [isLoading, startTransition] = useTransition();

    const onClickHandler = () => {
        startTransition(async () => {
            if(subscriptionPlan.isSubscribed && subscriptionPlan.stripeCustomerId){
                await createBillingPortalSession({customerId: subscriptionPlan.stripeCustomerId});
                return;
            } else {
                await createCheckoutSession();
                return;
            }
        })
    }


    return (
        <div>
            <Header />
            <div className='max-w-5xl mx-auto pt-28 px-5 lg:px-0'>
                <Card>
                    <CardHeader>
                        <CardTitle>Subscription Plan</CardTitle>
                        <CardDescription>
                            You are currently on the <strong className='text-black'>{plan?.name}</strong> plan
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className='flex flex-col items-start gap-y-2 md:flex-row md:justify-between md:gap-x-0'>
                        <Button
                            className='disabled:pointer-events-none'
                            disabled={isLoading}
                            onClick={onClickHandler}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className='animate-spin'/>
                                    Processing...
                                </>
                            ) : (
                                subscriptionPlan.isSubscribed ? (
                                    "Manage Subscription"
                                ) : (
                                    "Upgrade to Pro"
                                )
                            )}
                        </Button>

                        {subscriptionPlan.isSubscribed && (
                            <p className='rounded-full text-xs font-medium'>
                                {isCanceled ? "Your plan will be canceled on " : "Your plan renews on "}
                                {format(new Date(subscriptionPlan.stripeCurrentPeriodEnd!), "MMM dd, yyyy")} 
                            </p>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
        
    )
}

export default BillingCard