'use client'
import { useOrganizationList } from '@clerk/nextjs'
import React from 'react'
import OrgItem from './org-item'

const OrgList = () => {
    const {userMemberships} = useOrganizationList({
        userMemberships:{
            infinite:true
        }
    })

    if(!userMemberships || !userMemberships.data?.length) return null
  return (
    <ul className='mt-5 space-y-2'>
        {
            userMemberships.data?.map((org) => (
                <OrgItem key={org.organization.id} id={org.organization.id} name={org.organization.name} imageUrl={org.organization.imageUrl} />
            ))
        }
    </ul>
  )
}

export default OrgList
