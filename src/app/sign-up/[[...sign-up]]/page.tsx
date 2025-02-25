
import { SignUp } from '@clerk/nextjs'
import React from 'react'

function SignUpPage() {
    return (
        <div className='w-screen min-h-screen flex items-center justify-center'>
            <SignUp />
        </div>
    )
}

export default SignUpPage