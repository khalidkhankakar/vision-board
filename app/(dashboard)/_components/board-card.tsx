import { formatToShortDate } from '@/lib/utils'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CardMenuDropdown from './card-menu-dropdown'

interface BoardCardProps {
  id: string
  authorName: string
  createdAt: string
  title: string
  isFavorite: boolean
}

const BoardCard = ({
  id,
  authorName,
  createdAt,
  title,
  isFavorite

}: BoardCardProps) => {
  return (
    <div className='group aspect-[5/5] pb-0 p-3 bg-blue-50 rounded-lg relative'>
      <Image src={'/board.svg'} width={100} height={100} alt="board" className='object-contain w-full' />
      <div className='absolute top-2 right-2 z-50'>
        <CardMenuDropdown
          title={title}
          id={id}
        />
      </div>
      <div className=' flex justify-between my-3 mx-2 '>
        <div>
          <Link href={`/board/${id}`} className='text-black text-lg font-semibold hover:underline'>{title}</Link>
          <p className='text-blue-500 text-sm'>{authorName} {formatToShortDate(createdAt)}</p>
        </div>
        <Star fill={isFavorite ? 'blue' : 'white'} className='stroke-1 stroke-blue-700 ' />
      </div>
    </div>
  )
}

export default BoardCard
