import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton';
import { useOrganization, useUser } from '@clerk/nextjs';
import { Plus } from 'lucide-react'
import { revalidateBoardsCache } from '@/lib/cache-utils'
import { useState } from 'react';


const NewBoard = () => {

  const { organization } = useOrganization()
  const { user } = useUser()
  const [isCreating, setIsCreating] = useState(false)

  const handleClick = async () => {
    try {
      if (!organization || !user) return
      
      setIsCreating(true)
      
      const res = await fetch(`/api/board`, {
        method: 'POST',
        body: JSON.stringify({
          authorId: user.id,
          authorName: user.firstName || 'User',
          orgId: organization.id,
          title: `New Board - ${new Date().toLocaleDateString()}`
        })
      })
      
      if (!res.ok) throw new Error('Failed to create board')
      
      await res.json()
      
      // Immediately revalidate boards cache after creation
      revalidateBoardsCache(organization.id)
      
      setIsCreating(false)
    } catch (e) {
      console.error(e)
      setIsCreating(false)
    }
  };


  return (
    <Button onClick={handleClick} disabled={isCreating} className='group flex aspect-[5/4] h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[var(--color-ink)] bg-[var(--color-accent)] p-4 text-[var(--color-accent-ink)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--color-accent)]/90 disabled:cursor-wait sm:aspect-[5/5]'>
      <span className='flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-ink)] bg-[var(--color-card)] text-[var(--color-ink)] shadow-sm transition group-hover:scale-105'>
        <Plus className='h-6 w-6' />
      </span>
      <span className='mt-4 text-sm font-semibold'>{isCreating ? 'Creating...' : 'Create Board'}</span>
      <span className='mt-1 max-w-36 text-center text-xs font-normal text-[var(--color-ink)]/80'>Start a shared canvas for this team.</span>
    </Button>
  )
}

export default NewBoard


NewBoard.Skeleton = function BoardCardSkeleton() {
  return (
    <Skeleton className='flex aspect-[5/4] cursor-not-allowed items-center justify-center rounded-lg bg-[var(--color-paper-2)] sm:aspect-[5/5]' />

  )
}
