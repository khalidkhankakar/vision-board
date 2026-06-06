'use client'
import Image from 'next/image'
import CardMenuDropdown from './card-menu-dropdown'
import BoardFooter from './board-footer'
import { useAuth, useOrganization } from '@clerk/nextjs'
import useSWRMutation from 'swr/mutation'
import { handleFavAndUnFav } from '@/lib/query/board.queies'
import { revalidateBoardsCache } from '@/lib/cache-utils'
import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Ellipsis } from 'lucide-react'

interface BoardCardProps {
  id: string
  authorName: string
  createdAt: Date
  title: string
  isFavorite: boolean
  authorId: string
}

const BoardCard = ({
  id,
  authorName,
  createdAt,
  title,
  authorId,
  isFavorite

}: BoardCardProps) => {

  const { userId } = useAuth()
  const [isFav, setIsFav] = useState<boolean>(isFavorite)
  const endPoint = isFav ? `api/board/unfavorite/${id}` : `api/board/favorite/${id}`
  const { organization } = useOrganization()
  const { trigger } = useSWRMutation(endPoint, handleFavAndUnFav)


  const handleReaction = () => {
    setIsFav((prev) => !prev)
    if (!id || !userId || !organization) return
    trigger({ userId, boardId: id, orgId: organization.id })
    // Immediately revalidate boards cache after toggling favorite
    revalidateBoardsCache(organization.id)
    // TODO: show the toast
  }

  return (
    <div className='group relative flex aspect-[5/4] flex-col overflow-hidden rounded-lg border border-[var(--color-rule)] bg-[var(--color-card)] p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] sm:aspect-[5/5]'>
      <div className='vision-canvas-bg relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-md border border-[var(--color-rule)] p-4'>
        <div className='absolute left-5 top-5 h-12 w-24 rounded-md border border-[var(--color-rule)] bg-[var(--color-card)] shadow-sm' />
        <div className='absolute bottom-7 right-6 h-16 w-20 rounded-md border border-[var(--color-ink)] bg-[var(--color-accent)] shadow-sm' />
        <Image src={'/board.svg'} width={220} height={220} alt="board" className='relative h-full max-h-40 w-full object-contain opacity-80 transition group-hover:scale-[1.02]' />
      </div>
      <div className='absolute right-3 top-3 z-50'>
        <CardMenuDropdown
          title={title}
          id={id}
        >
          <button className='flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-rule)] bg-[var(--color-card)]/95 text-[var(--color-ink-2)] shadow-sm transition hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]'>
            <Ellipsis className='h-4 w-4' />
          </button>
        </CardMenuDropdown>
      </div>

      <BoardFooter

        id={id}
        title={title}
        authorName={userId === authorId ? 'You' : authorName}
        createdAt={createdAt}
        isFavorite={isFav}
        handleClick={handleReaction}

      />

    </div>
  )
}

export default BoardCard


BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
      <Skeleton className='group aspect-[5/4] rounded-lg bg-[var(--color-paper-2)] sm:aspect-[5/5]' />
  )
}


