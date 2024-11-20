'use client'
import Tip from '@/components/shared/tooltip';
import { cn } from '@/lib/utils';
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import Image from 'next/image';
import React from 'react'

interface OrgItemProps {
    id: string,
    name: string,
    imageUrl: string,
}

const OrgItem = ({
    id,
    name,
    imageUrl }: OrgItemProps) => {
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList()
    const isActive = organization?.id === id

    const onClick = () => {
        if (!setActive) return;

        setActive({
            organization: id
        })
    }
    return (
        <Tip label={name} side='right'>
        <div className=' opacity-90 hover:opacity-100 trasition duration-100 rounded-md p-1  flex items-center justify-center '>
            <Image src={imageUrl} alt={name}
                onClick={onClick}
                width={100}
                height={100}
                className={cn('h-10 w-10 rounded-md cursor-pointer ',
                    isActive && 'ring-2 ring-white'
                )}

            />
        </div>
        </Tip>
    )
}

export default OrgItem
