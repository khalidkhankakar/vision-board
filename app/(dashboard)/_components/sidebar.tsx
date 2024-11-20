import React from 'react'
import NewButton from './new-button'
import OrgList from './org-list'

const Sidebar = () => {
  return (
    <aside className='h-full py-4 bg-blue-950 w-[60px] text-white flex flex-col items-center  '>
      <NewButton />
      <OrgList />
    </aside>
  )
}

export default Sidebar
