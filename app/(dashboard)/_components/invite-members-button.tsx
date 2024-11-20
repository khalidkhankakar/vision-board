'use client'
import { Button } from '@/components/ui/button';
import { OrganizationProfile } from '@clerk/clerk-react';
import { useOrganization } from '@clerk/nextjs';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Plus } from 'lucide-react';


const InviteMembersButton = () => {
    const { organization } = useOrganization();
    if (!organization) return null
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='secondary' className=' rounded-md  flex items-center justify-center text-lg'>
                    <Plus className='w-8 h-8 ' />Invite Members</Button>
            </DialogTrigger>
            <DialogContent className='p-0  bg-transparent border-none'>
                <DialogHeader>
                    <VisuallyHidden.Root><DialogTitle>
                    </DialogTitle></VisuallyHidden.Root>
                </DialogHeader>
                <OrganizationProfile />
            </DialogContent>
        </Dialog>
    )
}

export default InviteMembersButton
