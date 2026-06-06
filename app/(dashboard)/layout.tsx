
import OrgSidebar from './_components/org-sidebar'
import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'
import ModelProvider from '@/providers/model-provider'
import { Metadata } from 'next'

interface DashboardLayoutProps {
    children: React.ReactNode
}
export const metadata: Metadata = {
    title:'Dashboard - Vision Board',
    description:'Vision Board is team collaborative platform where you can create and manage boards for your team.'
}

const DashboardLayout = ({ children }: Readonly<DashboardLayoutProps>) => {
    return (
        <main className='h-screen min-w-0 overflow-hidden bg-[var(--color-paper)] text-[var(--color-ink)] lg:flex'>
            <div className='hidden h-full shrink-0 border-r border-[var(--color-rule)] bg-[var(--color-card)] lg:flex'>
                <Sidebar />
                <OrgSidebar />
            </div>
            <div className='flex h-full min-w-0 flex-1 flex-col bg-[var(--color-paper-2)]'>
                <Navbar />
                <ModelProvider />

                {children}
            </div>
        </main>
    )
}

export default DashboardLayout
