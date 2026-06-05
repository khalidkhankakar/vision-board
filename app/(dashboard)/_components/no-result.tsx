import Image from 'next/image'
import React from 'react'

interface NoResultProps {
    img: string,
    title: string,
    description: string
}
const NoResult = ({
    img,
    title,
    description
}: NoResultProps) => {
    return (
        <div className='flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-y-4 px-4 text-center'>
            <div className='w-full max-w-sm rounded-xl border border-[var(--color-rule)] bg-[var(--color-card)] p-8 shadow-sm'>
                <Image src={img} width={538} height={700} className="mx-auto h-48 w-full object-contain" alt="" />
                <h2 className='mt-5 text-xl font-semibold text-[var(--color-ink)]'>{title}</h2>
                <p className='mt-2 text-sm text-[var(--color-ink-2)]' >{description}</p>
            </div>
        </div>
    )
}

export default NoResult
