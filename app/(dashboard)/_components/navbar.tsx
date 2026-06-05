
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'
import SearchBar from './search-bar'
import InviteMembersButton from './invite-members-button'

const Navbar = () => {

  return (
    <div className='flex min-h-16 shrink-0 items-center gap-3 border-b border-[var(--color-rule)] bg-[var(--color-card)] px-3 py-2 shadow-sm sm:px-4'>
      <div className='min-w-0 flex-1'>
        <SearchBar />
        <div className='block lg:hidden'>

          <OrganizationSwitcher hidePersonal={true} appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                maxWidth: '100%',
                fontSize: '14px',
              },
              organizationSwitcherTrigger: {
                padding: '8px 10px',
                width: '100%',
                borderRadius: '8px',
                backgroundColor: 'var(--color-paper-2)',
                border: '1px solid var(--color-rule)',
                color: 'var(--color-ink)',
                fontSize: '14px',
              }
            }
          }} />
        </div>


      </div>

      <div className='flex shrink-0 items-center gap-2'>
          <InviteMembersButton />
        <UserButton />
      </div>
    </div>
  )
}

export default Navbar
