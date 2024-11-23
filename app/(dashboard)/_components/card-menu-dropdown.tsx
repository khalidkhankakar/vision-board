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
import { useOrganization } from "@clerk/nextjs";
import { Copy, Ellipsis, Pencil, Trash } from "lucide-react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

interface CardMenuDropdownProps {
    id: string;
    title: string
}

const CardMenuDropdown = ({ id, title }: CardMenuDropdownProps) => {
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
            // Revalidate the cache for the board's data
            mutate(`/api/board/${organization.id}`);
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button>
                    <Ellipsis />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Copy Board Link */}
                <DropdownMenuItem asChild>
                    <button onClick={handleCopy} className="flex gap-x-2 items-center">
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
                        className="flex gap-x-3 mx-2 hover:bg-gray-100 w-full items-center"
                    >
                        <Trash className="h-4 w-4" />
                        <span>Delete</span>
                    </button>
                </ConfirmationModel>

                <DropdownMenuItem asChild>
                    <button
                        onClick={() => onOpen(id, title)}
                        className="flex gap-x-3 mx-2 hover:bg-gray-100 w-full items-center"
                    >
                        <Pencil />
                        <span>Rename</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CardMenuDropdown;
