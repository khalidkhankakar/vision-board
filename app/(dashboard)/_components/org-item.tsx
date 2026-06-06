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
        <div className='flex items-center justify-center rounded-lg p-1 opacity-90 transition hover:bg-[var(--color-paper-2)] hover:opacity-100'>
            <Image src={imageUrl} alt={name}
                onClick={onClick}
                width={100}
                height={100}
                className={cn('h-10 w-10 cursor-pointer rounded-lg object-cover',
                    isActive && 'ring-2 ring-[var(--color-accent-2)] ring-offset-2 ring-offset-[var(--color-card)]'
                )}

            />
        </div>
        </Tip>
    )
}

export default OrgItem
