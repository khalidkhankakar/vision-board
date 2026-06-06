'use client'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Star } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'


const OrgSidebarNavigation = () => {
  const searchParams = useSearchParams()
 
  const favorite = searchParams.get('favorite')
  return (
    <div className='flex flex-col gap-y-2'>
        <Button variant={!favorite ? 'secondary' : 'ghost'} className='h-11 cursor-pointer justify-start rounded-lg border border-transparent px-3 text-[var(--color-ink)] shadow-none hover:border-[var(--color-rule)] hover:bg-[var(--color-paper-2)] data-[state=open]:bg-[var(--color-paper-2)]' asChild>
            <Link href={'/dashboard'} className='flex items-center gap-x-2'>
            <LayoutDashboard className='h-4 w-4' />
            <span className='text-sm font-medium'>Team Boards</span>
            </Link>
        </Button>
      
        <Button variant={favorite ? 'secondary' : 'ghost'} className='h-11 cursor-pointer justify-start rounded-lg border border-transparent px-3 text-[var(--color-ink)] shadow-none hover:border-[var(--color-rule)] hover:bg-[var(--color-paper-2)]' asChild>
            <Link href={{
                pathname:"/dashboard",
                query:{favorite:true}
            }} className='flex items-center gap-x-2'>
            <Star className='h-4 w-4' />
            <span className='text-sm font-medium'>Favorites</span>
            </Link>
        </Button>
    </div>
  )
}

export default OrgSidebarNavigation
