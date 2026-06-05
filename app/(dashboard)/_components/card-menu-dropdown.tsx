"use client";

import ConfirmationModel from "@/components/shared/confirmation-model";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRenameModel } from "@/hooks/use-rename-model";
import { deleteBoard } from "@/lib/query/board.queies";
import { revalidateBoardsCache } from "@/lib/cache-utils";
import { useOrganization } from "@clerk/nextjs";
import { Copy, Pencil, Trash } from "lucide-react";
import useSWRMutation from "swr/mutation";

interface CardMenuDropdownProps {
    children: React.ReactNode
    id: string;
    title: string
}

const CardMenuDropdown = ({ id, title,children }: CardMenuDropdownProps) => {
    const { organization } = useOrganization();
    const { onOpen } = useRenameModel()
    const { trigger } = useSWRMutation(`/api/board/${id}`, deleteBoard,)

    // Handle Copy to Clipboard
    const handleCopy = () => {
        navigator.clipboard.writeText(`${window.location.href}board/${id}`);
        alert("Board link copied to clipboard!"); // Optional feedback for user
    };

    // Handle Delete Item
    const handleDelete = async (id: string) => {
        try {
            if (!organization || !id) return;
            const result = await trigger()
            console.log({ result })
            // Immediately revalidate boards cache after deletion
            revalidateBoardsCache(organization.id)
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
               {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 rounded-lg border-[var(--color-rule)] bg-[var(--color-card)] p-1.5 text-[var(--color-ink)] shadow-lg">
                <DropdownMenuLabel className="px-2 text-xs text-[var(--color-ink-2)]">Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Copy Board Link */}
                <DropdownMenuItem asChild className="rounded-md">
                    <button onClick={handleCopy} className="flex w-full items-center gap-x-2">
                        <Copy className="h-3 w-3" />
                        <span>Copy board link</span>
                    </button>
                </DropdownMenuItem>

                {/* Delete Item */}
                <ConfirmationModel
                    id={id}
                    onDelete={handleDelete}

                >
                    <button
                        className="mx-1 flex w-[calc(100%-0.5rem)] items-center gap-x-3 rounded-md px-2 py-1.5 text-sm hover:bg-[var(--color-paper-2)]"
                    >
                        <Trash className="h-4 w-4" />
                        <span>Delete</span>
                    </button>
                </ConfirmationModel>

                <DropdownMenuItem asChild className="rounded-md">
                    <button
                        onClick={() => onOpen(id, title)}
                        className="flex w-full items-center gap-x-3"
                    >
                        <Pencil className="h-4 w-4" />
                        <span>Rename</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CardMenuDropdown;
