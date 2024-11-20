
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'
import SearchBar from './search-bar'
import InviteMembersButton from './invite-members-button'

const Navbar = () => {

  return (
    <div className='h-16 px-3 bg-gray-200 flex gap-x-3 items-center '>
      <div className='flex-1 '>
        <SearchBar />
        <div className='block lg:hidden'>

          <OrganizationSwitcher hidePersonal={true} appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxWidth: '300px',
                fontSize: '18px',
              },
              organizationSwitcherTrigger: {
                padding: '6px',
                width: '100%',
                borderRadius: '6px',
                backgroundColor: '#edf2ef',
                border: '1px solid #edf2ef',
                fontSize: '18px',
              }
            }
          }} />
        </div>


      </div>

      <div className='flex gap-x-2 items-center'>
          <InviteMembersButton />
        <UserButton />
      </div>
    </div>
  )
}

export default Navbar
