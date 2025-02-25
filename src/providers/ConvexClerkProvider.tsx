"use client";

import { ClerkLoaded, ClerkLoading, ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import FullScreenLoader from "@/components/fullscreen-loader";


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClerkProvider({children}: {children:React.ReactNode}){
    return (
        <ClerkProvider publishableKey={process.env.CLERK_SECRET_KEY!}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <ClerkLoading>
                    <FullScreenLoader label="Auth loading..."/>
                </ClerkLoading>
                <ClerkLoaded>
                    {children}
                </ClerkLoaded>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}

