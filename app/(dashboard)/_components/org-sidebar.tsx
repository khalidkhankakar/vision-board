import { OrganizationSwitcher } from "@clerk/nextjs"
import Image from "next/image"
import OrgSidebarNavigation from "./org-sidebar-navigation"

const OrgSidebar = () => {
  return (
    <aside className='h-full w-[200px] py-6 gap-y-5 px-3   hidden lg:flex lg:flex-col'>

      <Image src={'/logo.png'} width={538} height={700} className="object-contain w-full " alt="logo" />

      <div className="flex flex-col gap-y-5 w-full">
        <OrganizationSwitcher hidePersonal={true} appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
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

        <OrgSidebarNavigation />
      </div>



    </aside>
  )
}

export default OrgSidebar
