'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRenameModel } from "@/hooks/use-rename-model"
import { renameBoard } from "@/lib/query/board.queies"
import { useOrganization } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { mutate } from "swr"
import useSWRMutation from "swr/mutation"


const RenameModel = () => {
    const { isOpen, onClose, initialValues } = useRenameModel();
    const [title, setTitle] = useState(initialValues.title)
    const { organization } = useOrganization()
    const { trigger } = useSWRMutation(`/api/board/${initialValues.id}`, renameBoard,)

    useEffect(() => {
        setTitle(initialValues.title)
    }, [initialValues.title])


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Submit form
        if (!organization || !initialValues.id) return;
        const result = await trigger({ title })
        console.log({ result })
        mutate((key) => {
            // Match `/api/board/{organizationId}` with:
            // 1. No query params
            // 2. Only `search`
            // 3. Only `favorites`
            // 4. Both `search` and `favorites`
            const pattern = new RegExp(
              `^/api/board/${organization.id}($|\\?((search=.*&favorites=.*)|(favorites=.*&search=.*)|(search=.*)|(favorites=.*)))`
            );
            return pattern.test(key as string);
          });
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Rename Board</DialogTitle>
                    <DialogDescription>
                        Make changes to your board
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <label htmlFor="link" className="sr-only">
                            Link
                        </label>
                        <Input
                            id="link"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={60}
                            required
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                        Rename
                    </Button>
                </form>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>


    )
}

export default RenameModel
