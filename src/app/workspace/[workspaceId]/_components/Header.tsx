
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import SwitchButton from './SwitchButton'
import SaveButton from './SaveButton'
import { IconCloudCheck } from '@tabler/icons-react'
import { useEditorStore } from '@/store/useEditorStore'

function Header({title }: {title: string}) {

    const {isSavingOnDelay} = useEditorStore();

    return (
        <nav className='flex items-center justify-center h-16 w-full p-4 shadow-md mb-1 print:hidden'>
            <div className='w-full flex items-center justify-between'>
                <Link href={'/'} className='flex gap-3 items-center'>
                    <Image src={'/logo.svg'} alt='Logo' width={36} height={36} />
                    <h3 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800'>Excalinote</h3>
                </Link>

                <SwitchButton />
            </div>


            <h3 className='relative font-semibold text-center w-full line-clamp-1 grow-0'>
                {title}
                
                {isSavingOnDelay && (
                    <span className='absolute top-1 ml-2'>
                        <IconCloudCheck className='size-4 animate-pulse' color='#4d7c0f'/>
                    </span>
                )} 
            </h3>

            <div className='w-full'>
                <SaveButton />
            </div>
        </nav>
    )
}

export default Header