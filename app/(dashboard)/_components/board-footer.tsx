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
        <div className='mt-3 flex items-start justify-between gap-3'>
            <div className='min-w-0'>
                <Link href={`/board/${id}`} className='block truncate text-sm font-semibold text-[var(--color-ink)] underline-offset-4 hover:underline'>{title}</Link>
                <p className='mt-1 text-xs leading-5 text-[var(--color-ink-2)]'>
                   by {authorName} <span className='text-[var(--color-rule)]'>/</span> {formatToShortDate(String(createdAt))}</p>
            </div>
            <button onClick={handleClick} aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'} className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)] transition hover:bg-[var(--color-paper-2)] hover:text-[var(--color-accent)]'>
                <Star fill={isFavorite ? 'var(--color-accent)' : 'transparent'} className='h-4 w-4 stroke-1 stroke-[var(--color-accent)]' />
            </button>
        </div>
    )
}

export default BoardFooter
