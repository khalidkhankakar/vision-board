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
            <Tip label={"Create an Orginzation"} side='right'>
            <DialogTrigger asChild>
                <button className='bg-blue-100/50 opacity-90 hover:opacity-100 trasition duration-100 rounded-md p-1  flex items-center justify-center h-10 w-10'>
                    <Plus className='w-8 h-8 ' />
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
