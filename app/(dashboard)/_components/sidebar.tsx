import React from 'react'
import NewButton from './new-button'
import OrgList from './org-list'

const Sidebar = () => {
  return (
    <aside className='flex h-full w-[64px] flex-col items-center border-r border-white/10 bg-[var(--color-ink)] py-4 text-[var(--color-accent-ink)]'>
      <NewButton />
      <OrgList />
    </aside>
  )
}

export default Sidebar
