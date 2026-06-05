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
                <Button variant='secondary' className='h-10 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-3 text-sm text-[var(--color-ink)] shadow-none hover:bg-[var(--color-paper-3)] sm:px-4'>
                    <Plus className='h-4 w-4' /><span className='hidden sm:inline'>Invite Members</span></Button>
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
