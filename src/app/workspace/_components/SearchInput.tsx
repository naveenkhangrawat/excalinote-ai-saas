"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSearchParam } from '@/hooks/use-search-param';
import { SearchIcon, XIcon } from 'lucide-react'
import React, { useState } from 'react'

function SearchInput() {

    const [search, setSearch] = useSearchParam();
    const [value, setValue] = useState(search);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setValue(e.target.value);
    }

    function handleClear(){
        setValue("");
        setSearch("");
    }

    async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setSearch(value);
    }

    return (
        <div className='flex items-center justify-center w-4/6'>
            <form 
                className='relative max-w-[720px] w-full'
                onSubmit={onSubmitHandler}
            >
                <Input
                    value={value}
                    onChange={handleChange}
                    placeholder='Search'
                    className='md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#f0f4f8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white'
                />
                <Button
                    type='submit'
                    variant="ghost"
                    size="icon"
                    className='absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full'

                >
                    <SearchIcon />
                </Button>
                {value && (
                    <Button
                        onClick={handleClear}
                        type='button'
                        variant="ghost"
                        size="icon"
                        className='absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full'

                    >
                        <XIcon />
                    </Button>
                )}
            </form>
        </div>
    )
}

export default SearchInput