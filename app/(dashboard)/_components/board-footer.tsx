import { formatToShortDate } from '@/lib/utils'
import { Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface BoardFooterProps {
    id: string,
    authorName: string,
    title: string,
    createdAt: Date,
    isFavorite: boolean
    handleClick: () => void
}

const BoardFooter = ({ id,
    authorName,
    title,
    createdAt,
    handleClick,
    isFavorite }: BoardFooterProps) => {
    return (
        <div className=' flex justify-between my-3 mx-2 '>
            <div>
                <Link href={`/board/${id}`} className='text-black text-lg font-semibold hover:underline'>{title}</Link>
                <p className='text-blue-500 text-sm'>
                   by {authorName} <br /> {formatToShortDate(String(createdAt))}</p>
            </div>
            <Star onClick={handleClick} fill={isFavorite ? 'blue' : 'white'} className='stroke-1 stroke-blue-700 cursor-pointer ' />
        </div>
    )
}

export default BoardFooter
