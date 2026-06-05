'use client'
import { Plus } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CreateOrganization } from '@clerk/nextjs'
import { DialogTitle } from '@radix-ui/react-dialog'
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Tip from '@/components/shared/tooltip'
const NewButton = () => {
    return (
        <Dialog>
            <Tip label={"Create an organization"} side='right'>
            <DialogTrigger asChild>
                <button className='flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white shadow-sm transition hover:bg-white/15 focus-visible:bg-white/15'>
                    <Plus className='h-5 w-5' />
                </button>
            </DialogTrigger>
            </Tip>

            <DialogContent className='p-0 max-w-[480px] bg-transparent border-none'>
                <DialogHeader>
                    <VisuallyHidden.Root><DialogTitle>
                        Create an organization</DialogTitle></VisuallyHidden.Root>
                    <CreateOrganization routing='hash' />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default NewButton
