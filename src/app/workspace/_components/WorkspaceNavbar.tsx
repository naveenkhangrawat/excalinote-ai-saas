
import React from 'react'
import SearchInput from './SearchInput';
import { SignedIn, UserButton } from '@clerk/nextjs';

function WorkspaceNavbar() {
    
    return (
        <nav className='flex items-center justify-end pr-3 gap-x-1 h-full w-full'>
            <SearchInput />
            
            <SignedIn>
                <UserButton />
            </SignedIn>
        </nav>
    )
}

export default WorkspaceNavbar;