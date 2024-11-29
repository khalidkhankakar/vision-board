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
import { Copy, Pencil, Trash } from "lucide-react";
import { mutate } from "swr";
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
            // Revalidate the cache for the board's data
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
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
               {children}
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
