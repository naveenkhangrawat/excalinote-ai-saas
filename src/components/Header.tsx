import { NAV_LINKS } from '@/lib/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import uuid4 from 'uuid4'

function Header() {

    return (
        <nav className='h-[64px] w-full shadow-md inset-x-0'>

            <div className='mx-auto h-full w-full max-w-screen-xl flex justify-between items-center py-4'>

                <div className='flex items-center justify-between'>
                    <Link href={'/'} className='flex gap-3 items-center'>
                        <Image src={'/logo.svg'} alt='Logo' width={36} height={36} />
                        <h3 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800'>Excalinote</h3>
                    </Link>
                </div>


                <div className='flex items-center justify-center gap-x-2'>
                    {NAV_LINKS.map((item) => (
                        <Link
                            href={item.link}
                            key={uuid4()}
                            className="text-foreground/70 hover:text-foreground transition-all duration-500 hover:bg-gray-300/40 rounded-md px-4 py-2 text-sm font-medium"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className='flex items-center gap-x-4'>
                    <SignedOut>
                        <Link href="/sign-in">
                            <button className="px-4 py-2 rounded-md font-medium border border-neutral-300 bg-neutral-100 text-neutral-800 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                                Sign in
                            </button>
                        </Link>
                        

                        <Link href={"/sign-up"}>
                            <button className="px-4 py-2 text-sm bg-primary text-white rounded-md font-medium transform hover:-translate-y-1 transition duration-400">
                                Sign up
                            </button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/workspace">
                            <button className="px-4 py-2 rounded-md font-medium border border-neutral-300 bg-neutral-100 text-neutral-800 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                                Workspace
                            </button>
                        </Link>
                        

                        <Link href={"/workspace/billing"}>
                            <button className="px-4 py-2 text-sm bg-primary text-white rounded-md font-medium transform hover:-translate-y-1 transition duration-400 mr-2">
                                Billing
                            </button>
                        </Link>

                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    )
}

export default Header