import { OrganizationSwitcher } from "@clerk/nextjs"
import OrgSidebarNavigation from "./org-sidebar-navigation"
import { Suspense } from "react"

const OrgSidebar = () => {
  return (
    <aside className='hidden h-full w-[260px] flex-col gap-y-6 bg-[var(--color-card)] px-4 py-5 lg:flex'>

      <div className="rounded-lg ">
       <h1 className="text-2xl font-bold">Vision Board</h1>
      </div>

      <div className="flex w-full flex-col gap-y-5">
        <OrganizationSwitcher hidePersonal={true} appearance={{
          elements: {
            rootBox: {
              width: '100%',
              fontSize: '16px',
            },
            organizationSwitcherTrigger: {
              padding: '10px 12px',
              width: '100%',
              borderRadius: '8px',
              backgroundColor: 'var(--color-paper)',
              border: '1px solid var(--color-rule)',
              color: 'var(--color-ink)',
              fontSize: '19px',
            }
          }
        }} />

        <Suspense fallback={<div className="h-24 rounded-lg bg-[var(--color-paper-2)]" />}>
          <OrgSidebarNavigation />
        </Suspense>
      </div>



    </aside>
  )
}

export default OrgSidebar
