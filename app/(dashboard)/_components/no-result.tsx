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
        <div className='flex items-center justify-center flex-col h-[calc(100vh-64px)] gap-y-2'>
            <Image src={img} width={538} height={700} className="object-contain w-full h-1/3 lg:h-1/2 " alt="logo" />
            <h2 className='text-xl  font-semibold '>{title}</h2>
            <p className='text-sm text-gray-500' >{description}</p>
        </div>
    )
}

export default NoResult
