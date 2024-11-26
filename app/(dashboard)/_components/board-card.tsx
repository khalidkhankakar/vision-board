'use client'
import Image from 'next/image'
import CardMenuDropdown from './card-menu-dropdown'
import BoardFooter from './board-footer'
import { useAuth, useOrganization } from '@clerk/nextjs'
import useSWRMutation from 'swr/mutation'
import { handleFavAndUnFav } from '@/lib/query/board.queies'
import { mutate } from 'swr'
import { useState } from 'react'

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

  const {userId} = useAuth()
  const [isFav, setIsFav] = useState<boolean>(isFavorite)
  const endPoint = isFav ? `api/board/unfavorite/${id}` : `api/board/favorite/${id}`
  const { organization} = useOrganization()
  const { trigger } = useSWRMutation(endPoint, handleFavAndUnFav)


  const handleReaction = () => {
    setIsFav((prev) => !prev)
    if(!id || !userId || !organization) return
    trigger({ userId, boardId: id, orgId: organization.id })
    // TODO: show the toast
    // .catch((e) => {console.error(e)
    //   setIsFav(false)
    // })
    // .then(() => console.log('done'))
    mutate(`api/board/${organization.id}`)
  }

  return (
    <div className='group aspect-[5/5] pb-0 p-3 bg-blue-50 rounded-lg relative'>
      <Image src={'/board.svg'} width={100} height={100} alt="board" className='object-contain w-full' />
      <div className='absolute top-2 right-2 z-50'>
        <CardMenuDropdown
          title={title}
          id={id}
        />
      </div>

      <BoardFooter

        id={id}
        title={title}
        authorName={userId === authorId ? 'You':authorName}
        createdAt={createdAt}
        isFavorite={isFav}
        handleClick={handleReaction}

      />

    </div>
  )
}

export default BoardCard
