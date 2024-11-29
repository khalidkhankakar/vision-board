import { Skeleton } from '@/components/ui/skeleton'
import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <div className='h-full w-full flex items-center justify-center bg-slate-200 relative'>
            <Loader className='h-5 w-5 animate-spin' />
            <Skeleton className='absolute h-12 top-2 left-3 shadow-md rounded-md bg-white w-[300px] py-2 px-4' />

            <div className='absolute top-[30%] h-1/3 w-12 left-2 space-y-2 py-2 px-4'>
            
                <Skeleton className="bg-white rounded-md h-28 w-12 " />
                <Skeleton className="bg-white rounded-md  h-16 w-12" />
            </div>

            <Skeleton className='absolute h-12 top-2 right-3 shadow-md rounded-md bg-white py-2 px-4 w-[150px]' />
        </div>
    )
}

export default Loading
