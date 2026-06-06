import React from 'react'
import NewButton from './new-button'
import OrgList from './org-list'

const Sidebar = () => {
  return (
    <aside className='flex h-full w-[68px] flex-col items-center border-r border-[var(--color-rule)] bg-[var(--color-card)] py-4 text-[var(--color-ink)]'>
      <NewButton />
      <OrgList />
    </aside>
  )
}

export default Sidebar
