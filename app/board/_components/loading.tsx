import { Skeleton } from '@/components/ui/skeleton'
import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <div className='relative flex h-full w-full items-center justify-center bg-[var(--color-canvas)]'>
            <Loader className='h-5 w-5 animate-spin text-[var(--color-accent)]' />
            <Skeleton className='absolute left-3 top-3 h-12 w-[min(300px,calc(100vw-96px))] rounded-lg bg-[var(--color-card)] px-4 py-2 shadow-sm' />

            <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-auto sm:left-3 sm:top-1/2 sm:-translate-x-0 sm:-translate-y-1/2 sm:flex-col'>
            
                <Skeleton className="h-11 w-40 rounded-lg bg-[var(--color-card)] sm:h-64 sm:w-11" />
                <Skeleton className="h-11 w-20 rounded-lg bg-[var(--color-card)] sm:w-11" />
            </div>

            <Skeleton className='absolute right-3 top-3 h-12 w-[132px] rounded-lg bg-[var(--color-card)] px-4 py-2 shadow-sm' />
        </div>
    )
}

export default Loading
