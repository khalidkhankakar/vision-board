import { OrganizationSwitcher } from "@clerk/nextjs"
import Image from "next/image"
import OrgSidebarNavigation from "./org-sidebar-navigation"
import { Suspense } from "react"

const OrgSidebar = () => {
  return (
    <aside className='hidden h-full w-[244px] flex-col gap-y-6 bg-[var(--color-paper)] px-4 py-5 lg:flex'>

      <div className="rounded-xl border border-[var(--color-rule)] bg-[var(--color-card)] px-3 py-4 shadow-sm">
        <Image src={'/logo.png'} width={538} height={700} className="h-14 w-full object-contain" alt="logo" />
      </div>

      <div className="flex w-full flex-col gap-y-5">
        <OrganizationSwitcher hidePersonal={true} appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              fontSize: '14px',
            },
            organizationSwitcherTrigger: {
              padding: '9px 10px',
              width: '100%',
              borderRadius: '8px',
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-rule)',
              color: 'var(--color-ink)',
              fontSize: '14px',
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
