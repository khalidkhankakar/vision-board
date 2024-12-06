
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
        <main className='h-screen flex'>
            <div className='h-full flex'>
                <Sidebar />
                <OrgSidebar />
            </div>
            <div className='w-full'>
                <Navbar />
                <ModelProvider />
                
                {children}
            </div>
        </main>
    )
}

export default DashboardLayout
