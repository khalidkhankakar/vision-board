'use client'
import { Button } from '@/components/ui/button'
import { getBoard } from '@/lib/action'


import Link from 'next/link'
import useSWR from 'swr'
import Tip from '@/components/shared/tooltip'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeftIcon } from 'lucide-react'

const Info = ({ id }: { id: string }) => {
  const fetcher = () => getBoard(id);
  const { data, isLoading } = useSWR('getBoard', fetcher)

  if (isLoading) return <Skeleton className='absolute left-3 top-3 h-12 w-[min(300px,calc(100vw-96px))] rounded-lg bg-[var(--color-card)] px-4 py-2 shadow-sm' />


  return (
    <div className='vision-panel absolute left-3 top-3 z-20 flex max-w-[calc(100vw-96px)] items-center gap-x-2 rounded-lg px-2 py-1'>
      <Tip label={'Back to boards'} side='bottom'>
        <Button className='flex h-10 w-12 items-center justify-center rounded-md px-1 hover:bg-[var(--color-paper-2)]' variant={"board"} asChild>
          <Link href={'/dashboard'}>
           <ArrowLeftIcon />
          </Link>
        </Button>
      </Tip>
      <Button className='max-w-[46vw] truncate rounded-md px-3 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-paper-2)]' variant={'board'}>{data?.title}</Button>
    </div>
  )
}

export default Info
