'use client'
import { Button } from '@/components/ui/button'
import { getBoard } from '@/lib/action'

import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import Tip from '@/components/shared/tooltip'
import { Skeleton } from '@/components/ui/skeleton'

const Info = ({ id }: { id: string }) => {
  const fetcher = () => getBoard(id);
  const { data, isLoading } = useSWR('getBoard', fetcher)

  if (isLoading) return <Skeleton className='absolute h-12 top-2 left-3 shadow-md rounded-md bg-white w-[300px] py-2 px-4' />


  return (
    <div className='absolute top-2  flex items-center gap-x-3 left-3 shadow-md rounded-md bg-white py-1 px-2'>
      <Tip label={'Back to boards'} side='bottom'>
        <Button className='px-0  flex items-center justify-center' variant={"board"} asChild>
          <Link href={'/'}>
            <Image src={'/logo.png'} width={100} height={250} className="h-full w-full" alt="logo" priority />
          </Link>
        </Button>
      </Tip>
      <Button variant={'board'}>{data?.title}</Button>
    </div>
  )
}

export default Info
