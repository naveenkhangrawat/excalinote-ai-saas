"use client";

import { useQuery } from 'convex/react';
import React, { Suspense } from 'react'
import { api } from '../../../../convex/_generated/api';
import { isSubscriptionCanceled } from '@/lib/helpers';
import BillingCard from './_components/BillingCard';
import { useAuth } from '@clerk/nextjs';
import FullScreenLoader from '@/components/fullscreen-loader';


function BillingPage() {

    const {userId} = useAuth();
    
    const subscriptionPlan = useQuery(api.subscriptions.getSubscription, {
        userId: userId || ""
    })

    let isSubscriptionCanceledPromise: Promise<boolean>;
    if(subscriptionPlan){
        isSubscriptionCanceledPromise = isSubscriptionCanceled({
            stripeSubscriptionId: subscriptionPlan?.stripeSubscriptionId ?? "",
            isSubscribed: subscriptionPlan?.isSubscribed ?? false
        })
    }

    if(subscriptionPlan === undefined){
        return <FullScreenLoader label='Loading...'/>
    }

    return (
        <Suspense fallback={<FullScreenLoader label='Loading...'/>}>
            <BillingCard 
                subscriptionPlan={subscriptionPlan} 
                isSubscriptionCanceledPromise={isSubscriptionCanceledPromise!}
            />
        </Suspense>

    )
}

export default BillingPage