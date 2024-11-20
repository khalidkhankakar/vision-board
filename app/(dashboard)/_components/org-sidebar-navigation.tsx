'use client'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Star } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'


const OrgSidebarNavigation = () => {
  const searchParams = useSearchParams()
 
  const favorite = searchParams.get('favorite')
  return (
    <div className='flex flex-col gap-y-5'>
        <Button variant={!favorite ? 'secondary' : 'ghost'} className='cursor-pointer' asChild>
            <Link href={'/'} className='flex py-5 gap-x-2 items-center'>
            <LayoutDashboard />
            <span className='text-lg font-semibold'>Team Board</span>
            </Link>
        </Button>
      
        <Button variant={favorite ? 'secondary' : 'ghost'} className='cursor-pointer' asChild>
            <Link href={{
                pathname:"/",
                query:{favorite:true}
            }} className='flex py-5  gap-x-2 items-center'>
            <Star />
            <span className='text-lg font-semibold'>Favorite Boards</span>
            </Link>
        </Button>
    </div>
  )
}

export default OrgSidebarNavigation
